/**
 * تصویر غذاها و نوشیدنی‌ها حالا فایل‌های محلی در public/images/menu هستند
 * (در lib/menuData.ts به هر آیتم وصل شده‌اند).
 *
 * تنها دو عکس فضای رستوران از Unsplash می‌آید (Unsplash License).
 */
function unsplash(id: string, w = 1600) {
  return `https://images.unsplash.com/${id}?w=${w}&q=80&auto=format&fit=crop`;
}

export const spaceImages = {
  interior1: unsplash("photo-1703793578040-07e1778b6b2c"),
  interior2: unsplash("photo-1687723547516-308ac9cefba9"),
};

export const brand = {
  mark: "/images/gorg-mark.png",
  markSquare: "/images/gorg-mark-square.png",
  texture: "/images/texture-red-clean.jpg",
  posterFull: "/images/gorg-poster-full.jpg",
  location: "/images/gorg-location.jpg",
};
