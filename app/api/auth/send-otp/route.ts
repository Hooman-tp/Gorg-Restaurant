import { NextRequest, NextResponse } from "next/server";
import { getSql, isDbConfigured } from "@/lib/db";
import { sendOtpSms } from "@/lib/kavenegar";
import { normalizeMobile, mobileError } from "@/lib/phone";
import {
  OTP_MAX_PER_HOUR_IP,
  OTP_MAX_PER_HOUR_PHONE,
  OTP_RESEND_S,
  OTP_TTL_S,
  clientIp,
  generateOtpCode,
  hashOtp,
  isAuthConfigured,
} from "@/lib/userAuth";

/** مرحله‌ی ۱ ورود: شماره را می‌گیرد و یک رمز یکبار مصرف پیامک می‌کند */
export async function POST(req: NextRequest) {
  if (!isAuthConfigured() || !isDbConfigured()) {
    return NextResponse.json(
      { error: "ورود با پیامک هنوز روی این سایت راه‌اندازی نشده است" },
      { status: 503 }
    );
  }

  let body: { phone?: unknown };
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ error: "درخواست نامعتبر است" }, { status: 400 });
  }

  const raw = typeof body.phone === "string" ? body.phone : "";
  const phone = normalizeMobile(raw);
  if (!phone) {
    return NextResponse.json({ error: mobileError(raw) || "شماره موبایل معتبر نیست" }, { status: 400 });
  }

  const sql = getSql();
  if (!sql) return NextResponse.json({ error: "خطا در اتصال به پایگاه داده" }, { status: 503 });
  const ip = clientIp(req);

  try {
    // ۱) سقف درخواست از یک IP
    const ipRows = await sql`
      SELECT count(*)::int AS n FROM otp_requests
      WHERE ip = ${ip} AND created_at > now() - interval '1 hour'
    `;
    if ((ipRows[0]?.n ?? 0) >= OTP_MAX_PER_HOUR_IP) {
      return NextResponse.json(
        { error: "تعداد درخواست‌ها زیاد است. کمی بعد دوباره تلاش کنید.", reason: "limit" },
        { status: 429 }
      );
    }

    // ۲) سقف ساعتیِ همین شماره
    const existing = await sql`
      SELECT send_count, window_start,
             GREATEST(0, ceil(extract(epoch FROM (window_start + interval '1 hour' - now()))))::int AS window_left,
             GREATEST(0, ceil(extract(epoch FROM (sent_at + make_interval(secs => ${OTP_RESEND_S}) - now()))))::int AS cooldown_left
      FROM otp_codes WHERE phone = ${phone}
    `;
    const row = existing[0];
    if (row) {
      const inWindow = Number(row.window_left) > 0;
      if (inWindow && row.send_count >= OTP_MAX_PER_HOUR_PHONE) {
        return NextResponse.json(
          { error: "تعداد درخواست کد برای این شماره زیاد بوده. یک ساعت دیگر دوباره تلاش کنید.", reason: "limit" },
          { status: 429 }
        );
      }
      if (Number(row.cooldown_left) > 0) {
        return NextResponse.json(
          { error: "کد ورود همین چند لحظه پیش برای شما ارسال شده است.", reason: "cooldown", retryAfter: row.cooldown_left },
          { status: 429 }
        );
      }
    }

    // ۳) ساخت کد و ذخیره‌ی هش آن. شرطِ WHERE باعث می‌شود اگر دو درخواست هم‌زمان
    //    برسد، فقط یکی از آن‌ها پیامک بفرستد.
    const code = generateOtpCode();
    const saved = await sql`
      INSERT INTO otp_codes (phone, code_hash, expires_at, attempts, sent_at, send_count, window_start)
      VALUES (${phone}, ${hashOtp(phone, code)}, now() + make_interval(secs => ${OTP_TTL_S}), 0, now(), 1, now())
      ON CONFLICT (phone) DO UPDATE SET
        code_hash = EXCLUDED.code_hash,
        expires_at = EXCLUDED.expires_at,
        attempts = 0,
        sent_at = now(),
        send_count = CASE WHEN otp_codes.window_start > now() - interval '1 hour'
                          THEN otp_codes.send_count + 1 ELSE 1 END,
        window_start = CASE WHEN otp_codes.window_start > now() - interval '1 hour'
                            THEN otp_codes.window_start ELSE now() END
      WHERE otp_codes.sent_at <= now() - make_interval(secs => ${OTP_RESEND_S})
      RETURNING phone
    `;
    if (saved.length === 0) {
      return NextResponse.json(
        { error: "کد ورود همین چند لحظه پیش برای شما ارسال شده است.", reason: "cooldown", retryAfter: OTP_RESEND_S },
        { status: 429 }
      );
    }

    await sql`INSERT INTO otp_requests (ip) VALUES (${ip})`;

    // ۴) ارسال پیامک
    const sent = await sendOtpSms(phone, code);
    if (!sent) {
      // کاربر نباید به‌خاطر خرابیِ پیامک ۲ دقیقه معطل شود
      await sql`UPDATE otp_codes SET sent_at = now() - interval '1 day' WHERE phone = ${phone}`;
      return NextResponse.json(
        { error: "ارسال پیامک با مشکل روبه‌رو شد. چند لحظه بعد دوباره تلاش کنید." },
        { status: 502 }
      );
    }

    // پاک‌سازی رکوردهای قدیمی (سبک و گاه‌به‌گاه)
    if (Math.random() < 0.1) {
      await sql`DELETE FROM otp_requests WHERE created_at < now() - interval '1 day'`;
      await sql`DELETE FROM otp_codes WHERE expires_at < now() - interval '1 day'`;
    }

    return NextResponse.json({ ok: true, expiresIn: OTP_TTL_S, resendAfter: OTP_RESEND_S });
  } catch (err) {
    console.error("send-otp error", err);
    return NextResponse.json({ error: "خطا در ارسال کد. دوباره تلاش کنید." }, { status: 500 });
  }
}
