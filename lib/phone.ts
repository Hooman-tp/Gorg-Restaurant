/**
 * کمک‌های شماره موبایل ایران — هم در مرورگر و هم روی سرور استفاده می‌شود.
 * ورود با پیامک فقط شماره‌ی «۱۱ رقمی که با ۰۹ شروع می‌شود» را می‌پذیرد.
 */

const FA_DIGITS = "۰۱۲۳۴۵۶۷۸۹";
const AR_DIGITS = "٠١٢٣٤٥٦٧٨٩";

/** رقم‌های فارسی و عربی را انگلیسی می‌کند و فاصله، خط‌تیره و پرانتز را برمی‌دارد */
export function normalizeDigits(input: string): string {
  return input
    .replace(/[۰-۹]/g, (d) => String(FA_DIGITS.indexOf(d)))
    .replace(/[٠-٩]/g, (d) => String(AR_DIGITS.indexOf(d)))
    .replace(/[\s\-()‌\u200f\u200e]/g, "");
}

/**
 * شماره را به شکل استاندارد ۰۹xxxxxxxxx برمی‌گرداند؛ اگر معتبر نباشد null.
 * فرمت‌های +98، 0098 و 98 (مثلاً وقتی شماره را از جایی کپی می‌کنید) هم به
 * ۰۹… تبدیل می‌شوند. شماره‌ی ۱۰ رقمی بدون صفر ابتدایی عمداً رد می‌شود.
 */
export function normalizeMobile(raw: string): string | null {
  let d = normalizeDigits(raw);
  if (d.startsWith("+98")) d = "0" + d.slice(3);
  else if (d.startsWith("0098")) d = "0" + d.slice(4);
  else if (d.startsWith("98") && d.length === 12) d = "0" + d.slice(2);
  return /^09\d{9}$/.test(d) ? d : null;
}

/** پیام خطای مناسب برای چیزی که کاربر تایپ کرده؛ رشته‌ی خالی یعنی مشکلی نیست */
export function mobileError(raw: string): string {
  const d = normalizeDigits(raw);
  if (!d) return "شماره موبایل را وارد کنید";
  if (!/^[0-9+]+$/.test(d)) return "شماره موبایل فقط باید شامل رقم باشد";
  if (normalizeMobile(raw)) return "";
  if (!d.startsWith("09") && !d.startsWith("+98") && !d.startsWith("0098") && !d.startsWith("98")) {
    return "شماره موبایل باید با ۰۹ شروع شود";
  }
  if (d.length < 11) return `شماره ناقص است؛ ${(11 - d.length).toLocaleString("fa-IR")} رقم دیگر لازم است`;
  return "شماره موبایل باید دقیقاً ۱۱ رقم باشد";
}

/** ۰۹۱۲ ••• ۴۵۶۷ — برای نمایش شماره بدون فاش کردن همه‌ی آن */
export function maskMobile(phone: string): string {
  if (phone.length !== 11) return phone;
  return `${phone.slice(0, 4)} ••• ${phone.slice(7)}`;
}
