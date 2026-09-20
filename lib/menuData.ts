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
    description: "بال مرغ ترد با سسی ملایم و بدون تندی، روی سیب‌زمینی سرخ‌کرده.",
    price: 640000,
    image: "/images/menu/wings-plain.jpg",
  },
  {
    id: "st-2",
    category: "starters",
    name: "بال نمکی",
    description: "بال مرغ با طعم نمکی و سس خامه‌ای، همراه سیب‌زمینی سرخ‌کرده و سبزی تازه.",
    price: 640000,
    image: "/images/menu/wings-salty.jpg",
  },
  {
    id: "st-3",
    category: "starters",
    name: "بال تند و شیرین",
    description: "بال مرغ لعاب‌خورده در سس تند و شیرین؛ ترکیبی که هم شیرین است و هم می‌سوزاند.",
    price: 640000,
    image: "/images/menu/wings-sweet-spicy.jpg",
    spicy: true,
  },
  {
    id: "st-4",
    category: "starters",
    name: "بال تند آتیشی",
    description: "بال مرغ با سس قرمز تند آتیشی. برای کسانی که تندی را جدی می‌گیرند.",
    price: 640000,
    image: "/images/menu/wings-fire.jpg",
    spicy: true,
    signature: true,
  },
  {
    id: "st-5",
    category: "starters",
    name: "سیب زمینی و فیله سوخاری",
    description: "فیله‌ی مرغ سوخاری ترد روی سیب‌زمینی سرخ‌کرده، با سس پنیری.",
    price: 690000,
    image: "/images/menu/fries-crispy-fillet.jpg",
    signature: true,
  },
  {
    id: "st-6",
    category: "starters",
    name: "سیب زمینی و گوشت",
    description: "سیب‌زمینی سرخ‌کرده با تکه‌های گوشت گریل‌شده و سس سبزیجات تازه.",
    price: 780000,
    image: "/images/menu/fries-beef.jpg",
  },
  {
    id: "st-7",
    category: "starters",
    name: "سیب زمینی ادویه دار",
    description: "سیب‌زمینی سرخ‌کرده‌ی ترد و طلایی با ادویه‌ی خوش‌عطر؛ ساده و همیشه خوب.",
    price: 490000,
    image: "/images/menu/fries-spiced.jpg",
  },
  // ── سالاد ─────────────────────────────
  {
    id: "sa-1",
    category: "salad",
    name: "گوا کامالی",
    description: "آووکادو، گوجه، پیاز قرمز و سبزی تازه؛ سبک و خنک، همراه خوبی برای غذاهای سنگین.",
    price: 680000,
    image: "/images/menu/salad-guacamole.jpg",
  },
  // ── برگر ─────────────────────────────
  {
    id: "bg-1",
    category: "burger",
    name: "گرگ ۱",
    description: "برگر اختصاصی گرگ: گوشت آبدار، پنیر ذوب‌شده و تکه‌های بریسکت روی آن. قدرتمندترین برگر منو.",
    price: 1990000,
    image: "/images/menu/burger-gorg-1.jpg",
    signature: true,
  },
  {
    id: "bg-2",
    category: "burger",
    name: "هالوپینو برگر",
    description: "برگر گوشت آبدار با هالوپینوی تند و ترش که هر لقمه را سرحال می‌کند.",
    price: 1090000,
    image: "/images/menu/burger-jalapeno.jpg",
  },
  {
    id: "bg-3",
    category: "burger",
    name: "ماشروم برگر",
    description: "برگر گوشت با قارچ تازه‌ی سرخ‌شده و پنیر ذوب‌شده روی نان برشته.",
    price: 1080000,
    image: "/images/menu/burger-mushroom.jpg",
  },
  {
    id: "bg-4",
    category: "burger",
    name: "چیزبرگر",
    description: "برگر گوشت با پنیر چدار ذوب‌شده روی نان برشته؛ همان چیزبرگر خالص.",
    price: 990000,
    image: "/images/menu/burger-cheese.jpg",
  },
  {
    id: "bg-5",
    category: "burger",
    name: "کلاسیک برگر",
    description: "برگر گوشت آبدار روی نان برشته. ساده، خالص و برای دوستداران طعم اصلی.",
    price: 890000,
    image: "/images/menu/burger-classic.jpg",
  },
  // ── بریسکت ─────────────────────────────
  {
    id: "br-1",
    category: "brisket",
    name: "گرگ ۲",
    description: "ساندویچ بریسکت اختصاصی گرگ: تکه‌های ضخیم و آبدار بریسکت میان دو تکه نان برشته.",
    price: 1290000,
    image: "/images/menu/sandwich-gorg-2.jpg",
    signature: true,
  },
  {
    id: "br-2",
    category: "brisket",
    name: "چیکن تنوری",
    description: "مرغ تنوری مزه‌دار با ریزسبزی تازه، روی نان باگت برشته.",
    price: 740000,
    image: "/images/menu/sandwich-tandoori-chicken.jpg",
  },
  {
    id: "br-3",
    category: "brisket",
    name: "ماشروم بریسکت",
    description: "بریسکت آبدار با قارچ تازه و آرگولا، روی نان برشته.",
    price: 1440000,
    image: "/images/menu/brisket-mushroom.jpg",
  },
  {
    id: "br-4",
    category: "brisket",
    name: "چیز بریسکت",
    description: "بریسکت با پنیر ذوب‌شده و آرگولا، روی نان برشته.",
    price: 1400000,
    image: "/images/menu/brisket-cheese.jpg",
  },
  {
    id: "br-5",
    category: "brisket",
    name: "بریسکت کلاسیک",
    description: "بریسکت آبدار با آرگولا و ریزسبزی روی نان برشته؛ طعم اصلی بریسکت.",
    price: 1350000,
    image: "/images/menu/brisket-classic.jpg",
    signature: true,
  },
  // ── نشویل ─────────────────────────────
  {
    id: "na-1",
    category: "nashville",
    name: "نشویل ۳ تیکه",
    description: "سه تکه مرغ سوخاری ترد به سبک نشویل، کنار سالاد کلم، ترشی خیار و سس.",
    price: 780000,
    image: "/images/menu/nashville-3-piece.jpg",
  },
  {
    id: "na-2",
    category: "nashville",
    name: "نشویل هانی رویال",
    description: "ساندویچ مرغ سوخاری ترد با سالاد کلم خامه‌ای و ترشی خیار؛ با رگه‌ای از عسل.",
    price: 780000,
    image: "/images/menu/nashville-honey-royal.jpg",
    signature: true,
  },
  {
    id: "na-3",
    category: "nashville",
    name: "نشویل هات فرایز",
    description: "ساندویچ مرغ سوخاری تند به سبک نشویل با سالاد کلم خنک، کنار سیب‌زمینی.",
    price: 780000,
    image: "/images/menu/nashville-hot-fries.jpg",
    spicy: true,
  },
  // ── نوشیدنی‌ها ─────────────────────────────
  {
    id: "dr-1",
    category: "drinks",
    name: "آبجو کلاسیک روسی",
    description: "آبجوی روسی بدون الکل با طعم کلاسیک؛ سرد سرو می‌شود.",
    price: 40000,
    image: "/images/menu/drink-beer-classic.jpg",
  },
  {
    id: "dr-2",
    category: "drinks",
    name: "آب معدنی",
    description: "آب معدنی خنک.",
    price: 35000,
    image: "/images/menu/drink-mineral-water.jpg",
  },
  {
    id: "dr-3",
    category: "drinks",
    name: "اسپرایت",
    description: "اسپرایت خنک و لیمویی، در قوطی.",
    price: 10000,
    image: "/images/menu/drink-sprite.jpg",
  },
  {
    id: "dr-4",
    category: "drinks",
    name: "فانتا",
    description: "فانتای پرتقالی خنک، در قوطی.",
    price: 10000,
    image: "/images/menu/drink-fanta.jpg",
  },
  {
    id: "dr-5",
    category: "drinks",
    name: "کوکاکولا زیرو",
    description: "کوکاکولا بدون قند، خنک و در قوطی.",
    price: 10000,
    image: "/images/menu/drink-cola-zero.jpg",
  },
  {
    id: "dr-6",
    category: "drinks",
    name: "کوکاکولا",
    description: "کوکاکولای کلاسیک، خنک و در قوطی؛ رفیق همیشگی برگر.",
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
