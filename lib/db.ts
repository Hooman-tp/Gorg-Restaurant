import { neon } from "@neondatabase/serverless";
import { DDL, SCHEMA_VERSION } from "./schema";

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

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export type Row = Record<string, any>;

let schemaPromise: Promise<void> | null = null;

/**
 * جدول‌های پنل مدیریت و ستون‌های جدیدِ سفارش‌ها را (فقط اگر لازم باشد) می‌سازد.
 * یک ردیفِ «نسخه‌ی اسکیما» نگه می‌داریم؛ اگر برابر بود فقط یک کوئری سبک اجرا می‌شود.
 * همه‌ی دستورها idempotent هستند، پس نیازی نیست دستی چیزی را در Neon اجرا کنید
 * (فایل lib/schema.sql هم همین‌ها را برای اجرای دستی دارد).
 */
export function ensureSchema(): Promise<void> {
  if (!schemaPromise) {
    schemaPromise = runSchema().catch((err) => {
      schemaPromise = null; // دفعه‌ی بعد دوباره تلاش شود
      throw err;
    });
  }
  return schemaPromise;
}

async function runSchema(): Promise<void> {
  const sql = getSql();
  if (!sql) return;
  try {
    const rows = await sql.query("SELECT value FROM site_settings WHERE key = 'schema_version'");
    if (rows[0]?.value === SCHEMA_VERSION) return;
  } catch {
    // جدول site_settings هنوز نیست؛ اسکیما را می‌سازیم
  }
  // خطاهای «قبلاً ساخته شده / رقابتِ دو نمونه‌ی هم‌زمان» بی‌خطرند؛ بقیه‌ی خطاها اسکیما را «ناقص» می‌کنند
  const BENIGN = new Set(["23505", "42P07", "42710", "42701", "42P06"]);
  let firstFatal: unknown = null;
  for (const stmt of DDL) {
    try {
      await sql.query(stmt);
    } catch (err) {
      const code = (err as { code?: string })?.code ?? "";
      if (BENIGN.has(code)) continue;
      console.error("schema statement failed:", stmt.slice(0, 80), err);
      firstFatal ??= err;
    }
  }
  // اگر چیزی واقعاً شکست خورده، «نسخه‌ی اسکیما» ثبت نمی‌شود تا درخواستِ بعدی دوباره تلاش کند
  if (firstFatal) throw firstFatal;
  await sql.query(
    "INSERT INTO site_settings (key, value) VALUES ('schema_version', $1) ON CONFLICT (key) DO UPDATE SET value = EXCLUDED.value, updated_at = now()",
    [SCHEMA_VERSION]
  );
}

/** اجرای یک کوئریِ پارامتردار (بعد از اطمینان از وجود اسکیما) */
export async function dbQuery(text: string, params: unknown[] = []): Promise<Row[]> {
  const sql = getSql();
  if (!sql) throw new Error("DATABASE_URL تنظیم نشده است");
  await ensureSchema();
  return (await sql.query(text, params)) as Row[];
}
