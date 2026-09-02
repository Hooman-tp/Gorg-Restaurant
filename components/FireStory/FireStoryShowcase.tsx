"use client";

import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import { ScrollTrigger } from "@/lib/gsap";
import { useGsap } from "@/hooks/useGsap";
import { useCart } from "@/context/CartContext";
import { ingredientLabels } from "@/lib/ingredientLabels";
import IngredientLabelCard from "./IngredientLabelCard";

// آستانه‌های محو‌شدن برچسب‌ها، دقیقاً منطبق با زمان‌بندی خود ویدیو:
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
  const videoRef = useRef<HTMLVideoElement>(null);
  const labelRefs = useRef<(HTMLDivElement | null)[]>([]);
  const [videoReady, setVideoReady] = useState(false);
  const [showCta, setShowCta] = useState(false);
  const { addItem } = useCart();

  // مطمئن می‌شویم مرورگر واقعاً متادیتای ویدیو (طول/فریم اول) را بارگذاری کند
  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;
    video.pause();
    video.load();
  }, []);

  useGsap(() => {
    if (!sectionRef.current || !pinnedRef.current) return;

    ScrollTrigger.create({
      trigger: sectionRef.current,
      start: "top top",
      end: "bottom bottom",
      scrub: 0.3,
      pin: pinnedRef.current,
      onUpdate: (self) => {
        const video = videoRef.current;
        if (video && video.readyState >= 1 && video.duration && !Number.isNaN(video.duration)) {
          const target = self.progress * video.duration;
          if (Math.abs(video.currentTime - target) > 0.02) {
            video.currentTime = target;
          }
        }

        const opacity = labelOpacityForProgress(self.progress);
        labelRefs.current.forEach((el) => {
          if (el) el.style.opacity = String(opacity);
        });

        setShowCta(self.progress > 0.9);
      },
    });
  }, []);

  return (
    <section ref={sectionRef} className="relative" style={{ height: "240vh" }}>
      <div ref={pinnedRef} className="relative h-screen w-full overflow-hidden bg-[var(--color-ink)]">
        {/* پوستر همیشه زیر ویدیوئه؛ تا وقتی فریم اول ویدیو آماده نشده دیده می‌شه */}
        <Image
          src="/video/gorg-burger-story-poster.jpg"
          alt="همبرگر گرگ از هم باز شده روی آتش"
          fill
          sizes="100vw"
          className="object-cover"
          style={{ opacity: videoReady ? 0 : 1, transition: "opacity 0.4s" }}
          priority
        />
        <video
          ref={videoRef}
          src="/video/gorg-burger-story.mp4"
          muted
          playsInline
          preload="auto"
          onLoadedData={() => setVideoReady(true)}
          className="absolute inset-0 w-full h-full object-cover"
          style={{ opacity: videoReady ? 1 : 0, transition: "opacity 0.4s" }}
        />

        {/* برچسب‌های شیشه‌ای مواد تشکیل‌دهنده، دقیقاً روی محل هر ماده در فریم باز‌شده */}
        <div className="absolute inset-0">
          {ingredientLabels.map((label, i) => (
            <IngredientLabelCard key={label.id} label={label} ref={(el) => { labelRefs.current[i] = el; }} />
          ))}
        </div>

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
