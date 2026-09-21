import { NextRequest, NextResponse } from "next/server";
import { checkAdminPassword, COOKIE_NAME, createAdminToken, isAdminConfigured } from "@/lib/adminAuth";
import {
  clearFailedLogins,
  createAdminUser,
  getAdminUserByUsername,
  getAdminUserCount,
  isLocked,
  registerFailedLogin,
  verifyPassword,
} from "@/lib/adminUsers";
import { dbQuery, isDbConfigured } from "@/lib/db";

const GENERIC_ERROR = "نام کاربری یا رمز عبور اشتباه است";

function setCookie(username: string) {
  const token = createAdminToken(username);
  const res = NextResponse.json({ ok: true, username });
  res.cookies.set(COOKIE_NAME, token, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax",
    maxAge: 60 * 60 * 24 * 7,
    path: "/",
  });
  return res;
}

export async function POST(req: NextRequest) {
  if (!isDbConfigured()) {
    return NextResponse.json({ error: "دیتابیس هنوز وصل نشده (DATABASE_URL)" }, { status: 503 });
  }

  let body: { username?: string; password?: string };
  try {
    body = await req.json();
  } catch {
    body = {};
  }
  const username = typeof body.username === "string" ? body.username.trim().slice(0, 60) : "";
  const password = typeof body.password === "string" ? body.password : "";
  if (!password) {
    return NextResponse.json({ error: "رمز عبور را وارد کنید" }, { status: 400 });
  }

  const count = await getAdminUserCount();

  // ─── اولین ورود: هنوز هیچ حسابی ساخته نشده ───
  if (count === 0) {
    if (!isAdminConfigured()) {
      return NextResponse.json(
        { error: "پنل مدیریت هنوز روی این سایت راه‌اندازی نشده (ADMIN_PASSWORD تنظیم نشده)" },
        { status: 503 }
      );
    }
    if (!username) {
      return NextResponse.json({ error: "برای اولین ورود، یک نام کاربری انتخاب کنید" }, { status: 400 });
    }
    if (!checkAdminPassword(password)) {
      return NextResponse.json({ error: "رمز عبور اشتباه است" }, { status: 401 });
    }
    await createAdminUser(username, password);
    return setCookie(username);
  }

  // ─── رمزِ اضطراری/هاست: صرف‌نظر از نام کاربری واردشده، به‌عنوان مدیر اصلی وارد می‌شود ───
  // (این مسیر فقط به کسی که به تنظیمات هاست دسترسی دارد قدرت می‌دهد، نه به
  // هر کسی که پشت سیستم رستوران بنشیند و بخواهد ورود را دور بزند)
  if (isAdminConfigured() && checkAdminPassword(password)) {
    const target = username ? await getAdminUserByUsername(username) : null;
    if (target) return setCookie(String(target.username));
    const firstRows = await dbQuery("SELECT username FROM admin_users ORDER BY id ASC LIMIT 1");
    const first = firstRows[0]?.username ? String(firstRows[0].username) : username || "admin";
    return setCookie(first);
  }

  if (!username) {
    return NextResponse.json({ error: GENERIC_ERROR }, { status: 401 });
  }

  const user = await getAdminUserByUsername(username);
  if (!user) {
    return NextResponse.json({ error: GENERIC_ERROR }, { status: 401 });
  }
  if (isLocked(user)) {
    return NextResponse.json(
      { error: "به دلیل چند بار ورود ناموفق، این حساب موقتاً قفل شده. چند دقیقه دیگر دوباره تلاش کنید یا از «رمز را فراموش کرده‌ام» استفاده کنید." },
      { status: 423 }
    );
  }
  if (!verifyPassword(password, String(user.password_hash))) {
    await registerFailedLogin(username);
    return NextResponse.json({ error: GENERIC_ERROR }, { status: 401 });
  }

  await clearFailedLogins(username);
  return setCookie(String(user.username));
}
