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

/**
 * ارسال «رمز یکبار مصرف» ورود.
 *
 * روش پیشنهادی کاوه‌نگار برای کد تأیید، «الگو» (verify/lookup) است که سریع‌تر
 * و مطمئن‌تر از پیامک معمولی می‌رسد. در پنل کاوه‌نگار (بخش «ارسال با الگو»)
 * یک الگو با نام دلخواه، مثلاً gorg-otp و این متن بسازید و تأیید کنید:
 *
 *   کد ورود شما به رستوران گرگ: %token
 *
 * سپس نام الگو را در KAVENEGAR_OTP_TEMPLATE بگذارید. اگر الگو تنظیم نباشد، از
 * پیامک معمولی استفاده می‌شود (ممکن است روی بعضی خطوط دیرتر برسد).
 *
 * در محیط توسعه (npm run dev) و فقط وقتی KAVENEGAR_API_KEY خالی است، کد در
 * کنسولِ سرور چاپ می‌شود تا بتوانید بدون پیامک واقعی تست کنید. در محیط
 * production هرگز کد چاپ یا برگردانده نمی‌شود.
 */
export async function sendOtpSms(receptor: string, code: string): Promise<boolean> {
  if (!API_KEY) {
    if (process.env.NODE_ENV !== "production") {
      console.log(`[DEV] رمز یکبار مصرف برای ${receptor}: ${code}`);
      return true;
    }
    console.error("sendOtpSms: KAVENEGAR_API_KEY تنظیم نشده است");
    return false;
  }

  const template = process.env.KAVENEGAR_OTP_TEMPLATE;
  try {
    if (template) {
      const params = new URLSearchParams({ receptor, token: code, template });
      const res = await fetch(`https://api.kavenegar.com/v1/${API_KEY}/verify/lookup.json?${params.toString()}`, {
        method: "GET",
      });
      const json = await res.json();
      const ok = json?.return?.status === 200;
      if (!ok) console.error("kavenegar otp lookup failed", json?.return);
      return ok;
    }
    return await sendSms(receptor, `کد ورود شما به رستوران گرگ: ${code}\nاین کد را در اختیار کسی قرار ندهید.`);
  } catch (err) {
    console.error("kavenegar otp error", err);
    return false;
  }
}
