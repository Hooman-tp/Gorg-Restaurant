import { NextRequest, NextResponse } from "next/server";
import { findOrderByCodeAndPhone } from "@/lib/orders";
import { isDbConfigured } from "@/lib/db";

export async function POST(req: NextRequest) {
  try {
    const { orderCode, phone } = await req.json();

    if (!isDbConfigured()) {
      return NextResponse.json(
        { error: "سیستم پیگیری هنوز روی این سایت راه‌اندازی نشده" },
        { status: 503 }
      );
    }

    if (!orderCode || !phone) {
      return NextResponse.json({ error: "کد پیگیری و شماره تماس را وارد کنید" }, { status: 400 });
    }

    const order = await findOrderByCodeAndPhone(orderCode.trim().toUpperCase(), phone.trim());
    if (!order) {
      return NextResponse.json({ error: "سفارشی با این مشخصات پیدا نشد" }, { status: 404 });
    }

    return NextResponse.json({ order });
  } catch (err) {
    console.error("track error", err);
    return NextResponse.json({ error: "خطا در پیگیری سفارش" }, { status: 500 });
  }
}
