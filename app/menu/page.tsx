import type { Metadata } from "next";
import { getMenu, itemsByCategory } from "@/lib/menuStore";
import { dbQuery, isDbConfigured } from "@/lib/db";
import DishCard from "@/components/DishCard";
import MenuCategoryNav from "@/components/MenuCategoryNav";
import TableBanner from "@/components/TableBanner";

// منو از دیتابیس (پنل مدیریت) می‌آید؛ نباید در زمان build ثابت بماند
export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  title: "منو",
  description: "منوی کامل رستوران گرگ: پیش‌غذا، سالاد، برگر، بریسکت، نشویل و نوشیدنی.",
};

async function findTable(code: string | undefined) {
  if (!code || !isDbConfigured()) return null;
  try {
    const rows = await dbQuery("SELECT code, title FROM dining_tables WHERE code = $1 AND active = true", [code.slice(0, 20)]);
    return rows[0] ? { code: String(rows[0].code), title: String(rows[0].title ?? "") } : null;
  } catch {
    return null;
  }
}

export default async function MenuPage({ searchParams }: { searchParams: Promise<{ table?: string }> }) {
  const [menu, sp] = await Promise.all([getMenu(), searchParams]);
  const table = await findTable(sp.table);
  const sections = menu.categories.map((cat) => ({ cat, items: itemsByCategory(menu, cat.id) })).filter((s) => s.items.length > 0);

  return (
    <div className="max-w-6xl mx-auto px-5 pt-28 pb-24">
      {table && <TableBanner table={table} />}

      <div className="mb-10">
        <span className="text-xs tracking-[0.3em] text-[var(--color-ember-light)] uppercase">Menu</span>
        <h1 className="text-4xl font-black mt-3 mb-3">منوی گرگ</h1>
        <p className="text-[var(--color-ash)] max-w-xl">
          از بال و برگر تا بریسکت و نشویل. دسته‌ی مورد نظرتان را انتخاب
          کنید و مستقیم به سبد سفارش اضافه کنید.
        </p>
      </div>

      <MenuCategoryNav categories={sections.map((s) => s.cat)} />

      <div className="space-y-16">
        {sections.map(({ cat, items }) => (
          <section key={cat.id} id={cat.id} className="scroll-mt-32">
            <div className="mb-6">
              <h2 className="text-2xl font-extrabold">{cat.label}</h2>
              <p className="text-sm text-[var(--color-ash)] mt-1">{cat.blurb}</p>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
              {items.map((item) => (
                <DishCard key={item.id} item={item} />
              ))}
            </div>
          </section>
        ))}
      </div>
    </div>
  );
}
