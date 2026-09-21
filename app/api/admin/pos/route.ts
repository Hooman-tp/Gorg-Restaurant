import { NextRequest } from "next/server";
import { adminOnly, int, json, readBody, str } from "@/lib/adminApi";
import { getMenu } from "@/lib/menuStore";
import { getSettings } from "@/lib/settings";
import { saveOrder, OrderType, PaymentMethod } from "@/lib/orders";
import { generateOrderCode, isValidIranianPhone } from "@/lib/validation";
import { normalizeDigits } from "@/lib/phone";
import { CartLine } from "@/lib/types";

interface PosBody {
  lines?: { id?: unknown; qty?: unknown }[];
  orderType?: string;
  tableNo?: string;
  paymentMethod?: string;
  discount?: unknown;
  name?: string;
  phone?: string;
  address?: string;
  notes?: string;
  delivered?: boolean;
}

/** ثبت سفارشِ حضوری/تلفنی توسط صندوقدار. قیمت‌ها را خودِ سرور از منو حساب می‌کند. */
export const POST = adminOnly(async (req: NextRequest) => {
  const b = await readBody<PosBody>(req);
  if (!Array.isArray(b.lines) || b.lines.length === 0) return json({ error: "سبد خالی است" }, 400);

  const orderType: OrderType = b.orderType === "pickup" || b.orderType === "delivery" ? b.orderType : "dine_in";
  const paymentMethod: PaymentMethod = b.paymentMethod === "card" || b.paymentMethod === "other" ? b.paymentMethod : "cash";

  const menu = await getMenu({ fresh: true });
  const byId = new Map(menu.items.map((i) => [i.id, i]));
  const lines: CartLine[] = [];
  for (const l of b.lines) {
    const item = typeof l.id === "string" ? byId.get(l.id) : undefined;
    const qty = int(l.qty);
    if (!item) return json({ error: "یکی از آیتم‌ها در منو نیست" }, 400);
    if (item.available === false) return json({ error: `«${item.name}» ناموجود است` }, 400);
    if (qty < 1 || qty > 99) return json({ error: "تعداد نامعتبر است" }, 400);
    lines.push({ id: item.id, name: item.name, price: item.price, qty });
  }

  const subtotal = lines.reduce((s, l) => s + l.price * l.qty, 0);
  const discount = Math.min(subtotal, Math.max(0, int(b.discount)));
  const settings = await getSettings();
  const deliveryFee = orderType === "delivery" ? settings.deliveryFee : 0;
  const total = subtotal - discount + deliveryFee;

  const phoneRaw = normalizeDigits(str(b.phone, 20));
  if (phoneRaw && !isValidIranianPhone(phoneRaw)) return json({ error: "شماره تماس معتبر نیست" }, 400);
  const address = str(b.address, 600);
  if (orderType === "delivery" && !address) return json({ error: "برای ارسال با پیک، آدرس لازم است" }, 400);

  for (let attempt = 0; attempt < 4; attempt++) {
    const orderCode = generateOrderCode();
    const result = await saveOrder({
      orderCode,
      name: str(b.name, 120) || "مشتری حضوری",
      phone: phoneRaw,
      address: orderType === "delivery" ? address : undefined,
      orderType,
      notes: str(b.notes, 500) || undefined,
      lines,
      total,
      subtotal,
      discount,
      deliveryFee,
      source: "pos",
      paymentMethod,
      tableNo: orderType === "dine_in" ? str(b.tableNo, 20) || undefined : undefined,
      status: b.delivered ? "delivered" : "preparing",
    });
    if (result === "created") return json({ ok: true, orderCode, total });
    if (result !== "exists") return json({ error: "ثبت سفارش انجام نشد" }, 500);
  }
  return json({ error: "ثبت سفارش انجام نشد؛ دوباره تلاش کنید" }, 500);
});
