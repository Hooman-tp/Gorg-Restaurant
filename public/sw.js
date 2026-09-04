// سرویس‌ورکر مینیمال، فقط برای برآورده‌کردن شرط «نصب‌پذیر بودن» PWA در
// مرورگرها (کروم/اندروید و غیره باید یک fetch handler ثبت‌شده ببینند).
// کش کردن واقعی صفحات عمداً اینجا انجام نشده چون منو/سبد/قیمت‌ها باید
// همیشه تازه باشند؛ این سرویس‌ورکر صرفاً درخواست‌ها را عبور می‌دهد.
self.addEventListener("install", () => {
  self.skipWaiting();
});

self.addEventListener("activate", (event) => {
  event.waitUntil(self.clients.claim());
});

self.addEventListener("fetch", () => {
  // عمداً خالی: هیچ کشی انجام نمی‌شود، فقط حضورِ این handler لازم است
});
