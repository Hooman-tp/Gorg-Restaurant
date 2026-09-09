import { createHmac, timingSafeEqual } from "crypto";

const COOKIE_NAME = "gorg_admin";
const MAX_AGE_MS = 7 * 24 * 60 * 60 * 1000; // ۷ روز

function getSecret() {
  // اگر ADMIN_SESSION_SECRET تنظیم نشده باشد، از خودِ رمز ادمین به‌عنوان
  // کلید امضا استفاده می‌شود (کافی است چون فقط برای همین سایت است)
  return process.env.ADMIN_SESSION_SECRET || process.env.ADMIN_PASSWORD || "gorg-fallback-secret";
}

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

export function createAdminToken(): string {
  const ts = Date.now().toString();
  const sig = createHmac("sha256", getSecret()).update(ts).digest("hex");
  return `${ts}.${sig}`;
}

export function verifyAdminToken(token: string | undefined | null): boolean {
  if (!token) return false;
  const [ts, sig] = token.split(".");
  if (!ts || !sig) return false;
  if (Date.now() - Number(ts) > MAX_AGE_MS) return false;
  const expected = createHmac("sha256", getSecret()).update(ts).digest("hex");
  try {
    return timingSafeEqual(Buffer.from(sig), Buffer.from(expected));
  } catch {
    return false;
  }
}

export { COOKIE_NAME };
