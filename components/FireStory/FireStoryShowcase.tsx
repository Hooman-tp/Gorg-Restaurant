"use client";

import { useEffect, useRef, useState } from "react";
import { useCart } from "@/context/CartContext";
import { ingredientLabels } from "@/lib/ingredientLabels";
import { getItemById } from "@/lib/menuData";
import IngredientLabelCard from "./IngredientLabelCard";
import FrameSequencePlayer, { FrameSequenceHandle } from "./FrameSequencePlayer";

const MOBILE_BREAKPOINT = 768;

// تعداد واقعی فریم‌ها ۹۹ تاست (frame_001 تا frame_099). قبلاً ۱۰۰ نوشته شده بود
// و فریم صدم همیشه ۴۰۴ می‌داد.
const DESKTOP_FRAMES = { count: 99, prefix: "/video/frames/frame_", reach: 36 };
const MOBILE_FRAMES = { count: 99, prefix: "/video/frames-mobile/frame_", reach: 27 };

// ─────────────── سرعت انیمیشن ───────────────
// طولِ اسکرولِ این بخش («۶۰۰svh» موبایل و «۵۰۰svh» دسکتاپ) در globals.css،
// کلاس .fire-story تنظیم می‌شود. عدد بزرگ‌تر = انیمیشن کندتر و سینمایی‌تر.
//
// نرمیِ حرکت (ثانیه): فریمِ نمایش‌داده‌شده با این ثابتِ زمانی به موقعیتِ واقعیِ
// اسکرول می‌رسد، پس وقتی انگشت را برمی‌دارید یا اسکرول می‌ایستد، تصویر
// ناگهان فریز نمی‌شود و آرام می‌نشیند. عدد بزرگ‌تر = نرم‌تر ولی کمی «سنگین‌تر».
// روی دسکتاپ خودِ Lenis هم نرم‌سازی می‌کند، پس عدد کوچک‌تری لازم است.
const SMOOTH_TAU_TOUCH = 0.14;
const SMOOTH_TAU_DESKTOP = 0.07;

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

  // پیشرفتِ انیمیشن از روی موقعیتِ واقعیِ بخش در صفحه خوانده می‌شود و یک
  // حلقه‌ی requestAnimationFrame آن را نرم می‌کند و به پخش‌کننده می‌دهد.
  //
  // «پین» با position: sticky (CSS) انجام می‌شود، نه با پین‌ِ GSAP. پینِ GSAP
  // روی iOS بین fixed/absolute جابه‌جا می‌شد و با اسکرولِ بومیِ آیفون همگام
  // نبود؛ همین لرزش/پرش (تیکه‌تیکه‌شدن) را می‌ساخت. sticky را خودِ مرورگر
  // روی GPU و بدون هیچ جاوااسکریپتی نگه می‌دارد.
  useEffect(() => {
    const section = sectionRef.current;
    const pinned = pinnedRef.current;
    if (!section || !pinned) return;

    const finePointer = window.matchMedia("(hover: hover) and (pointer: fine)").matches;
    const tau = finePointer ? SMOOTH_TAU_DESKTOP : SMOOTH_TAU_TOUCH;

    let raf = 0;
    let last = 0;
    let current = -1; // -1 یعنی هنوز مقداردهی نشده؛ اولین بار مستقیم می‌پرد
    let cta = false;

    // ۰ = بالای بخش به بالای صفحه رسیده، ۱ = پین‌شدن تمام شده
    const readTarget = () => {
      const rect = section.getBoundingClientRect();
      const distance = rect.height - pinned.offsetHeight;
      return distance > 0 ? Math.min(1, Math.max(0, -rect.top / distance)) : 0;
    };

    const tick = (now: number) => {
      raf = 0;
      const dt = last ? Math.min(0.1, (now - last) / 1000) : 1 / 60;
      last = now;

      const target = readTarget();
      if (current < 0) current = target;

      // نرم‌سازیِ وابسته به زمان (نه به تعداد فریم‌های صفحه)، تا روی
      // گوشی‌های ۶۰ و ۱۲۰ هرتز حس یکسان باشد
      current += (target - current) * (1 - Math.exp(-dt / tau));
      if (Math.abs(target - current) < 0.00015) current = target;

      playerRef.current?.setProgress(current);

      const opacity = labelOpacityForProgress(current);
      labelRefs.current.forEach((el) => {
        if (el) el.style.opacity = String(opacity);
      });

      const nextCta = current > 0.9;
      if (nextCta !== cta) {
        cta = nextCta;
        setShowCta(nextCta);
      }

      // تا وقتی به موقعیت نهایی نرسیده‌ایم ادامه بده؛ بعدش حلقه کاملاً می‌خوابد
      if (current !== target) raf = requestAnimationFrame(tick);
      else last = 0;
    };

    const kick = () => {
      if (!raf) raf = requestAnimationFrame(tick);
    };

    window.addEventListener("scroll", kick, { passive: true });
    window.addEventListener("resize", kick);
    kick();

    return () => {
      window.removeEventListener("scroll", kick);
      window.removeEventListener("resize", kick);
      if (raf) cancelAnimationFrame(raf);
    };
    // با عوض‌شدنِ device پخش‌کننده دوباره ساخته می‌شود؛ این افکت هم باید
    // دوباره اجرا شود تا فریمِ درست فوراً رسم شود
  }, [device]);

  const frameSet = device === "mobile" ? MOBILE_FRAMES : DESKTOP_FRAMES;

  return (
    // طولِ اسکرول در globals.css (.fire-story) تعیین می‌شود تا با اولین رندر
    // درست باشد و بعد از تشخیص دستگاه، صفحه نپرد.
    <section ref={sectionRef} className="fire-story relative">
      {/* ارتفاع 100svh (با h-screen به‌عنوان پشتیبان): روی موبایل ارتفاعِ «قابل‌دیدنِ» صفحه را می‌گیرد، پس دکمه‌ی پایین زیر نوار مرورگر نمی‌رود */}
      <div
        ref={pinnedRef}
        className="sticky top-0 h-screen w-full overflow-hidden bg-[var(--color-ink)]"
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
