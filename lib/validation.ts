/** اعتبارسنجی شماره موبایل یا تلفن ثابت ایران */
export function isValidIranianPhone(raw: string): boolean {
  const digits = raw.replace(/[\s-]/g, "");
  if (!/^\d+$/.test(digits)) return false;
  if (!digits.startsWith("0")) return false;
  // موبایل: ۰۹ + ۹ رقم دیگر = ۱۱ رقم
  if (/^09\d{9}$/.test(digits)) return true;
  // ثابت: صفر + کد شهر + شماره، در مجموع ۱۰ یا ۱۱ رقم
  if (/^0\d{9,10}$/.test(digits)) return true;
  return false;
}

/** یک کد پیگیری کوتاه و خوانا برای سفارش می‌سازد، مثل GORG-7K3XQ2 */
export function generateOrderCode(): string {
  const chars = "ABCDEFGHJKLMNPQRSTUVWXYZ23456789"; // بدون حروف/رقم‌های شبیه به هم
  let code = "";
  for (let i = 0; i < 6; i++) {
    code += chars[Math.floor(Math.random() * chars.length)];
  }
  return `GORG-${code}`;
}
