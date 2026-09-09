import { neon } from "@neondatabase/serverless";

/**
 * اتصال دیتابیس. وقتی از داشبورد Vercel یک دیتابیس Postgres/Neon وصل
 * می‌کنید، متغیر محیطی DATABASE_URL به‌طور خودکار تنظیم می‌شود.
 * تا وقتی این متغیر تنظیم نشده، isDbConfigured() مقدار false برمی‌گرداند
 * و بخش‌های مربوط به سفارش/پیگیری بدون خطا، فقط بدون ثبت در دیتابیس کار
 * می‌کنند (سفارش همچنان با ایمیل/پیامک اطلاع داده می‌شود).
 */

export function isDbConfigured() {
  return Boolean(process.env.DATABASE_URL);
}

export function getSql() {
  const url = process.env.DATABASE_URL;
  if (!url) return null;
  return neon(url);
}
