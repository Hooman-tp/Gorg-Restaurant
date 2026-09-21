import { CartLine } from "./types";

/** نوع‌ها و برچسب‌های سفارش که هم سرور و هم مرورگرِ پنل استفاده می‌کنند (بدون هیچ وابستگی به دیتابیس) */

export type OrderStatus = "received" | "preparing" | "ready" | "delivered" | "cancelled";
export type OrderType = "delivery" | "pickup" | "dine_in";
/** website = سایت · qr = اسکن QR میز · pos = ثبت حضوری در صندوق */
export type OrderSource = "website" | "qr" | "pos";
export type PaymentMethod = "online" | "cash" | "card" | "other";

export const STATUS_LABELS: Record<OrderStatus, string> = {
  received: "جدید",
  preparing: "در حال آماده‌سازی",
  ready: "آماده",
  delivered: "تحویل داده شد",
  cancelled: "لغو شده",
};

export const SOURCE_LABELS: Record<OrderSource, string> = {
  website: "سایت",
  qr: "QR میز",
  pos: "حضوری",
};

export const PAYMENT_LABELS: Record<PaymentMethod, string> = {
  online: "آنلاین",
  cash: "نقد",
  card: "کارت‌خوان",
  other: "سایر",
};

export const ORDER_TYPE_LABELS: Record<OrderType, string> = {
  delivery: "ارسال با پیک",
  pickup: "بیرون‌بر / تحویل حضوری",
  dine_in: "سالن",
};

export interface StoredOrder {
  id: number;
  order_code: string;
  name: string;
  phone: string;
  address: string | null;
  order_type: OrderType;
  notes: string | null;
  lines: CartLine[];
  total: number;
  status: OrderStatus;
  ref_id: string | null;
  lat?: number | null;
  lng?: number | null;
  source?: OrderSource;
  payment_method?: PaymentMethod;
  table_no?: string | null;
  subtotal?: number | null;
  discount?: number;
  delivery_fee?: number;
  cancel_reason?: string | null;
  created_at: string;
  updated_at: string;
  preparing_at?: string | null;
  ready_at?: string | null;
  delivered_at?: string | null;
}

