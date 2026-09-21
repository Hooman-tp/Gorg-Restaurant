import { NextRequest } from "next/server";
import { adminOnly, json } from "@/lib/adminApi";
import { getAdminUserByUsername, updateAdminAccount, verifyPassword } from "@/lib/adminUsers";
import { AdminSession, createAdminToken, COOKIE_NAME } from "@/lib/adminAuth";

/** اطلاعات حساب خودِ مدیرِ واردشده (برای «تنظیمات ← حساب کاربری») */
export const GET = adminOnly(async (_req: NextRequest, admin: AdminSession) => {
  const user = await getAdminUserByUsername(admin.username);
  if (!user) return json({ error: "حساب پیدا نشد" }, 404);
  return json({
    username: String(user.username),
    recoveryEmail: user.recovery_email ? String(user.recovery_email) : "",
  });
});

interface Body {
  currentPassword?: string;
  newUsername?: string;
  newPassword?: string;
  confirmPassword?: string;
  recoveryEmail?: string;
}

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export const POST = adminOnly(async (req: NextRequest, admin: AdminSession) => {
  const b = (await req.json().catch(() => ({}))) as Body;
  const user = await getAdminUserByUsername(admin.username);
  if (!user) return json({ error: "حساب پیدا نشد" }, 404);

  const currentPassword = typeof b.currentPassword === "string" ? b.currentPassword : "";
  if (!currentPassword || !verifyPassword(currentPassword, String(user.password_hash))) {
    return json({ error: "رمز عبور فعلی درست نیست" }, 401);
  }

  const newUsername = typeof b.newUsername === "string" ? b.newUsername.trim().slice(0, 60) : "";
  const newPassword = typeof b.newPassword === "string" ? b.newPassword : "";
  const confirmPassword = typeof b.confirmPassword === "string" ? b.confirmPassword : "";
  const recoveryEmailRaw = typeof b.recoveryEmail === "string" ? b.recoveryEmail.trim() : undefined;

  if (recoveryEmailRaw && !EMAIL_RE.test(recoveryEmailRaw)) {
    return json({ error: "ایمیلِ بازیابی معتبر نیست" }, 400);
  }
  if (newUsername && newUsername.length < 3) {
    return json({ error: "نام کاربری باید حداقل ۳ حرف باشد" }, 400);
  }
  if (newUsername && /\s/.test(newUsername)) {
    return json({ error: "نام کاربری نباید فاصله داشته باشد" }, 400);
  }
  if (newUsername && newUsername.toLowerCase() !== String(user.username).toLowerCase()) {
    const clash = await getAdminUserByUsername(newUsername);
    if (clash) return json({ error: "این نام کاربری قبلاً گرفته شده" }, 409);
  }
  if (newPassword || confirmPassword) {
    if (newPassword.length < 8) return json({ error: "رمز عبور جدید باید حداقل ۸ کاراکتر باشد" }, 400);
    if (newPassword !== confirmPassword) return json({ error: "تکرارِ رمز عبور جدید مطابقت ندارد" }, 400);
  }

  await updateAdminAccount(Number(user.id), {
    username: newUsername || undefined,
    password: newPassword || undefined,
    recoveryEmail: recoveryEmailRaw === undefined ? undefined : recoveryEmailRaw,
  });

  const finalUsername = newUsername || String(user.username);
  const res = json({ ok: true, username: finalUsername });
  res.cookies.set(COOKIE_NAME, createAdminToken(finalUsername), {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax",
    maxAge: 60 * 60 * 24 * 7,
    path: "/",
  });
  return res;
});
