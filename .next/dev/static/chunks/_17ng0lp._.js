(globalThis["TURBOPACK"] || (globalThis["TURBOPACK"] = [])).push([typeof document === "object" ? document.currentScript : undefined,
"[project]/components/admin/hooks.ts [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "useFetch",
    ()=>useFetch
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/index.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$adminClient$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/lib/adminClient.ts [app-client] (ecmascript)");
var _s = __turbopack_context__.k.signature();
"use client";
;
;
function useFetch(url, opts = {}) {
    _s();
    const [data, setData] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(null);
    const [error, setError] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])("");
    const [loading, setLoading] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(Boolean(url));
    const load = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useCallback"])({
        "useFetch.useCallback[load]": async (silent = false)=>{
            if (!url) return;
            if (!silent) setLoading(true);
            try {
                const d = await (0, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$adminClient$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["api"])(url);
                setData(d);
                setError("");
            } catch (e) {
                setError(e instanceof Error ? e.message : "خطا");
            } finally{
                setLoading(false);
            }
        }
    }["useFetch.useCallback[load]"], [
        url
    ]);
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useEffect"])({
        "useFetch.useEffect": ()=>{
            // eslint-disable-next-line react-hooks/set-state-in-effect
            load();
        }
    }["useFetch.useEffect"], [
        load
    ]);
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useEffect"])({
        "useFetch.useEffect": ()=>{
            if (!opts.refreshMs) return;
            const t = setInterval({
                "useFetch.useEffect.t": ()=>load(true)
            }["useFetch.useEffect.t"], opts.refreshMs);
            return ({
                "useFetch.useEffect": ()=>clearInterval(t)
            })["useFetch.useEffect"];
        }
    }["useFetch.useEffect"], [
        load,
        opts.refreshMs
    ]);
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useEffect"])({
        "useFetch.useEffect": ()=>{
            if (!opts.refreshOnNewOrder) return;
            const h = {
                "useFetch.useEffect.h": ()=>load(true)
            }["useFetch.useEffect.h"];
            window.addEventListener("admin-new-orders", h);
            return ({
                "useFetch.useEffect": ()=>window.removeEventListener("admin-new-orders", h)
            })["useFetch.useEffect"];
        }
    }["useFetch.useEffect"], [
        load,
        opts.refreshOnNewOrder
    ]);
    return {
        data,
        error,
        loading,
        reload: load,
        setData
    };
}
_s(useFetch, "7EwYx2jkf2Q4OiqNxO2laglPI24=");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/lib/orderMeta.ts [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "ORDER_TYPE_LABELS",
    ()=>ORDER_TYPE_LABELS,
    "PAYMENT_LABELS",
    ()=>PAYMENT_LABELS,
    "SOURCE_LABELS",
    ()=>SOURCE_LABELS,
    "STATUS_LABELS",
    ()=>STATUS_LABELS
]);
const STATUS_LABELS = {
    received: "جدید",
    preparing: "در حال آماده‌سازی",
    ready: "آماده",
    delivered: "تحویل داده شد",
    cancelled: "لغو شده"
};
const SOURCE_LABELS = {
    website: "سایت",
    qr: "QR میز",
    pos: "حضوری"
};
const PAYMENT_LABELS = {
    online: "آنلاین",
    cash: "نقد",
    card: "کارت‌خوان",
    other: "سایر"
};
const ORDER_TYPE_LABELS = {
    delivery: "ارسال با پیک",
    pickup: "بیرون‌بر / تحویل حضوری",
    dine_in: "سالن"
};
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/components/admin/OrderViews.tsx [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "OrderCard",
    ()=>OrderCard,
    "OrderDetail",
    ()=>OrderDetail,
    "SOURCE_TONE",
    ()=>SOURCE_TONE
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/index.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$adminClient$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/lib/adminClient.ts [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$orderMeta$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/lib/orderMeta.ts [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$admin$2f$ui$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/components/admin/ui.tsx [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$admin$2f$AdminShell$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/components/admin/AdminShell.tsx [app-client] (ecmascript)");
;
var _s = __turbopack_context__.k.signature(), _s1 = __turbopack_context__.k.signature();
"use client";
;
;
;
;
;
const SOURCE_TONE = {
    website: "bg-[#dd4a34]/15 text-[#ff9b8a] border-[#dd4a34]/35",
    qr: "bg-amber-500/15 text-amber-300 border-amber-400/30",
    pos: "bg-sky-500/15 text-sky-300 border-sky-400/30"
};
function sourceLabel(o) {
    return __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$orderMeta$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["SOURCE_LABELS"][o.source ?? "website"];
}
function typeLabel(o) {
    return o.order_type === "dine_in" && o.table_no ? `سالن · میز ${o.table_no}` : __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$orderMeta$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["ORDER_TYPE_LABELS"][o.order_type];
}
function OrderCard({ order, onOpen, onChanged }) {
    _s();
    const toast = (0, __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$admin$2f$ui$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useToast"])();
    const [busy, setBusy] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(false);
    const next = __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$adminClient$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["NEXT_STATUS"][order.status];
    const isNew = order.status === "received";
    async function advance(e) {
        e.stopPropagation();
        if (!next) return;
        setBusy(true);
        try {
            await (0, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$adminClient$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["api"])("/api/admin/orders", {
                method: "PATCH",
                body: {
                    orderCode: order.order_code,
                    status: next.to
                }
            });
            onChanged();
        } catch (err) {
            toast(err instanceof Error ? err.message : "خطا", "error");
        } finally{
            setBusy(false);
        }
    }
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        role: "button",
        tabIndex: 0,
        onClick: ()=>onOpen(order),
        onKeyDown: (e)=>(e.key === "Enter" || e.key === " ") && onOpen(order),
        className: `panel-card p-4 cursor-pointer text-right transition-colors hover:border-[var(--color-ember)]/40 ${isNew ? "border-amber-400/50" : ""}`,
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "flex items-start justify-between gap-3",
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "min-w-0",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                className: "font-black text-[15px] tracking-wide",
                                dir: "ltr",
                                children: order.order_code
                            }, void 0, false, {
                                fileName: "[project]/components/admin/OrderViews.tsx",
                                lineNumber: 55,
                                columnNumber: 11
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                className: "text-xs text-[var(--color-ash)] mt-0.5",
                                children: [
                                    (0, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$adminClient$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["fmtTime"])(order.created_at),
                                    " · ",
                                    (0, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$adminClient$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["timeAgo"])(order.created_at)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/components/admin/OrderViews.tsx",
                                lineNumber: 58,
                                columnNumber: 11
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/components/admin/OrderViews.tsx",
                        lineNumber: 54,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "flex flex-wrap justify-end gap-1.5",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$components$2f$admin$2f$ui$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Badge"], {
                                className: SOURCE_TONE[order.source ?? "website"],
                                children: sourceLabel(order)
                            }, void 0, false, {
                                fileName: "[project]/components/admin/OrderViews.tsx",
                                lineNumber: 63,
                                columnNumber: 11
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$components$2f$admin$2f$ui$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Badge"], {
                                className: __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$adminClient$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["STATUS_TONE"][order.status],
                                children: __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$orderMeta$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["STATUS_LABELS"][order.status]
                            }, void 0, false, {
                                fileName: "[project]/components/admin/OrderViews.tsx",
                                lineNumber: 64,
                                columnNumber: 11
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/components/admin/OrderViews.tsx",
                        lineNumber: 62,
                        columnNumber: 9
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/components/admin/OrderViews.tsx",
                lineNumber: 53,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                className: "text-sm mt-3 leading-7",
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                        className: "font-bold",
                        children: order.name
                    }, void 0, false, {
                        fileName: "[project]/components/admin/OrderViews.tsx",
                        lineNumber: 69,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                        className: "text-[var(--color-ash)]",
                        children: [
                            " · ",
                            typeLabel(order)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/components/admin/OrderViews.tsx",
                        lineNumber: 70,
                        columnNumber: 9
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/components/admin/OrderViews.tsx",
                lineNumber: 68,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                className: "text-xs text-[var(--color-ash)] leading-6 mt-1 line-clamp-2",
                children: order.lines.map((l)=>`${(0, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$adminClient$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["fa"])(l.qty)}× ${l.name}`).join("، ")
            }, void 0, false, {
                fileName: "[project]/components/admin/OrderViews.tsx",
                lineNumber: 72,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "flex items-center justify-between gap-3 mt-3 pt-3 border-t border-white/8",
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                className: "font-extrabold text-sm",
                                children: (0, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$adminClient$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["money"])(order.total)
                            }, void 0, false, {
                                fileName: "[project]/components/admin/OrderViews.tsx",
                                lineNumber: 76,
                                columnNumber: 11
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                className: "text-[11px] text-[var(--color-ash)]",
                                children: __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$orderMeta$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["PAYMENT_LABELS"][order.payment_method ?? "online"]
                            }, void 0, false, {
                                fileName: "[project]/components/admin/OrderViews.tsx",
                                lineNumber: 77,
                                columnNumber: 11
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/components/admin/OrderViews.tsx",
                        lineNumber: 75,
                        columnNumber: 9
                    }, this),
                    next && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                        onClick: advance,
                        disabled: busy,
                        className: "btn-primary btn-sm disabled:opacity-60",
                        children: busy ? "…" : next.label
                    }, void 0, false, {
                        fileName: "[project]/components/admin/OrderViews.tsx",
                        lineNumber: 80,
                        columnNumber: 11
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/components/admin/OrderViews.tsx",
                lineNumber: 74,
                columnNumber: 7
            }, this)
        ]
    }, void 0, true, {
        fileName: "[project]/components/admin/OrderViews.tsx",
        lineNumber: 46,
        columnNumber: 5
    }, this);
}
_s(OrderCard, "JMEyid7MDQmo8RvWIgdKhOGlGDY=", false, function() {
    return [
        __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$admin$2f$ui$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useToast"]
    ];
});
_c = OrderCard;
function OrderDetail({ order, onClose, onChanged }) {
    _s1();
    const toast = (0, __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$admin$2f$ui$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useToast"])();
    const { businessName } = (0, __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$admin$2f$AdminShell$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useAdmin"])();
    const [busy, setBusy] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(false);
    const [cancelling, setCancelling] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(false);
    const [reason, setReason] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])("");
    if (!order) return null;
    const next = __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$adminClient$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["NEXT_STATUS"][order.status];
    const mapUrl = order.lat != null && order.lng != null ? `https://www.google.com/maps/search/?api=1&query=${order.lat},${order.lng}` : null;
    async function setStatus(status, why) {
        if (!order) return;
        setBusy(true);
        try {
            await (0, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$adminClient$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["api"])("/api/admin/orders", {
                method: "PATCH",
                body: {
                    orderCode: order.order_code,
                    status,
                    reason: why
                }
            });
            toast(status === "cancelled" ? "سفارش لغو شد" : "وضعیت سفارش به‌روز شد");
            setCancelling(false);
            setReason("");
            onChanged();
            onClose();
        } catch (err) {
            toast(err instanceof Error ? err.message : "خطا", "error");
        } finally{
            setBusy(false);
        }
    }
    const steps = [
        {
            label: "ثبت سفارش",
            at: order.created_at
        },
        {
            label: "شروع آماده‌سازی",
            at: order.preparing_at
        },
        {
            label: "آماده شد",
            at: order.ready_at
        },
        {
            label: "تحویل شد",
            at: order.delivered_at
        }
    ];
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$components$2f$admin$2f$ui$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Modal"], {
        open: true,
        onClose: onClose,
        title: `سفارش ${order.order_code}`,
        wide: true,
        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
            className: "space-y-5",
            children: [
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    className: "flex flex-wrap items-center gap-2",
                    children: [
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$components$2f$admin$2f$ui$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Badge"], {
                            className: __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$adminClient$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["STATUS_TONE"][order.status],
                            children: __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$orderMeta$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["STATUS_LABELS"][order.status]
                        }, void 0, false, {
                            fileName: "[project]/components/admin/OrderViews.tsx",
                            lineNumber: 129,
                            columnNumber: 11
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$components$2f$admin$2f$ui$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Badge"], {
                            className: SOURCE_TONE[order.source ?? "website"],
                            children: sourceLabel(order)
                        }, void 0, false, {
                            fileName: "[project]/components/admin/OrderViews.tsx",
                            lineNumber: 130,
                            columnNumber: 11
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$components$2f$admin$2f$ui$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Badge"], {
                            className: "border-white/15 text-[var(--color-ash)]",
                            children: typeLabel(order)
                        }, void 0, false, {
                            fileName: "[project]/components/admin/OrderViews.tsx",
                            lineNumber: 131,
                            columnNumber: 11
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$components$2f$admin$2f$ui$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Badge"], {
                            className: "border-white/15 text-[var(--color-ash)]",
                            children: __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$orderMeta$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["PAYMENT_LABELS"][order.payment_method ?? "online"]
                        }, void 0, false, {
                            fileName: "[project]/components/admin/OrderViews.tsx",
                            lineNumber: 132,
                            columnNumber: 11
                        }, this)
                    ]
                }, void 0, true, {
                    fileName: "[project]/components/admin/OrderViews.tsx",
                    lineNumber: 128,
                    columnNumber: 9
                }, this),
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    className: "grid sm:grid-cols-2 gap-3 text-sm",
                    children: [
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            className: "panel-card p-3.5",
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                    className: "text-xs text-[var(--color-ash)] mb-1",
                                    children: "مشتری"
                                }, void 0, false, {
                                    fileName: "[project]/components/admin/OrderViews.tsx",
                                    lineNumber: 137,
                                    columnNumber: 13
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                    className: "font-bold",
                                    children: order.name
                                }, void 0, false, {
                                    fileName: "[project]/components/admin/OrderViews.tsx",
                                    lineNumber: 138,
                                    columnNumber: 13
                                }, this),
                                order.phone ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("a", {
                                    href: `tel:${order.phone}`,
                                    className: "text-[var(--color-ember-light)] font-bold",
                                    dir: "ltr",
                                    children: order.phone
                                }, void 0, false, {
                                    fileName: "[project]/components/admin/OrderViews.tsx",
                                    lineNumber: 140,
                                    columnNumber: 15
                                }, this) : /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                    className: "text-xs text-[var(--color-ash)]",
                                    children: "شماره‌ای ثبت نشده"
                                }, void 0, false, {
                                    fileName: "[project]/components/admin/OrderViews.tsx",
                                    lineNumber: 144,
                                    columnNumber: 15
                                }, this)
                            ]
                        }, void 0, true, {
                            fileName: "[project]/components/admin/OrderViews.tsx",
                            lineNumber: 136,
                            columnNumber: 11
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            className: "panel-card p-3.5",
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                    className: "text-xs text-[var(--color-ash)] mb-1",
                                    children: "زمان ثبت"
                                }, void 0, false, {
                                    fileName: "[project]/components/admin/OrderViews.tsx",
                                    lineNumber: 148,
                                    columnNumber: 13
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                    className: "font-bold",
                                    children: (0, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$adminClient$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["fmtDateTime"])(order.created_at)
                                }, void 0, false, {
                                    fileName: "[project]/components/admin/OrderViews.tsx",
                                    lineNumber: 149,
                                    columnNumber: 13
                                }, this),
                                order.ref_id && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                    className: "text-xs text-[var(--color-ash)] mt-1",
                                    children: [
                                        "پیگیری بانکی: ",
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                            dir: "ltr",
                                            children: order.ref_id
                                        }, void 0, false, {
                                            fileName: "[project]/components/admin/OrderViews.tsx",
                                            lineNumber: 152,
                                            columnNumber: 31
                                        }, this)
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/components/admin/OrderViews.tsx",
                                    lineNumber: 151,
                                    columnNumber: 15
                                }, this)
                            ]
                        }, void 0, true, {
                            fileName: "[project]/components/admin/OrderViews.tsx",
                            lineNumber: 147,
                            columnNumber: 11
                        }, this)
                    ]
                }, void 0, true, {
                    fileName: "[project]/components/admin/OrderViews.tsx",
                    lineNumber: 135,
                    columnNumber: 9
                }, this),
                (order.address || mapUrl) && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    className: "panel-card p-3.5 text-sm",
                    children: [
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                            className: "text-xs text-[var(--color-ash)] mb-1",
                            children: "آدرس"
                        }, void 0, false, {
                            fileName: "[project]/components/admin/OrderViews.tsx",
                            lineNumber: 160,
                            columnNumber: 13
                        }, this),
                        order.address && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                            className: "leading-7",
                            children: order.address
                        }, void 0, false, {
                            fileName: "[project]/components/admin/OrderViews.tsx",
                            lineNumber: 161,
                            columnNumber: 31
                        }, this),
                        mapUrl && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("a", {
                            href: mapUrl,
                            target: "_blank",
                            rel: "noopener noreferrer",
                            className: "inline-block mt-2 text-[var(--color-ember-light)] font-bold hover:underline",
                            children: "📍 باز کردن موقعیت روی نقشه"
                        }, void 0, false, {
                            fileName: "[project]/components/admin/OrderViews.tsx",
                            lineNumber: 163,
                            columnNumber: 15
                        }, this)
                    ]
                }, void 0, true, {
                    fileName: "[project]/components/admin/OrderViews.tsx",
                    lineNumber: 159,
                    columnNumber: 11
                }, this),
                order.notes && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    className: "panel-card p-3.5 text-sm",
                    children: [
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                            className: "text-xs text-[var(--color-ash)] mb-1",
                            children: "توضیحات مشتری"
                        }, void 0, false, {
                            fileName: "[project]/components/admin/OrderViews.tsx",
                            lineNumber: 171,
                            columnNumber: 13
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                            className: "leading-7",
                            children: order.notes
                        }, void 0, false, {
                            fileName: "[project]/components/admin/OrderViews.tsx",
                            lineNumber: 172,
                            columnNumber: 13
                        }, this)
                    ]
                }, void 0, true, {
                    fileName: "[project]/components/admin/OrderViews.tsx",
                    lineNumber: 170,
                    columnNumber: 11
                }, this),
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    className: "panel-card p-4",
                    children: [
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            className: "space-y-2.5",
                            children: order.lines.map((l)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    className: "flex items-center justify-between gap-3 text-sm",
                                    children: [
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                            children: [
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                    className: "font-black text-[var(--color-ember-light)]",
                                                    children: [
                                                        (0, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$adminClient$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["fa"])(l.qty),
                                                        "×"
                                                    ]
                                                }, void 0, true, {
                                                    fileName: "[project]/components/admin/OrderViews.tsx",
                                                    lineNumber: 181,
                                                    columnNumber: 19
                                                }, this),
                                                " ",
                                                l.name
                                            ]
                                        }, void 0, true, {
                                            fileName: "[project]/components/admin/OrderViews.tsx",
                                            lineNumber: 180,
                                            columnNumber: 17
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                            className: "text-[var(--color-ash)] whitespace-nowrap",
                                            children: (0, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$adminClient$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["money"])(l.price * l.qty)
                                        }, void 0, false, {
                                            fileName: "[project]/components/admin/OrderViews.tsx",
                                            lineNumber: 183,
                                            columnNumber: 17
                                        }, this)
                                    ]
                                }, l.id, true, {
                                    fileName: "[project]/components/admin/OrderViews.tsx",
                                    lineNumber: 179,
                                    columnNumber: 15
                                }, this))
                        }, void 0, false, {
                            fileName: "[project]/components/admin/OrderViews.tsx",
                            lineNumber: 177,
                            columnNumber: 11
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            className: "border-t border-white/10 mt-3 pt-3 space-y-1.5 text-sm",
                            children: [
                                !!order.discount && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    className: "flex justify-between text-[var(--color-ash)]",
                                    children: [
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                            children: "تخفیف"
                                        }, void 0, false, {
                                            fileName: "[project]/components/admin/OrderViews.tsx",
                                            lineNumber: 190,
                                            columnNumber: 17
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                            children: [
                                                "− ",
                                                (0, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$adminClient$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["money"])(order.discount)
                                            ]
                                        }, void 0, true, {
                                            fileName: "[project]/components/admin/OrderViews.tsx",
                                            lineNumber: 191,
                                            columnNumber: 17
                                        }, this)
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/components/admin/OrderViews.tsx",
                                    lineNumber: 189,
                                    columnNumber: 15
                                }, this),
                                !!order.delivery_fee && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    className: "flex justify-between text-[var(--color-ash)]",
                                    children: [
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                            children: "هزینه ارسال"
                                        }, void 0, false, {
                                            fileName: "[project]/components/admin/OrderViews.tsx",
                                            lineNumber: 196,
                                            columnNumber: 17
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                            children: (0, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$adminClient$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["money"])(order.delivery_fee)
                                        }, void 0, false, {
                                            fileName: "[project]/components/admin/OrderViews.tsx",
                                            lineNumber: 197,
                                            columnNumber: 17
                                        }, this)
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/components/admin/OrderViews.tsx",
                                    lineNumber: 195,
                                    columnNumber: 15
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    className: "flex justify-between font-extrabold text-base",
                                    children: [
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                            children: "مبلغ نهایی"
                                        }, void 0, false, {
                                            fileName: "[project]/components/admin/OrderViews.tsx",
                                            lineNumber: 201,
                                            columnNumber: 15
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                            children: (0, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$adminClient$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["money"])(order.total)
                                        }, void 0, false, {
                                            fileName: "[project]/components/admin/OrderViews.tsx",
                                            lineNumber: 202,
                                            columnNumber: 15
                                        }, this)
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/components/admin/OrderViews.tsx",
                                    lineNumber: 200,
                                    columnNumber: 13
                                }, this)
                            ]
                        }, void 0, true, {
                            fileName: "[project]/components/admin/OrderViews.tsx",
                            lineNumber: 187,
                            columnNumber: 11
                        }, this)
                    ]
                }, void 0, true, {
                    fileName: "[project]/components/admin/OrderViews.tsx",
                    lineNumber: 176,
                    columnNumber: 9
                }, this),
                order.status === "cancelled" ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                    className: "text-sm text-red-300 leading-7",
                    children: [
                        "این سفارش لغو شده است",
                        order.cancel_reason ? `: ${order.cancel_reason}` : ".",
                        " مصرف انبار برگشت داده شده. اگر مشتری آنلاین پرداخته، بازگشت وجه را خودتان از درگاه انجام دهید."
                    ]
                }, void 0, true, {
                    fileName: "[project]/components/admin/OrderViews.tsx",
                    lineNumber: 208,
                    columnNumber: 11
                }, this) : /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    className: "flex flex-wrap items-center gap-x-3 gap-y-1 text-xs text-[var(--color-ash)]",
                    children: steps.map((s)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                            className: s.at ? "text-[var(--color-bone)]" : "",
                            children: [
                                s.at ? "✓" : "○",
                                " ",
                                s.label,
                                s.at ? ` (${(0, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$adminClient$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["fmtTime"])(s.at)})` : ""
                            ]
                        }, s.label, true, {
                            fileName: "[project]/components/admin/OrderViews.tsx",
                            lineNumber: 214,
                            columnNumber: 15
                        }, this))
                }, void 0, false, {
                    fileName: "[project]/components/admin/OrderViews.tsx",
                    lineNumber: 212,
                    columnNumber: 11
                }, this),
                cancelling ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    className: "space-y-3",
                    children: [
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("input", {
                            className: "panel-input",
                            placeholder: "دلیل لغو (اختیاری)",
                            value: reason,
                            onChange: (e)=>setReason(e.target.value),
                            autoFocus: true
                        }, void 0, false, {
                            fileName: "[project]/components/admin/OrderViews.tsx",
                            lineNumber: 224,
                            columnNumber: 13
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            className: "flex gap-2",
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                    className: "btn-danger",
                                    disabled: busy,
                                    onClick: ()=>setStatus("cancelled", reason),
                                    children: busy ? "…" : "تأیید لغو سفارش"
                                }, void 0, false, {
                                    fileName: "[project]/components/admin/OrderViews.tsx",
                                    lineNumber: 226,
                                    columnNumber: 15
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                    className: "btn-outline btn-sm",
                                    onClick: ()=>setCancelling(false),
                                    children: "انصراف"
                                }, void 0, false, {
                                    fileName: "[project]/components/admin/OrderViews.tsx",
                                    lineNumber: 229,
                                    columnNumber: 15
                                }, this)
                            ]
                        }, void 0, true, {
                            fileName: "[project]/components/admin/OrderViews.tsx",
                            lineNumber: 225,
                            columnNumber: 13
                        }, this)
                    ]
                }, void 0, true, {
                    fileName: "[project]/components/admin/OrderViews.tsx",
                    lineNumber: 223,
                    columnNumber: 11
                }, this) : /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    className: "flex flex-wrap gap-2 pt-1",
                    children: [
                        next && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                            className: "btn-primary btn-sm",
                            disabled: busy,
                            onClick: ()=>setStatus(next.to),
                            children: next.label
                        }, void 0, false, {
                            fileName: "[project]/components/admin/OrderViews.tsx",
                            lineNumber: 237,
                            columnNumber: 15
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                            className: "btn-outline btn-sm",
                            onClick: ()=>(0, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$adminClient$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["printOrder"])(order, businessName),
                            children: "🖨️ چاپ فیش"
                        }, void 0, false, {
                            fileName: "[project]/components/admin/OrderViews.tsx",
                            lineNumber: 241,
                            columnNumber: 13
                        }, this),
                        order.status !== "cancelled" && order.status !== "delivered" && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                            className: "btn-danger",
                            onClick: ()=>setCancelling(true),
                            children: "لغو سفارش"
                        }, void 0, false, {
                            fileName: "[project]/components/admin/OrderViews.tsx",
                            lineNumber: 245,
                            columnNumber: 15
                        }, this)
                    ]
                }, void 0, true, {
                    fileName: "[project]/components/admin/OrderViews.tsx",
                    lineNumber: 235,
                    columnNumber: 11
                }, this)
            ]
        }, void 0, true, {
            fileName: "[project]/components/admin/OrderViews.tsx",
            lineNumber: 127,
            columnNumber: 7
        }, this)
    }, void 0, false, {
        fileName: "[project]/components/admin/OrderViews.tsx",
        lineNumber: 126,
        columnNumber: 5
    }, this);
}
_s1(OrderDetail, "BXi28d27zivaio5eZouMhidWpgI=", false, function() {
    return [
        __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$admin$2f$ui$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useToast"],
        __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$admin$2f$AdminShell$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useAdmin"]
    ];
});
_c1 = OrderDetail;
var _c, _c1;
__turbopack_context__.k.register(_c, "OrderCard");
__turbopack_context__.k.register(_c1, "OrderDetail");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/app/admin/page.tsx [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "default",
    ()=>DashboardPage
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$client$2f$app$2d$dir$2f$link$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/client/app-dir/link.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/index.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$adminClient$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/lib/adminClient.ts [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$admin$2f$hooks$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/components/admin/hooks.ts [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$admin$2f$ui$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/components/admin/ui.tsx [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$admin$2f$OrderViews$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/components/admin/OrderViews.tsx [app-client] (ecmascript)");
;
var _s = __turbopack_context__.k.signature();
"use client";
;
;
;
;
;
;
function DashboardPage() {
    _s();
    const toast = (0, __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$admin$2f$ui$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useToast"])();
    const { data, error, loading, reload } = (0, __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$admin$2f$hooks$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useFetch"])("/api/admin/dashboard", {
        refreshMs: 30000,
        refreshOnNewOrder: true
    });
    const settings = (0, __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$admin$2f$hooks$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useFetch"])("/api/admin/settings");
    const [open, setOpen] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(null);
    const [toggling, setToggling] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(false);
    if (loading && !data) return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$components$2f$admin$2f$ui$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Loading"], {}, void 0, false, {
        fileName: "[project]/app/admin/page.tsx",
        lineNumber: 32,
        columnNumber: 32
    }, this);
    if (error && !data) return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$components$2f$admin$2f$ui$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["ErrorBox"], {
        message: error,
        onRetry: ()=>reload()
    }, void 0, false, {
        fileName: "[project]/app/admin/page.tsx",
        lineNumber: 33,
        columnNumber: 30
    }, this);
    if (!data) return null;
    const { today, week, pulse } = data;
    const ordersOpen = settings.data?.settings.ordersOpen ?? true;
    const inFlight = pulse.received + pulse.preparing + pulse.ready;
    const src = (k)=>today.bySource[k] ?? {
            orders: 0,
            revenue: 0
        };
    const totalSrc = src("website").orders + src("qr").orders + src("pos").orders;
    async function toggleOpen(v) {
        setToggling(true);
        try {
            await (0, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$adminClient$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["api"])("/api/admin/settings", {
                method: "PUT",
                body: {
                    ordersOpen: v
                }
            });
            settings.reload(true);
            toast(v ? "سفارش آنلاین باز شد" : "سفارش آنلاین بسته شد (سایت و QR)", v ? "ok" : "info");
        } catch (e) {
            toast(e instanceof Error ? e.message : "خطا", "error");
        } finally{
            setToggling(false);
        }
    }
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Fragment"], {
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$components$2f$admin$2f$ui$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["PageTitle"], {
                title: "داشبورد",
                sub: (0, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$adminClient$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["fmtLongDay"])(new Date()),
                actions: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    className: "flex items-center gap-3 panel-card px-4 py-2.5",
                    children: [
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                            className: "text-sm font-bold",
                            children: "سفارش آنلاین سایت"
                        }, void 0, false, {
                            fileName: "[project]/app/admin/page.tsx",
                            lineNumber: 62,
                            columnNumber: 13
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$components$2f$admin$2f$ui$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Toggle"], {
                            checked: ordersOpen,
                            onChange: toggleOpen,
                            disabled: toggling,
                            label: "باز یا بسته بودن سفارش آنلاین"
                        }, void 0, false, {
                            fileName: "[project]/app/admin/page.tsx",
                            lineNumber: 63,
                            columnNumber: 13
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                            className: `text-xs font-bold ${ordersOpen ? "text-emerald-300" : "text-red-300"}`,
                            children: ordersOpen ? "باز" : "بسته"
                        }, void 0, false, {
                            fileName: "[project]/app/admin/page.tsx",
                            lineNumber: 64,
                            columnNumber: 13
                        }, this)
                    ]
                }, void 0, true, {
                    fileName: "[project]/app/admin/page.tsx",
                    lineNumber: 61,
                    columnNumber: 11
                }, this)
            }, void 0, false, {
                fileName: "[project]/app/admin/page.tsx",
                lineNumber: 57,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "grid grid-cols-2 lg:grid-cols-4 gap-3 mb-5",
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$components$2f$admin$2f$ui$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Stat"], {
                        label: "سفارش‌های امروز",
                        value: (0, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$adminClient$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["fa"])(today.totals.orders),
                        sub: today.totals.cancelled ? `${(0, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$adminClient$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["fa"])(today.totals.cancelled)} لغو شده` : "بدون لغو"
                    }, void 0, false, {
                        fileName: "[project]/app/admin/page.tsx",
                        lineNumber: 70,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$components$2f$admin$2f$ui$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Stat"], {
                        label: "درآمد امروز",
                        value: (0, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$adminClient$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["moneyShort"])(today.totals.revenue),
                        sub: (0, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$adminClient$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["money"])(today.totals.revenue),
                        tone: "good"
                    }, void 0, false, {
                        fileName: "[project]/app/admin/page.tsx",
                        lineNumber: 71,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$components$2f$admin$2f$ui$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Stat"], {
                        label: "میانگین هر سفارش",
                        value: (0, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$adminClient$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["moneyShort"])(today.totals.avgTicket),
                        sub: `${(0, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$adminClient$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["fa"])(today.totals.itemsSold)} پرس فروخته شد`
                    }, void 0, false, {
                        fileName: "[project]/app/admin/page.tsx",
                        lineNumber: 72,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$components$2f$admin$2f$ui$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Stat"], {
                        label: "در جریان (نیاز به اقدام)",
                        value: (0, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$adminClient$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["fa"])(inFlight),
                        tone: pulse.received > 0 ? "warn" : "default",
                        sub: `${(0, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$adminClient$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["fa"])(pulse.received)} جدید · ${(0, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$adminClient$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["fa"])(pulse.preparing)} در آشپزخانه · ${(0, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$adminClient$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["fa"])(pulse.ready)} آماده`
                    }, void 0, false, {
                        fileName: "[project]/app/admin/page.tsx",
                        lineNumber: 73,
                        columnNumber: 9
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/app/admin/page.tsx",
                lineNumber: 69,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "grid lg:grid-cols-3 gap-4 mb-5",
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$components$2f$admin$2f$ui$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Card"], {
                        title: "سایت یا حضوری؟ (امروز)",
                        className: "lg:col-span-1",
                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            className: "flex items-center gap-5",
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$components$2f$admin$2f$ui$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Donut"], {
                                    parts: [
                                        {
                                            value: src("website").orders,
                                            color: __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$admin$2f$ui$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["SOURCE_COLORS"].website,
                                            label: "سایت"
                                        },
                                        {
                                            value: src("qr").orders,
                                            color: __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$admin$2f$ui$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["SOURCE_COLORS"].qr,
                                            label: "QR میز"
                                        },
                                        {
                                            value: src("pos").orders,
                                            color: __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$admin$2f$ui$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["SOURCE_COLORS"].pos,
                                            label: "حضوری"
                                        }
                                    ],
                                    center: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                                className: "text-xl font-black leading-none",
                                                children: (0, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$adminClient$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["fa"])(totalSrc)
                                            }, void 0, false, {
                                                fileName: "[project]/app/admin/page.tsx",
                                                lineNumber: 92,
                                                columnNumber: 19
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                                className: "text-[10px] text-[var(--color-ash)] mt-1",
                                                children: "سفارش"
                                            }, void 0, false, {
                                                fileName: "[project]/app/admin/page.tsx",
                                                lineNumber: 93,
                                                columnNumber: 19
                                            }, this)
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/app/admin/page.tsx",
                                        lineNumber: 91,
                                        columnNumber: 17
                                    }, this)
                                }, void 0, false, {
                                    fileName: "[project]/app/admin/page.tsx",
                                    lineNumber: 84,
                                    columnNumber: 13
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    className: "flex-1 space-y-2.5 text-sm",
                                    children: [
                                        [
                                            "website",
                                            "از طریق سایت"
                                        ],
                                        [
                                            "qr",
                                            "QR روی میز"
                                        ],
                                        [
                                            "pos",
                                            "حضوری (صندوق)"
                                        ]
                                    ].map(([k, label])=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                            className: "flex items-center justify-between gap-2",
                                            children: [
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                    className: "flex items-center gap-2",
                                                    children: [
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                            className: "w-2.5 h-2.5 rounded-full",
                                                            style: {
                                                                background: __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$admin$2f$ui$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["SOURCE_COLORS"][k]
                                                            }
                                                        }, void 0, false, {
                                                            fileName: "[project]/app/admin/page.tsx",
                                                            lineNumber: 107,
                                                            columnNumber: 21
                                                        }, this),
                                                        label
                                                    ]
                                                }, void 0, true, {
                                                    fileName: "[project]/app/admin/page.tsx",
                                                    lineNumber: 106,
                                                    columnNumber: 19
                                                }, this),
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                    className: "font-bold",
                                                    children: [
                                                        (0, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$adminClient$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["fa"])(src(k).orders),
                                                        " ",
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                            className: "text-[11px] text-[var(--color-ash)] font-normal",
                                                            children: [
                                                                "(",
                                                                (0, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$adminClient$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["moneyShort"])(src(k).revenue),
                                                                ")"
                                                            ]
                                                        }, void 0, true, {
                                                            fileName: "[project]/app/admin/page.tsx",
                                                            lineNumber: 111,
                                                            columnNumber: 41
                                                        }, this)
                                                    ]
                                                }, void 0, true, {
                                                    fileName: "[project]/app/admin/page.tsx",
                                                    lineNumber: 110,
                                                    columnNumber: 19
                                                }, this)
                                            ]
                                        }, k, true, {
                                            fileName: "[project]/app/admin/page.tsx",
                                            lineNumber: 105,
                                            columnNumber: 17
                                        }, this))
                                }, void 0, false, {
                                    fileName: "[project]/app/admin/page.tsx",
                                    lineNumber: 97,
                                    columnNumber: 13
                                }, this)
                            ]
                        }, void 0, true, {
                            fileName: "[project]/app/admin/page.tsx",
                            lineNumber: 83,
                            columnNumber: 11
                        }, this)
                    }, void 0, false, {
                        fileName: "[project]/app/admin/page.tsx",
                        lineNumber: 82,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$components$2f$admin$2f$ui$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Card"], {
                        title: "درآمد ۷ روز اخیر",
                        className: "lg:col-span-2",
                        action: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                            className: "text-xs text-[var(--color-ash)]",
                            children: [
                                "جمع: ",
                                (0, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$adminClient$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["moneyShort"])(week.totals.revenue),
                                " تومان"
                            ]
                        }, void 0, true, {
                            fileName: "[project]/app/admin/page.tsx",
                            lineNumber: 119,
                            columnNumber: 74
                        }, this),
                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$components$2f$admin$2f$ui$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["BarChart"], {
                            data: (0, __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$admin$2f$ui$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["dailyBars"])(week.daily),
                            highlightLast: true
                        }, void 0, false, {
                            fileName: "[project]/app/admin/page.tsx",
                            lineNumber: 120,
                            columnNumber: 11
                        }, this)
                    }, void 0, false, {
                        fileName: "[project]/app/admin/page.tsx",
                        lineNumber: 119,
                        columnNumber: 9
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/app/admin/page.tsx",
                lineNumber: 81,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "grid lg:grid-cols-3 gap-4",
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "lg:col-span-2",
                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$components$2f$admin$2f$ui$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Card"], {
                            title: "سفارش‌های در جریان",
                            action: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$client$2f$app$2d$dir$2f$link$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"], {
                                href: "/admin/orders",
                                className: "text-xs font-bold text-[var(--color-ember-light)] hover:underline",
                                children: "همه‌ی سفارش‌ها ←"
                            }, void 0, false, {
                                fileName: "[project]/app/admin/page.tsx",
                                lineNumber: 129,
                                columnNumber: 15
                            }, this),
                            children: data.active.length === 0 ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$components$2f$admin$2f$ui$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Empty"], {
                                text: "فعلاً سفارش بازی وجود ندارد 🎉"
                            }, void 0, false, {
                                fileName: "[project]/app/admin/page.tsx",
                                lineNumber: 135,
                                columnNumber: 15
                            }, this) : /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "grid sm:grid-cols-2 gap-3",
                                children: data.active.map((o)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$components$2f$admin$2f$OrderViews$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["OrderCard"], {
                                        order: o,
                                        onOpen: setOpen,
                                        onChanged: ()=>reload(true)
                                    }, o.order_code, false, {
                                        fileName: "[project]/app/admin/page.tsx",
                                        lineNumber: 139,
                                        columnNumber: 19
                                    }, this))
                            }, void 0, false, {
                                fileName: "[project]/app/admin/page.tsx",
                                lineNumber: 137,
                                columnNumber: 15
                            }, this)
                        }, void 0, false, {
                            fileName: "[project]/app/admin/page.tsx",
                            lineNumber: 126,
                            columnNumber: 11
                        }, this)
                    }, void 0, false, {
                        fileName: "[project]/app/admin/page.tsx",
                        lineNumber: 125,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "space-y-4",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$components$2f$admin$2f$ui$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Card"], {
                                title: "صندوق",
                                action: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$client$2f$app$2d$dir$2f$link$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"], {
                                    href: "/admin/cash",
                                    className: "text-xs font-bold text-[var(--color-ember-light)] hover:underline",
                                    children: "مدیریت ←"
                                }, void 0, false, {
                                    fileName: "[project]/app/admin/page.tsx",
                                    lineNumber: 147,
                                    columnNumber: 39
                                }, this),
                                children: data.shift ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    className: "text-sm space-y-2",
                                    children: [
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                            className: "flex justify-between",
                                            children: [
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                    className: "text-[var(--color-ash)]",
                                                    children: "فروش نقد شیفت"
                                                }, void 0, false, {
                                                    fileName: "[project]/app/admin/page.tsx",
                                                    lineNumber: 151,
                                                    columnNumber: 19
                                                }, this),
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                    className: "font-bold",
                                                    children: (0, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$adminClient$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["money"])(data.shift.cashSales)
                                                }, void 0, false, {
                                                    fileName: "[project]/app/admin/page.tsx",
                                                    lineNumber: 152,
                                                    columnNumber: 19
                                                }, this)
                                            ]
                                        }, void 0, true, {
                                            fileName: "[project]/app/admin/page.tsx",
                                            lineNumber: 150,
                                            columnNumber: 17
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                            className: "flex justify-between",
                                            children: [
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                    className: "text-[var(--color-ash)]",
                                                    children: "موجودی مورد انتظار"
                                                }, void 0, false, {
                                                    fileName: "[project]/app/admin/page.tsx",
                                                    lineNumber: 155,
                                                    columnNumber: 19
                                                }, this),
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                    className: "font-extrabold text-emerald-300",
                                                    children: (0, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$adminClient$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["money"])(data.shift.expectedCash)
                                                }, void 0, false, {
                                                    fileName: "[project]/app/admin/page.tsx",
                                                    lineNumber: 156,
                                                    columnNumber: 19
                                                }, this)
                                            ]
                                        }, void 0, true, {
                                            fileName: "[project]/app/admin/page.tsx",
                                            lineNumber: 154,
                                            columnNumber: 17
                                        }, this)
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/app/admin/page.tsx",
                                    lineNumber: 149,
                                    columnNumber: 15
                                }, this) : /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                    className: "text-sm text-[var(--color-ash)] leading-7",
                                    children: "شیفت صندوق باز نیست. برای شروعِ کار از بخش صندوق یک شیفت باز کنید."
                                }, void 0, false, {
                                    fileName: "[project]/app/admin/page.tsx",
                                    lineNumber: 160,
                                    columnNumber: 15
                                }, this)
                            }, void 0, false, {
                                fileName: "[project]/app/admin/page.tsx",
                                lineNumber: 147,
                                columnNumber: 11
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$components$2f$admin$2f$ui$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Card"], {
                                title: `هشدار انبار${data.lowStockCount ? ` (${(0, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$adminClient$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["fa"])(data.lowStockCount)})` : ""}`,
                                action: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$client$2f$app$2d$dir$2f$link$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"], {
                                    href: "/admin/inventory",
                                    className: "text-xs font-bold text-[var(--color-ember-light)] hover:underline",
                                    children: "انبار ←"
                                }, void 0, false, {
                                    fileName: "[project]/app/admin/page.tsx",
                                    lineNumber: 164,
                                    columnNumber: 106
                                }, this),
                                children: data.lowStock.length === 0 ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$components$2f$admin$2f$ui$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Empty"], {
                                    text: "موجودی همه‌ی کالاها کافی است ✓"
                                }, void 0, false, {
                                    fileName: "[project]/app/admin/page.tsx",
                                    lineNumber: 166,
                                    columnNumber: 15
                                }, this) : /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("ul", {
                                    className: "space-y-2.5 text-sm",
                                    children: data.lowStock.map((i)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("li", {
                                            className: "flex items-center justify-between gap-2",
                                            children: [
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                    children: i.name
                                                }, void 0, false, {
                                                    fileName: "[project]/app/admin/page.tsx",
                                                    lineNumber: 171,
                                                    columnNumber: 21
                                                }, this),
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                    className: `font-bold ${i.stock <= 0 ? "text-red-300" : "text-amber-300"}`,
                                                    children: i.stock <= 0 ? "تمام شده" : `${(0, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$adminClient$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["fa"])(i.stock)} ${i.unit}`
                                                }, void 0, false, {
                                                    fileName: "[project]/app/admin/page.tsx",
                                                    lineNumber: 172,
                                                    columnNumber: 21
                                                }, this)
                                            ]
                                        }, i.id, true, {
                                            fileName: "[project]/app/admin/page.tsx",
                                            lineNumber: 170,
                                            columnNumber: 19
                                        }, this))
                                }, void 0, false, {
                                    fileName: "[project]/app/admin/page.tsx",
                                    lineNumber: 168,
                                    columnNumber: 15
                                }, this)
                            }, void 0, false, {
                                fileName: "[project]/app/admin/page.tsx",
                                lineNumber: 164,
                                columnNumber: 11
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$components$2f$admin$2f$ui$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Card"], {
                                title: "پرفروش‌ترین‌ها (۷ روز)",
                                children: week.products.length === 0 ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$components$2f$admin$2f$ui$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Empty"], {
                                    text: "هنوز فروشی ثبت نشده"
                                }, void 0, false, {
                                    fileName: "[project]/app/admin/page.tsx",
                                    lineNumber: 183,
                                    columnNumber: 15
                                }, this) : /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$components$2f$admin$2f$ui$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["ShareBars"], {
                                    rows: week.products.slice(0, 5).map((p)=>({
                                            label: p.name,
                                            value: p.qty,
                                            sub: `${(0, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$adminClient$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["fa"])(p.qty)} عدد`
                                        }))
                                }, void 0, false, {
                                    fileName: "[project]/app/admin/page.tsx",
                                    lineNumber: 185,
                                    columnNumber: 15
                                }, this)
                            }, void 0, false, {
                                fileName: "[project]/app/admin/page.tsx",
                                lineNumber: 181,
                                columnNumber: 11
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/app/admin/page.tsx",
                        lineNumber: 146,
                        columnNumber: 9
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/app/admin/page.tsx",
                lineNumber: 124,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$components$2f$admin$2f$OrderViews$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["OrderDetail"], {
                order: open,
                onClose: ()=>setOpen(null),
                onChanged: ()=>reload(true)
            }, void 0, false, {
                fileName: "[project]/app/admin/page.tsx",
                lineNumber: 191,
                columnNumber: 7
            }, this)
        ]
    }, void 0, true);
}
_s(DashboardPage, "RuZSAMFOf0e6EeExvn5Xds86eWE=", false, function() {
    return [
        __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$admin$2f$ui$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useToast"],
        __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$admin$2f$hooks$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useFetch"],
        __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$admin$2f$hooks$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useFetch"]
    ];
});
_c = DashboardPage;
var _c;
__turbopack_context__.k.register(_c, "DashboardPage");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
]);

//# sourceMappingURL=_17ng0lp._.js.map