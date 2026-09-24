(globalThis["TURBOPACK"] || (globalThis["TURBOPACK"] = [])).push([typeof document === "object" ? document.currentScript : undefined,
"[project]/components/AddToCartButton.tsx [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "default",
    ()=>AddToCartButton
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/index.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$context$2f$CartContext$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/context/CartContext.tsx [app-client] (ecmascript)");
;
var _s = __turbopack_context__.k.signature();
"use client";
;
;
function AddToCartButton({ id, name, price, className = "", disabled = false }) {
    _s();
    const { addItem } = (0, __TURBOPACK__imported__module__$5b$project$5d2f$context$2f$CartContext$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useCart"])();
    const [justAdded, setJustAdded] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(false);
    if (disabled) {
        return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
            className: `inline-flex items-center justify-center text-xs font-bold rounded-full px-4 py-2 bg-white/6 text-[var(--color-ash)] ${className}`,
            children: "ناموجود"
        }, void 0, false, {
            fileName: "[project]/components/AddToCartButton.tsx",
            lineNumber: 25,
            columnNumber: 7
        }, this);
    }
    const handleClick = ()=>{
        addItem({
            id,
            name,
            price
        });
        setJustAdded(true);
        setTimeout(()=>setJustAdded(false), 1400);
    };
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
        onClick: handleClick,
        className: `inline-flex items-center justify-center gap-1.5 text-xs font-bold rounded-full px-4 py-2 transition-colors ${justAdded ? "bg-[var(--color-ember)] text-white" : "bg-white/8 text-[var(--color-bone)] hover:bg-[var(--color-ember)] hover:text-white"} ${className}`,
        children: justAdded ? "افزوده شد ✓" : "افزودن به سبد"
    }, void 0, false, {
        fileName: "[project]/components/AddToCartButton.tsx",
        lineNumber: 38,
        columnNumber: 5
    }, this);
}
_s(AddToCartButton, "Q7na6e3+y0XdL+UpWSLxFYn+3vs=", false, function() {
    return [
        __TURBOPACK__imported__module__$5b$project$5d2f$context$2f$CartContext$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useCart"]
    ];
});
_c = AddToCartButton;
var _c;
__turbopack_context__.k.register(_c, "AddToCartButton");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/components/FxTilt.tsx [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "default",
    ()=>FxTilt,
    "useTilt",
    ()=>useTilt
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/index.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$client$2f$app$2d$dir$2f$link$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/client/app-dir/link.js [app-client] (ecmascript)");
;
var _s = __turbopack_context__.k.signature(), _s1 = __turbopack_context__.k.signature();
"use client";
;
;
function useTilt(max = 7) {
    _s();
    const ref = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useRef"])(null);
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useEffect"])({
        "useTilt.useEffect": ()=>{
            const el = ref.current;
            if (!el) return;
            const fine = window.matchMedia("(hover: hover) and (pointer: fine)");
            const reduce = window.matchMedia("(prefers-reduced-motion: reduce)");
            if (!fine.matches) return;
            const spot = el.querySelector(":scope > .fx-spot");
            let raf = 0;
            let rect = null;
            let rectAt = 0;
            let mx = 0;
            let my = 0;
            const apply = {
                "useTilt.useEffect.apply": ()=>{
                    raf = 0;
                    const now = performance.now();
                    // اندازه‌گیریِ مستطیل گران است؛ فقط هر ۳۰۰ میلی‌ثانیه (اسکرول هم جابه‌جایش می‌کند)
                    if (!rect || now - rectAt > 300) {
                        rect = el.getBoundingClientRect();
                        rectAt = now;
                    }
                    const r = rect;
                    if (!r.width || !r.height) return;
                    const px = Math.min(1, Math.max(0, (mx - r.left) / r.width));
                    const py = Math.min(1, Math.max(0, (my - r.top) / r.height));
                    if (!reduce.matches) {
                        el.style.transform = `perspective(900px) rotateX(${((0.5 - py) * max).toFixed(2)}deg) rotateY(${((px - 0.5) * max).toFixed(2)}deg)`;
                    }
                    if (spot) {
                        spot.style.transform = `translate3d(${((px - 0.5) * r.width).toFixed(1)}px, ${((py - 0.5) * r.height).toFixed(1)}px, 0)`;
                    }
                }
            }["useTilt.useEffect.apply"];
            const onEnter = {
                "useTilt.useEffect.onEnter": ()=>{
                    rect = el.getBoundingClientRect();
                    rectAt = performance.now();
                }
            }["useTilt.useEffect.onEnter"];
            const onMove = {
                "useTilt.useEffect.onMove": (e)=>{
                    if (e.pointerType !== "mouse") return;
                    mx = e.clientX;
                    my = e.clientY;
                    if (!raf) raf = requestAnimationFrame(apply);
                }
            }["useTilt.useEffect.onMove"];
            const onLeave = {
                "useTilt.useEffect.onLeave": ()=>{
                    if (raf) cancelAnimationFrame(raf);
                    raf = 0;
                    rect = null;
                    el.style.transform = "";
                    if (spot) spot.style.transform = "";
                }
            }["useTilt.useEffect.onLeave"];
            el.addEventListener("pointerenter", onEnter);
            el.addEventListener("pointermove", onMove, {
                passive: true
            });
            el.addEventListener("pointerleave", onLeave);
            return ({
                "useTilt.useEffect": ()=>{
                    el.removeEventListener("pointerenter", onEnter);
                    el.removeEventListener("pointermove", onMove);
                    el.removeEventListener("pointerleave", onLeave);
                    if (raf) cancelAnimationFrame(raf);
                }
            })["useTilt.useEffect"];
        }
    }["useTilt.useEffect"], [
        max
    ]);
    return ref;
}
_s(useTilt, "8uVE59eA/r6b92xF80p7sH8rXLk=");
/** لکه‌ی نورِ دنبال‌کننده‌ی ماوس + قابِ درخشانِ چرخان (هر دو فقط موقعِ هاور دیده می‌شوند) */ function Fx() {
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Fragment"], {
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                className: "fx-spot",
                "aria-hidden": "true"
            }, void 0, false, {
                fileName: "[project]/components/FxTilt.tsx",
                lineNumber: 101,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                className: "fx-ring",
                "aria-hidden": "true",
                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("i", {}, void 0, false, {
                    fileName: "[project]/components/FxTilt.tsx",
                    lineNumber: 103,
                    columnNumber: 9
                }, this)
            }, void 0, false, {
                fileName: "[project]/components/FxTilt.tsx",
                lineNumber: 102,
                columnNumber: 7
            }, this)
        ]
    }, void 0, true);
}
_c = Fx;
function FxTilt({ as = "div", href, max = 7, className = "", children, onClick, ...aria }) {
    _s1();
    const ref = useTilt(max);
    const cls = `fx-tilt ${className}`;
    if (as === "link" && href) {
        return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$client$2f$app$2d$dir$2f$link$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"], {
            ref: ref,
            href: href,
            className: cls,
            ...aria,
            children: [
                children,
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(Fx, {}, void 0, false, {
                    fileName: "[project]/components/FxTilt.tsx",
                    lineNumber: 117,
                    columnNumber: 9
                }, this)
            ]
        }, void 0, true, {
            fileName: "[project]/components/FxTilt.tsx",
            lineNumber: 115,
            columnNumber: 7
        }, this);
    }
    if (as === "button") {
        return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
            ref: ref,
            type: "button",
            onClick: onClick,
            className: cls,
            ...aria,
            children: [
                children,
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(Fx, {}, void 0, false, {
                    fileName: "[project]/components/FxTilt.tsx",
                    lineNumber: 125,
                    columnNumber: 9
                }, this)
            ]
        }, void 0, true, {
            fileName: "[project]/components/FxTilt.tsx",
            lineNumber: 123,
            columnNumber: 7
        }, this);
    }
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        ref: ref,
        className: cls,
        ...aria,
        children: [
            children,
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(Fx, {}, void 0, false, {
                fileName: "[project]/components/FxTilt.tsx",
                lineNumber: 132,
                columnNumber: 7
            }, this)
        ]
    }, void 0, true, {
        fileName: "[project]/components/FxTilt.tsx",
        lineNumber: 130,
        columnNumber: 5
    }, this);
}
_s1(FxTilt, "iioziJg9pkIyPlqm6CuKvIOXKYw=", false, function() {
    return [
        useTilt
    ];
});
_c1 = FxTilt;
var _c, _c1;
__turbopack_context__.k.register(_c, "Fx");
__turbopack_context__.k.register(_c1, "FxTilt");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/hooks/useGsap.ts [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "useGsap",
    ()=>useGsap
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/index.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$gsap$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$locals$3e$__ = __turbopack_context__.i("[project]/lib/gsap.ts [app-client] (ecmascript) <locals>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$gsap$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$locals$3e$__ = __turbopack_context__.i("[project]/node_modules/gsap/index.js [app-client] (ecmascript) <locals>");
var _s = __turbopack_context__.k.signature();
;
;
function useGsap(callback, deps = []) {
    _s();
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useLayoutEffect"])({
        "useGsap.useLayoutEffect": ()=>{
            const ctx = __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$gsap$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$locals$3e$__["gsap"].context(callback);
            return ({
                "useGsap.useLayoutEffect": ()=>ctx.revert()
            })["useGsap.useLayoutEffect"];
        // eslint-disable-next-line react-hooks/exhaustive-deps
        }
    }["useGsap.useLayoutEffect"], deps);
}
_s(useGsap, "n7/vCynhJvM+pLkyL2DMQUF0odM=");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/lib/ingredientLabels.ts [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "ingredientLabels",
    ()=>ingredientLabels
]);
const ingredientLabels = [
    {
        id: "bun-top",
        name: "نان بالایی",
        detail: "کنجدی، تازه از فر",
        topPercentDesktop: 13,
        topPercentMobile: 27,
        side: "right"
    },
    {
        id: "cheese",
        name: "پنیر چدار",
        detail: "آب‌شده روی گوشت داغ",
        topPercentDesktop: 31,
        topPercentMobile: 36.5,
        side: "left"
    },
    {
        id: "patty",
        name: "گوشت",
        detail: "۱۰۰٪ گوساله، گریل‌شده",
        topPercentDesktop: 41,
        topPercentMobile: 41,
        side: "right"
    },
    {
        id: "bacon",
        name: "بیکن",
        detail: "ترد و دودی",
        topPercentDesktop: 53,
        topPercentMobile: 48,
        side: "left"
    },
    {
        id: "onion",
        name: "پیاز قرمز",
        detail: "تازه و برشی",
        topPercentDesktop: 61,
        topPercentMobile: 54,
        side: "right"
    },
    {
        id: "tomato",
        name: "گوجه",
        detail: "تازه و آبدار",
        topPercentDesktop: 68,
        topPercentMobile: 59,
        side: "left"
    },
    {
        id: "lettuce",
        name: "کاهو",
        detail: "ترد و خنک",
        topPercentDesktop: 78,
        topPercentMobile: 64,
        side: "right"
    },
    {
        id: "bun-bottom",
        name: "نان پایینی",
        detail: "پایه‌ی نگه‌دارنده",
        topPercentDesktop: 90,
        topPercentMobile: 72,
        side: "left"
    }
];
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/components/FireStory/IngredientLabelCard.tsx [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "default",
    ()=>__TURBOPACK__default__export__
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/index.js [app-client] (ecmascript)");
"use client";
;
;
const IngredientLabelCard = /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["forwardRef"])(_c = function IngredientLabelCard({ label, reachPercent }, ref) {
    const isRight = label.side === "right";
    return(// dir="ltr" عمداً اینجاست: چون صفحه‌ی سایت RTL است، flex-direction:row
    // در حالت عادی از راست‌به‌چپ می‌چیند (برعکس چیزی که اینجا لازم داریم).
    //
    // چرا خط با flex:1 به‌جای عرض ثابت؟ چون با عرض ثابت (مثلاً ۱۱۰px)،
    // روی صفحه‌ی پهن دسکتاپ فاصله‌ی واقعی تا خودِ همبرگر خیلی بیشتر از
    // ۱۱۰px می‌شود و خط وسط هوا قطع می‌شود؛ با flex:1 داخل یک ظرف با
    // عرضِ نسبت‌به‌ویوپورت (reachPercent%)، خط همیشه دقیقاً تا لبه‌ی
    // همبرگر کشیده می‌شود، چه روی موبایل چه دسکتاپ.
    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        ref: ref,
        dir: "ltr",
        className: "absolute flex items-center",
        style: {
            top: `${label.topPercent}%`,
            [isRight ? "right" : "left"]: "2%",
            width: `${reachPercent}%`,
            opacity: 0,
            transform: "translateY(-50%)",
            flexDirection: isRight ? "row-reverse" : "row"
        },
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "rounded-2xl px-4 py-3 sm:px-6 sm:py-4 backdrop-blur-md bg-white/10 border border-white/25 shadow-lg shrink-0",
                style: {
                    maxWidth: "min(78vw, 260px)"
                },
                dir: "rtl",
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                        className: "text-white font-extrabold text-sm sm:text-lg leading-tight",
                        children: label.name
                    }, void 0, false, {
                        fileName: "[project]/components/FireStory/IngredientLabelCard.tsx",
                        lineNumber: 45,
                        columnNumber: 11
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                        className: "text-white/70 text-xs sm:text-sm mt-1 leading-tight",
                        children: label.detail
                    }, void 0, false, {
                        fileName: "[project]/components/FireStory/IngredientLabelCard.tsx",
                        lineNumber: 46,
                        columnNumber: 11
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/components/FireStory/IngredientLabelCard.tsx",
                lineNumber: 40,
                columnNumber: 9
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "flex-1 h-[1.5px] bg-white/85 min-w-[10px]"
            }, void 0, false, {
                fileName: "[project]/components/FireStory/IngredientLabelCard.tsx",
                lineNumber: 50,
                columnNumber: 9
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                className: "shrink-0 w-[9px] h-[9px] rounded-full border-[1.5px] border-white/95 relative",
                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                    className: "absolute inset-[2.5px] rounded-full bg-white/95"
                }, void 0, false, {
                    fileName: "[project]/components/FireStory/IngredientLabelCard.tsx",
                    lineNumber: 52,
                    columnNumber: 11
                }, this)
            }, void 0, false, {
                fileName: "[project]/components/FireStory/IngredientLabelCard.tsx",
                lineNumber: 51,
                columnNumber: 9
            }, this)
        ]
    }, void 0, true, {
        fileName: "[project]/components/FireStory/IngredientLabelCard.tsx",
        lineNumber: 26,
        columnNumber: 7
    }, this));
});
_c1 = IngredientLabelCard;
const __TURBOPACK__default__export__ = IngredientLabelCard;
var _c, _c1;
__turbopack_context__.k.register(_c, "IngredientLabelCard$forwardRef");
__turbopack_context__.k.register(_c1, "IngredientLabelCard");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/components/FireStory/FrameSequencePlayer.tsx [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "default",
    ()=>__TURBOPACK__default__export__
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/index.js [app-client] (ecmascript)");
;
var _s = __turbopack_context__.k.signature();
"use client";
;
// ترکیبِ دو فریمِ همسایه (frame blending) حرکتِ کند را نرم می‌کند، ولی وقتی
// بین دو فریم تغییرِ زیادی باشد (کاهوی در حال افتادن، دود) «تصویر دوتایی /
// روح» می‌سازد. پیش‌فرض خاموش است. فقط اگر فیلمتان فریم‌های بسیار نزدیک به
// هم دارد (مثلاً ۳۰۰+ فریم) روشنش کنید.
const BLEND_FRAMES = false;
// بوم پس‌زمینه فقط ۲ ردیف پیکسل است: ردیف اول = رنگ‌های لبه‌ی بالای فریم،
// ردیف دوم = رنگ‌های لبه‌ی پایین. مرورگر موقع کشیدنش روی کل صفحه، آن را
// نرم می‌کند؛ نتیجه این است که رنگ‌های لبه‌ی فیلم بی‌درز به بالا و پایین
// صفحه ادامه پیدا می‌کند (بدون هیچ خواندنِ پیکسل یا فیلترِ سنگین).
const BACKDROP_W = 12;
const BACKDROP_H = 2;
// محو شدن لبه‌ی بالا و پایین فریمِ وسط، تا خطِ سخت بین فیلم و پس‌زمینه دیده نشود
const FRAME_EDGE_MASK = "linear-gradient(to bottom, transparent 0%, #000 16%, #000 84%, transparent 100%)";
/**
 * پخش‌کننده‌ی «دنباله‌ی فریم» روی canvas (به‌جای <video currentTime=...>
 * که با اسکرول سریع، از موتور دیکود مرورگر عبور می‌کند و لگ می‌زند).
 */ const FrameSequencePlayer = /*#__PURE__*/ _s((0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["forwardRef"])(_c = _s(function FrameSequencePlayer({ frameCount, framePrefix, onFirstFrameReady, fit = "cover", zoom = 1 }, ref) {
    _s();
    const canvasRef = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useRef"])(null);
    const backdropRef = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useRef"])(null);
    const stepRef = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useRef"])(null);
    const imagesRef = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useRef"])([]);
    // موقعیتِ فعلی به‌صورت اعشاری (۰ تا frameCount-1)
    const positionRef = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useRef"])(0);
    // کلیدِ آخرین چیزی که کشیده شد؛ اگر تغییری نکرده باشد دوباره نمی‌کشیم
    const lastKeyRef = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useRef"])("");
    const [firstFrameReady, setFirstFrameReady] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(false);
    const [aspect, setAspect] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(16 / 9);
    const drawCover = (canvas, img, next, mix = 0)=>{
        const ctx = canvas.getContext("2d");
        if (!ctx) return;
        // سقفِ ۲ برای dpr: فریم‌های منبع فقط ۷۲۰/۱۲۸۰ پیکسل‌اند؛ روی گوشی‌های
        // dpr=۳ کشیدنِ کانواسِ ۳ برابری فقط بارِ اضافه روی پردازنده می‌گذاشت
        // (و همان چیزی است که اسکرول سریع را روی موبایل «ناصاف» می‌کند).
        const dpr = Math.min(window.devicePixelRatio || 1, 2);
        const pxW = Math.round(canvas.clientWidth * dpr);
        const pxH = Math.round(canvas.clientHeight * dpr);
        if (pxW === 0 || pxH === 0) return;
        if (canvas.width !== pxW || canvas.height !== pxH) {
            canvas.width = pxW;
            canvas.height = pxH;
        }
        ctx.globalAlpha = 1;
        ctx.clearRect(0, 0, pxW, pxH);
        const paint = (im)=>{
            const scale = Math.max(pxW / im.naturalWidth, pxH / im.naturalHeight);
            const drawW = im.naturalWidth * scale;
            const drawH = im.naturalHeight * scale;
            ctx.drawImage(im, (pxW - drawW) / 2, (pxH - drawH) / 2, drawW, drawH);
        };
        paint(img);
        if (next && mix > 0) {
            ctx.globalAlpha = mix;
            paint(next);
            ctx.globalAlpha = 1;
        }
    };
    const drawContain = (canvas, img, next, mix = 0)=>{
        const ctx = canvas.getContext("2d");
        if (!ctx) return;
        // بوم فریم هم‌نسبت با خود فیلم است (CSS آن را هم‌عرض صفحه می‌کند)،
        // پس کافی است کل تصویر را بدون هیچ برشی در آن بکشیم.
        const dpr = Math.min(window.devicePixelRatio || 1, 2);
        const pxW = Math.round(canvas.clientWidth * dpr);
        if (pxW === 0) return;
        const pxH = Math.round(pxW * img.naturalHeight / img.naturalWidth);
        if (canvas.width !== pxW || canvas.height !== pxH) {
            canvas.width = pxW;
            canvas.height = pxH;
        }
        ctx.globalAlpha = 1;
        ctx.drawImage(img, 0, 0, pxW, pxH);
        if (next && mix > 0) {
            ctx.globalAlpha = mix;
            ctx.drawImage(next, 0, 0, pxW, pxH);
            ctx.globalAlpha = 1;
        }
        // پس‌زمینه: لبه‌ی بالا و پایین فریم را به دو ردیف کوچک می‌کنیم (دو مرحله‌ای
        // تا نویز/دندانه ایجاد نشود). عمداً از ctx.filter استفاده نشده چون در
        // Safari/iOS پشتیبانی نمی‌شود.
        const backdrop = backdropRef.current;
        if (!backdrop) return;
        if (!stepRef.current) {
            const step = document.createElement("canvas");
            step.width = 192;
            step.height = 108;
            stepRef.current = step;
        }
        const stepCtx = stepRef.current.getContext("2d");
        const bctx = backdrop.getContext("2d");
        if (!stepCtx || !bctx) return;
        stepCtx.imageSmoothingQuality = "high";
        stepCtx.drawImage(img, 0, 0, 192, 108);
        bctx.imageSmoothingQuality = "high";
        bctx.drawImage(stepRef.current, 0, 0, 192, 10, 0, 0, BACKDROP_W, 1); // لبه‌ی بالا
        bctx.drawImage(stepRef.current, 0, 98, 192, 10, 0, 1, BACKDROP_W, 1); // لبه‌ی پایین
    };
    const isReady = (img)=>!!img && img.complete && img.naturalWidth > 0;
    // روی شبکه‌ی کند (مثلاً LTE)، ممکن است دقیقاً فریمی که الان لازم داریم
    // هنوز دانلود نشده باشد. قبلاً در این حالت drawFrame هیچ‌کاری نمی‌کرد
    // و بومِ صفحه دقیقاً روی همان فریمِ قبلی «فریز» می‌ماند — همان حسِ
    // گیر کردنِ مصنوعی که با اسکرولِ سریع دیده می‌شود. حالا به‌جایش
    // نزدیک‌ترین فریمِ آماده را نشان می‌دهیم تا چیزی هرچند نه ۱۰۰٪ دقیق،
    // ولی هم‌جهت با اسکرول دیده شود؛ و به‌محض رسیدنِ فریمِ واقعی (در
    // onload پایین‌تر) خودش جای آن را می‌گیرد.
    const resolveImage = (index)=>{
        const images = imagesRef.current;
        const direct = images[index];
        if (isReady(direct)) return direct;
        for(let offset = 1; offset < images.length; offset++){
            const before = images[index - offset];
            if (isReady(before)) return before;
            const after = images[index + offset];
            if (isReady(after)) return after;
        }
        return undefined;
    };
    // position اعشاری است: بخشِ صحیحش فریمِ پایه و بخشِ اعشاریش درصدِ
    // ترکیب با فریمِ بعدی. حالتِ «تقریباً دقیقاً روی یک فریم» را گرد می‌کنیم
    // تا برای هر تغییرِ ناچیز دوباره چیزی کشیده نشود.
    const drawFrame = (position, force = false)=>{
        const canvas = canvasRef.current;
        if (!canvas) return;
        let base = Math.floor(position);
        let mix = ("TURBOPACK compile-time falsy", 0) ? "TURBOPACK unreachable" : 0;
        if ("TURBOPACK compile-time truthy", 1) base = Math.round(position);
        else if (mix < 0.03) mix = 0;
        else if (mix > 0.97) {
            base += 1;
            mix = 0;
        }
        base = Math.min(frameCount - 1, Math.max(0, base));
        const key = `${base}:${Math.round(mix * 32)}`;
        if (!force && key === lastKeyRef.current) return;
        const img = resolveImage(base);
        if (!img) return;
        const nextDirect = mix > 0 ? imagesRef.current[base + 1] : undefined;
        const next = isReady(nextDirect) ? nextDirect : undefined;
        lastKeyRef.current = key;
        if (fit === "contain-blur") drawContain(canvas, img, next, next ? mix : 0);
        else drawCover(canvas, img, next, next ? mix : 0);
    };
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useImperativeHandle"])(ref, {
        "FrameSequencePlayer.FrameSequencePlayer.useImperativeHandle": ()=>({
                setProgress: ({
                    "FrameSequencePlayer.FrameSequencePlayer.useImperativeHandle": (progress)=>{
                        const clamped = Math.min(1, Math.max(0, progress));
                        const position = clamped * (frameCount - 1);
                        positionRef.current = position;
                        drawFrame(position);
                    }
                })["FrameSequencePlayer.FrameSequencePlayer.useImperativeHandle"]
            })
    }["FrameSequencePlayer.FrameSequencePlayer.useImperativeHandle"]);
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useEffect"])({
        "FrameSequencePlayer.FrameSequencePlayer.useEffect": ()=>{
            let cancelled = false;
            const images = Array.from({
                length: frameCount
            }, {
                "FrameSequencePlayer.FrameSequencePlayer.useEffect.images": ()=>new Image()
            }["FrameSequencePlayer.FrameSequencePlayer.useEffect.images"]);
            imagesRef.current = images;
            // با ۳۰۰ فریم، درخواستِ همه‌ی فریم‌ها با هم (به‌ترتیب ۱ تا ۳۰۰) شبکه را
            // خفه می‌کرد و روی موبایل/LTE اسکرولِ اول فقط فریم‌های ابتدایی را می‌دید.
            // حالا «درشت به ریز» بارگذاری می‌شود: اول فریمِ اول و آخر، بعد هر ۳۲تا،
            // بعد هر ۱۶تا، ... تا همه. پس از همان ثانیه‌های اول، کل فیلم (با فریمِ
            // نزدیک) قابل‌اسکرول است و بعد فریم‌ها ریزتر می‌شوند.
            const order = [];
            const seen = new Set();
            const add = {
                "FrameSequencePlayer.FrameSequencePlayer.useEffect.add": (i)=>{
                    if (i >= 0 && i < frameCount && !seen.has(i)) {
                        seen.add(i);
                        order.push(i);
                    }
                }
            }["FrameSequencePlayer.FrameSequencePlayer.useEffect.add"];
            add(0);
            add(frameCount - 1);
            for (const stride of [
                32,
                16,
                8,
                4,
                2,
                1
            ]){
                for(let i = 0; i < frameCount; i += stride)add(i);
            }
            const MAX_PARALLEL = 6;
            let cursor = 0;
            let active = 0;
            const pump = {
                "FrameSequencePlayer.FrameSequencePlayer.useEffect.pump": ()=>{
                    while(!cancelled && active < MAX_PARALLEL && cursor < order.length){
                        const i = order[cursor++];
                        const img = images[i];
                        active++;
                        const finish = {
                            "FrameSequencePlayer.FrameSequencePlayer.useEffect.pump.finish": ()=>{
                                active--;
                                pump();
                            }
                        }["FrameSequencePlayer.FrameSequencePlayer.useEffect.pump.finish"];
                        img.decoding = "async";
                        img.onload = ({
                            "FrameSequencePlayer.FrameSequencePlayer.useEffect.pump": ()=>{
                                if (!cancelled) {
                                    if (i === 0) {
                                        setAspect(img.naturalWidth / img.naturalHeight);
                                        setFirstFrameReady(true);
                                        onFirstFrameReady?.();
                                    }
                                    // هر فریمی که برسد ممکن است دقیقاً همانی باشد که الان لازم داریم
                                    // (یا از فریمِ جایگزینِ فعلی به هدف نزدیک‌تر باشد)، پس دوباره رسم کن
                                    drawFrame(positionRef.current, true);
                                }
                                finish();
                            }
                        })["FrameSequencePlayer.FrameSequencePlayer.useEffect.pump"];
                        img.onerror = finish;
                        img.src = `${framePrefix}${String(i + 1).padStart(3, "0")}.jpg`;
                    }
                }
            }["FrameSequencePlayer.FrameSequencePlayer.useEffect.pump"];
            pump();
            const redraw = {
                "FrameSequencePlayer.FrameSequencePlayer.useEffect.redraw": ()=>drawFrame(positionRef.current, true)
            }["FrameSequencePlayer.FrameSequencePlayer.useEffect.redraw"];
            const ro = new ResizeObserver(redraw);
            if (canvasRef.current) ro.observe(canvasRef.current);
            window.addEventListener("orientationchange", redraw);
            return ({
                "FrameSequencePlayer.FrameSequencePlayer.useEffect": ()=>{
                    cancelled = true;
                    ro.disconnect();
                    window.removeEventListener("orientationchange", redraw);
                }
            })["FrameSequencePlayer.FrameSequencePlayer.useEffect"];
        // eslint-disable-next-line react-hooks/exhaustive-deps
        }
    }["FrameSequencePlayer.FrameSequencePlayer.useEffect"], [
        frameCount,
        framePrefix,
        fit
    ]);
    const fade = {
        opacity: firstFrameReady ? 1 : 0,
        transition: "opacity 0.3s"
    };
    if (fit === "contain-blur") {
        return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Fragment"], {
            children: [
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("canvas", {
                    ref: backdropRef,
                    width: BACKDROP_W,
                    height: BACKDROP_H,
                    "aria-hidden": "true",
                    className: "absolute inset-0 w-full h-full",
                    style: fade
                }, void 0, false, {
                    fileName: "[project]/components/FireStory/FrameSequencePlayer.tsx",
                    lineNumber: 287,
                    columnNumber: 9
                }, this),
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    "aria-hidden": "true",
                    className: "absolute inset-0 pointer-events-none",
                    style: {
                        background: "linear-gradient(to bottom, var(--color-ink) 0%, rgba(13,4,3,0.7) 20%, rgba(13,4,3,0.25) 38%, rgba(13,4,3,0.25) 62%, rgba(13,4,3,0.7) 80%, var(--color-ink) 100%)"
                    }
                }, void 0, false, {
                    fileName: "[project]/components/FireStory/FrameSequencePlayer.tsx",
                    lineNumber: 296,
                    columnNumber: 9
                }, this),
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("canvas", {
                    ref: canvasRef,
                    className: "absolute top-1/2 left-1/2",
                    style: {
                        ...fade,
                        width: `${zoom * 100}%`,
                        aspectRatio: String(aspect),
                        transform: "translate(-50%, -50%)",
                        maskImage: FRAME_EDGE_MASK,
                        WebkitMaskImage: FRAME_EDGE_MASK
                    }
                }, void 0, false, {
                    fileName: "[project]/components/FireStory/FrameSequencePlayer.tsx",
                    lineNumber: 304,
                    columnNumber: 9
                }, this)
            ]
        }, void 0, true);
    }
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("canvas", {
        ref: canvasRef,
        className: "absolute inset-0 w-full h-full",
        style: fade
    }, void 0, false, {
        fileName: "[project]/components/FireStory/FrameSequencePlayer.tsx",
        lineNumber: 320,
        columnNumber: 10
    }, this);
}, "FnDlZpV79H8K2M0QmCUC8YGjx7Y=")), "FnDlZpV79H8K2M0QmCUC8YGjx7Y=");
_c1 = FrameSequencePlayer;
const __TURBOPACK__default__export__ = FrameSequencePlayer;
var _c, _c1;
__turbopack_context__.k.register(_c, "FrameSequencePlayer$forwardRef");
__turbopack_context__.k.register(_c1, "FrameSequencePlayer");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/components/FireStory/FireStoryShowcase.tsx [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "default",
    ()=>FireStoryShowcase
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/index.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$gsap$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$locals$3e$__ = __turbopack_context__.i("[project]/lib/gsap.ts [app-client] (ecmascript) <locals>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$gsap$2f$ScrollTrigger$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/gsap/ScrollTrigger.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$hooks$2f$useGsap$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/hooks/useGsap.ts [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$context$2f$CartContext$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/context/CartContext.tsx [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$ingredientLabels$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/lib/ingredientLabels.ts [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$FireStory$2f$IngredientLabelCard$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/components/FireStory/IngredientLabelCard.tsx [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$FireStory$2f$FrameSequencePlayer$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/components/FireStory/FrameSequencePlayer.tsx [app-client] (ecmascript)");
;
var _s = __turbopack_context__.k.signature();
"use client";
;
;
;
;
;
;
;
const MOBILE_BREAKPOINT = 768;
// ═══════════════ نرمیِ «سینمایی» فیلم ═══════════════
// فیلم مستقیم به موقعیتِ اسکرول چسبیده نیست؛ یک «دنبال‌کننده‌ی فنری» بین
// این دو قرار دارد (SmoothDamp؛ همان الگوریتمِ Unity/بازی‌ها). فرقش با
// scrub/lerp این است که «سرعت» را هم نگه می‌دارد:
//  - شروعِ حرکت ناگهانی نیست و پایانش هم؛ با برداشتنِ انگشت یا ایستادنِ
//    چرخِ ماوس، فیلم با سرعتِ رو‌به‌کاهش چند لحظه‌ی دیگر ادامه می‌دهد؛
//  - هر «تقِ» ویل فقط یک ضربه‌ی کوچک به سرعت می‌زند و بینِ تق‌ها فیلم
//    نمی‌ایستد.
// عدد بزرگ‌تر = دنباله‌ی طولانی‌تر و سنگین‌تر/سینمایی‌تر (زمان بر حسب ثانیه).
// عدد کوچک‌تر = واکنشِ سریع‌تر. بازه‌ی منطقی: ۰٫۳ تا ۱٫۰
const SMOOTH_TIME = 0.6;
// دنبال‌کننده‌ی فنری بحرانی (critically damped). مقدار جدید و سرعتِ جدید را برمی‌گرداند.
function smoothDamp(current, target, velocity, smoothTime, dt) {
    const omega = 2 / smoothTime;
    const x = omega * dt;
    const e = 1 / (1 + x + 0.48 * x * x + 0.235 * x * x * x);
    const change = current - target;
    const temp = (velocity + omega * change) * dt;
    const nextVelocity = (velocity - omega * temp) * e;
    const next = target + (change + temp) * e;
    return [
        next,
        nextVelocity
    ];
}
const DESKTOP_FRAMES = {
    count: 300,
    prefix: "/video/frames/frame_",
    reach: 36
};
const MOBILE_FRAMES = {
    count: 300,
    prefix: "/video/frames-mobile/frame_",
    reach: 27
};
// برچسب‌های شیشه‌ای مواد تشکیل‌دهنده برای «فیلم قدیمی» کالیبره شده بودند
// (همان فریمِ باز/اکسپلود‌شده‌ی همبرگر که هر ماده در ارتفاع مشخصی می‌ایستاد).
// فیلم جدید چنین نمای بازشده‌ای ندارد، پس فعلاً این لایه رندر نمی‌شود
// (پایین‌تر، رندر IngredientLabelCard غیرفعال شده) تا برچسب‌ها روی جای
// اشتباهی از تصویر ننشینند. توابع/ثابت‌های زیر برای برگرداندنِ راحت‌تر
// این قابلیت نگه داشته شده‌اند.
const LABEL_FADE_IN_END = 0.06;
const LABEL_HOLD_END = 0.22;
const LABEL_FADE_OUT_END = 0.4;
function labelOpacityForProgress(p) {
    if (p < LABEL_FADE_IN_END) return p / LABEL_FADE_IN_END;
    if (p < LABEL_HOLD_END) return 1;
    if (p < LABEL_FADE_OUT_END) return 1 - (p - LABEL_HOLD_END) / (LABEL_FADE_OUT_END - LABEL_HOLD_END);
    return 0;
}
function FireStoryShowcase({ heroItem }) {
    _s();
    const sectionRef = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useRef"])(null);
    const playerRef = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useRef"])(null);
    // پیشرفتِ واقعیِ اسکرول (هدف) / پیشرفتِ نمایش‌داده‌شده / سرعتِ آن
    const targetRef = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useRef"])(0);
    const shownRef = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useRef"])(0);
    const velocityRef = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useRef"])(0);
    const rafRef = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useRef"])(null);
    const wakeRef = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useRef"])({
        "FireStoryShowcase.useRef[wakeRef]": ()=>{}
    }["FireStoryShowcase.useRef[wakeRef]"]);
    const labelRefs = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useRef"])([]);
    const [showCta, setShowCta] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(false);
    const [device, setDevice] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(null);
    const { addItem } = (0, __TURBOPACK__imported__module__$5b$project$5d2f$context$2f$CartContext$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useCart"])();
    // heroItem: آیتم منو که دکمه‌ی زیر انیمیشن به سبد اضافه می‌کند (از دیتابیسِ منو می‌آید)
    // تشخیص دستگاه فقط سمت کلاینت انجام می‌شود (window در SSR وجود ندارد).
    // این همگام‌سازی با محیط مرورگر است، نه state مشتق‌شده.
    // فیلم موبایل عمودی (۹:۱۶) است و فیلم دسکتاپ افقی؛ پس صفحه‌ی عمودی
    // (موبایل یا تبلتِ ایستاده) فیلم موبایل می‌گیرد و صفحه‌ی افقی فیلم دسکتاپ.
    // با چرخاندن گوشی هم فیلم مناسبِ جهتِ جدید انتخاب می‌شود.
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useEffect"])({
        "FireStoryShowcase.useEffect": ()=>{
            const detect = {
                "FireStoryShowcase.useEffect.detect": ()=>window.innerWidth < MOBILE_BREAKPOINT || window.innerHeight > window.innerWidth ? "mobile" : "desktop"
            }["FireStoryShowcase.useEffect.detect"];
            // eslint-disable-next-line react-hooks/set-state-in-effect
            setDevice(detect());
            const onResize = {
                "FireStoryShowcase.useEffect.onResize": ()=>setDevice({
                        "FireStoryShowcase.useEffect.onResize": (prev)=>{
                            const next = detect();
                            return next === prev ? prev : next;
                        }
                    }["FireStoryShowcase.useEffect.onResize"])
            }["FireStoryShowcase.useEffect.onResize"];
            window.addEventListener("resize", onResize);
            window.addEventListener("orientationchange", onResize);
            return ({
                "FireStoryShowcase.useEffect": ()=>{
                    window.removeEventListener("resize", onResize);
                    window.removeEventListener("orientationchange", onResize);
                }
            })["FireStoryShowcase.useEffect"];
        }
    }["FireStoryShowcase.useEffect"], []);
    // حلقه‌ی دنبال‌کننده. فقط وقتی فیلم هنوز در حال حرکت است اجرا می‌شود و
    // به‌محض رسیدن به هدف خودش را خاموش می‌کند (روی موبایل باتری نمی‌خورد).
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useEffect"])({
        "FireStoryShowcase.useEffect": ()=>{
            let last = 0;
            const tick = {
                "FireStoryShowcase.useEffect.tick": (now)=>{
                    const dt = Math.min(0.05, Math.max(0.001, (now - last) / 1000));
                    last = now;
                    const target = targetRef.current;
                    const [next, nextVelocity] = smoothDamp(shownRef.current, target, velocityRef.current, SMOOTH_TIME, dt);
                    shownRef.current = Math.min(1, Math.max(0, next));
                    velocityRef.current = nextVelocity;
                    const settled = Math.abs(shownRef.current - target) < 0.00005 && Math.abs(velocityRef.current) < 0.0002;
                    if (settled) {
                        shownRef.current = target;
                        velocityRef.current = 0;
                    }
                    playerRef.current?.setProgress(shownRef.current);
                    const labelOpacity = String(labelOpacityForProgress(shownRef.current));
                    labelRefs.current.forEach({
                        "FireStoryShowcase.useEffect.tick": (el)=>{
                            if (el) el.style.opacity = labelOpacity;
                        }
                    }["FireStoryShowcase.useEffect.tick"]);
                    setShowCta(shownRef.current > 0.9);
                    rafRef.current = settled ? null : requestAnimationFrame(tick);
                }
            }["FireStoryShowcase.useEffect.tick"];
            wakeRef.current = ({
                "FireStoryShowcase.useEffect": ()=>{
                    if (rafRef.current !== null) return;
                    last = performance.now();
                    rafRef.current = requestAnimationFrame(tick);
                }
            })["FireStoryShowcase.useEffect"];
            return ({
                "FireStoryShowcase.useEffect": ()=>{
                    if (rafRef.current !== null) cancelAnimationFrame(rafRef.current);
                    rafRef.current = null;
                    wakeRef.current = ({
                        "FireStoryShowcase.useEffect": ()=>{}
                    })["FireStoryShowcase.useEffect"];
                }
            })["FireStoryShowcase.useEffect"];
        }
    }["FireStoryShowcase.useEffect"], []);
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$hooks$2f$useGsap$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useGsap"])({
        "FireStoryShowcase.useGsap": ()=>{
            if (!sectionRef.current) return;
            const existing = __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$gsap$2f$ScrollTrigger$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["ScrollTrigger"].getById("fire-story");
            existing?.kill();
            // نکته: اینجا دیگر نه pin داریم و نه scrub.
            //  - pin: قابِ فیلم با CSS «sticky» (کلاس sticky پایین) می‌چسبد. pin در
            //    GSAP روی موبایل با position:fixed کار می‌کند و وسطِ اسکرولِ لمسی
            //    (مخصوصاً iOS) لرزش/پرش می‌دهد و می‌تواند حرکتِ باقی‌مانده‌ی انگشت را
            //    ببُرد؛ sticky را خودِ مرورگر روی GPU انجام می‌دهد و اصلاً نمی‌لرزد.
            //  - scrub: نرمی حالا با دنبال‌کننده‌ی فنریِ بالا (SmoothDamp) انجام
            //    می‌شود که سرعت را حفظ می‌کند؛ scrub فقط یک تأخیرِ ساده بود.
            // طولِ مسیر همان قبلی است (۳۲۰vh منهای یک صفحه)، پس سرعتِ فیلم عوض نشده.
            __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$gsap$2f$ScrollTrigger$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["ScrollTrigger"].create({
                id: "fire-story",
                trigger: sectionRef.current,
                start: "top top",
                end: "bottom bottom",
                invalidateOnRefresh: true,
                onUpdate: {
                    "FireStoryShowcase.useGsap": (self)=>{
                        targetRef.current = self.progress;
                        wakeRef.current();
                    }
                }["FireStoryShowcase.useGsap"],
                // بعد از لودِ صفحه/تغییرِ اندازه (مثلاً باز کردنِ صفحه وسطِ اسکرول)
                // فیلم باید یک‌راست روی جای درست بنشیند، نه اینکه از فریمِ اول بدود.
                onRefresh: {
                    "FireStoryShowcase.useGsap": (self)=>{
                        targetRef.current = self.progress;
                        shownRef.current = self.progress;
                        velocityRef.current = 0;
                        playerRef.current?.setProgress(self.progress);
                    }
                }["FireStoryShowcase.useGsap"]
            });
        }
    }["FireStoryShowcase.useGsap"], []);
    const frameSet = device === "mobile" ? MOBILE_FRAMES : DESKTOP_FRAMES;
    return(// این عدد = مسافتِ فیزیکیِ اسکرول لازم برای دیدنِ کل ۱۰۰ فریم.
    // ۵۲۰vh (بیش از ۵ صفحه‌ی کامل) باعث می‌شد روی موبایل هر سوایپ فقط
    // بخش خیلی کوچکی از انیمیشن را جلو ببرد و کل بخش «تمام‌نشدنی» و
    // بی‌واکنش حس شود. ۳۲۰vh هم‌چنان فضای کافی برای حرکتِ آرام و
    // سینمایی می‌دهد ولی خیلی زودتر جواب می‌دهد. عدد کاملاً دلخواه
    // است — بزرگ‌تر = کندتر/سینمایی‌تر، کوچک‌تر = سریع‌تر/فرزتر.
    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("section", {
        ref: sectionRef,
        className: "relative",
        style: {
            height: "320vh"
        },
        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
            className: "sticky top-0 h-screen w-full overflow-hidden bg-[var(--color-ink)]",
            style: {
                height: "100svh"
            },
            children: [
                device && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$components$2f$FireStory$2f$FrameSequencePlayer$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"], {
                    ref: playerRef,
                    frameCount: frameSet.count,
                    framePrefix: frameSet.prefix,
                    fit: "cover",
                    onFirstFrameReady: ()=>{
                        // پلیرِ تازه (اولین بار یا بعد از چرخاندنِ گوشی) از فریمِ اول شروع
                        // می‌کند؛ همان لحظه به جای درستِ اسکرول برسانش.
                        shownRef.current = targetRef.current;
                        velocityRef.current = 0;
                        playerRef.current?.setProgress(targetRef.current);
                    }
                }, device, false, {
                    fileName: "[project]/components/FireStory/FireStoryShowcase.tsx",
                    lineNumber: 197,
                    columnNumber: 11
                }, this),
                false && device && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    className: "absolute inset-0",
                    children: __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$ingredientLabels$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["ingredientLabels"].map((label, i)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$components$2f$FireStory$2f$IngredientLabelCard$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"], {
                            ref: (el)=>{
                                labelRefs.current[i] = el;
                            },
                            reachPercent: frameSet.reach,
                            label: {
                                id: label.id,
                                name: label.name,
                                detail: label.detail,
                                side: label.side,
                                topPercent: device === "mobile" ? label.topPercentMobile : label.topPercentDesktop
                            }
                        }, label.id, false, {
                            fileName: "[project]/components/FireStory/FireStoryShowcase.tsx",
                            lineNumber: 223,
                            columnNumber: 15
                        }, this))
                }, void 0, false, {
                    fileName: "[project]/components/FireStory/FireStoryShowcase.tsx",
                    lineNumber: 221,
                    columnNumber: 11
                }, this),
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    className: "absolute inset-x-0 top-0 h-40 bg-gradient-to-b from-[var(--color-ink)] via-[var(--color-ink)]/40 to-transparent pointer-events-none"
                }, void 0, false, {
                    fileName: "[project]/components/FireStory/FireStoryShowcase.tsx",
                    lineNumber: 240,
                    columnNumber: 9
                }, this),
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    className: "absolute inset-x-0 bottom-0 h-40 bg-gradient-to-t from-[var(--color-ink)] via-[var(--color-ink)]/40 to-transparent pointer-events-none"
                }, void 0, false, {
                    fileName: "[project]/components/FireStory/FireStoryShowcase.tsx",
                    lineNumber: 241,
                    columnNumber: 9
                }, this),
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    className: "pointer-events-none absolute top-16 sm:top-20 inset-x-0 text-center px-5",
                    children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                        className: "text-xs tracking-[0.3em] text-[var(--color-ember-light)] uppercase",
                        children: "Gorg Burger"
                    }, void 0, false, {
                        fileName: "[project]/components/FireStory/FireStoryShowcase.tsx",
                        lineNumber: 244,
                        columnNumber: 11
                    }, this)
                }, void 0, false, {
                    fileName: "[project]/components/FireStory/FireStoryShowcase.tsx",
                    lineNumber: 243,
                    columnNumber: 9
                }, this),
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    className: "absolute bottom-6 inset-x-0 flex justify-center transition-opacity duration-500",
                    style: {
                        opacity: showCta ? 1 : 0,
                        pointerEvents: showCta ? "auto" : "none"
                    },
                    children: heroItem && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                        onClick: ()=>addItem({
                                id: heroItem.id,
                                name: heroItem.name,
                                price: heroItem.price
                            }),
                        className: "btn-primary",
                        children: [
                            "افزودن ",
                            heroItem.name,
                            " به سبد"
                        ]
                    }, void 0, true, {
                        fileName: "[project]/components/FireStory/FireStoryShowcase.tsx",
                        lineNumber: 252,
                        columnNumber: 13
                    }, this)
                }, void 0, false, {
                    fileName: "[project]/components/FireStory/FireStoryShowcase.tsx",
                    lineNumber: 247,
                    columnNumber: 9
                }, this)
            ]
        }, void 0, true, {
            fileName: "[project]/components/FireStory/FireStoryShowcase.tsx",
            lineNumber: 187,
            columnNumber: 7
        }, this)
    }, void 0, false, {
        fileName: "[project]/components/FireStory/FireStoryShowcase.tsx",
        lineNumber: 185,
        columnNumber: 5
    }, this));
}
_s(FireStoryShowcase, "8UwuVD34/MqjI4Nu+0V5mQOoSwY=", false, function() {
    return [
        __TURBOPACK__imported__module__$5b$project$5d2f$context$2f$CartContext$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useCart"],
        __TURBOPACK__imported__module__$5b$project$5d2f$hooks$2f$useGsap$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useGsap"]
    ];
});
_c = FireStoryShowcase;
var _c;
__turbopack_context__.k.register(_c, "FireStoryShowcase");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/components/InstallAppSection.tsx [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "default",
    ()=>InstallAppSection
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/index.js [app-client] (ecmascript)");
;
var _s = __turbopack_context__.k.signature();
"use client";
;
function InstallAppSection() {
    _s();
    const [deferredPrompt, setDeferredPrompt] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(null);
    const [isIos, setIsIos] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(false);
    const [installed, setInstalled] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(false);
    const [showIosHelp, setShowIosHelp] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(false);
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useEffect"])({
        "InstallAppSection.useEffect": ()=>{
            if ("serviceWorker" in navigator) {
                navigator.serviceWorker.register("/sw.js").catch({
                    "InstallAppSection.useEffect": ()=>{
                    // نصب سرویس‌ورکر شکست بخورد، مشکلی نیست؛ فقط دکمه‌ی نصب کار نمی‌کند
                    }
                }["InstallAppSection.useEffect"]);
            }
            // تشخیص iOS/حالت standalone فقط از API های مرورگری قابل‌خواندن است،
            // نه چیزی مشتق‌شده از state دیگر؛ پس این همگام‌سازیِ یک‌باره با محیط
            // مرورگر (نه یک anti-pattern derived-state) در effect لازم است.
            const ua = window.navigator.userAgent;
            // eslint-disable-next-line react-hooks/set-state-in-effect
            setIsIos(/iPad|iPhone|iPod/.test(ua) && !window.MSStream);
            if (window.matchMedia("(display-mode: standalone)").matches) {
                setInstalled(true);
            }
            const onBeforeInstall = {
                "InstallAppSection.useEffect.onBeforeInstall": (e)=>{
                    e.preventDefault();
                    setDeferredPrompt(e);
                }
            }["InstallAppSection.useEffect.onBeforeInstall"];
            const onInstalled = {
                "InstallAppSection.useEffect.onInstalled": ()=>setInstalled(true)
            }["InstallAppSection.useEffect.onInstalled"];
            window.addEventListener("beforeinstallprompt", onBeforeInstall);
            window.addEventListener("appinstalled", onInstalled);
            return ({
                "InstallAppSection.useEffect": ()=>{
                    window.removeEventListener("beforeinstallprompt", onBeforeInstall);
                    window.removeEventListener("appinstalled", onInstalled);
                }
            })["InstallAppSection.useEffect"];
        }
    }["InstallAppSection.useEffect"], []);
    if (installed) return null;
    const handleClick = async ()=>{
        if (deferredPrompt) {
            await deferredPrompt.prompt();
            await deferredPrompt.userChoice;
            setDeferredPrompt(null);
            return;
        }
        if (isIos) {
            setShowIosHelp((v)=>!v);
        }
    };
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("section", {
        className: "max-w-3xl mx-auto px-5 py-20 text-center",
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "claw-divider mx-auto mb-6",
                "aria-hidden": "true"
            }, void 0, false, {
                fileName: "[project]/components/InstallAppSection.tsx",
                lineNumber: 64,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h2", {
                className: "text-2xl font-extrabold mb-3",
                children: "اپلیکیشن گرگ رو نصب کنید"
            }, void 0, false, {
                fileName: "[project]/components/InstallAppSection.tsx",
                lineNumber: 65,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                className: "text-[var(--color-ash)] mb-6 max-w-lg mx-auto",
                children: "بدون نیاز به مراجعه به فروشگاه اپلیکیشن، گرگ رو مثل یک اپ روی صفحه‌ی اصلی گوشیتون نصب کنید؛ سریع‌تر باز می‌شه و آیکون اختصاصی داره."
            }, void 0, false, {
                fileName: "[project]/components/InstallAppSection.tsx",
                lineNumber: 66,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                onClick: handleClick,
                className: "btn-primary",
                children: "نسخه تحت وب گرگ"
            }, void 0, false, {
                fileName: "[project]/components/InstallAppSection.tsx",
                lineNumber: 70,
                columnNumber: 7
            }, this),
            showIosHelp && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "gorg-card rounded-2xl p-5 mt-6 max-w-sm mx-auto text-sm text-right",
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                        className: "font-bold mb-2",
                        children: "نصب روی آیفون:"
                    }, void 0, false, {
                        fileName: "[project]/components/InstallAppSection.tsx",
                        lineNumber: 76,
                        columnNumber: 11
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("ol", {
                        className: "space-y-1.5 text-[var(--color-ash)] list-decimal pr-5",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("li", {
                                children: "دکمه‌ی Share (مربع با فلش رو به بالا) را در سافاری بزنید"
                            }, void 0, false, {
                                fileName: "[project]/components/InstallAppSection.tsx",
                                lineNumber: 78,
                                columnNumber: 13
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("li", {
                                children: "گزینه‌ی «Add to Home Screen» را انتخاب کنید"
                            }, void 0, false, {
                                fileName: "[project]/components/InstallAppSection.tsx",
                                lineNumber: 79,
                                columnNumber: 13
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("li", {
                                children: "روی Add بزنید — آیکون گرگ روی صفحه‌ی اصلی گوشیتون اضافه می‌شود"
                            }, void 0, false, {
                                fileName: "[project]/components/InstallAppSection.tsx",
                                lineNumber: 80,
                                columnNumber: 13
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/components/InstallAppSection.tsx",
                        lineNumber: 77,
                        columnNumber: 11
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/components/InstallAppSection.tsx",
                lineNumber: 75,
                columnNumber: 9
            }, this)
        ]
    }, void 0, true, {
        fileName: "[project]/components/InstallAppSection.tsx",
        lineNumber: 63,
        columnNumber: 5
    }, this);
}
_s(InstallAppSection, "0Ax1/4lURDgloFIfmQLSGZIuWg8=");
_c = InstallAppSection;
var _c;
__turbopack_context__.k.register(_c, "InstallAppSection");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/components/OrderButton.tsx [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "default",
    ()=>OrderButton
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$client$2f$app$2d$dir$2f$link$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/client/app-dir/link.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$context$2f$AuthContext$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/context/AuthContext.tsx [app-client] (ecmascript)");
;
var _s = __turbopack_context__.k.signature();
"use client";
;
;
function OrderButton({ className = "btn-primary", loginClassName = "btn-outline", children }) {
    _s();
    const { phone, ready, openLogin } = (0, __TURBOPACK__imported__module__$5b$project$5d2f$context$2f$AuthContext$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useAuth"])();
    if (!ready) return null;
    if (phone) {
        return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$client$2f$app$2d$dir$2f$link$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"], {
            href: "/menu",
            className: className,
            children: children
        }, void 0, false, {
            fileName: "[project]/components/OrderButton.tsx",
            lineNumber: 24,
            columnNumber: 7
        }, this);
    }
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
        type: "button",
        onClick: openLogin,
        className: loginClassName,
        children: "ورود برای سفارش آنلاین"
    }, void 0, false, {
        fileName: "[project]/components/OrderButton.tsx",
        lineNumber: 30,
        columnNumber: 5
    }, this);
}
_s(OrderButton, "n8wGsRMFFUyWlRlKt/JIIjN/ZDM=", false, function() {
    return [
        __TURBOPACK__imported__module__$5b$project$5d2f$context$2f$AuthContext$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useAuth"]
    ];
});
_c = OrderButton;
var _c;
__turbopack_context__.k.register(_c, "OrderButton");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/components/HomeScrollFX.tsx [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "default",
    ()=>HomeScrollFX
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/index.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$gsap$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$locals$3e$__ = __turbopack_context__.i("[project]/lib/gsap.ts [app-client] (ecmascript) <locals>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$gsap$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$locals$3e$__ = __turbopack_context__.i("[project]/node_modules/gsap/index.js [app-client] (ecmascript) <locals>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$gsap$2f$ScrollTrigger$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/gsap/ScrollTrigger.js [app-client] (ecmascript)");
var _s = __turbopack_context__.k.signature();
"use client";
;
;
function HomeScrollFX() {
    _s();
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useLayoutEffect"])({
        "HomeScrollFX.useLayoutEffect": ()=>{
            const mm = __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$gsap$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$locals$3e$__["gsap"].matchMedia();
            mm.add("(prefers-reduced-motion: no-preference)", {
                "HomeScrollFX.useLayoutEffect": ()=>{
                    const q = {
                        "HomeScrollFX.useLayoutEffect.q": (sel, root = document)=>__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$gsap$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$locals$3e$__["gsap"].utils.toArray(sel, root)
                    }["HomeScrollFX.useLayoutEffect.q"];
                    const replay = "play none none reverse";
                    // ── ۱) معرفی کوتاه: کلمه‌ها با اسکرول روشن می‌شوند ──
                    q("[data-fx-pop]").forEach({
                        "HomeScrollFX.useLayoutEffect": (el)=>{
                            __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$gsap$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$locals$3e$__["gsap"].from(el, {
                                scale: 0,
                                rotate: -40,
                                opacity: 0,
                                duration: 0.9,
                                ease: "back.out(2)",
                                scrollTrigger: {
                                    trigger: el,
                                    start: "top 88%",
                                    toggleActions: replay
                                }
                            });
                        }
                    }["HomeScrollFX.useLayoutEffect"]);
                    const words = q("[data-fx-word]");
                    if (words.length) {
                        __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$gsap$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$locals$3e$__["gsap"].fromTo(words, {
                            opacity: 0.14,
                            y: 8
                        }, {
                            opacity: 1,
                            y: 0,
                            ease: "none",
                            stagger: 0.5,
                            scrollTrigger: {
                                trigger: words[0].parentElement,
                                start: "top 82%",
                                end: "bottom 46%",
                                scrub: true
                            }
                        });
                    }
                    // ── ۲) تیتر بخش‌ها: بالا آمدن از زیرِ ماسک + کشیده شدنِ خطِ آتشین ──
                    q("[data-fx-head]").forEach({
                        "HomeScrollFX.useLayoutEffect": (head)=>{
                            const h = head.querySelector("[data-fx-h]");
                            const rule = head.querySelector("[data-fx-rule]");
                            const sub = head.querySelector("[data-fx-sub]");
                            const tl = __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$gsap$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$locals$3e$__["gsap"].timeline({
                                scrollTrigger: {
                                    trigger: head,
                                    start: "top 86%",
                                    toggleActions: replay
                                }
                            });
                            if (h) tl.from(h, {
                                yPercent: 120,
                                rotate: 4,
                                duration: 1,
                                ease: "power4.out"
                            });
                            if (rule) tl.from(rule, {
                                scaleX: 0,
                                duration: 0.9,
                                ease: "power3.out"
                            }, "-=0.6");
                            if (sub) tl.from(sub, {
                                y: 20,
                                opacity: 0,
                                duration: 0.7,
                                ease: "power2.out"
                            }, "-=0.6");
                        }
                    }["HomeScrollFX.useLayoutEffect"]);
                    // ── ۳) دسته‌های منو: هر ردیف با چرخشِ سه‌بعدی و فنر وارد می‌شود ──
                    const cats = q("[data-fx-cat]");
                    if (cats.length) {
                        const hidden = {
                            opacity: 0,
                            y: 80,
                            rotationX: -42,
                            scale: 0.86,
                            transformPerspective: 900,
                            transformOrigin: "50% 100%"
                        };
                        __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$gsap$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$locals$3e$__["gsap"].set(cats, hidden);
                        __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$gsap$2f$ScrollTrigger$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["ScrollTrigger"].batch(cats, {
                            start: "top 92%",
                            onEnter: {
                                "HomeScrollFX.useLayoutEffect": (batch)=>{
                                    __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$gsap$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$locals$3e$__["gsap"].to(batch, {
                                        opacity: 1,
                                        y: 0,
                                        rotationX: 0,
                                        scale: 1,
                                        duration: 1,
                                        ease: "back.out(1.4)",
                                        stagger: 0.1,
                                        overwrite: true
                                    });
                                    batch.forEach({
                                        "HomeScrollFX.useLayoutEffect": (c, i)=>{
                                            const icon = c.querySelector(".cat-icon");
                                            if (icon) {
                                                __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$gsap$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$locals$3e$__["gsap"].fromTo(icon, {
                                                    scale: 0,
                                                    rotate: -50
                                                }, {
                                                    scale: 1,
                                                    rotate: 0,
                                                    duration: 1.1,
                                                    delay: 0.25 + i * 0.1,
                                                    ease: "elastic.out(1, 0.5)",
                                                    overwrite: true
                                                });
                                            }
                                        }
                                    }["HomeScrollFX.useLayoutEffect"]);
                                }
                            }["HomeScrollFX.useLayoutEffect"],
                            onLeaveBack: {
                                "HomeScrollFX.useLayoutEffect": (batch)=>{
                                    __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$gsap$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$locals$3e$__["gsap"].to(batch, {
                                        ...hidden,
                                        duration: 0.4,
                                        stagger: 0.04,
                                        overwrite: true
                                    });
                                }
                            }["HomeScrollFX.useLayoutEffect"]
                        });
                    }
                    // ── ۴) پیشنهاد گرگ: هر کارت از سمتِ خودش می‌آید، عکس از پایین «باز» می‌شود ──
                    const grid = document.querySelector("[data-fx-dish-grid]");
                    const cols = grid ? getComputedStyle(grid).gridTemplateColumns.split(" ").length : 1;
                    q("[data-fx-dish]").forEach({
                        "HomeScrollFX.useLayoutEffect": (card, i)=>{
                            const col = i % cols;
                            const last = cols - 1;
                            // ستونِ اول (سمتِ راست، چون سایت RTL است) از راست، آخری از چپ، وسطی از پایین
                            const fromX = cols === 1 ? (i % 2 ? -1 : 1) * 60 : col === 0 ? 100 : col === last ? -100 : 0;
                            const fromRot = cols === 1 ? i % 2 ? -4 : 4 : col === 0 ? 6 : col === last ? -6 : 0;
                            const media = card.querySelector(".dish-media");
                            const body = card.querySelectorAll(".dish-body > *");
                            const tl = __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$gsap$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$locals$3e$__["gsap"].timeline({
                                scrollTrigger: {
                                    trigger: card,
                                    start: "top 90%",
                                    toggleActions: replay
                                }
                            });
                            tl.from(card, {
                                x: fromX,
                                y: 90,
                                rotate: fromRot,
                                scale: 0.9,
                                opacity: 0,
                                duration: 1,
                                ease: "power3.out"
                            });
                            if (media) {
                                tl.fromTo(media, {
                                    clipPath: "inset(100% 0% 0% 0%)"
                                }, {
                                    clipPath: "inset(0% 0% 0% 0%)",
                                    duration: 1.1,
                                    ease: "power4.out",
                                    // بعد از باز شدن، clip-path پاک می‌شود؛ وگرنه مرورگر تا آخرِ اسکرول عکسِ در حالِ حرکت را ماسک می‌کند و کند می‌شود
                                    onComplete: {
                                        "HomeScrollFX.useLayoutEffect": ()=>__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$gsap$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$locals$3e$__["gsap"].set(media, {
                                                clearProps: "clipPath"
                                            })
                                    }["HomeScrollFX.useLayoutEffect"]
                                }, 0.12);
                            }
                            if (body.length) tl.from(body, {
                                y: 24,
                                opacity: 0,
                                duration: 0.7,
                                stagger: 0.08,
                                ease: "power2.out"
                            }, 0.45);
                        }
                    }["HomeScrollFX.useLayoutEffect"]);
                    // پارالکسِ عکسِ داخلِ کارت‌ها (با اسکرول کمی بالا/پایین می‌رود)
                    q("[data-fx-dish]").forEach({
                        "HomeScrollFX.useLayoutEffect": (card)=>{
                            const p = card.querySelector(".dish-parallax");
                            if (!p) return;
                            __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$gsap$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$locals$3e$__["gsap"].fromTo(p, {
                                yPercent: -8,
                                scale: 1.2
                            }, {
                                yPercent: 8,
                                scale: 1.2,
                                ease: "none",
                                scrollTrigger: {
                                    trigger: card,
                                    start: "top bottom",
                                    end: "bottom top",
                                    scrub: true
                                }
                            });
                        }
                    }["HomeScrollFX.useLayoutEffect"]);
                    // ── ۵) نورهای پس‌زمینه و کلمه‌ی GORG با اسکرول حرکت می‌کنند ──
                    q("[data-fx-blob]").forEach({
                        "HomeScrollFX.useLayoutEffect": (b)=>{
                            const speed = Number(b.getAttribute("data-speed") ?? 20);
                            __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$gsap$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$locals$3e$__["gsap"].fromTo(b, {
                                yPercent: -speed
                            }, {
                                yPercent: speed,
                                ease: "none",
                                scrollTrigger: {
                                    trigger: b.parentElement,
                                    start: "top bottom",
                                    end: "bottom top",
                                    scrub: true
                                }
                            });
                        }
                    }["HomeScrollFX.useLayoutEffect"]);
                    q("[data-fx-bgword]").forEach({
                        "HomeScrollFX.useLayoutEffect": (w)=>{
                            __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$gsap$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$locals$3e$__["gsap"].fromTo(w, {
                                xPercent: 12
                            }, {
                                xPercent: -12,
                                ease: "none",
                                scrollTrigger: {
                                    trigger: w.parentElement,
                                    start: "top bottom",
                                    end: "bottom top",
                                    scrub: true
                                }
                            });
                        }
                    }["HomeScrollFX.useLayoutEffect"]);
                    q("[data-fx-line]").forEach({
                        "HomeScrollFX.useLayoutEffect": (l)=>{
                            __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$gsap$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$locals$3e$__["gsap"].fromTo(l, {
                                scaleX: 0,
                                opacity: 0.2
                            }, {
                                scaleX: 1,
                                opacity: 1,
                                ease: "none",
                                scrollTrigger: {
                                    trigger: l,
                                    start: "top 95%",
                                    end: "top 55%",
                                    scrub: true
                                }
                            });
                        }
                    }["HomeScrollFX.useLayoutEffect"]);
                    // جرقه‌ها فقط وقتی بخش دیده می‌شود انیمیت می‌شوند (صرفه‌جویی در باتری)
                    q("[data-fx-embers]").forEach({
                        "HomeScrollFX.useLayoutEffect": (wrap)=>{
                            __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$gsap$2f$ScrollTrigger$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["ScrollTrigger"].create({
                                trigger: wrap,
                                start: "top bottom",
                                end: "bottom top",
                                onToggle: {
                                    "HomeScrollFX.useLayoutEffect": (self)=>wrap.classList.toggle("is-live", self.isActive)
                                }["HomeScrollFX.useLayoutEffect"]
                            });
                        }
                    }["HomeScrollFX.useLayoutEffect"]);
                    // ── ۶) آمار و گالری: ورودِ ملایم ──
                    q("[data-fx-fade]").forEach({
                        "HomeScrollFX.useLayoutEffect": (el)=>{
                            __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$gsap$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$locals$3e$__["gsap"].from(el, {
                                y: 40,
                                opacity: 0,
                                duration: 0.9,
                                ease: "power3.out",
                                scrollTrigger: {
                                    trigger: el,
                                    start: "top 90%",
                                    toggleActions: replay
                                }
                            });
                        }
                    }["HomeScrollFX.useLayoutEffect"]);
                    const tiles = q("[data-fx-tile]");
                    if (tiles.length) {
                        const hiddenT = {
                            opacity: 0,
                            y: 50,
                            scale: 0.85,
                            rotate: 3
                        };
                        __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$gsap$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$locals$3e$__["gsap"].set(tiles, hiddenT);
                        __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$gsap$2f$ScrollTrigger$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["ScrollTrigger"].batch(tiles, {
                            start: "top 92%",
                            onEnter: {
                                "HomeScrollFX.useLayoutEffect": (b)=>__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$gsap$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$locals$3e$__["gsap"].to(b, {
                                        opacity: 1,
                                        y: 0,
                                        scale: 1,
                                        rotate: 0,
                                        duration: 0.9,
                                        ease: "back.out(1.3)",
                                        stagger: 0.08,
                                        overwrite: true
                                    })
                            }["HomeScrollFX.useLayoutEffect"],
                            onLeaveBack: {
                                "HomeScrollFX.useLayoutEffect": (b)=>__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$gsap$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$locals$3e$__["gsap"].to(b, {
                                        ...hiddenT,
                                        duration: 0.35,
                                        overwrite: true
                                    })
                            }["HomeScrollFX.useLayoutEffect"]
                        });
                    }
                    // فونت و عکس‌ها که لود شدند، جای شروع/پایانِ همه‌ی محرک‌ها را دوباره حساب کن
                    const refresh = {
                        "HomeScrollFX.useLayoutEffect.refresh": ()=>__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$gsap$2f$ScrollTrigger$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["ScrollTrigger"].refresh()
                    }["HomeScrollFX.useLayoutEffect.refresh"];
                    window.addEventListener("load", refresh);
                    document.fonts?.ready.then(refresh).catch({
                        "HomeScrollFX.useLayoutEffect": ()=>{}
                    }["HomeScrollFX.useLayoutEffect"]);
                    return ({
                        "HomeScrollFX.useLayoutEffect": ()=>window.removeEventListener("load", refresh)
                    })["HomeScrollFX.useLayoutEffect"];
                }
            }["HomeScrollFX.useLayoutEffect"]);
            return ({
                "HomeScrollFX.useLayoutEffect": ()=>mm.revert()
            })["HomeScrollFX.useLayoutEffect"];
        }
    }["HomeScrollFX.useLayoutEffect"], []);
    return null;
}
_s(HomeScrollFX, "n7/vCynhJvM+pLkyL2DMQUF0odM=");
_c = HomeScrollFX;
var _c;
__turbopack_context__.k.register(_c, "HomeScrollFX");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
]);

//# sourceMappingURL=_1aoiz2r._.js.map