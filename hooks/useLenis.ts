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
    // حس اسکرول (دسکتاپ و موبایل، هر دو نرم و با کمی ادامه‌ی حرکت بعد از رها کردن):
    //
    // دسکتاپ (چرخ ماوس / تاچ‌پد):
    //  - lerp را کمتر کنید تا بعد از رها کردن، حرکت بیشتری ادامه پیدا کند (الان ۰٫۰۶؛
    //    عدد کوچک‌تر = نرم‌تر و «سنگین‌تر»، مثلاً ۰٫۰۴). عدد بزرگ‌تر = زودتر می‌ایستد.
    //  - wheelMultiplier سرعت/طول هر حرکت چرخ را تعیین می‌کند (کمتر = کندتر).
    //
    // موبایل:
    //  - syncTouch: اسکرول لمسی را خود Lenis اجرا می‌کند، پس بعد از برداشتن انگشت
    //    حرکت کمی ادامه پیدا می‌کند و نرم می‌ایستد (قبلاً با برداشتن انگشت می‌ایستاد).
    //  - syncTouchLerp: مثل lerp ولی برای ادامه‌ی حرکت بعد از رها کردن انگشت.
    //    بزرگ‌تر = زودتر می‌ایستد، کوچک‌تر = بیشتر ادامه می‌دهد.
    //  - اگر روی گوشی مشکلی دیدید، syncTouch را false کنید تا اسکرول لمسیِ خودِ مرورگر برگردد.
    const lenis = new Lenis({
      smoothWheel: true,
      lerp: 0.06,
      wheelMultiplier: 0.8,
      syncTouch: true,
      syncTouchLerp: 0.08,
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
