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
  refId?: number; // شماره پیگیری بانکی، فقط وقتی پرداخت آنلاین انجام شده
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
      .map((l) => `<tr><td>${l.qty}×</td><td>${l.name}</td><td>${formatPrice(l.price * l.qty)} تومان</td></tr>`)
      .join("");

    await resend.emails.send({
      from: "سفارش‌های گرگ <orders@gorg-restaurant.ir>",
      to: recipient,
      subject: `سفارش جدید [${order.orderCode}] از ${order.name}${order.refId ? " (پرداخت‌شده)" : ""}`,
      html: `
        <div dir="rtl" style="font-family:Tahoma,sans-serif">
          <h2>سفارش جدید</h2>
          <p><b>کد پیگیری:</b> ${order.orderCode}</p>
          ${order.refId ? `<p><b>شماره پیگیری بانکی:</b> ${order.refId}</p>` : "<p><b>وضعیت پرداخت:</b> پرداخت آنلاین فعال نیست، هماهنگی نقدی/کارت‌خوان</p>"}
          <p><b>نام:</b> ${order.name}</p>
          <p><b>تلفن:</b> ${order.phone}</p>
          <p><b>نوع تحویل:</b> ${order.orderType === "delivery" ? "ارسال با پیک" : "تحویل حضوری"}</p>
          ${order.address ? `<p><b>آدرس:</b> ${order.address}</p>` : ""}
          ${order.notes ? `<p><b>توضیحات:</b> ${order.notes}</p>` : ""}
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
