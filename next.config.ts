import type { NextConfig } from "next";

const isDev = process.env.NODE_ENV === "development";

/**
 * سیاستِ امنیتیِ محتوا (CSP). فقط منابعی که خودِ سایت واقعاً استفاده می‌کند
 * مجاز شده‌اند: تصاویرِ Unsplash، کاشی‌های نقشه‌ی OpenStreetMap و
 * سرویسِ آدرس‌یابیِ Nominatim (برای انتخابِ آدرس روی نقشه). هیچ اسکریپتِ
 * خارجی‌ای بارگذاری نمی‌شود.
 *
 * نکته: 'unsafe-inline' برای اسکریپت عمداً باقی مانده است. CSPِ مبتنی بر nonce
 * (بدونِ unsafe-inline) طبقِ مستنداتِ Next.js تمامِ صفحه‌ها را مجبور به رندرِ
 * دینامیک می‌کند و کش/سرعتِ صفحه‌های ثابت (که برای سئو مهم‌اند) را از بین
 * می‌برد. با توجه به اینکه React خروجی را به‌صورت پیش‌فرض escape می‌کند و
 * هیچ HTMLِ کاربر در صفحه‌ها رندر نمی‌شود، این مصالحه منطقی است؛ بقیه‌ی
 * دایرکتیوها (frame-ancestors، object-src، base-uri، form-action، connect-src،
 * img-src و ...) کاملاً سخت‌گیرانه‌اند.
 */
const csp = [
  "default-src 'self'",
  `script-src 'self' 'unsafe-inline'${isDev ? " 'unsafe-eval'" : ""}`,
  "style-src 'self' 'unsafe-inline'",
  "img-src 'self' data: blob: https://images.unsplash.com https://tile.openstreetmap.org",
  "font-src 'self' data:",
  "connect-src 'self' https://nominatim.openstreetmap.org",
  "worker-src 'self'",
  "manifest-src 'self'",
  "frame-src 'none'",
  "object-src 'none'",
  "base-uri 'self'",
  "form-action 'self'",
  "frame-ancestors 'none'",
  ...(isDev ? [] : ["upgrade-insecure-requests"]),
].join("; ");

const securityHeaders = [
  { key: "Content-Security-Policy", value: csp },
  // جلوگیری از قرارگرفتنِ سایت داخلِ iframe در سایت‌های دیگر (clickjacking)
  { key: "X-Frame-Options", value: "DENY" },
  { key: "X-Content-Type-Options", value: "nosniff" },
  { key: "Referrer-Policy", value: "strict-origin-when-cross-origin" },
  // فقط موقعیتِ مکانی (برای دکمه‌ی «موقعیت فعلی من» روی نقشه) برای خودِ سایت مجاز است
  {
    key: "Permissions-Policy",
    value: "camera=(), microphone=(), geolocation=(self), payment=(), usb=(), interest-cohort=()",
  },
  { key: "Strict-Transport-Security", value: "max-age=63072000; includeSubDomains; preload" },
  { key: "Cross-Origin-Opener-Policy", value: "same-origin" },
];

const nextConfig: NextConfig = {
  // خروجی مستقل (standalone) می‌سازد: روی هر هاستِ Node.js با یک دستور اجرا می‌شود،
  // بدون اینکه به Vercel یا کل پوشه‌ی node_modules نیاز داشته باشد.
  output: "standalone",
  // حذفِ هدرِ «X-Powered-By: Next.js» (اطلاعاتِ بی‌فایده برای مهاجم)
  poweredByHeader: false,
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "images.unsplash.com",
      },
    ],
  },
  async headers() {
    return [
      { source: "/:path*", headers: securityHeaders },
      // پاسخ‌های حساس (پنل مدیریت، ورود مشتری، پیگیری سفارش) هرگز نباید کش شوند
      {
        source: "/api/:path(admin|auth|track|checkout)/:rest*",
        headers: [{ key: "Cache-Control", value: "no-store" }],
      },
    ];
  },
};

export default nextConfig;
