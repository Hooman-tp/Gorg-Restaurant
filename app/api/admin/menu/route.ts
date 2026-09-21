import { NextRequest } from "next/server";
import { adminOnly, int, json, readBody, str } from "@/lib/adminApi";
import { deleteCategory, deleteMenuItem, getAdminMenu, moveInOrder, saveCategory, saveMenuItem, setItemFlag } from "@/lib/menuStore";

export const GET = adminOnly(async () => json(await getAdminMenu()));

interface Body {
  action?: string;
  id?: string;
  item?: Record<string, unknown>;
  category?: Record<string, unknown>;
  value?: boolean;
  flag?: string;
  dir?: number;
  kind?: string;
}

export const POST = adminOnly(async (req: NextRequest) => {
  const b = await readBody<Body>(req);
  switch (b.action) {
    case "saveItem": {
      const it = b.item ?? {};
      const name = str(it.name, 120);
      const category = str(it.category, 40);
      if (!name || !category) return json({ error: "نام و دسته‌ی آیتم را وارد کنید" }, 400);
      if (!(int(it.price) >= 0)) return json({ error: "قیمت معتبر نیست" }, 400);
      const id = await saveMenuItem({
        id: str(it.id, 40) || undefined,
        name,
        category,
        description: str(it.description, 600),
        price: int(it.price),
        discount: int(it.discount),
        image: str(it.image, 400),
        spicy: Boolean(it.spicy),
        signature: Boolean(it.signature),
        available: it.available !== false,
        active: it.active !== false,
        cost: int(it.cost),
      });
      return json({ ok: true, id });
    }
    case "flag": {
      if (!b.id || (b.flag !== "available" && b.flag !== "active")) return json({ error: "درخواست نامعتبر" }, 400);
      await setItemFlag(b.id, b.flag, Boolean(b.value));
      return json({ ok: true });
    }
    case "deleteItem": {
      if (!b.id) return json({ error: "درخواست نامعتبر" }, 400);
      await deleteMenuItem(b.id);
      return json({ ok: true });
    }
    case "saveCategory": {
      const c = b.category ?? {};
      const label = str(c.label, 80);
      if (!label) return json({ error: "نام دسته را وارد کنید" }, 400);
      const id = await saveCategory({ id: str(c.id, 40) || undefined, label, blurb: str(c.blurb, 200), active: c.active !== false });
      return json({ ok: true, id });
    }
    case "deleteCategory": {
      if (!b.id) return json({ error: "درخواست نامعتبر" }, 400);
      const ok = await deleteCategory(b.id);
      return ok ? json({ ok: true }) : json({ error: "این دسته هنوز آیتم دارد؛ اول آیتم‌ها را جابه‌جا یا حذف کنید" }, 400);
    }
    case "move": {
      if (!b.id || (b.kind !== "item" && b.kind !== "category") || (b.dir !== 1 && b.dir !== -1)) return json({ error: "درخواست نامعتبر" }, 400);
      await moveInOrder(b.kind, b.id, b.dir);
      return json({ ok: true });
    }
    default:
      return json({ error: "عملیات نامعتبر" }, 400);
  }
});
