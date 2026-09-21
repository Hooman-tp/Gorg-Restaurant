/**
 * گالریِ اولیه (فقط برای اولین‌بار). بار اولِ اجرا، همین لیست خودکار به
 * دیتابیس منتقل می‌شود؛ از آن به بعد گالری را از «پنل مدیریت ← گالری»
 * ویرایش کنید (نه این فایل) — همان‌جا می‌توانید عکس اضافه/حذف/جابه‌جا کنید.
 * (این فایل دقیقاً مثل lib/menuData.ts برای منو عمل می‌کند.)
 */
import { spaceImages } from "./images";

export interface GalleryPhoto {
  src: string;
  alt: string;
  width: number;
  height: number;
}

export const galleryPhotos: GalleryPhoto[] = [
  {
    src: "/images/gallery/gorg-platter.jpg",
    alt: "سینی ترکیبی گرگ: برگر، ساندویچ بریسکت، ساندویچ مرغ سوخاری و سیب‌زمینی",
    width: 1440,
    height: 1800,
  },
  {
    src: "/images/gallery/gorg-bite-the-bold.jpg",
    alt: "ساندویچ مرغ سوخاری گرگ، «Bite the bold»",
    width: 1440,
    height: 1919,
  },
  {
    src: "/images/gallery/gorg-brisket.jpg",
    alt: "ساندویچ بریسکت گرگ با آرگولا و سیب‌زمینی",
    width: 1440,
    height: 1800,
  },
  {
    src: "/images/gallery/gorg-taste-the-wild.jpg",
    alt: "ساندویچ بریسکت، سیب‌زمینی و کوکاکولا زیرو روی صندلی قرمز، «Taste the wild»",
    width: 1440,
    height: 1800,
  },
  {
    src: "/images/gallery/gorg-mushroom-burger.jpg",
    alt: "ماشروم برگر گرگ با سیب‌زمینی و کوکاکولا",
    width: 1179,
    height: 1504,
  },
  {
    src: "/images/gallery/gorg-nashville-bowl.jpg",
    alt: "مرغ سوخاری نشویل با سس پنیر روی سیب‌زمینی",
    width: 1440,
    height: 1800,
  },
  {
    src: "/images/gallery/gorg-nashville-honey-royal.jpg",
    alt: "ساندویچ نشویل هانی رویال گرگ با سیب‌زمینی",
    width: 1080,
    height: 1920,
  },
  {
    src: "/images/gallery/gorg-bite-into-the-wild.jpg",
    alt: "کیسه‌ی سفارش گرگ با ساندویچ نشویل، مرغ سوخاری و کوکاکولا، «Bite into the wild»",
    width: 1440,
    height: 1800,
  },
  {
    src: "/images/gallery/gorg-tenders-platter.jpg",
    alt: "استریپس مرغ سوخاری گرگ با نان، سس و سالاد کلم",
    width: 1440,
    height: 1800,
  },
  {
    src: "/images/gallery/gorg-nashville-sandwich-closeup.jpg",
    alt: "نمای نزدیک ساندویچ مرغ نشویل با کول‌اسلاو و سیب‌زمینی",
    width: 1440,
    height: 1800,
  },
  {
    src: "/images/gallery/gorg-tender-dip.jpg",
    alt: "استریپس مرغ سوخاری گرگ در سس پنیر",
    width: 1440,
    height: 1800,
  },
  {
    src: "/images/gallery/gorg-nashville-plate.jpg",
    alt: "ساندویچ مرغ نشویل با سیب‌زمینی سرخ‌شده روی میز سنگی",
    width: 1440,
    height: 1800,
  },
  // عکس‌های فضا (فعلاً از Unsplash). هر وقت عکس واقعیِ فضای گرگ داشتید،
  // این دو خط را با عکس خودتان عوض کنید.
  { src: spaceImages.interior1, alt: "فضای داخلی رستوران گرگ", width: 500, height: 650 },
  { src: spaceImages.interior2, alt: "فضای نشیمن رستوران گرگ", width: 500, height: 400 },
];
