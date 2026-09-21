/**
 * تاریخ و ساعت به وقت ایران (Asia/Tehran، ‎+۰۳:۳۰ ثابت). سرور روی UTC است، پس
 * «امروز» و «ساعتِ سفارش» را باید صریحاً به وقت ایران حساب کرد.
 */
const TZ = "Asia/Tehran";
const OFFSET = "+03:30";

const dayFmt = new Intl.DateTimeFormat("en-CA", { timeZone: TZ, year: "numeric", month: "2-digit", day: "2-digit" });
const hourFmt = new Intl.DateTimeFormat("en-GB", { timeZone: TZ, hour: "2-digit", hour12: false });

/** YYYY-MM-DD به وقت ایران */
export function dayKey(d: Date | string | number): string {
  return dayFmt.format(new Date(d));
}

/** ساعتِ ۰ تا ۲۳ به وقت ایران */
export function hourOf(d: Date | string | number): number {
  const h = parseInt(hourFmt.format(new Date(d)), 10);
  return h === 24 ? 0 : h;
}

export function todayKey(): string {
  return dayKey(new Date());
}

export function isDayKey(s: unknown): s is string {
  return typeof s === "string" && /^\d{4}-\d{2}-\d{2}$/.test(s) && !Number.isNaN(Date.parse(s));
}

/** شروعِ روز (۰۰:۰۰ به وقت ایران) به‌صورت ISO */
export function dayStartISO(day: string): string {
  return new Date(`${day}T00:00:00${OFFSET}`).toISOString();
}

/** پایانِ روز = شروعِ روزِ بعد (بازه‌ی نیمه‌باز) */
export function dayEndISO(day: string): string {
  return new Date(new Date(`${day}T00:00:00${OFFSET}`).getTime() + 24 * 3600 * 1000).toISOString();
}

/** n روز قبل از یک YYYY-MM-DD */
export function addDays(day: string, n: number): string {
  const t = new Date(`${day}T12:00:00${OFFSET}`).getTime() + n * 24 * 3600 * 1000;
  return dayKey(new Date(t));
}

/** لیست روزهای بین دو تاریخ (شامل هر دو) */
export function daysBetween(from: string, to: string): string[] {
  const out: string[] = [];
  let cur = from;
  for (let i = 0; i < 400 && cur <= to; i++) {
    out.push(cur);
    cur = addDays(cur, 1);
  }
  return out;
}

/** اولین روزِ ماهِ جاری (میلادی) */
export function monthStartKey(): string {
  return `${todayKey().slice(0, 8)}01`;
}
