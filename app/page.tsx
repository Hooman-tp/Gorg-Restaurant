import Link from "next/link";
import Image from "next/image";
import { getMenu } from "@/lib/menuStore";
import { getGalleryPhotos } from "@/lib/gallery";
import DishCard from "@/components/DishCard";
import FireStoryShowcase from "@/components/FireStory/FireStoryShowcase";
import InstallAppSection from "@/components/InstallAppSection";
import OrderButton from "@/components/OrderButton";
import FxTilt from "@/components/FxTilt";
import HomeScrollFX from "@/components/HomeScrollFX";

const CATEGORY_ICONS: Record<string, string> = {
  starters: "🍟",
  salad: "🥗",
  burger: "🍔",
  brisket: "🥪",
  nashville: "🍗",
  drinks: "🥤",
};

const INTRO =
  "گرگ جایی‌ست برای وقتی که واقعاً گرسنه‌اید؛ نه گرسنه‌ی خوردن، گرسنه‌ی طعم. از بال و برگر تا بریسکت و نشویل، هر بار که می‌آیید دقیقاً همان چیزی را پیدا می‌کنید که امشب دلتان می‌خواهد.";

// جرقه‌های شناورِ پس‌زمینه‌ی «پیشنهاد گرگ» (ثابت، تا SSR و کلاینت یکی باشند)
const FX_EMBERS = [
  { l: "6%", s: 4, d: "0s", t: "9s", x: "30px" },
  { l: "15%", s: 3, d: "2.4s", t: "11s", x: "-24px" },
  { l: "27%", s: 5, d: "1s", t: "10s", x: "26px" },
  { l: "38%", s: 3, d: "4.2s", t: "12s", x: "-18px" },
  { l: "49%", s: 4, d: "0.6s", t: "9.5s", x: "22px" },
  { l: "58%", s: 3, d: "3.3s", t: "11.5s", x: "-30px" },
  { l: "67%", s: 5, d: "1.8s", t: "10.5s", x: "16px" },
  { l: "76%", s: 3, d: "5s", t: "12.5s", x: "-22px" },
  { l: "84%", s: 4, d: "0.3s", t: "9.8s", x: "28px" },
  { l: "92%", s: 3, d: "2.9s", t: "11.2s", x: "-16px" },
  { l: "97%", s: 4, d: "4.6s", t: "10.2s", x: "-26px" },
  { l: "33%", s: 3, d: "6.2s", t: "12.2s", x: "20px" },
];

// منو و گالری از دیتابیس (پنل مدیریت) می‌آیند؛ نباید در زمان build ثابت بمانند
export const dynamic = "force-dynamic";

export default async function HomePage() {
  const [menu, galleryPhotos] = await Promise.all([getMenu(), getGalleryPhotos()]);
  // تیزر گالری: ۶ عکسِ اولِ گالری
  const GALLERY_TEASER = galleryPhotos.slice(0, 6);
  const categories = menu.categories.filter((c) => menu.items.some((i) => i.category === c.id));
  const signatureDishes = menu.items.filter((i) => i.signature).slice(0, 7);
  // آیتمِ دکمه‌ی زیر انیمیشنِ برگر: همان «bg-1»؛ اگر از منو حذف شده باشد اولین برگر
  const heroDish = menu.items.find((i) => i.id === "bg-1") ?? menu.items.find((i) => i.category === "burger");

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
              برگر، ساندویچ بریسکت، مرغ سوخاری نشویل، بال و سیب‌زمینی؛
              همه زیر یک سقف، برای هر شب هفته.
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

      {/* ─────────────── داستان آتش گرگ (ویدیوی کنترل‌شده با اسکرول) ─────────────── */}
      <FireStoryShowcase heroItem={heroDish && heroDish.available !== false ? { id: heroDish.id, name: heroDish.name, price: heroDish.price } : undefined} />

      {/* افکت‌های اسکرول بعد از فیلم (فقط انیمیشن می‌دهد، چیزی نمایش نمی‌دهد) */}
      <HomeScrollFX />

      {/* ─────────────── معرفی کوتاه ─────────────── */}
      <section className="max-w-4xl mx-auto px-5 py-24 text-center">
        <div data-fx-pop className="claw-divider mx-auto mb-6" aria-hidden="true" />
        <p className="text-lg sm:text-xl leading-9 text-[var(--color-bone)]">
          {INTRO.split(" ").map((w, i) => (
            <span key={i}>
              <span data-fx-word className="inline-block">{w}</span>{" "}
            </span>
          ))}
        </p>
        <Link
          data-fx-fade
          href="/about"
          className="inline-block mt-6 text-sm font-bold text-[var(--color-ember-light)] hover:underline"
        >
          داستان گرگ را بخوانید ←
        </Link>
      </section>

      {/* ─────────────── دسته‌های منو ─────────────── */}
      <div className="relative overflow-x-clip">
        <div data-fx-blob data-speed="18" className="fx-blob -top-24 -right-40" aria-hidden="true" />
        <div data-fx-blob data-speed="26" className="fx-blob bottom-0 -left-56" aria-hidden="true" />
        <section className="relative max-w-6xl mx-auto px-5 pb-24">
          <div data-fx-head className="mb-8">
            <div className="overflow-hidden pb-2">
              <h2 data-fx-h className="text-2xl sm:text-3xl font-extrabold">دسته‌های منو</h2>
            </div>
            <span data-fx-rule className="fx-rule my-3" aria-hidden="true" />
            <p data-fx-sub className="text-[var(--color-ash)] text-sm">
              هر بخش از منوی گرگ را جداگانه ببینید.
            </p>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
            {categories.map((cat) => (
              <div key={cat.id} data-fx-cat className="h-full">
                <FxTilt
                  as="link"
                  href={`/menu#${cat.id}`}
                  max={10}
                  className="cat-card gorg-card rounded-2xl p-5 flex flex-col items-center text-center gap-2 h-full"
                >
                  <span className="cat-icon text-3xl" aria-hidden="true">
                    {CATEGORY_ICONS[cat.id] ?? "🍽️"}
                  </span>
                  <span className="cat-label font-bold text-sm">{cat.label}</span>
                  <span className="text-xs text-[var(--color-ash)] leading-5">{cat.blurb}</span>
                  <span className="cat-bar" aria-hidden="true" />
                </FxTilt>
              </div>
            ))}
          </div>
        </section>
      </div>

      <div data-fx-line className="fx-divider-line max-w-4xl mx-auto" aria-hidden="true" />

      {/* ─────────────── پیشنهاد گرگ ─────────────── */}
      <div className="relative overflow-x-clip pt-24">
        <div data-fx-bgword className="fx-bgword" aria-hidden="true">GORG</div>
        <div data-fx-blob data-speed="22" className="fx-blob top-40 -left-48" aria-hidden="true" />
        <div data-fx-blob data-speed="30" className="fx-blob bottom-10 -right-52" aria-hidden="true" />
        <div data-fx-embers className="fx-embers" aria-hidden="true">
          {FX_EMBERS.map((e, i) => (
            <i key={i} style={{ "--l": e.l, "--s": `${e.s}px`, "--d": e.d, "--t": e.t, "--x": e.x } as React.CSSProperties} />
          ))}
        </div>
        <section className="relative max-w-6xl mx-auto px-5 pb-24">
          <div className="flex items-end justify-between mb-8">
            <div data-fx-head>
              <div className="overflow-hidden pb-2">
                <h2 data-fx-h className="text-2xl sm:text-3xl font-extrabold">پیشنهاد گرگ</h2>
              </div>
              <span data-fx-rule className="fx-rule my-3" aria-hidden="true" />
              <p data-fx-sub className="text-[var(--color-ash)] text-sm">چند انتخاب از منوی گرگ</p>
            </div>
            <Link href="/menu" className="text-sm font-bold text-[var(--color-ember-light)] hover:underline hidden sm:block">
              مشاهده منو کامل ←
            </Link>
          </div>
          <div data-fx-dish-grid className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {signatureDishes.map((item) => (
              <DishCard key={item.id} item={item} />
            ))}
          </div>
        </section>
      </div>

      {/* ─────────────── نوار آمار اعتماد ─────────────── */}
      <section className="border-y border-white/8 bg-[var(--color-charcoal)]">
        <div data-fx-fade className="max-w-6xl mx-auto px-5 py-10 grid grid-cols-3 gap-4 text-center">
          <div>
            <p className="text-3xl font-black text-[var(--color-ember-light)]">۴.۸</p>
            <p className="text-xs text-[var(--color-ash)] mt-1">امتیاز مشتریان</p>
          </div>
          <div>
            <p className="text-3xl font-black text-[var(--color-ember-light)]">+۵۰۰۰</p>
            <p className="text-xs text-[var(--color-ash)] mt-1">مشتری همیشگی</p>
          </div>
          <div>
            <p className="text-3xl font-black text-[var(--color-ember-light)]">
              {menu.items.length.toLocaleString("fa-IR")}
            </p>
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
          {GALLERY_TEASER.map((photo, i) => (
            <Link
              data-fx-tile
              href="/gallery"
              key={i}
              className="gallery-tile relative aspect-[4/5] rounded-xl overflow-hidden gorg-card"
            >
              <Image
                src={photo.src}
                alt={photo.alt}
                fill
                sizes="(max-width: 768px) 33vw, 190px"
                className="object-cover"
              />
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
            <OrderButton className="btn-primary ember-pulse">سفارش آنلاین</OrderButton>
            <Link href="/contact" className="btn-outline">
              اطلاعات تماس
            </Link>
          </div>
        </div>
      </section>

      {/* ─────────────── نصب اپلیکیشن ─────────────── */}
      <InstallAppSection />
    </>
  );
}
