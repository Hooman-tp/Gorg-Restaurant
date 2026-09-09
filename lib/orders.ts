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
}

/** سفارش را در دیتابیس ذخیره می‌کند. اگر دیتابیس وصل نباشد، بی‌صدا نادیده می‌گیرد */
export async function saveOrder(order: SaveOrderInput): Promise<boolean> {
  if (!isDbConfigured()) return false;
  const sql = getSql();
  if (!sql) return false;

  try {
    await sql`
      INSERT INTO orders (order_code, name, phone, address, order_type, notes, lines, total, ref_id, status)
      VALUES (
        ${order.orderCode}, ${order.name}, ${order.phone}, ${order.address || null},
        ${order.orderType}, ${order.notes || null}, ${JSON.stringify(order.lines)}::jsonb,
        ${order.total}, ${order.refId ? String(order.refId) : null},
        ${order.refId ? "received" : "received"}
      )
      ON CONFLICT (order_code) DO UPDATE SET ref_id = EXCLUDED.ref_id, updated_at = now()
    `;
    return true;
  } catch (err) {
    console.error("saveOrder error", err);
    return false;
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
