import { NextRequest } from "next/server";
import { adminOnly, int, json, readBody, str } from "@/lib/adminApi";
import { deactivateInventoryItem, listInventory, moveStock, saveInventoryItem, setRecipe } from "@/lib/inventory";

export const GET = adminOnly(async () => json(await listInventory()));

interface Body {
  action?: string;
  item?: Record<string, unknown>;
  id?: number;
  kind?: string;
  qty?: unknown;
  note?: string;
  menuItemId?: string;
  rows?: { inventoryItemId?: unknown; qty?: unknown }[];
}

const dec = (v: unknown) => {
  const n = Number(v);
  return Number.isFinite(n) ? n : 0;
};

export const POST = adminOnly(async (req: NextRequest) => {
  const b = await readBody<Body>(req);
  switch (b.action) {
    case "saveItem": {
      const it = b.item ?? {};
      const name = str(it.name, 120);
      if (!name) return json({ error: "نام کالا را وارد کنید" }, 400);
      const id = await saveInventoryItem({
        id: it.id ? int(it.id) : undefined,
        name,
        unit: str(it.unit, 20) || "عدد",
        stock: dec(it.stock),
        minStock: dec(it.minStock),
        unitCost: int(it.unitCost),
      });
      return json({ ok: true, id });
    }
    case "deleteItem": {
      if (!b.id) return json({ error: "درخواست نامعتبر" }, 400);
      await deactivateInventoryItem(int(b.id));
      return json({ ok: true });
    }
    case "move": {
      const kind = b.kind;
      if (!b.id || (kind !== "in" && kind !== "out" && kind !== "waste" && kind !== "adjust")) return json({ error: "درخواست نامعتبر" }, 400);
      await moveStock(int(b.id), kind, dec(b.qty), b.note);
      return json({ ok: true });
    }
    case "setRecipe": {
      if (!b.menuItemId) return json({ error: "درخواست نامعتبر" }, 400);
      await setRecipe(
        b.menuItemId,
        (b.rows ?? []).map((r) => ({ inventoryItemId: int(r.inventoryItemId), qty: dec(r.qty) }))
      );
      return json({ ok: true });
    }
    default:
      return json({ error: "عملیات نامعتبر" }, 400);
  }
});
