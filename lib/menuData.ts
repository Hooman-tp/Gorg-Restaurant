import { MenuItem, MenuCategoryId } from "./types";
import { dishImages } from "./images";

export const categories: { id: MenuCategoryId; label: string; blurb: string }[] = [
  { id: "grill", label: "گریل و کباب", blurb: "روی آتیش زغال، همون‌طوری که غریزه دوست داره" },
  { id: "fastfood", label: "فست‌فود", blurb: "برگر، پیتزا و ساندویچ‌های سنگین" },
  { id: "iranian", label: "ایرانی", blurb: "طعم‌های آشنای سفره‌ی خونه" },
  { id: "italian", label: "ایتالیایی و فیوژن", blurb: "پاستا، ریزوتو و ترکیب‌های مدرن" },
  { id: "drinks", label: "نوشیدنی‌ها", blurb: "برای همراهی وعده‌تون" },
];

export const menuItems: MenuItem[] = [
  // ── گریل و کباب ─────────────────────────────
  {
    id: "grill-1",
    category: "grill",
    name: "چنگالی مخصوص گرگ",
    description: "تکه‌های فیله گاو مزه‌دارشده با کره‌ی سیر و سماق، روی زغال",
    price: 620000,
    image: dishImages.grillSteakFlame,
    signature: true,
    tags: ["پرفروش"],
  },
  {
    id: "grill-2",
    category: "grill",
    name: "کوبیده درجه‌یک دونفره",
    description: "کوبیده گوشت گوسفندی و گوساله، دستی و چرخ‌درشت",
    price: 380000,
    image: dishImages.grillKababTray,
  },
  {
    id: "grill-3",
    category: "grill",
    name: "استیک راسته آنگوس",
    description: "با سس فلفل سیاه و پوره‌ی سیب‌زمینی دودی",
    price: 890000,
    image: dishImages.grillSteakWine,
    signature: true,
  },
  {
    id: "grill-4",
    category: "grill",
    name: "بال و ران زغالی",
    description: "با گلیز چیلی و عسل، سرو با سالاد کلم",
    price: 340000,
    image: dishImages.grillMeatTray,
    spicy: true,
  },
  {
    id: "grill-5",
    category: "grill",
    name: "جوجه چاقویی زعفرانی",
    description: "ران مرغ مزه‌دار شده با زعفران و لیموترش تازه",
    price: 310000,
    image: dishImages.grillPlateDark,
  },
  {
    id: "grill-6",
    category: "grill",
    name: "شیشلیک دنده گوسفندی",
    description: "دنده‌ی نازک گوسفندی، مزه‌دار با ادویه‌ی مخصوص گرگ",
    price: 720000,
    image: dishImages.grillCharcoal,
  },

  // ── فست‌فود ─────────────────────────────
  {
    id: "ff-1",
    category: "fastfood",
    name: "برگر گرگ",
    description: "دبل پتی گوشت گوساله، چدار دودی، سس مخصوص و پیاز کاراملی",
    price: 265000,
    image: dishImages.burgerGorg,
    signature: true,
    tags: ["پرفروش"],
  },
  {
    id: "ff-2",
    category: "fastfood",
    name: "پیتزا آتیشی گرگ",
    description: "پپرونی، فلفل هالوپینو و موزارلای اضافه",
    price: 310000,
    image: dishImages.pizzaPepperoni,
    spicy: true,
  },
  {
    id: "ff-3",
    category: "fastfood",
    name: "ساندویچ ریب‌آی چیزی",
    description: "ورقه‌های نازک راسته با چیز چدار مذاب و فلفل دلمه",
    price: 245000,
    image: dishImages.sandwichLettuce,
  },
  {
    id: "ff-4",
    category: "fastfood",
    name: "برگر مرغ کرانچی",
    description: "سینه‌ی مرغ سوخاری ترد با سس چیپوتله",
    price: 220000,
    image: dishImages.burgerFries,
  },
  {
    id: "ff-5",
    category: "fastfood",
    name: "سیب‌زمینی طلایی گرگ",
    description: "با سس پنیر دودی و پودر فلفل قرمز",
    price: 145000,
    image: dishImages.friesColaCup,
  },
  {
    id: "ff-6",
    category: "fastfood",
    name: "هات‌داگ دوبل آلمانی",
    description: "با پیاز کاراملی و سس مستارد تند",
    price: 195000,
    image: dishImages.hotdogCheese,
  },

  // ── ایرانی ─────────────────────────────
  {
    id: "ir-1",
    category: "iranian",
    name: "زرشک‌پلو با مرغ زعفرانی",
    description: "برنج ایرانی، زرشک تازه و ران مرغ زعفرانی",
    price: 280000,
    image: dishImages.persianSaffronRice,
    signature: true,
  },
  {
    id: "ir-2",
    category: "iranian",
    name: "قورمه‌سبزی خانگی",
    description: "با گوشت راسته، لوبیا قرمز و لیموعمانی",
    price: 260000,
    image: dishImages.persianStewSilver,
  },
  {
    id: "ir-3",
    category: "iranian",
    name: "باقالی‌پلو با ماهیچه",
    description: "ماهیچه‌ی گوسفندی آرام‌پز، برنج با باقالی و شوید",
    price: 480000,
    image: dishImages.persianRiceOlives,
    signature: true,
  },
  {
    id: "ir-4",
    category: "iranian",
    name: "فسنجان با مرغ",
    description: "سس گردو و انار اصیل، سرو با برنج زعفرانی",
    price: 320000,
    image: dishImages.persianPlateCloseup,
  },
  {
    id: "ir-5",
    category: "iranian",
    name: "ته‌چین مخصوص گرگ",
    description: "ته‌چین مرغ زعفرانی با لایه‌ی زرشک و بادام",
    price: 295000,
    image: dishImages.persianPlateTable,
  },
  {
    id: "ir-6",
    category: "iranian",
    name: "دیزی سنگی سنتی",
    description: "گوشت، نخود و لوبیا، آرام‌پز در دیزی سنگی",
    price: 260000,
    image: dishImages.persianCookedFood,
  },

  // ── ایتالیایی و فیوژن ─────────────────────────────
  {
    id: "it-1",
    category: "italian",
    name: "پاستا آلفردو با میگو گریل",
    description: "فتوچینی، سس آلفردو خامه‌ای و میگوی گریل‌شده",
    price: 340000,
    image: dishImages.pastaCreamy,
    signature: true,
  },
  {
    id: "it-2",
    category: "italian",
    name: "پنه آرابیاتا با مرغ دودی",
    description: "سس گوجه‌ی تند ایتالیایی و مرغ دودی",
    price: 275000,
    image: dishImages.pastaPeas,
    spicy: true,
  },
  {
    id: "it-3",
    category: "italian",
    name: "ریزوتوی قارچ و پارمزان",
    description: "برنج ایتالیایی، قارچ تازه و پارمزان اصل",
    price: 310000,
    image: dishImages.risottoPlate,
  },
  {
    id: "it-4",
    category: "italian",
    name: "لازانیای گوشت گرگ",
    description: "لایه‌های پاستا، سس بشامل و گوشت چرخ‌کرده",
    price: 300000,
    image: dishImages.lasagnaSauce,
  },
  {
    id: "it-5",
    category: "italian",
    name: "سالاد سزار با استیک مرغ",
    description: "کاهو رومی، پارمزان، نان سیر و سینه‌ی مرغ گریل",
    price: 210000,
    image: dishImages.caesarSalad,
  },
  {
    id: "it-6",
    category: "italian",
    name: "سوپ روز",
    description: "کرم گوجه یا جو، تازه و روزانه تهیه می‌شود",
    price: 95000,
    image: dishImages.soupBowls,
  },

  // ── نوشیدنی‌ها ─────────────────────────────
  {
    id: "dr-1",
    category: "drinks",
    name: "نوشابه گازدار",
    description: "کوکاکولا، فانتا یا اسپرایت",
    price: 45000,
    image: dishImages.sodaGlasses,
  },
  {
    id: "dr-2",
    category: "drinks",
    name: "دوغ سنتی گرگ",
    description: "دوغ خانگی با نعنای تازه",
    price: 40000,
    image: dishImages.plainDrinkGlass,
  },
  {
    id: "dr-3",
    category: "drinks",
    name: "موکتل زرشک و نعنا",
    description: "شربت زرشک، نعنا تازه و آب‌لیمو",
    price: 85000,
    image: dishImages.mocktailRosemary,
  },
  {
    id: "dr-4",
    category: "drinks",
    name: "آب‌میوه‌ی تازه فصل",
    description: "بر اساس میوه‌ی روز، بدون شکر افزوده",
    price: 95000,
    image: dishImages.freshJuiceCups,
  },
  {
    id: "dr-5",
    category: "drinks",
    name: "اسپرسو / چای سنتی",
    description: "اسپرسوی ایتالیایی یا چای دم‌کرده",
    price: 65000,
    image: dishImages.teaGlass,
  },
];

export function getItemsByCategory(category: MenuCategoryId) {
  return menuItems.filter((item) => item.category === category);
}

export function getSignatureItems() {
  return menuItems.filter((item) => item.signature);
}
