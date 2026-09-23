"use client";

import { createContext, ReactNode, useCallback, useContext, useEffect, useRef, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { api, beep, fa, unlockAudio } from "@/lib/adminClient";
import { ToastProvider, useToast, PasswordField } from "./ui";
import DesignerCredit from "@/components/DesignerCredit";

interface Pulse {
  latestId: number;
  received: number;
  preparing: number;
  ready: number;
}

interface AdminCtxValue {
  pulse: Pulse;
  businessName: string;
  soundOn: boolean;
  username: string;
}
const AdminCtx = createContext<AdminCtxValue>({ pulse: { latestId: 0, received: 0, preparing: 0, ready: 0 }, businessName: "رستوران گرگ", soundOn: true, username: "" });
export const useAdmin = () => useContext(AdminCtx);

const TABS: { href: string; label: string; icon: string }[] = [
  { href: "/admin", label: "داشبورد", icon: "▦" },
  { href: "/admin/orders", label: "سفارش‌ها", icon: "🧾" },
  { href: "/admin/pos", label: "ثبت حضوری", icon: "🛎️" },
  { href: "/admin/cash", label: "صندوق", icon: "💵" },
  { href: "/admin/menu", label: "منو", icon: "🍔" },
  { href: "/admin/gallery", label: "گالری", icon: "🖼️" },
  { href: "/admin/inventory", label: "انبار", icon: "📦" },
  { href: "/admin/reports", label: "گزارش‌ها", icon: "📈" },
  { href: "/admin/customers", label: "مشتریان", icon: "👥" },
  { href: "/admin/tables", label: "میز و QR", icon: "🔳" },
  { href: "/admin/settings", label: "تنظیمات", icon: "⚙️" },
];

function ForgotPassword({ onBack }: { onBack: () => void }) {
  const [email, setEmail] = useState("");
  const [sent, setSent] = useState(false);
  const [error, setError] = useState("");
  const [busy, setBusy] = useState(false);

  async function submit(e: React.FormEvent) {
    e.preventDefault();
    setBusy(true);
    setError("");
    try {
      await api("/api/admin/forgot-password", { body: { email } });
      setSent(true);
    } catch (err) {
      setError(err instanceof Error ? err.message : "ارسال ناموفق بود");
    } finally {
      setBusy(false);
    }
  }

  if (sent) {
    return (
      <div className="panel-card p-6 space-y-4 text-center">
        <p className="text-sm leading-7">
          اگر این ایمیل به‌عنوان ایمیلِ بازیابیِ یک حساب ثبت شده باشد، یک لینک برایش ارسال شد. صندوق ورودی (و پوشه‌ی اسپم) را چک کنید.
        </p>
        <button onClick={onBack} className="btn-outline btn-sm">
          بازگشت به ورود
        </button>
      </div>
    );
  }

  return (
    <form onSubmit={submit} className="panel-card p-6 space-y-4">
      <p className="text-sm text-[var(--color-ash)] leading-7">
        ایمیلِ بازیابی که قبلاً در «تنظیمات ← حساب کاربری» ثبت کرده‌اید را وارد کنید تا لینکِ تعیین رمز جدید برایتان ارسال شود.
      </p>
      <input
        type="email"
        required
        autoFocus
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        placeholder="ایمیل بازیابی"
        dir="ltr"
        className="panel-input text-left"
      />
      {error && <p className="text-sm text-[var(--color-ember-light)]">{error}</p>}
      <button type="submit" disabled={busy} className="btn-primary w-full disabled:opacity-60">
        {busy ? "در حال ارسال…" : "ارسال لینک بازیابی"}
      </button>
      <button type="button" onClick={onBack} className="text-xs text-[var(--color-ash)] w-full text-center hover:text-[var(--color-bone)]">
        بازگشت به ورود
      </button>
    </form>
  );
}

function LoginForm({ onDone }: { onDone: () => void }) {
  const [mode, setMode] = useState<"login" | "forgot">("login");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [busy, setBusy] = useState(false);

  async function submit(e: React.FormEvent) {
    e.preventDefault();
    setBusy(true);
    setError("");
    try {
      await api("/api/admin/login", { body: { username, password } });
      setPassword("");
      onDone();
    } catch (err) {
      setError(err instanceof Error ? err.message : "ورود ناموفق بود");
    } finally {
      setBusy(false);
    }
  }

  return (
    <div className="min-h-screen brand-texture-soft flex items-center justify-center px-5">
      <div className="w-full max-w-sm">
        <div className="flex flex-col items-center mb-6">
          <Image src="/images/gorg-mark.png" alt="گرگ" width={64} height={64} className="rounded-full mb-3" priority />
          <h1 className="text-2xl font-black">ورود به پنل مدیریت گرگ</h1>
        </div>
        {mode === "forgot" ? (
          <ForgotPassword onBack={() => setMode("login")} />
        ) : (
          <form onSubmit={submit} className="panel-card p-6 space-y-4">
            <input
              type="text"
              required
              autoFocus
              autoComplete="username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              placeholder="نام کاربری"
              className="panel-input"
            />
            <PasswordField
              value={password}
              onChange={setPassword}
              placeholder="رمز عبور"
              autoComplete="current-password"
              required
            />
            {error && <p className="text-sm text-[var(--color-ember-light)]">{error}</p>}
            <button type="submit" disabled={busy} className="btn-primary w-full disabled:opacity-60">
              {busy ? "در حال ورود…" : "ورود"}
            </button>
            <button
              type="button"
              onClick={() => setMode("forgot")}
              className="text-xs text-[var(--color-ash)] w-full text-center hover:text-[var(--color-bone)]"
            >
              نام کاربری یا رمز عبور را فراموش کرده‌اید؟
            </button>
          </form>
        )}
        <div className="mt-6 flex justify-center">
          <DesignerCredit />
        </div>
      </div>
    </div>
  );
}

function Shell({
  children,
  businessName,
  username,
  dbConfigured,
  onLogout,
}: {
  children: ReactNode;
  businessName: string;
  username: string;
  dbConfigured: boolean;
  onLogout: () => void;
}) {
  const pathname = usePathname();
  const toast = useToast();
  const [pulse, setPulse] = useState<Pulse>({ latestId: 0, received: 0, preparing: 0, ready: 0 });
  const [soundOn, setSoundOn] = useState(true);
  const lastId = useRef<number | null>(null);
  const soundRef = useRef(true);

  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setSoundOn(localStorage.getItem("gorg-admin-sound") !== "off");
    const unlock = () => unlockAudio();
    window.addEventListener("pointerdown", unlock, { once: true });
    return () => window.removeEventListener("pointerdown", unlock);
  }, []);

  useEffect(() => {
    soundRef.current = soundOn;
  }, [soundOn]);

  // هر ۱۰ ثانیه: سفارش جدید آمده؟ زنگ + پیام + به‌روزرسانی صفحه‌ی باز
  const poll = useCallback(async () => {
    if (!dbConfigured) return;
    try {
      const p = await api<Pulse>("/api/admin/orders?pulse=1");
      setPulse(p);
      if (lastId.current !== null && p.latestId > lastId.current) {
        if (soundRef.current) beep();
        toast("🔔 سفارش جدید رسید", "info");
        window.dispatchEvent(new Event("admin-new-orders"));
      }
      lastId.current = p.latestId;
    } catch {
      /* شبکه‌ی ناپایدار؛ دفعه‌ی بعد */
    }
  }, [dbConfigured, toast]);

  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    poll();
    const t = setInterval(poll, 10000);
    const onVis = () => document.visibilityState === "visible" && poll();
    document.addEventListener("visibilitychange", onVis);
    return () => {
      clearInterval(t);
      document.removeEventListener("visibilitychange", onVis);
    };
  }, [poll]);

  useEffect(() => {
    document.title = pulse.received > 0 ? `(${fa(pulse.received)}) سفارش جدید | پنل ${businessName}` : `پنل مدیریت | ${businessName}`;
  }, [pulse.received, businessName]);

  function toggleSound() {
    const next = !soundOn;
    setSoundOn(next);
    localStorage.setItem("gorg-admin-sound", next ? "on" : "off");
    if (next) {
      unlockAudio();
      beep();
    }
  }

  const isActive = (href: string) => (href === "/admin" ? pathname === "/admin" : pathname?.startsWith(href));

  return (
    <AdminCtx.Provider value={{ pulse, businessName, soundOn, username }}>
      <div className="relative min-h-screen bg-[var(--color-ink)]">
        <div
          className="fixed inset-0 -z-10 bg-cover bg-center bg-no-repeat"
          style={{ backgroundImage: "url(/images/gorg-poster-full.jpg)" }}
          aria-hidden="true"
        />
        <div className="fixed inset-0 -z-10 bg-[var(--color-ink)]/88" aria-hidden="true" />
        <header className="brand-texture-soft border-b border-white/8">
          <div className="max-w-6xl mx-auto px-4 sm:px-5 py-3 flex items-center justify-between gap-3">
            <Link href="/admin" className="flex items-center gap-2.5 min-w-0">
              <Image src="/images/gorg-mark.png" alt="" width={38} height={38} className="rounded-full shrink-0" />
              <div className="min-w-0">
                <p className="font-extrabold text-sm sm:text-base truncate">{businessName}</p>
                <p className="text-[11px] text-[var(--color-ash)]">پنل مدیریت</p>
              </div>
            </Link>
            <div className="flex items-center gap-2">
              <button
                onClick={toggleSound}
                aria-label={soundOn ? "خاموش کردن زنگ سفارش" : "روشن کردن زنگ سفارش"}
                title={soundOn ? "زنگ سفارش روشن است" : "زنگ سفارش خاموش است"}
                className="w-9 h-9 rounded-full bg-white/6 border border-white/12 text-base"
              >
                {soundOn ? "🔔" : "🔕"}
              </button>
              <Link href="/" target="_blank" className="btn-outline btn-sm hidden sm:inline-flex">
                مشاهده سایت
              </Link>
              {username && <span className="text-xs text-[var(--color-ash)] hidden md:inline">{username}</span>}
              <button onClick={onLogout} className="btn-outline btn-sm">
                خروج
              </button>
            </div>
          </div>
          <nav className="border-t border-white/6 bg-[var(--color-ink)]/70 backdrop-blur-sm" aria-label="بخش‌های پنل">
            <div className="max-w-6xl mx-auto px-3 sm:px-5 flex gap-1.5 overflow-x-auto no-scrollbar py-2">
              {TABS.map((t) => {
                const active = isActive(t.href);
                const badge = t.href === "/admin/orders" ? pulse.received : 0;
                return (
                  <Link
                    key={t.href}
                    href={t.href}
                    aria-current={active ? "page" : undefined}
                    className={`relative shrink-0 inline-flex items-center gap-1.5 rounded-full px-3.5 py-2 text-[13px] font-bold border transition-colors ${
                      active
                        ? "bg-[var(--color-ember)] border-[var(--color-ember)] text-white"
                        : "border-white/10 text-[var(--color-ash)] hover:border-white/30 hover:text-[var(--color-bone)]"
                    }`}
                  >
                    <span aria-hidden="true">{t.icon}</span>
                    {t.label}
                    {badge > 0 && (
                      <span className="panel-pulse min-w-5 h-5 px-1.5 rounded-full bg-amber-400 text-black text-[11px] font-black flex items-center justify-center">
                        {fa(badge)}
                      </span>
                    )}
                  </Link>
                );
              })}
            </div>
          </nav>
        </header>

        <main className="max-w-6xl mx-auto px-4 sm:px-5 py-6 pb-24">
          {!dbConfigured ? (
            <div className="panel-card p-6 text-center leading-8">
              <p className="font-extrabold mb-2">دیتابیس هنوز وصل نشده</p>
              <p className="text-sm text-[var(--color-ash)]">
                برای کار کردنِ پنل، در Vercel یک دیتابیس Neon/Postgres وصل کنید تا <span dir="ltr">DATABASE_URL</span> تنظیم شود، بعد دوباره دیپلوی کنید.
              </p>
            </div>
          ) : (
            children
          )}
        </main>

        <footer className="border-t border-white/8 py-4 flex justify-center">
          <DesignerCredit />
        </footer>
      </div>
    </AdminCtx.Provider>
  );
}

export default function AdminShell({ children }: { children: ReactNode }) {
  const pathname = usePathname();
  const cached = typeof window !== "undefined" ? sessionStorage.getItem("gorg-admin-meta") : null;
  const [state, setState] = useState<"loading" | "out" | "in">(cached ? "in" : "loading");
  const [meta, setMeta] = useState({ businessName: "رستوران گرگ", username: "", dbConfigured: true });

  useEffect(() => {
    if (cached) {
      try {
        setMeta(JSON.parse(cached));
      } catch {
        /* نادیده گرفته می‌شود */
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const check = useCallback(async () => {
    try {
      const r = await api<{ businessName: string; username: string; dbConfigured: boolean }>("/api/admin/me");
      const next = { businessName: r.businessName, username: r.username, dbConfigured: r.dbConfigured };
      setMeta(next);
      setState("in");
      sessionStorage.setItem("gorg-admin-meta", JSON.stringify(next));
    } catch {
      setState("out");
      sessionStorage.removeItem("gorg-admin-meta");
    }
  }, []);

  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    check();
    const out = () => setState("out");
    window.addEventListener("admin-unauth", out);
    return () => window.removeEventListener("admin-unauth", out);
  }, [check]);

  async function logout() {
    await fetch("/api/admin/logout", { method: "POST" });
    sessionStorage.removeItem("gorg-admin-meta");
    setState("out");
  }

  // لینکِ ایمیلِ «رمز را فراموش کرده‌ام» به همین مسیر می‌رسد؛ چون کاربر هنوز
  // واردنشده، باید بدون گذر از چرخه‌ی ورود، مستقیم نمایش داده شود
  if (pathname === "/admin/reset-password") return children;

  if (state === "loading") {
    return <div className="min-h-screen flex items-center justify-center text-[var(--color-ash)] text-sm">در حال بارگذاری…</div>;
  }
  if (state === "out") return <LoginForm onDone={check} />;

  return (
    <ToastProvider>
      <Shell businessName={meta.businessName} username={meta.username} dbConfigured={meta.dbConfigured} onLogout={logout}>
        {children}
      </Shell>
    </ToastProvider>
  );
}
