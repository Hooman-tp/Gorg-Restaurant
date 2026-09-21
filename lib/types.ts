export type MenuCategoryId =
  | "starters"
  | "salad"
  | "burger"
  | "brisket"
  | "nashville"
  | "drinks";

export interface MenuItem {
  id: string;
  /** شناسه‌ی دسته (از پنل مدیریت می‌تواند دسته‌ی جدید ساخته شود، پس فقط رشته است) */
  category: string;
  name: string;
  description?: string;
  /** قیمتِ نهایی (بعد از تخفیف) به تومان؛ همین در سبد و پرداخت استفاده می‌شود */
  price: number;
  /** قیمتِ قبل از تخفیف (فقط وقتی تخفیف دارد) */
  basePrice?: number;
  /** درصد تخفیف ۰ تا ۹۰ */
  discount?: number;
  image?: string;
  tags?: string[];
  spicy?: boolean;
  signature?: boolean;
  /** false یعنی «ناموجود»: در منو دیده می‌شود ولی قابل سفارش نیست */
  available?: boolean;
}

export interface MenuCategory {
  id: string;
  label: string;
  blurb: string;
}

export interface CartLine {
  id: string;
  name: string;
  price: number;
  qty: number;
}
