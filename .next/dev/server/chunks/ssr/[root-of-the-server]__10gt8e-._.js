module.exports = [
"[externals]/next/dist/shared/lib/no-fallback-error.external.js [external] (next/dist/shared/lib/no-fallback-error.external.js, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("next/dist/shared/lib/no-fallback-error.external.js", () => require("next/dist/shared/lib/no-fallback-error.external.js"));

module.exports = mod;
}),
"[project]/app/icon.png (static in ecmascript, tag client)", ((__turbopack_context__) => {

__turbopack_context__.v("/_next/static/media/icon.1n4ggh_30vxjq.png" + (globalThis["NEXT_CLIENT_ASSET_SUFFIX"] || ''));}),
"[project]/app/icon.png.mjs { IMAGE => \"[project]/app/icon.png (static in ecmascript, tag client)\" } [app-rsc] (structured image object, ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "default",
    ()=>__TURBOPACK__default__export__
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$app$2f$icon$2e$png__$28$static__in__ecmascript$2c$__tag__client$29$__ = __turbopack_context__.i("[project]/app/icon.png (static in ecmascript, tag client)");
;
const __TURBOPACK__default__export__ = {
    src: __TURBOPACK__imported__module__$5b$project$5d2f$app$2f$icon$2e$png__$28$static__in__ecmascript$2c$__tag__client$29$__["default"],
    width: 512,
    height: 512
};
}),
"[project]/app/apple-icon.png (static in ecmascript, tag client)", ((__turbopack_context__) => {

__turbopack_context__.v("/_next/static/media/apple-icon.0id7w99-fgw0a.png" + (globalThis["NEXT_CLIENT_ASSET_SUFFIX"] || ''));}),
"[project]/app/apple-icon.png.mjs { IMAGE => \"[project]/app/apple-icon.png (static in ecmascript, tag client)\" } [app-rsc] (structured image object, ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "default",
    ()=>__TURBOPACK__default__export__
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$app$2f$apple$2d$icon$2e$png__$28$static__in__ecmascript$2c$__tag__client$29$__ = __turbopack_context__.i("[project]/app/apple-icon.png (static in ecmascript, tag client)");
;
const __TURBOPACK__default__export__ = {
    src: __TURBOPACK__imported__module__$5b$project$5d2f$app$2f$apple$2d$icon$2e$png__$28$static__in__ecmascript$2c$__tag__client$29$__["default"],
    width: 180,
    height: 180
};
}),
"[project]/app/opengraph-image.jpg (static in ecmascript, tag client)", ((__turbopack_context__) => {

__turbopack_context__.v("/_next/static/media/opengraph-image.26lrx8yp8x__u.jpg" + (globalThis["NEXT_CLIENT_ASSET_SUFFIX"] || ''));}),
"[project]/app/opengraph-image.jpg.mjs { IMAGE => \"[project]/app/opengraph-image.jpg (static in ecmascript, tag client)\" } [app-rsc] (structured image object, ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "default",
    ()=>__TURBOPACK__default__export__
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$app$2f$opengraph$2d$image$2e$jpg__$28$static__in__ecmascript$2c$__tag__client$29$__ = __turbopack_context__.i("[project]/app/opengraph-image.jpg (static in ecmascript, tag client)");
;
const __TURBOPACK__default__export__ = {
    src: __TURBOPACK__imported__module__$5b$project$5d2f$app$2f$opengraph$2d$image$2e$jpg__$28$static__in__ecmascript$2c$__tag__client$29$__["default"],
    width: 1200,
    height: 630
};
}),
"[project]/lib/schema.ts [app-rsc] (ecmascript)", ((__turbopack_context__) => {
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
"[project]/lib/db.ts [app-rsc] (ecmascript)", ((__turbopack_context__) => {
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
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$neondatabase$2f$serverless$2f$index$2e$mjs__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/@neondatabase/serverless/index.mjs [app-rsc] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$schema$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/lib/schema.ts [app-rsc] (ecmascript)");
;
;
function isDbConfigured() {
    return Boolean(process.env.DATABASE_URL);
}
function getSql() {
    const url = process.env.DATABASE_URL;
    if (!url) return null;
    return (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$neondatabase$2f$serverless$2f$index$2e$mjs__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["neon"])(url);
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
        if (rows[0]?.value === __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$schema$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["SCHEMA_VERSION"]) return;
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
    for (const stmt of __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$schema$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["DDL"]){
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
        __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$schema$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["SCHEMA_VERSION"]
    ]);
}
async function dbQuery(text, params = []) {
    const sql = getSql();
    if (!sql) throw new Error("DATABASE_URL تنظیم نشده است");
    await ensureSchema();
    return await sql.query(text, params);
}
}),
"[project]/lib/images.ts [app-rsc] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "brand",
    ()=>brand,
    "spaceImages",
    ()=>spaceImages
]);
/**
 * تصویر غذاها و نوشیدنی‌ها حالا فایل‌های محلی در public/images/menu هستند
 * (در lib/menuData.ts به هر آیتم وصل شده‌اند).
 *
 * تنها دو عکس فضای رستوران از Unsplash می‌آید (Unsplash License).
 */ function unsplash(id, w = 1600) {
    return `https://images.unsplash.com/${id}?w=${w}&q=80&auto=format&fit=crop`;
}
const spaceImages = {
    interior1: unsplash("photo-1703793578040-07e1778b6b2c"),
    interior2: unsplash("photo-1687723547516-308ac9cefba9")
};
const brand = {
    mark: "/images/gorg-mark.png",
    markSquare: "/images/gorg-mark-square.png",
    texture: "/images/texture-red-clean.jpg",
    posterFull: "/images/gorg-poster-full.jpg",
    location: "/images/gorg-location.jpg"
};
}),
"[project]/lib/galleryData.ts [app-rsc] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "galleryPhotos",
    ()=>galleryPhotos
]);
/**
 * گالریِ اولیه (فقط برای اولین‌بار). بار اولِ اجرا، همین لیست خودکار به
 * دیتابیس منتقل می‌شود؛ از آن به بعد گالری را از «پنل مدیریت ← گالری»
 * ویرایش کنید (نه این فایل) — همان‌جا می‌توانید عکس اضافه/حذف/جابه‌جا کنید.
 * (این فایل دقیقاً مثل lib/menuData.ts برای منو عمل می‌کند.)
 */ var __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$images$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/lib/images.ts [app-rsc] (ecmascript)");
;
const galleryPhotos = [
    {
        src: "/images/gallery/gorg-platter.jpg",
        alt: "سینی ترکیبی گرگ: برگر، ساندویچ بریسکت، ساندویچ مرغ سوخاری و سیب‌زمینی",
        width: 1440,
        height: 1800
    },
    {
        src: "/images/gallery/gorg-bite-the-bold.jpg",
        alt: "ساندویچ مرغ سوخاری گرگ، «Bite the bold»",
        width: 1440,
        height: 1919
    },
    {
        src: "/images/gallery/gorg-brisket.jpg",
        alt: "ساندویچ بریسکت گرگ با آرگولا و سیب‌زمینی",
        width: 1440,
        height: 1800
    },
    {
        src: "/images/gallery/gorg-taste-the-wild.jpg",
        alt: "ساندویچ بریسکت، سیب‌زمینی و کوکاکولا زیرو روی صندلی قرمز، «Taste the wild»",
        width: 1440,
        height: 1800
    },
    {
        src: "/images/gallery/gorg-mushroom-burger.jpg",
        alt: "ماشروم برگر گرگ با سیب‌زمینی و کوکاکولا",
        width: 1179,
        height: 1504
    },
    {
        src: "/images/gallery/gorg-nashville-bowl.jpg",
        alt: "مرغ سوخاری نشویل با سس پنیر روی سیب‌زمینی",
        width: 1440,
        height: 1800
    },
    {
        src: "/images/gallery/gorg-nashville-honey-royal.jpg",
        alt: "ساندویچ نشویل هانی رویال گرگ با سیب‌زمینی",
        width: 1080,
        height: 1920
    },
    {
        src: "/images/gallery/gorg-bite-into-the-wild.jpg",
        alt: "کیسه‌ی سفارش گرگ با ساندویچ نشویل، مرغ سوخاری و کوکاکولا، «Bite into the wild»",
        width: 1440,
        height: 1800
    },
    {
        src: "/images/gallery/gorg-tenders-platter.jpg",
        alt: "استریپس مرغ سوخاری گرگ با نان، سس و سالاد کلم",
        width: 1440,
        height: 1800
    },
    {
        src: "/images/gallery/gorg-nashville-sandwich-closeup.jpg",
        alt: "نمای نزدیک ساندویچ مرغ نشویل با کول‌اسلاو و سیب‌زمینی",
        width: 1440,
        height: 1800
    },
    {
        src: "/images/gallery/gorg-tender-dip.jpg",
        alt: "استریپس مرغ سوخاری گرگ در سس پنیر",
        width: 1440,
        height: 1800
    },
    {
        src: "/images/gallery/gorg-nashville-plate.jpg",
        alt: "ساندویچ مرغ نشویل با سیب‌زمینی سرخ‌شده روی میز سنگی",
        width: 1440,
        height: 1800
    },
    // عکس‌های فضا (فعلاً از Unsplash). هر وقت عکس واقعیِ فضای گرگ داشتید،
    // این دو خط را با عکس خودتان عوض کنید.
    {
        src: __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$images$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["spaceImages"].interior1,
        alt: "فضای داخلی رستوران گرگ",
        width: 500,
        height: 650
    },
    {
        src: __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$images$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["spaceImages"].interior2,
        alt: "فضای نشیمن رستوران گرگ",
        width: 500,
        height: 400
    }
];
}),
"[project]/lib/gallery.ts [app-rsc] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "deleteGalleryPhoto",
    ()=>deleteGalleryPhoto,
    "getAdminGalleryPhotos",
    ()=>getAdminGalleryPhotos,
    "getGalleryPhotos",
    ()=>getGalleryPhotos,
    "getGalleryUpload",
    ()=>getGalleryUpload,
    "moveGalleryPhoto",
    ()=>moveGalleryPhoto,
    "saveGalleryPhoto",
    ()=>saveGalleryPhoto,
    "saveGalleryUpload",
    ()=>saveGalleryUpload,
    "setGalleryPhotoActive",
    ()=>setGalleryPhotoActive
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$db$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/lib/db.ts [app-rsc] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$galleryData$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/lib/galleryData.ts [app-rsc] (ecmascript)");
;
;
let cache = null;
const TTL_MS = 8000;
let seedPromise = null;
function invalidateGalleryCache() {
    cache = null;
}
/** اولین بار گالریِ استاتیک را وارد دیتابیس می‌کند (فقط یک‌بار) */ async function seedIfNeeded() {
    if (!seedPromise) {
        seedPromise = (async ()=>{
            const done = await (0, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$db$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["dbQuery"])("SELECT 1 FROM site_settings WHERE key = 'gallery_seeded'");
            if (done.length > 0) return;
            const existing = await (0, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$db$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["dbQuery"])("SELECT 1 FROM gallery_photos LIMIT 1");
            if (existing.length === 0) {
                let order = 0;
                for (const p of __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$galleryData$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["galleryPhotos"]){
                    const id = `g-seed-${order}`;
                    await (0, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$db$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["dbQuery"])(`INSERT INTO gallery_photos (id, image, alt, width, height, sort_order)
             VALUES ($1,$2,$3,$4,$5,$6) ON CONFLICT (id) DO NOTHING`, [
                        id,
                        p.src,
                        p.alt,
                        p.width,
                        p.height,
                        order++
                    ]);
                }
            }
            await (0, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$db$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["dbQuery"])("INSERT INTO site_settings (key, value) VALUES ('gallery_seeded', '1') ON CONFLICT (key) DO NOTHING");
        })().catch((err)=>{
            seedPromise = null;
            throw err;
        });
    }
    return seedPromise;
}
function toPhoto(r) {
    return {
        id: String(r.id),
        src: String(r.image),
        alt: String(r.alt ?? ""),
        width: Number(r.width) || 1179,
        height: Number(r.height) || 900,
        active: Boolean(r.active),
        sortOrder: Number(r.sort_order)
    };
}
async function getGalleryPhotos(opts = {}) {
    if (!(0, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$db$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["isDbConfigured"])()) return __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$galleryData$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["galleryPhotos"];
    if (!opts.fresh && cache && Date.now() - cache.at < TTL_MS) return cache.value;
    try {
        await seedIfNeeded();
        const rows = await (0, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$db$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["dbQuery"])("SELECT * FROM gallery_photos WHERE active = true ORDER BY sort_order, id");
        const value = rows.length > 0 ? rows.map(toPhoto) : __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$galleryData$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["galleryPhotos"];
        cache = {
            at: Date.now(),
            value
        };
        return value;
    } catch (err) {
        console.error("getGalleryPhotos error؛ گالری استاتیک نمایش داده می‌شود", err);
        return cache?.value ?? __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$galleryData$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["galleryPhotos"];
    }
}
async function getAdminGalleryPhotos() {
    await seedIfNeeded();
    const rows = await (0, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$db$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["dbQuery"])("SELECT * FROM gallery_photos ORDER BY sort_order, id");
    return rows.map(toPhoto);
}
function newId() {
    return `g-${Date.now().toString(36)}${Math.random().toString(36).slice(2, 6)}`;
}
async function saveGalleryPhoto(input) {
    await seedIfNeeded();
    const id = input.id && input.id.trim() ? input.id.trim() : newId();
    const alt = (input.alt ?? "").trim().slice(0, 300);
    const width = Math.max(1, Math.round(Number(input.width) || 1179));
    const height = Math.max(1, Math.round(Number(input.height) || 900));
    const src = input.src.trim().slice(0, 500);
    const exists = await (0, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$db$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["dbQuery"])("SELECT 1 FROM gallery_photos WHERE id = $1", [
        id
    ]);
    if (exists.length > 0) {
        await (0, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$db$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["dbQuery"])(`UPDATE gallery_photos SET image=$2, alt=$3, width=$4, height=$5, active=$6 WHERE id=$1`, [
            id,
            src,
            alt,
            width,
            height,
            input.active !== false
        ]);
    } else {
        const max = await (0, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$db$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["dbQuery"])("SELECT COALESCE(MAX(sort_order), 0)::int AS m FROM gallery_photos");
        await (0, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$db$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["dbQuery"])(`INSERT INTO gallery_photos (id, image, alt, width, height, active, sort_order)
       VALUES ($1,$2,$3,$4,$5,$6,$7)`, [
            id,
            src,
            alt,
            width,
            height,
            input.active !== false,
            Number(max[0]?.m ?? 0) + 1
        ]);
    }
    invalidateGalleryCache();
    return id;
}
async function setGalleryPhotoActive(id, active) {
    await (0, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$db$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["dbQuery"])("UPDATE gallery_photos SET active = $2 WHERE id = $1", [
        id,
        active
    ]);
    invalidateGalleryCache();
}
async function deleteGalleryPhoto(id) {
    await (0, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$db$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["dbQuery"])("DELETE FROM gallery_photos WHERE id = $1", [
        id
    ]);
    invalidateGalleryCache();
}
async function moveGalleryPhoto(id, dir) {
    const rows = await (0, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$db$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["dbQuery"])("SELECT id FROM gallery_photos ORDER BY sort_order, id");
    const ids = rows.map((r)=>String(r.id));
    const i = ids.indexOf(id);
    const j = i + dir;
    if (i < 0 || j < 0 || j >= ids.length) return;
    [ids[i], ids[j]] = [
        ids[j],
        ids[i]
    ];
    const base = await (0, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$db$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["dbQuery"])("SELECT COALESCE(MIN(sort_order), 0)::int AS m FROM gallery_photos WHERE id = ANY($1::text[])", [
        ids
    ]);
    const start = Number(base[0]?.m ?? 0);
    for(let k = 0; k < ids.length; k++){
        await (0, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$db$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["dbQuery"])("UPDATE gallery_photos SET sort_order = $2 WHERE id = $1", [
            ids[k],
            start + k
        ]);
    }
    invalidateGalleryCache();
}
async function saveGalleryUpload(mime, base64) {
    const id = `gimg-${Date.now().toString(36)}${Math.random().toString(36).slice(2, 6)}`;
    await (0, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$db$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["dbQuery"])("INSERT INTO gallery_uploads (id, mime, data) VALUES ($1,$2,$3)", [
        id,
        mime,
        base64
    ]);
    return `/api/gallery-image/${id}`;
}
async function getGalleryUpload(id) {
    const rows = await (0, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$db$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["dbQuery"])("SELECT mime, data FROM gallery_uploads WHERE id = $1", [
        id
    ]);
    return rows[0] ? {
        mime: String(rows[0].mime),
        data: String(rows[0].data)
    } : null;
}
}),
"[project]/components/GalleryGrid.tsx [app-rsc] (client reference proxy) <module evaluation>", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "default",
    ()=>__TURBOPACK__default__export__
]);
// This file is generated by next-core EcmascriptClientReferenceModule.
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$server$2d$dom$2d$turbopack$2d$server$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/server/route-modules/app-page/vendored/rsc/react-server-dom-turbopack-server.js [app-rsc] (ecmascript)");
;
const __TURBOPACK__default__export__ = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$server$2d$dom$2d$turbopack$2d$server$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["registerClientReference"])(function() {
    throw new Error("Attempted to call the default export of [project]/components/GalleryGrid.tsx <module evaluation> from the server, but it's on the client. It's not possible to invoke a client function from the server, it can only be rendered as a Component or passed to props of a Client Component.");
}, "[project]/components/GalleryGrid.tsx <module evaluation>", "default");
}),
"[project]/components/GalleryGrid.tsx [app-rsc] (client reference proxy)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "default",
    ()=>__TURBOPACK__default__export__
]);
// This file is generated by next-core EcmascriptClientReferenceModule.
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$server$2d$dom$2d$turbopack$2d$server$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/server/route-modules/app-page/vendored/rsc/react-server-dom-turbopack-server.js [app-rsc] (ecmascript)");
;
const __TURBOPACK__default__export__ = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$server$2d$dom$2d$turbopack$2d$server$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["registerClientReference"])(function() {
    throw new Error("Attempted to call the default export of [project]/components/GalleryGrid.tsx from the server, but it's on the client. It's not possible to invoke a client function from the server, it can only be rendered as a Component or passed to props of a Client Component.");
}, "[project]/components/GalleryGrid.tsx", "default");
}),
"[project]/components/GalleryGrid.tsx [app-rsc] (ecmascript)", ((__turbopack_context__) => {
"use strict";

var __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$GalleryGrid$2e$tsx__$5b$app$2d$rsc$5d$__$28$client__reference__proxy$29$__$3c$module__evaluation$3e$__ = __turbopack_context__.i("[project]/components/GalleryGrid.tsx [app-rsc] (client reference proxy) <module evaluation>");
var __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$GalleryGrid$2e$tsx__$5b$app$2d$rsc$5d$__$28$client__reference__proxy$29$__ = __turbopack_context__.i("[project]/components/GalleryGrid.tsx [app-rsc] (client reference proxy)");
;
__turbopack_context__.n(__TURBOPACK__imported__module__$5b$project$5d2f$components$2f$GalleryGrid$2e$tsx__$5b$app$2d$rsc$5d$__$28$client__reference__proxy$29$__);
}),
"[project]/app/gallery/page.tsx [app-rsc] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "default",
    ()=>GalleryPage,
    "dynamic",
    ()=>dynamic,
    "metadata",
    ()=>metadata
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/server/route-modules/app-page/vendored/rsc/react-jsx-dev-runtime.js [app-rsc] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$gallery$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/lib/gallery.ts [app-rsc] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$GalleryGrid$2e$tsx__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/components/GalleryGrid.tsx [app-rsc] (ecmascript)");
;
;
;
const metadata = {
    title: "گالری",
    description: "نمایی از غذاها و فضای رستوران گرگ."
};
const dynamic = "force-dynamic";
async function GalleryPage() {
    const photos = await (0, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$gallery$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["getGalleryPhotos"])();
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        className: "max-w-6xl mx-auto px-5 pt-28 pb-24",
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                className: "text-xs tracking-[0.3em] text-[var(--color-ember-light)] uppercase",
                children: "Gallery"
            }, void 0, false, {
                fileName: "[project]/app/gallery/page.tsx",
                lineNumber: 17,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])("h1", {
                className: "text-4xl font-black mt-3 mb-3",
                children: "گالری گرگ"
            }, void 0, false, {
                fileName: "[project]/app/gallery/page.tsx",
                lineNumber: 18,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                className: "text-[var(--color-ash)] max-w-xl mb-10",
                children: "نگاهی به فضا و غذاهای رستوران؛ برای دیدن نسخه‌ی بزرگ، روی هر تصویر کلیک کنید."
            }, void 0, false, {
                fileName: "[project]/app/gallery/page.tsx",
                lineNumber: 19,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$components$2f$GalleryGrid$2e$tsx__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["default"], {
                photos: photos
            }, void 0, false, {
                fileName: "[project]/app/gallery/page.tsx",
                lineNumber: 23,
                columnNumber: 7
            }, this)
        ]
    }, void 0, true, {
        fileName: "[project]/app/gallery/page.tsx",
        lineNumber: 16,
        columnNumber: 5
    }, this);
}
}),
"[project]/app/gallery/page.tsx [app-rsc] (ecmascript, Next.js Server Component)", ((__turbopack_context__) => {

__turbopack_context__.n(__turbopack_context__.i("[project]/app/gallery/page.tsx [app-rsc] (ecmascript)"));
}),
];

//# sourceMappingURL=%5Broot-of-the-server%5D__10gt8e-._.js.map