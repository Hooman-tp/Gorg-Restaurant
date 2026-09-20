import { NextRequest, NextResponse } from "next/server";
import { SESSION_COOKIE, readSessionPhone } from "@/lib/userAuth";

/** کاربرِ واردشده را برمی‌گرداند (یا phone: null) */
export async function GET(req: NextRequest) {
  const phone = readSessionPhone(req.cookies.get(SESSION_COOKIE)?.value);
  return NextResponse.json({ phone }, { headers: { "Cache-Control": "no-store" } });
}
