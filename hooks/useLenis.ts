"use client";

import { useEffect } from "react";
import Lenis from "lenis";

/**
 * اسکرول نرمِ سراسریِ سایت — فقط برای دسکتاپ (ماوس/تاچ‌پد).
 *
 * روی موبایل و تبلت عمداً هیچ اسکرولِ جاوااسکریپتی نداریم و اسکرولِ بومیِ
 * خودِ گوشی کار می‌کند. دلیلش: قبلاً syncTouch: true بود؛ این حالت لمس را
 * از رویدادهای جاوااسکریپت رد می‌کند و اسکرول را در هر فریم با scrollTo
 * جابه‌جا می‌کند. Safari آیفون اسکرولِ برنامه‌نویسی‌شده را روی GPU
 * انجام نمی‌دهد، پس همه‌چیز (و فریم‌های فیلم) تکه‌تکه و ناهموار می‌شد و
 * سرعت هم بیش‌ازحد به نظر می‌رسید. اسکرولِ بومی هم شتابِ انگشت و هم
 * ادامه‌ی حرکت بعد از برداشتنِ انگشت را کاملاً نرم و بی‌دردسر دارد.
 *
 * مقدار lenis روی window قرار می‌گیرد تا BackToTop بتواند نرم به بالا برگردد.
 */
export function useLenis() {
  useEffect(() => {
    const desktop = window.matchMedia("(hover: hover) and (pointer: fine)").matches;
    if (!desktop) return;

    // سرعت اسکرول: عدد wheelMultiplier را کمتر کنید تا اسکرول کندتر شود،
    // و lerp را کمتر کنید تا حرکت نرم‌تر و «سنگین‌تر» شود.
    const lenis = new Lenis({
      smoothWheel: true,
      lerp: 0.075,
      wheelMultiplier: 0.6,
      gestureOrientation: "vertical",
    });

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    (window as any).__lenis = lenis;

    let raf = 0;
    const loop = (time: number) => {
      lenis.raf(time);
      raf = requestAnimationFrame(loop);
    };
    raf = requestAnimationFrame(loop);

    return () => {
      cancelAnimationFrame(raf);
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      delete (window as any).__lenis;
      lenis.destroy();
    };
  }, []);
}
