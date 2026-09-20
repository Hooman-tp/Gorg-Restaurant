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
    // سرعت اسکرول: عدد wheelMultiplier را کمتر کنید تا اسکرول کندتر شود،
    // و lerp را کمتر کنید تا حرکت نرم‌تر و «سنگین‌تر» شود.
    const lenis = new Lenis({
      smoothWheel: true,
      lerp: 0.075,
      wheelMultiplier: 0.6,
      touchMultiplier: 1,
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
