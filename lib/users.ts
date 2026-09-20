import { getSql, isDbConfigured } from "./db";

/** اطلاعاتی که برای هر شماره‌ی موبایل نگه می‌داریم تا سفارش بعدی خودکار پر شود */
export interface UserProfile {
  name: string | null;
  address: string | null;
  lat: number | null;
  lng: number | null;
}

/**
 * پروفایلِ ذخیره‌شده‌ی این شماره. اگر ستون‌های جدید هنوز ساخته نشده باشند
 * (schema.sql دوباره اجرا نشده)، بدون خطا null برمی‌گرداند.
 */
export async function getProfile(phone: string): Promise<UserProfile | null> {
  if (!isDbConfigured()) return null;
  const sql = getSql();
  if (!sql) return null;
  try {
    const rows = await sql`SELECT name, address, lat, lng FROM users WHERE phone = ${phone} LIMIT 1`;
    const r = rows[0] as { name: string | null; address: string | null; lat: number | null; lng: number | null } | undefined;
    if (!r) return null;
    return {
      name: r.name ?? null,
      address: r.address ?? null,
      lat: r.lat == null ? null : Number(r.lat),
      lng: r.lng == null ? null : Number(r.lng),
    };
  } catch (err) {
    console.error("getProfile error (آیا schema.sql دوباره اجرا شده؟)", err);
    return null;
  }
}

/** نام (و در صورت وجود آدرس/موقعیت) را برای دفعه‌ی بعد نگه می‌دارد. مقدارِ خالی چیزِ قبلی را پاک نمی‌کند. */
export async function saveProfile(
  phone: string,
  data: { name: string; address?: string | null; lat?: number | null; lng?: number | null }
): Promise<boolean> {
  if (!isDbConfigured()) return false;
  const sql = getSql();
  if (!sql) return false;
  try {
    const address = data.address?.trim() ? data.address.trim() : null;
    const lat = typeof data.lat === "number" ? data.lat : null;
    const lng = typeof data.lng === "number" ? data.lng : null;
    await sql`
      UPDATE users SET
        name = ${data.name},
        address = COALESCE(${address}::text, address),
        lat = COALESCE(${lat}::float8, lat),
        lng = COALESCE(${lng}::float8, lng)
      WHERE phone = ${phone}
    `;
    return true;
  } catch (err) {
    console.error("saveProfile error", err);
    return false;
  }
}
