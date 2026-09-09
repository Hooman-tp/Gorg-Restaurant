"use client";

import { useEffect, useRef, useState } from "react";
import { ScrollTrigger } from "@/lib/gsap";
import { useGsap } from "@/hooks/useGsap";
import { useCart } from "@/context/CartContext";
import { ingredientLabels } from "@/lib/ingredientLabels";
import IngredientLabelCard from "./IngredientLabelCard";
import FrameSequencePlayer, { FrameSequenceHandle } from "./FrameSequencePlayer";

const MOBILE_BREAKPOINT = 768;

const DESKTOP_FRAMES = { count: 100, prefix: "/video/frames/frame_", reach: 36 };
const MOBILE_FRAMES = { count: 100, prefix: "/video/frames-mobile/frame_", reach: 27 };

// آستانه‌های محو‌شدن برچسب‌ها، دقیقاً منطبق با زمان‌بندی خود فیلم:
// همبرگر از حدود ثانیه‌ی ۲ شروع به سرهم‌شدن می‌کند و حدود ثانیه‌ی ۳.۳ کامل می‌شود.
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

  // تشخیص دستگاه فقط سمت کلاینت انجام می‌شود (window در SSR وجود ندارد).
  // این همگام‌سازی با محیط مرورگر است، نه state مشتق‌شده، پس اجرای
  // setState یک‌باره در mount ضروری است.
  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setDevice(window.innerWidth < MOBILE_BREAKPOINT ? "mobile" : "desktop");
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
      scrub: 0.3,
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
    <section ref={sectionRef} className="relative" style={{ height: "240vh" }}>
      <div ref={pinnedRef} className="relative h-screen w-full overflow-hidden bg-[var(--color-ink)]">
        {device && (
          <FrameSequencePlayer ref={playerRef} frameCount={frameSet.count} framePrefix={frameSet.prefix} />
        )}

        {/* برچسب‌های شیشه‌ای مواد تشکیل‌دهنده، دقیقاً روی محل هر ماده در فریم باز‌شده */}
        {device && (
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

        <div className="absolute inset-x-0 bottom-0 h-40 bg-gradient-to-t from-[var(--color-ink)] via-[var(--color-ink)]/40 to-transparent pointer-events-none" />

        <div className="pointer-events-none absolute top-16 sm:top-20 inset-x-0 text-center px-5">
          <span className="text-xs tracking-[0.3em] text-[var(--color-ember-light)] uppercase">Gorg Burger</span>
        </div>

        <div
          className="absolute bottom-6 inset-x-0 flex justify-center transition-opacity duration-500"
          style={{ opacity: showCta ? 1 : 0, pointerEvents: showCta ? "auto" : "none" }}
        >
          <button
            onClick={() => addItem({ id: "ff-1", name: "برگر گرگ", price: 265000 })}
            className="btn-primary"
          >
            افزودن برگر گرگ به سبد
          </button>
        </div>
      </div>
    </section>
  );
}
