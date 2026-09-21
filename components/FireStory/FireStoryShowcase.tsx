"use client";

import { useEffect, useRef, useState } from "react";
import { ScrollTrigger } from "@/lib/gsap";
import { useGsap } from "@/hooks/useGsap";
import { useCart } from "@/context/CartContext";
import { ingredientLabels } from "@/lib/ingredientLabels";
import IngredientLabelCard from "./IngredientLabelCard";
import FrameSequencePlayer, { FrameSequenceHandle } from "./FrameSequencePlayer";

const MOBILE_BREAKPOINT = 768;

// ═══════════════ نرمیِ «سینمایی» فیلم ═══════════════
// فیلم مستقیم به موقعیتِ اسکرول چسبیده نیست؛ یک «دنبال‌کننده‌ی فنری» بین
// این دو قرار دارد (SmoothDamp؛ همان الگوریتمِ Unity/بازی‌ها). فرقش با
// scrub/lerp این است که «سرعت» را هم نگه می‌دارد:
//  - شروعِ حرکت ناگهانی نیست و پایانش هم؛ با برداشتنِ انگشت یا ایستادنِ
//    چرخِ ماوس، فیلم با سرعتِ رو‌به‌کاهش چند لحظه‌ی دیگر ادامه می‌دهد؛
//  - هر «تقِ» ویل فقط یک ضربه‌ی کوچک به سرعت می‌زند و بینِ تق‌ها فیلم
//    نمی‌ایستد.
// عدد بزرگ‌تر = دنباله‌ی طولانی‌تر و سنگین‌تر/سینمایی‌تر (زمان بر حسب ثانیه).
// عدد کوچک‌تر = واکنشِ سریع‌تر. بازه‌ی منطقی: ۰٫۳ تا ۱٫۰
const SMOOTH_TIME = 0.6;

// دنبال‌کننده‌ی فنری بحرانی (critically damped). مقدار جدید و سرعتِ جدید را برمی‌گرداند.
function smoothDamp(current: number, target: number, velocity: number, smoothTime: number, dt: number): [number, number] {
  const omega = 2 / smoothTime;
  const x = omega * dt;
  const e = 1 / (1 + x + 0.48 * x * x + 0.235 * x * x * x);
  const change = current - target;
  const temp = (velocity + omega * change) * dt;
  const nextVelocity = (velocity - omega * temp) * e;
  const next = target + (change + temp) * e;
  return [next, nextVelocity];
}

const DESKTOP_FRAMES = { count: 300, prefix: "/video/frames/frame_", reach: 36 };
const MOBILE_FRAMES = { count: 300, prefix: "/video/frames-mobile/frame_", reach: 27 };

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

export default function FireStoryShowcase({ heroItem }: { heroItem?: { id: string; name: string; price: number } }) {
  const sectionRef = useRef<HTMLDivElement>(null);
  const playerRef = useRef<FrameSequenceHandle>(null);
  // پیشرفتِ واقعیِ اسکرول (هدف) / پیشرفتِ نمایش‌داده‌شده / سرعتِ آن
  const targetRef = useRef(0);
  const shownRef = useRef(0);
  const velocityRef = useRef(0);
  const rafRef = useRef<number | null>(null);
  const wakeRef = useRef<() => void>(() => {});
  const labelRefs = useRef<(HTMLDivElement | null)[]>([]);
  const [showCta, setShowCta] = useState(false);
  const [device, setDevice] = useState<"desktop" | "mobile" | null>(null);
  const { addItem } = useCart();
  // heroItem: آیتم منو که دکمه‌ی زیر انیمیشن به سبد اضافه می‌کند (از دیتابیسِ منو می‌آید)

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

  // حلقه‌ی دنبال‌کننده. فقط وقتی فیلم هنوز در حال حرکت است اجرا می‌شود و
  // به‌محض رسیدن به هدف خودش را خاموش می‌کند (روی موبایل باتری نمی‌خورد).
  useEffect(() => {
    let last = 0;

    const tick = (now: number) => {
      const dt = Math.min(0.05, Math.max(0.001, (now - last) / 1000));
      last = now;

      const target = targetRef.current;
      const [next, nextVelocity] = smoothDamp(shownRef.current, target, velocityRef.current, SMOOTH_TIME, dt);
      shownRef.current = Math.min(1, Math.max(0, next));
      velocityRef.current = nextVelocity;

      const settled = Math.abs(shownRef.current - target) < 0.00005 && Math.abs(velocityRef.current) < 0.0002;
      if (settled) {
        shownRef.current = target;
        velocityRef.current = 0;
      }

      playerRef.current?.setProgress(shownRef.current);

      const labelOpacity = String(labelOpacityForProgress(shownRef.current));
      labelRefs.current.forEach((el) => {
        if (el) el.style.opacity = labelOpacity;
      });

      setShowCta(shownRef.current > 0.9);

      rafRef.current = settled ? null : requestAnimationFrame(tick);
    };

    wakeRef.current = () => {
      if (rafRef.current !== null) return;
      last = performance.now();
      rafRef.current = requestAnimationFrame(tick);
    };

    return () => {
      if (rafRef.current !== null) cancelAnimationFrame(rafRef.current);
      rafRef.current = null;
      wakeRef.current = () => {};
    };
  }, []);

  useGsap(() => {
    if (!sectionRef.current) return;

    const existing = ScrollTrigger.getById("fire-story");
    existing?.kill();

    // نکته: اینجا دیگر نه pin داریم و نه scrub.
    //  - pin: قابِ فیلم با CSS «sticky» (کلاس sticky پایین) می‌چسبد. pin در
    //    GSAP روی موبایل با position:fixed کار می‌کند و وسطِ اسکرولِ لمسی
    //    (مخصوصاً iOS) لرزش/پرش می‌دهد و می‌تواند حرکتِ باقی‌مانده‌ی انگشت را
    //    ببُرد؛ sticky را خودِ مرورگر روی GPU انجام می‌دهد و اصلاً نمی‌لرزد.
    //  - scrub: نرمی حالا با دنبال‌کننده‌ی فنریِ بالا (SmoothDamp) انجام
    //    می‌شود که سرعت را حفظ می‌کند؛ scrub فقط یک تأخیرِ ساده بود.
    // طولِ مسیر همان قبلی است (۳۲۰vh منهای یک صفحه)، پس سرعتِ فیلم عوض نشده.
    ScrollTrigger.create({
      id: "fire-story",
      trigger: sectionRef.current,
      start: "top top",
      end: "bottom bottom",
      invalidateOnRefresh: true,
      onUpdate: (self) => {
        targetRef.current = self.progress;
        wakeRef.current();
      },
      // بعد از لودِ صفحه/تغییرِ اندازه (مثلاً باز کردنِ صفحه وسطِ اسکرول)
      // فیلم باید یک‌راست روی جای درست بنشیند، نه اینکه از فریمِ اول بدود.
      onRefresh: (self) => {
        targetRef.current = self.progress;
        shownRef.current = self.progress;
        velocityRef.current = 0;
        playerRef.current?.setProgress(self.progress);
      },
    });
  }, []);

  const frameSet = device === "mobile" ? MOBILE_FRAMES : DESKTOP_FRAMES;

  return (
    // این عدد = مسافتِ فیزیکیِ اسکرول لازم برای دیدنِ کل ۱۰۰ فریم.
    // ۵۲۰vh (بیش از ۵ صفحه‌ی کامل) باعث می‌شد روی موبایل هر سوایپ فقط
    // بخش خیلی کوچکی از انیمیشن را جلو ببرد و کل بخش «تمام‌نشدنی» و
    // بی‌واکنش حس شود. ۳۲۰vh هم‌چنان فضای کافی برای حرکتِ آرام و
    // سینمایی می‌دهد ولی خیلی زودتر جواب می‌دهد. عدد کاملاً دلخواه
    // است — بزرگ‌تر = کندتر/سینمایی‌تر، کوچک‌تر = سریع‌تر/فرزتر.
    <section ref={sectionRef} className="relative" style={{ height: "320vh" }}>
      {/* ارتفاع 100svh (با h-screen به‌عنوان پشتیبان): روی موبایل ارتفاعِ «قابل‌دیدنِ» صفحه را می‌گیرد، پس دکمه‌ی پایین زیر نوار مرورگر نمی‌رود */}
      <div
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
            onFirstFrameReady={() => {
              // پلیرِ تازه (اولین بار یا بعد از چرخاندنِ گوشی) از فریمِ اول شروع
              // می‌کند؛ همان لحظه به جای درستِ اسکرول برسانش.
              shownRef.current = targetRef.current;
              velocityRef.current = 0;
              playerRef.current?.setProgress(targetRef.current);
            }}
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
