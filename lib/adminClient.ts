/** کمک‌های سمتِ مرورگرِ پنل مدیریت (فقط داخل کامپوننت‌های کلاینت استفاده شود) */
import type { StoredOrder } from "./orderMeta";

export class ApiError extends Error {
  status: number;
  constructor(message: string, status: number) {
    super(message);
    this.status = status;
  }
}

/** درخواست به API پنل؛ خطا را با پیام فارسی throw می‌کند و اگر نشستِ ادمین تمام شده باشد صفحه‌ی ورود می‌آید */
export async function api<T = Record<string, unknown>>(url: string, init?: { method?: string; body?: unknown }): Promise<T> {
  const res = await fetch(url, {
    method: init?.method ?? (init?.body !== undefined ? "POST" : "GET"),
    headers: init?.body !== undefined ? { "Content-Type": "application/json" } : undefined,
    body: init?.body !== undefined ? JSON.stringify(init.body) : undefined,
    cache: "no-store",
  });
  const data = await res.json().catch(() => ({}));
  if (res.status === 401 && typeof window !== "undefined") window.dispatchEvent(new Event("admin-unauth"));
  if (!res.ok) throw new ApiError((data as { error?: string }).error || "خطا در ارتباط با سرور", res.status);
  return data as T;
}

/** قیمت بعد از تخفیف (همان فرمولِ سرور) */
export function effPrice(price: number, discount: number): number {
  const d = Math.min(90, Math.max(0, Math.round(discount || 0)));
  return d ? Math.round((price * (100 - d)) / 100) : price;
}

/** YYYY-MM-DD امروز به وقت ایران و جابه‌جایی روز (برای بازه‌های گزارش) */
export function todayKey(): string {
  return new Intl.DateTimeFormat("en-CA", { timeZone: "Asia/Tehran", year: "numeric", month: "2-digit", day: "2-digit" }).format(new Date());
}
export function addDaysKey(day: string, n: number): string {
  const t = new Date(`${day}T12:00:00+03:30`).getTime() + n * 86400000;
  return new Intl.DateTimeFormat("en-CA", { timeZone: "Asia/Tehran", year: "numeric", month: "2-digit", day: "2-digit" }).format(new Date(t));
}

/* ───────── قالب‌بندی ───────── */
export const fa = (n: number | string) => Number(n || 0).toLocaleString("fa-IR", { maximumFractionDigits: 2 });
export const money = (n: number) => `${fa(Math.round(n))} تومان`;

/** ۱٬۲۰۰٬۰۰۰ → «۱٫۲ میلیون» برای کارت‌های کوچک */
export function moneyShort(n: number): string {
  const a = Math.abs(n);
  if (a >= 1_000_000_000) return `${fa(Math.round((n / 1_000_000_000) * 10) / 10)} میلیارد`;
  if (a >= 1_000_000) return `${fa(Math.round((n / 1_000_000) * 10) / 10)} میلیون`;
  return fa(Math.round(n));
}

const TZ = "Asia/Tehran";
const dateFmt = new Intl.DateTimeFormat("fa-IR-u-ca-persian", { timeZone: TZ, year: "numeric", month: "2-digit", day: "2-digit" });
const timeFmt = new Intl.DateTimeFormat("fa-IR", { timeZone: TZ, hour: "2-digit", minute: "2-digit" });
const longFmt = new Intl.DateTimeFormat("fa-IR-u-ca-persian", { timeZone: TZ, weekday: "long", year: "numeric", month: "long", day: "numeric" });
const shortDay = new Intl.DateTimeFormat("fa-IR-u-ca-persian", { timeZone: TZ, month: "2-digit", day: "2-digit" });

export const fmtDate = (iso: string | Date) => dateFmt.format(new Date(iso));
export const fmtTime = (iso: string | Date) => timeFmt.format(new Date(iso));
export const fmtDateTime = (iso: string | Date) => `${fmtDate(iso)} ${fmtTime(iso)}`;
export const fmtLongDay = (iso: string | Date) => longFmt.format(new Date(iso));
/** YYYY-MM-DD (میلادی) → «۰۶/۲۱» شمسی برای محور نمودار */
export const fmtDayShort = (day: string) => shortDay.format(new Date(`${day}T12:00:00+03:30`));

export function timeAgo(iso: string): string {
  const mins = Math.max(0, Math.round((Date.now() - new Date(iso).getTime()) / 60000));
  if (mins < 1) return "همین الان";
  if (mins < 60) return `${fa(mins)} دقیقه پیش`;
  const h = Math.floor(mins / 60);
  if (h < 24) return `${fa(h)} ساعت پیش`;
  return fmtDate(iso);
}

/** تبدیل رقم‌های فارسی/عربی به انگلیسی و حذف جداکننده‌ها → عدد (برای فیلدهای مبلغ) */
export function toNumber(input: string): number {
  const en = input
    .replace(/[۰-۹]/g, (d) => String("۰۱۲۳۴۵۶۷۸۹".indexOf(d)))
    .replace(/[٠-٩]/g, (d) => String("٠١٢٣٤٥٦٧٨٩".indexOf(d)))
    .replace(/[٬,،\s]/g, "")
    .replace(/٫/g, ".");
  const n = Number(en);
  return Number.isFinite(n) ? n : 0;
}

export const STATUS_TONE: Record<string, string> = {
  received: "bg-amber-500/15 text-amber-300 border-amber-400/30",
  preparing: "bg-sky-500/15 text-sky-300 border-sky-400/30",
  ready: "bg-emerald-500/15 text-emerald-300 border-emerald-400/30",
  delivered: "bg-white/8 text-[var(--color-ash)] border-white/15",
  cancelled: "bg-red-500/15 text-red-300 border-red-400/30",
};

export const NEXT_STATUS: Record<string, { to: string; label: string } | undefined> = {
  received: { to: "preparing", label: "شروع آماده‌سازی" },
  preparing: { to: "ready", label: "آماده شد" },
  ready: { to: "delivered", label: "تحویل شد" },
};

/* ───────── صدا (زنگ سفارش جدید) ───────── */
let audioCtx: AudioContext | null = null;

/** مرورگر فقط بعد از یک لمس/کلیکِ کاربر اجازه‌ی پخش صدا می‌دهد؛ اولین کلیک صفحه این را آماده می‌کند */
export function unlockAudio() {
  try {
    if (!audioCtx) {
      const Ctx = window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
      audioCtx = new Ctx();
    }
    if (audioCtx.state === "suspended") void audioCtx.resume();
  } catch {
    /* بدون صدا */
  }
}

export function beep() {
  try {
    if (!audioCtx) return;
    const now = audioCtx.currentTime;
    [880, 1175, 1568].forEach((freq, i) => {
      const osc = audioCtx!.createOscillator();
      const gain = audioCtx!.createGain();
      osc.type = "sine";
      osc.frequency.value = freq;
      gain.gain.setValueAtTime(0.0001, now + i * 0.16);
      gain.gain.exponentialRampToValueAtTime(0.25, now + i * 0.16 + 0.02);
      gain.gain.exponentialRampToValueAtTime(0.0001, now + i * 0.16 + 0.15);
      osc.connect(gain).connect(audioCtx!.destination);
      osc.start(now + i * 0.16);
      osc.stop(now + i * 0.16 + 0.16);
    });
  } catch {
    /* بدون صدا */
  }
}

/* ───────── چاپ فیش ───────── */
const esc = (t: string) => t.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;");

export function printOrder(o: Pick<StoredOrder, "order_code" | "name" | "phone" | "address" | "order_type" | "notes" | "lines" | "total" | "created_at"> & {
  table_no?: string | null;
  discount?: number;
  delivery_fee?: number;
  payment_method?: string;
  source?: string;
}, businessName = "رستوران گرگ") {
  const w = window.open("", "_blank", "width=380,height=640");
  if (!w) {
    alert("مرورگر پنجره‌ی چاپ را مسدود کرد؛ اجازه‌ی پاپ‌آپ بدهید.");
    return;
  }
  const typeLabel = o.order_type === "delivery" ? "ارسال با پیک" : o.order_type === "dine_in" ? `سالن${o.table_no ? ` — میز ${o.table_no}` : ""}` : "بیرون‌بر / تحویل حضوری";
  const payLabel = ({ online: "پرداخت آنلاین", cash: "نقد", card: "کارت‌خوان", other: "سایر" } as Record<string, string>)[o.payment_method ?? "online"];
  const rows = o.lines
    .map((l) => `<tr><td>${fa(l.qty)}×</td><td>${esc(l.name)}</td><td class="n">${fa(l.price * l.qty)}</td></tr>`)
    .join("");
  w.document.write(`<!doctype html><html dir="rtl" lang="fa"><head><meta charset="utf-8"><title>${esc(o.order_code)}</title>
<style>
  @page { size: 80mm auto; margin: 4mm; }
  body { font-family: Tahoma, sans-serif; font-size: 13px; color: #000; margin: 0; }
  h1 { font-size: 16px; text-align: center; margin: 0 0 4px; }
  .c { text-align: center; } .code { font-size: 20px; font-weight: bold; letter-spacing: 1px; }
  hr { border: 0; border-top: 1px dashed #000; margin: 8px 0; }
  table { width: 100%; border-collapse: collapse; } td { padding: 3px 0; vertical-align: top; } .n { text-align: left; white-space: nowrap; }
  .tot { font-size: 16px; font-weight: bold; }
</style></head><body>
<h1>${esc(businessName)}</h1>
<div class="c">${esc(fmtDateTime(o.created_at))}</div>
<div class="c code">${esc(o.order_code)}</div>
<hr>
<div><b>${esc(typeLabel)}</b></div>
${o.name ? `<div>${esc(o.name)}${o.phone ? ` — ${esc(o.phone)}` : ""}</div>` : ""}
${o.address ? `<div>${esc(o.address)}</div>` : ""}
<hr>
<table>${rows}</table>
<hr>
${o.discount ? `<div>تخفیف: ${fa(o.discount)}</div>` : ""}
${o.delivery_fee ? `<div>هزینه ارسال: ${fa(o.delivery_fee)}</div>` : ""}
<div class="tot">جمع: ${fa(o.total)} تومان</div>
<div>${esc(payLabel ?? "")}</div>
${o.notes ? `<hr><div>توضیحات: ${esc(o.notes)}</div>` : ""}
<script>window.onload=function(){window.print();}</script>
</body></html>`);
  w.document.close();
}

/* ───────── آپلود عکس ───────── */

/** عکس را در مرورگر کوچک و فشرده می‌کند (حداکثر ۹۰۰ پیکسل، JPEG) تا سبک ذخیره و سریع نمایش داده شود */
export async function compressImage(file: File, maxSide = 900, quality = 0.82): Promise<{ mime: string; data: string; width: number; height: number }> {
  const bitmap = await new Promise<HTMLImageElement>((resolve, reject) => {
    const img = new Image();
    const url = URL.createObjectURL(file);
    img.onload = () => {
      URL.revokeObjectURL(url);
      resolve(img);
    };
    img.onerror = () => {
      URL.revokeObjectURL(url);
      reject(new Error("فایل انتخاب‌شده عکس نیست"));
    };
    img.src = url;
  });
  const scale = Math.min(1, maxSide / Math.max(bitmap.width, bitmap.height));
  const w = Math.max(1, Math.round(bitmap.width * scale));
  const h = Math.max(1, Math.round(bitmap.height * scale));
  const canvas = document.createElement("canvas");
  canvas.width = w;
  canvas.height = h;
  const ctx = canvas.getContext("2d");
  if (!ctx) throw new Error("مرورگر از پردازش عکس پشتیبانی نمی‌کند");
  ctx.fillStyle = "#000";
  ctx.fillRect(0, 0, w, h);
  ctx.drawImage(bitmap, 0, 0, w, h);
  const dataUrl = canvas.toDataURL("image/jpeg", quality);
  return { mime: "image/jpeg", data: dataUrl.replace(/^data:[^,]+,/, ""), width: w, height: h };
}
