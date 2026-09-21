import { NextRequest } from "next/server";
import { adminOnly, int, json, readBody, str } from "@/lib/adminApi";
import { addExpense, closeShift, deleteExpense, getOpenShift, listClosedShifts, listExpenses, openShift } from "@/lib/cash";
import { addDays, dayEndISO, dayStartISO, isDayKey, todayKey } from "@/lib/tehran";

/** وضعیت صندوق: شیفت باز، تاریخچه‌ی شیفت‌ها و هزینه‌های ۳۰ روز اخیر (یا بازه‌ی دلخواه) */
export const GET = adminOnly(async (req: NextRequest) => {
  const p = req.nextUrl.searchParams;
  const to = isDayKey(p.get("to")) ? (p.get("to") as string) : todayKey();
  const from = isDayKey(p.get("from")) ? (p.get("from") as string) : addDays(to, -29);
  const [shift, history, expenses] = await Promise.all([
    getOpenShift(),
    listClosedShifts(15),
    listExpenses(dayStartISO(from), dayEndISO(to)),
  ]);
  return json({ shift, history, expenses, from, to });
});

interface Body {
  action?: string;
  openingCash?: unknown;
  countedCash?: unknown;
  note?: string;
  expense?: { title?: string; category?: string; amount?: unknown; payMethod?: string; note?: string };
  id?: number;
}

export const POST = adminOnly(async (req: NextRequest) => {
  const b = await readBody<Body>(req);
  switch (b.action) {
    case "openShift":
      await openShift(int(b.openingCash));
      return json({ ok: true });
    case "closeShift": {
      const closed = await closeShift(int(b.countedCash), b.note);
      return json({ ok: true, closed });
    }
    case "addExpense": {
      const e = b.expense ?? {};
      await addExpense({
        title: str(e.title, 160),
        category: str(e.category, 40) || "سایر",
        amount: int(e.amount),
        payMethod: str(e.payMethod, 10),
        note: str(e.note, 300),
      });
      return json({ ok: true });
    }
    case "deleteExpense":
      if (!b.id) return json({ error: "درخواست نامعتبر" }, 400);
      await deleteExpense(int(b.id));
      return json({ ok: true });
    default:
      return json({ error: "عملیات نامعتبر" }, 400);
  }
});
