import { dbQuery, isDbConfigured, Row } from "./db";
import { categories as staticCategories, menuItems as staticItems } from "./menuData";
import { MenuCategory, MenuItem } from "./types";

/**
 * منوی رستوران. منبعِ اصلی دیتابیس است (پنل مدیریت آن را ویرایش می‌کند و سایت
 * همان را نشان می‌دهد). بار اول، منوی موجود در lib/menuData.ts به دیتابیس منتقل
 * می‌شود؛ اگر دیتابیس وصل نباشد یا خطا بدهد، همان فایل استاتیک نمایش داده می‌شود.
 */

export interface MenuData {
  categories: MenuCategory[];
  items: MenuItem[];
}

/** ردیفِ کامل برای پنل مدیریت */
export interface AdminMenuItem {
  id: string;
  category: string;
  name: string;
  description: string;
  price: number;
  discount: number;
  image: string;
  spicy: boolean;
  signature: boolean;
  available: boolean;
  active: boolean;
  sortOrder: number;
  cost: number;
}

export interface AdminMenuCategory extends MenuCategory {
  sortOrder: number;
  active: boolean;
}

export function effectivePrice(price: number, discount: number): number {
  const d = Math.min(90, Math.max(0, Math.round(discount || 0)));
  return d ? Math.round((price * (100 - d)) / 100) : price;
}

let cache: { at: number; value: MenuData } | null = null;
const TTL_MS = 8000;
let seedPromise: Promise<void> | null = null;

export function invalidateMenuCache() {
  cache = null;
}

/** اولین بار منوی استاتیک را وارد دیتابیس می‌کند (فقط یک‌بار؛ حتی اگر بعداً همه‌چیز پاک شود دوباره پر نمی‌شود) */
async function seedIfNeeded(): Promise<void> {
  if (!seedPromise) {
    seedPromise = (async () => {
      const done = await dbQuery("SELECT 1 FROM site_settings WHERE key = 'menu_seeded'");
      if (done.length > 0) return;
      const existing = await dbQuery("SELECT 1 FROM menu_items LIMIT 1");
      if (existing.length === 0) {
        let order = 0;
        for (const c of staticCategories) {
          await dbQuery(
            "INSERT INTO menu_categories (id, label, blurb, sort_order) VALUES ($1,$2,$3,$4) ON CONFLICT (id) DO NOTHING",
            [c.id, c.label, c.blurb, order++]
          );
        }
        order = 0;
        for (const it of staticItems) {
          await dbQuery(
            `INSERT INTO menu_items (id, category, name, description, price, image, spicy, signature, sort_order)
             VALUES ($1,$2,$3,$4,$5,$6,$7,$8,$9) ON CONFLICT (id) DO NOTHING`,
            [it.id, it.category, it.name, it.description ?? "", it.price, it.image ?? "", Boolean(it.spicy), Boolean(it.signature), order++]
          );
        }
      }
      await dbQuery("INSERT INTO site_settings (key, value) VALUES ('menu_seeded', '1') ON CONFLICT (key) DO NOTHING");
    })().catch((err) => {
      seedPromise = null;
      throw err;
    });
  }
  return seedPromise;
}

function toItem(r: Row): MenuItem {
  const price = Number(r.price);
  const discount = Number(r.discount) || 0;
  const final = effectivePrice(price, discount);
  return {
    id: String(r.id),
    category: String(r.category),
    name: String(r.name),
    description: r.description ? String(r.description) : undefined,
    price: final,
    basePrice: discount > 0 ? price : undefined,
    discount: discount > 0 ? discount : undefined,
    image: r.image ? String(r.image) : undefined,
    spicy: Boolean(r.spicy),
    signature: Boolean(r.signature),
    available: r.available !== false,
  };
}

function staticMenu(): MenuData {
  return {
    categories: staticCategories.map((c) => ({ id: c.id, label: c.label, blurb: c.blurb })),
    items: staticItems.map((i) => ({ ...i, available: true })),
  };
}

/** منوی قابل‌نمایش برای مشتری (آیتم‌های مخفی نمی‌آیند؛ «ناموجود»ها می‌آیند ولی available=false) */
export async function getMenu(opts: { fresh?: boolean } = {}): Promise<MenuData> {
  if (!isDbConfigured()) return staticMenu();
  if (!opts.fresh && cache && Date.now() - cache.at < TTL_MS) return cache.value;
  try {
    await seedIfNeeded();
    const [cats, items] = await Promise.all([
      dbQuery("SELECT id, label, blurb FROM menu_categories WHERE active = true ORDER BY sort_order, id"),
      dbQuery("SELECT * FROM menu_items WHERE active = true ORDER BY sort_order, id"),
    ]);
    const catIds = new Set(cats.map((c) => String(c.id)));
    const value: MenuData = {
      categories: cats.map((c) => ({ id: String(c.id), label: String(c.label), blurb: String(c.blurb ?? "") })),
      items: items.map(toItem).filter((i) => catIds.has(i.category)),
    };
    cache = { at: Date.now(), value };
    return value;
  } catch (err) {
    console.error("getMenu error؛ منوی استاتیک نمایش داده می‌شود", err);
    return cache?.value ?? staticMenu();
  }
}

export function itemsByCategory(menu: MenuData, categoryId: string): MenuItem[] {
  return menu.items.filter((i) => i.category === categoryId);
}

/** ── پنل مدیریت ── */

export async function getAdminMenu(): Promise<{ categories: AdminMenuCategory[]; items: AdminMenuItem[] }> {
  await seedIfNeeded();
  const [cats, items] = await Promise.all([
    dbQuery("SELECT * FROM menu_categories ORDER BY sort_order, id"),
    dbQuery("SELECT * FROM menu_items ORDER BY sort_order, id"),
  ]);
  return {
    categories: cats.map((c) => ({
      id: String(c.id),
      label: String(c.label),
      blurb: String(c.blurb ?? ""),
      sortOrder: Number(c.sort_order),
      active: Boolean(c.active),
    })),
    items: items.map((r) => ({
      id: String(r.id),
      category: String(r.category),
      name: String(r.name),
      description: String(r.description ?? ""),
      price: Number(r.price),
      discount: Number(r.discount) || 0,
      image: String(r.image ?? ""),
      spicy: Boolean(r.spicy),
      signature: Boolean(r.signature),
      available: Boolean(r.available),
      active: Boolean(r.active),
      sortOrder: Number(r.sort_order),
      cost: Number(r.cost) || 0,
    })),
  };
}

function newId(prefix: string): string {
  return `${prefix}-${Date.now().toString(36)}${Math.random().toString(36).slice(2, 5)}`;
}

export async function saveMenuItem(input: Partial<AdminMenuItem> & { name: string; category: string; price: number }): Promise<string> {
  await seedIfNeeded();
  const id = input.id && input.id.trim() ? input.id.trim() : newId("m");
  const price = Math.max(0, Math.round(Number(input.price) || 0));
  const discount = Math.min(90, Math.max(0, Math.round(Number(input.discount) || 0)));
  const cost = Math.max(0, Math.round(Number(input.cost) || 0));
  const exists = await dbQuery("SELECT 1 FROM menu_items WHERE id = $1", [id]);
  if (exists.length > 0) {
    await dbQuery(
      `UPDATE menu_items SET category=$2, name=$3, description=$4, price=$5, discount=$6, image=$7, spicy=$8,
         signature=$9, available=$10, active=$11, cost=$12, updated_at=now() WHERE id=$1`,
      [
        id,
        input.category,
        input.name.trim().slice(0, 120),
        (input.description ?? "").slice(0, 600),
        price,
        discount,
        input.image ?? "",
        Boolean(input.spicy),
        Boolean(input.signature),
        input.available !== false,
        input.active !== false,
        cost,
      ]
    );
  } else {
    const max = await dbQuery("SELECT COALESCE(MAX(sort_order), 0)::int AS m FROM menu_items");
    await dbQuery(
      `INSERT INTO menu_items (id, category, name, description, price, discount, image, spicy, signature, available, active, cost, sort_order)
       VALUES ($1,$2,$3,$4,$5,$6,$7,$8,$9,$10,$11,$12,$13)`,
      [
        id,
        input.category,
        input.name.trim().slice(0, 120),
        (input.description ?? "").slice(0, 600),
        price,
        discount,
        input.image ?? "",
        Boolean(input.spicy),
        Boolean(input.signature),
        input.available !== false,
        input.active !== false,
        cost,
        Number(max[0]?.m ?? 0) + 1,
      ]
    );
  }
  invalidateMenuCache();
  return id;
}

export async function setItemFlag(id: string, flag: "available" | "active", value: boolean) {
  await dbQuery(`UPDATE menu_items SET ${flag} = $2, updated_at = now() WHERE id = $1`, [id, value]);
  invalidateMenuCache();
}

export async function deleteMenuItem(id: string) {
  await dbQuery("DELETE FROM menu_items WHERE id = $1", [id]);
  await dbQuery("DELETE FROM recipes WHERE menu_item_id = $1", [id]);
  invalidateMenuCache();
}

export async function saveCategory(input: { id?: string; label: string; blurb?: string; active?: boolean }): Promise<string> {
  await seedIfNeeded();
  const label = input.label.trim().slice(0, 80);
  const blurb = (input.blurb ?? "").trim().slice(0, 200);
  const id = input.id && input.id.trim() ? input.id.trim() : newId("c");
  const exists = await dbQuery("SELECT 1 FROM menu_categories WHERE id = $1", [id]);
  if (exists.length > 0) {
    await dbQuery("UPDATE menu_categories SET label=$2, blurb=$3, active=$4 WHERE id=$1", [id, label, blurb, input.active !== false]);
  } else {
    const max = await dbQuery("SELECT COALESCE(MAX(sort_order), 0)::int AS m FROM menu_categories");
    await dbQuery("INSERT INTO menu_categories (id, label, blurb, sort_order, active) VALUES ($1,$2,$3,$4,$5)", [
      id,
      label,
      blurb,
      Number(max[0]?.m ?? 0) + 1,
      input.active !== false,
    ]);
  }
  invalidateMenuCache();
  return id;
}

export async function deleteCategory(id: string): Promise<boolean> {
  const used = await dbQuery("SELECT 1 FROM menu_items WHERE category = $1 LIMIT 1", [id]);
  if (used.length > 0) return false;
  await dbQuery("DELETE FROM menu_categories WHERE id = $1", [id]);
  invalidateMenuCache();
  return true;
}

/** جابه‌جایی ترتیبِ آیتم/دسته (بالا/پایین): ترتیبِ کل لیست دوباره شماره‌گذاری می‌شود */
export async function moveInOrder(kind: "item" | "category", id: string, dir: -1 | 1) {
  const table = kind === "item" ? "menu_items" : "menu_categories";
  const rows =
    kind === "item"
      ? await dbQuery("SELECT id FROM menu_items WHERE category = (SELECT category FROM menu_items WHERE id = $1) ORDER BY sort_order, id", [id])
      : await dbQuery("SELECT id FROM menu_categories ORDER BY sort_order, id");
  const ids = rows.map((r) => String(r.id));
  const i = ids.indexOf(id);
  const j = i + dir;
  if (i < 0 || j < 0 || j >= ids.length) return;
  [ids[i], ids[j]] = [ids[j], ids[i]];
  // شماره‌های sort_order همین گروه را دوباره پشت‌سرهم می‌گذاریم (با حفظ ترتیبِ سراسری)
  const base = await dbQuery(`SELECT COALESCE(MIN(sort_order), 0)::int AS m FROM ${table} WHERE id = ANY($1::text[])`, [ids]);
  const start = Number(base[0]?.m ?? 0);
  for (let k = 0; k < ids.length; k++) {
    await dbQuery(`UPDATE ${table} SET sort_order = $2 WHERE id = $1`, [ids[k], start + k]);
  }
  invalidateMenuCache();
}

/** عکسِ آپلودشده (base64) را نگه می‌دارد و مسیرِ قابل‌نمایش آن را برمی‌گرداند */
export async function saveMenuImage(mime: string, base64: string): Promise<string> {
  const id = `img-${Date.now().toString(36)}${Math.random().toString(36).slice(2, 6)}`;
  await dbQuery("INSERT INTO menu_images (id, mime, data) VALUES ($1,$2,$3)", [id, mime, base64]);
  return `/api/menu-image/${id}`;
}

export async function getMenuImage(id: string): Promise<{ mime: string; data: string } | null> {
  const rows = await dbQuery("SELECT mime, data FROM menu_images WHERE id = $1", [id]);
  return rows[0] ? { mime: String(rows[0].mime), data: String(rows[0].data) } : null;
}
