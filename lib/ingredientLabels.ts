export type LabelSide = "left" | "right";

export interface IngredientLabel {
  id: string;
  name: string;
  detail: string;
  topPercent: number; // موقعیت عمودی، منطبق با جای هر ماده در فریم باز‌شده‌ی ویدیو
  side: LabelSide;
}

// از بالا به پایین، دقیقاً منطبق با ترتیب لایه‌های همبرگر در حالت باز‌شده‌ی ویدیو
export const ingredientLabels: IngredientLabel[] = [
  { id: "bun-top", name: "نان بالایی", detail: "کنجدی، تازه از فر", topPercent: 13, side: "right" },
  { id: "cheese", name: "پنیر چدار", detail: "آب‌شده روی گوشت داغ", topPercent: 31, side: "left" },
  { id: "patty", name: "گوشت", detail: "۱۰۰٪ گوساله، گریل‌شده", topPercent: 41, side: "right" },
  { id: "bacon", name: "بیکن", detail: "ترد و دودی", topPercent: 53, side: "left" },
  { id: "onion", name: "پیاز قرمز", detail: "تازه و برشی", topPercent: 61, side: "right" },
  { id: "tomato", name: "گوجه", detail: "تازه و آبدار", topPercent: 68, side: "left" },
  { id: "lettuce", name: "کاهو", detail: "ترد و خنک", topPercent: 78, side: "right" },
  { id: "bun-bottom", name: "نان پایینی", detail: "پایه‌ی نگه‌دارنده", topPercent: 90, side: "left" },
];
