"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { useCart } from "@/context/CartContext";

const NAV_ITEMS = [
  { href: "/", label: "خانه" },
  { href: "/menu", label: "منو" },
  { href: "/gallery", label: "گالری" },
  { href: "/about", label: "درباره گرگ" },
  { href: "/contact", label: "تماس" },
];

export default function Header() {
  const pathname = usePathname();
  const { count, openCart } = useCart();
  const [menuOpen, setMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    window.addEventListener("scroll", onScroll, { passive: true });
    onScroll();
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header
      className={`fixed top-0 inset-x-0 z-[100] transition-colors duration-300 ${
        scrolled ? "bg-[var(--color-ink)]/92 backdrop-blur-md" : "bg-transparent"
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
