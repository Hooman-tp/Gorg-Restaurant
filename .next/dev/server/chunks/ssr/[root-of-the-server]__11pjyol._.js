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
"[project]/lib/menuData.ts [app-rsc] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "categories",
    ()=>categories,
    "getItemById",
    ()=>getItemById,
    "getItemsByCategory",
    ()=>getItemsByCategory,
    "getSignatureItems",
    ()=>getSignatureItems,
    "menuItems",
    ()=>menuItems
]);
const categories = [
    {
        id: "starters",
        label: "پیش‌غذا",
        blurb: "بال و سیب‌زمینی"
    },
    {
        id: "salad",
        label: "سالاد",
        blurb: "گوا کامالی"
    },
    {
        id: "burger",
        label: "برگر",
        blurb: "از کلاسیک تا گرگ ۱"
    },
    {
        id: "brisket",
        label: "بریسکت",
        blurb: "ساندویچ بریسکت و مرغ تنوری"
    },
    {
        id: "nashville",
        label: "نشویل",
        blurb: "مرغ سوخاری به سبک نشویل"
    },
    {
        id: "drinks",
        label: "نوشیدنی‌ها",
        blurb: "نوشابه، آب معدنی و آبجو"
    }
];
const menuItems = [
    // ── پیش‌غذا ─────────────────────────────
    {
        id: "st-1",
        category: "starters",
        name: "بال نرمال",
        description: "بال مرغ ترد با سسی ملایم و بدون تندی، روی سیب‌زمینی سرخ‌کرده.",
        price: 640000,
        image: "/images/menu/wings-plain.jpg"
    },
    {
        id: "st-2",
        category: "starters",
        name: "بال نمکی",
        description: "بال مرغ با طعم نمکی و سس خامه‌ای، همراه سیب‌زمینی سرخ‌کرده و سبزی تازه.",
        price: 640000,
        image: "/images/menu/wings-salty.jpg"
    },
    {
        id: "st-3",
        category: "starters",
        name: "بال تند و شیرین",
        description: "بال مرغ لعاب‌خورده در سس تند و شیرین؛ ترکیبی که هم شیرین است و هم می‌سوزاند.",
        price: 640000,
        image: "/images/menu/wings-sweet-spicy.jpg",
        spicy: true
    },
    {
        id: "st-4",
        category: "starters",
        name: "بال تند آتیشی",
        description: "بال مرغ با سس قرمز تند آتیشی. برای کسانی که تندی را جدی می‌گیرند.",
        price: 640000,
        image: "/images/menu/wings-fire.jpg",
        spicy: true,
        signature: true
    },
    {
        id: "st-5",
        category: "starters",
        name: "سیب زمینی و فیله سوخاری",
        description: "فیله‌ی مرغ سوخاری ترد روی سیب‌زمینی سرخ‌کرده، با سس پنیری.",
        price: 690000,
        image: "/images/menu/fries-crispy-fillet.jpg",
        signature: true
    },
    {
        id: "st-6",
        category: "starters",
        name: "سیب زمینی و گوشت",
        description: "سیب‌زمینی سرخ‌کرده با تکه‌های گوشت گریل‌شده و سس سبزیجات تازه.",
        price: 780000,
        image: "/images/menu/fries-beef.jpg"
    },
    {
        id: "st-7",
        category: "starters",
        name: "سیب زمینی ادویه دار",
        description: "سیب‌زمینی سرخ‌کرده‌ی ترد و طلایی با ادویه‌ی خوش‌عطر؛ ساده و همیشه خوب.",
        price: 490000,
        image: "/images/menu/fries-spiced.jpg"
    },
    // ── سالاد ─────────────────────────────
    {
        id: "sa-1",
        category: "salad",
        name: "گوا کامالی",
        description: "آووکادو، گوجه، پیاز قرمز و سبزی تازه؛ سبک و خنک، همراه خوبی برای غذاهای سنگین.",
        price: 680000,
        image: "/images/menu/salad-guacamole.jpg"
    },
    // ── برگر ─────────────────────────────
    {
        id: "bg-1",
        category: "burger",
        name: "گرگ ۱",
        description: "برگر اختصاصی گرگ: گوشت آبدار، پنیر ذوب‌شده و تکه‌های بریسکت روی آن. قدرتمندترین برگر منو.",
        price: 1990000,
        image: "/images/menu/burger-gorg-1.jpg",
        signature: true
    },
    {
        id: "bg-2",
        category: "burger",
        name: "هالوپینو برگر",
        description: "برگر گوشت آبدار با هالوپینوی تند و ترش که هر لقمه را سرحال می‌کند.",
        price: 1090000,
        image: "/images/menu/burger-jalapeno.jpg"
    },
    {
        id: "bg-3",
        category: "burger",
        name: "ماشروم برگر",
        description: "برگر گوشت با قارچ تازه‌ی سرخ‌شده و پنیر ذوب‌شده روی نان برشته.",
        price: 1080000,
        image: "/images/menu/burger-mushroom.jpg"
    },
    {
        id: "bg-4",
        category: "burger",
        name: "چیزبرگر",
        description: "برگر گوشت با پنیر چدار ذوب‌شده روی نان برشته؛ همان چیزبرگر خالص.",
        price: 990000,
        image: "/images/menu/burger-cheese.jpg"
    },
    {
        id: "bg-5",
        category: "burger",
        name: "کلاسیک برگر",
        description: "برگر گوشت آبدار روی نان برشته. ساده، خالص و برای دوستداران طعم اصلی.",
        price: 890000,
        image: "/images/menu/burger-classic.jpg"
    },
    // ── بریسکت ─────────────────────────────
    {
        id: "br-1",
        category: "brisket",
        name: "گرگ ۲",
        description: "ساندویچ بریسکت اختصاصی گرگ: تکه‌های ضخیم و آبدار بریسکت میان دو تکه نان برشته.",
        price: 1290000,
        image: "/images/menu/sandwich-gorg-2.jpg",
        signature: true
    },
    {
        id: "br-2",
        category: "brisket",
        name: "چیکن تنوری",
        description: "مرغ تنوری مزه‌دار با ریزسبزی تازه، روی نان باگت برشته.",
        price: 740000,
        image: "/images/menu/sandwich-tandoori-chicken.jpg"
    },
    {
        id: "br-3",
        category: "brisket",
        name: "ماشروم بریسکت",
        description: "بریسکت آبدار با قارچ تازه و آرگولا، روی نان برشته.",
        price: 1440000,
        image: "/images/menu/brisket-mushroom.jpg"
    },
    {
        id: "br-4",
        category: "brisket",
        name: "چیز بریسکت",
        description: "بریسکت با پنیر ذوب‌شده و آرگولا، روی نان برشته.",
        price: 1400000,
        image: "/images/menu/brisket-cheese.jpg"
    },
    {
        id: "br-5",
        category: "brisket",
        name: "بریسکت کلاسیک",
        description: "بریسکت آبدار با آرگولا و ریزسبزی روی نان برشته؛ طعم اصلی بریسکت.",
        price: 1350000,
        image: "/images/menu/brisket-classic.jpg",
        signature: true
    },
    // ── نشویل ─────────────────────────────
    {
        id: "na-1",
        category: "nashville",
        name: "نشویل ۳ تیکه",
        description: "سه تکه مرغ سوخاری ترد به سبک نشویل، کنار سالاد کلم، ترشی خیار و سس.",
        price: 780000,
        image: "/images/menu/nashville-3-piece.jpg"
    },
    {
        id: "na-2",
        category: "nashville",
        name: "نشویل هانی رویال",
        description: "ساندویچ مرغ سوخاری ترد با سالاد کلم خامه‌ای و ترشی خیار؛ با رگه‌ای از عسل.",
        price: 780000,
        image: "/images/menu/nashville-honey-royal.jpg",
        signature: true
    },
    {
        id: "na-3",
        category: "nashville",
        name: "نشویل هات فرایز",
        description: "ساندویچ مرغ سوخاری تند به سبک نشویل با سالاد کلم خنک، کنار سیب‌زمینی.",
        price: 780000,
        image: "/images/menu/nashville-hot-fries.jpg",
        spicy: true
    },
    // ── نوشیدنی‌ها ─────────────────────────────
    {
        id: "dr-1",
        category: "drinks",
        name: "آبجو کلاسیک روسی",
        description: "آبجوی روسی بدون الکل با طعم کلاسیک؛ سرد سرو می‌شود.",
        price: 40000,
        image: "/images/menu/drink-beer-classic.jpg"
    },
    {
        id: "dr-2",
        category: "drinks",
        name: "آب معدنی",
        description: "آب معدنی خنک.",
        price: 35000,
        image: "/images/menu/drink-mineral-water.jpg"
    },
    {
        id: "dr-3",
        category: "drinks",
        name: "اسپرایت",
        description: "اسپرایت خنک و لیمویی، در قوطی.",
        price: 10000,
        image: "/images/menu/drink-sprite.jpg"
    },
    {
        id: "dr-4",
        category: "drinks",
        name: "فانتا",
        description: "فانتای پرتقالی خنک، در قوطی.",
        price: 10000,
        image: "/images/menu/drink-fanta.jpg"
    },
    {
        id: "dr-5",
        category: "drinks",
        name: "کوکاکولا زیرو",
        description: "کوکاکولا بدون قند، خنک و در قوطی.",
        price: 10000,
        image: "/images/menu/drink-cola-zero.jpg"
    },
    {
        id: "dr-6",
        category: "drinks",
        name: "کوکاکولا",
        description: "کوکاکولای کلاسیک، خنک و در قوطی؛ رفیق همیشگی برگر.",
        price: 10000,
        image: "/images/menu/drink-cola.jpg"
    }
];
function getItemsByCategory(category) {
    return menuItems.filter((item)=>item.category === category);
}
function getSignatureItems() {
    return menuItems.filter((item)=>item.signature);
}
function getItemById(id) {
    return menuItems.find((item)=>item.id === id);
}
}),
"[project]/lib/menuStore.ts [app-rsc] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "deleteCategory",
    ()=>deleteCategory,
    "deleteMenuItem",
    ()=>deleteMenuItem,
    "effectivePrice",
    ()=>effectivePrice,
    "getAdminMenu",
    ()=>getAdminMenu,
    "getMenu",
    ()=>getMenu,
    "getMenuImage",
    ()=>getMenuImage,
    "invalidateMenuCache",
    ()=>invalidateMenuCache,
    "itemsByCategory",
    ()=>itemsByCategory,
    "moveInOrder",
    ()=>moveInOrder,
    "saveCategory",
    ()=>saveCategory,
    "saveMenuImage",
    ()=>saveMenuImage,
    "saveMenuItem",
    ()=>saveMenuItem,
    "setItemFlag",
    ()=>setItemFlag
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$db$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/lib/db.ts [app-rsc] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$menuData$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/lib/menuData.ts [app-rsc] (ecmascript)");
;
;
function effectivePrice(price, discount) {
    const d = Math.min(90, Math.max(0, Math.round(discount || 0)));
    return d ? Math.round(price * (100 - d) / 100) : price;
}
let cache = null;
const TTL_MS = 8000;
let seedPromise = null;
function invalidateMenuCache() {
    cache = null;
}
/** اولین بار منوی استاتیک را وارد دیتابیس می‌کند (فقط یک‌بار؛ حتی اگر بعداً همه‌چیز پاک شود دوباره پر نمی‌شود) */ async function seedIfNeeded() {
    if (!seedPromise) {
        seedPromise = (async ()=>{
            const done = await (0, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$db$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["dbQuery"])("SELECT 1 FROM site_settings WHERE key = 'menu_seeded'");
            if (done.length > 0) return;
            const existing = await (0, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$db$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["dbQuery"])("SELECT 1 FROM menu_items LIMIT 1");
            if (existing.length === 0) {
                let order = 0;
                for (const c of __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$menuData$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["categories"]){
                    await (0, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$db$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["dbQuery"])("INSERT INTO menu_categories (id, label, blurb, sort_order) VALUES ($1,$2,$3,$4) ON CONFLICT (id) DO NOTHING", [
                        c.id,
                        c.label,
                        c.blurb,
                        order++
                    ]);
                }
                order = 0;
                for (const it of __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$menuData$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["menuItems"]){
                    await (0, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$db$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["dbQuery"])(`INSERT INTO menu_items (id, category, name, description, price, image, spicy, signature, sort_order)
             VALUES ($1,$2,$3,$4,$5,$6,$7,$8,$9) ON CONFLICT (id) DO NOTHING`, [
                        it.id,
                        it.category,
                        it.name,
                        it.description ?? "",
                        it.price,
                        it.image ?? "",
                        Boolean(it.spicy),
                        Boolean(it.signature),
                        order++
                    ]);
                }
            }
            await (0, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$db$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["dbQuery"])("INSERT INTO site_settings (key, value) VALUES ('menu_seeded', '1') ON CONFLICT (key) DO NOTHING");
        })().catch((err)=>{
            seedPromise = null;
            throw err;
        });
    }
    return seedPromise;
}
function toItem(r) {
    const price = Number(r.price);
    const discount = Number(r.discount) || 0;
    const final = effectivePrice(price, discount);
    return {
        id: String(r.id),
        category: String(r.category),
        name: String(r.name),
        description: r.description ? String(r.description) : undefined,
        price: final,
        basePrice: discount > 0 ? price : undefined,
        discount: discount > 0 ? discount : undefined,
        image: r.image ? String(r.image) : undefined,
        spicy: Boolean(r.spicy),
        signature: Boolean(r.signature),
        available: r.available !== false
    };
}
function staticMenu() {
    return {
        categories: __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$menuData$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["categories"].map((c)=>({
                id: c.id,
                label: c.label,
                blurb: c.blurb
            })),
        items: __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$menuData$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["menuItems"].map((i)=>({
                ...i,
                available: true
            }))
    };
}
async function getMenu(opts = {}) {
    if (!(0, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$db$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["isDbConfigured"])()) return staticMenu();
    if (!opts.fresh && cache && Date.now() - cache.at < TTL_MS) return cache.value;
    try {
        await seedIfNeeded();
        const [cats, items] = await Promise.all([
            (0, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$db$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["dbQuery"])("SELECT id, label, blurb FROM menu_categories WHERE active = true ORDER BY sort_order, id"),
            (0, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$db$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["dbQuery"])("SELECT * FROM menu_items WHERE active = true ORDER BY sort_order, id")
        ]);
        const catIds = new Set(cats.map((c)=>String(c.id)));
        const value = {
            categories: cats.map((c)=>({
                    id: String(c.id),
                    label: String(c.label),
                    blurb: String(c.blurb ?? "")
                })),
            items: items.map(toItem).filter((i)=>catIds.has(i.category))
        };
        cache = {
            at: Date.now(),
            value
        };
        return value;
    } catch (err) {
        console.error("getMenu error؛ منوی استاتیک نمایش داده می‌شود", err);
        return cache?.value ?? staticMenu();
    }
}
function itemsByCategory(menu, categoryId) {
    return menu.items.filter((i)=>i.category === categoryId);
}
async function getAdminMenu() {
    await seedIfNeeded();
    const [cats, items] = await Promise.all([
        (0, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$db$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["dbQuery"])("SELECT * FROM menu_categories ORDER BY sort_order, id"),
        (0, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$db$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["dbQuery"])("SELECT * FROM menu_items ORDER BY sort_order, id")
    ]);
    return {
        categories: cats.map((c)=>({
                id: String(c.id),
                label: String(c.label),
                blurb: String(c.blurb ?? ""),
                sortOrder: Number(c.sort_order),
                active: Boolean(c.active)
            })),
        items: items.map((r)=>({
                id: String(r.id),
                category: String(r.category),
                name: String(r.name),
                description: String(r.description ?? ""),
                price: Number(r.price),
                discount: Number(r.discount) || 0,
                image: String(r.image ?? ""),
                spicy: Boolean(r.spicy),
                signature: Boolean(r.signature),
                available: Boolean(r.available),
                active: Boolean(r.active),
                sortOrder: Number(r.sort_order),
                cost: Number(r.cost) || 0
            }))
    };
}
function newId(prefix) {
    return `${prefix}-${Date.now().toString(36)}${Math.random().toString(36).slice(2, 5)}`;
}
async function saveMenuItem(input) {
    await seedIfNeeded();
    const id = input.id && input.id.trim() ? input.id.trim() : newId("m");
    const price = Math.max(0, Math.round(Number(input.price) || 0));
    const discount = Math.min(90, Math.max(0, Math.round(Number(input.discount) || 0)));
    const cost = Math.max(0, Math.round(Number(input.cost) || 0));
    const exists = await (0, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$db$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["dbQuery"])("SELECT 1 FROM menu_items WHERE id = $1", [
        id
    ]);
    if (exists.length > 0) {
        await (0, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$db$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["dbQuery"])(`UPDATE menu_items SET category=$2, name=$3, description=$4, price=$5, discount=$6, image=$7, spicy=$8,
         signature=$9, available=$10, active=$11, cost=$12, updated_at=now() WHERE id=$1`, [
            id,
            input.category,
            input.name.trim().slice(0, 120),
            (input.description ?? "").slice(0, 600),
            price,
            discount,
            input.image ?? "",
            Boolean(input.spicy),
            Boolean(input.signature),
            input.available !== false,
            input.active !== false,
            cost
        ]);
    } else {
        const max = await (0, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$db$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["dbQuery"])("SELECT COALESCE(MAX(sort_order), 0)::int AS m FROM menu_items");
        await (0, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$db$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["dbQuery"])(`INSERT INTO menu_items (id, category, name, description, price, discount, image, spicy, signature, available, active, cost, sort_order)
       VALUES ($1,$2,$3,$4,$5,$6,$7,$8,$9,$10,$11,$12,$13)`, [
            id,
            input.category,
            input.name.trim().slice(0, 120),
            (input.description ?? "").slice(0, 600),
            price,
            discount,
            input.image ?? "",
            Boolean(input.spicy),
            Boolean(input.signature),
            input.available !== false,
            input.active !== false,
            cost,
            Number(max[0]?.m ?? 0) + 1
        ]);
    }
    invalidateMenuCache();
    return id;
}
async function setItemFlag(id, flag, value) {
    await (0, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$db$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["dbQuery"])(`UPDATE menu_items SET ${flag} = $2, updated_at = now() WHERE id = $1`, [
        id,
        value
    ]);
    invalidateMenuCache();
}
async function deleteMenuItem(id) {
    await (0, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$db$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["dbQuery"])("DELETE FROM menu_items WHERE id = $1", [
        id
    ]);
    await (0, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$db$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["dbQuery"])("DELETE FROM recipes WHERE menu_item_id = $1", [
        id
    ]);
    invalidateMenuCache();
}
async function saveCategory(input) {
    await seedIfNeeded();
    const label = input.label.trim().slice(0, 80);
    const blurb = (input.blurb ?? "").trim().slice(0, 200);
    const id = input.id && input.id.trim() ? input.id.trim() : newId("c");
    const exists = await (0, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$db$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["dbQuery"])("SELECT 1 FROM menu_categories WHERE id = $1", [
        id
    ]);
    if (exists.length > 0) {
        await (0, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$db$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["dbQuery"])("UPDATE menu_categories SET label=$2, blurb=$3, active=$4 WHERE id=$1", [
            id,
            label,
            blurb,
            input.active !== false
        ]);
    } else {
        const max = await (0, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$db$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["dbQuery"])("SELECT COALESCE(MAX(sort_order), 0)::int AS m FROM menu_categories");
        await (0, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$db$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["dbQuery"])("INSERT INTO menu_categories (id, label, blurb, sort_order, active) VALUES ($1,$2,$3,$4,$5)", [
            id,
            label,
            blurb,
            Number(max[0]?.m ?? 0) + 1,
            input.active !== false
        ]);
    }
    invalidateMenuCache();
    return id;
}
async function deleteCategory(id) {
    const used = await (0, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$db$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["dbQuery"])("SELECT 1 FROM menu_items WHERE category = $1 LIMIT 1", [
        id
    ]);
    if (used.length > 0) return false;
    await (0, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$db$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["dbQuery"])("DELETE FROM menu_categories WHERE id = $1", [
        id
    ]);
    invalidateMenuCache();
    return true;
}
async function moveInOrder(kind, id, dir) {
    const table = kind === "item" ? "menu_items" : "menu_categories";
    const rows = kind === "item" ? await (0, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$db$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["dbQuery"])("SELECT id FROM menu_items WHERE category = (SELECT category FROM menu_items WHERE id = $1) ORDER BY sort_order, id", [
        id
    ]) : await (0, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$db$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["dbQuery"])("SELECT id FROM menu_categories ORDER BY sort_order, id");
    const ids = rows.map((r)=>String(r.id));
    const i = ids.indexOf(id);
    const j = i + dir;
    if (i < 0 || j < 0 || j >= ids.length) return;
    [ids[i], ids[j]] = [
        ids[j],
        ids[i]
    ];
    // شماره‌های sort_order همین گروه را دوباره پشت‌سرهم می‌گذاریم (با حفظ ترتیبِ سراسری)
    const base = await (0, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$db$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["dbQuery"])(`SELECT COALESCE(MIN(sort_order), 0)::int AS m FROM ${table} WHERE id = ANY($1::text[])`, [
        ids
    ]);
    const start = Number(base[0]?.m ?? 0);
    for(let k = 0; k < ids.length; k++){
        await (0, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$db$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["dbQuery"])(`UPDATE ${table} SET sort_order = $2 WHERE id = $1`, [
            ids[k],
            start + k
        ]);
    }
    invalidateMenuCache();
}
async function saveMenuImage(mime, base64) {
    const id = `img-${Date.now().toString(36)}${Math.random().toString(36).slice(2, 6)}`;
    await (0, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$db$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["dbQuery"])("INSERT INTO menu_images (id, mime, data) VALUES ($1,$2,$3)", [
        id,
        mime,
        base64
    ]);
    return `/api/menu-image/${id}`;
}
async function getMenuImage(id) {
    const rows = await (0, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$db$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["dbQuery"])("SELECT mime, data FROM menu_images WHERE id = $1", [
        id
    ]);
    return rows[0] ? {
        mime: String(rows[0].mime),
        data: String(rows[0].data)
    } : null;
}
}),
"[project]/components/AddToCartButton.tsx [app-rsc] (client reference proxy) <module evaluation>", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "default",
    ()=>__TURBOPACK__default__export__
]);
// This file is generated by next-core EcmascriptClientReferenceModule.
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$server$2d$dom$2d$turbopack$2d$server$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/server/route-modules/app-page/vendored/rsc/react-server-dom-turbopack-server.js [app-rsc] (ecmascript)");
;
const __TURBOPACK__default__export__ = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$server$2d$dom$2d$turbopack$2d$server$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["registerClientReference"])(function() {
    throw new Error("Attempted to call the default export of [project]/components/AddToCartButton.tsx <module evaluation> from the server, but it's on the client. It's not possible to invoke a client function from the server, it can only be rendered as a Component or passed to props of a Client Component.");
}, "[project]/components/AddToCartButton.tsx <module evaluation>", "default");
}),
"[project]/components/AddToCartButton.tsx [app-rsc] (client reference proxy)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "default",
    ()=>__TURBOPACK__default__export__
]);
// This file is generated by next-core EcmascriptClientReferenceModule.
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$server$2d$dom$2d$turbopack$2d$server$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/server/route-modules/app-page/vendored/rsc/react-server-dom-turbopack-server.js [app-rsc] (ecmascript)");
;
const __TURBOPACK__default__export__ = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$server$2d$dom$2d$turbopack$2d$server$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["registerClientReference"])(function() {
    throw new Error("Attempted to call the default export of [project]/components/AddToCartButton.tsx from the server, but it's on the client. It's not possible to invoke a client function from the server, it can only be rendered as a Component or passed to props of a Client Component.");
}, "[project]/components/AddToCartButton.tsx", "default");
}),
"[project]/components/AddToCartButton.tsx [app-rsc] (ecmascript)", ((__turbopack_context__) => {
"use strict";

var __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$AddToCartButton$2e$tsx__$5b$app$2d$rsc$5d$__$28$client__reference__proxy$29$__$3c$module__evaluation$3e$__ = __turbopack_context__.i("[project]/components/AddToCartButton.tsx [app-rsc] (client reference proxy) <module evaluation>");
var __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$AddToCartButton$2e$tsx__$5b$app$2d$rsc$5d$__$28$client__reference__proxy$29$__ = __turbopack_context__.i("[project]/components/AddToCartButton.tsx [app-rsc] (client reference proxy)");
;
__turbopack_context__.n(__TURBOPACK__imported__module__$5b$project$5d2f$components$2f$AddToCartButton$2e$tsx__$5b$app$2d$rsc$5d$__$28$client__reference__proxy$29$__);
}),
"[project]/components/DishCard.tsx [app-rsc] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "default",
    ()=>DishCard
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/server/route-modules/app-page/vendored/rsc/react-jsx-dev-runtime.js [app-rsc] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$image$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/image.js [app-rsc] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$AddToCartButton$2e$tsx__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/components/AddToCartButton.tsx [app-rsc] (ecmascript)");
;
;
;
function formatPrice(n) {
    return n.toLocaleString("fa-IR");
}
function DishCard({ item }) {
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        className: `gorg-card rounded-2xl overflow-hidden flex flex-col ${item.available === false ? "opacity-60" : ""}`,
        children: [
            item.image && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "relative aspect-[4/3] w-full",
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$image$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["default"], {
                        src: item.image,
                        alt: item.name,
                        fill: true,
                        sizes: "(max-width: 768px) 90vw, 320px",
                        className: "object-cover"
                    }, void 0, false, {
                        fileName: "[project]/components/DishCard.tsx",
                        lineNumber: 14,
                        columnNumber: 11
                    }, this),
                    item.signature && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                        className: "absolute top-3 right-3 tag-pill",
                        children: "پیشنهاد گرگ"
                    }, void 0, false, {
                        fileName: "[project]/components/DishCard.tsx",
                        lineNumber: 22,
                        columnNumber: 13
                    }, this),
                    !!item.discount && item.discount > 0 && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                        className: "absolute bottom-3 right-3 tag-pill",
                        children: [
                            item.discount.toLocaleString("fa-IR"),
                            "٪ تخفیف"
                        ]
                    }, void 0, true, {
                        fileName: "[project]/components/DishCard.tsx",
                        lineNumber: 25,
                        columnNumber: 13
                    }, this),
                    item.spicy && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                        className: "absolute top-3 left-3 text-lg",
                        title: "تند",
                        "aria-label": "تند",
                        children: "🌶️"
                    }, void 0, false, {
                        fileName: "[project]/components/DishCard.tsx",
                        lineNumber: 28,
                        columnNumber: 13
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/components/DishCard.tsx",
                lineNumber: 13,
                columnNumber: 9
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "p-4 flex flex-col gap-2 flex-1",
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "flex items-start justify-between gap-2",
                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])("h3", {
                            className: "font-bold text-[15px] leading-6",
                            children: item.name
                        }, void 0, false, {
                            fileName: "[project]/components/DishCard.tsx",
                            lineNumber: 36,
                            columnNumber: 11
                        }, this)
                    }, void 0, false, {
                        fileName: "[project]/components/DishCard.tsx",
                        lineNumber: 35,
                        columnNumber: 9
                    }, this),
                    item.description && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                        className: "text-xs text-[var(--color-ash)] leading-6",
                        children: item.description
                    }, void 0, false, {
                        fileName: "[project]/components/DishCard.tsx",
                        lineNumber: 39,
                        columnNumber: 11
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "flex items-center justify-between pt-1 mt-auto",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                className: "flex flex-col",
                                children: [
                                    item.basePrice && item.basePrice > item.price && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                        className: "text-[11px] text-[var(--color-ash)] line-through leading-4",
                                        children: formatPrice(item.basePrice)
                                    }, void 0, false, {
                                        fileName: "[project]/components/DishCard.tsx",
                                        lineNumber: 44,
                                        columnNumber: 15
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                        className: "font-extrabold text-sm",
                                        children: [
                                            formatPrice(item.price),
                                            " تومان"
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/components/DishCard.tsx",
                                        lineNumber: 46,
                                        columnNumber: 13
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/components/DishCard.tsx",
                                lineNumber: 42,
                                columnNumber: 11
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$components$2f$AddToCartButton$2e$tsx__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["default"], {
                                id: item.id,
                                name: item.name,
                                price: item.price,
                                disabled: item.available === false
                            }, void 0, false, {
                                fileName: "[project]/components/DishCard.tsx",
                                lineNumber: 48,
                                columnNumber: 11
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/components/DishCard.tsx",
                        lineNumber: 41,
                        columnNumber: 9
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/components/DishCard.tsx",
                lineNumber: 34,
                columnNumber: 7
            }, this)
        ]
    }, void 0, true, {
        fileName: "[project]/components/DishCard.tsx",
        lineNumber: 11,
        columnNumber: 5
    }, this);
}
}),
"[project]/components/MenuCategoryNav.tsx [app-rsc] (client reference proxy) <module evaluation>", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "default",
    ()=>__TURBOPACK__default__export__
]);
// This file is generated by next-core EcmascriptClientReferenceModule.
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$server$2d$dom$2d$turbopack$2d$server$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/server/route-modules/app-page/vendored/rsc/react-server-dom-turbopack-server.js [app-rsc] (ecmascript)");
;
const __TURBOPACK__default__export__ = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$server$2d$dom$2d$turbopack$2d$server$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["registerClientReference"])(function() {
    throw new Error("Attempted to call the default export of [project]/components/MenuCategoryNav.tsx <module evaluation> from the server, but it's on the client. It's not possible to invoke a client function from the server, it can only be rendered as a Component or passed to props of a Client Component.");
}, "[project]/components/MenuCategoryNav.tsx <module evaluation>", "default");
}),
"[project]/components/MenuCategoryNav.tsx [app-rsc] (client reference proxy)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "default",
    ()=>__TURBOPACK__default__export__
]);
// This file is generated by next-core EcmascriptClientReferenceModule.
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$server$2d$dom$2d$turbopack$2d$server$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/server/route-modules/app-page/vendored/rsc/react-server-dom-turbopack-server.js [app-rsc] (ecmascript)");
;
const __TURBOPACK__default__export__ = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$server$2d$dom$2d$turbopack$2d$server$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["registerClientReference"])(function() {
    throw new Error("Attempted to call the default export of [project]/components/MenuCategoryNav.tsx from the server, but it's on the client. It's not possible to invoke a client function from the server, it can only be rendered as a Component or passed to props of a Client Component.");
}, "[project]/components/MenuCategoryNav.tsx", "default");
}),
"[project]/components/MenuCategoryNav.tsx [app-rsc] (ecmascript)", ((__turbopack_context__) => {
"use strict";

var __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$MenuCategoryNav$2e$tsx__$5b$app$2d$rsc$5d$__$28$client__reference__proxy$29$__$3c$module__evaluation$3e$__ = __turbopack_context__.i("[project]/components/MenuCategoryNav.tsx [app-rsc] (client reference proxy) <module evaluation>");
var __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$MenuCategoryNav$2e$tsx__$5b$app$2d$rsc$5d$__$28$client__reference__proxy$29$__ = __turbopack_context__.i("[project]/components/MenuCategoryNav.tsx [app-rsc] (client reference proxy)");
;
__turbopack_context__.n(__TURBOPACK__imported__module__$5b$project$5d2f$components$2f$MenuCategoryNav$2e$tsx__$5b$app$2d$rsc$5d$__$28$client__reference__proxy$29$__);
}),
"[project]/components/TableBanner.tsx [app-rsc] (client reference proxy) <module evaluation>", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "default",
    ()=>__TURBOPACK__default__export__
]);
// This file is generated by next-core EcmascriptClientReferenceModule.
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$server$2d$dom$2d$turbopack$2d$server$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/server/route-modules/app-page/vendored/rsc/react-server-dom-turbopack-server.js [app-rsc] (ecmascript)");
;
const __TURBOPACK__default__export__ = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$server$2d$dom$2d$turbopack$2d$server$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["registerClientReference"])(function() {
    throw new Error("Attempted to call the default export of [project]/components/TableBanner.tsx <module evaluation> from the server, but it's on the client. It's not possible to invoke a client function from the server, it can only be rendered as a Component or passed to props of a Client Component.");
}, "[project]/components/TableBanner.tsx <module evaluation>", "default");
}),
"[project]/components/TableBanner.tsx [app-rsc] (client reference proxy)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "default",
    ()=>__TURBOPACK__default__export__
]);
// This file is generated by next-core EcmascriptClientReferenceModule.
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$server$2d$dom$2d$turbopack$2d$server$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/server/route-modules/app-page/vendored/rsc/react-server-dom-turbopack-server.js [app-rsc] (ecmascript)");
;
const __TURBOPACK__default__export__ = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$server$2d$dom$2d$turbopack$2d$server$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["registerClientReference"])(function() {
    throw new Error("Attempted to call the default export of [project]/components/TableBanner.tsx from the server, but it's on the client. It's not possible to invoke a client function from the server, it can only be rendered as a Component or passed to props of a Client Component.");
}, "[project]/components/TableBanner.tsx", "default");
}),
"[project]/components/TableBanner.tsx [app-rsc] (ecmascript)", ((__turbopack_context__) => {
"use strict";

var __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$TableBanner$2e$tsx__$5b$app$2d$rsc$5d$__$28$client__reference__proxy$29$__$3c$module__evaluation$3e$__ = __turbopack_context__.i("[project]/components/TableBanner.tsx [app-rsc] (client reference proxy) <module evaluation>");
var __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$TableBanner$2e$tsx__$5b$app$2d$rsc$5d$__$28$client__reference__proxy$29$__ = __turbopack_context__.i("[project]/components/TableBanner.tsx [app-rsc] (client reference proxy)");
;
__turbopack_context__.n(__TURBOPACK__imported__module__$5b$project$5d2f$components$2f$TableBanner$2e$tsx__$5b$app$2d$rsc$5d$__$28$client__reference__proxy$29$__);
}),
"[project]/app/menu/page.tsx [app-rsc] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "default",
    ()=>MenuPage,
    "dynamic",
    ()=>dynamic,
    "metadata",
    ()=>metadata
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/server/route-modules/app-page/vendored/rsc/react-jsx-dev-runtime.js [app-rsc] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$menuStore$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/lib/menuStore.ts [app-rsc] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$db$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/lib/db.ts [app-rsc] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$DishCard$2e$tsx__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/components/DishCard.tsx [app-rsc] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$MenuCategoryNav$2e$tsx__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/components/MenuCategoryNav.tsx [app-rsc] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$TableBanner$2e$tsx__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/components/TableBanner.tsx [app-rsc] (ecmascript)");
;
;
;
;
;
;
const dynamic = "force-dynamic";
const metadata = {
    title: "منو",
    description: "منوی کامل رستوران گرگ: پیش‌غذا، سالاد، برگر، بریسکت، نشویل و نوشیدنی."
};
async function findTable(code) {
    if (!code || !(0, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$db$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["isDbConfigured"])()) return null;
    try {
        const rows = await (0, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$db$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["dbQuery"])("SELECT code, title FROM dining_tables WHERE code = $1 AND active = true", [
            code.slice(0, 20)
        ]);
        return rows[0] ? {
            code: String(rows[0].code),
            title: String(rows[0].title ?? "")
        } : null;
    } catch  {
        return null;
    }
}
async function MenuPage({ searchParams }) {
    const [menu, sp] = await Promise.all([
        (0, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$menuStore$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["getMenu"])(),
        searchParams
    ]);
    const table = await findTable(sp.table);
    const sections = menu.categories.map((cat)=>({
            cat,
            items: (0, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$menuStore$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["itemsByCategory"])(menu, cat.id)
        })).filter((s)=>s.items.length > 0);
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        className: "max-w-6xl mx-auto px-5 pt-28 pb-24",
        children: [
            table && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$components$2f$TableBanner$2e$tsx__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["default"], {
                table: table
            }, void 0, false, {
                fileName: "[project]/app/menu/page.tsx",
                lineNumber: 33,
                columnNumber: 17
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "mb-10",
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                        className: "text-xs tracking-[0.3em] text-[var(--color-ember-light)] uppercase",
                        children: "Menu"
                    }, void 0, false, {
                        fileName: "[project]/app/menu/page.tsx",
                        lineNumber: 36,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])("h1", {
                        className: "text-4xl font-black mt-3 mb-3",
                        children: "منوی گرگ"
                    }, void 0, false, {
                        fileName: "[project]/app/menu/page.tsx",
                        lineNumber: 37,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                        className: "text-[var(--color-ash)] max-w-xl",
                        children: "از بال و برگر تا بریسکت و نشویل. دسته‌ی مورد نظرتان را انتخاب کنید و مستقیم به سبد سفارش اضافه کنید."
                    }, void 0, false, {
                        fileName: "[project]/app/menu/page.tsx",
                        lineNumber: 38,
                        columnNumber: 9
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/app/menu/page.tsx",
                lineNumber: 35,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$components$2f$MenuCategoryNav$2e$tsx__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["default"], {
                categories: sections.map((s)=>s.cat)
            }, void 0, false, {
                fileName: "[project]/app/menu/page.tsx",
                lineNumber: 44,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "space-y-16",
                children: sections.map(({ cat, items })=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])("section", {
                        id: cat.id,
                        className: "scroll-mt-32",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "mb-6",
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])("h2", {
                                        className: "text-2xl font-extrabold",
                                        children: cat.label
                                    }, void 0, false, {
                                        fileName: "[project]/app/menu/page.tsx",
                                        lineNumber: 50,
                                        columnNumber: 15
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                        className: "text-sm text-[var(--color-ash)] mt-1",
                                        children: cat.blurb
                                    }, void 0, false, {
                                        fileName: "[project]/app/menu/page.tsx",
                                        lineNumber: 51,
                                        columnNumber: 15
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/app/menu/page.tsx",
                                lineNumber: 49,
                                columnNumber: 13
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5",
                                children: items.map((item)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$components$2f$DishCard$2e$tsx__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["default"], {
                                        item: item
                                    }, item.id, false, {
                                        fileName: "[project]/app/menu/page.tsx",
                                        lineNumber: 55,
                                        columnNumber: 17
                                    }, this))
                            }, void 0, false, {
                                fileName: "[project]/app/menu/page.tsx",
                                lineNumber: 53,
                                columnNumber: 13
                            }, this)
                        ]
                    }, cat.id, true, {
                        fileName: "[project]/app/menu/page.tsx",
                        lineNumber: 48,
                        columnNumber: 11
                    }, this))
            }, void 0, false, {
                fileName: "[project]/app/menu/page.tsx",
                lineNumber: 46,
                columnNumber: 7
            }, this)
        ]
    }, void 0, true, {
        fileName: "[project]/app/menu/page.tsx",
        lineNumber: 32,
        columnNumber: 5
    }, this);
}
}),
"[project]/app/menu/page.tsx [app-rsc] (ecmascript, Next.js Server Component)", ((__turbopack_context__) => {

__turbopack_context__.n(__turbopack_context__.i("[project]/app/menu/page.tsx [app-rsc] (ecmascript)"));
}),
];

//# sourceMappingURL=%5Broot-of-the-server%5D__11pjyol._.js.map