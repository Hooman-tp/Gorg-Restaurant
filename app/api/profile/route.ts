import { NextRequest, NextResponse } from "next/server";
import { SESSION_COOKIE, readSessionPhone } from "@/lib/userAuth";
import { getProfile } from "@/lib/users";

/** نام/آدرس/موقعیتِ ذخیره‌شده‌ی کاربرِ واردشده (برای پر شدن خودکار فرم سفارش) */
export async function GET(req: NextRequest) {
  const phone = readSessionPhone(req.cookies.get(SESSION_COOKIE)?.value);
  if (!phone) {
    return NextResponse.json({ error: "ابتدا وارد شوید" }, { status: 401, headers: { "Cache-Control": "no-store" } });
  }
  const profile = await getProfile(phone);
  return NextResponse.json({ profile }, { headers: { "Cache-Control": "no-store" } });
}
