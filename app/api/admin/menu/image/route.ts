import { NextRequest } from "next/server";
import { adminOnly, json, readBody } from "@/lib/adminApi";
import { saveMenuImage } from "@/lib/menuStore";

// عکس در مرورگر کوچک و فشرده می‌شود (حدود ۸۰ تا ۲۰۰ کیلوبایت)؛ این سقف فقط محافظ است
const MAX_BASE64 = 700_000;

export const POST = adminOnly(async (req: NextRequest) => {
  const b = await readBody<{ mime?: string; data?: string }>(req);
  const mime = b.mime === "image/png" || b.mime === "image/webp" ? b.mime : "image/jpeg";
  const data = typeof b.data === "string" ? b.data.replace(/^data:[^,]+,/, "") : "";
  if (!data || !/^[A-Za-z0-9+/=]+$/.test(data)) return json({ error: "فایل عکس نامعتبر است" }, 400);
  if (data.length > MAX_BASE64) return json({ error: "حجم عکس زیاد است؛ عکس کوچک‌تری انتخاب کنید" }, 413);
  return json({ ok: true, url: await saveMenuImage(mime, data) });
});
