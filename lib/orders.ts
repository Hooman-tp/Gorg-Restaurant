import { getSql, isDbConfigured } from "./db";
import { CartLine } from "./types";

export interface StoredOrder {
  id: number;
  order_code: string;
  name: string;
  phone: string;
  address: string | null;
  order_type: "delivery" | "pickup";
  notes: string | null;
  lines: CartLine[];
  total: number;
  status: "received" | "preparing" | "ready" | "delivered" | "cancelled";
  ref_id: string | null;
  lat?: number | null;
  lng?: number | null;
  created_at: string;
  updated_at: string;
}

interface SaveOrderInput {
  orderCode: string;
  name: string;
  phone: string;
  address?: string;
  orderType: "delivery" | "pickup";
  notes?: string;
  lines: CartLine[];
  total: number;
  refId?: number | string;
  lat?: number;
  lng?: number;
}

/**
 * created: تازه ثبت شد · exists: قبلاً همین سفارش ثبت شده بود (مثلاً رفرش صفحه‌ی نتیجه)
 * duplicate_payment: همین پرداخت قبلاً برای سفارشِ دیگری استفاده شده
 * skipped/failed: دیتابیس وصل نیست یا خطا داد (سفارش پرداخت‌شده است، پس اعلان باز هم ارسال می‌شود)
 */
export type SaveOrderResult = "created" | "exists" | "duplicate_payment" | "skipped" | "failed";

/** سفارشِ «پرداخت‌شده» را در دیتابیس ذخیره می‌کند. فقط بعد از تأیید پرداخت صدا زده شود. */
export async function saveOrder(order: SaveOrderInput): Promise<SaveOrderResult> {
  if (!isDbConfigured()) return "skipped";
  const sql = getSql();
  if (!sql) return "skipped";

  try {
    const refId = order.refId ? String(order.refId) : null;

    // یک پرداخت فقط برای یک سفارش معتبر است
    if (refId) {
      const dup = await sql`SELECT 1 FROM orders WHERE ref_id = ${refId} AND order_code <> ${order.orderCode} LIMIT 1`;
      if (dup.length > 0) return "duplicate_payment";
    }

    let rows;
    try {
      rows = await sql`
        INSERT INTO orders (order_code, name, phone, address, order_type, notes, lines, total, ref_id, status, lat, lng)
        VALUES (
          ${order.orderCode}, ${order.name}, ${order.phone}, ${order.address || null},
          ${order.orderType}, ${order.notes || null}, ${JSON.stringify(order.lines)}::jsonb,
          ${order.total}, ${refId}, 'received', ${order.lat ?? null}, ${order.lng ?? null}
        )
        ON CONFLICT (order_code) DO NOTHING
        RETURNING id
      `;
    } catch (err) {
      // ستون‌های lat/lng هنوز ساخته نشده‌اند (schema.sql دوباره اجرا نشده)؛
      // سفارشِ پرداخت‌شده نباید به این خاطر گم شود
      console.error("saveOrder با موقعیت خطا داد؛ بدون آن دوباره تلاش می‌شود", err);
      rows = await sql`
        INSERT INTO orders (order_code, name, phone, address, order_type, notes, lines, total, ref_id, status)
        VALUES (
          ${order.orderCode}, ${order.name}, ${order.phone}, ${order.address || null},
          ${order.orderType}, ${order.notes || null}, ${JSON.stringify(order.lines)}::jsonb,
          ${order.total}, ${refId}, 'received'
        )
        ON CONFLICT (order_code) DO NOTHING
        RETURNING id
      `;
    }
    return rows.length > 0 ? "created" : "exists";
  } catch (err) {
    console.error("saveOrder error", err);
    return "failed";
  }
}

/** سفارش را با کد پیگیری + شماره تماس پیدا می‌کند (برای صفحه‌ی پیگیری مشتری) */
export async function findOrderByCodeAndPhone(orderCode: string, phone: string): Promise<StoredOrder | null> {
  if (!isDbConfigured()) return null;
  const sql = getSql();
  if (!sql) return null;

  try {
    const rows = await sql`
      SELECT * FROM orders WHERE order_code = ${orderCode} AND phone = ${phone} LIMIT 1
    `;
    return (rows[0] as StoredOrder) || null;
  } catch (err) {
    console.error("findOrderByCodeAndPhone error", err);
    return null;
  }
}

/** همه‌ی سفارش‌ها را برمی‌گرداند (برای پنل مدیریت) */
export async function getAllOrders(limit = 100): Promise<StoredOrder[]> {
  if (!isDbConfigured()) return [];
  const sql = getSql();
  if (!sql) return [];

  try {
    const rows = await sql`SELECT * FROM orders ORDER BY created_at DESC LIMIT ${limit}`;
    return rows as StoredOrder[];
  } catch (err) {
    console.error("getAllOrders error", err);
    return [];
  }
}

/** وضعیت سفارش را به‌روزرسانی می‌کند (برای پنل مدیریت) */
export async function updateOrderStatus(orderCode: string, status: StoredOrder["status"]): Promise<boolean> {
  if (!isDbConfigured()) return false;
  const sql = getSql();
  if (!sql) return false;

  try {
    await sql`UPDATE orders SET status = ${status}, updated_at = now() WHERE order_code = ${orderCode}`;
    return true;
  } catch (err) {
    console.error("updateOrderStatus error", err);
    return false;
  }
}
