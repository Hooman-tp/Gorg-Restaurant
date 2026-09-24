"use client";

import { useEffect, useRef, type ReactNode } from "react";
import Link from "next/link";

/**
 * کارتِ «زنده» برای دسکتاپ: وقتی ماوس روی کارت حرکت می‌کند
 *  - کارت کمی به سمت ماوس کج می‌شود (تیلت سه‌بعدی)،
 *  - یک نورِ آتشین زیرِ ماوس دنبالش می‌آید،
 * و بقیه‌ی افکت‌ها (زوم عکس، برق، جرقه، قابِ درخشانِ چرخان) با CSS اجرا می‌شود.
 *
 * نکته‌ی سرعت: در هر حرکتِ ماوس فقط دو «transform» تغییر می‌کند (خودِ کارت و
 * لکه‌ی نور). هیچ متغیر CSS ای عوض نمی‌شود و هیچ گرادیانی دوباره کشیده
 * (repaint) نمی‌شود؛ پس همه‌چیز روی GPU می‌ماند و اسکرول کند نمی‌شود.
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

    const spot = el.querySelector<HTMLElement>(":scope > .fx-spot");
    let raf = 0;
    let rect: DOMRect | null = null;
    let rectAt = 0;
    let mx = 0;
    let my = 0;

    const apply = () => {
      raf = 0;
      const now = performance.now();
      // اندازه‌گیریِ مستطیل گران است؛ فقط هر ۳۰۰ میلی‌ثانیه (اسکرول هم جابه‌جایش می‌کند)
      if (!rect || now - rectAt > 300) {
        rect = el.getBoundingClientRect();
        rectAt = now;
      }
      const r = rect;
      if (!r.width || !r.height) return;
      const px = Math.min(1, Math.max(0, (mx - r.left) / r.width));
      const py = Math.min(1, Math.max(0, (my - r.top) / r.height));
      if (!reduce.matches) {
        el.style.transform = `perspective(900px) rotateX(${((0.5 - py) * max).toFixed(2)}deg) rotateY(${((px - 0.5) * max).toFixed(2)}deg)`;
      }
      if (spot) {
        spot.style.transform = `translate3d(${((px - 0.5) * r.width).toFixed(1)}px, ${((py - 0.5) * r.height).toFixed(1)}px, 0)`;
      }
    };

    const onEnter = () => {
      rect = el.getBoundingClientRect();
      rectAt = performance.now();
    };
    const onMove = (e: PointerEvent) => {
      if (e.pointerType !== "mouse") return;
      mx = e.clientX;
      my = e.clientY;
      if (!raf) raf = requestAnimationFrame(apply);
    };
    const onLeave = () => {
      if (raf) cancelAnimationFrame(raf);
      raf = 0;
      rect = null;
      el.style.transform = "";
      if (spot) spot.style.transform = "";
    };

    el.addEventListener("pointerenter", onEnter);
    el.addEventListener("pointermove", onMove, { passive: true });
    el.addEventListener("pointerleave", onLeave);
    return () => {
      el.removeEventListener("pointerenter", onEnter);
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

/** لکه‌ی نورِ دنبال‌کننده‌ی ماوس + قابِ درخشانِ چرخان (هر دو فقط موقعِ هاور دیده می‌شوند) */
function Fx() {
  return (
    <>
      <span className="fx-spot" aria-hidden="true" />
      <span className="fx-ring" aria-hidden="true">
        <i />
      </span>
    </>
  );
}

export default function FxTilt({ as = "div", href, max = 7, className = "", children, onClick, ...aria }: FxTiltProps) {
  const ref = useTilt<HTMLElement>(max);
  const cls = `fx-tilt ${className}`;

  if (as === "link" && href) {
    return (
      <Link ref={ref as React.RefObject<HTMLAnchorElement>} href={href} className={cls} {...aria}>
        {children}
        <Fx />
      </Link>
    );
  }
  if (as === "button") {
    return (
      <button ref={ref as React.RefObject<HTMLButtonElement>} type="button" onClick={onClick} className={cls} {...aria}>
        {children}
        <Fx />
      </button>
    );
  }
  return (
    <div ref={ref as React.RefObject<HTMLDivElement>} className={cls} {...aria}>
      {children}
      <Fx />
    </div>
  );
}
