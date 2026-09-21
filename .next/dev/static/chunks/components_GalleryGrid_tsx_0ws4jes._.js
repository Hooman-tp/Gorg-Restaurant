(globalThis["TURBOPACK"] || (globalThis["TURBOPACK"] = [])).push([typeof document === "object" ? document.currentScript : undefined,
"[project]/components/GalleryGrid.tsx [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "default",
    ()=>GalleryGrid
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/index.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$image$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/image.js [app-client] (ecmascript)");
;
var _s = __turbopack_context__.k.signature();
"use client";
;
;
function GalleryGrid({ photos }) {
    _s();
    const [openIndex, setOpenIndex] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(null);
    const close = ()=>setOpenIndex(null);
    const prev = ()=>setOpenIndex((i)=>i === null ? null : (i - 1 + photos.length) % photos.length);
    const next = ()=>setOpenIndex((i)=>i === null ? null : (i + 1) % photos.length);
    // ناوبری با کیبورد وقتی لایت‌باکس بازه
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useEffect"])({
        "GalleryGrid.useEffect": ()=>{
            if (openIndex === null) return;
            const onKey = {
                "GalleryGrid.useEffect.onKey": (e)=>{
                    if (e.key === "Escape") setOpenIndex(null);
                    if (e.key === "ArrowRight") {
                        setOpenIndex({
                            "GalleryGrid.useEffect.onKey": (i)=>i === null ? null : (i - 1 + photos.length) % photos.length
                        }["GalleryGrid.useEffect.onKey"]);
                    }
                    if (e.key === "ArrowLeft") {
                        setOpenIndex({
                            "GalleryGrid.useEffect.onKey": (i)=>i === null ? null : (i + 1) % photos.length
                        }["GalleryGrid.useEffect.onKey"]);
                    }
                }
            }["GalleryGrid.useEffect.onKey"];
            window.addEventListener("keydown", onKey);
            return ({
                "GalleryGrid.useEffect": ()=>window.removeEventListener("keydown", onKey)
            })["GalleryGrid.useEffect"];
        }
    }["GalleryGrid.useEffect"], [
        openIndex,
        photos.length
    ]);
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Fragment"], {
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "columns-2 sm:columns-3 gap-3 [column-fill:_balance]",
                children: photos.map((photo, i)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                        onClick: ()=>setOpenIndex(i),
                        className: "relative block w-full mb-3 rounded-xl overflow-hidden gorg-card break-inside-avoid",
                        "aria-label": `مشاهده‌ی بزرگ‌تر ${photo.alt}`,
                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$image$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"], {
                            src: photo.src,
                            alt: photo.alt,
                            width: photo.width ?? 1179,
                            height: photo.height ?? 900,
                            sizes: "(max-width: 640px) 45vw, 30vw",
                            className: "w-full h-auto object-cover"
                        }, void 0, false, {
                            fileName: "[project]/components/GalleryGrid.tsx",
                            lineNumber: 46,
                            columnNumber: 13
                        }, this)
                    }, i, false, {
                        fileName: "[project]/components/GalleryGrid.tsx",
                        lineNumber: 40,
                        columnNumber: 11
                    }, this))
            }, void 0, false, {
                fileName: "[project]/components/GalleryGrid.tsx",
                lineNumber: 38,
                columnNumber: 7
            }, this),
            openIndex !== null && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                role: "dialog",
                "aria-modal": "true",
                "aria-label": "نمای بزرگ تصویر",
                className: "fixed inset-0 z-[200] bg-black/92 flex items-center justify-center px-4",
                onClick: close,
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "relative max-w-4xl w-full h-[82vh]",
                        style: {
                            height: "82svh"
                        },
                        onClick: (e)=>e.stopPropagation(),
                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$image$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"], {
                            src: photos[openIndex].src,
                            alt: photos[openIndex].alt,
                            fill: true,
                            sizes: "90vw",
                            className: "object-contain"
                        }, void 0, false, {
                            fileName: "[project]/components/GalleryGrid.tsx",
                            lineNumber: 69,
                            columnNumber: 13
                        }, this)
                    }, void 0, false, {
                        fileName: "[project]/components/GalleryGrid.tsx",
                        lineNumber: 68,
                        columnNumber: 11
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                        onClick: (e)=>{
                            e.stopPropagation();
                            close();
                        },
                        "aria-label": "بستن",
                        className: "absolute top-5 left-5 z-10 w-10 h-10 rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center text-lg",
                        children: "✕"
                    }, void 0, false, {
                        fileName: "[project]/components/GalleryGrid.tsx",
                        lineNumber: 78,
                        columnNumber: 11
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                        onClick: (e)=>{
                            e.stopPropagation();
                            prev();
                        },
                        "aria-label": "تصویر قبلی",
                        className: "absolute right-4 sm:right-8 z-10 w-11 h-11 rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center text-xl",
                        children: "›"
                    }, void 0, false, {
                        fileName: "[project]/components/GalleryGrid.tsx",
                        lineNumber: 88,
                        columnNumber: 11
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                        onClick: (e)=>{
                            e.stopPropagation();
                            next();
                        },
                        "aria-label": "تصویر بعدی",
                        className: "absolute left-4 sm:left-8 z-10 w-11 h-11 rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center text-xl",
                        children: "‹"
                    }, void 0, false, {
                        fileName: "[project]/components/GalleryGrid.tsx",
                        lineNumber: 98,
                        columnNumber: 11
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/components/GalleryGrid.tsx",
                lineNumber: 59,
                columnNumber: 9
            }, this)
        ]
    }, void 0, true);
}
_s(GalleryGrid, "fZPxCq3rs+PDTaz3vt9+6QRa2fI=");
_c = GalleryGrid;
var _c;
__turbopack_context__.k.register(_c, "GalleryGrid");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
]);

//# sourceMappingURL=components_GalleryGrid_tsx_0ws4jes._.js.map