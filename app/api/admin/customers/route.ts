import { NextRequest } from "next/server";
import { adminOnly, json } from "@/lib/adminApi";
import { dbQuery } from "@/lib/db";

/** مشتریان بر اساس شماره‌ی تماسِ سفارش‌ها (سفارش‌های لغوشده حساب نمی‌شوند) */
export const GET = adminOnly(async (req: NextRequest) => {
  const q = (req.nextUrl.searchParams.get("q") ?? "").trim();
  const params: unknown[] = [];
  let where = "phone <> '' AND status <> 'cancelled'";
  if (q) {
    params.push(`%${q}%`);
    where += ` AND (phone ILIKE $1 OR name ILIKE $1)`;
  }
  const [rows, users, totals] = await Promise.all([
    dbQuery(
      `SELECT phone,
              (ARRAY_AGG(name ORDER BY created_at DESC))[1] AS name,
              COUNT(*)::int AS orders,
              COALESCE(SUM(total),0)::float8 AS spent,
              COUNT(*) FILTER (WHERE source = 'pos')::int AS pos_orders,
              MIN(created_at) AS first_order,
              MAX(created_at) AS last_order
       FROM orders WHERE ${where}
       GROUP BY phone ORDER BY MAX(created_at) DESC LIMIT 300`,
      params
    ),
    dbQuery("SELECT COUNT(*)::int AS c FROM users"),
    dbQuery(
      `SELECT COUNT(DISTINCT phone)::int AS c FROM orders WHERE phone <> '' AND status <> 'cancelled'`
    ),
  ]);
  return json({
    customers: rows.map((r) => ({
      phone: String(r.phone),
      name: String(r.name ?? ""),
      orders: Number(r.orders),
      spent: Number(r.spent),
      posOrders: Number(r.pos_orders),
      firstOrder: new Date(r.first_order).toISOString(),
      lastOrder: new Date(r.last_order).toISOString(),
    })),
    registeredUsers: Number(users[0]?.c) || 0,
    customersWithOrders: Number(totals[0]?.c) || 0,
  });
});
