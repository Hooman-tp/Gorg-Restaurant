/**
 * اتصال به درگاه پرداخت زرین‌پال (Payment API v4).
 * منبع مستندات رسمی: https://www.zarinpal.com/docs/paymentGateway/connectToGateway
 *
 * برای فعال‌سازی، این دو متغیر محیطی را در .env.local تنظیم کنید:
 *   ZARINPAL_MERCHANT_ID=xxxxxxxx-xxxx-xxxx-xxxx-xxxxxxxxxxxx
 *   ZARINPAL_SANDBOX=true   (برای تست قبل از تأیید نهایی درگاه؛ در حالت واقعی حذفش کنید یا false بگذارید)
 *
 * تا وقتی ZARINPAL_MERCHANT_ID تنظیم نشده، جریان پرداخت به‌طور کامل غیرفعال
 * می‌ماند و سایت به روال قبلی (ثبت مستقیم سفارش بدون پرداخت آنلاین) برمی‌گردد.
 */

const MERCHANT_ID = process.env.ZARINPAL_MERCHANT_ID;
const SANDBOX = process.env.ZARINPAL_SANDBOX === "true";

const BASE_URL = SANDBOX ? "https://sandbox.zarinpal.com" : "https://payment.zarinpal.com";

export function isZarinpalConfigured() {
  return Boolean(MERCHANT_ID);
}

interface RequestParams {
  amountToman: number;
  description: string;
  callbackUrl: string;
  mobile?: string;
}

interface ZarinpalRequestResponse {
  ok: boolean;
  authority?: string;
  payUrl?: string;
  errorMessage?: string;
}

export async function createZarinpalPayment({
  amountToman,
  description,
  callbackUrl,
  mobile,
}: RequestParams): Promise<ZarinpalRequestResponse> {
  if (!MERCHANT_ID) {
    return { ok: false, errorMessage: "درگاه پرداخت هنوز تنظیم نشده (ZARINPAL_MERCHANT_ID)" };
  }

  try {
    const res = await fetch(`${BASE_URL}/pg/v4/payment/request.json`, {
      method: "POST",
      headers: { "Content-Type": "application/json", Accept: "application/json" },
      body: JSON.stringify({
        merchant_id: MERCHANT_ID,
        amount: amountToman,
        currency: "IRT", // مبلغ به تومان ارسال می‌شود (نه ریال)
        description,
        callback_url: callbackUrl,
        metadata: mobile ? { mobile } : undefined,
      }),
    });

    const json = await res.json();
    const code = json?.data?.code;
    const authority = json?.data?.authority;

    if (code === 100 && authority) {
      return { ok: true, authority, payUrl: `${BASE_URL}/pg/StartPay/${authority}` };
    }
    return { ok: false, errorMessage: json?.errors?.message || `کد خطا: ${code}` };
  } catch (err) {
    console.error("zarinpal request error", err);
    return { ok: false, errorMessage: "ارتباط با درگاه پرداخت برقرار نشد" };
  }
}

interface VerifyResult {
  ok: boolean;
  refId?: number;
  errorMessage?: string;
}

export async function verifyZarinpalPayment(amountToman: number, authority: string): Promise<VerifyResult> {
  if (!MERCHANT_ID) {
    return { ok: false, errorMessage: "درگاه پرداخت هنوز تنظیم نشده" };
  }

  try {
    const res = await fetch(`${BASE_URL}/pg/v4/payment/verify.json`, {
      method: "POST",
      headers: { "Content-Type": "application/json", Accept: "application/json" },
      body: JSON.stringify({
        merchant_id: MERCHANT_ID,
        amount: amountToman,
        currency: "IRT",
        authority,
      }),
    });

    const json = await res.json();
    const code = json?.data?.code;

    // ۱۰۰ یعنی موفق؛ ۱۰۱ یعنی این تراکنش قبلاً هم verify شده (باز هم موفق است)
    if (code === 100 || code === 101) {
      return { ok: true, refId: json?.data?.ref_id };
    }
    return { ok: false, errorMessage: json?.errors?.message || `پرداخت تأیید نشد (کد ${code})` };
  } catch (err) {
    console.error("zarinpal verify error", err);
    return { ok: false, errorMessage: "ارتباط با درگاه پرداخت برای تأیید برقرار نشد" };
  }
}
