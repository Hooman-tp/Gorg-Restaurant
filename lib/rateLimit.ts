import { dbQuery, isDbConfigured } from "./db";
import { clientIp } from "./userAuth";

/**
 * محدودسازیِ سبکِ نرخِ درخواست برای مسیرهای عمومیِ در معرضِ سوءاستفاده
 * (فرم تماس، پیگیری سفارش، ورود پنل مدیریت).
 *
 * وقتی دیتابیس وصل است، از جدول request_throttle استفاده می‌شود که بین
 * همه‌ی نمونه‌های سرورلس مشترک و پایدار است (دقیقاً همان الگویی که
 * app/api/auth/send-otp از قبل برای otp_requests به کار می‌برد).
 * اگر دیتابیس وصل نباشد (یا موقتاً در دسترس نباشد)، یک نسخه‌ی در-حافظه‌ی
 * best-effort جایگزین می‌شود؛ کامل نیست (با هر سردشدنِ نمونه پاک می‌شود)
 * اما بهتر از هیچ محدودیتی است و هرگز باعث خرابیِ کل درخواست نمی‌شود.
 */

type MemoryBucket = { count: number; windowStart: number };
const memoryStore = new Map<string, MemoryBucket>();

export interface RateLimitResult {
  allowed: boolean;
  retryAfterSeconds: number;
}

export async function checkRateLimit(
  req: Request,
  route: string,
  limit: number,
  windowMinutes: number
): Promise<RateLimitResult> {
  const ip = clientIp(req);

  if (isDbConfigured()) {
    try {
      // با احتمال کم، ردیف‌های قدیمی را پاک می‌کنیم تا جدول بزرگ نشود
      if (Math.random() < 0.05) {
        dbQuery("DELETE FROM request_throttle WHERE created_at < now() - interval '1 day'").catch(() => {});
      }
      const rows = await dbQuery(
        `SELECT count(*)::int AS n FROM request_throttle
         WHERE route = $1 AND ip = $2 AND created_at > now() - ($3::text || ' minutes')::interval`,
        [route, ip, String(windowMinutes)]
      );
      const n = Number(rows[0]?.n ?? 0);
      if (n >= limit) {
        return { allowed: false, retryAfterSeconds: windowMinutes * 60 };
      }
      await dbQuery(`INSERT INTO request_throttle (route, ip) VALUES ($1, $2)`, [route, ip]);
      return { allowed: true, retryAfterSeconds: 0 };
    } catch {
      // اگر دیتابیس موقتاً در دسترس نبود، اجازه بده — بهتر از خراب‌شدنِ کل سایت
      return { allowed: true, retryAfterSeconds: 0 };
    }
  }

  const key = `${route}:${ip}`;
  const now = Date.now();
  const windowMs = windowMinutes * 60 * 1000;
  const bucket = memoryStore.get(key);
  if (!bucket || now - bucket.windowStart > windowMs) {
    memoryStore.set(key, { count: 1, windowStart: now });
    return { allowed: true, retryAfterSeconds: 0 };
  }
  if (bucket.count >= limit) {
    return { allowed: false, retryAfterSeconds: Math.ceil((windowMs - (now - bucket.windowStart)) / 1000) };
  }
  bucket.count += 1;
  return { allowed: true, retryAfterSeconds: 0 };
}
