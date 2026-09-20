"use client";

import { useEffect, useRef } from "react";

/**
 * نوار پیشرفت اسکرول بالای صفحه. مستقیم روی DOM (transform) نوشته می‌شود،
 * نه با state ریاکت: قبلاً با هر رویدادِ اسکرول کل کامپوننت دوباره رندر می‌شد
 * و با پخشِ فیلمِ صفحه‌ی اصلی سرِ نوبتِ پردازنده رقابت می‌کرد.
 */
export default function ScrollProgress() {
  const barRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    let raf = 0;

    const update = () => {
      raf = 0;
      const bar = barRef.current;
      if (!bar) return;
      const height = document.documentElement.scrollHeight - window.innerHeight;
      const p = height > 0 ? Math.min(1, Math.max(0, window.scrollY / height)) : 0;
      bar.style.transform = `scaleX(${p})`;
    };
    const onScroll = () => {
      if (!raf) raf = requestAnimationFrame(update);
    };

    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    update();
    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
      if (raf) cancelAnimationFrame(raf);
    };
  }, []);

  return (
    <div className="fixed top-0 left-0 right-0 z-[110] h-[3px] bg-transparent" aria-hidden="true">
      <div
        ref={barRef}
        className="h-full w-full origin-right bg-gradient-to-l from-[var(--color-ember)] to-[var(--color-blood)]"
        style={{ transform: "scaleX(0)" }}
      />
    </div>
  );
}
