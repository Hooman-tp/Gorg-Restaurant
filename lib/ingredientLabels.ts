export type LabelSide = "left" | "right";

export interface IngredientLabel {
  id: string;
  name: string;
  detail: string;
  topPercentDesktop: number;
  topPercentMobile: number;
  side: LabelSide;
}

// از بالا به پایین، دقیقاً منطبق با ترتیب لایه‌های همبرگر در حالت باز‌شده.
// چون فیلم دسکتاپ (افقی) و موبایل (عمودی) دو منبع جدا هستند، محل هر ماده
// در هرکدام جدا کالیبره شده (با تحلیل پیکسلی فریم اول هر ویدیو).
export const ingredientLabels: IngredientLabel[] = [
  { id: "bun-top", name: "نان بالایی", detail: "کنجدی، تازه از فر", topPercentDesktop: 13, topPercentMobile: 27, side: "right" },
  { id: "cheese", name: "پنیر چدار", detail: "آب‌شده روی گوشت داغ", topPercentDesktop: 31, topPercentMobile: 36.5, side: "left" },
  { id: "patty", name: "گوشت", detail: "۱۰۰٪ گوساله، گریل‌شده", topPercentDesktop: 41, topPercentMobile: 41, side: "right" },
  { id: "bacon", name: "بیکن", detail: "ترد و دودی", topPercentDesktop: 53, topPercentMobile: 48, side: "left" },
  { id: "onion", name: "پیاز قرمز", detail: "تازه و برشی", topPercentDesktop: 61, topPercentMobile: 54, side: "right" },
  { id: "tomato", name: "گوجه", detail: "تازه و آبدار", topPercentDesktop: 68, topPercentMobile: 59, side: "left" },
  { id: "lettuce", name: "کاهو", detail: "ترد و خنک", topPercentDesktop: 78, topPercentMobile: 64, side: "right" },
  { id: "bun-bottom", name: "نان پایینی", detail: "پایه‌ی نگه‌دارنده", topPercentDesktop: 90, topPercentMobile: 72, side: "left" },
];
