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
"[externals]/next/dist/server/app-render/after-task-async-storage.external.js [external] (next/dist/server/app-render/after-task-async-storage.external.js, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("next/dist/server/app-render/after-task-async-storage.external.js", () => require("next/dist/server/app-render/after-task-async-storage.external.js"));

module.exports = mod;
}),
"[project]/lib/adminApi.ts [app-route] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "adminOnly",
    ()=>adminOnly,
    "int",
    ()=>int,
    "json",
    ()=>json,
    "readBody",
    ()=>readBody,
    "str",
    ()=>str
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$server$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/server.js [app-route] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$adminAuth$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/lib/adminAuth.ts [app-route] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$db$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/lib/db.ts [app-route] (ecmascript)");
;
;
;
const noStore = {
    "Cache-Control": "no-store"
};
function json(body, status = 200) {
    return __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$server$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["NextResponse"].json(body, {
        status,
        headers: noStore
    });
}
function adminOnly(handler) {
    return async (req)=>{
        const admin = (0, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$adminAuth$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["verifyAdminToken"])(req.cookies.get(__TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$adminAuth$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["COOKIE_NAME"])?.value);
        if (!admin) {
            return json({
                error: "دسترسی ندارید"
            }, 401);
        }
        if (!(0, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$db$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["isDbConfigured"])()) {
            return json({
                error: "دیتابیس هنوز وصل نشده (DATABASE_URL)"
            }, 503);
        }
        try {
            return await handler(req, admin);
        } catch (err) {
            console.error("admin api error", req.nextUrl.pathname, err);
            const msg = err instanceof Error && err.message && /[\u0600-\u06FF]/.test(err.message) ? err.message : "خطای سرور؛ دوباره تلاش کنید";
            return json({
                error: msg
            }, 500);
        }
    };
}
async function readBody(req) {
    try {
        return await req.json();
    } catch  {
        return {};
    }
}
const str = (v, max = 200)=>typeof v === "string" ? v.trim().slice(0, max) : "";
const int = (v, def = 0)=>{
    const n = Math.round(Number(v));
    return Number.isFinite(n) ? n : def;
};
}),
"[project]/lib/settings.ts [app-route] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "DEFAULT_SETTINGS",
    ()=>DEFAULT_SETTINGS,
    "getSettings",
    ()=>getSettings,
    "publicSettings",
    ()=>publicSettings,
    "saveSettings",
    ()=>saveSettings
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$db$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/lib/db.ts [app-route] (ecmascript)");
;
const DEFAULT_SETTINGS = {
    businessName: "رستوران گرگ",
    ordersOpen: true,
    closedMessage: "سفارش آنلاین فعلاً بسته است. لطفاً بعداً سر بزنید.",
    minOrder: 0,
    deliveryFee: 0,
    smsOnReady: false
};
const KEYS = {
    businessName: "business_name",
    ordersOpen: "orders_open",
    closedMessage: "closed_message",
    minOrder: "min_order",
    deliveryFee: "delivery_fee",
    smsOnReady: "sms_on_ready"
};
let cache = null;
const TTL_MS = 8000;
function parse(map) {
    const d = DEFAULT_SETTINGS;
    const num = (k, def)=>{
        const n = Number(map[k]);
        return map[k] !== undefined && Number.isFinite(n) && n >= 0 ? Math.round(n) : def;
    };
    const bool = (k, def)=>map[k] === undefined ? def : map[k] === "1";
    return {
        businessName: map[KEYS.businessName]?.trim() || d.businessName,
        ordersOpen: bool(KEYS.ordersOpen, d.ordersOpen),
        closedMessage: map[KEYS.closedMessage]?.trim() || d.closedMessage,
        minOrder: num(KEYS.minOrder, d.minOrder),
        deliveryFee: num(KEYS.deliveryFee, d.deliveryFee),
        smsOnReady: bool(KEYS.smsOnReady, d.smsOnReady)
    };
}
async function getSettings(opts = {}) {
    if (!(0, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$db$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["isDbConfigured"])()) return DEFAULT_SETTINGS;
    if (!opts.fresh && cache && Date.now() - cache.at < TTL_MS) return cache.value;
    try {
        const rows = await (0, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$db$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["dbQuery"])("SELECT key, value FROM site_settings");
        const map = {};
        for (const r of rows)map[String(r.key)] = String(r.value);
        const value = parse(map);
        cache = {
            at: Date.now(),
            value
        };
        return value;
    } catch (err) {
        console.error("getSettings error", err);
        return cache?.value ?? DEFAULT_SETTINGS;
    }
}
async function saveSettings(patch) {
    const entries = [];
    if (patch.businessName !== undefined) entries.push([
        KEYS.businessName,
        String(patch.businessName).trim().slice(0, 80)
    ]);
    if (patch.ordersOpen !== undefined) entries.push([
        KEYS.ordersOpen,
        patch.ordersOpen ? "1" : "0"
    ]);
    if (patch.closedMessage !== undefined) entries.push([
        KEYS.closedMessage,
        String(patch.closedMessage).trim().slice(0, 200)
    ]);
    if (patch.minOrder !== undefined) entries.push([
        KEYS.minOrder,
        String(Math.max(0, Math.round(Number(patch.minOrder) || 0)))
    ]);
    if (patch.deliveryFee !== undefined) entries.push([
        KEYS.deliveryFee,
        String(Math.max(0, Math.round(Number(patch.deliveryFee) || 0)))
    ]);
    if (patch.smsOnReady !== undefined) entries.push([
        KEYS.smsOnReady,
        patch.smsOnReady ? "1" : "0"
    ]);
    for (const [k, v] of entries){
        await (0, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$db$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["dbQuery"])("INSERT INTO site_settings (key, value) VALUES ($1, $2) ON CONFLICT (key) DO UPDATE SET value = EXCLUDED.value, updated_at = now()", [
            k,
            v
        ]);
    }
    cache = null;
    return getSettings({
        fresh: true
    });
}
function publicSettings(s) {
    return {
        businessName: s.businessName,
        ordersOpen: s.ordersOpen,
        closedMessage: s.closedMessage,
        minOrder: s.minOrder,
        deliveryFee: s.deliveryFee
    };
}
}),
"[project]/app/api/admin/me/route.ts [app-route] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "GET",
    ()=>GET
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$adminAuth$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/lib/adminAuth.ts [app-route] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$db$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/lib/db.ts [app-route] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$adminApi$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/lib/adminApi.ts [app-route] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$settings$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/lib/settings.ts [app-route] (ecmascript)");
;
;
;
;
async function GET(req) {
    const admin = (0, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$adminAuth$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["verifyAdminToken"])(req.cookies.get(__TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$adminAuth$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["COOKIE_NAME"])?.value);
    if (!admin) return (0, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$adminApi$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["json"])({
        ok: false
    }, 401);
    const settings = (0, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$db$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["isDbConfigured"])() ? await (0, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$settings$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["getSettings"])() : null;
    return (0, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$adminApi$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["json"])({
        ok: true,
        username: admin.username,
        dbConfigured: (0, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$db$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["isDbConfigured"])(),
        businessName: settings?.businessName ?? "رستوران گرگ"
    });
}
}),
];

//# sourceMappingURL=%5Broot-of-the-server%5D__1a3yy5i._.js.map