import { NextRequest } from "next/server";
import { adminOnly, json } from "@/lib/adminApi";
import { getReport } from "@/lib/reports";
import { addDays, isDayKey, todayKey, dayStartISO, dayEndISO } from "@/lib/tehran";
import { dbQuery } from "@/lib/db";
import { ORDER_TYPE_LABELS, PAYMENT_LABELS, SOURCE_LABELS, STATUS_LABELS } from "@/lib/orders";

function csvCell(v: unknown): string {
  const s = String(v ?? "");
  // جلوگیری از «تزریق فرمول» در اکسل
  const safe = /^[=+\-@]/.test(s) ? `'${s}` : s;
  return `"${safe.replace(/"/g, '""')}"`;
}

/** GET ?from=&to= → گزارش · اضافه‌ی format=csv → فایل CSV سفارش‌های همان بازه (قابل‌باز شدن در اکسل) */
export const GET = adminOnly(async (req: NextRequest) => {
  const p = req.nextUrl.searchParams;
  const today = todayKey();
  let from = p.get("from");
  let to = p.get("to");
  if (!isDayKey(to)) to = today;
  if (!isDayKey(from)) from = addDays(to, -29);
  if (from > to) [from, to] = [to, from];
  if (Date.parse(to) - Date.parse(from) > 366 * 86400_000) from = addDays(to, -366);

  if (p.get("format") === "csv") {
    const rows = await dbQuery(
      `SELECT * FROM orders WHERE created_at >= $1::timestamptz AND created_at < $2::timestamptz ORDER BY created_at DESC LIMIT 30000`,
      [dayStartISO(from), dayEndISO(to)]
    );
    const head = ["کد سفارش", "تاریخ و ساعت (ایران)", "منبع", "نوع", "میز", "نام", "تلفن", "وضعیت", "پرداخت", "جمع اقلام", "تخفیف", "هزینه ارسال", "مبلغ نهایی", "اقلام", "آدرس", "توضیحات"];
    const fmt = new Intl.DateTimeFormat("fa-IR-u-ca-persian", { timeZone: "Asia/Tehran", dateStyle: "short", timeStyle: "short" });
    const lines = rows.map((r) =>
      [
        r.order_code,
        fmt.format(new Date(r.created_at)),
        SOURCE_LABELS[r.source as keyof typeof SOURCE_LABELS] ?? r.source,
        ORDER_TYPE_LABELS[r.order_type as keyof typeof ORDER_TYPE_LABELS] ?? r.order_type,
        r.table_no ?? "",
        r.name,
        r.phone,
        STATUS_LABELS[r.status as keyof typeof STATUS_LABELS] ?? r.status,
        PAYMENT_LABELS[r.payment_method as keyof typeof PAYMENT_LABELS] ?? r.payment_method,
        r.subtotal ?? r.total,
        r.discount ?? 0,
        r.delivery_fee ?? 0,
        r.total,
        ((r.lines ?? []) as { name: string; qty: number }[]).map((l) => `${l.name}×${l.qty}`).join(" | "),
        r.address ?? "",
        r.notes ?? "",
      ]
        .map(csvCell)
        .join(",")
    );
    // BOM تا اکسل فارسی را درست بخواند
    const body = "\uFEFF" + [head.map(csvCell).join(","), ...lines].join("\r\n");
    return new Response(body, {
      headers: {
        "Content-Type": "text/csv; charset=utf-8",
        "Content-Disposition": `attachment; filename="gorg-orders-${from}_${to}.csv"`,
        "Cache-Control": "no-store",
      },
    });
  }

  return json(await getReport(from, to));
});
