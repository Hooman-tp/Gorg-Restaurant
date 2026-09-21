module.exports = [
"[externals]/next/dist/compiled/next-server/app-route-turbo.runtime.dev.js [external] (next/dist/compiled/next-server/app-route-turbo.runtime.dev.js, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("next/dist/compiled/next-server/app-route-turbo.runtime.dev.js", () => require("next/dist/compiled/next-server/app-route-turbo.runtime.dev.js"));

module.exports = mod;
}),
"[externals]/next/dist/compiled/@opentelemetry/api [external] (next/dist/compiled/@opentelemetry/api, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("next/dist/compiled/@opentelemetry/api", () => require("next/dist/compiled/@opentelemetry/api"));

module.exports = mod;
}),
"[externals]/next/dist/compiled/next-server/app-page-turbo.runtime.dev.js [external] (next/dist/compiled/next-server/app-page-turbo.runtime.dev.js, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("next/dist/compiled/next-server/app-page-turbo.runtime.dev.js", () => require("next/dist/compiled/next-server/app-page-turbo.runtime.dev.js"));

module.exports = mod;
}),
"[externals]/next/dist/server/app-render/work-unit-async-storage.external.js [external] (next/dist/server/app-render/work-unit-async-storage.external.js, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("next/dist/server/app-render/work-unit-async-storage.external.js", () => require("next/dist/server/app-render/work-unit-async-storage.external.js"));

module.exports = mod;
}),
"[externals]/next/dist/server/app-render/work-async-storage.external.js [external] (next/dist/server/app-render/work-async-storage.external.js, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("next/dist/server/app-render/work-async-storage.external.js", () => require("next/dist/server/app-render/work-async-storage.external.js"));

module.exports = mod;
}),
"[externals]/next/dist/shared/lib/no-fallback-error.external.js [external] (next/dist/shared/lib/no-fallback-error.external.js, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("next/dist/shared/lib/no-fallback-error.external.js", () => require("next/dist/shared/lib/no-fallback-error.external.js"));

module.exports = mod;
}),
"[externals]/next/dist/server/app-render/after-task-async-storage.external.js [external] (next/dist/server/app-render/after-task-async-storage.external.js, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("next/dist/server/app-render/after-task-async-storage.external.js", () => require("next/dist/server/app-render/after-task-async-storage.external.js"));

module.exports = mod;
}),
"[externals]/crypto [external] (crypto, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("crypto", () => require("crypto"));

module.exports = mod;
}),
"[project]/lib/adminAuth.ts [app-route] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "COOKIE_NAME",
    ()=>COOKIE_NAME,
    "checkAdminPassword",
    ()=>checkAdminPassword,
    "createAdminToken",
    ()=>createAdminToken,
    "isAdminConfigured",
    ()=>isAdminConfigured,
    "verifyAdminToken",
    ()=>verifyAdminToken
]);
var __TURBOPACK__imported__module__$5b$externals$5d2f$crypto__$5b$external$5d$__$28$crypto$2c$__cjs$29$__ = __turbopack_context__.i("[externals]/crypto [external] (crypto, cjs)");
;
const COOKIE_NAME = "gorg_admin";
const MAX_AGE_MS = 7 * 24 * 60 * 60 * 1000; // ۷ روز
function getSecret() {
    // اگر ADMIN_SESSION_SECRET تنظیم نشده باشد، از خودِ رمز ادمین به‌عنوان
    // کلید امضا استفاده می‌شود (کافی است چون فقط برای همین سایت است)
    return process.env.ADMIN_SESSION_SECRET || process.env.ADMIN_PASSWORD || "gorg-fallback-secret";
}
function isAdminConfigured() {
    return Boolean(process.env.ADMIN_PASSWORD);
}
function checkAdminPassword(password) {
    const real = process.env.ADMIN_PASSWORD;
    if (!real) return false;
    const a = Buffer.from(password);
    const b = Buffer.from(real);
    if (a.length !== b.length) return false;
    return (0, __TURBOPACK__imported__module__$5b$externals$5d2f$crypto__$5b$external$5d$__$28$crypto$2c$__cjs$29$__["timingSafeEqual"])(a, b);
}
function createAdminToken(username) {
    const ts = Date.now().toString();
    const u = Buffer.from(username, "utf8").toString("base64url");
    const sig = (0, __TURBOPACK__imported__module__$5b$externals$5d2f$crypto__$5b$external$5d$__$28$crypto$2c$__cjs$29$__["createHmac"])("sha256", getSecret()).update(`${u}.${ts}`).digest("hex");
    return `${u}.${ts}.${sig}`;
}
function verifyAdminToken(token) {
    if (!token) return null;
    const parts = token.split(".");
    if (parts.length !== 3) return null;
    const [u, ts, sig] = parts;
    if (!u || !ts || !sig) return null;
    if (!Number.isFinite(Number(ts)) || Date.now() - Number(ts) > MAX_AGE_MS) return null;
    const expected = (0, __TURBOPACK__imported__module__$5b$externals$5d2f$crypto__$5b$external$5d$__$28$crypto$2c$__cjs$29$__["createHmac"])("sha256", getSecret()).update(`${u}.${ts}`).digest("hex");
    try {
        if (!(0, __TURBOPACK__imported__module__$5b$externals$5d2f$crypto__$5b$external$5d$__$28$crypto$2c$__cjs$29$__["timingSafeEqual"])(Buffer.from(sig), Buffer.from(expected))) return null;
    } catch  {
        return null;
    }
    try {
        const username = Buffer.from(u, "base64url").toString("utf8");
        if (!username) return null;
        return {
            username
        };
    } catch  {
        return null;
    }
}
;
}),
"[project]/lib/schema.ts [app-route] (ecmascript)", ((__turbopack_context__) => {
"use strict";

/**
 * اسکیمای دیتابیس گرگ (سایت + پنل مدیریت). همه‌ی دستورها idempotent هستند.
 * وقتی چیزی به این لیست اضافه کردید، SCHEMA_VERSION را عوض کنید.
 */ __turbopack_context__.s([
    "DDL",
    ()=>DDL,
    "SCHEMA_VERSION",
    ()=>SCHEMA_VERSION
]);
const SCHEMA_VERSION = "2026-09-panel-2";
const DDL = [
    // ─── جدول‌های پایه (اگر قبلاً با schema.sql ساخته شده باشند، تغییری نمی‌کنند) ───
    `CREATE TABLE IF NOT EXISTS orders (
    id SERIAL PRIMARY KEY,
    order_code VARCHAR(20) UNIQUE NOT NULL,
    name VARCHAR(120) NOT NULL,
    phone VARCHAR(20) NOT NULL,
    address TEXT,
    order_type VARCHAR(20) NOT NULL,
    notes TEXT,
    lines JSONB NOT NULL,
    total INTEGER NOT NULL,
    status VARCHAR(20) NOT NULL DEFAULT 'received',
    ref_id VARCHAR(40),
    created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
    updated_at TIMESTAMPTZ NOT NULL DEFAULT now()
  )`,
    `CREATE TABLE IF NOT EXISTS users (
    id SERIAL PRIMARY KEY,
    phone VARCHAR(11) UNIQUE NOT NULL,
    created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
    last_login_at TIMESTAMPTZ
  )`,
    `CREATE TABLE IF NOT EXISTS site_settings (
    key VARCHAR(60) PRIMARY KEY,
    value TEXT NOT NULL,
    updated_at TIMESTAMPTZ NOT NULL DEFAULT now()
  )`,
    // ─── ستون‌های مشتری ───
    `ALTER TABLE users ADD COLUMN IF NOT EXISTS name VARCHAR(120)`,
    `ALTER TABLE users ADD COLUMN IF NOT EXISTS address TEXT`,
    `ALTER TABLE users ADD COLUMN IF NOT EXISTS lat DOUBLE PRECISION`,
    `ALTER TABLE users ADD COLUMN IF NOT EXISTS lng DOUBLE PRECISION`,
    // ─── ستون‌های جدیدِ سفارش ───
    `ALTER TABLE orders ADD COLUMN IF NOT EXISTS lat DOUBLE PRECISION`,
    `ALTER TABLE orders ADD COLUMN IF NOT EXISTS lng DOUBLE PRECISION`,
    // website = سایت · qr = اسکن QR میز · pos = ثبت حضوری در صندوق
    `ALTER TABLE orders ADD COLUMN IF NOT EXISTS source VARCHAR(10) NOT NULL DEFAULT 'website'`,
    // online | cash | card | other
    `ALTER TABLE orders ADD COLUMN IF NOT EXISTS payment_method VARCHAR(10) NOT NULL DEFAULT 'online'`,
    `ALTER TABLE orders ADD COLUMN IF NOT EXISTS table_no VARCHAR(20)`,
    `ALTER TABLE orders ADD COLUMN IF NOT EXISTS subtotal INTEGER`,
    `ALTER TABLE orders ADD COLUMN IF NOT EXISTS discount INTEGER NOT NULL DEFAULT 0`,
    `ALTER TABLE orders ADD COLUMN IF NOT EXISTS delivery_fee INTEGER NOT NULL DEFAULT 0`,
    `ALTER TABLE orders ADD COLUMN IF NOT EXISTS cancel_reason TEXT`,
    `ALTER TABLE orders ADD COLUMN IF NOT EXISTS stock_deducted BOOLEAN NOT NULL DEFAULT false`,
    `ALTER TABLE orders ADD COLUMN IF NOT EXISTS preparing_at TIMESTAMPTZ`,
    `ALTER TABLE orders ADD COLUMN IF NOT EXISTS ready_at TIMESTAMPTZ`,
    `ALTER TABLE orders ADD COLUMN IF NOT EXISTS delivered_at TIMESTAMPTZ`,
    `CREATE INDEX IF NOT EXISTS idx_orders_created_at ON orders(created_at DESC)`,
    `CREATE INDEX IF NOT EXISTS idx_orders_status ON orders(status)`,
    // ─── منو (سایت و پنل هر دو از همین جدول‌ها می‌خوانند) ───
    `CREATE TABLE IF NOT EXISTS menu_categories (
    id VARCHAR(40) PRIMARY KEY,
    label VARCHAR(80) NOT NULL,
    blurb VARCHAR(200) NOT NULL DEFAULT '',
    sort_order INTEGER NOT NULL DEFAULT 0,
    active BOOLEAN NOT NULL DEFAULT true
  )`,
    `CREATE TABLE IF NOT EXISTS menu_items (
    id VARCHAR(40) PRIMARY KEY,
    category VARCHAR(40) NOT NULL,
    name VARCHAR(120) NOT NULL,
    description TEXT,
    price INTEGER NOT NULL,
    discount INTEGER NOT NULL DEFAULT 0,
    image TEXT,
    spicy BOOLEAN NOT NULL DEFAULT false,
    signature BOOLEAN NOT NULL DEFAULT false,
    available BOOLEAN NOT NULL DEFAULT true,
    active BOOLEAN NOT NULL DEFAULT true,
    sort_order INTEGER NOT NULL DEFAULT 0,
    cost INTEGER NOT NULL DEFAULT 0,
    updated_at TIMESTAMPTZ NOT NULL DEFAULT now()
  )`,
    `CREATE TABLE IF NOT EXISTS menu_images (
    id VARCHAR(60) PRIMARY KEY,
    mime VARCHAR(40) NOT NULL,
    data TEXT NOT NULL,
    created_at TIMESTAMPTZ NOT NULL DEFAULT now()
  )`,
    // ─── انبار ───
    `CREATE TABLE IF NOT EXISTS inventory_items (
    id SERIAL PRIMARY KEY,
    name VARCHAR(120) NOT NULL,
    unit VARCHAR(20) NOT NULL DEFAULT 'عدد',
    stock NUMERIC(14,3) NOT NULL DEFAULT 0,
    min_stock NUMERIC(14,3) NOT NULL DEFAULT 0,
    unit_cost INTEGER NOT NULL DEFAULT 0,
    active BOOLEAN NOT NULL DEFAULT true,
    created_at TIMESTAMPTZ NOT NULL DEFAULT now()
  )`,
    // kind: in ورود · out خروج · adjust اصلاح · sale مصرف سفارش · waste ضایعات
    `CREATE TABLE IF NOT EXISTS inventory_moves (
    id BIGSERIAL PRIMARY KEY,
    item_id INTEGER NOT NULL,
    kind VARCHAR(10) NOT NULL,
    delta NUMERIC(14,3) NOT NULL,
    note TEXT,
    order_code VARCHAR(20),
    created_at TIMESTAMPTZ NOT NULL DEFAULT now()
  )`,
    `CREATE INDEX IF NOT EXISTS idx_inv_moves_item ON inventory_moves(item_id, created_at DESC)`,
    `CREATE INDEX IF NOT EXISTS idx_inv_moves_order ON inventory_moves(order_code)`,
    // مقدار مصرفِ هر «یک پرس» از هر آیتم منو (برای کم شدن خودکار از انبار)
    `CREATE TABLE IF NOT EXISTS recipes (
    menu_item_id VARCHAR(40) NOT NULL,
    inventory_item_id INTEGER NOT NULL,
    qty NUMERIC(14,3) NOT NULL,
    PRIMARY KEY (menu_item_id, inventory_item_id)
  )`,
    // ─── صندوق و هزینه‌ها ───
    `CREATE TABLE IF NOT EXISTS expenses (
    id SERIAL PRIMARY KEY,
    title VARCHAR(160) NOT NULL,
    category VARCHAR(40) NOT NULL DEFAULT 'سایر',
    amount INTEGER NOT NULL,
    pay_method VARCHAR(10) NOT NULL DEFAULT 'cash',
    note TEXT,
    spent_at TIMESTAMPTZ NOT NULL DEFAULT now()
  )`,
    `CREATE TABLE IF NOT EXISTS cash_shifts (
    id SERIAL PRIMARY KEY,
    opened_at TIMESTAMPTZ NOT NULL DEFAULT now(),
    closed_at TIMESTAMPTZ,
    opening_cash INTEGER NOT NULL DEFAULT 0,
    counted_cash INTEGER,
    expected_cash INTEGER,
    note TEXT
  )`,
    // ─── میزها (QR) ───
    `CREATE TABLE IF NOT EXISTS dining_tables (
    id SERIAL PRIMARY KEY,
    code VARCHAR(20) UNIQUE NOT NULL,
    title VARCHAR(80),
    active BOOLEAN NOT NULL DEFAULT true
  )`,
    // ─── گالری (سایت و پنل هر دو از همین جدول می‌خوانند) ───
    `CREATE TABLE IF NOT EXISTS gallery_photos (
    id VARCHAR(60) PRIMARY KEY,
    image TEXT NOT NULL,
    alt VARCHAR(300) NOT NULL DEFAULT '',
    width INTEGER NOT NULL DEFAULT 1179,
    height INTEGER NOT NULL DEFAULT 900,
    sort_order INTEGER NOT NULL DEFAULT 0,
    active BOOLEAN NOT NULL DEFAULT true,
    created_at TIMESTAMPTZ NOT NULL DEFAULT now()
  )`,
    `CREATE TABLE IF NOT EXISTS gallery_uploads (
    id VARCHAR(60) PRIMARY KEY,
    mime VARCHAR(40) NOT NULL,
    data TEXT NOT NULL,
    created_at TIMESTAMPTZ NOT NULL DEFAULT now()
  )`,
    `CREATE INDEX IF NOT EXISTS idx_gallery_sort ON gallery_photos(sort_order, id)`,
    // ─── حساب‌های پنل مدیریت (ورود با نام کاربری و رمز عبور) ───
    `CREATE TABLE IF NOT EXISTS admin_users (
    id SERIAL PRIMARY KEY,
    username VARCHAR(60) UNIQUE NOT NULL,
    password_hash TEXT NOT NULL,
    recovery_email VARCHAR(160),
    failed_attempts INTEGER NOT NULL DEFAULT 0,
    locked_until TIMESTAMPTZ,
    created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
    updated_at TIMESTAMPTZ NOT NULL DEFAULT now()
  )`,
    // لینک‌های یک‌بارمصرفِ «رمز را فراموش کرده‌ام» که به ایمیل بازیابی ارسال می‌شوند
    `CREATE TABLE IF NOT EXISTS admin_password_resets (
    token_hash VARCHAR(128) PRIMARY KEY,
    username VARCHAR(60) NOT NULL,
    expires_at TIMESTAMPTZ NOT NULL,
    used BOOLEAN NOT NULL DEFAULT false,
    created_at TIMESTAMPTZ NOT NULL DEFAULT now()
  )`,
    `CREATE INDEX IF NOT EXISTS idx_admin_resets_username ON admin_password_resets(username)`
];
}),
"[project]/lib/db.ts [app-route] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "dbQuery",
    ()=>dbQuery,
    "ensureSchema",
    ()=>ensureSchema,
    "getSql",
    ()=>getSql,
    "isDbConfigured",
    ()=>isDbConfigured
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$neondatabase$2f$serverless$2f$index$2e$mjs__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/@neondatabase/serverless/index.mjs [app-route] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$schema$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/lib/schema.ts [app-route] (ecmascript)");
;
;
function isDbConfigured() {
    return Boolean(process.env.DATABASE_URL);
}
function getSql() {
    const url = process.env.DATABASE_URL;
    if (!url) return null;
    return (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$neondatabase$2f$serverless$2f$index$2e$mjs__$5b$app$2d$route$5d$__$28$ecmascript$29$__["neon"])(url);
}
let schemaPromise = null;
function ensureSchema() {
    if (!schemaPromise) {
        schemaPromise = runSchema().catch((err)=>{
            schemaPromise = null; // دفعه‌ی بعد دوباره تلاش شود
            throw err;
        });
    }
    return schemaPromise;
}
async function runSchema() {
    const sql = getSql();
    if (!sql) return;
    try {
        const rows = await sql.query("SELECT value FROM site_settings WHERE key = 'schema_version'");
        if (rows[0]?.value === __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$schema$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["SCHEMA_VERSION"]) return;
    } catch  {
    // جدول site_settings هنوز نیست؛ اسکیما را می‌سازیم
    }
    // خطاهای «قبلاً ساخته شده / رقابتِ دو نمونه‌ی هم‌زمان» بی‌خطرند؛ بقیه‌ی خطاها اسکیما را «ناقص» می‌کنند
    const BENIGN = new Set([
        "23505",
        "42P07",
        "42710",
        "42701",
        "42P06"
    ]);
    let firstFatal = null;
    for (const stmt of __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$schema$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["DDL"]){
        try {
            await sql.query(stmt);
        } catch (err) {
            const code = err?.code ?? "";
            if (BENIGN.has(code)) continue;
            console.error("schema statement failed:", stmt.slice(0, 80), err);
            firstFatal ??= err;
        }
    }
    // اگر چیزی واقعاً شکست خورده، «نسخه‌ی اسکیما» ثبت نمی‌شود تا درخواستِ بعدی دوباره تلاش کند
    if (firstFatal) throw firstFatal;
    await sql.query("INSERT INTO site_settings (key, value) VALUES ('schema_version', $1) ON CONFLICT (key) DO UPDATE SET value = EXCLUDED.value, updated_at = now()", [
        __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$schema$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["SCHEMA_VERSION"]
    ]);
}
async function dbQuery(text, params = []) {
    const sql = getSql();
    if (!sql) throw new Error("DATABASE_URL تنظیم نشده است");
    await ensureSchema();
    return await sql.query(text, params);
}
}),
"[project]/lib/adminUsers.ts [app-route] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "clearFailedLogins",
    ()=>clearFailedLogins,
    "consumePasswordReset",
    ()=>consumePasswordReset,
    "createAdminUser",
    ()=>createAdminUser,
    "createPasswordReset",
    ()=>createPasswordReset,
    "getAdminUserById",
    ()=>getAdminUserById,
    "getAdminUserByRecoveryEmail",
    ()=>getAdminUserByRecoveryEmail,
    "getAdminUserByUsername",
    ()=>getAdminUserByUsername,
    "getAdminUserCount",
    ()=>getAdminUserCount,
    "hashPassword",
    ()=>hashPassword,
    "isLocked",
    ()=>isLocked,
    "registerFailedLogin",
    ()=>registerFailedLogin,
    "updateAdminAccount",
    ()=>updateAdminAccount,
    "verifyPassword",
    ()=>verifyPassword
]);
var __TURBOPACK__imported__module__$5b$externals$5d2f$crypto__$5b$external$5d$__$28$crypto$2c$__cjs$29$__ = __turbopack_context__.i("[externals]/crypto [external] (crypto, cjs)");
var __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$db$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/lib/db.ts [app-route] (ecmascript)");
;
;
/**
 * حساب‌های پنل مدیریت: ورود با «نام کاربری + رمز عبور» (نه فقط رمز عبور).
 * رمزها هرگز خام ذخیره نمی‌شوند؛ با scrypt (نمک تصادفی) هش می‌شوند.
 */ const KEYLEN = 64;
const MAX_FAILED = 6;
const LOCK_MINUTES = 15;
const RESET_TTL_MINUTES = 30;
const RESET_MIN_GAP_MINUTES = 3;
function hashPassword(password) {
    const salt = (0, __TURBOPACK__imported__module__$5b$externals$5d2f$crypto__$5b$external$5d$__$28$crypto$2c$__cjs$29$__["randomBytes"])(16).toString("hex");
    const hash = (0, __TURBOPACK__imported__module__$5b$externals$5d2f$crypto__$5b$external$5d$__$28$crypto$2c$__cjs$29$__["scryptSync"])(password, salt, KEYLEN).toString("hex");
    return `${salt}:${hash}`;
}
function verifyPassword(password, stored) {
    const [salt, hashHex] = stored.split(":");
    if (!salt || !hashHex) return false;
    let a;
    let b;
    try {
        a = (0, __TURBOPACK__imported__module__$5b$externals$5d2f$crypto__$5b$external$5d$__$28$crypto$2c$__cjs$29$__["scryptSync"])(password, salt, KEYLEN);
        b = Buffer.from(hashHex, "hex");
    } catch  {
        return false;
    }
    if (a.length !== b.length) return false;
    return (0, __TURBOPACK__imported__module__$5b$externals$5d2f$crypto__$5b$external$5d$__$28$crypto$2c$__cjs$29$__["timingSafeEqual"])(a, b);
}
async function getAdminUserCount() {
    const rows = await (0, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$db$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["dbQuery"])("SELECT COUNT(*)::int AS c FROM admin_users");
    return Number(rows[0]?.c ?? 0);
}
async function getAdminUserByUsername(username) {
    const rows = await (0, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$db$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["dbQuery"])("SELECT * FROM admin_users WHERE lower(username) = lower($1) LIMIT 1", [
        username
    ]);
    return rows[0] ?? null;
}
async function getAdminUserByRecoveryEmail(email) {
    const rows = await (0, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$db$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["dbQuery"])("SELECT * FROM admin_users WHERE lower(recovery_email) = lower($1) LIMIT 1", [
        email
    ]);
    return rows[0] ?? null;
}
async function getAdminUserById(id) {
    const rows = await (0, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$db$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["dbQuery"])("SELECT * FROM admin_users WHERE id = $1", [
        id
    ]);
    return rows[0] ?? null;
}
function isLocked(user) {
    return Boolean(user.locked_until) && new Date(String(user.locked_until)).getTime() > Date.now();
}
async function createAdminUser(username, password, recoveryEmail) {
    await (0, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$db$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["dbQuery"])(`INSERT INTO admin_users (username, password_hash, recovery_email) VALUES ($1,$2,$3)
     ON CONFLICT (username) DO NOTHING`, [
        username,
        hashPassword(password),
        recoveryEmail && recoveryEmail.trim() ? recoveryEmail.trim() : null
    ]);
}
async function registerFailedLogin(username) {
    const rows = await (0, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$db$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["dbQuery"])("SELECT failed_attempts FROM admin_users WHERE lower(username) = lower($1)", [
        username
    ]);
    if (!rows[0]) return;
    const next = Number(rows[0].failed_attempts ?? 0) + 1;
    if (next >= MAX_FAILED) {
        await (0, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$db$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["dbQuery"])(`UPDATE admin_users SET failed_attempts = 0, locked_until = now() + interval '${LOCK_MINUTES} minutes'
       WHERE lower(username) = lower($1)`, [
            username
        ]);
    } else {
        await (0, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$db$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["dbQuery"])("UPDATE admin_users SET failed_attempts = $2 WHERE lower(username) = lower($1)", [
            username,
            next
        ]);
    }
}
async function clearFailedLogins(username) {
    await (0, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$db$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["dbQuery"])("UPDATE admin_users SET failed_attempts = 0, locked_until = NULL WHERE lower(username) = lower($1)", [
        username
    ]);
}
async function updateAdminAccount(id, patch) {
    const sets = [];
    const vals = [];
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
    await (0, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$db$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["dbQuery"])(`UPDATE admin_users SET ${sets.join(", ")} WHERE id = $1`, [
        id,
        ...vals
    ]);
}
/** ── بازیابی رمز/نام کاربری از طریق ایمیل ── */ function hashToken(token) {
    return (0, __TURBOPACK__imported__module__$5b$externals$5d2f$crypto__$5b$external$5d$__$28$crypto$2c$__cjs$29$__["createHash"])("sha256").update(token).digest("hex");
}
async function createPasswordReset(username) {
    const recent = await (0, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$db$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["dbQuery"])(`SELECT 1 FROM admin_password_resets
     WHERE username = $1 AND used = false AND expires_at > now()
       AND created_at > now() - interval '${RESET_MIN_GAP_MINUTES} minutes' LIMIT 1`, [
        username
    ]);
    if (recent.length > 0) return null;
    const token = (0, __TURBOPACK__imported__module__$5b$externals$5d2f$crypto__$5b$external$5d$__$28$crypto$2c$__cjs$29$__["randomBytes"])(32).toString("hex");
    await (0, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$db$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["dbQuery"])(`INSERT INTO admin_password_resets (token_hash, username, expires_at)
     VALUES ($1,$2, now() + interval '${RESET_TTL_MINUTES} minutes')`, [
        hashToken(token),
        username
    ]);
    return token;
}
async function consumePasswordReset(token) {
    if (!token || !/^[a-f0-9]{64}$/.test(token)) return null;
    const hash = hashToken(token);
    const rows = await (0, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$db$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["dbQuery"])("SELECT username FROM admin_password_resets WHERE token_hash = $1 AND used = false AND expires_at > now() LIMIT 1", [
        hash
    ]);
    if (!rows[0]) return null;
    await (0, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$db$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["dbQuery"])("UPDATE admin_password_resets SET used = true WHERE token_hash = $1", [
        hash
    ]);
    return String(rows[0].username);
}
}),
"[project]/app/api/admin/login/route.ts [app-route] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "POST",
    ()=>POST
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$server$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/server.js [app-route] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$adminAuth$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/lib/adminAuth.ts [app-route] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$adminUsers$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/lib/adminUsers.ts [app-route] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$db$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/lib/db.ts [app-route] (ecmascript)");
;
;
;
;
const GENERIC_ERROR = "نام کاربری یا رمز عبور اشتباه است";
function setCookie(username) {
    const token = (0, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$adminAuth$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["createAdminToken"])(username);
    const res = __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$server$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["NextResponse"].json({
        ok: true,
        username
    });
    res.cookies.set(__TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$adminAuth$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["COOKIE_NAME"], token, {
        httpOnly: true,
        secure: ("TURBOPACK compile-time value", "development") === "production",
        sameSite: "lax",
        maxAge: 60 * 60 * 24 * 7,
        path: "/"
    });
    return res;
}
async function POST(req) {
    if (!(0, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$db$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["isDbConfigured"])()) {
        return __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$server$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["NextResponse"].json({
            error: "دیتابیس هنوز وصل نشده (DATABASE_URL)"
        }, {
            status: 503
        });
    }
    let body;
    try {
        body = await req.json();
    } catch  {
        body = {};
    }
    const username = typeof body.username === "string" ? body.username.trim().slice(0, 60) : "";
    const password = typeof body.password === "string" ? body.password : "";
    if (!password) {
        return __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$server$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["NextResponse"].json({
            error: "رمز عبور را وارد کنید"
        }, {
            status: 400
        });
    }
    const count = await (0, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$adminUsers$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["getAdminUserCount"])();
    // ─── اولین ورود: هنوز هیچ حسابی ساخته نشده ───
    if (count === 0) {
        if (!(0, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$adminAuth$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["isAdminConfigured"])()) {
            return __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$server$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["NextResponse"].json({
                error: "پنل مدیریت هنوز روی این سایت راه‌اندازی نشده (ADMIN_PASSWORD تنظیم نشده)"
            }, {
                status: 503
            });
        }
        if (!username) {
            return __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$server$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["NextResponse"].json({
                error: "برای اولین ورود، یک نام کاربری انتخاب کنید"
            }, {
                status: 400
            });
        }
        if (!(0, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$adminAuth$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["checkAdminPassword"])(password)) {
            return __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$server$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["NextResponse"].json({
                error: "رمز عبور اشتباه است"
            }, {
                status: 401
            });
        }
        await (0, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$adminUsers$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["createAdminUser"])(username, password);
        return setCookie(username);
    }
    // ─── رمزِ اضطراری/هاست: صرف‌نظر از نام کاربری واردشده، به‌عنوان مدیر اصلی وارد می‌شود ───
    // (این مسیر فقط به کسی که به تنظیمات هاست دسترسی دارد قدرت می‌دهد، نه به
    // هر کسی که پشت سیستم رستوران بنشیند و بخواهد ورود را دور بزند)
    if ((0, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$adminAuth$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["isAdminConfigured"])() && (0, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$adminAuth$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["checkAdminPassword"])(password)) {
        const target = username ? await (0, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$adminUsers$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["getAdminUserByUsername"])(username) : null;
        if (target) return setCookie(String(target.username));
        const firstRows = await (0, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$db$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["dbQuery"])("SELECT username FROM admin_users ORDER BY id ASC LIMIT 1");
        const first = firstRows[0]?.username ? String(firstRows[0].username) : username || "admin";
        return setCookie(first);
    }
    if (!username) {
        return __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$server$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["NextResponse"].json({
            error: GENERIC_ERROR
        }, {
            status: 401
        });
    }
    const user = await (0, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$adminUsers$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["getAdminUserByUsername"])(username);
    if (!user) {
        return __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$server$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["NextResponse"].json({
            error: GENERIC_ERROR
        }, {
            status: 401
        });
    }
    if ((0, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$adminUsers$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["isLocked"])(user)) {
        return __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$server$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["NextResponse"].json({
            error: "به دلیل چند بار ورود ناموفق، این حساب موقتاً قفل شده. چند دقیقه دیگر دوباره تلاش کنید یا از «رمز را فراموش کرده‌ام» استفاده کنید."
        }, {
            status: 423
        });
    }
    if (!(0, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$adminUsers$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["verifyPassword"])(password, String(user.password_hash))) {
        await (0, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$adminUsers$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["registerFailedLogin"])(username);
        return __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$server$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["NextResponse"].json({
            error: GENERIC_ERROR
        }, {
            status: 401
        });
    }
    await (0, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$adminUsers$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["clearFailedLogins"])(username);
    return setCookie(String(user.username));
}
}),
];

//# sourceMappingURL=%5Broot-of-the-server%5D__01k070a._.js.map