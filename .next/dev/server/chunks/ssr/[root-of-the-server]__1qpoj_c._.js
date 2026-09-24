module.exports = [
"[externals]/next/dist/compiled/next-server/app-page-turbo.runtime.dev.js [external] (next/dist/compiled/next-server/app-page-turbo.runtime.dev.js, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("next/dist/compiled/next-server/app-page-turbo.runtime.dev.js", () => require("next/dist/compiled/next-server/app-page-turbo.runtime.dev.js"));

module.exports = mod;
}),
"[project]/lib/gsap.ts [app-ssr] (ecmascript) <locals>", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$gsap$2f$index$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$locals$3e$__ = __turbopack_context__.i("[project]/node_modules/gsap/index.js [app-ssr] (ecmascript) <locals>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$gsap$2f$ScrollTrigger$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/gsap/ScrollTrigger.js [app-ssr] (ecmascript)");
;
;
__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$gsap$2f$index$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$locals$3e$__["gsap"].registerPlugin(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$gsap$2f$ScrollTrigger$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["ScrollTrigger"]);
// روی سافاریِ موبایل، مخفی/ظاهر شدن نوار آدرس حین اسکرول یک رویداد
// resize فایر می‌کند. بدون این خط، ScrollTrigger با هر resize کل
// موقعیت‌های پین را دوباره حساب می‌کند؛ یعنی درست وسط اسکرول (بیشتر
// از همه داخل بخش پین‌شده‌ی FireStory) یک لرزش/پرش کوچک ایجاد می‌شود.
// این پرچم دقیقاً برای همین مورد در GSAP وجود دارد.
__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$gsap$2f$ScrollTrigger$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["ScrollTrigger"].config({
    ignoreMobileResize: true
});
;
}),
"[project]/hooks/useLenis.ts [app-ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "useLenis",
    ()=>useLenis
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lenis$2f$dist$2f$lenis$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/lenis/dist/lenis.mjs [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$gsap$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$locals$3e$__ = __turbopack_context__.i("[project]/lib/gsap.ts [app-ssr] (ecmascript) <locals>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$gsap$2f$index$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$locals$3e$__ = __turbopack_context__.i("[project]/node_modules/gsap/index.js [app-ssr] (ecmascript) <locals>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$gsap$2f$ScrollTrigger$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/gsap/ScrollTrigger.js [app-ssr] (ecmascript)");
"use client";
;
;
;
function useLenis() {
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useEffect"])(()=>{
        // چرخِ ماوس (دسکتاپ): wheelMultiplier سرعتِ اسکرول را تعیین می‌کند (کمتر =
        // کندتر) و lerp میزانِ «سنگینیِ» حرکت را (کمتر = نرم‌تر و دنباله‌دارتر).
        // نرمیِ نهاییِ فیلمِ FireStory جدا و در خودِ FireStoryShowcase (SMOOTH_TIME)
        // انجام می‌شود؛ پس این دو عدد فقط حسِ کلِ صفحه را تنظیم می‌کنند.
        //
        // لمس (موبایل): syncTouch عمداً false است. با syncTouch: true، Lenis لمس را
        // خودش شبیه‌سازی می‌کرد و تنها یک اینرسیِ خیلی کوتاه بعد از برداشتنِ انگشت
        // می‌داد؛ همان «ایستادنِ ناگهانی» که می‌دیدید. حالا موبایل از اسکرولِ بومیِ
        // خودِ گوشی (اینرسیِ واقعیِ iOS/Android که طولانی و طبیعی است) استفاده می‌کند
        // و نرمیِ فیلم را همان دنبال‌کننده‌ی فنری روی آن سوار می‌کند.
        // (اگر جایی حسِ اسکرولِ بومی را نپسندیدید، این را true کنید.)
        const lenis = new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lenis$2f$dist$2f$lenis$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"]({
            smoothWheel: true,
            lerp: 0.075,
            wheelMultiplier: 0.6,
            touchMultiplier: 1,
            syncTouch: false,
            gestureOrientation: "vertical"
        });
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        window.__lenis = lenis;
        lenis.on("scroll", __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$gsap$2f$ScrollTrigger$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["ScrollTrigger"].update);
        const update = (time)=>{
            lenis.raf(time * 1000);
        };
        __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$gsap$2f$index$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$locals$3e$__["gsap"].ticker.add(update);
        __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$gsap$2f$index$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$locals$3e$__["gsap"].ticker.lagSmoothing(0);
        return ()=>{
            __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$gsap$2f$index$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$locals$3e$__["gsap"].ticker.remove(update);
            // eslint-disable-next-line @typescript-eslint/no-explicit-any
            delete window.__lenis;
            lenis.destroy();
        };
    }, []);
}
}),
"[project]/components/SmoothScroll.tsx [app-ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "default",
    ()=>SmoothScroll
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$hooks$2f$useLenis$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/hooks/useLenis.ts [app-ssr] (ecmascript)");
"use client";
;
function SmoothScroll() {
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$hooks$2f$useLenis$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useLenis"])();
    return null;
}
}),
"[project]/components/ScrollProgress.tsx [app-ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "default",
    ()=>ScrollProgress
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react-jsx-dev-runtime.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react.js [app-ssr] (ecmascript)");
"use client";
;
;
function ScrollProgress() {
    const barRef = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useRef"])(null);
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useEffect"])(()=>{
        let raf = 0;
        const update = ()=>{
            raf = 0;
            const bar = barRef.current;
            if (!bar) return;
            const height = document.documentElement.scrollHeight - window.innerHeight;
            const p = height > 0 ? Math.min(1, Math.max(0, window.scrollY / height)) : 0;
            bar.style.transform = `scaleX(${p})`;
        };
        const onScroll = ()=>{
            if (!raf) raf = requestAnimationFrame(update);
        };
        window.addEventListener("scroll", onScroll, {
            passive: true
        });
        window.addEventListener("resize", onScroll);
        update();
        return ()=>{
            window.removeEventListener("scroll", onScroll);
            window.removeEventListener("resize", onScroll);
            if (raf) cancelAnimationFrame(raf);
        };
    }, []);
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        className: "fixed top-0 left-0 right-0 z-[110] h-[3px] bg-transparent",
        "aria-hidden": "true",
        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
            ref: barRef,
            className: "h-full w-full origin-right bg-gradient-to-l from-[var(--color-ember)] to-[var(--color-blood)]",
            style: {
                transform: "scaleX(0)"
            }
        }, void 0, false, {
            fileName: "[project]/components/ScrollProgress.tsx",
            lineNumber: 40,
            columnNumber: 7
        }, this)
    }, void 0, false, {
        fileName: "[project]/components/ScrollProgress.tsx",
        lineNumber: 39,
        columnNumber: 5
    }, this);
}
}),
"[project]/components/BackToTop.tsx [app-ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "default",
    ()=>BackToTop
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react-jsx-dev-runtime.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react.js [app-ssr] (ecmascript)");
"use client";
;
;
function BackToTop() {
    const [visible, setVisible] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])(false);
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useEffect"])(()=>{
        const onScroll = ()=>setVisible(window.scrollY > 600);
        window.addEventListener("scroll", onScroll, {
            passive: true
        });
        return ()=>window.removeEventListener("scroll", onScroll);
    }, []);
    const handleClick = ()=>{
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        const lenis = window.__lenis;
        if (lenis) lenis.scrollTo(0, {
            duration: 1.8
        });
        else window.scrollTo({
            top: 0,
            behavior: "smooth"
        });
    };
    if (!visible) return null;
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
        onClick: handleClick,
        "aria-label": "برو به بالای صفحه",
        className: "fixed bottom-24 left-5 z-40 w-11 h-11 rounded-full bg-[var(--color-charcoal)] border border-white/10 text-[var(--color-bone)] flex items-center justify-center shadow-lg hover:border-[var(--color-ember)] transition-colors",
        children: "↑"
    }, void 0, false, {
        fileName: "[project]/components/BackToTop.tsx",
        lineNumber: 24,
        columnNumber: 5
    }, this);
}
}),
"[externals]/next/dist/server/app-render/action-async-storage.external.js [external] (next/dist/server/app-render/action-async-storage.external.js, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("next/dist/server/app-render/action-async-storage.external.js", () => require("next/dist/server/app-render/action-async-storage.external.js"));

module.exports = mod;
}),
"[externals]/next/dist/server/app-render/work-unit-async-storage.external.js [external] (next/dist/server/app-render/work-unit-async-storage.external.js, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("next/dist/server/app-render/work-unit-async-storage.external.js", () => require("next/dist/server/app-render/work-unit-async-storage.external.js"));

module.exports = mod;
}),
"[externals]/next/dist/server/app-render/work-async-storage.external.js [external] (next/dist/server/app-render/work-async-storage.external.js, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("next/dist/server/app-render/work-async-storage.external.js", () => require("next/dist/server/app-render/work-async-storage.external.js"));

module.exports = mod;
}),
"[project]/context/CartContext.tsx [app-ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "CartProvider",
    ()=>CartProvider,
    "useCart",
    ()=>useCart
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react-jsx-dev-runtime.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react.js [app-ssr] (ecmascript)");
"use client";
;
;
const CartContext = /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["createContext"])(null);
const STORAGE_KEY = "gorg-cart-v2"; // نسخه‌ی جدید: سبدهای قدیمی با آیتم/قیمت منوی قبلی نادیده گرفته می‌شوند
function CartProvider({ children }) {
    const [lines, setLines] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])([]);
    const [isOpen, setIsOpen] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])(false);
    const [hydrated, setHydrated] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])(false);
    // بارگذاری سبد از localStorage فقط در کلاینت (یک‌بار، بعد از mount).
    // این effect دقیقاً برای همگام‌سازی state با یک سیستم خارجی (localStorage)
    // است، نه مشتق‌شده از props/state دیگر، پس اجرای setState اینجا لازم است.
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useEffect"])(()=>{
        try {
            const raw = window.localStorage.getItem(STORAGE_KEY);
            // eslint-disable-next-line react-hooks/set-state-in-effect
            if (raw) setLines(JSON.parse(raw));
        } catch  {
        // در صورت خرابی داده‌ی ذخیره‌شده، نادیده گرفته می‌شود
        } finally{
            setHydrated(true);
        }
    }, []);
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useEffect"])(()=>{
        if (!hydrated) return;
        try {
            window.localStorage.setItem(STORAGE_KEY, JSON.stringify(lines));
        } catch  {
        // ذخیره‌سازی ممکن است در حالت خصوصی مرورگر ناموفق باشد؛ بی‌اهمیت است
        }
    }, [
        lines,
        hydrated
    ]);
    const addItem = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useCallback"])((item)=>{
        setLines((prev)=>{
            const existing = prev.find((l)=>l.id === item.id);
            if (existing) {
                return prev.map((l)=>l.id === item.id ? {
                        ...l,
                        qty: l.qty + 1
                    } : l);
            }
            return [
                ...prev,
                {
                    ...item,
                    qty: 1
                }
            ];
        });
        setIsOpen(true);
    }, []);
    const incrementItem = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useCallback"])((id)=>{
        setLines((prev)=>prev.map((l)=>l.id === id ? {
                    ...l,
                    qty: l.qty + 1
                } : l));
    }, []);
    const decrementItem = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useCallback"])((id)=>{
        setLines((prev)=>prev.map((l)=>l.id === id ? {
                    ...l,
                    qty: l.qty - 1
                } : l).filter((l)=>l.qty > 0));
    }, []);
    const removeItem = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useCallback"])((id)=>{
        setLines((prev)=>prev.filter((l)=>l.id !== id));
    }, []);
    const clearCart = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useCallback"])(()=>setLines([]), []);
    const count = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useMemo"])(()=>lines.reduce((sum, l)=>sum + l.qty, 0), [
        lines
    ]);
    const total = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useMemo"])(()=>lines.reduce((sum, l)=>sum + l.qty * l.price, 0), [
        lines
    ]);
    const value = {
        lines,
        count,
        total,
        isOpen,
        openCart: ()=>setIsOpen(true),
        closeCart: ()=>setIsOpen(false),
        addItem,
        incrementItem,
        decrementItem,
        removeItem,
        clearCart
    };
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(CartContext.Provider, {
        value: value,
        children: children
    }, void 0, false, {
        fileName: "[project]/context/CartContext.tsx",
        lineNumber: 106,
        columnNumber: 10
    }, this);
}
function useCart() {
    const ctx = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useContext"])(CartContext);
    if (!ctx) throw new Error("useCart باید داخل CartProvider استفاده شود");
    return ctx;
}
}),
"[project]/context/AuthContext.tsx [app-ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "AuthProvider",
    ()=>AuthProvider,
    "useAuth",
    ()=>useAuth
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react-jsx-dev-runtime.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react.js [app-ssr] (ecmascript)");
"use client";
;
;
const AuthContext = /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["createContext"])(null);
function AuthProvider({ children }) {
    const [phone, setPhone] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])(null);
    const [ready, setReady] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])(false);
    const [isOpen, setIsOpen] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])(false);
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useEffect"])(()=>{
        let cancelled = false;
        fetch("/api/auth/me", {
            cache: "no-store"
        }).then((r)=>r.json()).then((d)=>{
            if (!cancelled) setPhone(typeof d?.phone === "string" ? d.phone : null);
        }).catch(()=>{}).finally(()=>{
            if (!cancelled) setReady(true);
        });
        return ()=>{
            cancelled = true;
        };
    }, []);
    const openLogin = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useCallback"])(()=>setIsOpen(true), []);
    const closeLogin = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useCallback"])(()=>setIsOpen(false), []);
    const onLoggedIn = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useCallback"])((p)=>{
        setPhone(p);
        setIsOpen(false);
    }, []);
    const logout = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useCallback"])(async ()=>{
        try {
            await fetch("/api/auth/logout", {
                method: "POST"
            });
        } finally{
            setPhone(null);
        }
    }, []);
    const value = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useMemo"])(()=>({
            phone,
            ready,
            isOpen,
            openLogin,
            closeLogin,
            onLoggedIn,
            logout
        }), [
        phone,
        ready,
        isOpen,
        openLogin,
        closeLogin,
        onLoggedIn,
        logout
    ]);
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(AuthContext.Provider, {
        value: value,
        children: children
    }, void 0, false, {
        fileName: "[project]/context/AuthContext.tsx",
        lineNumber: 59,
        columnNumber: 10
    }, this);
}
function useAuth() {
    const ctx = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useContext"])(AuthContext);
    if (!ctx) throw new Error("useAuth باید داخل AuthProvider استفاده شود");
    return ctx;
}
}),
"[project]/lib/phone.ts [app-ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "maskMobile",
    ()=>maskMobile,
    "mobileError",
    ()=>mobileError,
    "normalizeDigits",
    ()=>normalizeDigits,
    "normalizeMobile",
    ()=>normalizeMobile
]);
/**
 * کمک‌های شماره موبایل ایران — هم در مرورگر و هم روی سرور استفاده می‌شود.
 * ورود با پیامک فقط شماره‌ی «۱۱ رقمی که با ۰۹ شروع می‌شود» را می‌پذیرد.
 */ const FA_DIGITS = "۰۱۲۳۴۵۶۷۸۹";
const AR_DIGITS = "٠١٢٣٤٥٦٧٨٩";
function normalizeDigits(input) {
    return input.replace(/[۰-۹]/g, (d)=>String(FA_DIGITS.indexOf(d))).replace(/[٠-٩]/g, (d)=>String(AR_DIGITS.indexOf(d))).replace(/[\s\-()‌\u200f\u200e]/g, "");
}
function normalizeMobile(raw) {
    let d = normalizeDigits(raw);
    if (d.startsWith("+98")) d = "0" + d.slice(3);
    else if (d.startsWith("0098")) d = "0" + d.slice(4);
    else if (d.startsWith("98") && d.length === 12) d = "0" + d.slice(2);
    return /^09\d{9}$/.test(d) ? d : null;
}
function mobileError(raw) {
    const d = normalizeDigits(raw);
    if (!d) return "شماره موبایل را وارد کنید";
    if (!/^[0-9+]+$/.test(d)) return "شماره موبایل فقط باید شامل رقم باشد";
    if (normalizeMobile(raw)) return "";
    if (!d.startsWith("09") && !d.startsWith("+98") && !d.startsWith("0098") && !d.startsWith("98")) {
        return "شماره موبایل باید با ۰۹ شروع شود";
    }
    if (d.length < 11) return `شماره ناقص است؛ ${(11 - d.length).toLocaleString("fa-IR")} رقم دیگر لازم است`;
    return "شماره موبایل باید دقیقاً ۱۱ رقم باشد";
}
function maskMobile(phone) {
    if (phone.length !== 11) return phone;
    return `${phone.slice(0, 4)} ••• ${phone.slice(7)}`;
}
}),
"[project]/components/Header.tsx [app-ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "default",
    ()=>Header
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react-jsx-dev-runtime.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$image$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/image.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$client$2f$app$2d$dir$2f$link$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/client/app-dir/link.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$navigation$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/navigation.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$context$2f$CartContext$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/context/CartContext.tsx [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$context$2f$AuthContext$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/context/AuthContext.tsx [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$phone$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/lib/phone.ts [app-ssr] (ecmascript)");
"use client";
;
;
;
;
;
;
;
;
const NAV_ITEMS = [
    {
        href: "/",
        label: "خانه"
    },
    {
        href: "/menu",
        label: "منو"
    },
    {
        href: "/gallery",
        label: "گالری"
    },
    {
        href: "/about",
        label: "درباره گرگ"
    },
    {
        href: "/track",
        label: "پیگیری سفارش"
    },
    {
        href: "/contact",
        label: "تماس"
    }
];
function UserIcon() {
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("svg", {
        width: "19",
        height: "19",
        viewBox: "0 0 24 24",
        fill: "none",
        "aria-hidden": "true",
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("circle", {
                cx: "12",
                cy: "8",
                r: "3.6",
                stroke: "currentColor",
                strokeWidth: "1.8"
            }, void 0, false, {
                fileName: "[project]/components/Header.tsx",
                lineNumber: 23,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("path", {
                d: "M4.5 20c.6-3.7 3.6-5.6 7.5-5.6s6.9 1.9 7.5 5.6",
                stroke: "currentColor",
                strokeWidth: "1.8",
                strokeLinecap: "round"
            }, void 0, false, {
                fileName: "[project]/components/Header.tsx",
                lineNumber: 24,
                columnNumber: 7
            }, this)
        ]
    }, void 0, true, {
        fileName: "[project]/components/Header.tsx",
        lineNumber: 22,
        columnNumber: 5
    }, this);
}
function Header() {
    const pathname = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$navigation$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["usePathname"])();
    const { count, openCart } = (0, __TURBOPACK__imported__module__$5b$project$5d2f$context$2f$CartContext$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useCart"])();
    const { phone, ready, openLogin, logout } = (0, __TURBOPACK__imported__module__$5b$project$5d2f$context$2f$AuthContext$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useAuth"])();
    const [menuOpen, setMenuOpen] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])(false);
    const [scrolled, setScrolled] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])(false);
    const [accountOpen, setAccountOpen] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])(false);
    const accountRef = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useRef"])(null);
    const loginBtnRef = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useRef"])(null);
    const [hintX, setHintX] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])(null);
    // تا وقتی کاربر با شماره موبایل وارد نشده، کلید «سفارش آنلاین» مخفی است و به‌جایش
    // راهنمای «برای سفارش آنلاین لطفاً وارد شوید» زیر کلید ورود نشان داده می‌شود
    const showLoginHint = ready && !phone && !menuOpen;
    // بستن منوی حساب با کلیک بیرون از آن یا Escape
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useEffect"])(()=>{
        if (!accountOpen) return;
        const onDown = (e)=>{
            if (accountRef.current && !accountRef.current.contains(e.target)) setAccountOpen(false);
        };
        const onKey = (e)=>{
            if (e.key === "Escape") setAccountOpen(false);
        };
        document.addEventListener("mousedown", onDown);
        document.addEventListener("touchstart", onDown, {
            passive: true
        });
        document.addEventListener("keydown", onKey);
        return ()=>{
            document.removeEventListener("mousedown", onDown);
            document.removeEventListener("touchstart", onDown);
            document.removeEventListener("keydown", onKey);
        };
    }, [
        accountOpen
    ]);
    // مرکزِ کلید ورود را اندازه می‌گیریم تا دستِ اشاره‌کننده دقیقاً زیرِ آن (روی موبایل و
    // دسکتاپ) قرار بگیرد
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useEffect"])(()=>{
        if (!ready || phone) return;
        const measure = ()=>{
            const el = loginBtnRef.current;
            if (!el) return;
            const r = el.getBoundingClientRect();
            setHintX(Math.round(r.left + r.width / 2));
        };
        // eslint-disable-next-line react-hooks/set-state-in-effect
        measure();
        window.addEventListener("resize", measure);
        const ro = typeof ResizeObserver !== "undefined" ? new ResizeObserver(measure) : null;
        if (ro) {
            ro.observe(document.documentElement);
            if (loginBtnRef.current) ro.observe(loginBtnRef.current);
        }
        return ()=>{
            window.removeEventListener("resize", measure);
            ro?.disconnect();
        };
    }, [
        ready,
        phone
    ]);
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useEffect"])(()=>{
        const onScroll = ()=>setScrolled(window.scrollY > 24);
        window.addEventListener("scroll", onScroll, {
            passive: true
        });
        onScroll();
        return ()=>window.removeEventListener("scroll", onScroll);
    }, []);
    // عمداً بدون backdrop-blur: زمینه تقریباً مات است پس تاری دیده نمی‌شد، ولی
    // مرورگر موقع هر تغییرِ فریمِ فیلمِ زیرِ هدر دوباره آن را محاسبه می‌کرد
    // (روی iOS خیلی سنگین است).
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("header", {
        className: `fixed top-0 inset-x-0 z-[100] transition-colors duration-300 ${scrolled ? "bg-[var(--color-ink)]/95" : "bg-transparent"}`,
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "max-w-6xl mx-auto flex items-center justify-between px-5 py-3",
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$client$2f$app$2d$dir$2f$link$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"], {
                        href: "/",
                        className: "flex items-center gap-2.5 shrink-0",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$image$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"], {
                                src: "/images/gorg-mark.png",
                                alt: "گرگ",
                                width: 44,
                                height: 44,
                                priority: true,
                                className: "rounded-full"
                            }, void 0, false, {
                                fileName: "[project]/components/Header.tsx",
                                lineNumber: 105,
                                columnNumber: 11
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                className: "font-extrabold text-lg tracking-wide",
                                children: "گرگ"
                            }, void 0, false, {
                                fileName: "[project]/components/Header.tsx",
                                lineNumber: 106,
                                columnNumber: 11
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/components/Header.tsx",
                        lineNumber: 104,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("nav", {
                        className: "hidden md:flex items-center gap-7",
                        children: NAV_ITEMS.map((item)=>{
                            const active = pathname === item.href;
                            return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$client$2f$app$2d$dir$2f$link$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"], {
                                href: item.href,
                                "aria-current": active ? "page" : undefined,
                                className: `text-sm transition-colors pb-1 border-b-2 ${active ? "text-[var(--color-ember-light)] border-[var(--color-ember)] font-bold" : "text-[var(--color-bone)]/85 border-transparent hover:text-[var(--color-ember-light)]"}`,
                                children: item.label
                            }, item.href, false, {
                                fileName: "[project]/components/Header.tsx",
                                lineNumber: 113,
                                columnNumber: 15
                            }, this);
                        })
                    }, void 0, false, {
                        fileName: "[project]/components/Header.tsx",
                        lineNumber: 109,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "flex items-center gap-2",
                        children: [
                            ready && phone && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$client$2f$app$2d$dir$2f$link$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"], {
                                href: "/menu",
                                className: "hidden sm:inline-flex btn-primary !py-2.5 !px-5 text-sm",
                                children: "سفارش آنلاین"
                            }, void 0, false, {
                                fileName: "[project]/components/Header.tsx",
                                lineNumber: 131,
                                columnNumber: 13
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                onClick: openCart,
                                "aria-label": "مشاهده سبد سفارش",
                                className: "relative w-10 h-10 rounded-full border border-white/12 flex items-center justify-center hover:border-[var(--color-ember)] transition-colors",
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("svg", {
                                        width: "19",
                                        height: "19",
                                        viewBox: "0 0 24 24",
                                        fill: "none",
                                        "aria-hidden": "true",
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("path", {
                                                d: "M3 4h2l2.4 12.2a2 2 0 0 0 2 1.6h7.2a2 2 0 0 0 2-1.6L20 8H6",
                                                stroke: "currentColor",
                                                strokeWidth: "1.8",
                                                strokeLinecap: "round",
                                                strokeLinejoin: "round"
                                            }, void 0, false, {
                                                fileName: "[project]/components/Header.tsx",
                                                lineNumber: 145,
                                                columnNumber: 15
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("circle", {
                                                cx: "9",
                                                cy: "20",
                                                r: "1.4",
                                                fill: "currentColor"
                                            }, void 0, false, {
                                                fileName: "[project]/components/Header.tsx",
                                                lineNumber: 152,
                                                columnNumber: 15
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("circle", {
                                                cx: "17",
                                                cy: "20",
                                                r: "1.4",
                                                fill: "currentColor"
                                            }, void 0, false, {
                                                fileName: "[project]/components/Header.tsx",
                                                lineNumber: 153,
                                                columnNumber: 15
                                            }, this)
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/components/Header.tsx",
                                        lineNumber: 144,
                                        columnNumber: 13
                                    }, this),
                                    count > 0 && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                        className: "absolute -top-1 -left-1 w-[18px] h-[18px] px-1 rounded-full bg-[var(--color-ember)] text-[10px] font-bold flex items-center justify-center",
                                        children: count
                                    }, void 0, false, {
                                        fileName: "[project]/components/Header.tsx",
                                        lineNumber: 156,
                                        columnNumber: 15
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/components/Header.tsx",
                                lineNumber: 139,
                                columnNumber: 11
                            }, this),
                            ready && !phone && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                ref: loginBtnRef,
                                onClick: openLogin,
                                "aria-label": "ورود به حساب کاربری",
                                className: "h-10 w-10 sm:w-auto sm:px-4 rounded-full border border-white/12 flex items-center justify-center gap-2 hover:border-[var(--color-ember)] transition-colors",
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(UserIcon, {}, void 0, false, {
                                        fileName: "[project]/components/Header.tsx",
                                        lineNumber: 170,
                                        columnNumber: 15
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                        className: "hidden sm:inline text-sm font-bold",
                                        children: "ورود"
                                    }, void 0, false, {
                                        fileName: "[project]/components/Header.tsx",
                                        lineNumber: 171,
                                        columnNumber: 15
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/components/Header.tsx",
                                lineNumber: 164,
                                columnNumber: 13
                            }, this),
                            ready && phone && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                ref: accountRef,
                                className: "relative",
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                        onClick: ()=>setAccountOpen((v)=>!v),
                                        "aria-label": "حساب کاربری",
                                        "aria-haspopup": "menu",
                                        "aria-expanded": accountOpen,
                                        className: "relative h-10 w-10 sm:w-auto sm:px-4 rounded-full border border-[var(--color-ember)]/60 flex items-center justify-center gap-2 hover:border-[var(--color-ember)] transition-colors",
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(UserIcon, {}, void 0, false, {
                                                fileName: "[project]/components/Header.tsx",
                                                lineNumber: 183,
                                                columnNumber: 17
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                dir: "ltr",
                                                className: "hidden sm:inline text-sm",
                                                children: (0, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$phone$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["maskMobile"])(phone)
                                            }, void 0, false, {
                                                fileName: "[project]/components/Header.tsx",
                                                lineNumber: 184,
                                                columnNumber: 17
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                "aria-hidden": "true",
                                                className: "absolute -top-0.5 -right-0.5 w-2.5 h-2.5 rounded-full bg-emerald-500 ring-2 ring-[var(--color-ink)]"
                                            }, void 0, false, {
                                                fileName: "[project]/components/Header.tsx",
                                                lineNumber: 187,
                                                columnNumber: 17
                                            }, this)
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/components/Header.tsx",
                                        lineNumber: 176,
                                        columnNumber: 15
                                    }, this),
                                    accountOpen && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        role: "menu",
                                        className: "absolute top-full left-0 mt-2 w-56 rounded-2xl bg-[var(--color-charcoal)] border border-white/10 p-3 shadow-2xl",
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                                className: "text-xs text-[var(--color-ash)]",
                                                children: "وارد شده با شماره"
                                            }, void 0, false, {
                                                fileName: "[project]/components/Header.tsx",
                                                lineNumber: 197,
                                                columnNumber: 19
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                                dir: "ltr",
                                                className: "text-sm font-bold mt-1 text-right",
                                                children: phone
                                            }, void 0, false, {
                                                fileName: "[project]/components/Header.tsx",
                                                lineNumber: 198,
                                                columnNumber: 19
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$client$2f$app$2d$dir$2f$link$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"], {
                                                href: "/track",
                                                role: "menuitem",
                                                onClick: ()=>setAccountOpen(false),
                                                className: "block mt-3 py-2 text-sm border-t border-white/10 hover:text-[var(--color-ember-light)]",
                                                children: "پیگیری سفارش"
                                            }, void 0, false, {
                                                fileName: "[project]/components/Header.tsx",
                                                lineNumber: 201,
                                                columnNumber: 19
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                                role: "menuitem",
                                                onClick: async ()=>{
                                                    setAccountOpen(false);
                                                    await logout();
                                                },
                                                className: "block w-full text-right py-2 text-sm border-t border-white/10 text-red-300 hover:text-red-200",
                                                children: "خروج از حساب"
                                            }, void 0, false, {
                                                fileName: "[project]/components/Header.tsx",
                                                lineNumber: 209,
                                                columnNumber: 19
                                            }, this)
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/components/Header.tsx",
                                        lineNumber: 193,
                                        columnNumber: 17
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/components/Header.tsx",
                                lineNumber: 175,
                                columnNumber: 13
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                onClick: ()=>setMenuOpen((v)=>!v),
                                "aria-label": "باز کردن منو",
                                "aria-expanded": menuOpen,
                                className: "md:hidden w-10 h-10 rounded-full border border-white/12 flex flex-col items-center justify-center gap-1",
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                        className: `block w-[18px] h-[1.5px] bg-current transition-transform ${menuOpen ? "rotate-45 translate-y-[3px]" : ""}`
                                    }, void 0, false, {
                                        fileName: "[project]/components/Header.tsx",
                                        lineNumber: 230,
                                        columnNumber: 13
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                        className: `block w-[18px] h-[1.5px] bg-current ${menuOpen ? "opacity-0" : ""}`
                                    }, void 0, false, {
                                        fileName: "[project]/components/Header.tsx",
                                        lineNumber: 235,
                                        columnNumber: 13
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                        className: `block w-[18px] h-[1.5px] bg-current transition-transform ${menuOpen ? "-rotate-45 -translate-y-[3px]" : ""}`
                                    }, void 0, false, {
                                        fileName: "[project]/components/Header.tsx",
                                        lineNumber: 236,
                                        columnNumber: 13
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/components/Header.tsx",
                                lineNumber: 224,
                                columnNumber: 11
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/components/Header.tsx",
                        lineNumber: 129,
                        columnNumber: 9
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/components/Header.tsx",
                lineNumber: 103,
                columnNumber: 7
            }, this),
            showLoginHint && hintX !== null && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                type: "button",
                onClick: openLogin,
                "aria-label": "برای سفارش آنلاین لطفاً وارد شوید",
                className: "login-hint absolute top-full z-[101] block text-right",
                style: {
                    left: Math.max(12, hintX - 110)
                },
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                        "aria-hidden": "true",
                        className: "hand-bob absolute top-1 block w-8 text-center text-[28px] leading-none select-none drop-shadow-[0_2px_6px_rgba(0,0,0,0.6)]",
                        style: {
                            left: hintX - Math.max(12, hintX - 110) - 16
                        },
                        children: "👆"
                    }, void 0, false, {
                        fileName: "[project]/components/Header.tsx",
                        lineNumber: 255,
                        columnNumber: 11
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                        className: "mt-10 block whitespace-nowrap rounded-full bg-[var(--color-ember)] px-3.5 py-1.5 text-[11px] sm:text-xs font-bold text-white shadow-[0_6px_20px_rgba(0,0,0,0.45)]",
                        children: "برای سفارش آنلاین لطفاً وارد شوید"
                    }, void 0, false, {
                        fileName: "[project]/components/Header.tsx",
                        lineNumber: 262,
                        columnNumber: 11
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/components/Header.tsx",
                lineNumber: 247,
                columnNumber: 9
            }, this),
            menuOpen && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("nav", {
                className: "md:hidden bg-[var(--color-ink)]/97 backdrop-blur-md border-t border-white/5 px-5 py-3 flex flex-col gap-1",
                children: [
                    ready && phone && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$client$2f$app$2d$dir$2f$link$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"], {
                        href: "/menu",
                        onClick: ()=>setMenuOpen(false),
                        className: "btn-primary !py-3 text-sm mb-2",
                        children: "سفارش آنلاین"
                    }, void 0, false, {
                        fileName: "[project]/components/Header.tsx",
                        lineNumber: 271,
                        columnNumber: 13
                    }, this),
                    NAV_ITEMS.map((item)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$client$2f$app$2d$dir$2f$link$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"], {
                            href: item.href,
                            onClick: ()=>setMenuOpen(false),
                            className: "py-3 text-sm border-b border-white/5 last:border-0",
                            children: item.label
                        }, item.href, false, {
                            fileName: "[project]/components/Header.tsx",
                            lineNumber: 280,
                            columnNumber: 13
                        }, this))
                ]
            }, void 0, true, {
                fileName: "[project]/components/Header.tsx",
                lineNumber: 269,
                columnNumber: 9
            }, this)
        ]
    }, void 0, true, {
        fileName: "[project]/components/Header.tsx",
        lineNumber: 98,
        columnNumber: 5
    }, this);
}
}),
"[project]/components/CartDrawer.tsx [app-ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "default",
    ()=>CartDrawer
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react-jsx-dev-runtime.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$client$2f$app$2d$dir$2f$link$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/client/app-dir/link.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$context$2f$CartContext$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/context/CartContext.tsx [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$context$2f$AuthContext$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/context/AuthContext.tsx [app-ssr] (ecmascript)");
"use client";
;
;
;
;
function formatPrice(n) {
    return n.toLocaleString("fa-IR");
}
function CartDrawer() {
    const { lines, total, isOpen, closeCart, incrementItem, decrementItem, removeItem } = (0, __TURBOPACK__imported__module__$5b$project$5d2f$context$2f$CartContext$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useCart"])();
    const { phone, ready, openLogin } = (0, __TURBOPACK__imported__module__$5b$project$5d2f$context$2f$AuthContext$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useAuth"])();
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["Fragment"], {
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                onClick: closeCart,
                className: `fixed inset-0 bg-black/70 z-[140] transition-opacity ${isOpen ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none"}`,
                "aria-hidden": "true"
            }, void 0, false, {
                fileName: "[project]/components/CartDrawer.tsx",
                lineNumber: 18,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("aside", {
                role: "dialog",
                "aria-label": "سبد سفارش",
                className: `fixed top-0 bottom-0 left-0 z-[150] w-full max-w-sm bg-[var(--color-charcoal)] border-l border-white/10 flex flex-col transition-transform duration-300 ${isOpen ? "translate-x-0" : "-translate-x-full"}`,
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "flex items-center justify-between px-5 py-4 border-b border-white/10",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("h2", {
                                className: "font-extrabold text-lg",
                                children: "سبد سفارش شما"
                            }, void 0, false, {
                                fileName: "[project]/components/CartDrawer.tsx",
                                lineNumber: 35,
                                columnNumber: 11
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                onClick: closeCart,
                                "aria-label": "بستن سبد",
                                className: "w-9 h-9 rounded-full flex items-center justify-center hover:bg-white/5",
                                children: "✕"
                            }, void 0, false, {
                                fileName: "[project]/components/CartDrawer.tsx",
                                lineNumber: 36,
                                columnNumber: 11
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/components/CartDrawer.tsx",
                        lineNumber: 34,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "flex-1 overflow-y-auto px-5 py-4 space-y-4",
                        children: lines.length === 0 ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                            className: "text-[var(--color-ash)] text-sm mt-10 text-center",
                            children: "سبد سفارش شما خالی است. از منو چیزی اضافه کنید."
                        }, void 0, false, {
                            fileName: "[project]/components/CartDrawer.tsx",
                            lineNumber: 47,
                            columnNumber: 13
                        }, this) : lines.map((line)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "flex items-center justify-between gap-3",
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        className: "flex-1 min-w-0",
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                                className: "font-bold text-sm truncate",
                                                children: line.name
                                            }, void 0, false, {
                                                fileName: "[project]/components/CartDrawer.tsx",
                                                lineNumber: 54,
                                                columnNumber: 19
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                                className: "text-xs text-[var(--color-ash)] mt-0.5",
                                                children: [
                                                    formatPrice(line.price),
                                                    " تومان"
                                                ]
                                            }, void 0, true, {
                                                fileName: "[project]/components/CartDrawer.tsx",
                                                lineNumber: 55,
                                                columnNumber: 19
                                            }, this)
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/components/CartDrawer.tsx",
                                        lineNumber: 53,
                                        columnNumber: 17
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        className: "flex items-center gap-2 shrink-0",
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                                onClick: ()=>decrementItem(line.id),
                                                "aria-label": "کم کردن",
                                                className: "w-7 h-7 rounded-full border border-white/15 flex items-center justify-center text-sm hover:border-[var(--color-ember)]",
                                                children: "−"
                                            }, void 0, false, {
                                                fileName: "[project]/components/CartDrawer.tsx",
                                                lineNumber: 60,
                                                columnNumber: 19
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                className: "w-5 text-center text-sm",
                                                children: line.qty
                                            }, void 0, false, {
                                                fileName: "[project]/components/CartDrawer.tsx",
                                                lineNumber: 67,
                                                columnNumber: 19
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                                onClick: ()=>incrementItem(line.id),
                                                "aria-label": "زیاد کردن",
                                                className: "w-7 h-7 rounded-full border border-white/15 flex items-center justify-center text-sm hover:border-[var(--color-ember)]",
                                                children: "+"
                                            }, void 0, false, {
                                                fileName: "[project]/components/CartDrawer.tsx",
                                                lineNumber: 68,
                                                columnNumber: 19
                                            }, this)
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/components/CartDrawer.tsx",
                                        lineNumber: 59,
                                        columnNumber: 17
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                        onClick: ()=>removeItem(line.id),
                                        "aria-label": "حذف از سبد",
                                        className: "text-[var(--color-ash)] hover:text-[var(--color-ember)] text-xs shrink-0",
                                        children: "حذف"
                                    }, void 0, false, {
                                        fileName: "[project]/components/CartDrawer.tsx",
                                        lineNumber: 76,
                                        columnNumber: 17
                                    }, this)
                                ]
                            }, line.id, true, {
                                fileName: "[project]/components/CartDrawer.tsx",
                                lineNumber: 52,
                                columnNumber: 15
                            }, this))
                    }, void 0, false, {
                        fileName: "[project]/components/CartDrawer.tsx",
                        lineNumber: 45,
                        columnNumber: 9
                    }, this),
                    lines.length > 0 && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "px-5 py-4 border-t border-white/10 space-y-3",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "flex items-center justify-between text-sm",
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                        className: "text-[var(--color-ash)]",
                                        children: "جمع کل"
                                    }, void 0, false, {
                                        fileName: "[project]/components/CartDrawer.tsx",
                                        lineNumber: 91,
                                        columnNumber: 15
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                        className: "font-extrabold text-base",
                                        children: [
                                            formatPrice(total),
                                            " تومان"
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/components/CartDrawer.tsx",
                                        lineNumber: 92,
                                        columnNumber: 15
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/components/CartDrawer.tsx",
                                lineNumber: 90,
                                columnNumber: 13
                            }, this),
                            ready && !phone ? // ثبت سفارش فقط برای کاربرِ واردشده با شماره موبایل
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["Fragment"], {
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                        className: "text-xs text-[var(--color-ember-light)] text-center leading-6",
                                        children: "برای ثبت سفارش آنلاین لطفاً وارد شوید"
                                    }, void 0, false, {
                                        fileName: "[project]/components/CartDrawer.tsx",
                                        lineNumber: 97,
                                        columnNumber: 17
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                        type: "button",
                                        onClick: ()=>{
                                            closeCart();
                                            openLogin();
                                        },
                                        className: "btn-primary w-full text-sm",
                                        children: "ورود با شماره موبایل"
                                    }, void 0, false, {
                                        fileName: "[project]/components/CartDrawer.tsx",
                                        lineNumber: 100,
                                        columnNumber: 17
                                    }, this)
                                ]
                            }, void 0, true) : /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$client$2f$app$2d$dir$2f$link$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"], {
                                href: "/checkout",
                                onClick: closeCart,
                                className: "btn-primary w-full text-sm",
                                children: "ادامه و ثبت سفارش"
                            }, void 0, false, {
                                fileName: "[project]/components/CartDrawer.tsx",
                                lineNumber: 112,
                                columnNumber: 15
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/components/CartDrawer.tsx",
                        lineNumber: 89,
                        columnNumber: 11
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/components/CartDrawer.tsx",
                lineNumber: 27,
                columnNumber: 7
            }, this)
        ]
    }, void 0, true);
}
}),
"[project]/components/AuthModal.tsx [app-ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "default",
    ()=>AuthModal
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react-jsx-dev-runtime.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$image$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/image.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$context$2f$AuthContext$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/context/AuthContext.tsx [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$phone$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/lib/phone.ts [app-ssr] (ecmascript)");
"use client";
;
;
;
;
;
const CODE_LENGTH = 6;
const RING_R = 15;
const RING_C = 2 * Math.PI * RING_R;
const fa = (n)=>n.toLocaleString("fa-IR");
function formatTimer(seconds) {
    return `${fa(Math.floor(seconds / 60))}:${(seconds % 60).toLocaleString("fa-IR", {
        minimumIntegerDigits: 2
    })}`;
}
/* ───────────── آیکون‌ها ───────────── */ function PhoneIcon() {
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("svg", {
        width: "20",
        height: "20",
        viewBox: "0 0 24 24",
        fill: "none",
        "aria-hidden": "true",
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("rect", {
                x: "6.5",
                y: "2.8",
                width: "11",
                height: "18.4",
                rx: "2.8",
                stroke: "currentColor",
                strokeWidth: "1.7"
            }, void 0, false, {
                fileName: "[project]/components/AuthModal.tsx",
                lineNumber: 22,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("path", {
                d: "M10.5 18h3",
                stroke: "currentColor",
                strokeWidth: "1.7",
                strokeLinecap: "round"
            }, void 0, false, {
                fileName: "[project]/components/AuthModal.tsx",
                lineNumber: 23,
                columnNumber: 7
            }, this)
        ]
    }, void 0, true, {
        fileName: "[project]/components/AuthModal.tsx",
        lineNumber: 21,
        columnNumber: 5
    }, this);
}
function ArrowIcon() {
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("svg", {
        width: "18",
        height: "18",
        viewBox: "0 0 24 24",
        fill: "none",
        "aria-hidden": "true",
        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("path", {
            d: "M19 12H5m0 0 6-6m-6 6 6 6",
            stroke: "currentColor",
            strokeWidth: "2",
            strokeLinecap: "round",
            strokeLinejoin: "round"
        }, void 0, false, {
            fileName: "[project]/components/AuthModal.tsx",
            lineNumber: 30,
            columnNumber: 7
        }, this)
    }, void 0, false, {
        fileName: "[project]/components/AuthModal.tsx",
        lineNumber: 29,
        columnNumber: 5
    }, this);
}
function Spinner() {
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("svg", {
        width: "18",
        height: "18",
        viewBox: "0 0 24 24",
        fill: "none",
        "aria-hidden": "true",
        className: "animate-spin",
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("circle", {
                cx: "12",
                cy: "12",
                r: "9",
                stroke: "currentColor",
                strokeOpacity: "0.3",
                strokeWidth: "3"
            }, void 0, false, {
                fileName: "[project]/components/AuthModal.tsx",
                lineNumber: 37,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("path", {
                d: "M21 12a9 9 0 0 0-9-9",
                stroke: "currentColor",
                strokeWidth: "3",
                strokeLinecap: "round"
            }, void 0, false, {
                fileName: "[project]/components/AuthModal.tsx",
                lineNumber: 38,
                columnNumber: 7
            }, this)
        ]
    }, void 0, true, {
        fileName: "[project]/components/AuthModal.tsx",
        lineNumber: 36,
        columnNumber: 5
    }, this);
}
function Tick({ className = "" }) {
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("svg", {
        width: "14",
        height: "14",
        viewBox: "0 0 24 24",
        fill: "none",
        "aria-hidden": "true",
        className: className,
        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("path", {
            d: "m5 12.5 4.5 4.5L19 7.5",
            stroke: "currentColor",
            strokeWidth: "3",
            strokeLinecap: "round",
            strokeLinejoin: "round"
        }, void 0, false, {
            fileName: "[project]/components/AuthModal.tsx",
            lineNumber: 45,
            columnNumber: 7
        }, this)
    }, void 0, false, {
        fileName: "[project]/components/AuthModal.tsx",
        lineNumber: 44,
        columnNumber: 5
    }, this);
}
function AuthModal() {
    const { isOpen } = (0, __TURBOPACK__imported__module__$5b$project$5d2f$context$2f$AuthContext$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useAuth"])();
    // با بسته‌شدن، کل کامپوننت برداشته می‌شود تا دفعه‌ی بعد همه‌چیز از نو شروع شود
    return isOpen ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(LoginDialog, {}, void 0, false, {
        fileName: "[project]/components/AuthModal.tsx",
        lineNumber: 54,
        columnNumber: 19
    }, this) : null;
}
function LoginDialog() {
    const { closeLogin, onLoggedIn } = (0, __TURBOPACK__imported__module__$5b$project$5d2f$context$2f$AuthContext$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useAuth"])();
    const [step, setStep] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])("phone");
    const [phoneInput, setPhoneInput] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])("");
    const [phoneTouched, setPhoneTouched] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])(false);
    const [digits, setDigits] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])(()=>Array(CODE_LENGTH).fill(""));
    const [error, setError] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])("");
    const [info, setInfo] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])("");
    const [loading, setLoading] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])(false);
    const [shake, setShake] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])(false);
    const [resendLeft, setResendLeft] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])(0);
    const [resendTotal, setResendTotal] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])(120);
    const phoneRef = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useRef"])(null);
    const boxRefs = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useRef"])([]);
    const doneTimer = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useRef"])(null);
    const phone = (0, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$phone$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["normalizeMobile"])(phoneInput);
    const digitCount = (0, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$phone$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["normalizeDigits"])(phoneInput).length;
    const liveError = phoneTouched || digitCount >= 11 ? (0, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$phone$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["mobileError"])(phoneInput) : "";
    const phoneInvalid = Boolean(liveError || error && step === "phone");
    const code = digits.join("");
    // فوکوس روی فیلدِ هر مرحله
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useEffect"])(()=>{
        if (step === "phone") phoneRef.current?.focus();
        if (step === "code") boxRefs.current[0]?.focus();
    }, [
        step
    ]);
    // بستن با Escape و جلوگیری از اسکرولِ صفحه‌ی زیرِ پنجره
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useEffect"])(()=>{
        const onKey = (e)=>{
            if (e.key === "Escape" && step !== "done") closeLogin();
        };
        window.addEventListener("keydown", onKey);
        const prevOverflow = document.body.style.overflow;
        document.body.style.overflow = "hidden";
        return ()=>{
            window.removeEventListener("keydown", onKey);
            document.body.style.overflow = prevOverflow;
        };
    }, [
        closeLogin,
        step
    ]);
    // شمارنده‌ی «ارسال مجدد»
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useEffect"])(()=>{
        if (resendLeft <= 0) return;
        const t = setInterval(()=>setResendLeft((s)=>Math.max(0, s - 1)), 1000);
        return ()=>clearInterval(t);
    }, [
        resendLeft > 0
    ]); // eslint-disable-line react-hooks/exhaustive-deps
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useEffect"])(()=>()=>{
            if (doneTimer.current) clearTimeout(doneTimer.current);
        }, []);
    function failShake() {
        setShake(true);
        setTimeout(()=>setShake(false), 500);
    }
    async function requestCode() {
        if (loading) return;
        setPhoneTouched(true);
        if (!phone) {
            setError((0, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$phone$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["mobileError"])(phoneInput));
            failShake();
            return;
        }
        setLoading(true);
        setError("");
        setInfo("");
        try {
            const res = await fetch("/api/auth/send-otp", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({
                    phone
                })
            });
            const data = await res.json().catch(()=>({}));
            if (res.ok || res.status === 429 && data.reason === "cooldown") {
                const wait = Number(res.ok ? data.resendAfter : data.retryAfter) || 120;
                setStep("code");
                setDigits(Array(CODE_LENGTH).fill(""));
                setResendTotal(res.ok ? wait : 120);
                setResendLeft(wait);
                setInfo(res.ok ? "کد ۶ رقمی برای شما پیامک شد." : "کد همین چند لحظه پیش برای شما پیامک شده؛ همان را وارد کنید.");
            } else {
                setError(data.error || "خطایی رخ داد. دوباره تلاش کنید.");
                failShake();
            }
        } catch  {
            setError("اتصال برقرار نشد. اینترنت خود را بررسی کنید.");
            failShake();
        } finally{
            setLoading(false);
        }
    }
    async function verify(value) {
        if (loading || !phone) return;
        setLoading(true);
        setError("");
        try {
            const res = await fetch("/api/auth/verify-otp", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({
                    phone,
                    code: value
                })
            });
            const data = await res.json().catch(()=>({}));
            if (res.ok && data.phone) {
                setStep("done");
                doneTimer.current = setTimeout(()=>onLoggedIn(data.phone), 1400);
                return;
            }
            setError(data.error || "کد اشتباه است.");
            if (data.reason === "expired") setResendLeft(0);
            setDigits(Array(CODE_LENGTH).fill(""));
            failShake();
            boxRefs.current[0]?.focus();
        } catch  {
            setError("اتصال برقرار نشد. اینترنت خود را بررسی کنید.");
            failShake();
        } finally{
            setLoading(false);
        }
    }
    // ورودیِ یک خانه (تایپ، چسباندن یا پُرشدنِ خودکار از پیامک)
    function onBoxChange(index, raw) {
        const clean = (0, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$phone$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["normalizeDigits"])(raw).replace(/\D/g, "");
        if (error) setError("");
        if (!clean) {
            setDigits((d)=>d.map((v, i)=>i === index ? "" : v));
            return;
        }
        const next = [
            ...digits
        ];
        if (clean.length === 2 && digits[index]) {
            // روی خانه‌ی پُر تایپ شده: فقط رقمِ تازه را بگیر
            next[index] = clean.replace(digits[index], "").slice(-1) || clean.slice(-1);
            setDigits(next);
            boxRefs.current[Math.min(index + 1, CODE_LENGTH - 1)]?.focus();
        } else {
            clean.slice(0, CODE_LENGTH - index).split("").forEach((ch, i)=>next[index + i] = ch);
            setDigits(next);
            boxRefs.current[Math.min(index + clean.length, CODE_LENGTH - 1)]?.focus();
        }
        if (next.every(Boolean)) verify(next.join(""));
    }
    function onBoxKeyDown(index, e) {
        if (e.key === "Backspace" && !digits[index] && index > 0) {
            e.preventDefault();
            setDigits((d)=>d.map((v, i)=>i === index - 1 ? "" : v));
            boxRefs.current[index - 1]?.focus();
        } else if (e.key === "ArrowLeft" && index > 0) {
            boxRefs.current[index - 1]?.focus();
        } else if (e.key === "ArrowRight" && index < CODE_LENGTH - 1) {
            boxRefs.current[index + 1]?.focus();
        }
    }
    function onBoxPaste(index, e) {
        e.preventDefault();
        onBoxChange(index, e.clipboardData.getData("text"));
    }
    function onSubmit(e) {
        e.preventDefault();
        if (step === "phone") requestCode();
        else if (step === "code" && code.length === CODE_LENGTH) verify(code);
    }
    const canSubmit = step === "phone" ? Boolean(phone) : code.length === CODE_LENGTH;
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        className: "fixed inset-0 z-[160] flex items-end sm:items-center justify-center sm:p-6",
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "auth-fade absolute inset-0 bg-black/75",
                onClick: ()=>step !== "done" && closeLogin(),
                "aria-hidden": "true"
            }, void 0, false, {
                fileName: "[project]/components/AuthModal.tsx",
                lineNumber: 233,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                role: "dialog",
                "aria-modal": "true",
                "aria-labelledby": "login-title",
                "data-lenis-prevent": true,
                className: "auth-rise relative w-full sm:max-w-[880px] sm:grid sm:grid-cols-[1.05fr_1fr] overflow-hidden bg-[var(--color-charcoal)] border border-white/10 rounded-t-[28px] sm:rounded-[28px] shadow-[0_30px_120px_rgba(0,0,0,0.75)] max-h-[100svh] overflow-y-auto",
                children: [
                    step !== "done" && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                        type: "button",
                        onClick: closeLogin,
                        "aria-label": "بستن",
                        className: "absolute top-3.5 left-3.5 z-20 w-9 h-9 rounded-full bg-black/40 border border-white/15 flex items-center justify-center text-sm hover:bg-black/60 transition-colors",
                        children: "✕"
                    }, void 0, false, {
                        fileName: "[project]/components/AuthModal.tsx",
                        lineNumber: 247,
                        columnNumber: 11
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "order-1 sm:order-2 relative h-36 sm:h-auto sm:min-h-[580px] overflow-hidden bg-[var(--color-blood-dark)]",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$image$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"], {
                                src: "/images/texture-red-clean.jpg",
                                alt: "",
                                fill: true,
                                sizes: "(min-width: 640px) 440px, 100vw",
                                className: "object-cover object-center"
                            }, void 0, false, {
                                fileName: "[project]/components/AuthModal.tsx",
                                lineNumber: 259,
                                columnNumber: 11
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "absolute inset-0 bg-black/25"
                            }, void 0, false, {
                                fileName: "[project]/components/AuthModal.tsx",
                                lineNumber: 266,
                                columnNumber: 11
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-[var(--color-charcoal)] sm:hidden"
                            }, void 0, false, {
                                fileName: "[project]/components/AuthModal.tsx",
                                lineNumber: 268,
                                columnNumber: 11
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "absolute inset-0 hidden sm:block bg-gradient-to-r from-black/10 via-transparent to-[var(--color-charcoal)]/95"
                            }, void 0, false, {
                                fileName: "[project]/components/AuthModal.tsx",
                                lineNumber: 269,
                                columnNumber: 11
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "auth-glow absolute -top-10 left-1/2 -translate-x-1/2 w-72 h-72 rounded-full bg-[var(--color-ember)]/30 blur-3xl pointer-events-none"
                            }, void 0, false, {
                                fileName: "[project]/components/AuthModal.tsx",
                                lineNumber: 270,
                                columnNumber: 11
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "relative h-full flex sm:flex-col items-center justify-center sm:justify-between gap-4 sm:gap-0 sm:py-12 sm:px-8 text-center",
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        className: "sm:mt-6",
                                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$image$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"], {
                                            src: "/images/gorg-claw.png",
                                            alt: "",
                                            width: 197,
                                            height: 240,
                                            className: "w-14 sm:w-24 h-auto drop-shadow-[0_0_22px_rgba(241,106,79,0.55)]",
                                            priority: true
                                        }, void 0, false, {
                                            fileName: "[project]/components/AuthModal.tsx",
                                            lineNumber: 274,
                                            columnNumber: 15
                                        }, this)
                                    }, void 0, false, {
                                        fileName: "[project]/components/AuthModal.tsx",
                                        lineNumber: 273,
                                        columnNumber: 13
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        className: "hidden sm:block",
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                                className: "text-[11px] tracking-[0.45em] text-[var(--color-ember-light)]",
                                                children: "TRUST YOUR INSTINCT"
                                            }, void 0, false, {
                                                fileName: "[project]/components/AuthModal.tsx",
                                                lineNumber: 285,
                                                columnNumber: 15
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                                className: "mt-3 text-3xl font-extrabold leading-snug",
                                                children: [
                                                    "به غریزه‌ات",
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("br", {}, void 0, false, {
                                                        fileName: "[project]/components/AuthModal.tsx",
                                                        lineNumber: 288,
                                                        columnNumber: 17
                                                    }, this),
                                                    "اعتماد کن"
                                                ]
                                            }, void 0, true, {
                                                fileName: "[project]/components/AuthModal.tsx",
                                                lineNumber: 286,
                                                columnNumber: 15
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("ul", {
                                                className: "mt-8 space-y-3 text-sm text-[var(--color-bone)]/90 text-right inline-block",
                                                children: [
                                                    "بدون رمز عبور؛ فقط یک پیامک",
                                                    "کد یک‌بارمصرف، امن و سریع"
                                                ].map((t)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("li", {
                                                        className: "flex items-center gap-2.5",
                                                        children: [
                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                                className: "w-5 h-5 rounded-full bg-[var(--color-ember)]/25 border border-[var(--color-ember)]/50 flex items-center justify-center text-[var(--color-ember-light)]",
                                                                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(Tick, {}, void 0, false, {
                                                                    fileName: "[project]/components/AuthModal.tsx",
                                                                    lineNumber: 295,
                                                                    columnNumber: 23
                                                                }, this)
                                                            }, void 0, false, {
                                                                fileName: "[project]/components/AuthModal.tsx",
                                                                lineNumber: 294,
                                                                columnNumber: 21
                                                            }, this),
                                                            t
                                                        ]
                                                    }, t, true, {
                                                        fileName: "[project]/components/AuthModal.tsx",
                                                        lineNumber: 293,
                                                        columnNumber: 19
                                                    }, this))
                                            }, void 0, false, {
                                                fileName: "[project]/components/AuthModal.tsx",
                                                lineNumber: 291,
                                                columnNumber: 15
                                            }, this)
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/components/AuthModal.tsx",
                                        lineNumber: 284,
                                        columnNumber: 13
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/components/AuthModal.tsx",
                                lineNumber: 272,
                                columnNumber: 11
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/components/AuthModal.tsx",
                        lineNumber: 258,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "order-2 sm:order-1 px-6 sm:px-10 pt-1 sm:pt-12 pb-8 sm:pb-12 flex flex-col justify-center min-h-[380px]",
                        children: step === "done" ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            className: "text-center py-6",
                            role: "status",
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    className: "auth-pop mx-auto w-24 h-24 rounded-full bg-gradient-to-br from-[var(--color-ember)] to-[var(--color-blood)] shadow-[0_0_60px_rgba(221,74,52,0.5)] flex items-center justify-center",
                                    children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("svg", {
                                        width: "46",
                                        height: "46",
                                        viewBox: "0 0 24 24",
                                        fill: "none",
                                        "aria-hidden": "true",
                                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("path", {
                                            d: "m5 12.5 4.5 4.5L19 7.5",
                                            stroke: "#fff",
                                            strokeWidth: "2.6",
                                            strokeLinecap: "round",
                                            strokeLinejoin: "round",
                                            className: "auth-draw",
                                            style: {
                                                strokeDasharray: 24,
                                                strokeDashoffset: 24
                                            }
                                        }, void 0, false, {
                                            fileName: "[project]/components/AuthModal.tsx",
                                            lineNumber: 311,
                                            columnNumber: 19
                                        }, this)
                                    }, void 0, false, {
                                        fileName: "[project]/components/AuthModal.tsx",
                                        lineNumber: 310,
                                        columnNumber: 17
                                    }, this)
                                }, void 0, false, {
                                    fileName: "[project]/components/AuthModal.tsx",
                                    lineNumber: 309,
                                    columnNumber: 15
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("h2", {
                                    id: "login-title",
                                    className: "mt-6 text-2xl font-extrabold",
                                    children: "خوش آمدی!"
                                }, void 0, false, {
                                    fileName: "[project]/components/AuthModal.tsx",
                                    lineNumber: 322,
                                    columnNumber: 15
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                    dir: "ltr",
                                    className: "mt-2 text-[var(--color-ash)] text-sm",
                                    children: phone ? (0, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$phone$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["maskMobile"])(phone) : ""
                                }, void 0, false, {
                                    fileName: "[project]/components/AuthModal.tsx",
                                    lineNumber: 325,
                                    columnNumber: 15
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                    className: "mt-1 text-xs text-[var(--color-ash)]",
                                    children: "ورود با موفقیت انجام شد…"
                                }, void 0, false, {
                                    fileName: "[project]/components/AuthModal.tsx",
                                    lineNumber: 328,
                                    columnNumber: 15
                                }, this)
                            ]
                        }, void 0, true, {
                            fileName: "[project]/components/AuthModal.tsx",
                            lineNumber: 308,
                            columnNumber: 13
                        }, this) : /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["Fragment"], {
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    className: "flex items-center gap-2 mb-6",
                                    "aria-hidden": "true",
                                    children: [
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                            className: "h-1 flex-1 rounded-full bg-[var(--color-ember)]"
                                        }, void 0, false, {
                                            fileName: "[project]/components/AuthModal.tsx",
                                            lineNumber: 334,
                                            columnNumber: 17
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                            className: `h-1 flex-1 rounded-full transition-colors duration-500 ${step === "code" ? "bg-[var(--color-ember)]" : "bg-white/12"}`
                                        }, void 0, false, {
                                            fileName: "[project]/components/AuthModal.tsx",
                                            lineNumber: 335,
                                            columnNumber: 17
                                        }, this)
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/components/AuthModal.tsx",
                                    lineNumber: 333,
                                    columnNumber: 15
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    className: "auth-step",
                                    children: [
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("h2", {
                                            id: "login-title",
                                            className: "font-extrabold text-2xl leading-tight",
                                            children: step === "phone" ? "ورود به گرگ" : "کد تأیید را وارد کن"
                                        }, void 0, false, {
                                            fileName: "[project]/components/AuthModal.tsx",
                                            lineNumber: 343,
                                            columnNumber: 17
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                            className: "text-sm text-[var(--color-ash)] mt-2.5 leading-7",
                                            children: step === "phone" ? "شماره موبایلت را وارد کن؛ یک رمز یکبار مصرف برایت پیامک می‌کنیم." : /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["Fragment"], {
                                                children: [
                                                    "کد ۶ رقمی به ",
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                        dir: "ltr",
                                                        className: "font-bold text-[var(--color-bone)]",
                                                        children: phone
                                                    }, void 0, false, {
                                                        fileName: "[project]/components/AuthModal.tsx",
                                                        lineNumber: 351,
                                                        columnNumber: 36
                                                    }, this),
                                                    " پیامک شد."
                                                ]
                                            }, void 0, true)
                                        }, void 0, false, {
                                            fileName: "[project]/components/AuthModal.tsx",
                                            lineNumber: 346,
                                            columnNumber: 17
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("form", {
                                            onSubmit: onSubmit,
                                            className: "mt-6",
                                            noValidate: true,
                                            children: [
                                                step === "phone" ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                    className: shake ? "auth-shake" : "",
                                                    children: [
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                            className: "flex items-center justify-between mb-2",
                                                            children: [
                                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("label", {
                                                                    htmlFor: "login-phone",
                                                                    className: "text-sm font-bold",
                                                                    children: "شماره موبایل"
                                                                }, void 0, false, {
                                                                    fileName: "[project]/components/AuthModal.tsx",
                                                                    lineNumber: 360,
                                                                    columnNumber: 25
                                                                }, this),
                                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                                    className: "text-xs text-[var(--color-ash)]",
                                                                    "aria-hidden": "true",
                                                                    children: [
                                                                        fa(Math.min(digitCount, 11)),
                                                                        " از ",
                                                                        fa(11)
                                                                    ]
                                                                }, void 0, true, {
                                                                    fileName: "[project]/components/AuthModal.tsx",
                                                                    lineNumber: 363,
                                                                    columnNumber: 25
                                                                }, this)
                                                            ]
                                                        }, void 0, true, {
                                                            fileName: "[project]/components/AuthModal.tsx",
                                                            lineNumber: 359,
                                                            columnNumber: 23
                                                        }, this),
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                            dir: "ltr",
                                                            className: `flex items-center gap-3 rounded-2xl border bg-white/[0.04] px-4 transition-all ${phoneInvalid ? "border-red-500/70 shadow-[0_0_0_4px_rgba(239,68,68,0.12)]" : "border-white/12 focus-within:border-[var(--color-ember)] focus-within:shadow-[0_0_0_4px_rgba(221,74,52,0.16)]"}`,
                                                            children: [
                                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                                    className: "text-[var(--color-ash)]",
                                                                    children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(PhoneIcon, {}, void 0, false, {
                                                                        fileName: "[project]/components/AuthModal.tsx",
                                                                        lineNumber: 376,
                                                                        columnNumber: 27
                                                                    }, this)
                                                                }, void 0, false, {
                                                                    fileName: "[project]/components/AuthModal.tsx",
                                                                    lineNumber: 375,
                                                                    columnNumber: 25
                                                                }, this),
                                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("input", {
                                                                    ref: phoneRef,
                                                                    id: "login-phone",
                                                                    type: "tel",
                                                                    inputMode: "numeric",
                                                                    autoComplete: "tel-national",
                                                                    maxLength: 14,
                                                                    value: phoneInput,
                                                                    onChange: (e)=>{
                                                                        setPhoneInput(e.target.value.replace(/[^0-9۰-۹٠-٩+]/g, ""));
                                                                        if (error) setError("");
                                                                    },
                                                                    onBlur: ()=>phoneInput && setPhoneTouched(true),
                                                                    "aria-invalid": phoneInvalid,
                                                                    "aria-describedby": "login-phone-help",
                                                                    placeholder: "09123456789",
                                                                    className: "flex-1 min-w-0 bg-transparent py-4 text-lg font-semibold tracking-[0.12em] text-left outline-none placeholder:text-white/20 placeholder:font-normal placeholder:tracking-[0.08em]"
                                                                }, void 0, false, {
                                                                    fileName: "[project]/components/AuthModal.tsx",
                                                                    lineNumber: 378,
                                                                    columnNumber: 25
                                                                }, this),
                                                                phone && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                                    className: "auth-pop w-6 h-6 rounded-full bg-emerald-500/20 text-emerald-400 flex items-center justify-center shrink-0",
                                                                    children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(Tick, {}, void 0, false, {
                                                                        fileName: "[project]/components/AuthModal.tsx",
                                                                        lineNumber: 398,
                                                                        columnNumber: 29
                                                                    }, this)
                                                                }, void 0, false, {
                                                                    fileName: "[project]/components/AuthModal.tsx",
                                                                    lineNumber: 397,
                                                                    columnNumber: 27
                                                                }, this)
                                                            ]
                                                        }, void 0, true, {
                                                            fileName: "[project]/components/AuthModal.tsx",
                                                            lineNumber: 367,
                                                            columnNumber: 23
                                                        }, this),
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                                            id: "login-phone-help",
                                                            role: phoneInvalid ? "alert" : undefined,
                                                            className: `text-xs mt-2.5 ${phoneInvalid ? "text-red-400" : "text-[var(--color-ash)]"}`,
                                                            children: error || liveError || "شماره موبایل باید ۱۱ رقم باشد و با ۰۹ شروع شود."
                                                        }, void 0, false, {
                                                            fileName: "[project]/components/AuthModal.tsx",
                                                            lineNumber: 402,
                                                            columnNumber: 23
                                                        }, this)
                                                    ]
                                                }, void 0, true, {
                                                    fileName: "[project]/components/AuthModal.tsx",
                                                    lineNumber: 358,
                                                    columnNumber: 21
                                                }, this) : /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                    children: [
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                            dir: "ltr",
                                                            role: "group",
                                                            "aria-label": "کد ۶ رقمی",
                                                            className: `flex justify-center gap-2 sm:gap-2.5 transition-opacity ${loading ? "opacity-60" : ""} ${shake ? "auth-shake" : ""}`,
                                                            children: digits.map((d, i)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("input", {
                                                                    ref: (el)=>{
                                                                        boxRefs.current[i] = el;
                                                                    },
                                                                    type: "text",
                                                                    inputMode: "numeric",
                                                                    pattern: "[0-9]*",
                                                                    autoComplete: "one-time-code",
                                                                    value: d,
                                                                    readOnly: loading,
                                                                    onChange: (e)=>onBoxChange(i, e.target.value),
                                                                    onKeyDown: (e)=>onBoxKeyDown(i, e),
                                                                    onPaste: (e)=>onBoxPaste(i, e),
                                                                    onFocus: (e)=>e.target.select(),
                                                                    "aria-label": `رقم ${fa(i + 1)}`,
                                                                    "aria-invalid": Boolean(error),
                                                                    className: `w-11 h-14 sm:w-12 sm:h-[60px] text-center text-2xl font-bold rounded-xl border outline-none transition-all ${error ? "border-red-500/70 bg-red-500/5" : d ? "border-[var(--color-ember)]/70 bg-[var(--color-ember)]/10" : "border-white/12 bg-white/[0.04] focus:border-[var(--color-ember)] focus:shadow-[0_0_0_4px_rgba(221,74,52,0.16)]"}`
                                                                }, i, false, {
                                                                    fileName: "[project]/components/AuthModal.tsx",
                                                                    lineNumber: 421,
                                                                    columnNumber: 27
                                                                }, this))
                                                        }, void 0, false, {
                                                            fileName: "[project]/components/AuthModal.tsx",
                                                            lineNumber: 412,
                                                            columnNumber: 23
                                                        }, this),
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                                            role: "status",
                                                            className: `text-xs mt-4 text-center min-h-[1.25rem] ${error ? "text-red-400" : "text-[var(--color-ash)]"}`,
                                                            children: error || info
                                                        }, void 0, false, {
                                                            fileName: "[project]/components/AuthModal.tsx",
                                                            lineNumber: 449,
                                                            columnNumber: 23
                                                        }, this),
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                            className: "flex items-center justify-between mt-4 text-sm",
                                                            children: [
                                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                                                    type: "button",
                                                                    onClick: ()=>{
                                                                        setStep("phone");
                                                                        setDigits(Array(CODE_LENGTH).fill(""));
                                                                        setError("");
                                                                        setInfo("");
                                                                    },
                                                                    className: "text-[var(--color-ash)] hover:text-[var(--color-ember-light)] transition-colors",
                                                                    children: "ویرایش شماره"
                                                                }, void 0, false, {
                                                                    fileName: "[project]/components/AuthModal.tsx",
                                                                    lineNumber: 457,
                                                                    columnNumber: 25
                                                                }, this),
                                                                resendLeft > 0 ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                                    className: "flex items-center gap-2 text-[var(--color-ash)]",
                                                                    children: [
                                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                                            className: "relative w-9 h-9 flex items-center justify-center text-[10px] text-[var(--color-bone)]",
                                                                            children: [
                                                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("svg", {
                                                                                    width: "36",
                                                                                    height: "36",
                                                                                    viewBox: "0 0 36 36",
                                                                                    className: "absolute inset-0 -rotate-90",
                                                                                    "aria-hidden": "true",
                                                                                    children: [
                                                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("circle", {
                                                                                            cx: "18",
                                                                                            cy: "18",
                                                                                            r: RING_R,
                                                                                            fill: "none",
                                                                                            stroke: "rgba(255,255,255,0.1)",
                                                                                            strokeWidth: "2.5"
                                                                                        }, void 0, false, {
                                                                                            fileName: "[project]/components/AuthModal.tsx",
                                                                                            lineNumber: 474,
                                                                                            columnNumber: 33
                                                                                        }, this),
                                                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("circle", {
                                                                                            cx: "18",
                                                                                            cy: "18",
                                                                                            r: RING_R,
                                                                                            fill: "none",
                                                                                            stroke: "var(--color-ember)",
                                                                                            strokeWidth: "2.5",
                                                                                            strokeLinecap: "round",
                                                                                            strokeDasharray: RING_C,
                                                                                            strokeDashoffset: RING_C * (1 - resendLeft / resendTotal),
                                                                                            style: {
                                                                                                transition: "stroke-dashoffset 1s linear"
                                                                                            }
                                                                                        }, void 0, false, {
                                                                                            fileName: "[project]/components/AuthModal.tsx",
                                                                                            lineNumber: 475,
                                                                                            columnNumber: 33
                                                                                        }, this)
                                                                                    ]
                                                                                }, void 0, true, {
                                                                                    fileName: "[project]/components/AuthModal.tsx",
                                                                                    lineNumber: 473,
                                                                                    columnNumber: 31
                                                                                }, this),
                                                                                formatTimer(resendLeft)
                                                                            ]
                                                                        }, void 0, true, {
                                                                            fileName: "[project]/components/AuthModal.tsx",
                                                                            lineNumber: 472,
                                                                            columnNumber: 29
                                                                        }, this),
                                                                        "ارسال مجدد"
                                                                    ]
                                                                }, void 0, true, {
                                                                    fileName: "[project]/components/AuthModal.tsx",
                                                                    lineNumber: 471,
                                                                    columnNumber: 27
                                                                }, this) : /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                                                    type: "button",
                                                                    onClick: requestCode,
                                                                    disabled: loading,
                                                                    className: "text-[var(--color-ember-light)] font-bold disabled:opacity-50",
                                                                    children: "ارسال مجدد کد"
                                                                }, void 0, false, {
                                                                    fileName: "[project]/components/AuthModal.tsx",
                                                                    lineNumber: 493,
                                                                    columnNumber: 27
                                                                }, this)
                                                            ]
                                                        }, void 0, true, {
                                                            fileName: "[project]/components/AuthModal.tsx",
                                                            lineNumber: 456,
                                                            columnNumber: 23
                                                        }, this)
                                                    ]
                                                }, void 0, true, {
                                                    fileName: "[project]/components/AuthModal.tsx",
                                                    lineNumber: 411,
                                                    columnNumber: 21
                                                }, this),
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                                    type: "submit",
                                                    disabled: loading || !canSubmit,
                                                    className: "btn-primary w-full !py-3.5 mt-6 disabled:opacity-40 disabled:pointer-events-none",
                                                    children: loading ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["Fragment"], {
                                                        children: [
                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(Spinner, {}, void 0, false, {
                                                                fileName: "[project]/components/AuthModal.tsx",
                                                                lineNumber: 513,
                                                                columnNumber: 25
                                                            }, this),
                                                            " کمی صبر کن…"
                                                        ]
                                                    }, void 0, true) : step === "phone" ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["Fragment"], {
                                                        children: [
                                                            "دریافت کد ورود ",
                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(ArrowIcon, {}, void 0, false, {
                                                                fileName: "[project]/components/AuthModal.tsx",
                                                                lineNumber: 517,
                                                                columnNumber: 40
                                                            }, this)
                                                        ]
                                                    }, void 0, true) : "ورود"
                                                }, void 0, false, {
                                                    fileName: "[project]/components/AuthModal.tsx",
                                                    lineNumber: 506,
                                                    columnNumber: 19
                                                }, this)
                                            ]
                                        }, void 0, true, {
                                            fileName: "[project]/components/AuthModal.tsx",
                                            lineNumber: 356,
                                            columnNumber: 17
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                            className: "text-[11px] text-[var(--color-ash)] mt-5 leading-6 text-center",
                                            children: "کد ورود را در اختیار هیچ‌کس قرار نده؛ ما هرگز آن را از تو نمی‌پرسیم."
                                        }, void 0, false, {
                                            fileName: "[project]/components/AuthModal.tsx",
                                            lineNumber: 525,
                                            columnNumber: 17
                                        }, this)
                                    ]
                                }, step, true, {
                                    fileName: "[project]/components/AuthModal.tsx",
                                    lineNumber: 342,
                                    columnNumber: 15
                                }, this)
                            ]
                        }, void 0, true)
                    }, void 0, false, {
                        fileName: "[project]/components/AuthModal.tsx",
                        lineNumber: 306,
                        columnNumber: 9
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/components/AuthModal.tsx",
                lineNumber: 239,
                columnNumber: 7
            }, this)
        ]
    }, void 0, true, {
        fileName: "[project]/components/AuthModal.tsx",
        lineNumber: 232,
        columnNumber: 5
    }, this);
}
}),
"[project]/components/PublicOnly.tsx [app-ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "default",
    ()=>PublicOnly
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react-jsx-dev-runtime.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$navigation$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/navigation.js [app-ssr] (ecmascript)");
"use client";
;
;
function PublicOnly({ children }) {
    const pathname = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$navigation$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["usePathname"])();
    if (pathname?.startsWith("/admin")) return null;
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["Fragment"], {
        children: children
    }, void 0, false);
}
}),
"[externals]/next/dist/server/app-render/after-task-async-storage.external.js [external] (next/dist/server/app-render/after-task-async-storage.external.js, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("next/dist/server/app-render/after-task-async-storage.external.js", () => require("next/dist/server/app-render/after-task-async-storage.external.js"));

module.exports = mod;
}),
"[externals]/next/dist/server/app-render/dynamic-access-async-storage.external.js [external] (next/dist/server/app-render/dynamic-access-async-storage.external.js, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("next/dist/server/app-render/dynamic-access-async-storage.external.js", () => require("next/dist/server/app-render/dynamic-access-async-storage.external.js"));

module.exports = mod;
}),
];

//# sourceMappingURL=%5Broot-of-the-server%5D__1qpoj_c._.js.map