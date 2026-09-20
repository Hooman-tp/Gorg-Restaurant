import { NextRequest, NextResponse } from "next/server";
import { verifyZarinpalPayment } from "@/lib/zarinpal";
import { decodeOrder } from "@/lib/orderEncoding";
import { processOrderNotifications } from "@/lib/orderNotify";
import { saveOrder } from "@/lib/orders";

/**
 * تنها جایی که سفارش ثبت می‌شود: بعد از این‌که زرین‌پال تأیید کند پول واقعاً
 * از حساب مشتری کم شده. (عمداً به نشستِ ورود وابسته نیست: بعضی بانک‌ها/اپ‌ها
 * مشتری را در مرورگرِ دیگری برمی‌گردانند و کوکی آن‌جا نیست؛ امنیتِ این مرحله
 * با امضای جزئیات سفارش و تأییدِ خودِ زرین‌پال تأمین می‌شود.)
 */
export async function POST(req: NextRequest) {
  try {
    const { authority, order: encodedOrder } = await req.json();

    if (!authority || !encodedOrder) {
      return NextResponse.json({ success: false, error: "اطلاعات ناقص است" }, { status: 400 });
    }

    const order = decodeOrder(encodedOrder);
    if (!order) {
      return NextResponse.json({ success: false, error: "اطلاعات سفارش قابل بازیابی نیست" }, { status: 400 });
    }

    const verification = await verifyZarinpalPayment(order.total, authority);
    if (!verification.ok) {
      return NextResponse.json({ success: false, error: verification.errorMessage || "پرداخت تأیید نشد" });
    }

    const paid = { ...order, refId: verification.refId };
    const saved = await saveOrder(paid);

    if (saved === "duplicate_payment") {
      return NextResponse.json({ success: false, error: "این پرداخت قبلاً برای سفارش دیگری استفاده شده است" });
    }
    // اگر همین سفارش قبلاً ثبت شده (مثلاً رفرش صفحه‌ی نتیجه)، اعلان دوباره ارسال نمی‌شود
    if (saved !== "exists") {
      await processOrderNotifications(paid);
    }

    return NextResponse.json({ success: true, orderCode: order.orderCode, refId: verification.refId });
  } catch (err) {
    console.error("checkout confirm error", err);
    return NextResponse.json({ success: false, error: "خطا در تأیید پرداخت" }, { status: 500 });
  }
}
