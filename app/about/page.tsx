import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { dishImages } from "@/lib/images";

export const metadata: Metadata = {
  title: "درباره گرگ",
  description: "داستان رستوران گرگ؛ از یک غریزه‌ی ساده تا آشپزخانه‌ای با چهار دنیای طعم.",
};

export default function AboutPage() {
  return (
    <div className="pt-28 pb-24">
      <div className="max-w-3xl mx-auto px-5 mb-16">
        <span className="text-xs tracking-[0.3em] text-[var(--color-ember-light)] uppercase">About</span>
        <h1 className="text-4xl font-black mt-3 mb-6">داستان گرگ</h1>
        <p className="text-[var(--color-bone)]/90 leading-9 mb-5">
          گرگ از یک سؤال ساده شروع شد: چرا باید بین گریل، فست‌فود، غذای ایرانی
          و ایتالیایی یکی را انتخاب کنیم؟ آشپزخانه‌ی ما تصمیم گرفت این مرزها
          را کنار بگذارد و به‌جایش، به غریزه اعتماد کند؛ همان چیزی که هر شب
          به‌مان می‌گوید امشب دلمان چه می‌خواهد.
        </p>
        <p className="text-[var(--color-ash)] leading-8">
          از استیک آنگوس روی زغال تا لازانیای خانگی، از کوبیده‌ی دستی تا
          پیتزای آتیشی؛ هر پرس در گرگ با همان دقتی پخته می‌شود که یک شکارچی
          صرف می‌کند، چه شکار، فیله باشد چه پاستا.
        </p>
      </div>

      <div className="max-w-4xl mx-auto px-5 mb-20">
        <div className="relative aspect-[4/5] sm:aspect-[16/9] rounded-3xl overflow-hidden gorg-card">
          <Image
            src="/images/gorg-poster-full.jpg"
            alt="پوستر برند گرگ - به غریزه‌ات اعتماد کن"
            fill
            sizes="(max-width: 768px) 100vw, 800px"
            className="object-cover"
          />
        </div>
      </div>

      <div className="max-w-5xl mx-auto px-5 grid grid-cols-1 sm:grid-cols-3 gap-6 mb-20">
        <div className="gorg-card rounded-2xl p-6 text-center">
          <p className="text-3xl mb-3" aria-hidden="true">🔥</p>
          <h3 className="font-bold mb-2">پخت روی آتش واقعی</h3>
          <p className="text-sm text-[var(--color-ash)] leading-6">
            گریل‌ها با زغال حرارت می‌گیرند، نه گاز؛ همان طعمی که غریزه دنبالش
            است.
          </p>
        </div>
        <div className="gorg-card rounded-2xl p-6 text-center">
          <p className="text-3xl mb-3" aria-hidden="true">🧑‍🍳</p>
          <h3 className="font-bold mb-2">چهار آشپزخانه، یک تیم</h3>
          <p className="text-sm text-[var(--color-ash)] leading-6">
            سرآشپزهای متخصص هر سبک، زیر یک سقف کار می‌کنند تا کیفیت همه‌جا
            یکسان باشد.
          </p>
        </div>
        <div className="gorg-card rounded-2xl p-6 text-center">
          <p className="text-3xl mb-3" aria-hidden="true">🌙</p>
          <h3 className="font-bold mb-2">باز تا پاسی از شب</h3>
          <p className="text-sm text-[var(--color-ash)] leading-6">
            هر روز هفته تا ۰۰:۳۰ بامداد، برای وقتی که گرسنگی زمان نمی‌شناسد.
          </p>
        </div>
      </div>

      <div className="max-w-4xl mx-auto px-5">
        <div className="relative rounded-3xl overflow-hidden gorg-card grid grid-cols-1 sm:grid-cols-2">
          <div className="relative aspect-[4/3] sm:aspect-auto">
            <Image src={dishImages.interior1} alt="فضای رستوران گرگ" fill sizes="400px" className="object-cover" />
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
