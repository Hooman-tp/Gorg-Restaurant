import { dbQuery, getSql, isDbConfigured, Row } from "./db";
import { applyOrderStock, restoreOrderStock } from "./inventory";
import { CartLine } from "./types";
import type { OrderSource, OrderStatus, OrderType, PaymentMethod, StoredOrder } from "./orderMeta";
import { dayEndISO, dayStartISO, isDayKey } from "./tehran";

export {
  STATUS_LABELS,
  SOURCE_LABELS,
  PAYMENT_LABELS,
  ORDER_TYPE_LABELS,
} from "./orderMeta";
export type { OrderStatus, OrderType, OrderSource, PaymentMethod, StoredOrder } from "./orderMeta";

export interface SaveOrderInput {
  orderCode: string;
  name: string;
  phone: string;
  address?: string;
  orderType: OrderType;
  notes?: string;
  lines: CartLine[];
  /** مبلغ نهایی قابل‌پرداخت = جمع اقلام − تخفیف + هزینه‌ی ارسال */
  total: number;
  subtotal?: number;
  discount?: number;
  deliveryFee?: number;
  refId?: number | string;
  lat?: number;
  lng?: number;
  source?: OrderSource;
  paymentMethod?: PaymentMethod;
  tableNo?: string;
  /** وضعیتِ شروع؛ سفارش‌های سایت «received» و سفارش‌های صندوق معمولاً «preparing» */
  status?: OrderStatus;
}

/**
 * created: تازه ثبت شد · exists: قبلاً همین سفارش ثبت شده بود (مثلاً رفرش صفحه‌ی نتیجه)
 * duplicate_payment: همین پرداخت قبلاً برای سفارشِ دیگری استفاده شده
 * skipped/failed: دیتابیس وصل نیست یا خطا داد (سفارش پرداخت‌شده است، پس اعلان باز هم ارسال می‌شود)
 */
export type SaveOrderResult = "created" | "exists" | "duplicate_payment" | "skipped" | "failed";

/** سفارشِ «پرداخت‌شده» را ذخیره می‌کند و مصرف انبار را کم می‌کند. سایت فقط بعد از تأیید پرداخت صدا می‌زند. */
export async function saveOrder(order: SaveOrderInput): Promise<SaveOrderResult> {
  if (!isDbConfigured()) return "skipped";

  try {
    const refId = order.refId ? String(order.refId) : null;

    // یک پرداخت فقط برای یک سفارش معتبر است
    if (refId) {
      const dup = await dbQuery("SELECT 1 FROM orders WHERE ref_id = $1 AND order_code <> $2 LIMIT 1", [refId, order.orderCode]);
      if (dup.length > 0) return "duplicate_payment";
    }

    const status = order.status ?? "received";
    const now = new Date().toISOString();
    let rows: Row[];
    try {
      rows = await dbQuery(
        `INSERT INTO orders (order_code, name, phone, address, order_type, notes, lines, total, ref_id, status, lat, lng,
                             source, payment_method, table_no, subtotal, discount, delivery_fee, preparing_at, ready_at, delivered_at)
         VALUES ($1,$2,$3,$4,$5,$6,$7::jsonb,$8,$9,$10,$11,$12,$13,$14,$15,$16,$17,$18,$19,$20,$21)
         ON CONFLICT (order_code) DO NOTHING
         RETURNING id`,
        [
          order.orderCode,
          order.name,
          order.phone,
          order.address || null,
          order.orderType,
          order.notes || null,
          JSON.stringify(order.lines),
          order.total,
          refId,
          status,
          order.lat ?? null,
          order.lng ?? null,
          order.source ?? "website",
          order.paymentMethod ?? "online",
          order.tableNo || null,
          order.subtotal ?? order.total,
          order.discount ?? 0,
          order.deliveryFee ?? 0,
          status === "preparing" || status === "ready" || status === "delivered" ? now : null,
          status === "ready" || status === "delivered" ? now : null,
          status === "delivered" ? now : null,
        ]
      );
    } catch (err) {
      // سفارشِ پرداخت‌شده نباید به‌خاطر یک مشکل اسکیما گم شود؛ با ستون‌های پایه دوباره تلاش می‌کنیم
      console.error("saveOrder کامل خطا داد؛ با ستون‌های پایه دوباره تلاش می‌شود", err);
      const sql = getSql();
      if (!sql) return "failed";
      rows = await sql.query(
        `INSERT INTO orders (order_code, name, phone, address, order_type, notes, lines, total, ref_id, status)
         VALUES ($1,$2,$3,$4,$5,$6,$7::jsonb,$8,$9,$10)
         ON CONFLICT (order_code) DO NOTHING RETURNING id`,
        [order.orderCode, order.name, order.phone, order.address || null, order.orderType, order.notes || null, JSON.stringify(order.lines), order.total, refId, status]
      );
    }

    if (rows.length === 0) return "exists";

    try {
      await applyOrderStock(order.orderCode);
    } catch (err) {
      console.error("applyOrderStock error", err);
    }
    return "created";
  } catch (err) {
    console.error("saveOrder error", err);
    return "failed";
  }
}

function toOrder(r: Row): StoredOrder {
  const iso = (v: unknown) => (v ? new Date(v as string).toISOString() : null);
  return {
    ...(r as StoredOrder),
    lines: (r.lines ?? []) as CartLine[],
    total: Number(r.total),
    lat: r.lat == null ? null : Number(r.lat),
    lng: r.lng == null ? null : Number(r.lng),
    created_at: iso(r.created_at) as string,
    updated_at: iso(r.updated_at) as string,
    preparing_at: iso(r.preparing_at),
    ready_at: iso(r.ready_at),
    delivered_at: iso(r.delivered_at),
  };
}

/** سفارش را با کد پیگیری + شماره تماس پیدا می‌کند (برای صفحه‌ی پیگیری مشتری) */
export async function findOrderByCodeAndPhone(orderCode: string, phone: string): Promise<StoredOrder | null> {
  if (!isDbConfigured()) return null;
  try {
    const rows = await dbQuery("SELECT * FROM orders WHERE order_code = $1 AND phone = $2 LIMIT 1", [orderCode, phone]);
    return rows[0] ? toOrder(rows[0]) : null;
  } catch (err) {
    console.error("findOrderByCodeAndPhone error", err);
    return null;
  }
}

export interface OrderFilter {
  status?: string; // یک وضعیت، یا «active» = جدید+در حال آماده‌سازی+آماده
  source?: string;
  q?: string;
  from?: string; // YYYY-MM-DD
  to?: string;
  limit?: number;
}

/** لیست سفارش‌ها با فیلتر (پنل مدیریت) */
export async function listOrders(f: OrderFilter = {}): Promise<StoredOrder[]> {
  const where: string[] = [];
  const params: unknown[] = [];
  const add = (sql: string, v: unknown) => {
    params.push(v);
    where.push(sql.replace("?", `$${params.length}`));
  };
  if (f.status === "active") where.push("status IN ('received','preparing','ready')");
  else if (f.status && f.status !== "all") add("status = ?", f.status);
  if (f.source && f.source !== "all") add("source = ?", f.source);
  if (f.q?.trim()) {
    params.push(`%${f.q.trim()}%`);
    const i = params.length;
    where.push(`(order_code ILIKE $${i} OR name ILIKE $${i} OR phone ILIKE $${i} OR COALESCE(table_no,'') ILIKE $${i})`);
  }
  if (isDayKey(f.from)) add("created_at >= ?::timestamptz", dayStartISO(f.from));
  if (isDayKey(f.to)) add("created_at < ?::timestamptz", dayEndISO(f.to));
  const limit = Math.min(500, Math.max(1, f.limit ?? 100));
  const rows = await dbQuery(`SELECT * FROM orders ${where.length ? "WHERE " + where.join(" AND ") : ""} ORDER BY created_at DESC LIMIT ${limit}`, params);
  return rows.map(toOrder);
}

/** برای «زنگ سفارش جدید» در پنل: آخرین شناسه + تعداد سفارش‌های جدید و در حال کار */
export async function orderPulse(): Promise<{ latestId: number; received: number; preparing: number; ready: number }> {
  const rows = await dbQuery(
    `SELECT COALESCE(MAX(id),0)::int AS latest,
            COUNT(*) FILTER (WHERE status='received')::int AS received,
            COUNT(*) FILTER (WHERE status='preparing')::int AS preparing,
            COUNT(*) FILTER (WHERE status='ready')::int AS ready
     FROM orders`
  );
  const r = rows[0] ?? {};
  return { latestId: Number(r.latest) || 0, received: Number(r.received) || 0, preparing: Number(r.preparing) || 0, ready: Number(r.ready) || 0 };
}

const STATUS_ORDER: OrderStatus[] = ["received", "preparing", "ready", "delivered", "cancelled"];

/**
 * وضعیت سفارش را عوض می‌کند و زمانِ مرحله‌ها را ثبت می‌کند. لغو = برگشتِ مصرف انبار.
 * سفارشِ لغوشده دیگر قابل‌بازگشت نیست (برای جلوگیری از خرابیِ حساب و انبار).
 */
export async function setOrderStatus(orderCode: string, status: OrderStatus, reason?: string): Promise<StoredOrder | null> {
  if (!STATUS_ORDER.includes(status)) return null;
  const cur = await dbQuery("SELECT status FROM orders WHERE order_code = $1", [orderCode]);
  if (!cur[0]) return null;
  if (cur[0].status === "cancelled") return null;

  const sets = ["status = $2", "updated_at = now()"];
  const params: unknown[] = [orderCode, status];
  if (status === "preparing") sets.push("preparing_at = COALESCE(preparing_at, now())");
  if (status === "ready") sets.push("preparing_at = COALESCE(preparing_at, now())", "ready_at = COALESCE(ready_at, now())");
  if (status === "delivered")
    sets.push("preparing_at = COALESCE(preparing_at, now())", "ready_at = COALESCE(ready_at, now())", "delivered_at = COALESCE(delivered_at, now())");
  if (status === "cancelled") {
    params.push(reason?.trim().slice(0, 300) || null);
    sets.push(`cancel_reason = $${params.length}`);
  }
  const rows = await dbQuery(`UPDATE orders SET ${sets.join(", ")} WHERE order_code = $1 RETURNING *`, params);
  if (status === "cancelled") {
    try {
      await restoreOrderStock(orderCode);
    } catch (err) {
      console.error("restoreOrderStock error", err);
    }
  }
  return rows[0] ? toOrder(rows[0]) : null;
}
