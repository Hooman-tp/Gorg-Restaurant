import { NextRequest } from "next/server";
import { COOKIE_NAME, verifyAdminToken } from "@/lib/adminAuth";
import { isDbConfigured } from "@/lib/db";
import { json } from "@/lib/adminApi";
import { getSettings } from "@/lib/settings";

/** آیا ادمین واردشده؟ (برای نمایش صفحه‌ی ورود یا پنل) */
export async function GET(req: NextRequest) {
  const admin = verifyAdminToken(req.cookies.get(COOKIE_NAME)?.value);
  if (!admin) return json({ ok: false }, 401);
  const settings = isDbConfigured() ? await getSettings() : null;
  return json({ ok: true, username: admin.username, dbConfigured: isDbConfigured(), businessName: settings?.businessName ?? "رستوران گرگ" });
}
