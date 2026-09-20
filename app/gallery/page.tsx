import type { Metadata } from "next";
import { spaceImages } from "@/lib/images";
import { menuItems } from "@/lib/menuData";
import GalleryGrid from "@/components/GalleryGrid";

export const metadata: Metadata = {
  title: "گالری",
  description: "نمایی از فضا و غذاهای رستوران گرگ.",
};

// عکس غذاها از خود منو می‌آید (نوشیدنی‌ها در گالری نیستند)
const foodPhotos = menuItems
  .filter((item) => item.category !== "drinks" && item.image)
  .map((item) => ({ src: item.image as string, alt: item.name }));

const photos = [
  { src: spaceImages.interior1, alt: "فضای داخلی رستوران گرگ", width: 500, height: 650 },
  ...foodPhotos.slice(0, 7),
  { src: spaceImages.interior2, alt: "فضای نشیمن رستوران گرگ", width: 500, height: 400 },
  ...foodPhotos.slice(7),
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
