import Link from "next/link";
import Image from "next/image";
import { categories, getSignatureItems } from "@/lib/menuData";
import { dishImages } from "@/lib/images";
import DishCard from "@/components/DishCard";

const CATEGORY_ICONS: Record<string, string> = {
  grill: "🔥",
  fastfood: "🍔",
  iranian: "🍚",
  italian: "🍝",
  drinks: "🥤",
};

const GALLERY_TEASER = [
  dishImages.interior1,
  dishImages.steak,
  dishImages.pizza,
  dishImages.iranianRice,
  dishImages.pasta,
  dishImages.interior2,
];

export default function HomePage() {
  const signatureDishes = getSignatureItems().slice(0, 6);

  return (
    <>
      {/* ─────────────── هیرو ─────────────── */}
      <section className="brand-texture relative min-h-[92vh] flex items-center pt-24">
        <div className="max-w-6xl mx-auto px-5 w-full">
          <div className="max-w-2xl fade-up">
            <div className="flex items-center gap-3 mb-6">
              <Image src="/images/gorg-mark.png" alt="" width={56} height={56} aria-hidden="true" />
              <span className="text-xs tracking-[0.3em] text-[var(--color-ash)] uppercase">
                Trust Your Instinct
              </span>
            </div>
            <h1 className="text-5xl sm:text-6xl font-black leading-tight mb-5">
              گرگ
            </h1>
            <p className="text-xl sm:text-2xl font-bold text-[var(--color-bone)] mb-4">
              به غریزه‌ات اعتماد کن.
            </p>
            <p className="text-[var(--color-ash)] leading-8 mb-8 max-w-lg">
              گریل و استیک روی زغال، فست‌فود سنگین، طعم آشنای غذای ایرانی و
              فیوژن ایتالیایی؛ چهار دنیای طعم، زیر یک سقف، برای هر شب هفته.
            </p>
            <div className="flex flex-wrap items-center gap-4">
              <Link href="/menu" className="btn-primary">
                مشاهده منو کامل
              </Link>
              <Link href="/contact" className="btn-outline">
                تماس با گرگ
              </Link>
            </div>
          </div>
        </div>

        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 hidden sm:flex flex-col items-center gap-2 text-[var(--color-ash)]">
          <span className="text-[11px] tracking-widest">اسکرول کنید</span>
          <span className="w-[1px] h-8 bg-gradient-to-b from-[var(--color-ember)] to-transparent" />
        </div>
      </section>

      {/* ─────────────── معرفی کوتاه ─────────────── */}
      <section className="max-w-4xl mx-auto px-5 py-24 text-center">
        <div className="claw-divider mx-auto mb-6" aria-hidden="true" />
        <p className="text-lg sm:text-xl leading-9 text-[var(--color-bone)]/90">
          گرگ جایی‌ست برای وقتی که واقعاً گرسنه‌اید؛ نه گرسنه‌ی خوردن، گرسنه‌ی
          طعم. آشپزخانه‌ی ما بین چهار سبک متفاوت رفت‌وآمد می‌کند تا هر بار که
          می‌آیید، دقیقاً همان چیزی را پیدا کنید که امشب دلتان می‌خواهد.
        </p>
        <Link
          href="/about"
          className="inline-block mt-6 text-sm font-bold text-[var(--color-ember-light)] hover:underline"
        >
          داستان گرگ را بخوانید ←
        </Link>
      </section>

      {/* ─────────────── چهار دنیای طعم ─────────────── */}
      <section className="max-w-6xl mx-auto px-5 pb-24">
        <h2 className="text-2xl font-extrabold mb-2">چهار دنیای طعم</h2>
        <p className="text-[var(--color-ash)] mb-8 text-sm">
          هر بخش از منوی گرگ، دنیای طعم خودش را دارد.
        </p>
        <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
          {categories.map((cat) => (
            <Link
              key={cat.id}
              href={`/menu#${cat.id}`}
              className="gorg-card rounded-2xl p-5 flex flex-col items-center text-center gap-2"
            >
              <span className="text-3xl" aria-hidden="true">
                {CATEGORY_ICONS[cat.id]}
              </span>
              <span className="font-bold text-sm">{cat.label}</span>
              <span className="text-xs text-[var(--color-ash)] leading-5">{cat.blurb}</span>
            </Link>
          ))}
        </div>
      </section>

      {/* ─────────────── پیشنهاد گرگ ─────────────── */}
      <section className="max-w-6xl mx-auto px-5 pb-24">
        <div className="flex items-end justify-between mb-8">
          <div>
            <h2 className="text-2xl font-extrabold mb-2">پیشنهاد گرگ</h2>
            <p className="text-[var(--color-ash)] text-sm">پرطرفدارترین‌های آشپزخانه</p>
          </div>
          <Link href="/menu" className="text-sm font-bold text-[var(--color-ember-light)] hover:underline hidden sm:block">
            مشاهده منو کامل ←
          </Link>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {signatureDishes.map((item) => (
            <DishCard key={item.id} item={item} />
          ))}
        </div>
      </section>

      {/* ─────────────── نوار آمار اعتماد ─────────────── */}
      <section className="border-y border-white/8 bg-[var(--color-charcoal)]">
        <div className="max-w-6xl mx-auto px-5 py-10 grid grid-cols-3 gap-4 text-center">
          <div>
            <p className="text-3xl font-black text-[var(--color-ember-light)]">۴.۸</p>
            <p className="text-xs text-[var(--color-ash)] mt-1">امتیاز مشتریان</p>
          </div>
          <div>
            <p className="text-3xl font-black text-[var(--color-ember-light)]">+۵۰۰۰</p>
            <p className="text-xs text-[var(--color-ash)] mt-1">مشتری همیشگی</p>
          </div>
          <div>
            <p className="text-3xl font-black text-[var(--color-ember-light)]">۲۹</p>
            <p className="text-xs text-[var(--color-ash)] mt-1">پرس در منو</p>
          </div>
        </div>
      </section>

      {/* ─────────────── گالری تیزر ─────────────── */}
      <section className="max-w-6xl mx-auto px-5 py-24">
        <div className="flex items-end justify-between mb-8">
          <h2 className="text-2xl font-extrabold">فضای گرگ</h2>
          <Link href="/gallery" className="text-sm font-bold text-[var(--color-ember-light)] hover:underline">
            گالری کامل ←
          </Link>
        </div>
        <div className="grid grid-cols-3 md:grid-cols-6 gap-3">
          {GALLERY_TEASER.map((src, i) => (
            <Link
              href="/gallery"
              key={i}
              className="relative aspect-square rounded-xl overflow-hidden gorg-card"
            >
              <Image src={src} alt="فضای رستوران گرگ" fill sizes="200px" className="object-cover" />
            </Link>
          ))}
        </div>
      </section>

      {/* ─────────────── CTA پایانی ─────────────── */}
      <section className="brand-texture-soft py-24 text-center">
        <div className="max-w-2xl mx-auto px-5">
          <h2 className="text-3xl sm:text-4xl font-black mb-4">گرسنه‌اید؟</h2>
          <p className="text-[var(--color-ash)] mb-8">
            به غریزه‌تون گوش بدید. همین حالا سفارش بدید یا میز رزرو کنید.
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <Link href="/menu" className="btn-primary ember-pulse">
              سفارش آنلاین
            </Link>
            <Link href="/contact" className="btn-outline">
              اطلاعات تماس
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
