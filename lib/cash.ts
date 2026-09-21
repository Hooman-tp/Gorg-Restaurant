import { dbQuery } from "./db";

/** صندوق: شیفت‌ها (باز/بستن) و هزینه‌ها */

export interface ShiftState {
  id: number;
  openedAt: string;
  openingCash: number;
  cashSales: number;
  cardSales: number;
  onlineSales: number;
  otherSales: number;
  cashOrders: number;
  cashExpenses: number;
  expectedCash: number;
}

export interface ClosedShift {
  id: number;
  openedAt: string;
  closedAt: string;
  openingCash: number;
  expectedCash: number;
  countedCash: number;
  note: string | null;
}

const n = (v: unknown) => Number(v) || 0;

/** جمعِ فروش (به تفکیک روش پرداخت) و هزینه‌ی نقدی از یک زمان به بعد */
async function sinceTotals(sinceISO: string, untilISO?: string) {
  const until = untilISO ?? new Date(Date.now() + 60_000).toISOString();
  const [sales, exp] = await Promise.all([
    dbQuery(
      `SELECT payment_method, COUNT(*)::int AS c, COALESCE(SUM(total),0)::float8 AS s
       FROM orders WHERE status <> 'cancelled' AND created_at >= $1::timestamptz AND created_at < $2::timestamptz
       GROUP BY payment_method`,
      [sinceISO, until]
    ),
    dbQuery(
      `SELECT COALESCE(SUM(amount),0)::float8 AS s FROM expenses
       WHERE pay_method = 'cash' AND spent_at >= $1::timestamptz AND spent_at < $2::timestamptz`,
      [sinceISO, until]
    ),
  ]);
  const by: Record<string, { c: number; s: number }> = {};
  for (const r of sales) by[String(r.payment_method)] = { c: n(r.c), s: n(r.s) };
  return {
    cash: by.cash?.s ?? 0,
    card: by.card?.s ?? 0,
    online: by.online?.s ?? 0,
    other: by.other?.s ?? 0,
    cashOrders: by.cash?.c ?? 0,
    cashExpenses: n(exp[0]?.s),
  };
}

export async function getOpenShift(): Promise<ShiftState | null> {
  const rows = await dbQuery("SELECT * FROM cash_shifts WHERE closed_at IS NULL ORDER BY id DESC LIMIT 1");
  const s = rows[0];
  if (!s) return null;
  const openedAt = new Date(s.opened_at).toISOString();
  const t = await sinceTotals(openedAt);
  const opening = n(s.opening_cash);
  return {
    id: Number(s.id),
    openedAt,
    openingCash: opening,
    cashSales: t.cash,
    cardSales: t.card,
    onlineSales: t.online,
    otherSales: t.other,
    cashOrders: t.cashOrders,
    cashExpenses: t.cashExpenses,
    expectedCash: opening + t.cash - t.cashExpenses,
  };
}

export async function openShift(openingCash: number): Promise<void> {
  const open = await dbQuery("SELECT 1 FROM cash_shifts WHERE closed_at IS NULL LIMIT 1");
  if (open.length > 0) throw new Error("یک شیفت باز وجود دارد؛ اول آن را ببندید");
  await dbQuery("INSERT INTO cash_shifts (opening_cash) VALUES ($1)", [Math.max(0, Math.round(openingCash))]);
}

export async function closeShift(countedCash: number, note?: string): Promise<ClosedShift> {
  const shift = await getOpenShift();
  if (!shift) throw new Error("شیفت بازی وجود ندارد");
  const rows = await dbQuery(
    "UPDATE cash_shifts SET closed_at = now(), counted_cash = $2, expected_cash = $3, note = $4 WHERE id = $1 RETURNING *",
    [shift.id, Math.round(countedCash), Math.round(shift.expectedCash), note?.trim().slice(0, 300) || null]
  );
  return toClosed(rows[0]);
}

function toClosed(r: Record<string, unknown>): ClosedShift {
  return {
    id: Number(r.id),
    openedAt: new Date(r.opened_at as string).toISOString(),
    closedAt: new Date(r.closed_at as string).toISOString(),
    openingCash: n(r.opening_cash),
    expectedCash: n(r.expected_cash),
    countedCash: n(r.counted_cash),
    note: r.note ? String(r.note) : null,
  };
}

export async function listClosedShifts(limit = 20): Promise<ClosedShift[]> {
  const rows = await dbQuery("SELECT * FROM cash_shifts WHERE closed_at IS NOT NULL ORDER BY id DESC LIMIT " + Math.min(60, limit));
  return rows.map(toClosed);
}

export interface ExpenseRow {
  id: number;
  title: string;
  category: string;
  amount: number;
  payMethod: string;
  note: string | null;
  spentAt: string;
}

export async function listExpenses(fromISO: string, toISO: string): Promise<ExpenseRow[]> {
  const rows = await dbQuery(
    "SELECT * FROM expenses WHERE spent_at >= $1::timestamptz AND spent_at < $2::timestamptz ORDER BY spent_at DESC LIMIT 500",
    [fromISO, toISO]
  );
  return rows.map((r) => ({
    id: Number(r.id),
    title: String(r.title),
    category: String(r.category),
    amount: n(r.amount),
    payMethod: String(r.pay_method),
    note: r.note ? String(r.note) : null,
    spentAt: new Date(r.spent_at).toISOString(),
  }));
}

export async function addExpense(e: { title: string; category: string; amount: number; payMethod: string; note?: string }) {
  const amount = Math.round(e.amount);
  if (!(amount > 0)) throw new Error("مبلغ باید بیشتر از صفر باشد");
  if (!e.title.trim()) throw new Error("عنوان هزینه را بنویسید");
  await dbQuery("INSERT INTO expenses (title, category, amount, pay_method, note) VALUES ($1,$2,$3,$4,$5)", [
    e.title.trim().slice(0, 160),
    (e.category || "سایر").trim().slice(0, 40),
    amount,
    e.payMethod === "card" || e.payMethod === "other" ? e.payMethod : "cash",
    e.note?.trim().slice(0, 300) || null,
  ]);
}

export async function deleteExpense(id: number) {
  await dbQuery("DELETE FROM expenses WHERE id = $1", [id]);
}
