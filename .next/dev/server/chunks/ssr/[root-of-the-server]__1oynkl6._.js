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
        image: "/images/menu/drink-beer-classic-blamberg.jpg"
    },
    {
        id: "dr-2",
        category: "drinks",
        name: "آب معدنی",
        description: "آب معدنی خنک.",
        price: 35000,
        image: "/images/menu/drink-mineral-water-royal-star.jpg"
    },
    {
        id: "dr-3",
        category: "drinks",
        name: "اسپرایت",
        description: "اسپرایت خنک و لیمویی، در قوطی.",
        price: 100000,
        image: "/images/menu/drink-sprite.jpg"
    },
    {
        id: "dr-4",
        category: "drinks",
        name: "فانتا",
        description: "فانتای پرتقالی خنک، در قوطی.",
        price: 100000,
        image: "/images/menu/drink-fanta.jpg"
    },
    {
        id: "dr-5",
        category: "drinks",
        name: "کوکاکولا زیرو",
        description: "کوکاکولا بدون قند، خنک و در قوطی.",
        price: 100000,
        image: "/images/menu/drink-cola-zero.jpg"
    },
    {
        id: "dr-6",
        category: "drinks",
        name: "کوکاکولا",
        description: "کوکاکولای کلاسیک، خنک و در قوطی؛ رفیق همیشگی برگر.",
        price: 100000,
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
/**
 * اصلاح‌های یک‌بارمصرف برای منویی که قبلاً وارد دیتابیس شده است (هر اصلاح فقط یک‌بار اجرا می‌شود
 * و اگر بعداً مدیر از پنل چیزی را دستی تغییر دهد، دوباره رویش نوشته نمی‌شود).
 *  ۱) قیمت اسپرایت، فانتا، کوکاکولا زیرو و کوکاکولا: ۱۰٬۰۰۰ ← ۱۰۰٬۰۰۰ تومان
 *  ۲) عکس جدید آبجوی کلاسیک روسی و آب معدنی
 */ async function applyMenuFixes() {
    const flag = await (0, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$db$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["dbQuery"])("SELECT 1 FROM site_settings WHERE key = 'menu_fix_drinks_2026_09'");
    if (flag.length > 0) return;
    await (0, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$db$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["dbQuery"])("UPDATE menu_items SET price = 100000 WHERE id IN ('dr-3','dr-4','dr-5','dr-6') AND price = 10000");
    await (0, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$db$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["dbQuery"])("UPDATE menu_items SET image = '/images/menu/drink-beer-classic-blamberg.jpg' WHERE image = '/images/menu/drink-beer-classic.jpg'");
    await (0, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$db$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["dbQuery"])("UPDATE menu_items SET image = '/images/menu/drink-mineral-water-royal-star.jpg' WHERE image = '/images/menu/drink-mineral-water.jpg'");
    await (0, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$db$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["dbQuery"])("INSERT INTO site_settings (key, value) VALUES ('menu_fix_drinks_2026_09', '1') ON CONFLICT (key) DO NOTHING");
    invalidateMenuCache();
}
/** اولین بار منوی استاتیک را وارد دیتابیس می‌کند (فقط یک‌بار؛ حتی اگر بعداً همه‌چیز پاک شود دوباره پر نمی‌شود) */ async function seedIfNeeded() {
    if (!seedPromise) {
        seedPromise = (async ()=>{
            const done = await (0, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$db$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["dbQuery"])("SELECT 1 FROM site_settings WHERE key = 'menu_seeded'");
            if (done.length > 0) {
                await applyMenuFixes();
                return;
            }
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
            await applyMenuFixes();
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
"[project]/components/FxTilt.tsx [app-rsc] (client reference proxy) <module evaluation>", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "default",
    ()=>__TURBOPACK__default__export__,
    "useTilt",
    ()=>useTilt
]);
// This file is generated by next-core EcmascriptClientReferenceModule.
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$server$2d$dom$2d$turbopack$2d$server$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/server/route-modules/app-page/vendored/rsc/react-server-dom-turbopack-server.js [app-rsc] (ecmascript)");
;
const __TURBOPACK__default__export__ = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$server$2d$dom$2d$turbopack$2d$server$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["registerClientReference"])(function() {
    throw new Error("Attempted to call the default export of [project]/components/FxTilt.tsx <module evaluation> from the server, but it's on the client. It's not possible to invoke a client function from the server, it can only be rendered as a Component or passed to props of a Client Component.");
}, "[project]/components/FxTilt.tsx <module evaluation>", "default");
const useTilt = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$server$2d$dom$2d$turbopack$2d$server$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["registerClientReference"])(function() {
    throw new Error("Attempted to call useTilt() from the server but useTilt is on the client. It's not possible to invoke a client function from the server, it can only be rendered as a Component or passed to props of a Client Component.");
}, "[project]/components/FxTilt.tsx <module evaluation>", "useTilt");
}),
"[project]/components/FxTilt.tsx [app-rsc] (client reference proxy)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "default",
    ()=>__TURBOPACK__default__export__,
    "useTilt",
    ()=>useTilt
]);
// This file is generated by next-core EcmascriptClientReferenceModule.
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$server$2d$dom$2d$turbopack$2d$server$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/server/route-modules/app-page/vendored/rsc/react-server-dom-turbopack-server.js [app-rsc] (ecmascript)");
;
const __TURBOPACK__default__export__ = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$server$2d$dom$2d$turbopack$2d$server$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["registerClientReference"])(function() {
    throw new Error("Attempted to call the default export of [project]/components/FxTilt.tsx from the server, but it's on the client. It's not possible to invoke a client function from the server, it can only be rendered as a Component or passed to props of a Client Component.");
}, "[project]/components/FxTilt.tsx", "default");
const useTilt = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$server$2d$dom$2d$turbopack$2d$server$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["registerClientReference"])(function() {
    throw new Error("Attempted to call useTilt() from the server but useTilt is on the client. It's not possible to invoke a client function from the server, it can only be rendered as a Component or passed to props of a Client Component.");
}, "[project]/components/FxTilt.tsx", "useTilt");
}),
"[project]/components/FxTilt.tsx [app-rsc] (ecmascript)", ((__turbopack_context__) => {
"use strict";

var __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$FxTilt$2e$tsx__$5b$app$2d$rsc$5d$__$28$client__reference__proxy$29$__$3c$module__evaluation$3e$__ = __turbopack_context__.i("[project]/components/FxTilt.tsx [app-rsc] (client reference proxy) <module evaluation>");
var __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$FxTilt$2e$tsx__$5b$app$2d$rsc$5d$__$28$client__reference__proxy$29$__ = __turbopack_context__.i("[project]/components/FxTilt.tsx [app-rsc] (client reference proxy)");
;
__turbopack_context__.n(__TURBOPACK__imported__module__$5b$project$5d2f$components$2f$FxTilt$2e$tsx__$5b$app$2d$rsc$5d$__$28$client__reference__proxy$29$__);
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
var __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$FxTilt$2e$tsx__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/components/FxTilt.tsx [app-rsc] (ecmascript)");
;
;
;
;
function formatPrice(n) {
    return n.toLocaleString("fa-IR");
}
// جرقه‌های آتشینی که موقع هاور از پایینِ عکس بالا می‌روند (موقعیت‌ها ثابت‌اند تا SSR و کلاینت یکی باشند)
const EMBERS = [
    {
        l: "10%",
        s: 4,
        d: "0s",
        t: "2.1s",
        x: "14px"
    },
    {
        l: "24%",
        s: 3,
        d: ".5s",
        t: "2.6s",
        x: "-10px"
    },
    {
        l: "38%",
        s: 5,
        d: ".2s",
        t: "2.3s",
        x: "18px"
    },
    {
        l: "54%",
        s: 3,
        d: ".9s",
        t: "2.8s",
        x: "-16px"
    },
    {
        l: "68%",
        s: 4,
        d: ".35s",
        t: "2.2s",
        x: "12px"
    },
    {
        l: "82%",
        s: 3,
        d: ".7s",
        t: "2.5s",
        x: "-12px"
    },
    {
        l: "92%",
        s: 4,
        d: "1.1s",
        t: "2.4s",
        x: "8px"
    }
];
function DishCard({ item }) {
    return(// لایه‌ی بیرونی: فقط برای انیمیشن‌های اسکرول صفحه‌ی اصلی (GSAP)
    // لایه‌ی داخلی (FxTilt): تیلت و افکت‌های هاور. جدا هستند تا transform ها با هم دعوا نکنند.
    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        "data-fx-dish": true,
        className: "h-full",
        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$components$2f$FxTilt$2e$tsx__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["default"], {
            max: 6,
            className: `dish-card gorg-card rounded-2xl overflow-hidden flex flex-col h-full ${item.available === false ? "opacity-60" : ""}`,
            children: [
                item.image && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    className: "dish-media relative aspect-[4/3] w-full overflow-hidden",
                    children: [
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            className: "dish-parallax absolute inset-0",
                            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$image$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["default"], {
                                src: item.image,
                                alt: item.name,
                                fill: true,
                                sizes: "(max-width: 768px) 90vw, 320px",
                                className: "dish-img object-cover"
                            }, void 0, false, {
                                fileName: "[project]/components/DishCard.tsx",
                                lineNumber: 33,
                                columnNumber: 15
                            }, this)
                        }, void 0, false, {
                            fileName: "[project]/components/DishCard.tsx",
                            lineNumber: 32,
                            columnNumber: 13
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                            className: "dish-shade",
                            "aria-hidden": "true"
                        }, void 0, false, {
                            fileName: "[project]/components/DishCard.tsx",
                            lineNumber: 41,
                            columnNumber: 13
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                            className: "dish-shine",
                            "aria-hidden": "true"
                        }, void 0, false, {
                            fileName: "[project]/components/DishCard.tsx",
                            lineNumber: 42,
                            columnNumber: 13
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                            className: "dish-embers",
                            "aria-hidden": "true",
                            children: EMBERS.map((e, i)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])("i", {
                                    style: {
                                        "--l": e.l,
                                        "--s": `${e.s}px`,
                                        "--d": e.d,
                                        "--t": e.t,
                                        "--x": e.x
                                    }
                                }, i, false, {
                                    fileName: "[project]/components/DishCard.tsx",
                                    lineNumber: 45,
                                    columnNumber: 17
                                }, this))
                        }, void 0, false, {
                            fileName: "[project]/components/DishCard.tsx",
                            lineNumber: 43,
                            columnNumber: 13
                        }, this),
                        item.signature && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                            className: "absolute top-3 right-3 tag-pill z-10",
                            children: "پیشنهاد گرگ"
                        }, void 0, false, {
                            fileName: "[project]/components/DishCard.tsx",
                            lineNumber: 52,
                            columnNumber: 15
                        }, this),
                        !!item.discount && item.discount > 0 && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                            className: "absolute bottom-3 right-3 tag-pill z-10",
                            children: [
                                item.discount.toLocaleString("fa-IR"),
                                "٪ تخفیف"
                            ]
                        }, void 0, true, {
                            fileName: "[project]/components/DishCard.tsx",
                            lineNumber: 55,
                            columnNumber: 15
                        }, this),
                        item.spicy && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                            className: "dish-chili absolute top-3 left-3 text-lg z-10",
                            title: "تند",
                            "aria-label": "تند",
                            children: "🌶️"
                        }, void 0, false, {
                            fileName: "[project]/components/DishCard.tsx",
                            lineNumber: 58,
                            columnNumber: 15
                        }, this)
                    ]
                }, void 0, true, {
                    fileName: "[project]/components/DishCard.tsx",
                    lineNumber: 31,
                    columnNumber: 11
                }, this),
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    className: "dish-body relative z-[3] p-4 flex flex-col gap-2 flex-1",
                    children: [
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            className: "flex items-start justify-between gap-2",
                            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])("h3", {
                                className: "dish-title font-bold text-[15px] leading-6",
                                children: item.name
                            }, void 0, false, {
                                fileName: "[project]/components/DishCard.tsx",
                                lineNumber: 66,
                                columnNumber: 13
                            }, this)
                        }, void 0, false, {
                            fileName: "[project]/components/DishCard.tsx",
                            lineNumber: 65,
                            columnNumber: 11
                        }, this),
                        item.description && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                            className: "text-xs text-[var(--color-ash)] leading-6",
                            children: item.description
                        }, void 0, false, {
                            fileName: "[project]/components/DishCard.tsx",
                            lineNumber: 69,
                            columnNumber: 13
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
                                            lineNumber: 74,
                                            columnNumber: 17
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                            className: "dish-price font-extrabold text-sm",
                                            children: [
                                                formatPrice(item.price),
                                                " تومان"
                                            ]
                                        }, void 0, true, {
                                            fileName: "[project]/components/DishCard.tsx",
                                            lineNumber: 76,
                                            columnNumber: 15
                                        }, this)
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/components/DishCard.tsx",
                                    lineNumber: 72,
                                    columnNumber: 13
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$components$2f$AddToCartButton$2e$tsx__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["default"], {
                                    id: item.id,
                                    name: item.name,
                                    price: item.price,
                                    className: "dish-add",
                                    disabled: item.available === false
                                }, void 0, false, {
                                    fileName: "[project]/components/DishCard.tsx",
                                    lineNumber: 78,
                                    columnNumber: 13
                                }, this)
                            ]
                        }, void 0, true, {
                            fileName: "[project]/components/DishCard.tsx",
                            lineNumber: 71,
                            columnNumber: 11
                        }, this)
                    ]
                }, void 0, true, {
                    fileName: "[project]/components/DishCard.tsx",
                    lineNumber: 64,
                    columnNumber: 9
                }, this)
            ]
        }, void 0, true, {
            fileName: "[project]/components/DishCard.tsx",
            lineNumber: 26,
            columnNumber: 7
        }, this)
    }, void 0, false, {
        fileName: "[project]/components/DishCard.tsx",
        lineNumber: 25,
        columnNumber: 5
    }, this));
}
}),
"[project]/components/FireStory/FireStoryShowcase.tsx [app-rsc] (client reference proxy) <module evaluation>", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "default",
    ()=>__TURBOPACK__default__export__
]);
// This file is generated by next-core EcmascriptClientReferenceModule.
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$server$2d$dom$2d$turbopack$2d$server$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/server/route-modules/app-page/vendored/rsc/react-server-dom-turbopack-server.js [app-rsc] (ecmascript)");
;
const __TURBOPACK__default__export__ = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$server$2d$dom$2d$turbopack$2d$server$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["registerClientReference"])(function() {
    throw new Error("Attempted to call the default export of [project]/components/FireStory/FireStoryShowcase.tsx <module evaluation> from the server, but it's on the client. It's not possible to invoke a client function from the server, it can only be rendered as a Component or passed to props of a Client Component.");
}, "[project]/components/FireStory/FireStoryShowcase.tsx <module evaluation>", "default");
}),
"[project]/components/FireStory/FireStoryShowcase.tsx [app-rsc] (client reference proxy)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "default",
    ()=>__TURBOPACK__default__export__
]);
// This file is generated by next-core EcmascriptClientReferenceModule.
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$server$2d$dom$2d$turbopack$2d$server$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/server/route-modules/app-page/vendored/rsc/react-server-dom-turbopack-server.js [app-rsc] (ecmascript)");
;
const __TURBOPACK__default__export__ = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$server$2d$dom$2d$turbopack$2d$server$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["registerClientReference"])(function() {
    throw new Error("Attempted to call the default export of [project]/components/FireStory/FireStoryShowcase.tsx from the server, but it's on the client. It's not possible to invoke a client function from the server, it can only be rendered as a Component or passed to props of a Client Component.");
}, "[project]/components/FireStory/FireStoryShowcase.tsx", "default");
}),
"[project]/components/FireStory/FireStoryShowcase.tsx [app-rsc] (ecmascript)", ((__turbopack_context__) => {
"use strict";

var __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$FireStory$2f$FireStoryShowcase$2e$tsx__$5b$app$2d$rsc$5d$__$28$client__reference__proxy$29$__$3c$module__evaluation$3e$__ = __turbopack_context__.i("[project]/components/FireStory/FireStoryShowcase.tsx [app-rsc] (client reference proxy) <module evaluation>");
var __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$FireStory$2f$FireStoryShowcase$2e$tsx__$5b$app$2d$rsc$5d$__$28$client__reference__proxy$29$__ = __turbopack_context__.i("[project]/components/FireStory/FireStoryShowcase.tsx [app-rsc] (client reference proxy)");
;
__turbopack_context__.n(__TURBOPACK__imported__module__$5b$project$5d2f$components$2f$FireStory$2f$FireStoryShowcase$2e$tsx__$5b$app$2d$rsc$5d$__$28$client__reference__proxy$29$__);
}),
"[project]/components/InstallAppSection.tsx [app-rsc] (client reference proxy) <module evaluation>", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "default",
    ()=>__TURBOPACK__default__export__
]);
// This file is generated by next-core EcmascriptClientReferenceModule.
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$server$2d$dom$2d$turbopack$2d$server$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/server/route-modules/app-page/vendored/rsc/react-server-dom-turbopack-server.js [app-rsc] (ecmascript)");
;
const __TURBOPACK__default__export__ = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$server$2d$dom$2d$turbopack$2d$server$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["registerClientReference"])(function() {
    throw new Error("Attempted to call the default export of [project]/components/InstallAppSection.tsx <module evaluation> from the server, but it's on the client. It's not possible to invoke a client function from the server, it can only be rendered as a Component or passed to props of a Client Component.");
}, "[project]/components/InstallAppSection.tsx <module evaluation>", "default");
}),
"[project]/components/InstallAppSection.tsx [app-rsc] (client reference proxy)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "default",
    ()=>__TURBOPACK__default__export__
]);
// This file is generated by next-core EcmascriptClientReferenceModule.
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$server$2d$dom$2d$turbopack$2d$server$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/server/route-modules/app-page/vendored/rsc/react-server-dom-turbopack-server.js [app-rsc] (ecmascript)");
;
const __TURBOPACK__default__export__ = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$server$2d$dom$2d$turbopack$2d$server$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["registerClientReference"])(function() {
    throw new Error("Attempted to call the default export of [project]/components/InstallAppSection.tsx from the server, but it's on the client. It's not possible to invoke a client function from the server, it can only be rendered as a Component or passed to props of a Client Component.");
}, "[project]/components/InstallAppSection.tsx", "default");
}),
"[project]/components/InstallAppSection.tsx [app-rsc] (ecmascript)", ((__turbopack_context__) => {
"use strict";

var __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$InstallAppSection$2e$tsx__$5b$app$2d$rsc$5d$__$28$client__reference__proxy$29$__$3c$module__evaluation$3e$__ = __turbopack_context__.i("[project]/components/InstallAppSection.tsx [app-rsc] (client reference proxy) <module evaluation>");
var __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$InstallAppSection$2e$tsx__$5b$app$2d$rsc$5d$__$28$client__reference__proxy$29$__ = __turbopack_context__.i("[project]/components/InstallAppSection.tsx [app-rsc] (client reference proxy)");
;
__turbopack_context__.n(__TURBOPACK__imported__module__$5b$project$5d2f$components$2f$InstallAppSection$2e$tsx__$5b$app$2d$rsc$5d$__$28$client__reference__proxy$29$__);
}),
"[project]/components/OrderButton.tsx [app-rsc] (client reference proxy) <module evaluation>", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "default",
    ()=>__TURBOPACK__default__export__
]);
// This file is generated by next-core EcmascriptClientReferenceModule.
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$server$2d$dom$2d$turbopack$2d$server$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/server/route-modules/app-page/vendored/rsc/react-server-dom-turbopack-server.js [app-rsc] (ecmascript)");
;
const __TURBOPACK__default__export__ = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$server$2d$dom$2d$turbopack$2d$server$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["registerClientReference"])(function() {
    throw new Error("Attempted to call the default export of [project]/components/OrderButton.tsx <module evaluation> from the server, but it's on the client. It's not possible to invoke a client function from the server, it can only be rendered as a Component or passed to props of a Client Component.");
}, "[project]/components/OrderButton.tsx <module evaluation>", "default");
}),
"[project]/components/OrderButton.tsx [app-rsc] (client reference proxy)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "default",
    ()=>__TURBOPACK__default__export__
]);
// This file is generated by next-core EcmascriptClientReferenceModule.
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$server$2d$dom$2d$turbopack$2d$server$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/server/route-modules/app-page/vendored/rsc/react-server-dom-turbopack-server.js [app-rsc] (ecmascript)");
;
const __TURBOPACK__default__export__ = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$server$2d$dom$2d$turbopack$2d$server$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["registerClientReference"])(function() {
    throw new Error("Attempted to call the default export of [project]/components/OrderButton.tsx from the server, but it's on the client. It's not possible to invoke a client function from the server, it can only be rendered as a Component or passed to props of a Client Component.");
}, "[project]/components/OrderButton.tsx", "default");
}),
"[project]/components/OrderButton.tsx [app-rsc] (ecmascript)", ((__turbopack_context__) => {
"use strict";

var __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$OrderButton$2e$tsx__$5b$app$2d$rsc$5d$__$28$client__reference__proxy$29$__$3c$module__evaluation$3e$__ = __turbopack_context__.i("[project]/components/OrderButton.tsx [app-rsc] (client reference proxy) <module evaluation>");
var __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$OrderButton$2e$tsx__$5b$app$2d$rsc$5d$__$28$client__reference__proxy$29$__ = __turbopack_context__.i("[project]/components/OrderButton.tsx [app-rsc] (client reference proxy)");
;
__turbopack_context__.n(__TURBOPACK__imported__module__$5b$project$5d2f$components$2f$OrderButton$2e$tsx__$5b$app$2d$rsc$5d$__$28$client__reference__proxy$29$__);
}),
"[project]/components/HomeScrollFX.tsx [app-rsc] (client reference proxy) <module evaluation>", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "default",
    ()=>__TURBOPACK__default__export__
]);
// This file is generated by next-core EcmascriptClientReferenceModule.
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$server$2d$dom$2d$turbopack$2d$server$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/server/route-modules/app-page/vendored/rsc/react-server-dom-turbopack-server.js [app-rsc] (ecmascript)");
;
const __TURBOPACK__default__export__ = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$server$2d$dom$2d$turbopack$2d$server$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["registerClientReference"])(function() {
    throw new Error("Attempted to call the default export of [project]/components/HomeScrollFX.tsx <module evaluation> from the server, but it's on the client. It's not possible to invoke a client function from the server, it can only be rendered as a Component or passed to props of a Client Component.");
}, "[project]/components/HomeScrollFX.tsx <module evaluation>", "default");
}),
"[project]/components/HomeScrollFX.tsx [app-rsc] (client reference proxy)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "default",
    ()=>__TURBOPACK__default__export__
]);
// This file is generated by next-core EcmascriptClientReferenceModule.
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$server$2d$dom$2d$turbopack$2d$server$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/server/route-modules/app-page/vendored/rsc/react-server-dom-turbopack-server.js [app-rsc] (ecmascript)");
;
const __TURBOPACK__default__export__ = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$server$2d$dom$2d$turbopack$2d$server$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["registerClientReference"])(function() {
    throw new Error("Attempted to call the default export of [project]/components/HomeScrollFX.tsx from the server, but it's on the client. It's not possible to invoke a client function from the server, it can only be rendered as a Component or passed to props of a Client Component.");
}, "[project]/components/HomeScrollFX.tsx", "default");
}),
"[project]/components/HomeScrollFX.tsx [app-rsc] (ecmascript)", ((__turbopack_context__) => {
"use strict";

var __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$HomeScrollFX$2e$tsx__$5b$app$2d$rsc$5d$__$28$client__reference__proxy$29$__$3c$module__evaluation$3e$__ = __turbopack_context__.i("[project]/components/HomeScrollFX.tsx [app-rsc] (client reference proxy) <module evaluation>");
var __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$HomeScrollFX$2e$tsx__$5b$app$2d$rsc$5d$__$28$client__reference__proxy$29$__ = __turbopack_context__.i("[project]/components/HomeScrollFX.tsx [app-rsc] (client reference proxy)");
;
__turbopack_context__.n(__TURBOPACK__imported__module__$5b$project$5d2f$components$2f$HomeScrollFX$2e$tsx__$5b$app$2d$rsc$5d$__$28$client__reference__proxy$29$__);
}),
"[project]/app/page.tsx [app-rsc] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "default",
    ()=>HomePage,
    "dynamic",
    ()=>dynamic
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/server/route-modules/app-page/vendored/rsc/react-jsx-dev-runtime.js [app-rsc] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$client$2f$app$2d$dir$2f$link$2e$react$2d$server$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/client/app-dir/link.react-server.js [app-rsc] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$image$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/image.js [app-rsc] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$menuStore$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/lib/menuStore.ts [app-rsc] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$gallery$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/lib/gallery.ts [app-rsc] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$DishCard$2e$tsx__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/components/DishCard.tsx [app-rsc] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$FireStory$2f$FireStoryShowcase$2e$tsx__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/components/FireStory/FireStoryShowcase.tsx [app-rsc] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$InstallAppSection$2e$tsx__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/components/InstallAppSection.tsx [app-rsc] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$OrderButton$2e$tsx__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/components/OrderButton.tsx [app-rsc] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$FxTilt$2e$tsx__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/components/FxTilt.tsx [app-rsc] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$HomeScrollFX$2e$tsx__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/components/HomeScrollFX.tsx [app-rsc] (ecmascript)");
;
;
;
;
;
;
;
;
;
;
;
const CATEGORY_ICONS = {
    starters: "🍟",
    salad: "🥗",
    burger: "🍔",
    brisket: "🥪",
    nashville: "🍗",
    drinks: "🥤"
};
const INTRO = "گرگ جایی‌ست برای وقتی که واقعاً گرسنه‌اید؛ نه گرسنه‌ی خوردن، گرسنه‌ی طعم. از بال و برگر تا بریسکت و نشویل، هر بار که می‌آیید دقیقاً همان چیزی را پیدا می‌کنید که امشب دلتان می‌خواهد.";
// جرقه‌های شناورِ پس‌زمینه‌ی «پیشنهاد گرگ» (ثابت، تا SSR و کلاینت یکی باشند)
const FX_EMBERS = [
    {
        l: "6%",
        s: 4,
        d: "0s",
        t: "9s",
        x: "30px"
    },
    {
        l: "15%",
        s: 3,
        d: "2.4s",
        t: "11s",
        x: "-24px"
    },
    {
        l: "27%",
        s: 5,
        d: "1s",
        t: "10s",
        x: "26px"
    },
    {
        l: "38%",
        s: 3,
        d: "4.2s",
        t: "12s",
        x: "-18px"
    },
    {
        l: "49%",
        s: 4,
        d: "0.6s",
        t: "9.5s",
        x: "22px"
    },
    {
        l: "58%",
        s: 3,
        d: "3.3s",
        t: "11.5s",
        x: "-30px"
    },
    {
        l: "67%",
        s: 5,
        d: "1.8s",
        t: "10.5s",
        x: "16px"
    },
    {
        l: "76%",
        s: 3,
        d: "5s",
        t: "12.5s",
        x: "-22px"
    },
    {
        l: "84%",
        s: 4,
        d: "0.3s",
        t: "9.8s",
        x: "28px"
    },
    {
        l: "92%",
        s: 3,
        d: "2.9s",
        t: "11.2s",
        x: "-16px"
    },
    {
        l: "97%",
        s: 4,
        d: "4.6s",
        t: "10.2s",
        x: "-26px"
    },
    {
        l: "33%",
        s: 3,
        d: "6.2s",
        t: "12.2s",
        x: "20px"
    }
];
const dynamic = "force-dynamic";
async function HomePage() {
    const [menu, galleryPhotos] = await Promise.all([
        (0, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$menuStore$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["getMenu"])(),
        (0, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$gallery$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["getGalleryPhotos"])()
    ]);
    // تیزر گالری: ۶ عکسِ اولِ گالری
    const GALLERY_TEASER = galleryPhotos.slice(0, 6);
    const categories = menu.categories.filter((c)=>menu.items.some((i)=>i.category === c.id));
    const signatureDishes = menu.items.filter((i)=>i.signature).slice(0, 7);
    // آیتمِ دکمه‌ی زیر انیمیشنِ برگر: همان «bg-1»؛ اگر از منو حذف شده باشد اولین برگر
    const heroDish = menu.items.find((i)=>i.id === "bg-1") ?? menu.items.find((i)=>i.category === "burger");
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["Fragment"], {
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])("section", {
                className: "brand-texture relative min-h-[92vh] flex items-center pt-24",
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "max-w-6xl mx-auto px-5 w-full",
                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            className: "max-w-2xl fade-up",
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    className: "flex items-center gap-3 mb-6",
                                    children: [
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$image$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["default"], {
                                            src: "/images/gorg-mark.png",
                                            alt: "",
                                            width: 56,
                                            height: 56,
                                            "aria-hidden": "true"
                                        }, void 0, false, {
                                            fileName: "[project]/app/page.tsx",
                                            lineNumber: 59,
                                            columnNumber: 15
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                            className: "text-xs tracking-[0.3em] text-[var(--color-ash)] uppercase",
                                            children: "Trust Your Instinct"
                                        }, void 0, false, {
                                            fileName: "[project]/app/page.tsx",
                                            lineNumber: 60,
                                            columnNumber: 15
                                        }, this)
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/app/page.tsx",
                                    lineNumber: 58,
                                    columnNumber: 13
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])("h1", {
                                    className: "text-5xl sm:text-6xl font-black leading-tight mb-5",
                                    children: "گرگ"
                                }, void 0, false, {
                                    fileName: "[project]/app/page.tsx",
                                    lineNumber: 64,
                                    columnNumber: 13
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                    className: "text-xl sm:text-2xl font-bold text-[var(--color-bone)] mb-4",
                                    children: "به غریزه‌ات اعتماد کن."
                                }, void 0, false, {
                                    fileName: "[project]/app/page.tsx",
                                    lineNumber: 67,
                                    columnNumber: 13
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                    className: "text-[var(--color-ash)] leading-8 mb-8 max-w-lg",
                                    children: "برگر، ساندویچ بریسکت، مرغ سوخاری نشویل، بال و سیب‌زمینی؛ همه زیر یک سقف، برای هر شب هفته."
                                }, void 0, false, {
                                    fileName: "[project]/app/page.tsx",
                                    lineNumber: 70,
                                    columnNumber: 13
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    className: "flex flex-wrap items-center gap-4",
                                    children: [
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$client$2f$app$2d$dir$2f$link$2e$react$2d$server$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["default"], {
                                            href: "/menu",
                                            className: "btn-primary",
                                            children: "مشاهده منو کامل"
                                        }, void 0, false, {
                                            fileName: "[project]/app/page.tsx",
                                            lineNumber: 75,
                                            columnNumber: 15
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$client$2f$app$2d$dir$2f$link$2e$react$2d$server$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["default"], {
                                            href: "/contact",
                                            className: "btn-outline",
                                            children: "تماس با گرگ"
                                        }, void 0, false, {
                                            fileName: "[project]/app/page.tsx",
                                            lineNumber: 78,
                                            columnNumber: 15
                                        }, this)
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/app/page.tsx",
                                    lineNumber: 74,
                                    columnNumber: 13
                                }, this)
                            ]
                        }, void 0, true, {
                            fileName: "[project]/app/page.tsx",
                            lineNumber: 57,
                            columnNumber: 11
                        }, this)
                    }, void 0, false, {
                        fileName: "[project]/app/page.tsx",
                        lineNumber: 56,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "absolute bottom-8 left-1/2 -translate-x-1/2 hidden sm:flex flex-col items-center gap-2 text-[var(--color-ash)]",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                className: "text-[11px] tracking-widest",
                                children: "اسکرول کنید"
                            }, void 0, false, {
                                fileName: "[project]/app/page.tsx",
                                lineNumber: 86,
                                columnNumber: 11
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                className: "w-[1px] h-8 bg-gradient-to-b from-[var(--color-ember)] to-transparent"
                            }, void 0, false, {
                                fileName: "[project]/app/page.tsx",
                                lineNumber: 87,
                                columnNumber: 11
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/app/page.tsx",
                        lineNumber: 85,
                        columnNumber: 9
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/app/page.tsx",
                lineNumber: 55,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$components$2f$FireStory$2f$FireStoryShowcase$2e$tsx__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["default"], {
                heroItem: heroDish && heroDish.available !== false ? {
                    id: heroDish.id,
                    name: heroDish.name,
                    price: heroDish.price
                } : undefined
            }, void 0, false, {
                fileName: "[project]/app/page.tsx",
                lineNumber: 92,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$components$2f$HomeScrollFX$2e$tsx__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["default"], {}, void 0, false, {
                fileName: "[project]/app/page.tsx",
                lineNumber: 95,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])("section", {
                className: "max-w-4xl mx-auto px-5 py-24 text-center",
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        "data-fx-pop": true,
                        className: "claw-divider mx-auto mb-6",
                        "aria-hidden": "true"
                    }, void 0, false, {
                        fileName: "[project]/app/page.tsx",
                        lineNumber: 99,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                        className: "text-lg sm:text-xl leading-9 text-[var(--color-bone)]",
                        children: INTRO.split(" ").map((w, i)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                        "data-fx-word": true,
                                        className: "inline-block",
                                        children: w
                                    }, void 0, false, {
                                        fileName: "[project]/app/page.tsx",
                                        lineNumber: 103,
                                        columnNumber: 15
                                    }, this),
                                    " "
                                ]
                            }, i, true, {
                                fileName: "[project]/app/page.tsx",
                                lineNumber: 102,
                                columnNumber: 13
                            }, this))
                    }, void 0, false, {
                        fileName: "[project]/app/page.tsx",
                        lineNumber: 100,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$client$2f$app$2d$dir$2f$link$2e$react$2d$server$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["default"], {
                        "data-fx-fade": true,
                        href: "/about",
                        className: "inline-block mt-6 text-sm font-bold text-[var(--color-ember-light)] hover:underline",
                        children: "داستان گرگ را بخوانید ←"
                    }, void 0, false, {
                        fileName: "[project]/app/page.tsx",
                        lineNumber: 107,
                        columnNumber: 9
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/app/page.tsx",
                lineNumber: 98,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "relative overflow-x-clip",
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        "data-fx-blob": true,
                        "data-speed": "18",
                        className: "fx-blob -top-24 -right-40",
                        "aria-hidden": "true"
                    }, void 0, false, {
                        fileName: "[project]/app/page.tsx",
                        lineNumber: 118,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        "data-fx-blob": true,
                        "data-speed": "26",
                        className: "fx-blob bottom-0 -left-56",
                        "aria-hidden": "true"
                    }, void 0, false, {
                        fileName: "[project]/app/page.tsx",
                        lineNumber: 119,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])("section", {
                        className: "relative max-w-6xl mx-auto px-5 pb-24",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                "data-fx-head": true,
                                className: "mb-8",
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        className: "overflow-hidden pb-2",
                                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])("h2", {
                                            "data-fx-h": true,
                                            className: "text-2xl sm:text-3xl font-extrabold",
                                            children: "دسته‌های منو"
                                        }, void 0, false, {
                                            fileName: "[project]/app/page.tsx",
                                            lineNumber: 123,
                                            columnNumber: 15
                                        }, this)
                                    }, void 0, false, {
                                        fileName: "[project]/app/page.tsx",
                                        lineNumber: 122,
                                        columnNumber: 13
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                        "data-fx-rule": true,
                                        className: "fx-rule my-3",
                                        "aria-hidden": "true"
                                    }, void 0, false, {
                                        fileName: "[project]/app/page.tsx",
                                        lineNumber: 125,
                                        columnNumber: 13
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                        "data-fx-sub": true,
                                        className: "text-[var(--color-ash)] text-sm",
                                        children: "هر بخش از منوی گرگ را جداگانه ببینید."
                                    }, void 0, false, {
                                        fileName: "[project]/app/page.tsx",
                                        lineNumber: 126,
                                        columnNumber: 13
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/app/page.tsx",
                                lineNumber: 121,
                                columnNumber: 11
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4",
                                children: categories.map((cat)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        "data-fx-cat": true,
                                        className: "h-full",
                                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$components$2f$FxTilt$2e$tsx__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["default"], {
                                            as: "link",
                                            href: `/menu#${cat.id}`,
                                            max: 10,
                                            className: "cat-card gorg-card rounded-2xl p-5 flex flex-col items-center text-center gap-2 h-full",
                                            children: [
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                    className: "cat-icon text-3xl",
                                                    "aria-hidden": "true",
                                                    children: CATEGORY_ICONS[cat.id] ?? "🍽️"
                                                }, void 0, false, {
                                                    fileName: "[project]/app/page.tsx",
                                                    lineNumber: 139,
                                                    columnNumber: 19
                                                }, this),
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                    className: "cat-label font-bold text-sm",
                                                    children: cat.label
                                                }, void 0, false, {
                                                    fileName: "[project]/app/page.tsx",
                                                    lineNumber: 142,
                                                    columnNumber: 19
                                                }, this),
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                    className: "text-xs text-[var(--color-ash)] leading-5",
                                                    children: cat.blurb
                                                }, void 0, false, {
                                                    fileName: "[project]/app/page.tsx",
                                                    lineNumber: 143,
                                                    columnNumber: 19
                                                }, this),
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                    className: "cat-bar",
                                                    "aria-hidden": "true"
                                                }, void 0, false, {
                                                    fileName: "[project]/app/page.tsx",
                                                    lineNumber: 144,
                                                    columnNumber: 19
                                                }, this)
                                            ]
                                        }, void 0, true, {
                                            fileName: "[project]/app/page.tsx",
                                            lineNumber: 133,
                                            columnNumber: 17
                                        }, this)
                                    }, cat.id, false, {
                                        fileName: "[project]/app/page.tsx",
                                        lineNumber: 132,
                                        columnNumber: 15
                                    }, this))
                            }, void 0, false, {
                                fileName: "[project]/app/page.tsx",
                                lineNumber: 130,
                                columnNumber: 11
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/app/page.tsx",
                        lineNumber: 120,
                        columnNumber: 9
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/app/page.tsx",
                lineNumber: 117,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                "data-fx-line": true,
                className: "fx-divider-line max-w-4xl mx-auto",
                "aria-hidden": "true"
            }, void 0, false, {
                fileName: "[project]/app/page.tsx",
                lineNumber: 152,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "relative overflow-x-clip pt-24",
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        "data-fx-bgword": true,
                        className: "fx-bgword",
                        "aria-hidden": "true",
                        children: "GORG"
                    }, void 0, false, {
                        fileName: "[project]/app/page.tsx",
                        lineNumber: 156,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        "data-fx-blob": true,
                        "data-speed": "22",
                        className: "fx-blob top-40 -left-48",
                        "aria-hidden": "true"
                    }, void 0, false, {
                        fileName: "[project]/app/page.tsx",
                        lineNumber: 157,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        "data-fx-blob": true,
                        "data-speed": "30",
                        className: "fx-blob bottom-10 -right-52",
                        "aria-hidden": "true"
                    }, void 0, false, {
                        fileName: "[project]/app/page.tsx",
                        lineNumber: 158,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        "data-fx-embers": true,
                        className: "fx-embers",
                        "aria-hidden": "true",
                        children: FX_EMBERS.map((e, i)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])("i", {
                                style: {
                                    "--l": e.l,
                                    "--s": `${e.s}px`,
                                    "--d": e.d,
                                    "--t": e.t,
                                    "--x": e.x
                                }
                            }, i, false, {
                                fileName: "[project]/app/page.tsx",
                                lineNumber: 161,
                                columnNumber: 13
                            }, this))
                    }, void 0, false, {
                        fileName: "[project]/app/page.tsx",
                        lineNumber: 159,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])("section", {
                        className: "relative max-w-6xl mx-auto px-5 pb-24",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "flex items-end justify-between mb-8",
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        "data-fx-head": true,
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                className: "overflow-hidden pb-2",
                                                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])("h2", {
                                                    "data-fx-h": true,
                                                    className: "text-2xl sm:text-3xl font-extrabold",
                                                    children: "پیشنهاد گرگ"
                                                }, void 0, false, {
                                                    fileName: "[project]/app/page.tsx",
                                                    lineNumber: 168,
                                                    columnNumber: 17
                                                }, this)
                                            }, void 0, false, {
                                                fileName: "[project]/app/page.tsx",
                                                lineNumber: 167,
                                                columnNumber: 15
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                "data-fx-rule": true,
                                                className: "fx-rule my-3",
                                                "aria-hidden": "true"
                                            }, void 0, false, {
                                                fileName: "[project]/app/page.tsx",
                                                lineNumber: 170,
                                                columnNumber: 15
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                                "data-fx-sub": true,
                                                className: "text-[var(--color-ash)] text-sm",
                                                children: "چند انتخاب از منوی گرگ"
                                            }, void 0, false, {
                                                fileName: "[project]/app/page.tsx",
                                                lineNumber: 171,
                                                columnNumber: 15
                                            }, this)
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/app/page.tsx",
                                        lineNumber: 166,
                                        columnNumber: 13
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$client$2f$app$2d$dir$2f$link$2e$react$2d$server$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["default"], {
                                        href: "/menu",
                                        className: "text-sm font-bold text-[var(--color-ember-light)] hover:underline hidden sm:block",
                                        children: "مشاهده منو کامل ←"
                                    }, void 0, false, {
                                        fileName: "[project]/app/page.tsx",
                                        lineNumber: 173,
                                        columnNumber: 13
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/app/page.tsx",
                                lineNumber: 165,
                                columnNumber: 11
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                "data-fx-dish-grid": true,
                                className: "grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5",
                                children: signatureDishes.map((item)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$components$2f$DishCard$2e$tsx__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["default"], {
                                        item: item
                                    }, item.id, false, {
                                        fileName: "[project]/app/page.tsx",
                                        lineNumber: 179,
                                        columnNumber: 15
                                    }, this))
                            }, void 0, false, {
                                fileName: "[project]/app/page.tsx",
                                lineNumber: 177,
                                columnNumber: 11
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/app/page.tsx",
                        lineNumber: 164,
                        columnNumber: 9
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/app/page.tsx",
                lineNumber: 155,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])("section", {
                className: "border-y border-white/8 bg-[var(--color-charcoal)]",
                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    "data-fx-fade": true,
                    className: "max-w-6xl mx-auto px-5 py-10 grid grid-cols-3 gap-4 text-center",
                    children: [
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                    className: "text-3xl font-black text-[var(--color-ember-light)]",
                                    children: "۴.۸"
                                }, void 0, false, {
                                    fileName: "[project]/app/page.tsx",
                                    lineNumber: 189,
                                    columnNumber: 13
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                    className: "text-xs text-[var(--color-ash)] mt-1",
                                    children: "امتیاز مشتریان"
                                }, void 0, false, {
                                    fileName: "[project]/app/page.tsx",
                                    lineNumber: 190,
                                    columnNumber: 13
                                }, this)
                            ]
                        }, void 0, true, {
                            fileName: "[project]/app/page.tsx",
                            lineNumber: 188,
                            columnNumber: 11
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                    className: "text-3xl font-black text-[var(--color-ember-light)]",
                                    children: "+۵۰۰۰"
                                }, void 0, false, {
                                    fileName: "[project]/app/page.tsx",
                                    lineNumber: 193,
                                    columnNumber: 13
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                    className: "text-xs text-[var(--color-ash)] mt-1",
                                    children: "مشتری همیشگی"
                                }, void 0, false, {
                                    fileName: "[project]/app/page.tsx",
                                    lineNumber: 194,
                                    columnNumber: 13
                                }, this)
                            ]
                        }, void 0, true, {
                            fileName: "[project]/app/page.tsx",
                            lineNumber: 192,
                            columnNumber: 11
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                    className: "text-3xl font-black text-[var(--color-ember-light)]",
                                    children: menu.items.length.toLocaleString("fa-IR")
                                }, void 0, false, {
                                    fileName: "[project]/app/page.tsx",
                                    lineNumber: 197,
                                    columnNumber: 13
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                    className: "text-xs text-[var(--color-ash)] mt-1",
                                    children: "پرس در منو"
                                }, void 0, false, {
                                    fileName: "[project]/app/page.tsx",
                                    lineNumber: 200,
                                    columnNumber: 13
                                }, this)
                            ]
                        }, void 0, true, {
                            fileName: "[project]/app/page.tsx",
                            lineNumber: 196,
                            columnNumber: 11
                        }, this)
                    ]
                }, void 0, true, {
                    fileName: "[project]/app/page.tsx",
                    lineNumber: 187,
                    columnNumber: 9
                }, this)
            }, void 0, false, {
                fileName: "[project]/app/page.tsx",
                lineNumber: 186,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])("section", {
                className: "max-w-6xl mx-auto px-5 py-24",
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "flex items-end justify-between mb-8",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])("h2", {
                                className: "text-2xl font-extrabold",
                                children: "فضای گرگ"
                            }, void 0, false, {
                                fileName: "[project]/app/page.tsx",
                                lineNumber: 208,
                                columnNumber: 11
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$client$2f$app$2d$dir$2f$link$2e$react$2d$server$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["default"], {
                                href: "/gallery",
                                className: "text-sm font-bold text-[var(--color-ember-light)] hover:underline",
                                children: "گالری کامل ←"
                            }, void 0, false, {
                                fileName: "[project]/app/page.tsx",
                                lineNumber: 209,
                                columnNumber: 11
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/app/page.tsx",
                        lineNumber: 207,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "grid grid-cols-3 md:grid-cols-6 gap-3",
                        children: GALLERY_TEASER.map((photo, i)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$client$2f$app$2d$dir$2f$link$2e$react$2d$server$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["default"], {
                                "data-fx-tile": true,
                                href: "/gallery",
                                className: "gallery-tile relative aspect-[4/5] rounded-xl overflow-hidden gorg-card",
                                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$image$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["default"], {
                                    src: photo.src,
                                    alt: photo.alt,
                                    fill: true,
                                    sizes: "(max-width: 768px) 33vw, 190px",
                                    className: "object-cover"
                                }, void 0, false, {
                                    fileName: "[project]/app/page.tsx",
                                    lineNumber: 221,
                                    columnNumber: 15
                                }, this)
                            }, i, false, {
                                fileName: "[project]/app/page.tsx",
                                lineNumber: 215,
                                columnNumber: 13
                            }, this))
                    }, void 0, false, {
                        fileName: "[project]/app/page.tsx",
                        lineNumber: 213,
                        columnNumber: 9
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/app/page.tsx",
                lineNumber: 206,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])("section", {
                className: "brand-texture-soft py-24 text-center",
                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    className: "max-w-2xl mx-auto px-5",
                    children: [
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])("h2", {
                            className: "text-3xl sm:text-4xl font-black mb-4",
                            children: "گرسنه‌اید؟"
                        }, void 0, false, {
                            fileName: "[project]/app/page.tsx",
                            lineNumber: 236,
                            columnNumber: 11
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                            className: "text-[var(--color-ash)] mb-8",
                            children: "به غریزه‌تون گوش بدید. همین حالا سفارش بدید یا میز رزرو کنید."
                        }, void 0, false, {
                            fileName: "[project]/app/page.tsx",
                            lineNumber: 237,
                            columnNumber: 11
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            className: "flex flex-wrap justify-center gap-4",
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$components$2f$OrderButton$2e$tsx__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["default"], {
                                    className: "btn-primary ember-pulse",
                                    children: "سفارش آنلاین"
                                }, void 0, false, {
                                    fileName: "[project]/app/page.tsx",
                                    lineNumber: 241,
                                    columnNumber: 13
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$client$2f$app$2d$dir$2f$link$2e$react$2d$server$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["default"], {
                                    href: "/contact",
                                    className: "btn-outline",
                                    children: "اطلاعات تماس"
                                }, void 0, false, {
                                    fileName: "[project]/app/page.tsx",
                                    lineNumber: 242,
                                    columnNumber: 13
                                }, this)
                            ]
                        }, void 0, true, {
                            fileName: "[project]/app/page.tsx",
                            lineNumber: 240,
                            columnNumber: 11
                        }, this)
                    ]
                }, void 0, true, {
                    fileName: "[project]/app/page.tsx",
                    lineNumber: 235,
                    columnNumber: 9
                }, this)
            }, void 0, false, {
                fileName: "[project]/app/page.tsx",
                lineNumber: 234,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$components$2f$InstallAppSection$2e$tsx__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["default"], {}, void 0, false, {
                fileName: "[project]/app/page.tsx",
                lineNumber: 250,
                columnNumber: 7
            }, this)
        ]
    }, void 0, true);
}
}),
"[project]/app/page.tsx [app-rsc] (ecmascript, Next.js Server Component)", ((__turbopack_context__) => {

__turbopack_context__.n(__turbopack_context__.i("[project]/app/page.tsx [app-rsc] (ecmascript)"));
}),
];

//# sourceMappingURL=%5Broot-of-the-server%5D__1oynkl6._.js.map