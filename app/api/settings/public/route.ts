import { NextResponse } from "next/server";
import { getSettings, publicSettings } from "@/lib/settings";
import { dbQuery, isDbConfigured } from "@/lib/db";

/** تنظیمات و میزهای فعال برای سایت (باز/بسته بودن سفارش، حداقل سفارش، هزینه‌ی ارسال) */
export async function GET(req: Request) {
  const s = await getSettings();
  let table: { code: string; title: string } | null = null;
  const code = new URL(req.url).searchParams.get("table");
  if (code && isDbConfigured()) {
    try {
      const rows = await dbQuery("SELECT code, title FROM dining_tables WHERE code = $1 AND active = true", [code.slice(0, 20)]);
      if (rows[0]) table = { code: String(rows[0].code), title: String(rows[0].title ?? "") };
    } catch {
      /* نادیده */
    }
  }
  return NextResponse.json({ ...publicSettings(s), table }, { headers: { "Cache-Control": "no-store" } });
}
