import { createHash, randomBytes, scryptSync, timingSafeEqual } from "crypto";
import { dbQuery, Row } from "./db";

/**
 * حساب‌های پنل مدیریت: ورود با «نام کاربری + رمز عبور» (نه فقط رمز عبور).
 * رمزها هرگز خام ذخیره نمی‌شوند؛ با scrypt (نمک تصادفی) هش می‌شوند.
 */

const KEYLEN = 64;
const MAX_FAILED = 6;
const LOCK_MINUTES = 15;
const RESET_TTL_MINUTES = 30;
const RESET_MIN_GAP_MINUTES = 3;

export function hashPassword(password: string): string {
  const salt = randomBytes(16).toString("hex");
  const hash = scryptSync(password, salt, KEYLEN).toString("hex");
  return `${salt}:${hash}`;
}

export function verifyPassword(password: string, stored: string): boolean {
  const [salt, hashHex] = stored.split(":");
  if (!salt || !hashHex) return false;
  let a: Buffer;
  let b: Buffer;
  try {
    a = scryptSync(password, salt, KEYLEN);
    b = Buffer.from(hashHex, "hex");
  } catch {
    return false;
  }
  if (a.length !== b.length) return false;
  return timingSafeEqual(a, b);
}

export async function getAdminUserCount(): Promise<number> {
  const rows = await dbQuery("SELECT COUNT(*)::int AS c FROM admin_users");
  return Number(rows[0]?.c ?? 0);
}

export async function getAdminUserByUsername(username: string): Promise<Row | null> {
  const rows = await dbQuery("SELECT * FROM admin_users WHERE lower(username) = lower($1) LIMIT 1", [username]);
  return rows[0] ?? null;
}

export async function getAdminUserByRecoveryEmail(email: string): Promise<Row | null> {
  const rows = await dbQuery("SELECT * FROM admin_users WHERE lower(recovery_email) = lower($1) LIMIT 1", [email]);
  return rows[0] ?? null;
}

export async function getAdminUserById(id: number): Promise<Row | null> {
  const rows = await dbQuery("SELECT * FROM admin_users WHERE id = $1", [id]);
  return rows[0] ?? null;
}

export function isLocked(user: Row): boolean {
  return Boolean(user.locked_until) && new Date(String(user.locked_until)).getTime() > Date.now();
}

export async function createAdminUser(username: string, password: string, recoveryEmail?: string | null): Promise<void> {
  await dbQuery(
    `INSERT INTO admin_users (username, password_hash, recovery_email) VALUES ($1,$2,$3)
     ON CONFLICT (username) DO NOTHING`,
    [username, hashPassword(password), recoveryEmail && recoveryEmail.trim() ? recoveryEmail.trim() : null]
  );
}

export async function registerFailedLogin(username: string): Promise<void> {
  const rows = await dbQuery("SELECT failed_attempts FROM admin_users WHERE lower(username) = lower($1)", [username]);
  if (!rows[0]) return;
  const next = Number(rows[0].failed_attempts ?? 0) + 1;
  if (next >= MAX_FAILED) {
    await dbQuery(
      `UPDATE admin_users SET failed_attempts = 0, locked_until = now() + interval '${LOCK_MINUTES} minutes'
       WHERE lower(username) = lower($1)`,
      [username]
    );
  } else {
    await dbQuery("UPDATE admin_users SET failed_attempts = $2 WHERE lower(username) = lower($1)", [username, next]);
  }
}

export async function clearFailedLogins(username: string): Promise<void> {
  await dbQuery("UPDATE admin_users SET failed_attempts = 0, locked_until = NULL WHERE lower(username) = lower($1)", [username]);
}

/** تغییرِ آگاهانه‌ی نام کاربری/رمز/ایمیل بازیابی توسط خودِ مدیر (از داخل پنل) */
export async function updateAdminAccount(
  id: number,
  patch: { username?: string; password?: string; recoveryEmail?: string | null }
): Promise<void> {
  const sets: string[] = [];
  const vals: unknown[] = [];
  let i = 1;
  if (patch.username) {
    sets.push(`username = $${++i}`);
    vals.push(patch.username);
  }
  if (patch.password) {
    sets.push(`password_hash = $${++i}`);
    vals.push(hashPassword(patch.password));
  }
  if (patch.recoveryEmail !== undefined) {
    sets.push(`recovery_email = $${++i}`);
    vals.push(patch.recoveryEmail && patch.recoveryEmail.trim() ? patch.recoveryEmail.trim() : null);
  }
  if (sets.length === 0) return;
  sets.push(`updated_at = now()`);
  await dbQuery(`UPDATE admin_users SET ${sets.join(", ")} WHERE id = $1`, [id, ...vals]);
}

/** ── بازیابی رمز/نام کاربری از طریق ایمیل ── */

function hashToken(token: string): string {
  return createHash("sha256").update(token).digest("hex");
}

/**
 * یک لینکِ یک‌بارمصرف می‌سازد. اگر به‌تازگی یکی ساخته شده (برای جلوگیری از
 * اسپم)، null برمی‌گرداند تا ایمیلِ تازه‌ای ارسال نشود.
 */
export async function createPasswordReset(username: string): Promise<string | null> {
  const recent = await dbQuery(
    `SELECT 1 FROM admin_password_resets
     WHERE username = $1 AND used = false AND expires_at > now()
       AND created_at > now() - interval '${RESET_MIN_GAP_MINUTES} minutes' LIMIT 1`,
    [username]
  );
  if (recent.length > 0) return null;
  const token = randomBytes(32).toString("hex");
  await dbQuery(
    `INSERT INTO admin_password_resets (token_hash, username, expires_at)
     VALUES ($1,$2, now() + interval '${RESET_TTL_MINUTES} minutes')`,
    [hashToken(token), username]
  );
  return token;
}

/** توکن را بررسی و بلافاصله «مصرف‌شده» علامت می‌زند؛ نام کاربریِ صاحبِ آن را برمی‌گرداند */
export async function consumePasswordReset(token: string): Promise<string | null> {
  if (!token || !/^[a-f0-9]{64}$/.test(token)) return null;
  const hash = hashToken(token);
  const rows = await dbQuery(
    "SELECT username FROM admin_password_resets WHERE token_hash = $1 AND used = false AND expires_at > now() LIMIT 1",
    [hash]
  );
  if (!rows[0]) return null;
  await dbQuery("UPDATE admin_password_resets SET used = true WHERE token_hash = $1", [hash]);
  return String(rows[0].username);
}
