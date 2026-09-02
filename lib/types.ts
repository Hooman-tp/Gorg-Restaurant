export type MenuCategoryId = "grill" | "fastfood" | "iranian" | "italian" | "drinks";

export interface MenuItem {
  id: string;
  category: MenuCategoryId;
  name: string;
  description: string;
  price: number; // به تومان
  image?: string;
  tags?: string[];
  spicy?: boolean;
  signature?: boolean;
}

export interface CartLine {
  id: string;
  name: string;
  price: number;
  qty: number;
}
