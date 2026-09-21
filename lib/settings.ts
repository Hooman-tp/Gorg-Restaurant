import { dbQuery, isDbConfigured } from "./db";

/**
 * تنظیمات کسب‌وکار که از پنل مدیریت عوض می‌شود و سایت هم همان را رعایت می‌کند.
 * مقدارها در جدول site_settings ذخیره می‌شوند؛ اگر دیتابیس وصل نباشد، پیش‌فرض‌ها.
 */
export interface Settings {
  businessName: string;
  /** false = سفارش آنلاین موقتاً بسته است (سایت و QR) */
  ordersOpen: boolean;
  closedMessage: string;
  /** حداقل مبلغ سفارش آنلاین (تومان)؛ ۰ = بدون حداقل */
  minOrder: number;
  /** هزینه‌ی ارسال با پیک (تومان) */
  deliveryFee: number;
  /** ارسال پیامک «سفارش شما آماده است» به مشتریِ سایت */
  smsOnReady: boolean;
}

export const DEFAULT_SETTINGS: Settings = {
  businessName: "رستوران گرگ",
  ordersOpen: true,
  closedMessage: "سفارش آنلاین فعلاً بسته است. لطفاً بعداً سر بزنید.",
  minOrder: 0,
  deliveryFee: 0,
  smsOnReady: false,
};

const KEYS: Record<keyof Settings, string> = {
  businessName: "business_name",
  ordersOpen: "orders_open",
  closedMessage: "closed_message",
  minOrder: "min_order",
  deliveryFee: "delivery_fee",
  smsOnReady: "sms_on_ready",
};

let cache: { at: number; value: Settings } | null = null;
const TTL_MS = 8000;

function parse(map: Record<string, string>): Settings {
  const d = DEFAULT_SETTINGS;
  const num = (k: string, def: number) => {
    const n = Number(map[k]);
    return map[k] !== undefined && Number.isFinite(n) && n >= 0 ? Math.round(n) : def;
  };
  const bool = (k: string, def: boolean) => (map[k] === undefined ? def : map[k] === "1");
  return {
    businessName: map[KEYS.businessName]?.trim() || d.businessName,
    ordersOpen: bool(KEYS.ordersOpen, d.ordersOpen),
    closedMessage: map[KEYS.closedMessage]?.trim() || d.closedMessage,
    minOrder: num(KEYS.minOrder, d.minOrder),
    deliveryFee: num(KEYS.deliveryFee, d.deliveryFee),
    smsOnReady: bool(KEYS.smsOnReady, d.smsOnReady),
  };
}

export async function getSettings(opts: { fresh?: boolean } = {}): Promise<Settings> {
  if (!isDbConfigured()) return DEFAULT_SETTINGS;
  if (!opts.fresh && cache && Date.now() - cache.at < TTL_MS) return cache.value;
  try {
    const rows = await dbQuery("SELECT key, value FROM site_settings");
    const map: Record<string, string> = {};
    for (const r of rows) map[String(r.key)] = String(r.value);
    const value = parse(map);
    cache = { at: Date.now(), value };
    return value;
  } catch (err) {
    console.error("getSettings error", err);
    return cache?.value ?? DEFAULT_SETTINGS;
  }
}

export async function saveSettings(patch: Partial<Settings>): Promise<Settings> {
  const entries: [string, string][] = [];
  if (patch.businessName !== undefined) entries.push([KEYS.businessName, String(patch.businessName).trim().slice(0, 80)]);
  if (patch.ordersOpen !== undefined) entries.push([KEYS.ordersOpen, patch.ordersOpen ? "1" : "0"]);
  if (patch.closedMessage !== undefined) entries.push([KEYS.closedMessage, String(patch.closedMessage).trim().slice(0, 200)]);
  if (patch.minOrder !== undefined) entries.push([KEYS.minOrder, String(Math.max(0, Math.round(Number(patch.minOrder) || 0)))]);
  if (patch.deliveryFee !== undefined) entries.push([KEYS.deliveryFee, String(Math.max(0, Math.round(Number(patch.deliveryFee) || 0)))]);
  if (patch.smsOnReady !== undefined) entries.push([KEYS.smsOnReady, patch.smsOnReady ? "1" : "0"]);
  for (const [k, v] of entries) {
    await dbQuery(
      "INSERT INTO site_settings (key, value) VALUES ($1, $2) ON CONFLICT (key) DO UPDATE SET value = EXCLUDED.value, updated_at = now()",
      [k, v]
    );
  }
  cache = null;
  return getSettings({ fresh: true });
}

/** فقط چیزهایی که مشتری روی سایت باید ببیند */
export function publicSettings(s: Settings) {
  return {
    businessName: s.businessName,
    ordersOpen: s.ordersOpen,
    closedMessage: s.closedMessage,
    minOrder: s.minOrder,
    deliveryFee: s.deliveryFee,
  };
}
