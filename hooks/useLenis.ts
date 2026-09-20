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
    //
    // syncTouch: پیش‌فرضِ Lenis برای لمس، false است — یعنی روی موبایل
    // اسکرول کاملاً خام/بومی انجام می‌شد و momentum (لمی‌کردن نرمِ لنیس)
    // اصلاً روی آن اثر نداشت. نتیجه دقیقاً همان چیزی بود که دیدید: با
    // برداشتنِ انگشت، اسکرول (و به‌تبعش فریمِ فیلم) بی‌مقدمه می‌ایستاد،
    // چون هیچ حرکتِ باقی‌مانده‌ای برای دنبال‌کردن وجود نداشت. با
    // syncTouch: true لمس هم از همین موتورِ لرپ عبور می‌کند، پس بعد از
    // برداشتنِ انگشت چند لحظه با شتابِ رو‌به‌کاهش ادامه می‌دهد — درست
    // مثل اسکرول‌های نرمِ حرفه‌ای. syncTouchLerp را عمداً ننوشتم چون
    // پیش‌فرضش (۰٫۰۷۵) خودش دقیقاً با lerp بالا یکی است، پس حس لمس و
    // ویل باهم یکدست می‌شود.
    // (نکته‌ی خودِ Lenis: روی iOS زیر ۱۶ ممکن است کمی ناپایدار باشد؛ اگر
    // جایی روی موبایل قدیمی مشکلی دیدید، همین یک خط را false کنید.)
    const lenis = new Lenis({
      smoothWheel: true,
      lerp: 0.075,
      wheelMultiplier: 0.6,
      touchMultiplier: 1,
      syncTouch: true,
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
