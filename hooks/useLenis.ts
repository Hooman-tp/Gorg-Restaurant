"use client";

import { useEffect } from "react";
import Lenis from "lenis";
import { gsap, ScrollTrigger } from "@/lib/gsap";

/**
 * اسکرول نرم سراسری سایت. مقدار lenis روی window قرار می‌گیرد تا
 * کامپوننت‌هایی مثل ScrollProgress بتوانند مستقیم به موقعیت واقعی
 * اسکرول (نه window.scrollY خام) دسترسی داشته باشند.
 */
export function useLenis() {
  useEffect(() => {
    const lenis = new Lenis({
      smoothWheel: true,
      duration: 1.15,
      wheelMultiplier: 1,
      touchMultiplier: 2,
      gestureOrientation: "vertical",
    });

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    (window as any).__lenis = lenis;

    lenis.on("scroll", ScrollTrigger.update);

    const update = (time: number) => {
      lenis.raf(time * 1000);
    };

    gsap.ticker.add(update);
    gsap.ticker.lagSmoothing(0);

    return () => {
      gsap.ticker.remove(update);
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      delete (window as any).__lenis;
      lenis.destroy();
    };
  }, []);
}
