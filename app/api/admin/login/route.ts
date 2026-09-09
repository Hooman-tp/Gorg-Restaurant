import { NextRequest, NextResponse } from "next/server";
import { checkAdminPassword, createAdminToken, isAdminConfigured, COOKIE_NAME } from "@/lib/adminAuth";

export async function POST(req: NextRequest) {
  if (!isAdminConfigured()) {
    return NextResponse.json(
      { error: "پنل مدیریت هنوز روی این سایت راه‌اندازی نشده (ADMIN_PASSWORD تنظیم نشده)" },
      { status: 503 }
    );
  }

  const { password } = await req.json();
  if (!password || !checkAdminPassword(password)) {
    return NextResponse.json({ error: "رمز عبور اشتباه است" }, { status: 401 });
  }

  const token = createAdminToken();
  const res = NextResponse.json({ ok: true });
  res.cookies.set(COOKIE_NAME, token, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax",
    maxAge: 60 * 60 * 24 * 7,
    path: "/",
  });
  return res;
}
