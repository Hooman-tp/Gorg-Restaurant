import { NextRequest, NextResponse } from "next/server";
import { verifyAdminToken, COOKIE_NAME } from "@/lib/adminAuth";
import { getAllOrders, updateOrderStatus, StoredOrder } from "@/lib/orders";
import { isDbConfigured } from "@/lib/db";

function requireAdmin(req: NextRequest) {
  const token = req.cookies.get(COOKIE_NAME)?.value;
  return verifyAdminToken(token);
}

export async function GET(req: NextRequest) {
  if (!requireAdmin(req)) {
    return NextResponse.json({ error: "دسترسی ندارید" }, { status: 401 });
  }
  if (!isDbConfigured()) {
    return NextResponse.json({ error: "دیتابیس هنوز وصل نشده" }, { status: 503 });
  }
  const orders = await getAllOrders();
  return NextResponse.json({ orders });
}

export async function PATCH(req: NextRequest) {
  if (!requireAdmin(req)) {
    return NextResponse.json({ error: "دسترسی ندارید" }, { status: 401 });
  }
  const { orderCode, status } = await req.json();
  const validStatuses: StoredOrder["status"][] = ["received", "preparing", "ready", "delivered", "cancelled"];
  if (!orderCode || !validStatuses.includes(status)) {
    return NextResponse.json({ error: "درخواست نامعتبر است" }, { status: 400 });
  }
  const ok = await updateOrderStatus(orderCode, status);
  return NextResponse.json({ ok });
}
