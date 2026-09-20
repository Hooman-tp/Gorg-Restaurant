import { createHmac, randomInt, timingSafeEqual } from "crypto";

/**
 * ورود مشتری با شماره موبایل.
 *
 * نشست (session) یک کوکیِ امضاشده و HttpOnly است: «شماره.زمانِ‌انقضا.امضا».
 * کلید امضا فقط از متغیرهای محیطی خوانده می‌شود و کلیدِ پیش‌فرضِ ثابت وجود
 * ندارد؛ اگر هیچ‌کدام تنظیم نشده باشد، ورود کاملاً غیرفعال است (نه ناامن).
 */

export const SESSION_COOKIE = "gorg_session";
export const SESSION_MAX_AGE_S = 30 * 24 * 60 * 60; // ۳۰ روز
export const OTP_TTL_S = 5 * 60; // اعتبار کد: ۵ دقیقه
export const OTP_RESEND_S = 120; // فاصله‌ی حداقلی بین دو پیامک به یک شماره
export const OTP_MAX_ATTEMPTS = 5; // حداکثر تلاشِ اشتباه برای هر کد
export const OTP_MAX_PER_HOUR_PHONE = 5; // حداکثر پیامک به یک شماره در ساعت
export const OTP_MAX_PER_HOUR_IP = 10; // حداکثر درخواست از یک IP در ساعت (جلوگیری از سوءاستفاده از اعتبار پیامک)

function getSecret(): string | null {
  return process.env.AUTH_SECRET || process.env.ADMIN_SESSION_SECRET || process.env.ADMIN_PASSWORD || null;
}

export function isAuthConfigured() {
  return Boolean(getSecret());
}

function sign(purpose: string, value: string): string {
  const secret = getSecret();
  if (!secret) throw new Error("AUTH_SECRET تنظیم نشده است");
  return createHmac("sha256", secret).update(`${purpose}:${value}`).digest("hex");
}

/** امضای HMAC برای هر مقدار (مثلاً جزئیات سفارشِ در انتظار پرداخت) تا در مسیر قابل دستکاری نباشد */
export function signValue(purpose: string, value: string): string {
  return sign(purpose, value);
}

/** کد ۶ رقمیِ تصادفی (با منبع تصادفیِ امنِ سیستم‌عامل) */
export function generateOtpCode(): string {
  return String(randomInt(100000, 1000000));
}

/** فقط هشِ کد در دیتابیس ذخیره می‌شود، نه خودِ کد */
export function hashOtp(phone: string, code: string): string {
  return sign("otp", `${phone}:${code}`);
}

export function safeEqualHex(a: string, b: string): boolean {
  const x = Buffer.from(a);
  const y = Buffer.from(b);
  return x.length === y.length && timingSafeEqual(x, y);
}

export function createSessionToken(phone: string): string {
  const exp = Date.now() + SESSION_MAX_AGE_S * 1000;
  return `${phone}.${exp}.${sign("session", `${phone}.${exp}`)}`;
}

/** شماره‌ی کاربر را برمی‌گرداند اگر کوکی معتبر و منقضی‌نشده باشد */
export function readSessionPhone(token: string | undefined | null): string | null {
  if (!token || !isAuthConfigured()) return null;
  const [phone, exp, sig] = token.split(".");
  if (!phone || !exp || !sig || !/^09\d{9}$/.test(phone)) return null;
  if (!(Number(exp) > Date.now())) return null;
  try {
    return safeEqualHex(sig, sign("session", `${phone}.${exp}`)) ? phone : null;
  } catch {
    return null;
  }
}

/** IP کاربر (پشت پروکسیِ Vercel) برای محدودکردن تعداد درخواست */
export function clientIp(req: Request): string {
  const fwd = req.headers.get("x-forwarded-for");
  return (fwd ? fwd.split(",")[0].trim() : req.headers.get("x-real-ip")) || "unknown";
}
