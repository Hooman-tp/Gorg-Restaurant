import type { Metadata } from "next";
import { categories, getItemsByCategory } from "@/lib/menuData";
import DishCard from "@/components/DishCard";
import MenuCategoryNav from "@/components/MenuCategoryNav";

export const metadata: Metadata = {
  title: "منو",
  description: "منوی کامل رستوران گرگ: گریل و کباب، فست‌فود، ایرانی، ایتالیایی و نوشیدنی.",
};

export default function MenuPage() {
  return (
    <div className="max-w-6xl mx-auto px-5 pt-28 pb-24">
      <div className="mb-10">
        <span className="text-xs tracking-[0.3em] text-[var(--color-ember-light)] uppercase">Menu</span>
        <h1 className="text-4xl font-black mt-3 mb-3">منوی گرگ</h1>
        <p className="text-[var(--color-ash)] max-w-xl">
          از روی زغال تا آشپزخانه‌ی ایتالیایی. دسته‌ی مورد نظرتان را انتخاب
          کنید و مستقیم به سبد سفارش اضافه کنید.
        </p>
      </div>

      <MenuCategoryNav />

      <div className="space-y-16">
        {categories.map((cat) => (
          <section key={cat.id} id={cat.id} className="scroll-mt-32">
            <div className="mb-6">
              <h2 className="text-2xl font-extrabold">{cat.label}</h2>
              <p className="text-sm text-[var(--color-ash)] mt-1">{cat.blurb}</p>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
              {getItemsByCategory(cat.id).map((item) => (
                <DishCard key={item.id} item={item} />
              ))}
            </div>
          </section>
        ))}
      </div>
    </div>
  );
}
