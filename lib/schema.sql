-- اسکیمای دیتابیس گرگ. یک‌بار این فایل را در Neon/Vercel Postgres اجرا کنید
-- (از داشبورد Vercel: Storage -> پروژه‌ی دیتابیس -> Query یا از طریق
-- افزونه‌ی psql/Neon SQL Editor).

CREATE TABLE IF NOT EXISTS orders (
  id SERIAL PRIMARY KEY,
  order_code VARCHAR(20) UNIQUE NOT NULL,
  name VARCHAR(120) NOT NULL,
  phone VARCHAR(20) NOT NULL,
  address TEXT,
  order_type VARCHAR(20) NOT NULL, -- 'delivery' | 'pickup'
  notes TEXT,
  lines JSONB NOT NULL,
  total INTEGER NOT NULL,
  status VARCHAR(20) NOT NULL DEFAULT 'received', -- received | preparing | ready | delivered | cancelled
  ref_id VARCHAR(40), -- شماره پیگیری بانکی، فقط برای سفارش‌های پرداخت‌شده
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

CREATE INDEX IF NOT EXISTS idx_orders_order_code ON orders(order_code);
CREATE INDEX IF NOT EXISTS idx_orders_phone ON orders(phone);
CREATE INDEX IF NOT EXISTS idx_orders_created_at ON orders(created_at DESC);

-- ═══════════════ ورود مشتری با شماره موبایل و پیامک ═══════════════
-- (اگر قبلاً این فایل را اجرا کرده‌اید، دوباره اجرایش کنید؛ فقط جدول‌های جدید ساخته می‌شود)

CREATE TABLE IF NOT EXISTS users (
  id SERIAL PRIMARY KEY,
  phone VARCHAR(11) UNIQUE NOT NULL, -- ۰۹xxxxxxxxx
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  last_login_at TIMESTAMPTZ
);

-- برای هر شماره حداکثر یک کدِ فعال؛ فقط «هش» کد ذخیره می‌شود
CREATE TABLE IF NOT EXISTS otp_codes (
  phone VARCHAR(11) PRIMARY KEY,
  code_hash VARCHAR(64) NOT NULL,
  expires_at TIMESTAMPTZ NOT NULL,
  attempts INTEGER NOT NULL DEFAULT 0,
  sent_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  send_count INTEGER NOT NULL DEFAULT 1,
  window_start TIMESTAMPTZ NOT NULL DEFAULT now()
);

-- برای محدود کردن تعداد درخواست از هر IP (جلوگیری از خالی شدن اعتبار پیامک)
CREATE TABLE IF NOT EXISTS otp_requests (
  id BIGSERIAL PRIMARY KEY,
  ip VARCHAR(64) NOT NULL,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now()
);
CREATE INDEX IF NOT EXISTS idx_otp_requests_ip ON otp_requests(ip, created_at DESC);
