import { NextRequest, NextResponse } from "next/server";
import { Resend } from "resend";
import { checkRateLimit } from "@/lib/rateLimit";

interface ContactBody {
  name: string;
  phone?: string;
  message: string;
}

const NAME_MAX = 100;
const PHONE_MAX = 20;
const MESSAGE_MAX = 2000;

/** برای جلوگیری از تزریقِ HTML/کدِ قابلِ‌اجرا داخلِ ایمیلی که به رستوران می‌رسد */
function escapeHtml(value: string): string {
  return value
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#39;");
}

/** حذفِ کاراکترهای کنترلی/خط‌جدید از مقادیری که داخلِ سطرِ موضوعِ ایمیل قرار می‌گیرند */
function sanitizeSingleLine(value: string): string {
  return value.replace(/[\r\n\t\0]/g, " ").trim();
}

export async function POST(req: NextRequest) {
  try {
    const rl = await checkRateLimit(req, "contact", 5, 30);
    if (!rl.allowed) {
      return NextResponse.json(
        { error: "تعداد پیام‌های ارسالی بیش از حد مجاز بود. کمی بعد دوباره تلاش کنید." },
        { status: 429, headers: { "Retry-After": String(rl.retryAfterSeconds) } }
      );
    }

    const body = (await req.json().catch(() => null)) as ContactBody | null;

    if (!body || typeof body.name !== "string" || typeof body.message !== "string") {
      return NextResponse.json({ error: "نام و پیام الزامی است" }, { status: 400 });
    }

    const name = sanitizeSingleLine(body.name).slice(0, NAME_MAX);
    const message = body.message.trim().slice(0, MESSAGE_MAX);
    const phone =
      typeof body.phone === "string" && body.phone.trim() ? sanitizeSingleLine(body.phone).slice(0, PHONE_MAX) : "";

    if (!name || !message) {
      return NextResponse.json({ error: "نام و پیام الزامی است" }, { status: 400 });
    }

    const apiKey = process.env.RESEND_API_KEY;
    const recipient = process.env.ORDER_RECIPIENT_EMAIL;

    if (!apiKey || !recipient) {
      console.log("پیام تماس جدید (بدون ارسال ایمیل - RESEND_API_KEY تنظیم نشده):", { name, phone, message });
      return NextResponse.json({ ok: true, emailed: false });
    }

    const safeName = escapeHtml(name);
    const safePhone = escapeHtml(phone);
    const safeMessage = escapeHtml(message).replace(/\n/g, "<br/>");

    const resend = new Resend(apiKey);
    await resend.emails.send({
      from: "فرم تماس گرگ <contact@gorg-restaurant.ir>",
      to: recipient,
      subject: `پیام جدید از ${name}`,
      html: `
        <div dir="rtl" style="font-family:Tahoma,sans-serif">
          <p><b>نام:</b> ${safeName}</p>
          ${safePhone ? `<p><b>تلفن:</b> ${safePhone}</p>` : ""}
          <p><b>پیام:</b></p>
          <p>${safeMessage}</p>
        </div>
      `,
    });

    return NextResponse.json({ ok: true, emailed: true });
  } catch (err) {
    console.error("contact route error", err);
    return NextResponse.json({ error: "خطا در ارسال پیام" }, { status: 500 });
  }
}
