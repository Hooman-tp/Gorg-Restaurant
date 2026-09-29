import { NextRequest, NextResponse } from "next/server";
import { findOrderByCodeAndPhone } from "@/lib/orders";
import { isDbConfigured } from "@/lib/db";
import { checkRateLimit } from "@/lib/rateLimit";

export async function POST(req: NextRequest) {
  try {
    if (!isDbConfigured()) {
      return NextResponse.json(
        { error: "سیستم پیگیری هنوز روی این سایت راه‌اندازی نشده" },
        { status: 503 }
      );
    }

    // پیگیریِ سفارش نیازی به ورود ندارد، پس بدونِ محدودیتِ نرخ می‌توانست
    // برای حدس‌زدنِ کدهای سفارشِ دیگران به‌کار برود
    const rl = await checkRateLimit(req, "track", 20, 15);
    if (!rl.allowed) {
      return NextResponse.json(
        { error: "تعداد درخواست‌ها بیش از حد مجاز بود. کمی بعد دوباره تلاش کنید." },
        { status: 429, headers: { "Retry-After": String(rl.retryAfterSeconds) } }
      );
    }

    const body = await req.json().catch(() => null);
    const orderCode = typeof body?.orderCode === "string" ? body.orderCode.trim().slice(0, 40) : "";
    const phone = typeof body?.phone === "string" ? body.phone.trim().slice(0, 20) : "";

    if (!orderCode || !phone) {
      return NextResponse.json({ error: "کد پیگیری و شماره تماس را وارد کنید" }, { status: 400 });
    }

    const order = await findOrderByCodeAndPhone(orderCode.toUpperCase(), phone);
    if (!order) {
      return NextResponse.json({ error: "سفارشی با این مشخصات پیدا نشد" }, { status: 404 });
    }

    return NextResponse.json({ order });
  } catch (err) {
    console.error("track error", err);
    return NextResponse.json({ error: "خطا در پیگیری سفارش" }, { status: 500 });
  }
}
