/**
 * منابع تصویر غذا/فضا. همه از Unsplash و تحت Unsplash License
 * (استفاده‌ی تجاری و غیرتجاری بدون نیاز به اجازه یا کردیت).
 * پارامترهای w/q/auto/fit برای بهینه‌سازی سایز اضافه شده‌اند.
 */
function unsplash(id: string, w = 1600) {
  return `https://images.unsplash.com/${id}?w=${w}&q=80&auto=format&fit=crop`;
}

export const dishImages = {
  steak: unsplash("photo-1615937722923-67f6deaf2cc9"),
  burger: unsplash("photo-1572802419224-296b0aeee0d9"),
  pizza: unsplash("photo-1762631176795-d500f0472051"),
  iranianRice: unsplash("photo-1626238328324-d55282264212"),
  iranianGrill: unsplash("photo-1555939594-58d7cb561ad1"),
  pasta: unsplash("photo-1555949258-eb67b1ef0ceb"),
  interior1: unsplash("photo-1703793578040-07e1778b6b2c"),
  interior2: unsplash("photo-1687723547516-308ac9cefba9"),
};

export const brand = {
  mark: "/images/gorg-mark.png",
  markSquare: "/images/gorg-mark-square.png",
  texture: "/images/texture-red-clean.jpg",
  posterFull: "/images/gorg-poster-full.jpg",
};
