import { NextRequest } from "next/server";
import { adminOnly, json } from "@/lib/adminApi";
import { getReport } from "@/lib/reports";
import { addDays, todayKey } from "@/lib/tehran";
import { listOrders, orderPulse } from "@/lib/orders";
import { listInventory } from "@/lib/inventory";
import { getOpenShift } from "@/lib/cash";
import { dbQuery } from "@/lib/db";

export const GET = adminOnly(async (_req: NextRequest) => {
  const today = todayKey();
  const [day, week, pulse, latest, inv, shift, menuCount] = await Promise.all([
    getReport(today, today),
    getReport(addDays(today, -6), today),
    orderPulse(),
    listOrders({ status: "active", limit: 12 }),
    listInventory(),
    getOpenShift(),
    dbQuery("SELECT COUNT(*)::int AS c FROM menu_items WHERE active = true"),
  ]);
  const low = inv.items.filter((i) => i.stock <= i.minStock).sort((a, b) => a.stock - a.minStock - (b.stock - b.minStock));
  return json({
    today: day,
    week,
    pulse,
    active: latest,
    lowStock: low.slice(0, 8),
    lowStockCount: low.length,
    shift,
    menuItems: Number(menuCount[0]?.c) || 0,
  });
});
