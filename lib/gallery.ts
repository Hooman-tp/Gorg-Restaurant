/**
 * عکس‌های گالری (هم صفحه‌ی /gallery و هم تیزر صفحه‌ی اصلی از همین‌جا می‌آید).
 *
 * برای اضافه/حذف/جابه‌جا کردن عکس‌ها فقط همین فایل را ویرایش کنید:
 *  ۱) فایل عکس را در public/images/gallery بگذارید
 *  ۲) یک خط به آرایه‌ی زیر اضافه کنید (width و height = اندازه‌ی واقعیِ عکس به پیکسل)
 *
 * تیزر صفحه‌ی اصلی، ۶ عکسِ اولِ این لیست را نشان می‌دهد.
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
  // عکس‌های فضا (فعلاً از Unsplash). هر وقت عکس واقعیِ فضای گرگ داشتید،
  // این دو خط را با عکس خودتان عوض کنید.
  { src: spaceImages.interior1, alt: "فضای داخلی رستوران گرگ", width: 500, height: 650 },
  { src: spaceImages.interior2, alt: "فضای نشیمن رستوران گرگ", width: 500, height: 400 },
];
