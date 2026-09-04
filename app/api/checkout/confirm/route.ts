import { NextRequest, NextResponse } from "next/server";
import { verifyZarinpalPayment } from "@/lib/zarinpal";
import { decodeOrder } from "@/lib/orderEncoding";
import { processOrderNotifications } from "@/lib/orderNotify";

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

    await processOrderNotifications({ ...order, refId: verification.refId });

    return NextResponse.json({ success: true, orderCode: order.orderCode, refId: verification.refId });
  } catch (err) {
    console.error("checkout confirm error", err);
    return NextResponse.json({ success: false, error: "خطا در تأیید پرداخت" }, { status: 500 });
  }
}
