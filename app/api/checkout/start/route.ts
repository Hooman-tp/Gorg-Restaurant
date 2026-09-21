import { NextRequest, NextResponse } from "next/server";
import { generateOrderCode } from "@/lib/validation";
import { isZarinpalConfigured, createZarinpalPayment } from "@/lib/zarinpal";
import { encodeOrder, EncodedOrder } from "@/lib/orderEncoding";
import { getMenu } from "@/lib/menuStore";
import { getSettings } from "@/lib/settings";
import { dbQuery, isDbConfigured } from "@/lib/db";
import { SESSION_COOKIE, readSessionPhone } from "@/lib/userAuth";
import { saveProfile } from "@/lib/users";
import { CartLine } from "@/lib/types";

interface StartBody {
  lines?: { id?: unknown; qty?: unknown }[];
  orderType?: unknown;
  name?: unknown;
  address?: unknown;
  notes?: unknown;
  lat?: unknown;
  lng?: unknown;
  tableNo?: unknown;
}

const asText = (v: unknown, max: number) => (typeof v === "string" ? v.trim().slice(0, max) : "");
const validCoord = (v: unknown, min: number, max: number): v is number =>
  typeof v === "number" && Number.isFinite(v) && v >= min && v <= max;

/**
 * شروع پرداخت. مهم: این‌جا هیچ سفارشی «ثبت» نمی‌شود؛ فقط لینک پرداخت ساخته می‌شود.
 * ثبت سفارش (دیتابیس + انبار + ایمیل + پیامک) فقط در /api/checkout/confirm و بعد از
 * تأییدِ واقعیِ پرداخت از طرف زرین‌پال انجام می‌شود.
 */
export async function POST(req: NextRequest) {
  try {
    // ۱) فقط کاربرِ واردشده با شماره‌ی موبایل؛ شماره از نشست (کوکی) خوانده می‌شود، نه از فرم
    const phone = readSessionPhone(req.cookies.get(SESSION_COOKIE)?.value);
    if (!phone) {
      return NextResponse.json({ error: "برای ثبت سفارش ابتدا با شماره موبایل وارد شوید", reason: "login" }, { status: 401 });
    }

    // ۲) اگر مدیریت سفارش آنلاین را بسته باشد (پنل ← تنظیمات)
    const settings = await getSettings({ fresh: true });
    if (!settings.ordersOpen) {
      return NextResponse.json({ error: settings.closedMessage, reason: "closed" }, { status: 403 });
    }

    const body = (await req.json().catch(() => null)) as StartBody | null;
    if (!body || !Array.isArray(body.lines) || body.lines.length === 0) {
      return NextResponse.json({ error: "سبد سفارش خالی است" }, { status: 400 });
    }

    const name = asText(body.name, 120);
    const address = asText(body.address, 600);
    const notes = asText(body.notes, 500);
    const orderType = body.orderType === "pickup" ? "pickup" : body.orderType === "dine_in" ? "dine_in" : "delivery";
    if (!name) return NextResponse.json({ error: "نام و نام‌خانوادگی را وارد کنید" }, { status: 400 });
    if (orderType === "delivery" && !address) {
      return NextResponse.json({ error: "آدرس برای ارسال با پیک الزامی است" }, { status: 400 });
    }

    // سفارش سالن: میز باید در پنل تعریف و فعال باشد (QR میز)
    let tableNo: string | undefined;
    if (orderType === "dine_in") {
      const code = asText(body.tableNo, 20);
      const rows = code && isDbConfigured() ? await dbQuery("SELECT code FROM dining_tables WHERE code = $1 AND active = true", [code]) : [];
      if (!rows[0]) {
        return NextResponse.json({ error: "میز نامعتبر است؛ QR روی میز را دوباره اسکن کنید" }, { status: 400 });
      }
      tableNo = String(rows[0].code);
    }

    const hasPin = orderType === "delivery" && validCoord(body.lat, -90, 90) && validCoord(body.lng, -180, 180);
    const lat = hasPin ? Number((body.lat as number).toFixed(6)) : undefined;
    const lng = hasPin ? Number((body.lng as number).toFixed(6)) : undefined;

    // ۳) قیمت و موجود بودن را خودِ سرور از منوی (پنل) حساب می‌کند؛ مبلغی که مرورگر می‌فرستد قابل‌اعتماد نیست
    const menu = await getMenu({ fresh: true });
    const byId = new Map(menu.items.map((i) => [i.id, i]));
    const lines: CartLine[] = [];
    for (const l of body.lines) {
      const item = typeof l.id === "string" ? byId.get(l.id) : undefined;
      const qty = Number(l.qty);
      if (!item) {
        return NextResponse.json({ error: "یکی از آیتم‌های سبد دیگر در منو وجود ندارد. سبد را بررسی کنید." }, { status: 400 });
      }
      if (item.available === false) {
        return NextResponse.json({ error: `«${item.name}» فعلاً ناموجود است؛ آن را از سبد حذف کنید.` }, { status: 400 });
      }
      if (!Number.isInteger(qty) || qty < 1 || qty > 50) {
        return NextResponse.json({ error: "تعداد آیتم‌ها معتبر نیست" }, { status: 400 });
      }
      lines.push({ id: item.id, name: item.name, price: item.price, qty });
    }
    const subtotal = lines.reduce((sum, l) => sum + l.price * l.qty, 0);
    if (settings.minOrder > 0 && subtotal < settings.minOrder) {
      return NextResponse.json(
        { error: `حداقل مبلغ سفارش ${settings.minOrder.toLocaleString("fa-IR")} تومان است.`, reason: "min_order" },
        { status: 400 }
      );
    }
    const deliveryFee = orderType === "delivery" ? settings.deliveryFee : 0;
    const total = subtotal + deliveryFee;

    // ۴) بدون درگاه پرداختِ فعال، سفارش «ثبت نمی‌شود»
    if (!isZarinpalConfigured()) {
      console.error("ZARINPAL_MERCHANT_ID تنظیم نشده؛ سفارش بدون پرداخت ثبت نشد");
      return NextResponse.json(
        { error: "پرداخت آنلاین فعلاً فعال نیست و سفارش ثبت نشد. لطفاً با رستوران تماس بگیرید.", reason: "payment_unavailable" },
        { status: 503 }
      );
    }

    // نام/آدرس/موقعیت را برای سفارش‌های بعدی نگه می‌داریم (این «سفارش» نیست، فقط پروفایلِ مشتری است)
    await saveProfile(phone, { name, address: orderType === "delivery" ? address : null, lat, lng });

    const orderCode = generateOrderCode();
    const order: EncodedOrder = {
      lines,
      total,
      subtotal,
      deliveryFee,
      orderType,
      orderCode,
      name,
      phone,
      address: orderType === "delivery" ? address : undefined,
      notes: notes || undefined,
      lat,
      lng,
      tableNo,
    };

    const callbackUrl = `${req.nextUrl.origin}/checkout/verify?order=${encodeOrder(order)}`;
    const payment = await createZarinpalPayment({
      amountToman: total,
      description: `سفارش ${settings.businessName} ${orderCode}`,
      callbackUrl,
      mobile: phone,
    });

    if (!payment.ok || !payment.payUrl) {
      return NextResponse.json({ error: payment.errorMessage || "اتصال به درگاه پرداخت ناموفق بود" }, { status: 502 });
    }

    return NextResponse.json({ redirectUrl: payment.payUrl, orderCode });
  } catch (err) {
    console.error("checkout start error", err);
    return NextResponse.json({ error: "خطا در شروع فرایند پرداخت" }, { status: 500 });
  }
}
