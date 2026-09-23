"use client";

import { useLayoutEffect } from "react";
import { gsap, ScrollTrigger } from "@/lib/gsap";

/**
 * افکت‌های اسکرولِ صفحه‌ی اصلی، بعد از تمام شدنِ فیلمِ آتش:
 *  معرفی کوتاه ← دسته‌های منو ← پیشنهاد گرگ ← آمار ← گالری
 *
 * هیچ چیزی رندر نمی‌کند؛ فقط به المان‌های صفحه (با data-fx-*) انیمیشن می‌دهد.
 * اگر کاربر «کاهش حرکت» را در دستگاهش روشن کرده باشد، هیچ انیمیشنی اجرا نمی‌شود.
 * فقط از transform و opacity استفاده شده تا روی موبایل هم روان بماند.
 */
export default function HomeScrollFX() {
  useLayoutEffect(() => {
    const mm = gsap.matchMedia();

    mm.add("(prefers-reduced-motion: no-preference)", () => {
      const q = <T extends Element = HTMLElement>(sel: string, root: ParentNode = document) =>
        gsap.utils.toArray<T>(sel, root as Element);
      const isMobile = window.matchMedia("(max-width: 767px)").matches;
      const replay = "play none none reverse";

      // ── ۱) معرفی کوتاه: کلمه‌ها با اسکرول روشن می‌شوند ──
      q("[data-fx-pop]").forEach((el) => {
        gsap.from(el, {
          scale: 0,
          rotate: -40,
          opacity: 0,
          duration: 0.9,
          ease: "back.out(2)",
          scrollTrigger: { trigger: el, start: "top 88%", toggleActions: replay },
        });
      });
      const words = q("[data-fx-word]");
      if (words.length) {
        gsap.fromTo(
          words,
          { opacity: 0.14, y: 8 },
          {
            opacity: 1,
            y: 0,
            ease: "none",
            stagger: 0.5,
            scrollTrigger: {
              trigger: words[0].parentElement,
              start: "top 82%",
              end: "bottom 46%",
              scrub: true,
            },
          }
        );
      }

      // ── ۲) تیتر بخش‌ها: بالا آمدن از زیرِ ماسک + کشیده شدنِ خطِ آتشین ──
      q("[data-fx-head]").forEach((head) => {
        const h = head.querySelector("[data-fx-h]");
        const rule = head.querySelector("[data-fx-rule]");
        const sub = head.querySelector("[data-fx-sub]");
        const tl = gsap.timeline({ scrollTrigger: { trigger: head, start: "top 86%", toggleActions: replay } });
        if (h) tl.from(h, { yPercent: 120, rotate: 4, duration: 1, ease: "power4.out" });
        if (rule) tl.from(rule, { scaleX: 0, duration: 0.9, ease: "power3.out" }, "-=0.6");
        if (sub) tl.from(sub, { y: 20, opacity: 0, duration: 0.7, ease: "power2.out" }, "-=0.6");
      });

      // ── ۳) دسته‌های منو: هر ردیف با چرخشِ سه‌بعدی و فنر وارد می‌شود ──
      const cats = q("[data-fx-cat]");
      if (cats.length) {
        const hidden = { opacity: 0, y: 80, rotationX: -42, scale: 0.86, transformPerspective: 900, transformOrigin: "50% 100%" };
        gsap.set(cats, hidden);
        ScrollTrigger.batch(cats, {
          start: "top 92%",
          onEnter: (batch) => {
            gsap.to(batch, {
              opacity: 1,
              y: 0,
              rotationX: 0,
              scale: 1,
              duration: 1,
              ease: "back.out(1.4)",
              stagger: 0.1,
              overwrite: true,
            });
            batch.forEach((c, i) => {
              const icon = c.querySelector(".cat-icon");
              if (icon) {
                gsap.fromTo(
                  icon,
                  { scale: 0, rotate: -50 },
                  { scale: 1, rotate: 0, duration: 1.1, delay: 0.25 + i * 0.1, ease: "elastic.out(1, 0.5)", overwrite: true }
                );
              }
            });
          },
          onLeaveBack: (batch) => {
            gsap.to(batch, { ...hidden, duration: 0.4, stagger: 0.04, overwrite: true });
          },
        });
      }

      // ── ۴) پیشنهاد گرگ: هر کارت از سمتِ خودش می‌آید، عکس از پایین «باز» می‌شود ──
      const grid = document.querySelector<HTMLElement>("[data-fx-dish-grid]");
      const cols = grid ? getComputedStyle(grid).gridTemplateColumns.split(" ").length : 1;
      q("[data-fx-dish]").forEach((card, i) => {
        const col = i % cols;
        const last = cols - 1;
        // ستونِ اول (سمتِ راست، چون سایت RTL است) از راست، آخری از چپ، وسطی از پایین
        const fromX = cols === 1 ? (i % 2 ? -1 : 1) * 60 : col === 0 ? 100 : col === last ? -100 : 0;
        const fromRot = cols === 1 ? (i % 2 ? -4 : 4) : col === 0 ? 6 : col === last ? -6 : 0;
        const media = card.querySelector(".dish-media");
        const body = card.querySelectorAll(".dish-body > *");

        const tl = gsap.timeline({ scrollTrigger: { trigger: card, start: "top 90%", toggleActions: replay } });
        tl.from(card, { x: fromX, y: 90, rotate: fromRot, scale: 0.9, opacity: 0, duration: 1, ease: "power3.out" });
        if (media) {
          tl.fromTo(
            media,
            { clipPath: "inset(100% 0% 0% 0%)" },
            { clipPath: "inset(0% 0% 0% 0%)", duration: 1.1, ease: "power4.out" },
            0.12
          );
        }
        if (body.length) tl.from(body, { y: 24, opacity: 0, duration: 0.7, stagger: 0.08, ease: "power2.out" }, 0.45);
      });

      // پارالکسِ عکسِ داخلِ کارت‌ها (با اسکرول کمی بالا/پایین می‌رود)
      q("[data-fx-dish]").forEach((card) => {
        const p = card.querySelector(".dish-parallax");
        if (!p) return;
        gsap.fromTo(
          p,
          { yPercent: -8, scale: 1.2 },
          {
            yPercent: 8,
            scale: 1.2,
            ease: "none",
            scrollTrigger: { trigger: card, start: "top bottom", end: "bottom top", scrub: isMobile ? true : 0.6 },
          }
        );
      });

      // ── ۵) نورهای پس‌زمینه و کلمه‌ی GORG با اسکرول حرکت می‌کنند ──
      q("[data-fx-blob]").forEach((b) => {
        const speed = Number(b.getAttribute("data-speed") ?? 20);
        gsap.fromTo(
          b,
          { yPercent: -speed },
          {
            yPercent: speed,
            ease: "none",
            scrollTrigger: { trigger: b.parentElement, start: "top bottom", end: "bottom top", scrub: true },
          }
        );
      });
      q("[data-fx-bgword]").forEach((w) => {
        gsap.fromTo(
          w,
          { xPercent: 12 },
          {
            xPercent: -12,
            ease: "none",
            scrollTrigger: { trigger: w.parentElement, start: "top bottom", end: "bottom top", scrub: true },
          }
        );
      });
      q("[data-fx-line]").forEach((l) => {
        gsap.fromTo(
          l,
          { scaleX: 0, opacity: 0.2 },
          {
            scaleX: 1,
            opacity: 1,
            ease: "none",
            scrollTrigger: { trigger: l, start: "top 95%", end: "top 55%", scrub: true },
          }
        );
      });
      // جرقه‌ها فقط وقتی بخش دیده می‌شود انیمیت می‌شوند (صرفه‌جویی در باتری)
      q("[data-fx-embers]").forEach((wrap) => {
        ScrollTrigger.create({
          trigger: wrap,
          start: "top bottom",
          end: "bottom top",
          onToggle: (self) => wrap.classList.toggle("is-live", self.isActive),
        });
      });

      // ── ۶) آمار و گالری: ورودِ ملایم ──
      q("[data-fx-fade]").forEach((el) => {
        gsap.from(el, {
          y: 40,
          opacity: 0,
          duration: 0.9,
          ease: "power3.out",
          scrollTrigger: { trigger: el, start: "top 90%", toggleActions: replay },
        });
      });
      const tiles = q("[data-fx-tile]");
      if (tiles.length) {
        const hiddenT = { opacity: 0, y: 50, scale: 0.85, rotate: 3 };
        gsap.set(tiles, hiddenT);
        ScrollTrigger.batch(tiles, {
          start: "top 92%",
          onEnter: (b) => gsap.to(b, { opacity: 1, y: 0, scale: 1, rotate: 0, duration: 0.9, ease: "back.out(1.3)", stagger: 0.08, overwrite: true }),
          onLeaveBack: (b) => gsap.to(b, { ...hiddenT, duration: 0.35, overwrite: true }),
        });
      }

      // فونت و عکس‌ها که لود شدند، جای شروع/پایانِ همه‌ی محرک‌ها را دوباره حساب کن
      const refresh = () => ScrollTrigger.refresh();
      window.addEventListener("load", refresh);
      document.fonts?.ready.then(refresh).catch(() => {});
      return () => window.removeEventListener("load", refresh);
    });

    return () => mm.revert();
  }, []);

  return null;
}
