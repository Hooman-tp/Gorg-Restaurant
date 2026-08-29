"use client";

import { useEffect, useState } from "react";

export default function ScrollProgress() {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const onScroll = () => {
      const scrollTop = window.scrollY;
      const height = document.documentElement.scrollHeight - window.innerHeight;
      setProgress(height > 0 ? (scrollTop / height) * 100 : 0);
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    onScroll();
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <div className="fixed top-0 left-0 right-0 z-[110] h-[3px] bg-transparent">
      <div
        className="h-full bg-gradient-to-l from-[var(--color-ember)] to-[var(--color-blood)] transition-[width]"
        style={{ width: `${progress}%` }}
      />
    </div>
  );
}
