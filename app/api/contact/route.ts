import { NextRequest, NextResponse } from "next/server";
import { Resend } from "resend";

interface ContactBody {
  name: string;
  phone?: string;
  message: string;
}

export async function POST(req: NextRequest) {
  try {
    const body = (await req.json()) as ContactBody;

    if (!body?.name || !body?.message) {
      return NextResponse.json({ error: "نام و پیام الزامی است" }, { status: 400 });
    }

    const apiKey = process.env.RESEND_API_KEY;
    const recipient = process.env.ORDER_RECIPIENT_EMAIL;

    if (!apiKey || !recipient) {
      console.log("پیام تماس جدید (بدون ارسال ایمیل - RESEND_API_KEY تنظیم نشده):", body);
      return NextResponse.json({ ok: true, emailed: false });
    }

    const resend = new Resend(apiKey);
    await resend.emails.send({
      from: "فرم تماس گرگ <contact@gorg-restaurant.ir>",
      to: recipient,
      subject: `پیام جدید از ${body.name}`,
      html: `
        <div dir="rtl" style="font-family:Tahoma,sans-serif">
          <p><b>نام:</b> ${body.name}</p>
          ${body.phone ? `<p><b>تلفن:</b> ${body.phone}</p>` : ""}
          <p><b>پیام:</b></p>
          <p>${body.message.replace(/\n/g, "<br/>")}</p>
        </div>
      `,
    });

    return NextResponse.json({ ok: true, emailed: true });
  } catch (err) {
    console.error("contact route error", err);
    return NextResponse.json({ error: "خطا در ارسال پیام" }, { status: 500 });
  }
}
