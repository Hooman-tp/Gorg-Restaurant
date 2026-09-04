import { NextRequest, NextResponse } from "next/server";
import { isValidIranianPhone, generateOrderCode } from "@/lib/validation";
import { isZarinpalConfigured, createZarinpalPayment } from "@/lib/zarinpal";
import { encodeOrder } from "@/lib/orderEncoding";
import { processOrderNotifications } from "@/lib/orderNotify";
import { CartLine } from "@/lib/types";

interface StartBody {
  lines: CartLine[];
  total: number;
  orderType: "delivery" | "pickup";
  name: string;
  phone: string;
  address?: string;
  notes?: string;
}

export async function POST(req: NextRequest) {
  try {
    const body = (await req.json()) as StartBody;

    if (!body?.name || !body?.phone || !body?.lines?.length) {
      return NextResponse.json({ error: "اطلاعات سفارش ناقص است" }, { status: 400 });
    }
    if (!isValidIranianPhone(body.phone)) {
      return NextResponse.json({ error: "شماره تماس معتبر نیست" }, { status: 400 });
    }
    if (body.orderType === "delivery" && !body.address) {
      return NextResponse.json({ error: "آدرس برای ارسال با پیک الزامی است" }, { status: 400 });
    }

    const orderCode = generateOrderCode();
    const order = { ...body, orderCode };

    // ── مسیر ۱: درگاه پرداخت زرین‌پال فعال است ──
    if (isZarinpalConfigured()) {
      const encoded = encodeOrder(order);
      const callbackUrl = `${req.nextUrl.origin}/checkout/verify?order=${encoded}`;

      const payment = await createZarinpalPayment({
        amountToman: body.total,
        description: `سفارش گرگ ${orderCode}`,
        callbackUrl,
        mobile: body.phone,
      });

      if (!payment.ok || !payment.payUrl) {
        return NextResponse.json({ error: payment.errorMessage || "اتصال به درگاه پرداخت ناموفق بود" }, { status: 502 });
      }

      return NextResponse.json({ redirectUrl: payment.payUrl, orderCode });
    }

    // ── مسیر ۲: هنوز درگاه پرداخت وصل نشده؛ سفارش مستقیم ثبت می‌شود ──
    await processOrderNotifications(order);
    return NextResponse.json({ redirectUrl: null, orderCode });
  } catch (err) {
    console.error("checkout start error", err);
    return NextResponse.json({ error: "خطا در شروع فرایند سفارش" }, { status: 500 });
  }
}
