/**
 * ارسال پیامک با کاوه‌نگار (kavenegar.com).
 *
 * برای فعال‌سازی، در .env.local تنظیم کنید:
 *   KAVENEGAR_API_KEY=xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx
 *   KAVENEGAR_SENDER=xxxxxxxx   (اختیاری؛ اگر خط اختصاصی نداشته باشید، خط پیش‌فرض حساب استفاده می‌شود)
 *
 * تا وقتی KAVENEGAR_API_KEY تنظیم نشده، پیامک‌ها فقط در کنسول سرور لاگ
 * می‌شوند و سایت بدون خطا به کارش ادامه می‌دهد.
 */

const API_KEY = process.env.KAVENEGAR_API_KEY;
const SENDER = process.env.KAVENEGAR_SENDER;

export function isSmsConfigured() {
  return Boolean(API_KEY);
}

export async function sendSms(receptor: string, message: string): Promise<boolean> {
  if (!API_KEY) {
    console.log("پیامک (بدون ارسال واقعی - KAVENEGAR_API_KEY تنظیم نشده):", { receptor, message });
    return false;
  }

  try {
    const params = new URLSearchParams({ receptor, message });
    if (SENDER) params.set("sender", SENDER);

    const res = await fetch(`https://api.kavenegar.com/v1/${API_KEY}/sms/send.json?${params.toString()}`, {
      method: "GET",
    });
    const json = await res.json();
    const ok = json?.return?.status === 200;
    if (!ok) console.error("kavenegar send failed", json);
    return ok;
  } catch (err) {
    console.error("kavenegar send error", err);
    return false;
  }
}
