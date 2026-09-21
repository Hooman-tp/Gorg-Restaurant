import { NextRequest } from "next/server";
import { adminOnly, json, readBody } from "@/lib/adminApi";
import { getSettings, saveSettings, Settings } from "@/lib/settings";
import { isZarinpalConfigured } from "@/lib/zarinpal";
import { isSmsConfigured } from "@/lib/kavenegar";

/** تنظیمات + وضعیتِ سرویس‌های بیرونی (تا مدیر بداند چه چیزی هنوز وصل نشده) */
export const GET = adminOnly(async () =>
  json({
    settings: await getSettings({ fresh: true }),
    system: {
      payment: isZarinpalConfigured(),
      sms: isSmsConfigured(),
      email: Boolean(process.env.RESEND_API_KEY),
      ownerEmail: Boolean(process.env.ORDER_RECIPIENT_EMAIL),
    },
  })
);

export const PUT = adminOnly(async (req: NextRequest) => {
  const b = await readBody<Partial<Settings>>(req);
  const saved = await saveSettings({
    businessName: b.businessName,
    ordersOpen: b.ordersOpen,
    closedMessage: b.closedMessage,
    minOrder: b.minOrder,
    deliveryFee: b.deliveryFee,
    smsOnReady: b.smsOnReady,
  });
  return json({ ok: true, settings: saved });
});
