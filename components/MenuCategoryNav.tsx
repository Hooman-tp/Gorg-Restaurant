"use client";

import { useEffect, useState } from "react";
import { categories } from "@/lib/menuData";
import { MenuCategoryId } from "@/lib/types";

/**
 * ناوبری دسته‌ها با اسکرول‌اسپای. لینک‌ها anchor واقعی هستند (#grill و...)
 * پس بدون جاوااسکریپت هم کار می‌کنند؛ IntersectionObserver فقط دسته‌ی
 * فعال را هایلایت می‌کند.
 */
export default function MenuCategoryNav() {
  const [active, setActive] = useState<MenuCategoryId>("grill");

  useEffect(() => {
    const sections = categories
      .map((c) => document.getElementById(c.id))
      .filter((el): el is HTMLElement => Boolean(el));

    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((e) => e.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0];
        if (visible) setActive(visible.target.id as MenuCategoryId);
      },
      { rootMargin: "-120px 0px -60% 0px", threshold: [0, 0.25, 0.5, 1] }
    );

    sections.forEach((s) => observer.observe(s));
    return () => observer.disconnect();
  }, []);

  return (
    <div className="flex flex-wrap gap-2 mb-10 sticky top-16 z-20 bg-[var(--color-ink)]/90 backdrop-blur-sm py-3 -mx-5 px-5 sm:mx-0 sm:px-0">
      {categories.map((cat) => (
        <a
          key={cat.id}
          href={`#${cat.id}`}
          className={`px-4 py-2 rounded-full text-sm font-bold transition-colors border ${
            active === cat.id
              ? "bg-[var(--color-ember)] border-[var(--color-ember)] text-white"
              : "border-white/12 text-[var(--color-ash)] hover:border-white/30"
          }`}
        >
          {cat.label}
        </a>
      ))}
    </div>
  );
}
