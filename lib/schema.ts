/**
 * اسکیمای دیتابیس گرگ (سایت + پنل مدیریت). همه‌ی دستورها idempotent هستند.
 * وقتی چیزی به این لیست اضافه کردید، SCHEMA_VERSION را عوض کنید.
 */
export const SCHEMA_VERSION = "2026-09-panel-2";

export const DDL: string[] = [
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
  `CREATE INDEX IF NOT EXISTS idx_admin_resets_username ON admin_password_resets(username)`,
];
