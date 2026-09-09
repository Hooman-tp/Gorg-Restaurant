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
