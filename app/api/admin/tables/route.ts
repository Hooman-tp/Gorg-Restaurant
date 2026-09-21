import { NextRequest } from "next/server";
import { adminOnly, int, json, readBody, str } from "@/lib/adminApi";
import { dbQuery } from "@/lib/db";

export const GET = adminOnly(async () => {
  const rows = await dbQuery("SELECT id, code, title, active FROM dining_tables ORDER BY LENGTH(code), code");
  return json({
    tables: rows.map((r) => ({ id: Number(r.id), code: String(r.code), title: String(r.title ?? ""), active: Boolean(r.active) })),
  });
});

export const POST = adminOnly(async (req: NextRequest) => {
  const b = await readBody<{ action?: string; code?: string; title?: string; id?: number; active?: boolean }>(req);
  if (b.action === "add") {
    const code = str(b.code, 20).replace(/\s+/g, "");
    if (!code || !/^[A-Za-z0-9\u0600-\u06FF_-]+$/.test(code)) return json({ error: "شماره‌ی میز فقط حروف/عدد باشد (بدون فاصله)" }, 400);
    const dup = await dbQuery("SELECT 1 FROM dining_tables WHERE code = $1", [code]);
    if (dup.length > 0) return json({ error: "این شماره‌ی میز قبلاً ثبت شده" }, 400);
    await dbQuery("INSERT INTO dining_tables (code, title) VALUES ($1,$2)", [code, str(b.title, 80)]);
    return json({ ok: true });
  }
  if (b.action === "toggle" && b.id) {
    await dbQuery("UPDATE dining_tables SET active = $2 WHERE id = $1", [int(b.id), Boolean(b.active)]);
    return json({ ok: true });
  }
  if (b.action === "delete" && b.id) {
    await dbQuery("DELETE FROM dining_tables WHERE id = $1", [int(b.id)]);
    return json({ ok: true });
  }
  return json({ error: "عملیات نامعتبر" }, 400);
});
