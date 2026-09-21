import { NextRequest } from "next/server";
import { adminOnly, json, readBody, str } from "@/lib/adminApi";
import { listOrders, orderPulse, setOrderStatus, OrderStatus } from "@/lib/orders";
import { getSettings } from "@/lib/settings";
import { sendSms } from "@/lib/kavenegar";

/** GET ?pulse=1 → شمارنده‌ی سبک برای زنگ سفارش جدید · وگرنه لیست سفارش‌ها با فیلتر */
export const GET = adminOnly(async (req: NextRequest) => {
  const p = req.nextUrl.searchParams;
  if (p.get("pulse")) return json(await orderPulse());
  const orders = await listOrders({
    status: p.get("status") ?? undefined,
    source: p.get("source") ?? undefined,
    q: p.get("q") ?? undefined,
    from: p.get("from") ?? undefined,
    to: p.get("to") ?? undefined,
    limit: Number(p.get("limit")) || 100,
  });
  return json({ orders });
});

const VALID: OrderStatus[] = ["received", "preparing", "ready", "delivered", "cancelled"];

export const PATCH = adminOnly(async (req: NextRequest) => {
  const body = await readBody<{ orderCode?: string; status?: string; reason?: string }>(req);
  const orderCode = str(body.orderCode, 20);
  const status = body.status as OrderStatus;
  if (!orderCode || !VALID.includes(status)) return json({ error: "درخواست نامعتبر است" }, 400);

  const order = await setOrderStatus(orderCode, status, body.reason);
  if (!order) return json({ error: "سفارش پیدا نشد یا قبلاً لغو شده است" }, 404);

  // پیامک «آماده است» فقط برای مشتریِ سایت و فقط اگر در تنظیمات روشن باشد
  if (status === "ready" && order.phone && order.source !== "pos") {
    try {
      const s = await getSettings();
      if (s.smsOnReady) {
        const how = order.order_type === "delivery" ? "به‌زودی برایتان ارسال می‌شود" : order.order_type === "dine_in" ? "به‌زودی سرو می‌شود" : "آماده‌ی تحویل است";
        await sendSms(order.phone, `${s.businessName}: سفارش ${order.order_code} ${how}.`);
      }
    } catch (err) {
      console.error("ready sms error", err);
    }
  }
  return json({ ok: true, order });
});
