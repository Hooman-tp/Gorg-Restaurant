# گرگ | GORG — سایت رستوران

سایت رستوران گرگ، ساخته‌شده با Next.js (App Router)، TypeScript و Tailwind CSS v4.

## اجرا روی سیستم شما

```bash
npm install
npm run dev
```

سپس آدرس `http://localhost:3000` را باز کنید.

## متغیرهای محیطی

فایل `.env.example` را کپی کرده و به `.env.local` تغییر نام دهید، سپس مقادیر را کامل کنید:

- `RESEND_API_KEY` — برای ارسال ایمیل سفارش‌ها و پیام‌های تماس. اگر خالی بماند، سفارش‌ها فقط در کنسول سرور لاگ می‌شوند و سایت همچنان کار می‌کند (خطا نمی‌دهد)، اما ایمیلی ارسال نخواهد شد.
- `ORDER_RECIPIENT_EMAIL` — ایمیلی که سفارش‌ها و پیام‌ها به آن ارسال می‌شود.
- `NEXT_PUBLIC_WHATSAPP_NUMBER` — شماره واتساپ رستوران با کد کشور (بدون + و بدون صفر ابتدایی).
- `NEXT_PUBLIC_PHONE_DISPLAY` — شماره تلفن نمایشی در سایت.

## ساختار

- `app/` — صفحات (خانه، منو، گالری، درباره، تماس، تسویه سفارش) و API routeها
- `components/` — کامپوننت‌های قابل‌استفاده‌ی مجدد
- `lib/menuData.ts` — کل منوی رستوران (۲۹ آیتم در ۵ دسته)؛ برای ویرایش منو همین فایل را تغییر دهید
- `lib/images.ts` — آدرس تصاویر (از Unsplash) و مسیر دارایی‌های برند
- `context/CartContext.tsx` — منطق سبد سفارش (ذخیره در localStorage مرورگر)
- `public/images/` — لوگو و بافت قرمز برند (استخراج‌شده از تصاویر خودتان)

## نکات قبل از انتشار

1. آدرس، شماره تلفن و ساعات کاری واقعی رستوران را در `components/Footer.tsx`، `app/contact/page.tsx` و `components/StructuredData.tsx` جایگزین کنید.
2. دامنه‌ی واقعی سایت را در `app/layout.tsx` (`metadataBase`)، `app/sitemap.ts` و `app/robots.ts` جایگزین `gorg-restaurant.ir` کنید.
3. اگر می‌خواهید عکس‌های واقعی غذاهای خودتان را جایگزین عکس‌های نمونه کنید، فایل‌ها را در `public/images/` بگذارید و مسیرشان را در `lib/images.ts` و `lib/menuData.ts` به‌روزرسانی کنید.
4. قیمت‌های منو نمونه هستند؛ در `lib/menuData.ts` ویرایش کنید.
