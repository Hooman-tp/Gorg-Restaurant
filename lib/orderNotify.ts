import { Resend } from "resend";
import { CartLine } from "@/lib/types";
import { sendSms } from "@/lib/kavenegar";

export interface OrderDetails {
  lines: CartLine[];
  total: number;
  orderType: "delivery" | "pickup";
  orderCode: string;
  name: string;
  phone: string;
  address?: string;
  notes?: string;
  refId?: number; // شماره پیگیری بانکی (سفارش فقط بعد از پرداخت موفق ثبت می‌شود)
  lat?: number; // موقعیت انتخاب‌شده روی نقشه (اختیاری)
  lng?: number;
}

/** متنِ کاربر را قبل از گذاشتن در ایمیلِ HTML بی‌خطر می‌کند */
function esc(text: string) {
  return text.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;");
}

/** لینک باز شدن موقعیتِ سفارش در نقشه (برای پیک) */
export function mapLink(lat?: number, lng?: number) {
  if (typeof lat !== "number" || typeof lng !== "number") return null;
  return `https://www.google.com/maps/search/?api=1&query=${lat},${lng}`;
}

function formatPrice(n: number) {
  return n.toLocaleString("fa-IR");
}

/** ایمیل سفارش را برای صاحب رستوران ارسال می‌کند */
export async function notifyOwnerByEmail(order: OrderDetails) {
  const apiKey = process.env.RESEND_API_KEY;
  const recipient = process.env.ORDER_RECIPIENT_EMAIL;

  if (!apiKey || !recipient) {
    console.log("سفارش جدید (بدون ارسال ایمیل - RESEND_API_KEY تنظیم نشده):", order);
    return false;
  }

  try {
    const resend = new Resend(apiKey);
    const itemsHtml = order.lines
      .map((l) => `<tr><td>${l.qty}×</td><td>${esc(l.name)}</td><td>${formatPrice(l.price * l.qty)} تومان</td></tr>`)
      .join("");

    await resend.emails.send({
      from: "سفارش‌های گرگ <orders@gorg-restaurant.ir>",
      to: recipient,
      subject: `سفارش جدید [${order.orderCode}] از ${order.name.replace(/[\r\n]+/g, " ")}${order.refId ? " (پرداخت‌شده)" : ""}`,
      html: `
        <div dir="rtl" style="font-family:Tahoma,sans-serif">
          <h2>سفارش جدید</h2>
          <p><b>کد پیگیری:</b> ${order.orderCode}</p>
          <p><b>وضعیت پرداخت:</b> پرداخت‌شده${order.refId ? ` — شماره پیگیری بانکی: ${order.refId}` : ""}</p>
          <p><b>نام:</b> ${esc(order.name)}</p>
          <p><b>تلفن:</b> ${esc(order.phone)}</p>
          <p><b>نوع تحویل:</b> ${order.orderType === "delivery" ? "ارسال با پیک" : "تحویل حضوری"}</p>
          ${order.address ? `<p><b>آدرس:</b> ${esc(order.address)}</p>` : ""}
          ${mapLink(order.lat, order.lng) ? `<p><b>موقعیت روی نقشه:</b> <a href="${mapLink(order.lat, order.lng)}">باز کردن در نقشه</a></p>` : ""}
          ${order.notes ? `<p><b>توضیحات:</b> ${esc(order.notes)}</p>` : ""}
          <table cellpadding="6">${itemsHtml}</table>
          <p><b>جمع کل:</b> ${formatPrice(order.total)} تومان</p>
        </div>
      `,
    });
    return true;
  } catch (err) {
    console.error("notifyOwnerByEmail error", err);
    return false;
  }
}

/** پیامک تأیید سفارش را برای مشتری ارسال می‌کند */
export async function notifyCustomerBySms(order: OrderDetails) {
  const etaText = order.orderType === "delivery" ? "ارسال طی ۴۵ تا ۶۰ دقیقه" : "آماده طی ۲۵ تا ۳۵ دقیقه";
  const message = `گرگ | سفارش شما با کد ${order.orderCode} ثبت شد. ${etaText}. جمع: ${formatPrice(
    order.total
  )} تومان. با تشکر از خرید شما`;
  return sendSms(order.phone, message);
}

/** هر دو اعلان (ایمیل صاحب رستوران + پیامک مشتری) را ارسال می‌کند */
export async function processOrderNotifications(order: OrderDetails) {
  const [emailed, smsSent] = await Promise.all([notifyOwnerByEmail(order), notifyCustomerBySms(order)]);
  return { emailed, smsSent };
}
