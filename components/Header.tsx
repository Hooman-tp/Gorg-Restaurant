"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import { useCart } from "@/context/CartContext";
import { useAuth } from "@/context/AuthContext";
import { maskMobile } from "@/lib/phone";

const NAV_ITEMS = [
  { href: "/", label: "خانه" },
  { href: "/menu", label: "منو" },
  { href: "/gallery", label: "گالری" },
  { href: "/about", label: "درباره گرگ" },
  { href: "/track", label: "پیگیری سفارش" },
  { href: "/contact", label: "تماس" },
];

function UserIcon() {
  return (
    <svg width="19" height="19" viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <circle cx="12" cy="8" r="3.6" stroke="currentColor" strokeWidth="1.8" />
      <path d="M4.5 20c.6-3.7 3.6-5.6 7.5-5.6s6.9 1.9 7.5 5.6" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
    </svg>
  );
}

export default function Header() {
  const pathname = usePathname();
  const { count, openCart } = useCart();
  const { phone, ready, openLogin, logout } = useAuth();
  const [menuOpen, setMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [accountOpen, setAccountOpen] = useState(false);
  const accountRef = useRef<HTMLDivElement>(null);

  // بستن منوی حساب با کلیک بیرون از آن یا Escape
  useEffect(() => {
    if (!accountOpen) return;
    const onDown = (e: MouseEvent | TouchEvent) => {
      if (accountRef.current && !accountRef.current.contains(e.target as Node)) setAccountOpen(false);
    };
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setAccountOpen(false);
    };
    document.addEventListener("mousedown", onDown);
    document.addEventListener("touchstart", onDown, { passive: true });
    document.addEventListener("keydown", onKey);
    return () => {
      document.removeEventListener("mousedown", onDown);
      document.removeEventListener("touchstart", onDown);
      document.removeEventListener("keydown", onKey);
    };
  }, [accountOpen]);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    window.addEventListener("scroll", onScroll, { passive: true });
    onScroll();
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // عمداً بدون backdrop-blur: زمینه تقریباً مات است پس تاری دیده نمی‌شد، ولی
  // مرورگر موقع هر تغییرِ فریمِ فیلمِ زیرِ هدر دوباره آن را محاسبه می‌کرد
  // (روی iOS خیلی سنگین است).
  return (
    <header
      className={`fixed top-0 inset-x-0 z-[100] transition-colors duration-300 ${
        scrolled ? "bg-[var(--color-ink)]/95" : "bg-transparent"
      }`}
    >
      <div className="max-w-6xl mx-auto flex items-center justify-between px-5 py-3">
        <Link href="/" className="flex items-center gap-2.5 shrink-0">
          <Image src="/images/gorg-mark.png" alt="گرگ" width={44} height={44} priority className="rounded-full" />
          <span className="font-extrabold text-lg tracking-wide">گرگ</span>
        </Link>

        <nav className="hidden md:flex items-center gap-7">
          {NAV_ITEMS.map((item) => {
            const active = pathname === item.href;
            return (
              <Link
                key={item.href}
                href={item.href}
                aria-current={active ? "page" : undefined}
                className={`text-sm transition-colors pb-1 border-b-2 ${
                  active
                    ? "text-[var(--color-ember-light)] border-[var(--color-ember)] font-bold"
                    : "text-[var(--color-bone)]/85 border-transparent hover:text-[var(--color-ember-light)]"
                }`}
              >
                {item.label}
              </Link>
            );
          })}
        </nav>

        <div className="flex items-center gap-2">
          <Link
            href="/menu"
            className="hidden sm:inline-flex btn-primary !py-2.5 !px-5 text-sm"
          >
            سفارش آنلاین
          </Link>

          <button
            onClick={openCart}
            aria-label="مشاهده سبد سفارش"
            className="relative w-10 h-10 rounded-full border border-white/12 flex items-center justify-center hover:border-[var(--color-ember)] transition-colors"
          >
            <svg width="19" height="19" viewBox="0 0 24 24" fill="none" aria-hidden="true">
              <path
                d="M3 4h2l2.4 12.2a2 2 0 0 0 2 1.6h7.2a2 2 0 0 0 2-1.6L20 8H6"
                stroke="currentColor"
                strokeWidth="1.8"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
              <circle cx="9" cy="20" r="1.4" fill="currentColor" />
              <circle cx="17" cy="20" r="1.4" fill="currentColor" />
            </svg>
            {count > 0 && (
              <span className="absolute -top-1 -left-1 w-[18px] h-[18px] px-1 rounded-full bg-[var(--color-ember)] text-[10px] font-bold flex items-center justify-center">
                {count}
              </span>
            )}
          </button>

          {/* ورود / حساب کاربری (با شماره موبایل و پیامک) */}
          {ready && !phone && (
            <button
              onClick={openLogin}
              aria-label="ورود به حساب کاربری"
              className="h-10 w-10 sm:w-auto sm:px-4 rounded-full border border-white/12 flex items-center justify-center gap-2 hover:border-[var(--color-ember)] transition-colors"
            >
              <UserIcon />
              <span className="hidden sm:inline text-sm font-bold">ورود</span>
            </button>
          )}
          {ready && phone && (
            <div ref={accountRef} className="relative">
              <button
                onClick={() => setAccountOpen((v) => !v)}
                aria-label="حساب کاربری"
                aria-haspopup="menu"
                aria-expanded={accountOpen}
                className="relative h-10 w-10 sm:w-auto sm:px-4 rounded-full border border-[var(--color-ember)]/60 flex items-center justify-center gap-2 hover:border-[var(--color-ember)] transition-colors"
              >
                <UserIcon />
                <span dir="ltr" className="hidden sm:inline text-sm">
                  {maskMobile(phone)}
                </span>
                <span
                  aria-hidden="true"
                  className="absolute -top-0.5 -right-0.5 w-2.5 h-2.5 rounded-full bg-emerald-500 ring-2 ring-[var(--color-ink)]"
                />
              </button>
              {accountOpen && (
                <div
                  role="menu"
                  className="absolute top-full left-0 mt-2 w-56 rounded-2xl bg-[var(--color-charcoal)] border border-white/10 p-3 shadow-2xl"
                >
                  <p className="text-xs text-[var(--color-ash)]">وارد شده با شماره</p>
                  <p dir="ltr" className="text-sm font-bold mt-1 text-right">
                    {phone}
                  </p>
                  <Link
                    href="/track"
                    role="menuitem"
                    onClick={() => setAccountOpen(false)}
                    className="block mt-3 py-2 text-sm border-t border-white/10 hover:text-[var(--color-ember-light)]"
                  >
                    پیگیری سفارش
                  </Link>
                  <button
                    role="menuitem"
                    onClick={async () => {
                      setAccountOpen(false);
                      await logout();
                    }}
                    className="block w-full text-right py-2 text-sm border-t border-white/10 text-red-300 hover:text-red-200"
                  >
                    خروج از حساب
                  </button>
                </div>
              )}
            </div>
          )}

          <button
            onClick={() => setMenuOpen((v) => !v)}
            aria-label="باز کردن منو"
            aria-expanded={menuOpen}
            className="md:hidden w-10 h-10 rounded-full border border-white/12 flex flex-col items-center justify-center gap-1"
          >
            <span
              className={`block w-[18px] h-[1.5px] bg-current transition-transform ${
                menuOpen ? "rotate-45 translate-y-[3px]" : ""
              }`}
            />
            <span className={`block w-[18px] h-[1.5px] bg-current ${menuOpen ? "opacity-0" : ""}`} />
            <span
              className={`block w-[18px] h-[1.5px] bg-current transition-transform ${
                menuOpen ? "-rotate-45 -translate-y-[3px]" : ""
              }`}
            />
          </button>
        </div>
      </div>

      {menuOpen && (
        <nav className="md:hidden bg-[var(--color-ink)]/97 backdrop-blur-md border-t border-white/5 px-5 py-3 flex flex-col gap-1">
          {NAV_ITEMS.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              onClick={() => setMenuOpen(false)}
              className="py-3 text-sm border-b border-white/5 last:border-0"
            >
              {item.label}
            </Link>
          ))}
        </nav>
      )}
    </header>
  );
}
