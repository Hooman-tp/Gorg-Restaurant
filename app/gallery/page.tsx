import type { Metadata } from "next";
import { dishImages } from "@/lib/images";
import GalleryGrid from "@/components/GalleryGrid";

export const metadata: Metadata = {
  title: "گالری",
  description: "نمایی از فضا و غذاهای رستوران گرگ.",
};

const photos = [
  { src: dishImages.interior1, alt: "فضای داخلی رستوران گرگ" },
  { src: dishImages.grillSteakWine, alt: "استیک آنگوس گریل‌شده" },
  { src: dishImages.persianRiceOlives, alt: "باقالی‌پلو با ماهیچه" },
  { src: dishImages.pizzaPepperoni, alt: "پیتزای آتیشی" },
  { src: dishImages.interior2, alt: "فضای نشیمن رستوران گرگ" },
  { src: dishImages.pastaCreamy, alt: "پاستای آلفردو" },
  { src: dishImages.grillCharcoal, alt: "گریل روی زغال" },
  { src: dishImages.burgerGorg, alt: "برگر دوطبقه گرگ" },
  { src: dishImages.persianGrillTable, alt: "کباب و سبزیجات گریل‌شده" },
  { src: dishImages.lasagnaSauce, alt: "لازانیای گوشت" },
  { src: dishImages.caesarSalad, alt: "سالاد سزار" },
  { src: dishImages.hotdogCheese, alt: "هات‌داگ آلمانی" },
];

export default function GalleryPage() {
  return (
    <div className="max-w-6xl mx-auto px-5 pt-28 pb-24">
      <span className="text-xs tracking-[0.3em] text-[var(--color-ember-light)] uppercase">Gallery</span>
      <h1 className="text-4xl font-black mt-3 mb-3">گالری گرگ</h1>
      <p className="text-[var(--color-ash)] max-w-xl mb-10">
        نگاهی به فضا و غذاهای رستوران؛ برای دیدن نسخه‌ی بزرگ، روی هر تصویر
        کلیک کنید.
      </p>
      <GalleryGrid photos={photos} />
    </div>
  );
}
