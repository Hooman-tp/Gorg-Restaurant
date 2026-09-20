"use client";

import { useEffect, useRef, useState } from "react";
import { ScrollTrigger } from "@/lib/gsap";
import { useGsap } from "@/hooks/useGsap";
import { useCart } from "@/context/CartContext";
import { ingredientLabels } from "@/lib/ingredientLabels";
import { getItemById } from "@/lib/menuData";
import IngredientLabelCard from "./IngredientLabelCard";
import FrameSequencePlayer, { FrameSequenceHandle } from "./FrameSequencePlayer";

const MOBILE_BREAKPOINT = 768;

const DESKTOP_FRAMES = { count: 100, prefix: "/video/frames/frame_", reach: 36 };
const MOBILE_FRAMES = { count: 100, prefix: "/video/frames-mobile/frame_", reach: 27 };

// برچسب‌های شیشه‌ای مواد تشکیل‌دهنده برای «فیلم قدیمی» کالیبره شده بودند
// (همان فریمِ باز/اکسپلود‌شده‌ی همبرگر که هر ماده در ارتفاع مشخصی می‌ایستاد).
// فیلم جدید چنین نمای بازشده‌ای ندارد، پس فعلاً این لایه رندر نمی‌شود
// (پایین‌تر، رندر IngredientLabelCard غیرفعال شده) تا برچسب‌ها روی جای
// اشتباهی از تصویر ننشینند. توابع/ثابت‌های زیر برای برگرداندنِ راحت‌تر
// این قابلیت نگه داشته شده‌اند.
const LABEL_FADE_IN_END = 0.06;
const LABEL_HOLD_END = 0.22;
const LABEL_FADE_OUT_END = 0.4;

function labelOpacityForProgress(p: number) {
  if (p < LABEL_FADE_IN_END) return p / LABEL_FADE_IN_END;
  if (p < LABEL_HOLD_END) return 1;
  if (p < LABEL_FADE_OUT_END) return 1 - (p - LABEL_HOLD_END) / (LABEL_FADE_OUT_END - LABEL_HOLD_END);
  return 0;
}

export default function FireStoryShowcase() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const pinnedRef = useRef<HTMLDivElement>(null);
  const playerRef = useRef<FrameSequenceHandle>(null);
  const labelRefs = useRef<(HTMLDivElement | null)[]>([]);
  const [showCta, setShowCta] = useState(false);
  const [device, setDevice] = useState<"desktop" | "mobile" | null>(null);
  const { addItem } = useCart();
  // آیتم منو که دکمه‌ی زیر انیمیشن به سبد اضافه می‌کند
  const heroItem = getItemById("bg-1");

  // تشخیص دستگاه فقط سمت کلاینت انجام می‌شود (window در SSR وجود ندارد).
  // این همگام‌سازی با محیط مرورگر است، نه state مشتق‌شده.
  // فیلم موبایل عمودی (۹:۱۶) است و فیلم دسکتاپ افقی؛ پس صفحه‌ی عمودی
  // (موبایل یا تبلتِ ایستاده) فیلم موبایل می‌گیرد و صفحه‌ی افقی فیلم دسکتاپ.
  // با چرخاندن گوشی هم فیلم مناسبِ جهتِ جدید انتخاب می‌شود.
  useEffect(() => {
    const detect = (): "desktop" | "mobile" =>
      window.innerWidth < MOBILE_BREAKPOINT || window.innerHeight > window.innerWidth ? "mobile" : "desktop";

    // eslint-disable-next-line react-hooks/set-state-in-effect
    setDevice(detect());

    const onResize = () => setDevice((prev) => {
      const next = detect();
      return next === prev ? prev : next;
    });
    window.addEventListener("resize", onResize);
    window.addEventListener("orientationchange", onResize);
    return () => {
      window.removeEventListener("resize", onResize);
      window.removeEventListener("orientationchange", onResize);
    };
  }, []);

  useGsap(() => {
    if (!sectionRef.current || !pinnedRef.current) return;

    const existing = ScrollTrigger.getById("fire-story");
    existing?.kill();

    ScrollTrigger.create({
      id: "fire-story",
      trigger: sectionRef.current,
      start: "top top",
      end: "bottom bottom",
      scrub: 1.6,
      pin: pinnedRef.current,
      onUpdate: (self) => {
        playerRef.current?.setProgress(self.progress);

        const opacity = labelOpacityForProgress(self.progress);
        labelRefs.current.forEach((el) => {
          if (el) el.style.opacity = String(opacity);
        });

        setShowCta(self.progress > 0.9);
      },
    });
  }, []);

  const frameSet = device === "mobile" ? MOBILE_FRAMES : DESKTOP_FRAMES;

  return (
    <section ref={sectionRef} className="relative" style={{ height: "520vh" }}>
      {/* ارتفاع 100svh (با h-screen به‌عنوان پشتیبان): روی موبایل ارتفاعِ «قابل‌دیدنِ» صفحه را می‌گیرد، پس دکمه‌ی پایین زیر نوار مرورگر نمی‌رود */}
      <div
        ref={pinnedRef}
        className="relative h-screen w-full overflow-hidden bg-[var(--color-ink)]"
        style={{ height: "100svh" }}
      >
        {/*
          موبایل: فیلمِ عمودی (۹:۱۶) با fit="cover" کل صفحه‌ی گوشی را پر می‌کند
          (روی گوشی‌های بلند فقط چند درصد از کناره‌ها بریده می‌شود).
          دسکتاپ: فیلم افقیِ قبلی، بدون تغییر.
        */}
        {device && (
          <FrameSequencePlayer
            key={device}
            ref={playerRef}
            frameCount={frameSet.count}
            framePrefix={frameSet.prefix}
            fit="cover"
          />
        )}

        {/*
          برچسب‌های شیشه‌ای مواد تشکیل‌دهنده فعلاً غیرفعال است: این برچسب‌ها
          روی فریمِ «باز/اکسپلودشده»‌ی فیلم قبلی کالیبره شده بودند و فیلم
          جدید چنین نمایی ندارد. اگر فیلمی با نمای مشابه (لایه‌های همبرگر
          جدا از هم) در اختیار بود، می‌شود موقعیت‌های ingredientLabels.ts
          را دوباره کالیبره کرد و بلوک زیر را باز کرد.
        */}
        {false && device && (
          <div className="absolute inset-0">
            {ingredientLabels.map((label, i) => (
              <IngredientLabelCard
                key={label.id}
                ref={(el) => { labelRefs.current[i] = el; }}
                reachPercent={frameSet.reach}
                label={{
                  id: label.id,
                  name: label.name,
                  detail: label.detail,
                  side: label.side,
                  topPercent: device === "mobile" ? label.topPercentMobile : label.topPercentDesktop,
                }}
              />
            ))}
          </div>
        )}

        {/* محو شدن لبه‌ی بالا (همان حالت لبه‌ی پایین) تا خط سخت بین هیرو و فیلم دیده نشود */}
        <div className="absolute inset-x-0 top-0 h-40 bg-gradient-to-b from-[var(--color-ink)] via-[var(--color-ink)]/40 to-transparent pointer-events-none" />
        <div className="absolute inset-x-0 bottom-0 h-40 bg-gradient-to-t from-[var(--color-ink)] via-[var(--color-ink)]/40 to-transparent pointer-events-none" />

        <div className="pointer-events-none absolute top-16 sm:top-20 inset-x-0 text-center px-5">
          <span className="text-xs tracking-[0.3em] text-[var(--color-ember-light)] uppercase">Gorg Burger</span>
        </div>

        <div
          className="absolute bottom-6 inset-x-0 flex justify-center transition-opacity duration-500"
          style={{ opacity: showCta ? 1 : 0, pointerEvents: showCta ? "auto" : "none" }}
        >
          {heroItem && (
            <button
              onClick={() => addItem({ id: heroItem.id, name: heroItem.name, price: heroItem.price })}
              className="btn-primary"
            >
              افزودن {heroItem.name} به سبد
            </button>
          )}
        </div>
      </div>
    </section>
  );
}
