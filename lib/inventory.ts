import { dbQuery } from "./db";
import { CartLine } from "./types";

/** انبار: کالاها، گردش، دستورِ مصرف (recipe) و کم/زیاد شدن خودکار با سفارش */

export interface InventoryItem {
  id: number;
  name: string;
  unit: string;
  stock: number;
  minStock: number;
  unitCost: number;
}

export interface InventoryMove {
  id: number;
  itemId: number;
  itemName: string;
  unit: string;
  kind: string;
  delta: number;
  note: string | null;
  orderCode: string | null;
  createdAt: string;
}

export interface RecipeRow {
  menuItemId: string;
  inventoryItemId: number;
  qty: number;
}

const num = (v: unknown) => Number(v) || 0;

export async function listInventory() {
  const [items, moves, recipes] = await Promise.all([
    dbQuery("SELECT * FROM inventory_items WHERE active = true ORDER BY name"),
    dbQuery(
      `SELECT m.id, m.item_id, m.kind, m.delta, m.note, m.order_code, m.created_at, i.name, i.unit
       FROM inventory_moves m JOIN inventory_items i ON i.id = m.item_id
       ORDER BY m.created_at DESC, m.id DESC LIMIT 60`
    ),
    dbQuery("SELECT menu_item_id, inventory_item_id, qty FROM recipes"),
  ]);
  return {
    items: items.map(
      (r): InventoryItem => ({
        id: Number(r.id),
        name: String(r.name),
        unit: String(r.unit),
        stock: num(r.stock),
        minStock: num(r.min_stock),
        unitCost: num(r.unit_cost),
      })
    ),
    moves: moves.map(
      (r): InventoryMove => ({
        id: Number(r.id),
        itemId: Number(r.item_id),
        itemName: String(r.name),
        unit: String(r.unit),
        kind: String(r.kind),
        delta: num(r.delta),
        note: r.note ? String(r.note) : null,
        orderCode: r.order_code ? String(r.order_code) : null,
        createdAt: new Date(r.created_at).toISOString(),
      })
    ),
    recipes: recipes.map(
      (r): RecipeRow => ({ menuItemId: String(r.menu_item_id), inventoryItemId: Number(r.inventory_item_id), qty: num(r.qty) })
    ),
  };
}

export async function saveInventoryItem(input: {
  id?: number;
  name: string;
  unit: string;
  stock?: number;
  minStock: number;
  unitCost: number;
}): Promise<number> {
  const name = input.name.trim().slice(0, 120);
  const unit = (input.unit || "عدد").trim().slice(0, 20);
  const minStock = Math.max(0, num(input.minStock));
  const unitCost = Math.max(0, Math.round(num(input.unitCost)));
  if (input.id) {
    await dbQuery("UPDATE inventory_items SET name=$2, unit=$3, min_stock=$4, unit_cost=$5 WHERE id=$1", [input.id, name, unit, minStock, unitCost]);
    return input.id;
  }
  const stock = Math.max(0, num(input.stock));
  const rows = await dbQuery(
    "INSERT INTO inventory_items (name, unit, stock, min_stock, unit_cost) VALUES ($1,$2,$3,$4,$5) RETURNING id",
    [name, unit, stock, minStock, unitCost]
  );
  const id = Number(rows[0].id);
  if (stock > 0) {
    await dbQuery("INSERT INTO inventory_moves (item_id, kind, delta, note) VALUES ($1,'in',$2,'موجودی اولیه')", [id, stock]);
  }
  return id;
}

export async function deactivateInventoryItem(id: number) {
  await dbQuery("UPDATE inventory_items SET active = false WHERE id = $1", [id]);
  await dbQuery("DELETE FROM recipes WHERE inventory_item_id = $1", [id]);
}

/**
 * in ورود · out خروج · waste ضایعات · adjust = موجودیِ شمارش‌شده (مقدار را مستقیم روی موجودی می‌گذارد)
 */
export async function moveStock(itemId: number, kind: "in" | "out" | "waste" | "adjust", qty: number, note?: string) {
  const q = num(qty);
  if (!(q >= 0)) throw new Error("مقدار نامعتبر است");
  if (kind !== "adjust" && q === 0) throw new Error("مقدار باید بیشتر از صفر باشد");
  const cur = await dbQuery("SELECT stock FROM inventory_items WHERE id = $1", [itemId]);
  if (!cur[0]) throw new Error("کالا پیدا نشد");
  const before = num(cur[0].stock);
  const delta = kind === "in" ? q : kind === "adjust" ? q - before : -q;
  await dbQuery("UPDATE inventory_items SET stock = stock + $2 WHERE id = $1", [itemId, delta]);
  await dbQuery("INSERT INTO inventory_moves (item_id, kind, delta, note) VALUES ($1,$2,$3,$4)", [itemId, kind, delta, note?.trim() || null]);
}

export async function setRecipe(menuItemId: string, rows: { inventoryItemId: number; qty: number }[]) {
  await dbQuery("DELETE FROM recipes WHERE menu_item_id = $1", [menuItemId]);
  for (const r of rows) {
    const qty = num(r.qty);
    if (!r.inventoryItemId || !(qty > 0)) continue;
    await dbQuery(
      "INSERT INTO recipes (menu_item_id, inventory_item_id, qty) VALUES ($1,$2,$3) ON CONFLICT (menu_item_id, inventory_item_id) DO UPDATE SET qty = EXCLUDED.qty",
      [menuItemId, r.inventoryItemId, qty]
    );
  }
}

/** بهای تمام‌شده‌ی یک پرس از هر آیتم منو بر اساس دستورِ مصرف × قیمت واحدِ کالا */
export async function getRecipeCosts(): Promise<Record<string, number>> {
  const rows = await dbQuery(
    `SELECT r.menu_item_id, SUM(r.qty * i.unit_cost)::float8 AS cost
     FROM recipes r JOIN inventory_items i ON i.id = r.inventory_item_id
     GROUP BY r.menu_item_id`
  );
  const out: Record<string, number> = {};
  for (const r of rows) out[String(r.menu_item_id)] = Math.round(num(r.cost));
  return out;
}

/**
 * مصرفِ مواد اولیه‌ی یک سفارش را از انبار کم می‌کند (فقط یک‌بار برای هر سفارش).
 * فقط آیتم‌هایی که «دستور مصرف» دارند روی انبار اثر می‌گذارند.
 */
export async function applyOrderStock(orderCode: string): Promise<void> {
  const claimed = await dbQuery(
    "UPDATE orders SET stock_deducted = true WHERE order_code = $1 AND stock_deducted = false RETURNING lines",
    [orderCode]
  );
  if (!claimed[0]) return;
  const lines = (claimed[0].lines ?? []) as CartLine[];
  const ids = Array.from(new Set(lines.map((l) => l.id)));
  if (ids.length === 0) return;
  const rec = await dbQuery("SELECT menu_item_id, inventory_item_id, qty FROM recipes WHERE menu_item_id = ANY($1::text[])", [ids]);
  const use = new Map<number, number>();
  for (const line of lines) {
    for (const r of rec) {
      if (String(r.menu_item_id) !== line.id) continue;
      const item = Number(r.inventory_item_id);
      use.set(item, (use.get(item) ?? 0) + num(r.qty) * line.qty);
    }
  }
  for (const [itemId, amount] of use) {
    await dbQuery("UPDATE inventory_items SET stock = stock - $2 WHERE id = $1", [itemId, amount]);
    await dbQuery("INSERT INTO inventory_moves (item_id, kind, delta, note, order_code) VALUES ($1,'sale',$2,'مصرف سفارش',$3)", [
      itemId,
      -amount,
      orderCode,
    ]);
  }
}

/** با لغو سفارش، همان مقداری که کم شده بود به انبار برمی‌گردد */
export async function restoreOrderStock(orderCode: string): Promise<void> {
  const claimed = await dbQuery(
    "UPDATE orders SET stock_deducted = false WHERE order_code = $1 AND stock_deducted = true RETURNING order_code",
    [orderCode]
  );
  if (!claimed[0]) return;
  const net = await dbQuery(
    "SELECT item_id, SUM(delta)::float8 AS d FROM inventory_moves WHERE order_code = $1 AND kind IN ('sale','restore') GROUP BY item_id",
    [orderCode]
  );
  for (const r of net) {
    const back = -num(r.d);
    if (!(back > 0)) continue;
    await dbQuery("UPDATE inventory_items SET stock = stock + $2 WHERE id = $1", [Number(r.item_id), back]);
    await dbQuery("INSERT INTO inventory_moves (item_id, kind, delta, note, order_code) VALUES ($1,'restore',$2,'بازگشت به‌خاطر لغو سفارش',$3)", [
      Number(r.item_id),
      back,
      orderCode,
    ]);
  }
}
