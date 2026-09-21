import { dbQuery } from "./db";
import { getRecipeCosts } from "./inventory";
import { CartLine } from "./types";
import { addDays, dayEndISO, dayKey, dayStartISO, daysBetween, hourOf } from "./tehran";

export interface ReportOrderRow {
  created_at: string;
  total: number;
  status: string;
  source: string;
  payment_method: string;
  order_type: string;
  lines: CartLine[];
  discount: number;
  delivery_fee: number;
}

export interface ReportExpenseRow {
  amount: number;
  category: string;
  spent_at: string;
}

export interface Bucket {
  orders: number;
  revenue: number;
}

export interface Report {
  from: string;
  to: string;
  totals: {
    orders: number;
    revenue: number;
    avgTicket: number;
    itemsSold: number;
    cancelled: number;
    cancelledAmount: number;
    discounts: number;
    deliveryFees: number;
    cogs: number;
    grossProfit: number;
    expenses: number;
    netProfit: number;
  };
  bySource: Record<string, Bucket>;
  byPayment: Record<string, Bucket>;
  byType: Record<string, Bucket>;
  daily: { date: string; orders: number; revenue: number; website: number; qr: number; pos: number }[];
  hourly: number[];
  products: { id: string; name: string; qty: number; revenue: number; cogs: number }[];
  categories: { id: string; qty: number; revenue: number }[];
  expensesByCategory: { category: string; amount: number }[];
  truncated: boolean;
}

const bucket = (): Bucket => ({ orders: 0, revenue: 0 });

/**
 * تجمیع گزارش از ردیف‌های خام (تابع خالص؛ قابل‌تست).
 * فروش = مجموع مبلغ سفارش‌های غیرلغوشده. سود ناخالص = فروش − بهای تمام‌شده‌ی اقلام؛
 * سود خالص = سود ناخالص − هزینه‌ها.
 */
export function buildReport(
  orders: ReportOrderRow[],
  expenses: ReportExpenseRow[],
  itemCost: Record<string, number>,
  categoryOf: Record<string, string>,
  from: string,
  to: string,
  truncated = false
): Report {
  const bySource: Record<string, Bucket> = { website: bucket(), qr: bucket(), pos: bucket() };
  const byPayment: Record<string, Bucket> = { online: bucket(), cash: bucket(), card: bucket(), other: bucket() };
  const byType: Record<string, Bucket> = { delivery: bucket(), pickup: bucket(), dine_in: bucket() };
  const dailyMap = new Map<string, { orders: number; revenue: number; website: number; qr: number; pos: number }>();
  for (const d of daysBetween(from, to)) dailyMap.set(d, { orders: 0, revenue: 0, website: 0, qr: 0, pos: 0 });
  const hourly = new Array(24).fill(0) as number[];
  const prod = new Map<string, { id: string; name: string; qty: number; revenue: number; cogs: number }>();
  const cat = new Map<string, { id: string; qty: number; revenue: number }>();

  let revenue = 0,
    count = 0,
    itemsSold = 0,
    cancelled = 0,
    cancelledAmount = 0,
    discounts = 0,
    deliveryFees = 0,
    cogs = 0;

  for (const o of orders) {
    const total = Number(o.total) || 0;
    if (o.status === "cancelled") {
      cancelled++;
      cancelledAmount += total;
      continue;
    }
    count++;
    revenue += total;
    discounts += Number(o.discount) || 0;
    deliveryFees += Number(o.delivery_fee) || 0;
    const add = (map: Record<string, Bucket>, key: string) => {
      const b = (map[key] ??= bucket());
      b.orders++;
      b.revenue += total;
    };
    add(bySource, o.source || "website");
    add(byPayment, o.payment_method || "online");
    add(byType, o.order_type);

    const day = dayKey(o.created_at);
    const d = dailyMap.get(day);
    if (d) {
      d.orders++;
      d.revenue += total;
      const s = (o.source === "qr" || o.source === "pos" ? o.source : "website") as "website" | "qr" | "pos";
      d[s]++;
    }
    hourly[hourOf(o.created_at)]++;

    for (const l of o.lines ?? []) {
      const qty = Number(l.qty) || 0;
      const rev = qty * (Number(l.price) || 0);
      const cost = qty * (itemCost[l.id] ?? 0);
      itemsSold += qty;
      cogs += cost;
      const p = prod.get(l.id) ?? { id: l.id, name: l.name, qty: 0, revenue: 0, cogs: 0 };
      p.qty += qty;
      p.revenue += rev;
      p.cogs += cost;
      prod.set(l.id, p);
      const cid = categoryOf[l.id] ?? "other";
      const c = cat.get(cid) ?? { id: cid, qty: 0, revenue: 0 };
      c.qty += qty;
      c.revenue += rev;
      cat.set(cid, c);
    }
  }

  const expByCat = new Map<string, number>();
  let expTotal = 0;
  for (const e of expenses) {
    const a = Number(e.amount) || 0;
    expTotal += a;
    expByCat.set(e.category, (expByCat.get(e.category) ?? 0) + a);
  }

  const grossProfit = revenue - cogs;
  return {
    from,
    to,
    totals: {
      orders: count,
      revenue,
      avgTicket: count ? Math.round(revenue / count) : 0,
      itemsSold,
      cancelled,
      cancelledAmount,
      discounts,
      deliveryFees,
      cogs,
      grossProfit,
      expenses: expTotal,
      netProfit: grossProfit - expTotal,
    },
    bySource,
    byPayment,
    byType,
    daily: Array.from(dailyMap, ([date, v]) => ({ date, ...v })),
    hourly,
    products: Array.from(prod.values()).sort((a, b) => b.revenue - a.revenue),
    categories: Array.from(cat.values()).sort((a, b) => b.revenue - a.revenue),
    expensesByCategory: Array.from(expByCat, ([category, amount]) => ({ category, amount })).sort((a, b) => b.amount - a.amount),
    truncated,
  };
}

const MAX_ROWS = 30000;

/** گزارشِ بازه‌ی [from, to] (هر دو YYYY-MM-DD، به وقت ایران) از دیتابیس */
export async function getReport(from: string, to: string): Promise<Report> {
  const start = dayStartISO(from);
  const end = dayEndISO(to);
  const [orders, expenses, menuRows, recipeCosts] = await Promise.all([
    dbQuery(
      `SELECT created_at, total, status, source, payment_method, order_type, lines, discount, delivery_fee
       FROM orders WHERE created_at >= $1::timestamptz AND created_at < $2::timestamptz
       ORDER BY created_at DESC LIMIT ${MAX_ROWS + 1}`,
      [start, end]
    ),
    dbQuery("SELECT amount, category, spent_at FROM expenses WHERE spent_at >= $1::timestamptz AND spent_at < $2::timestamptz", [start, end]),
    dbQuery("SELECT id, category, cost FROM menu_items"),
    getRecipeCosts(),
  ]);
  const itemCost: Record<string, number> = {};
  const categoryOf: Record<string, string> = {};
  for (const m of menuRows) {
    const id = String(m.id);
    categoryOf[id] = String(m.category);
    // اگر دستور مصرف انبار دارد همان، وگرنه بهای دستیِ آیتم
    itemCost[id] = recipeCosts[id] ?? (Number(m.cost) || 0);
  }
  const truncated = orders.length > MAX_ROWS;
  const rows = (truncated ? orders.slice(0, MAX_ROWS) : orders).map((r) => ({
    created_at: new Date(r.created_at).toISOString(),
    total: Number(r.total),
    status: String(r.status),
    source: String(r.source ?? "website"),
    payment_method: String(r.payment_method ?? "online"),
    order_type: String(r.order_type),
    lines: (r.lines ?? []) as CartLine[],
    discount: Number(r.discount) || 0,
    delivery_fee: Number(r.delivery_fee) || 0,
  }));
  return buildReport(
    rows,
    expenses.map((e) => ({ amount: Number(e.amount), category: String(e.category), spent_at: new Date(e.spent_at).toISOString() })),
    itemCost,
    categoryOf,
    from,
    to,
    truncated
  );
}

export { addDays };
