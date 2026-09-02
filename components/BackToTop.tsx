"use client";

import { useEffect, useState } from "react";

export default function BackToTop() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const onScroll = () => setVisible(window.scrollY > 600);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const handleClick = () => {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const lenis = (window as any).__lenis;
    if (lenis) lenis.scrollTo(0, { duration: 1.1 });
    else window.scrollTo({ top: 0, behavior: "smooth" });
  };

  if (!visible) return null;

  return (
    <button
      onClick={handleClick}
      aria-label="برو به بالای صفحه"
      className="fixed bottom-24 left-5 z-40 w-11 h-11 rounded-full bg-[var(--color-charcoal)] border border-white/10 text-[var(--color-bone)] flex items-center justify-center shadow-lg hover:border-[var(--color-ember)] transition-colors"
    >
      ↑
    </button>
  );
}
