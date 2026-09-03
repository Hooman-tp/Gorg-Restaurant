import { NextRequest, NextResponse } from "next/server";
import { Resend } from "resend";
import { CartLine } from "@/lib/types";

interface OrderBody {
  lines: CartLine[];
  total: number;
  orderType: "delivery" | "pickup";
  orderCode: string;
  name: string;
  phone: string;
  address?: string;
  notes?: string;
}

function formatPrice(n: number) {
  return n.toLocaleString("fa-IR");
}

export async function POST(req: NextRequest) {
  try {
    const body = (await req.json()) as OrderBody;

    if (!body?.name || !body?.phone || !body?.lines?.length) {
      return NextResponse.json({ error: "اطلاعات سفارش ناقص است" }, { status: 400 });
    }

    const apiKey = process.env.RESEND_API_KEY;
    const recipient = process.env.ORDER_RECIPIENT_EMAIL;

    // در صورت نبود کلید Resend (مثلاً در محیط توسعه)، سفارش را فقط لاگ می‌کنیم
    // تا جریان کار خراب نشود؛ در پروڈاکشن حتماً RESEND_API_KEY را تنظیم کنید.
    if (!apiKey || !recipient) {
      console.log("سفارش جدید (بدون ارسال ایمیل - RESEND_API_KEY تنظیم نشده):", body);
      return NextResponse.json({ ok: true, emailed: false });
    }

    const resend = new Resend(apiKey);
    const itemsHtml = body.lines
      .map((l) => `<tr><td>${l.qty}×</td><td>${l.name}</td><td>${formatPrice(l.price * l.qty)} تومان</td></tr>`)
      .join("");

    await resend.emails.send({
      from: "سفارش‌های گرگ <orders@gorg-restaurant.ir>",
      to: recipient,
      subject: `سفارش جدید [${body.orderCode || "-"}] از ${body.name}`,
      html: `
        <div dir="rtl" style="font-family:Tahoma,sans-serif">
          <h2>سفارش جدید</h2>
          <p><b>کد پیگیری:</b> ${body.orderCode || "-"}</p>
          <p><b>نام:</b> ${body.name}</p>
          <p><b>تلفن:</b> ${body.phone}</p>
          <p><b>نوع تحویل:</b> ${body.orderType === "delivery" ? "ارسال با پیک" : "تحویل حضوری"}</p>
          ${body.address ? `<p><b>آدرس:</b> ${body.address}</p>` : ""}
          ${body.notes ? `<p><b>توضیحات:</b> ${body.notes}</p>` : ""}
          <table cellpadding="6">${itemsHtml}</table>
          <p><b>جمع کل:</b> ${formatPrice(body.total)} تومان</p>
        </div>
      `,
    });

    return NextResponse.json({ ok: true, emailed: true });
  } catch (err) {
    console.error("order route error", err);
    return NextResponse.json({ error: "خطا در ثبت سفارش" }, { status: 500 });
  }
}
