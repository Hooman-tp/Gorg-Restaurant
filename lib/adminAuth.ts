import { createHmac, timingSafeEqual } from "crypto";

const COOKIE_NAME = "gorg_admin";
const MAX_AGE_MS = 7 * 24 * 60 * 60 * 1000; // ۷ روز

export interface AdminSession {
  username: string;
}

function getSecret() {
  // اگر ADMIN_SESSION_SECRET تنظیم نشده باشد، از خودِ رمز ادمین به‌عنوان
  // کلید امضا استفاده می‌شود (کافی است چون فقط برای همین سایت است)
  return process.env.ADMIN_SESSION_SECRET || process.env.ADMIN_PASSWORD || "gorg-fallback-secret";
}

/**
 * رمزِ اضطراری/راه‌اندازیِ اولیه که در تنظیمات هاست (نه در دیتابیس) نگه
 * داشته می‌شود. برای ورودِ روزمره دیگر لازم نیست؛ فقط برای اولین بار (ساختن
 * حساب مدیر) و برای مواقعی که مدیر رستوران هم رمز و هم ایمیلِ بازیابی را
 * فراموش کرده به کار می‌آید — چون فقط کسی که به تنظیمات هاست/سرور دسترسی
 * دارد آن را می‌بیند، نه هر کسی که پشت سیستم رستوران بنشیند.
 */
export function isAdminConfigured() {
  return Boolean(process.env.ADMIN_PASSWORD);
}

export function checkAdminPassword(password: string): boolean {
  const real = process.env.ADMIN_PASSWORD;
  if (!real) return false;
  const a = Buffer.from(password);
  const b = Buffer.from(real);
  if (a.length !== b.length) return false;
  return timingSafeEqual(a, b);
}

export function createAdminToken(username: string): string {
  const ts = Date.now().toString();
  const u = Buffer.from(username, "utf8").toString("base64url");
  const sig = createHmac("sha256", getSecret()).update(`${u}.${ts}`).digest("hex");
  return `${u}.${ts}.${sig}`;
}

export function verifyAdminToken(token: string | undefined | null): AdminSession | null {
  if (!token) return null;
  const parts = token.split(".");
  if (parts.length !== 3) return null;
  const [u, ts, sig] = parts;
  if (!u || !ts || !sig) return null;
  if (!Number.isFinite(Number(ts)) || Date.now() - Number(ts) > MAX_AGE_MS) return null;
  const expected = createHmac("sha256", getSecret()).update(`${u}.${ts}`).digest("hex");
  try {
    if (!timingSafeEqual(Buffer.from(sig), Buffer.from(expected))) return null;
  } catch {
    return null;
  }
  try {
    const username = Buffer.from(u, "base64url").toString("utf8");
    if (!username) return null;
    return { username };
  } catch {
    return null;
  }
}

export { COOKIE_NAME };
