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
"[project]/components/MenuCategoryNav.tsx [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "default",
    ()=>MenuCategoryNav
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/index.js [app-client] (ecmascript)");
;
var _s = __turbopack_context__.k.signature();
"use client";
;
function MenuCategoryNav({ categories }) {
    _s();
    const [active, setActive] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(categories[0]?.id ?? "");
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useEffect"])({
        "MenuCategoryNav.useEffect": ()=>{
            const sections = categories.map({
                "MenuCategoryNav.useEffect.sections": (c)=>document.getElementById(c.id)
            }["MenuCategoryNav.useEffect.sections"]).filter({
                "MenuCategoryNav.useEffect.sections": (el)=>Boolean(el)
            }["MenuCategoryNav.useEffect.sections"]);
            const observer = new IntersectionObserver({
                "MenuCategoryNav.useEffect": (entries)=>{
                    const visible = entries.filter({
                        "MenuCategoryNav.useEffect": (e)=>e.isIntersecting
                    }["MenuCategoryNav.useEffect"]).sort({
                        "MenuCategoryNav.useEffect": (a, b)=>b.intersectionRatio - a.intersectionRatio
                    }["MenuCategoryNav.useEffect"])[0];
                    if (visible) setActive(visible.target.id);
                }
            }["MenuCategoryNav.useEffect"], {
                rootMargin: "-120px 0px -60% 0px",
                threshold: [
                    0,
                    0.25,
                    0.5,
                    1
                ]
            });
            sections.forEach({
                "MenuCategoryNav.useEffect": (s)=>observer.observe(s)
            }["MenuCategoryNav.useEffect"]);
            return ({
                "MenuCategoryNav.useEffect": ()=>observer.disconnect()
            })["MenuCategoryNav.useEffect"];
        }
    }["MenuCategoryNav.useEffect"], [
        categories
    ]);
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        className: "flex flex-wrap gap-2 mb-10 sticky top-16 z-20 bg-[var(--color-ink)]/90 backdrop-blur-sm py-3 -mx-5 px-5 sm:mx-0 sm:px-0",
        children: categories.map((cat)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("a", {
                href: `#${cat.id}`,
                className: `px-4 py-2 rounded-full text-sm font-bold transition-colors border ${active === cat.id ? "bg-[var(--color-ember)] border-[var(--color-ember)] text-white" : "border-white/12 text-[var(--color-ash)] hover:border-white/30"}`,
                children: cat.label
            }, cat.id, false, {
                fileName: "[project]/components/MenuCategoryNav.tsx",
                lineNumber: 35,
                columnNumber: 9
            }, this))
    }, void 0, false, {
        fileName: "[project]/components/MenuCategoryNav.tsx",
        lineNumber: 33,
        columnNumber: 5
    }, this);
}
_s(MenuCategoryNav, "m46hkGz6whaQ4fCzf870wqoaot4=");
_c = MenuCategoryNav;
var _c;
__turbopack_context__.k.register(_c, "MenuCategoryNav");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/lib/tableSession.ts [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "clearTable",
    ()=>clearTable,
    "readTable",
    ()=>readTable,
    "saveTable",
    ()=>saveTable
]);
/**
 * میزِ فعلیِ مشتری (وقتی QR روی میز را اسکن کرده). فقط در «همین نشستِ مرورگر» نگه داشته می‌شود
 * تا مشتری بعد از رفتن از رستوران، سفارشِ اشتباهی روی همان میز ثبت نکند.
 */ const KEY = "gorg-table";
function readTable() {
    try {
        const raw = sessionStorage.getItem(KEY);
        if (!raw) return null;
        const t = JSON.parse(raw);
        return t && typeof t.code === "string" && t.code ? t : null;
    } catch  {
        return null;
    }
}
function saveTable(t) {
    try {
        sessionStorage.setItem(KEY, JSON.stringify(t));
    } catch  {
    /* حالت خصوصی مرورگر */ }
}
function clearTable() {
    try {
        sessionStorage.removeItem(KEY);
    } catch  {
    /* نادیده */ }
}
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/components/TableBanner.tsx [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "default",
    ()=>TableBanner
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/index.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$client$2f$app$2d$dir$2f$link$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/client/app-dir/link.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$tableSession$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/lib/tableSession.ts [app-client] (ecmascript)");
;
var _s = __turbopack_context__.k.signature();
"use client";
;
;
;
function TableBanner({ table }) {
    _s();
    const [active, setActive] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(true);
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useEffect"])({
        "TableBanner.useEffect": ()=>{
            (0, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$tableSession$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["saveTable"])(table);
        }
    }["TableBanner.useEffect"], [
        table
    ]);
    if (!active) return null;
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        className: "mb-8 rounded-2xl border border-[var(--color-ember)]/40 bg-[var(--color-ember)]/10 px-5 py-4 flex flex-wrap items-center justify-between gap-3",
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                className: "text-sm leading-7",
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                        "aria-hidden": "true",
                        children: "🍽️ "
                    }, void 0, false, {
                        fileName: "[project]/components/TableBanner.tsx",
                        lineNumber: 19,
                        columnNumber: 9
                    }, this),
                    "شما سرِ ",
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("b", {
                        children: [
                            "میز ",
                            table.code
                        ]
                    }, void 0, true, {
                        fileName: "[project]/components/TableBanner.tsx",
                        lineNumber: 20,
                        columnNumber: 17
                    }, this),
                    table.title ? ` (${table.title})` : "",
                    " هستید. سفارشتان همین‌جا سرو می‌شود؛ آیتم‌ها را به سبد اضافه کنید و پرداخت را انجام دهید."
                ]
            }, void 0, true, {
                fileName: "[project]/components/TableBanner.tsx",
                lineNumber: 18,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$client$2f$app$2d$dir$2f$link$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"], {
                href: "/menu",
                onClick: ()=>{
                    (0, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$tableSession$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["clearTable"])();
                    setActive(false);
                },
                className: "text-xs font-bold text-[var(--color-ash)] hover:text-[var(--color-ember-light)] underline",
                children: "این میز من نیست"
            }, void 0, false, {
                fileName: "[project]/components/TableBanner.tsx",
                lineNumber: 23,
                columnNumber: 7
            }, this)
        ]
    }, void 0, true, {
        fileName: "[project]/components/TableBanner.tsx",
        lineNumber: 17,
        columnNumber: 5
    }, this);
}
_s(TableBanner, "OJi4bsfbRg30lLrf81D6+JOheDQ=");
_c = TableBanner;
var _c;
__turbopack_context__.k.register(_c, "TableBanner");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
]);

//# sourceMappingURL=_1rizg3b._.js.map