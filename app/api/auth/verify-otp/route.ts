import { NextRequest, NextResponse } from "next/server";
import { getSql, isDbConfigured } from "@/lib/db";
import { normalizeDigits, normalizeMobile } from "@/lib/phone";
import {
  OTP_MAX_ATTEMPTS,
  SESSION_COOKIE,
  SESSION_MAX_AGE_S,
  createSessionToken,
  hashOtp,
  isAuthConfigured,
  safeEqualHex,
} from "@/lib/userAuth";

/** مرحله‌ی ۲ ورود: کد پیامک‌شده را بررسی می‌کند و در صورت درست بودن، کاربر را وارد می‌کند */
export async function POST(req: NextRequest) {
  if (!isAuthConfigured() || !isDbConfigured()) {
    return NextResponse.json({ error: "ورود با پیامک هنوز روی این سایت راه‌اندازی نشده است" }, { status: 503 });
  }

  let body: { phone?: unknown; code?: unknown };
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ error: "درخواست نامعتبر است" }, { status: 400 });
  }

  const phone = typeof body.phone === "string" ? normalizeMobile(body.phone) : null;
  const code = typeof body.code === "string" ? normalizeDigits(body.code) : "";
  if (!phone) return NextResponse.json({ error: "شماره موبایل معتبر نیست" }, { status: 400 });
  if (!/^\d{6}$/.test(code)) {
    return NextResponse.json({ error: "کد تأیید ۶ رقم است" }, { status: 400 });
  }

  const sql = getSql();
  if (!sql) return NextResponse.json({ error: "خطا در اتصال به پایگاه داده" }, { status: 503 });

  try {
    // هر بررسی یک «تلاش» حساب می‌شود (اتمیک، تا با درخواست‌های هم‌زمان دور زده نشود)
    const rows = await sql`
      UPDATE otp_codes SET attempts = attempts + 1
      WHERE phone = ${phone} AND expires_at > now() AND attempts < ${OTP_MAX_ATTEMPTS}
      RETURNING code_hash, attempts
    `;
    if (rows.length === 0) {
      return NextResponse.json(
        { error: "کد منقضی شده یا تعداد تلاش‌ها تمام شده است. کد جدید دریافت کنید.", reason: "expired" },
        { status: 400 }
      );
    }

    const { code_hash: storedHash, attempts } = rows[0] as { code_hash: string; attempts: number };
    if (!safeEqualHex(hashOtp(phone, code), storedHash)) {
      const left = OTP_MAX_ATTEMPTS - attempts;
      if (left <= 0) {
        await sql`DELETE FROM otp_codes WHERE phone = ${phone}`;
        return NextResponse.json(
          { error: "کد اشتباه است و تعداد تلاش‌ها تمام شد. کد جدید دریافت کنید.", reason: "expired" },
          { status: 400 }
        );
      }
      return NextResponse.json({ error: `کد اشتباه است (${left} تلاش باقی مانده)` }, { status: 400 });
    }

    // کد فقط یک‌بار قابل استفاده است
    const used = await sql`DELETE FROM otp_codes WHERE phone = ${phone} AND code_hash = ${storedHash} RETURNING phone`;
    if (used.length === 0) {
      return NextResponse.json({ error: "این کد قبلاً استفاده شده است. کد جدید دریافت کنید.", reason: "expired" }, { status: 400 });
    }

    await sql`
      INSERT INTO users (phone, last_login_at) VALUES (${phone}, now())
      ON CONFLICT (phone) DO UPDATE SET last_login_at = now()
    `;

    const res = NextResponse.json({ ok: true, phone });
    res.cookies.set(SESSION_COOKIE, createSessionToken(phone), {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "lax",
      maxAge: SESSION_MAX_AGE_S,
      path: "/",
    });
    return res;
  } catch (err) {
    console.error("verify-otp error", err);
    return NextResponse.json({ error: "خطا در بررسی کد. دوباره تلاش کنید." }, { status: 500 });
  }
}
