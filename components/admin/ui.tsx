"use client";

import { createContext, ReactNode, useCallback, useContext, useEffect, useState } from "react";
import { fa, fmtDayShort, moneyShort, toNumber } from "@/lib/adminClient";

/* ───────── پیام‌های کوتاه (toast) ───────── */
type ToastKind = "ok" | "error" | "info";
interface ToastItem {
  id: number;
  text: string;
  kind: ToastKind;
}
const ToastCtx = createContext<(text: string, kind?: ToastKind) => void>(() => {});
export const useToast = () => useContext(ToastCtx);

/* ───────── فیلد رمز عبور با دکمه‌ی نمایش/مخفی ───────── */
export function PasswordField({
  value,
  onChange,
  placeholder,
  autoComplete,
  required,
}: {
  value: string;
  onChange: (v: string) => void;
  placeholder: string;
  autoComplete?: string;
  required?: boolean;
}) {
  const [visible, setVisible] = useState(false);
  return (
    <div className="relative">
      <input
        type={visible ? "text" : "password"}
        required={required}
        autoComplete={autoComplete}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        className="panel-input pl-10"
      />
      <button
        type="button"
        onClick={() => setVisible((v) => !v)}
        aria-label={visible ? "مخفی کردن رمز عبور" : "نمایش رمز عبور"}
        tabIndex={-1}
        className="absolute left-2.5 top-1/2 -translate-y-1/2 text-[var(--color-ash)] hover:text-[var(--color-bone)] p-1"
      >
        {visible ? (
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <path d="M2 2l20 20M9.9 9.9a3 3 0 0 0 4.2 4.2M6.5 6.7C4.2 8.2 2.5 10.3 1 12c1.7 2.4 5.5 7 11 7 1.8 0 3.4-.5 4.8-1.2M17.9 17.9C19.9 16.5 21.4 14.4 23 12c-2-3.9-6-7-11-7-1 0-2 .1-2.9.4" />
          </svg>
        ) : (
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <path d="M1 12s4-7 11-7 11 7 11 7-4 7-11 7-11-7-11-7Z" />
            <circle cx="12" cy="12" r="3" />
          </svg>
        )}
      </button>
    </div>
  );
}

export function ToastProvider({ children }: { children: ReactNode }) {
  const [items, setItems] = useState<ToastItem[]>([]);
  const push = useCallback((text: string, kind: ToastKind = "ok") => {
    const id = Date.now() + Math.random();
    setItems((cur) => [...cur.slice(-3), { id, text, kind }]);
    setTimeout(() => setItems((cur) => cur.filter((t) => t.id !== id)), 4200);
  }, []);
  return (
    <ToastCtx.Provider value={push}>
      {children}
      <div className="fixed bottom-5 inset-x-0 z-[300] flex flex-col items-center gap-2 px-4 pointer-events-none" aria-live="polite">
        {items.map((t) => (
          <div
            key={t.id}
            className={`pointer-events-auto max-w-md w-full sm:w-auto rounded-xl px-5 py-3 text-sm font-bold shadow-2xl border ${
              t.kind === "error"
                ? "bg-[#3a1210] border-red-400/40 text-red-200"
                : t.kind === "info"
                  ? "bg-[var(--color-charcoal-2)] border-white/15 text-[var(--color-bone)]"
                  : "bg-[#10281c] border-emerald-400/40 text-emerald-200"
            }`}
          >
            {t.text}
          </div>
        ))}
      </div>
    </ToastCtx.Provider>
  );
}

/* ───────── ساختارها ───────── */
export function PageTitle({ title, sub, actions }: { title: string; sub?: string; actions?: ReactNode }) {
  return (
    <div className="flex flex-wrap items-end justify-between gap-3 mb-6">
      <div>
        <h1 className="text-2xl sm:text-3xl font-black">{title}</h1>
        {sub && <p className="text-sm text-[var(--color-ash)] mt-1">{sub}</p>}
      </div>
      {actions && <div className="flex flex-wrap items-center gap-2">{actions}</div>}
    </div>
  );
}

export function Card({ title, action, children, className = "" }: { title?: string; action?: ReactNode; children: ReactNode; className?: string }) {
  return (
    <section className={`panel-card p-4 sm:p-5 ${className}`}>
      {(title || action) && (
        <div className="flex items-center justify-between gap-3 mb-4">
          {title && <h2 className="font-extrabold text-[15px]">{title}</h2>}
          {action}
        </div>
      )}
      {children}
    </section>
  );
}

export function Stat({ label, value, sub, tone = "default" }: { label: string; value: ReactNode; sub?: ReactNode; tone?: "default" | "good" | "warn" | "bad" }) {
  const color = tone === "good" ? "text-emerald-300" : tone === "warn" ? "text-amber-300" : tone === "bad" ? "text-red-300" : "text-[var(--color-bone)]";
  return (
    <div className="panel-card p-4">
      <p className="text-xs text-[var(--color-ash)]">{label}</p>
      <p className={`text-2xl font-black mt-2 leading-tight ${color}`}>{value}</p>
      {sub && <p className="text-xs text-[var(--color-ash)] mt-1.5">{sub}</p>}
    </div>
  );
}

export function Loading({ text = "در حال بارگذاری…" }: { text?: string }) {
  return <p className="text-sm text-[var(--color-ash)] py-10 text-center">{text}</p>;
}

export function ErrorBox({ message, onRetry }: { message: string; onRetry?: () => void }) {
  return (
    <div className="panel-card p-5 text-center">
      <p className="text-sm text-[var(--color-ember-light)] leading-7">{message}</p>
      {onRetry && (
        <button onClick={onRetry} className="btn-outline btn-sm mt-3">
          تلاش دوباره
        </button>
      )}
    </div>
  );
}

export function Empty({ text }: { text: string }) {
  return <p className="text-sm text-[var(--color-ash)] py-8 text-center">{text}</p>;
}

/** برچسب کوچک رنگی */
export function Badge({ children, className = "" }: { children: ReactNode; className?: string }) {
  return <span className={`inline-flex items-center gap-1 rounded-full border px-2.5 py-0.5 text-[11px] font-bold whitespace-nowrap ${className}`}>{children}</span>;
}

/** انتخابِ یک گزینه از چند گزینه (چیپ‌ها) */
export function Chips<T extends string>({
  value,
  onChange,
  options,
  className = "",
}: {
  value: T;
  onChange: (v: T) => void;
  options: { value: T; label: ReactNode }[];
  className?: string;
}) {
  return (
    <div className={`flex flex-wrap gap-2 ${className}`}>
      {options.map((o) => (
        <button
          key={o.value}
          type="button"
          onClick={() => onChange(o.value)}
          className={`px-3.5 py-1.5 rounded-full text-[13px] font-bold border transition-colors ${
            value === o.value ? "bg-[var(--color-ember)] border-[var(--color-ember)] text-white" : "border-white/12 text-[var(--color-ash)] hover:border-white/30"
          }`}
        >
          {o.label}
        </button>
      ))}
    </div>
  );
}

export function Toggle({ checked, onChange, label, disabled }: { checked: boolean; onChange: (v: boolean) => void; label?: string; disabled?: boolean }) {
  return (
    <button
      type="button"
      role="switch"
      aria-checked={checked}
      aria-label={label}
      disabled={disabled}
      onClick={() => onChange(!checked)}
      className={`relative w-11 h-6 rounded-full transition-colors shrink-0 disabled:opacity-50 ${checked ? "bg-emerald-500" : "bg-white/15"}`}
    >
      <span className={`absolute top-0.5 w-5 h-5 rounded-full bg-white transition-all ${checked ? "right-0.5" : "right-[22px]"}`} />
    </button>
  );
}

export function Field({ label, hint, children, className = "" }: { label: string; hint?: string; children: ReactNode; className?: string }) {
  return (
    <label className={`block ${className}`}>
      <span className="block text-xs font-bold text-[var(--color-ash)] mb-1.5">{label}</span>
      {children}
      {hint && <span className="block text-[11px] text-[var(--color-ash)]/80 mt-1">{hint}</span>}
    </label>
  );
}

/** فیلد مبلغ/عدد: فارسی هم تایپ شود قبول است؛ مبلغ‌ها با جداکننده‌ی هزارگان نمایش داده می‌شوند */
export function NumInput({
  value,
  onChange,
  placeholder,
  decimals = false,
  className = "",
  id,
}: {
  value: number;
  onChange: (n: number) => void;
  placeholder?: string;
  decimals?: boolean;
  className?: string;
  id?: string;
}) {
  const [text, setText] = useState(value ? String(value) : "");
  // وقتی مقدار از بیرون عوض شد (مثلاً بعد از ذخیره/ریست)، متن هم همگام شود
  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setText((cur) => (toNumber(cur) === value ? cur : value ? String(value) : ""));
  }, [value]);
  const shown = decimals ? text : text ? Number(text).toLocaleString("en-US") : "";
  return (
    <input
      id={id}
      dir="ltr"
      inputMode={decimals ? "decimal" : "numeric"}
      className={`panel-input text-left ${className}`}
      placeholder={placeholder}
      value={shown}
      onChange={(e) => {
        const en = e.target.value
          .replace(/[۰-۹]/g, (d) => String("۰۱۲۳۴۵۶۷۸۹".indexOf(d)))
          .replace(/[٠-٩]/g, (d) => String("٠١٢٣٤٥٦٧٨٩".indexOf(d)))
          .replace(/٫/g, ".");
        let cleaned = decimals ? en.replace(/[^0-9.]/g, "").replace(/(\..*)\./g, "$1") : en.replace(/[^0-9]/g, "");
        if (!decimals) cleaned = cleaned.replace(/^0+(?=\d)/, "");
        setText(cleaned);
        onChange(cleaned === "" || cleaned === "." ? 0 : Number(cleaned));
      }}
    />
  );
}

/** پنجره‌ی مودال (روی موبایل از پایین باز می‌شود) */
export function Modal({
  open,
  onClose,
  title,
  children,
  wide = false,
}: {
  open: boolean;
  onClose: () => void;
  title: string;
  children: ReactNode;
  wide?: boolean;
}) {
  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && onClose();
    window.addEventListener("keydown", onKey);
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      window.removeEventListener("keydown", onKey);
      document.body.style.overflow = prev;
    };
  }, [open, onClose]);
  if (!open) return null;
  return (
    <div className="fixed inset-0 z-[200] flex items-end sm:items-center justify-center" role="dialog" aria-modal="true" aria-label={title}>
      <button aria-label="بستن" className="absolute inset-0 bg-black/70" onClick={onClose} tabIndex={-1} />
      <div
        className={`relative w-full ${wide ? "sm:max-w-2xl" : "sm:max-w-lg"} max-h-[92vh] overflow-y-auto rounded-t-3xl sm:rounded-2xl bg-[var(--color-charcoal)] border border-white/10 shadow-2xl`}
      >
        <div className="sticky top-0 z-10 flex items-center justify-between gap-3 px-5 py-4 bg-[var(--color-charcoal)] border-b border-white/8">
          <h2 className="font-extrabold">{title}</h2>
          <button onClick={onClose} aria-label="بستن" className="w-8 h-8 rounded-full bg-white/8 hover:bg-white/15 text-sm">
            ✕
          </button>
        </div>
        <div className="p-5">{children}</div>
      </div>
    </div>
  );
}

/* ───────── نمودارها (بدون کتابخانه) ───────── */

/** نمودار ستونی. هر ستون: برچسب + مقدار (+ زیرنویس اختیاری) */
export function BarChart({
  data,
  height = 150,
  format = moneyShort,
  highlightLast = false,
}: {
  data: { label: string; value: number; sub?: string }[];
  height?: number;
  format?: (n: number) => string;
  highlightLast?: boolean;
}) {
  const max = Math.max(1, ...data.map((d) => d.value));
  return (
    <div className="flex items-end gap-1.5 sm:gap-2" style={{ height: height + 44 }} dir="rtl">
      {data.map((d, i) => {
        const h = Math.max(d.value > 0 ? 4 : 1, Math.round((d.value / max) * height));
        const last = highlightLast && i === data.length - 1;
        return (
          <div key={`${d.label}-${i}`} className="flex-1 min-w-0 flex flex-col items-center justify-end gap-1" title={`${d.label}: ${format(d.value)}`}>
            <span className="text-[10px] text-[var(--color-ash)] leading-none whitespace-nowrap overflow-hidden text-ellipsis max-w-full">{d.value ? format(d.value) : ""}</span>
            <div
              className={`w-full rounded-t-md ${last ? "bg-[var(--color-ember)]" : "bg-[var(--color-blood)]"}`}
              style={{ height: h, opacity: d.value ? 1 : 0.25 }}
            />
            <span className="text-[10px] text-[var(--color-ash)] leading-none">{d.label}</span>
          </div>
        );
      })}
    </div>
  );
}

export function dailyBars(daily: { date: string; revenue: number; orders: number }[], key: "revenue" | "orders" = "revenue") {
  return daily.map((d) => ({ label: fmtDayShort(d.date), value: d[key] }));
}

/** نوارهای افقیِ سهم: مجموع = ۱۰۰٪ */
export function ShareBars({ rows }: { rows: { label: string; value: number; sub?: string; color?: string }[] }) {
  const total = rows.reduce((s, r) => s + r.value, 0);
  return (
    <div className="space-y-3">
      {rows.map((r) => {
        const pct = total ? Math.round((r.value / total) * 100) : 0;
        return (
          <div key={r.label}>
            <div className="flex items-center justify-between text-sm mb-1.5">
              <span className="font-bold">{r.label}</span>
              <span className="text-[var(--color-ash)] text-xs">
                {r.sub ? `${r.sub} · ` : ""}
                {fa(pct)}٪
              </span>
            </div>
            <div className="h-2.5 rounded-full bg-white/8 overflow-hidden">
              <div className="h-full rounded-full" style={{ width: `${pct}%`, background: r.color ?? "var(--color-ember)" }} />
            </div>
          </div>
        );
      })}
    </div>
  );
}

/** حلقه‌ی درصدی (donut) با conic-gradient */
export function Donut({ parts, center }: { parts: { value: number; color: string; label: string }[]; center?: ReactNode }) {
  const total = parts.reduce((s, p) => s + p.value, 0);
  let acc = 0;
  const stops = total
    ? parts
        .map((p) => {
          const from = (acc / total) * 100;
          acc += p.value;
          return `${p.color} ${from}% ${(acc / total) * 100}%`;
        })
        .join(", ")
    : "rgba(255,255,255,0.1) 0% 100%";
  return (
    <div className="relative w-32 h-32 shrink-0">
      <div className="absolute inset-0 rounded-full" style={{ background: `conic-gradient(${stops})` }} />
      <div className="absolute inset-[14px] rounded-full bg-[var(--color-charcoal)] flex items-center justify-center text-center">{center}</div>
    </div>
  );
}

export const SOURCE_COLORS = { website: "#dd4a34", qr: "#e9a23b", pos: "#4aa3df" } as const;
