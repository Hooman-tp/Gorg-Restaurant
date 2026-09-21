import { CartLine } from "@/lib/types";
import { safeEqualHex, signValue } from "@/lib/userAuth";

export interface EncodedOrder {
  lines: CartLine[];
  total: number;
  orderType: "delivery" | "pickup" | "dine_in";
  orderCode: string;
  name: string;
  phone: string;
  address?: string;
  notes?: string;
  lat?: number;
  lng?: number;
  /** جمع اقلام و هزینه‌ی ارسال (total = subtotal + deliveryFee) */
  subtotal?: number;
  deliveryFee?: number;
  /** سفارش با اسکن QR میز */
  tableNo?: string;
}

/**
 * چون هنوز دیتابیسی برای نگه‌داشتن سفارش‌های «در انتظار پرداخت» وصل نیست،
 * جزئیات سفارش را در خودِ callback_url به‌صورت base64 رمزگذاری می‌کنیم تا
 * وقتی زرین‌پال کاربر را برمی‌گرداند، بتوانیم دوباره سفارش را بازسازی کنیم.
 *
 * حتماً امضا می‌شود (HMAC): وگرنه هر کسی می‌توانست آدرسِ برگشت را دست‌کاری کند
 * (مثلاً اقلام گران‌تر با همان مبلغِ پرداخت‌شده). امضای نامعتبر = سفارش رد می‌شود.
 */
export function encodeOrder(order: EncodedOrder): string {
  const payload = Buffer.from(JSON.stringify(order), "utf-8").toString("base64url");
  return `${payload}.${signValue("order", payload)}`;
}

export function decodeOrder(encoded: string): EncodedOrder | null {
  try {
    const dot = encoded.lastIndexOf(".");
    if (dot < 1) return null;
    const payload = encoded.slice(0, dot);
    const sig = encoded.slice(dot + 1);
    if (!safeEqualHex(sig, signValue("order", payload))) return null;
    return JSON.parse(Buffer.from(payload, "base64url").toString("utf-8")) as EncodedOrder;
  } catch {
    return null;
  }
}
