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
    // چرخِ ماوس (دسکتاپ): wheelMultiplier سرعتِ اسکرول را تعیین می‌کند (کمتر =
    // کندتر) و lerp میزانِ «سنگینیِ» حرکت را (کمتر = نرم‌تر و دنباله‌دارتر).
    // نرمیِ نهاییِ فیلمِ FireStory جدا و در خودِ FireStoryShowcase (SMOOTH_TIME)
    // انجام می‌شود؛ پس این دو عدد فقط حسِ کلِ صفحه را تنظیم می‌کنند.
    //
    // لمس (موبایل): syncTouch عمداً false است. با syncTouch: true، Lenis لمس را
    // خودش شبیه‌سازی می‌کرد و تنها یک اینرسیِ خیلی کوتاه بعد از برداشتنِ انگشت
    // می‌داد؛ همان «ایستادنِ ناگهانی» که می‌دیدید. حالا موبایل از اسکرولِ بومیِ
    // خودِ گوشی (اینرسیِ واقعیِ iOS/Android که طولانی و طبیعی است) استفاده می‌کند
    // و نرمیِ فیلم را همان دنبال‌کننده‌ی فنری روی آن سوار می‌کند.
    // (اگر جایی حسِ اسکرولِ بومی را نپسندیدید، این را true کنید.)
    const lenis = new Lenis({
      smoothWheel: true,
      lerp: 0.075,
      wheelMultiplier: 0.6,
      touchMultiplier: 1,
      syncTouch: false,
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
