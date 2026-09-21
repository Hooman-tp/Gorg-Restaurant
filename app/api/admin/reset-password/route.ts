import { NextRequest, NextResponse } from "next/server";
import { consumePasswordReset, getAdminUserByUsername, updateAdminAccount } from "@/lib/adminUsers";
import { isDbConfigured } from "@/lib/db";

export async function POST(req: NextRequest) {
  if (!isDbConfigured()) {
    return NextResponse.json({ error: "دیتابیس هنوز وصل نشده (DATABASE_URL)" }, { status: 503 });
  }

  let body: { token?: string; username?: string; password?: string; confirmPassword?: string };
  try {
    body = await req.json();
  } catch {
    body = {};
  }
  const token = typeof body.token === "string" ? body.token.trim() : "";
  const newUsername = typeof body.username === "string" ? body.username.trim().slice(0, 60) : "";
  const password = typeof body.password === "string" ? body.password : "";
  const confirmPassword = typeof body.confirmPassword === "string" ? body.confirmPassword : "";

  if (!token) return NextResponse.json({ error: "لینک نامعتبر است" }, { status: 400 });
  if (!newUsername || newUsername.length < 3) return NextResponse.json({ error: "نام کاربری باید حداقل ۳ حرف باشد" }, { status: 400 });
  if (/\s/.test(newUsername)) return NextResponse.json({ error: "نام کاربری نباید فاصله داشته باشد" }, { status: 400 });
  if (password.length < 8) return NextResponse.json({ error: "رمز عبور باید حداقل ۸ کاراکتر باشد" }, { status: 400 });
  if (password !== confirmPassword) return NextResponse.json({ error: "تکرارِ رمز عبور مطابقت ندارد" }, { status: 400 });

  const owningUsername = await consumePasswordReset(token);
  if (!owningUsername) {
    return NextResponse.json({ error: "لینک نامعتبر یا منقضی‌شده است؛ دوباره درخواست بازیابی بدهید" }, { status: 400 });
  }

  const user = await getAdminUserByUsername(owningUsername);
  if (!user) return NextResponse.json({ error: "حساب پیدا نشد" }, { status: 404 });

  if (newUsername.toLowerCase() !== owningUsername.toLowerCase()) {
    const clash = await getAdminUserByUsername(newUsername);
    if (clash) return NextResponse.json({ error: "این نام کاربری قبلاً گرفته شده؛ نام دیگری انتخاب کنید" }, { status: 409 });
  }

  await updateAdminAccount(Number(user.id), { username: newUsername, password });
  return NextResponse.json({ ok: true });
}
