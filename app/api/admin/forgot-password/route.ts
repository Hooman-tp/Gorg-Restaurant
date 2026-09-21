import { NextRequest, NextResponse } from "next/server";
import { Resend } from "resend";
import { createPasswordReset, getAdminUserByRecoveryEmail } from "@/lib/adminUsers";
import { isDbConfigured } from "@/lib/db";

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

function esc(text: string) {
  return text.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;");
}

// پیام همیشه یکسان است (چه ایمیل ثبت باشد چه نه) تا کسی نتواند حدس بزند
// کدام ایمیل‌ها در سیستم ثبت شده‌اند
const GENERIC_OK = { ok: true, message: "اگر این ایمیل به‌عنوان ایمیلِ بازیابیِ یک حساب ثبت شده باشد، لینک بازیابی برایش ارسال شد." };

export async function POST(req: NextRequest) {
  if (!isDbConfigured()) {
    return NextResponse.json({ error: "دیتابیس هنوز وصل نشده (DATABASE_URL)" }, { status: 503 });
  }
  const apiKey = process.env.RESEND_API_KEY;
  if (!apiKey) {
    return NextResponse.json({ error: "سرویس ارسال ایمیل روی سرور تنظیم نشده (RESEND_API_KEY)" }, { status: 503 });
  }

  let body: { email?: string };
  try {
    body = await req.json();
  } catch {
    body = {};
  }
  const email = typeof body.email === "string" ? body.email.trim().slice(0, 160) : "";
  if (!email || !EMAIL_RE.test(email)) {
    return NextResponse.json({ error: "یک ایمیل معتبر وارد کنید" }, { status: 400 });
  }

  try {
    const user = await getAdminUserByRecoveryEmail(email);
    if (user) {
      const username = String(user.username);
      const token = await createPasswordReset(username);
      // اگر token خالی است یعنی به‌تازگی لینکی فرستاده شده؛ دوباره ایمیل نمی‌فرستیم
      if (token) {
        const origin = req.nextUrl.origin;
        const link = `${origin}/admin/reset-password?token=${token}`;
        const resend = new Resend(apiKey);
        await resend.emails.send({
          from: "پنل مدیریت گرگ <security@gorg-restaurant.ir>",
          to: email,
          subject: "بازیابی ورود به پنل مدیریت",
          html: `
            <div dir="rtl" style="font-family:Tahoma,sans-serif;line-height:1.9">
              <h2>بازیابی ورود</h2>
              <p>نام کاربری شما: <b>${esc(username)}</b></p>
              <p>برای تعیین رمز عبور جدید، روی لینک زیر بزنید (تا ۳۰ دقیقه معتبر است و فقط یک‌بار کار می‌کند):</p>
              <p><a href="${link}">${link}</a></p>
              <p style="color:#888;font-size:13px">اگر این درخواست را شما نفرستاده‌اید، این ایمیل را نادیده بگیرید؛ رمز شما تغییر نمی‌کند.</p>
            </div>`,
        });
      }
    }
  } catch (err) {
    console.error("forgot-password error", err);
    // خطای داخلی هم نباید لو بدهد که ایمیل معتبر بوده یا نه
  }

  return NextResponse.json(GENERIC_OK);
}
