import { MenuItem, MenuCategoryId } from "./types";

/**
 * کل منوی رستوران. برای ویرایش قیمت/نام/عکس همین فایل را عوض کنید.
 * عکس هر آیتم در public/images/menu است.
 * signature: true یعنی آیتم در بخش «پیشنهاد گرگ» صفحه‌ی اول نمایش داده می‌شود.
 */
export const categories: { id: MenuCategoryId; label: string; blurb: string }[] = [
  { id: "starters", label: "پیش‌غذا", blurb: "بال و سیب‌زمینی" },
  { id: "salad", label: "سالاد", blurb: "گوا کامالی" },
  { id: "burger", label: "برگر", blurb: "از کلاسیک تا گرگ ۱" },
  { id: "brisket", label: "بریسکت", blurb: "ساندویچ بریسکت و مرغ تنوری" },
  { id: "nashville", label: "نشویل", blurb: "مرغ سوخاری به سبک نشویل" },
  { id: "drinks", label: "نوشیدنی‌ها", blurb: "نوشابه، آب معدنی و آبجو" },
];

export const menuItems: MenuItem[] = [
  // ── پیش‌غذا ─────────────────────────────
  {
    id: "st-1",
    category: "starters",
    name: "بال نرمال",
    price: 640000,
    image: "/images/menu/wings-plain.jpg",
  },
  {
    id: "st-2",
    category: "starters",
    name: "بال نمکی",
    price: 640000,
    image: "/images/menu/wings-salty.jpg",
  },
  {
    id: "st-3",
    category: "starters",
    name: "بال تند و شیرین",
    price: 640000,
    image: "/images/menu/wings-sweet-spicy.jpg",
    spicy: true,
  },
  {
    id: "st-4",
    category: "starters",
    name: "بال تند آتیشی",
    price: 640000,
    image: "/images/menu/wings-fire.jpg",
    spicy: true,
    signature: true,
  },
  {
    id: "st-5",
    category: "starters",
    name: "سیب زمینی و فیله سوخاری",
    price: 690000,
    image: "/images/menu/fries-crispy-fillet.jpg",
    signature: true,
  },
  {
    id: "st-6",
    category: "starters",
    name: "سیب زمینی و گوشت",
    price: 780000,
    image: "/images/menu/fries-beef.jpg",
  },
  {
    id: "st-7",
    category: "starters",
    name: "سیب زمینی ادویه دار",
    price: 490000,
    image: "/images/menu/fries-spiced.jpg",
  },
  // ── سالاد ─────────────────────────────
  {
    id: "sa-1",
    category: "salad",
    name: "گوا کامالی",
    price: 680000,
    image: "/images/menu/salad-guacamole.jpg",
  },
  // ── برگر ─────────────────────────────
  {
    id: "bg-1",
    category: "burger",
    name: "گرگ ۱",
    price: 1990000,
    image: "/images/menu/burger-gorg-1.jpg",
    signature: true,
  },
  {
    id: "bg-2",
    category: "burger",
    name: "هالوپینو برگر",
    price: 1090000,
    image: "/images/menu/burger-jalapeno.jpg",
  },
  {
    id: "bg-3",
    category: "burger",
    name: "ماشروم برگر",
    price: 1080000,
    image: "/images/menu/burger-mushroom.jpg",
  },
  {
    id: "bg-4",
    category: "burger",
    name: "چیزبرگر",
    price: 990000,
    image: "/images/menu/burger-cheese.jpg",
  },
  {
    id: "bg-5",
    category: "burger",
    name: "کلاسیک برگر",
    price: 890000,
    image: "/images/menu/burger-classic.jpg",
  },
  // ── بریسکت ─────────────────────────────
  {
    id: "br-1",
    category: "brisket",
    name: "گرگ ۲",
    price: 1290000,
    image: "/images/menu/sandwich-gorg-2.jpg",
    signature: true,
  },
  {
    id: "br-2",
    category: "brisket",
    name: "چیکن تنوری",
    price: 740000,
    image: "/images/menu/sandwich-tandoori-chicken.jpg",
  },
  {
    id: "br-3",
    category: "brisket",
    name: "ماشروم بریسکت",
    price: 1440000,
    image: "/images/menu/brisket-mushroom.jpg",
  },
  {
    id: "br-4",
    category: "brisket",
    name: "چیز بریسکت",
    price: 1400000,
    image: "/images/menu/brisket-cheese.jpg",
  },
  {
    id: "br-5",
    category: "brisket",
    name: "بریسکت کلاسیک",
    price: 1350000,
    image: "/images/menu/brisket-classic.jpg",
    signature: true,
  },
  // ── نشویل ─────────────────────────────
  {
    id: "na-1",
    category: "nashville",
    name: "نشویل ۳ تیکه",
    price: 780000,
    image: "/images/menu/nashville-3-piece.jpg",
  },
  {
    id: "na-2",
    category: "nashville",
    name: "نشویل هانی رویال",
    price: 780000,
    image: "/images/menu/nashville-honey-royal.jpg",
    signature: true,
  },
  {
    id: "na-3",
    category: "nashville",
    name: "نشویل هات فرایز",
    price: 780000,
    image: "/images/menu/nashville-hot-fries.jpg",
    spicy: true,
  },
  // ── نوشیدنی‌ها ─────────────────────────────
  {
    id: "dr-1",
    category: "drinks",
    name: "آبجو کلاسیک روسی",
    price: 40000,
    image: "/images/menu/drink-beer-classic.jpg",
  },
  {
    id: "dr-2",
    category: "drinks",
    name: "آب معدنی",
    price: 35000,
    image: "/images/menu/drink-mineral-water.jpg",
  },
  {
    id: "dr-3",
    category: "drinks",
    name: "اسپرایت",
    price: 10000,
    image: "/images/menu/drink-sprite.jpg",
  },
  {
    id: "dr-4",
    category: "drinks",
    name: "فانتا",
    price: 10000,
    image: "/images/menu/drink-fanta.jpg",
  },
  {
    id: "dr-5",
    category: "drinks",
    name: "کوکاکولا زیرو",
    price: 10000,
    image: "/images/menu/drink-cola-zero.jpg",
  },
  {
    id: "dr-6",
    category: "drinks",
    name: "کوکاکولا",
    price: 10000,
    image: "/images/menu/drink-cola.jpg",
  },
];

export function getItemsByCategory(category: MenuCategoryId) {
  return menuItems.filter((item) => item.category === category);
}

export function getSignatureItems() {
  return menuItems.filter((item) => item.signature);
}

export function getItemById(id: string) {
  return menuItems.find((item) => item.id === id);
}
