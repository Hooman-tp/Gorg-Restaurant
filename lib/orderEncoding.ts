import { CartLine } from "@/lib/types";

export interface EncodedOrder {
  lines: CartLine[];
  total: number;
  orderType: "delivery" | "pickup";
  orderCode: string;
  name: string;
  phone: string;
  address?: string;
  notes?: string;
}

/**
 * چون هنوز دیتابیسی برای نگه‌داشتن سفارش‌های «در انتظار پرداخت» وصل نیست،
 * جزئیات سفارش را در خودِ callback_url به‌صورت base64 رمزگذاری می‌کنیم تا
 * وقتی زرین‌پال کاربر را برمی‌گرداند، بتوانیم دوباره سفارش را بازسازی کنیم.
 * (برای مقیاس بزرگ‌تر، ذخیره در یک دیتابیس واقعی گزینه‌ی درست‌تری‌ست.)
 */
export function encodeOrder(order: EncodedOrder): string {
  const json = JSON.stringify(order);
  return Buffer.from(json, "utf-8").toString("base64url");
}

export function decodeOrder(encoded: string): EncodedOrder | null {
  try {
    const json = Buffer.from(encoded, "base64url").toString("utf-8");
    return JSON.parse(json) as EncodedOrder;
  } catch {
    return null;
  }
}
