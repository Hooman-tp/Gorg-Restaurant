import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { spaceImages } from "@/lib/images";

export const metadata: Metadata = {
  title: "درباره گرگ",
  description: "داستان رستوران گرگ؛ از یک غریزه‌ی ساده تا آشپزخانه‌ای برای برگر، بریسکت و نشویل.",
};

export default function AboutPage() {
  return (
    <div className="pb-24">
      {/* ─────────────── بنر داستان گرگ: عکس هم‌عرض صفحه، متن وسط آن ─────────────── */}
      <section className="relative w-full overflow-hidden flex items-center justify-center min-h-[520px] md:min-h-[560px] px-4 sm:px-5 pt-24 pb-12 sm:pb-14 mb-14">
        <Image
          src="/images/gorg-poster-full.jpg"
          alt="پوستر برند گرگ - به غریزه‌ات اعتماد کن"
          fill
          priority
          sizes="100vw"
          className="object-cover"
          style={{ objectPosition: "50% 38%" }}
        />

        {/* تیره‌کردن عکس تا متن همیشه خوانا باشد؛ لبه‌ی پایین در پس‌زمینه‌ی سایت حل می‌شود */}
        <div
          aria-hidden="true"
          className="absolute inset-0"
          style={{
            background:
              "radial-gradient(ellipse at center, rgba(13,4,3,0.22) 0%, rgba(13,4,3,0.5) 60%, rgba(13,4,3,0.86) 100%)",
          }}
        />
        <div
          aria-hidden="true"
          className="absolute inset-x-0 bottom-0 h-28"
          style={{ background: "linear-gradient(to top, var(--color-ink), transparent)" }}
        />

        <div
          className="relative z-10 w-full max-w-3xl text-center rounded-3xl border border-white/10 px-5 py-8 sm:px-12 sm:py-11"
          style={{
            background: "linear-gradient(180deg, rgba(26,11,9,0.5) 0%, rgba(13,4,3,0.66) 100%)",
            backdropFilter: "blur(6px)",
            WebkitBackdropFilter: "blur(6px)",
            boxShadow: "0 0 90px rgba(221,74,52,0.16), inset 0 1px 0 rgba(255,255,255,0.06)",
          }}
        >
          <Image
            src="/images/gorg-claw.png"
            alt=""
            width={197}
            height={240}
            aria-hidden="true"
            className="mx-auto mb-4 h-14 w-auto"
          />
          <span className="block text-xs tracking-[0.35em] text-[var(--color-ember-light)] uppercase mb-3">
            About
          </span>
          <h1
            className="text-3xl sm:text-5xl font-black mb-5"
            style={{ textShadow: "0 0 42px rgba(221,74,52,0.5)" }}
          >
            داستان گرگ
          </h1>
          <div
            aria-hidden="true"
            className="mx-auto mb-6 h-px w-44"
            style={{
              background: "linear-gradient(to left, transparent, var(--color-ember), transparent)",
            }}
          />
          <p className="text-[var(--color-bone)] text-[15px] leading-8 sm:text-lg sm:leading-9 mb-4">
            گرگ از یک سؤال ساده شروع شد: چرا برای یک برگر خوب، یک ساندویچ
            بریسکت درست‌وحسابی و یک مرغ سوخاری نشویل باید سراغ سه جای مختلف
            برویم؟ آشپزخانه‌ی ما تصمیم گرفت همه‌ی این‌ها را زیر یک سقف جمع کند
            و به غریزه اعتماد کند؛ همان چیزی که هر شب به‌مان می‌گوید امشب دلمان
            چه می‌خواهد.
          </p>
          <p className="text-[var(--color-bone)]/70 text-sm leading-7 sm:text-base sm:leading-8">
            از گرگ ۱ تا بریسکت کلاسیک، از بال تند آتیشی تا نشویل هات فرایز؛
            هر پرس در گرگ با همان دقتی آماده می‌شود که یک شکارچی صرف می‌کند،
            چه شکار، برگر باشد چه بریسکت.
          </p>
        </div>
      </section>

      <div className="max-w-5xl mx-auto px-5 grid grid-cols-1 sm:grid-cols-3 gap-6 mb-20">
        <div className="gorg-card rounded-2xl p-6 text-center">
          <p className="text-3xl mb-3" aria-hidden="true">🔥</p>
          <h3 className="font-bold mb-2">طعم‌های جسور</h3>
          <p className="text-sm text-[var(--color-ash)] leading-6">
            بال‌های آتیشی، نشویل هات و برگرهای پرمایه؛ برای وقتی که غریزه طعم
            غلیظ می‌خواهد.
          </p>
        </div>
        <div className="gorg-card rounded-2xl p-6 text-center">
          <p className="text-3xl mb-3" aria-hidden="true">🧑‍🍳</p>
          <h3 className="font-bold mb-2">یک آشپزخانه، یک تیم</h3>
          <p className="text-sm text-[var(--color-ash)] leading-6">
            همه‌ی غذاها زیر یک سقف و با یک استاندارد آماده می‌شوند تا کیفیت هر
            بار یکسان باشد.
          </p>
        </div>
        <div className="gorg-card rounded-2xl p-6 text-center">
          <p className="text-3xl mb-3" aria-hidden="true">🌙</p>
          <h3 className="font-bold mb-2">باز تا نیمه‌شب</h3>
          <p className="text-sm text-[var(--color-ash)] leading-6">
            هر روز هفته از ساعت ۱۲:۰۰ الی ۲۴:۰۰، برای وقتی که گرسنگی زمان نمی‌شناسد.
          </p>
        </div>
      </div>

      <div className="max-w-4xl mx-auto px-5">
        <div className="relative rounded-3xl overflow-hidden gorg-card grid grid-cols-1 sm:grid-cols-2">
          <div className="relative aspect-[4/3] sm:aspect-auto">
            <Image src={spaceImages.interior1} alt="فضای رستوران گرگ" fill sizes="400px" className="object-cover" />
          </div>
          <div className="p-8 flex flex-col justify-center">
            <h3 className="font-extrabold text-xl mb-3">بیایید به شکار خوش‌مزگی</h3>
            <p className="text-sm text-[var(--color-ash)] leading-7 mb-6">
              یک میز رزرو کنید یا مستقیم از منو سفارش بدهید. تیم گرگ منتظرتان
              است.
            </p>
            <div className="flex flex-wrap gap-3">
              <Link href="/menu" className="btn-primary text-sm">
                مشاهده منو
              </Link>
              <Link href="/contact" className="btn-outline text-sm">
                تماس با ما
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
