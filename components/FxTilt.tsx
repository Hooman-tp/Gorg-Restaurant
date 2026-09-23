"use client";

import { useEffect, useRef, type ReactNode } from "react";
import Link from "next/link";

/**
 * کارتِ «زنده» برای دسکتاپ: وقتی ماوس روی کارت حرکت می‌کند
 *  - کارت کمی به سمت ماوس کج می‌شود (تیلت سه‌بعدی)،
 *  - یک نورِ آتشین زیرِ ماوس دنبالش می‌آید (--mx / --my)،
 * و بقیه‌ی افکت‌ها (زوم عکس، برق، جرقه، قاب درخشان) با CSS و روی همین
 * کلاس‌ها (dish-card / gallery-tile / cat-card در globals.css) اجرا می‌شود.
 *
 * روی موبایل و هر دستگاهِ بدون ماوس هیچ listener ای ثبت نمی‌شود.
 */
export function useTilt<T extends HTMLElement>(max = 7) {
  const ref = useRef<T | null>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const fine = window.matchMedia("(hover: hover) and (pointer: fine)");
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)");
    if (!fine.matches) return;

    let raf = 0;

    const onMove = (e: PointerEvent) => {
      if (e.pointerType !== "mouse") return;
      const { clientX, clientY } = e;
      if (raf) cancelAnimationFrame(raf);
      raf = requestAnimationFrame(() => {
        raf = 0;
        const r = el.getBoundingClientRect();
        if (!r.width || !r.height) return;
        const px = Math.min(1, Math.max(0, (clientX - r.left) / r.width));
        const py = Math.min(1, Math.max(0, (clientY - r.top) / r.height));
        el.style.setProperty("--mx", `${(px * 100).toFixed(1)}%`);
        el.style.setProperty("--my", `${(py * 100).toFixed(1)}%`);
        if (!reduce.matches) {
          el.style.setProperty("--rx", `${((0.5 - py) * max).toFixed(2)}deg`);
          el.style.setProperty("--ry", `${((px - 0.5) * max).toFixed(2)}deg`);
        }
      });
    };

    const onLeave = () => {
      if (raf) cancelAnimationFrame(raf);
      raf = 0;
      el.style.setProperty("--rx", "0deg");
      el.style.setProperty("--ry", "0deg");
    };

    el.addEventListener("pointermove", onMove);
    el.addEventListener("pointerleave", onLeave);
    return () => {
      el.removeEventListener("pointermove", onMove);
      el.removeEventListener("pointerleave", onLeave);
      if (raf) cancelAnimationFrame(raf);
    };
  }, [max]);

  return ref;
}

interface FxTiltProps {
  as?: "div" | "button" | "link";
  href?: string;
  max?: number;
  className?: string;
  children: ReactNode;
  onClick?: () => void;
  "aria-label"?: string;
}

export default function FxTilt({ as = "div", href, max = 7, className = "", children, onClick, ...aria }: FxTiltProps) {
  const ref = useTilt<HTMLElement>(max);
  const cls = `fx-tilt ${className}`;

  if (as === "link" && href) {
    return (
      <Link ref={ref as React.RefObject<HTMLAnchorElement>} href={href} className={cls} {...aria}>
        {children}
      </Link>
    );
  }
  if (as === "button") {
    return (
      <button ref={ref as React.RefObject<HTMLButtonElement>} type="button" onClick={onClick} className={cls} {...aria}>
        {children}
      </button>
    );
  }
  return (
    <div ref={ref as React.RefObject<HTMLDivElement>} className={cls} {...aria}>
      {children}
    </div>
  );
}
