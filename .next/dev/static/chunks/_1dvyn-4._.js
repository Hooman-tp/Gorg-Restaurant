(globalThis["TURBOPACK"] || (globalThis["TURBOPACK"] = [])).push([typeof document === "object" ? document.currentScript : undefined,
"[project]/lib/adminClient.ts [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

/** کمک‌های سمتِ مرورگرِ پنل مدیریت (فقط داخل کامپوننت‌های کلاینت استفاده شود) */ __turbopack_context__.s([
    "ApiError",
    ()=>ApiError,
    "NEXT_STATUS",
    ()=>NEXT_STATUS,
    "STATUS_TONE",
    ()=>STATUS_TONE,
    "addDaysKey",
    ()=>addDaysKey,
    "api",
    ()=>api,
    "beep",
    ()=>beep,
    "compressImage",
    ()=>compressImage,
    "effPrice",
    ()=>effPrice,
    "fa",
    ()=>fa,
    "fmtDate",
    ()=>fmtDate,
    "fmtDateTime",
    ()=>fmtDateTime,
    "fmtDayShort",
    ()=>fmtDayShort,
    "fmtLongDay",
    ()=>fmtLongDay,
    "fmtTime",
    ()=>fmtTime,
    "money",
    ()=>money,
    "moneyShort",
    ()=>moneyShort,
    "printOrder",
    ()=>printOrder,
    "timeAgo",
    ()=>timeAgo,
    "toNumber",
    ()=>toNumber,
    "todayKey",
    ()=>todayKey,
    "unlockAudio",
    ()=>unlockAudio
]);
class ApiError extends Error {
    status;
    constructor(message, status){
        super(message);
        this.status = status;
    }
}
async function api(url, init) {
    const res = await fetch(url, {
        method: init?.method ?? (init?.body !== undefined ? "POST" : "GET"),
        headers: init?.body !== undefined ? {
            "Content-Type": "application/json"
        } : undefined,
        body: init?.body !== undefined ? JSON.stringify(init.body) : undefined,
        cache: "no-store"
    });
    const data = await res.json().catch(()=>({}));
    if (res.status === 401 && ("TURBOPACK compile-time value", "object") !== "undefined") window.dispatchEvent(new Event("admin-unauth"));
    if (!res.ok) throw new ApiError(data.error || "خطا در ارتباط با سرور", res.status);
    return data;
}
function effPrice(price, discount) {
    const d = Math.min(90, Math.max(0, Math.round(discount || 0)));
    return d ? Math.round(price * (100 - d) / 100) : price;
}
function todayKey() {
    return new Intl.DateTimeFormat("en-CA", {
        timeZone: "Asia/Tehran",
        year: "numeric",
        month: "2-digit",
        day: "2-digit"
    }).format(new Date());
}
function addDaysKey(day, n) {
    const t = new Date(`${day}T12:00:00+03:30`).getTime() + n * 86400000;
    return new Intl.DateTimeFormat("en-CA", {
        timeZone: "Asia/Tehran",
        year: "numeric",
        month: "2-digit",
        day: "2-digit"
    }).format(new Date(t));
}
const fa = (n)=>Number(n || 0).toLocaleString("fa-IR", {
        maximumFractionDigits: 2
    });
const money = (n)=>`${fa(Math.round(n))} تومان`;
function moneyShort(n) {
    const a = Math.abs(n);
    if (a >= 1_000_000_000) return `${fa(Math.round(n / 1_000_000_000 * 10) / 10)} میلیارد`;
    if (a >= 1_000_000) return `${fa(Math.round(n / 1_000_000 * 10) / 10)} میلیون`;
    return fa(Math.round(n));
}
const TZ = "Asia/Tehran";
const dateFmt = new Intl.DateTimeFormat("fa-IR-u-ca-persian", {
    timeZone: TZ,
    year: "numeric",
    month: "2-digit",
    day: "2-digit"
});
const timeFmt = new Intl.DateTimeFormat("fa-IR", {
    timeZone: TZ,
    hour: "2-digit",
    minute: "2-digit"
});
const longFmt = new Intl.DateTimeFormat("fa-IR-u-ca-persian", {
    timeZone: TZ,
    weekday: "long",
    year: "numeric",
    month: "long",
    day: "numeric"
});
const shortDay = new Intl.DateTimeFormat("fa-IR-u-ca-persian", {
    timeZone: TZ,
    month: "2-digit",
    day: "2-digit"
});
const fmtDate = (iso)=>dateFmt.format(new Date(iso));
const fmtTime = (iso)=>timeFmt.format(new Date(iso));
const fmtDateTime = (iso)=>`${fmtDate(iso)} ${fmtTime(iso)}`;
const fmtLongDay = (iso)=>longFmt.format(new Date(iso));
const fmtDayShort = (day)=>shortDay.format(new Date(`${day}T12:00:00+03:30`));
function timeAgo(iso) {
    const mins = Math.max(0, Math.round((Date.now() - new Date(iso).getTime()) / 60000));
    if (mins < 1) return "همین الان";
    if (mins < 60) return `${fa(mins)} دقیقه پیش`;
    const h = Math.floor(mins / 60);
    if (h < 24) return `${fa(h)} ساعت پیش`;
    return fmtDate(iso);
}
function toNumber(input) {
    const en = input.replace(/[۰-۹]/g, (d)=>String("۰۱۲۳۴۵۶۷۸۹".indexOf(d))).replace(/[٠-٩]/g, (d)=>String("٠١٢٣٤٥٦٧٨٩".indexOf(d))).replace(/[٬,،\s]/g, "").replace(/٫/g, ".");
    const n = Number(en);
    return Number.isFinite(n) ? n : 0;
}
const STATUS_TONE = {
    received: "bg-amber-500/15 text-amber-300 border-amber-400/30",
    preparing: "bg-sky-500/15 text-sky-300 border-sky-400/30",
    ready: "bg-emerald-500/15 text-emerald-300 border-emerald-400/30",
    delivered: "bg-white/8 text-[var(--color-ash)] border-white/15",
    cancelled: "bg-red-500/15 text-red-300 border-red-400/30"
};
const NEXT_STATUS = {
    received: {
        to: "preparing",
        label: "شروع آماده‌سازی"
    },
    preparing: {
        to: "ready",
        label: "آماده شد"
    },
    ready: {
        to: "delivered",
        label: "تحویل شد"
    }
};
/* ───────── صدا (زنگ سفارش جدید) ───────── */ let audioCtx = null;
function unlockAudio() {
    try {
        if (!audioCtx) {
            const Ctx = window.AudioContext || window.webkitAudioContext;
            audioCtx = new Ctx();
        }
        if (audioCtx.state === "suspended") void audioCtx.resume();
    } catch  {
    /* بدون صدا */ }
}
function beep() {
    try {
        if (!audioCtx) return;
        const now = audioCtx.currentTime;
        [
            880,
            1175,
            1568
        ].forEach((freq, i)=>{
            const osc = audioCtx.createOscillator();
            const gain = audioCtx.createGain();
            osc.type = "sine";
            osc.frequency.value = freq;
            gain.gain.setValueAtTime(0.0001, now + i * 0.16);
            gain.gain.exponentialRampToValueAtTime(0.25, now + i * 0.16 + 0.02);
            gain.gain.exponentialRampToValueAtTime(0.0001, now + i * 0.16 + 0.15);
            osc.connect(gain).connect(audioCtx.destination);
            osc.start(now + i * 0.16);
            osc.stop(now + i * 0.16 + 0.16);
        });
    } catch  {
    /* بدون صدا */ }
}
/* ───────── چاپ فیش ───────── */ const esc = (t)=>t.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;");
function printOrder(o, businessName = "رستوران گرگ") {
    const w = window.open("", "_blank", "width=380,height=640");
    if (!w) {
        alert("مرورگر پنجره‌ی چاپ را مسدود کرد؛ اجازه‌ی پاپ‌آپ بدهید.");
        return;
    }
    const typeLabel = o.order_type === "delivery" ? "ارسال با پیک" : o.order_type === "dine_in" ? `سالن${o.table_no ? ` — میز ${o.table_no}` : ""}` : "بیرون‌بر / تحویل حضوری";
    const payLabel = {
        online: "پرداخت آنلاین",
        cash: "نقد",
        card: "کارت‌خوان",
        other: "سایر"
    }[o.payment_method ?? "online"];
    const rows = o.lines.map((l)=>`<tr><td>${fa(l.qty)}×</td><td>${esc(l.name)}</td><td class="n">${fa(l.price * l.qty)}</td></tr>`).join("");
    w.document.write(`<!doctype html><html dir="rtl" lang="fa"><head><meta charset="utf-8"><title>${esc(o.order_code)}</title>
<style>
  @page { size: 80mm auto; margin: 4mm; }
  body { font-family: Tahoma, sans-serif; font-size: 13px; color: #000; margin: 0; }
  h1 { font-size: 16px; text-align: center; margin: 0 0 4px; }
  .c { text-align: center; } .code { font-size: 20px; font-weight: bold; letter-spacing: 1px; }
  hr { border: 0; border-top: 1px dashed #000; margin: 8px 0; }
  table { width: 100%; border-collapse: collapse; } td { padding: 3px 0; vertical-align: top; } .n { text-align: left; white-space: nowrap; }
  .tot { font-size: 16px; font-weight: bold; }
</style></head><body>
<h1>${esc(businessName)}</h1>
<div class="c">${esc(fmtDateTime(o.created_at))}</div>
<div class="c code">${esc(o.order_code)}</div>
<hr>
<div><b>${esc(typeLabel)}</b></div>
${o.name ? `<div>${esc(o.name)}${o.phone ? ` — ${esc(o.phone)}` : ""}</div>` : ""}
${o.address ? `<div>${esc(o.address)}</div>` : ""}
<hr>
<table>${rows}</table>
<hr>
${o.discount ? `<div>تخفیف: ${fa(o.discount)}</div>` : ""}
${o.delivery_fee ? `<div>هزینه ارسال: ${fa(o.delivery_fee)}</div>` : ""}
<div class="tot">جمع: ${fa(o.total)} تومان</div>
<div>${esc(payLabel ?? "")}</div>
${o.notes ? `<hr><div>توضیحات: ${esc(o.notes)}</div>` : ""}
<script>window.onload=function(){window.print();}</script>
</body></html>`);
    w.document.close();
}
async function compressImage(file, maxSide = 900, quality = 0.82) {
    const bitmap = await new Promise((resolve, reject)=>{
        const img = new Image();
        const url = URL.createObjectURL(file);
        img.onload = ()=>{
            URL.revokeObjectURL(url);
            resolve(img);
        };
        img.onerror = ()=>{
            URL.revokeObjectURL(url);
            reject(new Error("فایل انتخاب‌شده عکس نیست"));
        };
        img.src = url;
    });
    const scale = Math.min(1, maxSide / Math.max(bitmap.width, bitmap.height));
    const w = Math.max(1, Math.round(bitmap.width * scale));
    const h = Math.max(1, Math.round(bitmap.height * scale));
    const canvas = document.createElement("canvas");
    canvas.width = w;
    canvas.height = h;
    const ctx = canvas.getContext("2d");
    if (!ctx) throw new Error("مرورگر از پردازش عکس پشتیبانی نمی‌کند");
    ctx.fillStyle = "#000";
    ctx.fillRect(0, 0, w, h);
    ctx.drawImage(bitmap, 0, 0, w, h);
    const dataUrl = canvas.toDataURL("image/jpeg", quality);
    return {
        mime: "image/jpeg",
        data: dataUrl.replace(/^data:[^,]+,/, ""),
        width: w,
        height: h
    };
}
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/components/admin/ui.tsx [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "Badge",
    ()=>Badge,
    "BarChart",
    ()=>BarChart,
    "Card",
    ()=>Card,
    "Chips",
    ()=>Chips,
    "Donut",
    ()=>Donut,
    "Empty",
    ()=>Empty,
    "ErrorBox",
    ()=>ErrorBox,
    "Field",
    ()=>Field,
    "Loading",
    ()=>Loading,
    "Modal",
    ()=>Modal,
    "NumInput",
    ()=>NumInput,
    "PageTitle",
    ()=>PageTitle,
    "PasswordField",
    ()=>PasswordField,
    "SOURCE_COLORS",
    ()=>SOURCE_COLORS,
    "ShareBars",
    ()=>ShareBars,
    "Stat",
    ()=>Stat,
    "ToastProvider",
    ()=>ToastProvider,
    "Toggle",
    ()=>Toggle,
    "dailyBars",
    ()=>dailyBars,
    "useToast",
    ()=>useToast
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/index.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$adminClient$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/lib/adminClient.ts [app-client] (ecmascript)");
;
var _s = __turbopack_context__.k.signature(), _s1 = __turbopack_context__.k.signature(), _s2 = __turbopack_context__.k.signature(), _s3 = __turbopack_context__.k.signature(), _s4 = __turbopack_context__.k.signature();
"use client";
;
;
const ToastCtx = /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["createContext"])(_c = ()=>{});
_c1 = ToastCtx;
const useToast = ()=>{
    _s();
    return (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useContext"])(ToastCtx);
};
_s(useToast, "gDsCjeeItUuvgOWf1v4qoK9RF6k=");
function PasswordField({ value, onChange, placeholder, autoComplete, required }) {
    _s1();
    const [visible, setVisible] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(false);
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        className: "relative",
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("input", {
                type: visible ? "text" : "password",
                required: required,
                autoComplete: autoComplete,
                value: value,
                onChange: (e)=>onChange(e.target.value),
                placeholder: placeholder,
                className: "panel-input pl-10"
            }, void 0, false, {
                fileName: "[project]/components/admin/ui.tsx",
                lineNumber: 33,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                type: "button",
                onClick: ()=>setVisible((v)=>!v),
                "aria-label": visible ? "مخفی کردن رمز عبور" : "نمایش رمز عبور",
                tabIndex: -1,
                className: "absolute left-2.5 top-1/2 -translate-y-1/2 text-[var(--color-ash)] hover:text-[var(--color-bone)] p-1",
                children: visible ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("svg", {
                    width: "18",
                    height: "18",
                    viewBox: "0 0 24 24",
                    fill: "none",
                    stroke: "currentColor",
                    strokeWidth: "2",
                    children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("path", {
                        d: "M2 2l20 20M9.9 9.9a3 3 0 0 0 4.2 4.2M6.5 6.7C4.2 8.2 2.5 10.3 1 12c1.7 2.4 5.5 7 11 7 1.8 0 3.4-.5 4.8-1.2M17.9 17.9C19.9 16.5 21.4 14.4 23 12c-2-3.9-6-7-11-7-1 0-2 .1-2.9.4"
                    }, void 0, false, {
                        fileName: "[project]/components/admin/ui.tsx",
                        lineNumber: 51,
                        columnNumber: 13
                    }, this)
                }, void 0, false, {
                    fileName: "[project]/components/admin/ui.tsx",
                    lineNumber: 50,
                    columnNumber: 11
                }, this) : /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("svg", {
                    width: "18",
                    height: "18",
                    viewBox: "0 0 24 24",
                    fill: "none",
                    stroke: "currentColor",
                    strokeWidth: "2",
                    children: [
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("path", {
                            d: "M1 12s4-7 11-7 11 7 11 7-4 7-11 7-11-7-11-7Z"
                        }, void 0, false, {
                            fileName: "[project]/components/admin/ui.tsx",
                            lineNumber: 55,
                            columnNumber: 13
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("circle", {
                            cx: "12",
                            cy: "12",
                            r: "3"
                        }, void 0, false, {
                            fileName: "[project]/components/admin/ui.tsx",
                            lineNumber: 56,
                            columnNumber: 13
                        }, this)
                    ]
                }, void 0, true, {
                    fileName: "[project]/components/admin/ui.tsx",
                    lineNumber: 54,
                    columnNumber: 11
                }, this)
            }, void 0, false, {
                fileName: "[project]/components/admin/ui.tsx",
                lineNumber: 42,
                columnNumber: 7
            }, this)
        ]
    }, void 0, true, {
        fileName: "[project]/components/admin/ui.tsx",
        lineNumber: 32,
        columnNumber: 5
    }, this);
}
_s1(PasswordField, "OGsIWlGlwYpVUqIrDReJ1GWx7rw=");
_c2 = PasswordField;
function ToastProvider({ children }) {
    _s2();
    const [items, setItems] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])([]);
    const push = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useCallback"])({
        "ToastProvider.useCallback[push]": (text, kind = "ok")=>{
            const id = Date.now() + Math.random();
            setItems({
                "ToastProvider.useCallback[push]": (cur)=>[
                        ...cur.slice(-3),
                        {
                            id,
                            text,
                            kind
                        }
                    ]
            }["ToastProvider.useCallback[push]"]);
            setTimeout({
                "ToastProvider.useCallback[push]": ()=>setItems({
                        "ToastProvider.useCallback[push]": (cur)=>cur.filter({
                                "ToastProvider.useCallback[push]": (t)=>t.id !== id
                            }["ToastProvider.useCallback[push]"])
                    }["ToastProvider.useCallback[push]"])
            }["ToastProvider.useCallback[push]"], 4200);
        }
    }["ToastProvider.useCallback[push]"], []);
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(ToastCtx.Provider, {
        value: push,
        children: [
            children,
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "fixed bottom-5 inset-x-0 z-[300] flex flex-col items-center gap-2 px-4 pointer-events-none",
                "aria-live": "polite",
                children: items.map((t)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: `pointer-events-auto max-w-md w-full sm:w-auto rounded-xl px-5 py-3 text-sm font-bold shadow-2xl border ${t.kind === "error" ? "bg-[#3a1210] border-red-400/40 text-red-200" : t.kind === "info" ? "bg-[var(--color-charcoal-2)] border-white/15 text-[var(--color-bone)]" : "bg-[#10281c] border-emerald-400/40 text-emerald-200"}`,
                        children: t.text
                    }, t.id, false, {
                        fileName: "[project]/components/admin/ui.tsx",
                        lineNumber: 76,
                        columnNumber: 11
                    }, this))
            }, void 0, false, {
                fileName: "[project]/components/admin/ui.tsx",
                lineNumber: 74,
                columnNumber: 7
            }, this)
        ]
    }, void 0, true, {
        fileName: "[project]/components/admin/ui.tsx",
        lineNumber: 72,
        columnNumber: 5
    }, this);
}
_s2(ToastProvider, "iym/xze4sPlia82x/MCWv/zoz9Y=");
_c3 = ToastProvider;
function PageTitle({ title, sub, actions }) {
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        className: "flex flex-wrap items-end justify-between gap-3 mb-6",
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h1", {
                        className: "text-2xl sm:text-3xl font-black",
                        children: title
                    }, void 0, false, {
                        fileName: "[project]/components/admin/ui.tsx",
                        lineNumber: 99,
                        columnNumber: 9
                    }, this),
                    sub && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                        className: "text-sm text-[var(--color-ash)] mt-1",
                        children: sub
                    }, void 0, false, {
                        fileName: "[project]/components/admin/ui.tsx",
                        lineNumber: 100,
                        columnNumber: 17
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/components/admin/ui.tsx",
                lineNumber: 98,
                columnNumber: 7
            }, this),
            actions && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "flex flex-wrap items-center gap-2",
                children: actions
            }, void 0, false, {
                fileName: "[project]/components/admin/ui.tsx",
                lineNumber: 102,
                columnNumber: 19
            }, this)
        ]
    }, void 0, true, {
        fileName: "[project]/components/admin/ui.tsx",
        lineNumber: 97,
        columnNumber: 5
    }, this);
}
_c4 = PageTitle;
function Card({ title, action, children, className = "" }) {
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("section", {
        className: `panel-card p-4 sm:p-5 ${className}`,
        children: [
            (title || action) && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "flex items-center justify-between gap-3 mb-4",
                children: [
                    title && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h2", {
                        className: "font-extrabold text-[15px]",
                        children: title
                    }, void 0, false, {
                        fileName: "[project]/components/admin/ui.tsx",
                        lineNumber: 112,
                        columnNumber: 21
                    }, this),
                    action
                ]
            }, void 0, true, {
                fileName: "[project]/components/admin/ui.tsx",
                lineNumber: 111,
                columnNumber: 9
            }, this),
            children
        ]
    }, void 0, true, {
        fileName: "[project]/components/admin/ui.tsx",
        lineNumber: 109,
        columnNumber: 5
    }, this);
}
_c5 = Card;
function Stat({ label, value, sub, tone = "default" }) {
    const color = tone === "good" ? "text-emerald-300" : tone === "warn" ? "text-amber-300" : tone === "bad" ? "text-red-300" : "text-[var(--color-bone)]";
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        className: "panel-card p-4",
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                className: "text-xs text-[var(--color-ash)]",
                children: label
            }, void 0, false, {
                fileName: "[project]/components/admin/ui.tsx",
                lineNumber: 125,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                className: `text-2xl font-black mt-2 leading-tight ${color}`,
                children: value
            }, void 0, false, {
                fileName: "[project]/components/admin/ui.tsx",
                lineNumber: 126,
                columnNumber: 7
            }, this),
            sub && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                className: "text-xs text-[var(--color-ash)] mt-1.5",
                children: sub
            }, void 0, false, {
                fileName: "[project]/components/admin/ui.tsx",
                lineNumber: 127,
                columnNumber: 15
            }, this)
        ]
    }, void 0, true, {
        fileName: "[project]/components/admin/ui.tsx",
        lineNumber: 124,
        columnNumber: 5
    }, this);
}
_c6 = Stat;
function Loading({ text = "در حال بارگذاری…" }) {
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
        className: "text-sm text-[var(--color-ash)] py-10 text-center",
        children: text
    }, void 0, false, {
        fileName: "[project]/components/admin/ui.tsx",
        lineNumber: 133,
        columnNumber: 10
    }, this);
}
_c7 = Loading;
function ErrorBox({ message, onRetry }) {
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        className: "panel-card p-5 text-center",
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                className: "text-sm text-[var(--color-ember-light)] leading-7",
                children: message
            }, void 0, false, {
                fileName: "[project]/components/admin/ui.tsx",
                lineNumber: 139,
                columnNumber: 7
            }, this),
            onRetry && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                onClick: onRetry,
                className: "btn-outline btn-sm mt-3",
                children: "تلاش دوباره"
            }, void 0, false, {
                fileName: "[project]/components/admin/ui.tsx",
                lineNumber: 141,
                columnNumber: 9
            }, this)
        ]
    }, void 0, true, {
        fileName: "[project]/components/admin/ui.tsx",
        lineNumber: 138,
        columnNumber: 5
    }, this);
}
_c8 = ErrorBox;
function Empty({ text }) {
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
        className: "text-sm text-[var(--color-ash)] py-8 text-center",
        children: text
    }, void 0, false, {
        fileName: "[project]/components/admin/ui.tsx",
        lineNumber: 150,
        columnNumber: 10
    }, this);
}
_c9 = Empty;
function Badge({ children, className = "" }) {
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
        className: `inline-flex items-center gap-1 rounded-full border px-2.5 py-0.5 text-[11px] font-bold whitespace-nowrap ${className}`,
        children: children
    }, void 0, false, {
        fileName: "[project]/components/admin/ui.tsx",
        lineNumber: 155,
        columnNumber: 10
    }, this);
}
_c10 = Badge;
function Chips({ value, onChange, options, className = "" }) {
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        className: `flex flex-wrap gap-2 ${className}`,
        children: options.map((o)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                type: "button",
                onClick: ()=>onChange(o.value),
                className: `px-3.5 py-1.5 rounded-full text-[13px] font-bold border transition-colors ${value === o.value ? "bg-[var(--color-ember)] border-[var(--color-ember)] text-white" : "border-white/12 text-[var(--color-ash)] hover:border-white/30"}`,
                children: o.label
            }, o.value, false, {
                fileName: "[project]/components/admin/ui.tsx",
                lineNumber: 173,
                columnNumber: 9
            }, this))
    }, void 0, false, {
        fileName: "[project]/components/admin/ui.tsx",
        lineNumber: 171,
        columnNumber: 5
    }, this);
}
_c11 = Chips;
function Toggle({ checked, onChange, label, disabled }) {
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
        type: "button",
        role: "switch",
        "aria-checked": checked,
        "aria-label": label,
        disabled: disabled,
        onClick: ()=>onChange(!checked),
        className: `relative w-11 h-6 rounded-full transition-colors shrink-0 disabled:opacity-50 ${checked ? "bg-emerald-500" : "bg-white/15"}`,
        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
            className: `absolute top-0.5 w-5 h-5 rounded-full bg-white transition-all ${checked ? "right-0.5" : "right-[22px]"}`
        }, void 0, false, {
            fileName: "[project]/components/admin/ui.tsx",
            lineNumber: 199,
            columnNumber: 7
        }, this)
    }, void 0, false, {
        fileName: "[project]/components/admin/ui.tsx",
        lineNumber: 190,
        columnNumber: 5
    }, this);
}
_c12 = Toggle;
function Field({ label, hint, children, className = "" }) {
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("label", {
        className: `block ${className}`,
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                className: "block text-xs font-bold text-[var(--color-ash)] mb-1.5",
                children: label
            }, void 0, false, {
                fileName: "[project]/components/admin/ui.tsx",
                lineNumber: 207,
                columnNumber: 7
            }, this),
            children,
            hint && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                className: "block text-[11px] text-[var(--color-ash)]/80 mt-1",
                children: hint
            }, void 0, false, {
                fileName: "[project]/components/admin/ui.tsx",
                lineNumber: 209,
                columnNumber: 16
            }, this)
        ]
    }, void 0, true, {
        fileName: "[project]/components/admin/ui.tsx",
        lineNumber: 206,
        columnNumber: 5
    }, this);
}
_c13 = Field;
function NumInput({ value, onChange, placeholder, decimals = false, className = "", id }) {
    _s3();
    const [text, setText] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(value ? String(value) : "");
    // وقتی مقدار از بیرون عوض شد (مثلاً بعد از ذخیره/ریست)، متن هم همگام شود
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useEffect"])({
        "NumInput.useEffect": ()=>{
            // eslint-disable-next-line react-hooks/set-state-in-effect
            setText({
                "NumInput.useEffect": (cur)=>(0, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$adminClient$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["toNumber"])(cur) === value ? cur : value ? String(value) : ""
            }["NumInput.useEffect"]);
        }
    }["NumInput.useEffect"], [
        value
    ]);
    const shown = decimals ? text : text ? Number(text).toLocaleString("en-US") : "";
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("input", {
        id: id,
        dir: "ltr",
        inputMode: decimals ? "decimal" : "numeric",
        className: `panel-input text-left ${className}`,
        placeholder: placeholder,
        value: shown,
        onChange: (e)=>{
            const en = e.target.value.replace(/[۰-۹]/g, (d)=>String("۰۱۲۳۴۵۶۷۸۹".indexOf(d))).replace(/[٠-٩]/g, (d)=>String("٠١٢٣٤٥٦٧٨٩".indexOf(d))).replace(/٫/g, ".");
            let cleaned = decimals ? en.replace(/[^0-9.]/g, "").replace(/(\..*)\./g, "$1") : en.replace(/[^0-9]/g, "");
            if (!decimals) cleaned = cleaned.replace(/^0+(?=\d)/, "");
            setText(cleaned);
            onChange(cleaned === "" || cleaned === "." ? 0 : Number(cleaned));
        }
    }, void 0, false, {
        fileName: "[project]/components/admin/ui.tsx",
        lineNumber: 238,
        columnNumber: 5
    }, this);
}
_s3(NumInput, "v9uBInxAbCDA5dRoc1EHChEU30E=");
_c14 = NumInput;
function Modal({ open, onClose, title, children, wide = false }) {
    _s4();
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useEffect"])({
        "Modal.useEffect": ()=>{
            if (!open) return;
            const onKey = {
                "Modal.useEffect.onKey": (e)=>e.key === "Escape" && onClose()
            }["Modal.useEffect.onKey"];
            window.addEventListener("keydown", onKey);
            const prev = document.body.style.overflow;
            document.body.style.overflow = "hidden";
            return ({
                "Modal.useEffect": ()=>{
                    window.removeEventListener("keydown", onKey);
                    document.body.style.overflow = prev;
                }
            })["Modal.useEffect"];
        }
    }["Modal.useEffect"], [
        open,
        onClose
    ]);
    if (!open) return null;
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        className: "fixed inset-0 z-[200] flex items-end sm:items-center justify-center",
        role: "dialog",
        "aria-modal": "true",
        "aria-label": title,
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                "aria-label": "بستن",
                className: "absolute inset-0 bg-black/70",
                onClick: onClose,
                tabIndex: -1
            }, void 0, false, {
                fileName: "[project]/components/admin/ui.tsx",
                lineNumber: 287,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: `relative w-full ${wide ? "sm:max-w-2xl" : "sm:max-w-lg"} max-h-[92vh] overflow-y-auto rounded-t-3xl sm:rounded-2xl bg-[var(--color-charcoal)] border border-white/10 shadow-2xl`,
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "sticky top-0 z-10 flex items-center justify-between gap-3 px-5 py-4 bg-[var(--color-charcoal)] border-b border-white/8",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h2", {
                                className: "font-extrabold",
                                children: title
                            }, void 0, false, {
                                fileName: "[project]/components/admin/ui.tsx",
                                lineNumber: 292,
                                columnNumber: 11
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                onClick: onClose,
                                "aria-label": "بستن",
                                className: "w-8 h-8 rounded-full bg-white/8 hover:bg-white/15 text-sm",
                                children: "✕"
                            }, void 0, false, {
                                fileName: "[project]/components/admin/ui.tsx",
                                lineNumber: 293,
                                columnNumber: 11
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/components/admin/ui.tsx",
                        lineNumber: 291,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "p-5",
                        children: children
                    }, void 0, false, {
                        fileName: "[project]/components/admin/ui.tsx",
                        lineNumber: 297,
                        columnNumber: 9
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/components/admin/ui.tsx",
                lineNumber: 288,
                columnNumber: 7
            }, this)
        ]
    }, void 0, true, {
        fileName: "[project]/components/admin/ui.tsx",
        lineNumber: 286,
        columnNumber: 5
    }, this);
}
_s4(Modal, "OD7bBpZva5O2jO+Puf00hKivP7c=");
_c15 = Modal;
function BarChart({ data, height = 150, format = __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$adminClient$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["moneyShort"], highlightLast = false }) {
    const max = Math.max(1, ...data.map((d)=>d.value));
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        className: "flex items-end gap-1.5 sm:gap-2",
        style: {
            height: height + 44
        },
        dir: "rtl",
        children: data.map((d, i)=>{
            const h = Math.max(d.value > 0 ? 4 : 1, Math.round(d.value / max * height));
            const last = highlightLast && i === data.length - 1;
            return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "flex-1 min-w-0 flex flex-col items-center justify-end gap-1",
                title: `${d.label}: ${format(d.value)}`,
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                        className: "text-[10px] text-[var(--color-ash)] leading-none whitespace-nowrap overflow-hidden text-ellipsis max-w-full",
                        children: d.value ? format(d.value) : ""
                    }, void 0, false, {
                        fileName: "[project]/components/admin/ui.tsx",
                        lineNumber: 325,
                        columnNumber: 13
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: `w-full rounded-t-md ${last ? "bg-[var(--color-ember)]" : "bg-[var(--color-blood)]"}`,
                        style: {
                            height: h,
                            opacity: d.value ? 1 : 0.25
                        }
                    }, void 0, false, {
                        fileName: "[project]/components/admin/ui.tsx",
                        lineNumber: 326,
                        columnNumber: 13
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                        className: "text-[10px] text-[var(--color-ash)] leading-none",
                        children: d.label
                    }, void 0, false, {
                        fileName: "[project]/components/admin/ui.tsx",
                        lineNumber: 330,
                        columnNumber: 13
                    }, this)
                ]
            }, `${d.label}-${i}`, true, {
                fileName: "[project]/components/admin/ui.tsx",
                lineNumber: 324,
                columnNumber: 11
            }, this);
        })
    }, void 0, false, {
        fileName: "[project]/components/admin/ui.tsx",
        lineNumber: 319,
        columnNumber: 5
    }, this);
}
_c16 = BarChart;
function dailyBars(daily, key = "revenue") {
    return daily.map((d)=>({
            label: (0, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$adminClient$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["fmtDayShort"])(d.date),
            value: d[key]
        }));
}
function ShareBars({ rows }) {
    const total = rows.reduce((s, r)=>s + r.value, 0);
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        className: "space-y-3",
        children: rows.map((r)=>{
            const pct = total ? Math.round(r.value / total * 100) : 0;
            return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "flex items-center justify-between text-sm mb-1.5",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                className: "font-bold",
                                children: r.label
                            }, void 0, false, {
                                fileName: "[project]/components/admin/ui.tsx",
                                lineNumber: 352,
                                columnNumber: 15
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                className: "text-[var(--color-ash)] text-xs",
                                children: [
                                    r.sub ? `${r.sub} · ` : "",
                                    (0, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$adminClient$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["fa"])(pct),
                                    "٪"
                                ]
                            }, void 0, true, {
                                fileName: "[project]/components/admin/ui.tsx",
                                lineNumber: 353,
                                columnNumber: 15
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/components/admin/ui.tsx",
                        lineNumber: 351,
                        columnNumber: 13
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "h-2.5 rounded-full bg-white/8 overflow-hidden",
                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            className: "h-full rounded-full",
                            style: {
                                width: `${pct}%`,
                                background: r.color ?? "var(--color-ember)"
                            }
                        }, void 0, false, {
                            fileName: "[project]/components/admin/ui.tsx",
                            lineNumber: 359,
                            columnNumber: 15
                        }, this)
                    }, void 0, false, {
                        fileName: "[project]/components/admin/ui.tsx",
                        lineNumber: 358,
                        columnNumber: 13
                    }, this)
                ]
            }, r.label, true, {
                fileName: "[project]/components/admin/ui.tsx",
                lineNumber: 350,
                columnNumber: 11
            }, this);
        })
    }, void 0, false, {
        fileName: "[project]/components/admin/ui.tsx",
        lineNumber: 346,
        columnNumber: 5
    }, this);
}
_c17 = ShareBars;
function Donut({ parts, center }) {
    const total = parts.reduce((s, p)=>s + p.value, 0);
    let acc = 0;
    const stops = total ? parts.map((p)=>{
        const from = acc / total * 100;
        acc += p.value;
        return `${p.color} ${from}% ${acc / total * 100}%`;
    }).join(", ") : "rgba(255,255,255,0.1) 0% 100%";
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        className: "relative w-32 h-32 shrink-0",
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "absolute inset-0 rounded-full",
                style: {
                    background: `conic-gradient(${stops})`
                }
            }, void 0, false, {
                fileName: "[project]/components/admin/ui.tsx",
                lineNumber: 383,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "absolute inset-[14px] rounded-full bg-[var(--color-charcoal)] flex items-center justify-center text-center",
                children: center
            }, void 0, false, {
                fileName: "[project]/components/admin/ui.tsx",
                lineNumber: 384,
                columnNumber: 7
            }, this)
        ]
    }, void 0, true, {
        fileName: "[project]/components/admin/ui.tsx",
        lineNumber: 382,
        columnNumber: 5
    }, this);
}
_c18 = Donut;
const SOURCE_COLORS = {
    website: "#dd4a34",
    qr: "#e9a23b",
    pos: "#4aa3df"
};
var _c, _c1, _c2, _c3, _c4, _c5, _c6, _c7, _c8, _c9, _c10, _c11, _c12, _c13, _c14, _c15, _c16, _c17, _c18;
__turbopack_context__.k.register(_c, "ToastCtx$createContext");
__turbopack_context__.k.register(_c1, "ToastCtx");
__turbopack_context__.k.register(_c2, "PasswordField");
__turbopack_context__.k.register(_c3, "ToastProvider");
__turbopack_context__.k.register(_c4, "PageTitle");
__turbopack_context__.k.register(_c5, "Card");
__turbopack_context__.k.register(_c6, "Stat");
__turbopack_context__.k.register(_c7, "Loading");
__turbopack_context__.k.register(_c8, "ErrorBox");
__turbopack_context__.k.register(_c9, "Empty");
__turbopack_context__.k.register(_c10, "Badge");
__turbopack_context__.k.register(_c11, "Chips");
__turbopack_context__.k.register(_c12, "Toggle");
__turbopack_context__.k.register(_c13, "Field");
__turbopack_context__.k.register(_c14, "NumInput");
__turbopack_context__.k.register(_c15, "Modal");
__turbopack_context__.k.register(_c16, "BarChart");
__turbopack_context__.k.register(_c17, "ShareBars");
__turbopack_context__.k.register(_c18, "Donut");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/components/admin/AdminShell.tsx [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "default",
    ()=>AdminShell,
    "useAdmin",
    ()=>useAdmin
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/index.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$image$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/image.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$client$2f$app$2d$dir$2f$link$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/client/app-dir/link.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$navigation$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/navigation.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$adminClient$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/lib/adminClient.ts [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$admin$2f$ui$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/components/admin/ui.tsx [app-client] (ecmascript)");
;
var _s = __turbopack_context__.k.signature(), _s1 = __turbopack_context__.k.signature(), _s2 = __turbopack_context__.k.signature(), _s3 = __turbopack_context__.k.signature(), _s4 = __turbopack_context__.k.signature();
"use client";
;
;
;
;
;
;
const AdminCtx = /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["createContext"])({
    pulse: {
        latestId: 0,
        received: 0,
        preparing: 0,
        ready: 0
    },
    businessName: "رستوران گرگ",
    soundOn: true,
    username: ""
});
const useAdmin = ()=>{
    _s();
    return (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useContext"])(AdminCtx);
};
_s(useAdmin, "gDsCjeeItUuvgOWf1v4qoK9RF6k=");
const TABS = [
    {
        href: "/admin",
        label: "داشبورد",
        icon: "▦"
    },
    {
        href: "/admin/orders",
        label: "سفارش‌ها",
        icon: "🧾"
    },
    {
        href: "/admin/pos",
        label: "ثبت حضوری",
        icon: "🛎️"
    },
    {
        href: "/admin/cash",
        label: "صندوق",
        icon: "💵"
    },
    {
        href: "/admin/menu",
        label: "منو",
        icon: "🍔"
    },
    {
        href: "/admin/gallery",
        label: "گالری",
        icon: "🖼️"
    },
    {
        href: "/admin/inventory",
        label: "انبار",
        icon: "📦"
    },
    {
        href: "/admin/reports",
        label: "گزارش‌ها",
        icon: "📈"
    },
    {
        href: "/admin/customers",
        label: "مشتریان",
        icon: "👥"
    },
    {
        href: "/admin/tables",
        label: "میز و QR",
        icon: "🔳"
    },
    {
        href: "/admin/settings",
        label: "تنظیمات",
        icon: "⚙️"
    }
];
function ForgotPassword({ onBack }) {
    _s1();
    const [email, setEmail] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])("");
    const [sent, setSent] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(false);
    const [error, setError] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])("");
    const [busy, setBusy] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(false);
    async function submit(e) {
        e.preventDefault();
        setBusy(true);
        setError("");
        try {
            await (0, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$adminClient$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["api"])("/api/admin/forgot-password", {
                body: {
                    email
                }
            });
            setSent(true);
        } catch (err) {
            setError(err instanceof Error ? err.message : "ارسال ناموفق بود");
        } finally{
            setBusy(false);
        }
    }
    if (sent) {
        return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
            className: "panel-card p-6 space-y-4 text-center",
            children: [
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                    className: "text-sm leading-7",
                    children: "اگر این ایمیل به‌عنوان ایمیلِ بازیابیِ یک حساب ثبت شده باشد، یک لینک برایش ارسال شد. صندوق ورودی (و پوشه‌ی اسپم) را چک کنید."
                }, void 0, false, {
                    fileName: "[project]/components/admin/AdminShell.tsx",
                    lineNumber: 63,
                    columnNumber: 9
                }, this),
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                    onClick: onBack,
                    className: "btn-outline btn-sm",
                    children: "بازگشت به ورود"
                }, void 0, false, {
                    fileName: "[project]/components/admin/AdminShell.tsx",
                    lineNumber: 66,
                    columnNumber: 9
                }, this)
            ]
        }, void 0, true, {
            fileName: "[project]/components/admin/AdminShell.tsx",
            lineNumber: 62,
            columnNumber: 7
        }, this);
    }
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("form", {
        onSubmit: submit,
        className: "panel-card p-6 space-y-4",
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                className: "text-sm text-[var(--color-ash)] leading-7",
                children: "ایمیلِ بازیابی که قبلاً در «تنظیمات ← حساب کاربری» ثبت کرده‌اید را وارد کنید تا لینکِ تعیین رمز جدید برایتان ارسال شود."
            }, void 0, false, {
                fileName: "[project]/components/admin/AdminShell.tsx",
                lineNumber: 75,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("input", {
                type: "email",
                required: true,
                autoFocus: true,
                value: email,
                onChange: (e)=>setEmail(e.target.value),
                placeholder: "ایمیل بازیابی",
                dir: "ltr",
                className: "panel-input text-left"
            }, void 0, false, {
                fileName: "[project]/components/admin/AdminShell.tsx",
                lineNumber: 78,
                columnNumber: 7
            }, this),
            error && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                className: "text-sm text-[var(--color-ember-light)]",
                children: error
            }, void 0, false, {
                fileName: "[project]/components/admin/AdminShell.tsx",
                lineNumber: 88,
                columnNumber: 17
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                type: "submit",
                disabled: busy,
                className: "btn-primary w-full disabled:opacity-60",
                children: busy ? "در حال ارسال…" : "ارسال لینک بازیابی"
            }, void 0, false, {
                fileName: "[project]/components/admin/AdminShell.tsx",
                lineNumber: 89,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                type: "button",
                onClick: onBack,
                className: "text-xs text-[var(--color-ash)] w-full text-center hover:text-[var(--color-bone)]",
                children: "بازگشت به ورود"
            }, void 0, false, {
                fileName: "[project]/components/admin/AdminShell.tsx",
                lineNumber: 92,
                columnNumber: 7
            }, this)
        ]
    }, void 0, true, {
        fileName: "[project]/components/admin/AdminShell.tsx",
        lineNumber: 74,
        columnNumber: 5
    }, this);
}
_s1(ForgotPassword, "VW56LgBlCXWGw5u3HRyxh5bX95Y=");
_c = ForgotPassword;
function LoginForm({ onDone }) {
    _s2();
    const [mode, setMode] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])("login");
    const [username, setUsername] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])("");
    const [password, setPassword] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])("");
    const [error, setError] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])("");
    const [busy, setBusy] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(false);
    async function submit(e) {
        e.preventDefault();
        setBusy(true);
        setError("");
        try {
            await (0, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$adminClient$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["api"])("/api/admin/login", {
                body: {
                    username,
                    password
                }
            });
            setPassword("");
            onDone();
        } catch (err) {
            setError(err instanceof Error ? err.message : "ورود ناموفق بود");
        } finally{
            setBusy(false);
        }
    }
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        className: "min-h-screen brand-texture-soft flex items-center justify-center px-5",
        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
            className: "w-full max-w-sm",
            children: [
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    className: "flex flex-col items-center mb-6",
                    children: [
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$image$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"], {
                            src: "/images/gorg-mark.png",
                            alt: "گرگ",
                            width: 64,
                            height: 64,
                            className: "rounded-full mb-3",
                            priority: true
                        }, void 0, false, {
                            fileName: "[project]/components/admin/AdminShell.tsx",
                            lineNumber: 125,
                            columnNumber: 11
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h1", {
                            className: "text-2xl font-black",
                            children: "ورود به پنل مدیریت گرگ"
                        }, void 0, false, {
                            fileName: "[project]/components/admin/AdminShell.tsx",
                            lineNumber: 126,
                            columnNumber: 11
                        }, this)
                    ]
                }, void 0, true, {
                    fileName: "[project]/components/admin/AdminShell.tsx",
                    lineNumber: 124,
                    columnNumber: 9
                }, this),
                mode === "forgot" ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(ForgotPassword, {
                    onBack: ()=>setMode("login")
                }, void 0, false, {
                    fileName: "[project]/components/admin/AdminShell.tsx",
                    lineNumber: 129,
                    columnNumber: 11
                }, this) : /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("form", {
                    onSubmit: submit,
                    className: "panel-card p-6 space-y-4",
                    children: [
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("input", {
                            type: "text",
                            required: true,
                            autoFocus: true,
                            autoComplete: "username",
                            value: username,
                            onChange: (e)=>setUsername(e.target.value),
                            placeholder: "نام کاربری",
                            className: "panel-input"
                        }, void 0, false, {
                            fileName: "[project]/components/admin/AdminShell.tsx",
                            lineNumber: 132,
                            columnNumber: 13
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$components$2f$admin$2f$ui$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["PasswordField"], {
                            value: password,
                            onChange: setPassword,
                            placeholder: "رمز عبور",
                            autoComplete: "current-password",
                            required: true
                        }, void 0, false, {
                            fileName: "[project]/components/admin/AdminShell.tsx",
                            lineNumber: 142,
                            columnNumber: 13
                        }, this),
                        error && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                            className: "text-sm text-[var(--color-ember-light)]",
                            children: error
                        }, void 0, false, {
                            fileName: "[project]/components/admin/AdminShell.tsx",
                            lineNumber: 149,
                            columnNumber: 23
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                            type: "submit",
                            disabled: busy,
                            className: "btn-primary w-full disabled:opacity-60",
                            children: busy ? "در حال ورود…" : "ورود"
                        }, void 0, false, {
                            fileName: "[project]/components/admin/AdminShell.tsx",
                            lineNumber: 150,
                            columnNumber: 13
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                            type: "button",
                            onClick: ()=>setMode("forgot"),
                            className: "text-xs text-[var(--color-ash)] w-full text-center hover:text-[var(--color-bone)]",
                            children: "نام کاربری یا رمز عبور را فراموش کرده‌اید؟"
                        }, void 0, false, {
                            fileName: "[project]/components/admin/AdminShell.tsx",
                            lineNumber: 153,
                            columnNumber: 13
                        }, this)
                    ]
                }, void 0, true, {
                    fileName: "[project]/components/admin/AdminShell.tsx",
                    lineNumber: 131,
                    columnNumber: 11
                }, this)
            ]
        }, void 0, true, {
            fileName: "[project]/components/admin/AdminShell.tsx",
            lineNumber: 123,
            columnNumber: 7
        }, this)
    }, void 0, false, {
        fileName: "[project]/components/admin/AdminShell.tsx",
        lineNumber: 122,
        columnNumber: 5
    }, this);
}
_s2(LoginForm, "93bfJkICdq4+m/cBzptNwwyOBbQ=");
_c1 = LoginForm;
function Shell({ children, businessName, username, dbConfigured, onLogout }) {
    _s3();
    const pathname = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$navigation$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["usePathname"])();
    const toast = (0, __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$admin$2f$ui$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useToast"])();
    const [pulse, setPulse] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])({
        latestId: 0,
        received: 0,
        preparing: 0,
        ready: 0
    });
    const [soundOn, setSoundOn] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(true);
    const lastId = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useRef"])(null);
    const soundRef = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useRef"])(true);
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useEffect"])({
        "Shell.useEffect": ()=>{
            // eslint-disable-next-line react-hooks/set-state-in-effect
            setSoundOn(localStorage.getItem("gorg-admin-sound") !== "off");
            const unlock = {
                "Shell.useEffect.unlock": ()=>(0, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$adminClient$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["unlockAudio"])()
            }["Shell.useEffect.unlock"];
            window.addEventListener("pointerdown", unlock, {
                once: true
            });
            return ({
                "Shell.useEffect": ()=>window.removeEventListener("pointerdown", unlock)
            })["Shell.useEffect"];
        }
    }["Shell.useEffect"], []);
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useEffect"])({
        "Shell.useEffect": ()=>{
            soundRef.current = soundOn;
        }
    }["Shell.useEffect"], [
        soundOn
    ]);
    // هر ۱۰ ثانیه: سفارش جدید آمده؟ زنگ + پیام + به‌روزرسانی صفحه‌ی باز
    const poll = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useCallback"])({
        "Shell.useCallback[poll]": async ()=>{
            if (!dbConfigured) return;
            try {
                const p = await (0, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$adminClient$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["api"])("/api/admin/orders?pulse=1");
                setPulse(p);
                if (lastId.current !== null && p.latestId > lastId.current) {
                    if (soundRef.current) (0, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$adminClient$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["beep"])();
                    toast("🔔 سفارش جدید رسید", "info");
                    window.dispatchEvent(new Event("admin-new-orders"));
                }
                lastId.current = p.latestId;
            } catch  {
            /* شبکه‌ی ناپایدار؛ دفعه‌ی بعد */ }
        }
    }["Shell.useCallback[poll]"], [
        dbConfigured,
        toast
    ]);
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useEffect"])({
        "Shell.useEffect": ()=>{
            // eslint-disable-next-line react-hooks/set-state-in-effect
            poll();
            const t = setInterval(poll, 10000);
            const onVis = {
                "Shell.useEffect.onVis": ()=>document.visibilityState === "visible" && poll()
            }["Shell.useEffect.onVis"];
            document.addEventListener("visibilitychange", onVis);
            return ({
                "Shell.useEffect": ()=>{
                    clearInterval(t);
                    document.removeEventListener("visibilitychange", onVis);
                }
            })["Shell.useEffect"];
        }
    }["Shell.useEffect"], [
        poll
    ]);
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useEffect"])({
        "Shell.useEffect": ()=>{
            document.title = pulse.received > 0 ? `(${(0, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$adminClient$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["fa"])(pulse.received)}) سفارش جدید | پنل ${businessName}` : `پنل مدیریت | ${businessName}`;
        }
    }["Shell.useEffect"], [
        pulse.received,
        businessName
    ]);
    function toggleSound() {
        const next = !soundOn;
        setSoundOn(next);
        localStorage.setItem("gorg-admin-sound", next ? "on" : "off");
        if (next) {
            (0, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$adminClient$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["unlockAudio"])();
            (0, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$adminClient$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["beep"])();
        }
    }
    const isActive = (href)=>href === "/admin" ? pathname === "/admin" : pathname?.startsWith(href);
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(AdminCtx.Provider, {
        value: {
            pulse,
            businessName,
            soundOn,
            username
        },
        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
            className: "relative min-h-screen bg-[var(--color-ink)]",
            children: [
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    className: "fixed inset-0 -z-10 bg-cover bg-center bg-no-repeat",
                    style: {
                        backgroundImage: "url(/images/gorg-poster-full.jpg)"
                    },
                    "aria-hidden": "true"
                }, void 0, false, {
                    fileName: "[project]/components/admin/AdminShell.tsx",
                    lineNumber: 247,
                    columnNumber: 9
                }, this),
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    className: "fixed inset-0 -z-10 bg-[var(--color-ink)]/88",
                    "aria-hidden": "true"
                }, void 0, false, {
                    fileName: "[project]/components/admin/AdminShell.tsx",
                    lineNumber: 252,
                    columnNumber: 9
                }, this),
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("header", {
                    className: "brand-texture-soft border-b border-white/8",
                    children: [
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            className: "max-w-6xl mx-auto px-4 sm:px-5 py-3 flex items-center justify-between gap-3",
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$client$2f$app$2d$dir$2f$link$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"], {
                                    href: "/admin",
                                    className: "flex items-center gap-2.5 min-w-0",
                                    children: [
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$image$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"], {
                                            src: "/images/gorg-mark.png",
                                            alt: "",
                                            width: 38,
                                            height: 38,
                                            className: "rounded-full shrink-0"
                                        }, void 0, false, {
                                            fileName: "[project]/components/admin/AdminShell.tsx",
                                            lineNumber: 256,
                                            columnNumber: 15
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                            className: "min-w-0",
                                            children: [
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                                    className: "font-extrabold text-sm sm:text-base truncate",
                                                    children: businessName
                                                }, void 0, false, {
                                                    fileName: "[project]/components/admin/AdminShell.tsx",
                                                    lineNumber: 258,
                                                    columnNumber: 17
                                                }, this),
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                                    className: "text-[11px] text-[var(--color-ash)]",
                                                    children: "پنل مدیریت"
                                                }, void 0, false, {
                                                    fileName: "[project]/components/admin/AdminShell.tsx",
                                                    lineNumber: 259,
                                                    columnNumber: 17
                                                }, this)
                                            ]
                                        }, void 0, true, {
                                            fileName: "[project]/components/admin/AdminShell.tsx",
                                            lineNumber: 257,
                                            columnNumber: 15
                                        }, this)
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/components/admin/AdminShell.tsx",
                                    lineNumber: 255,
                                    columnNumber: 13
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    className: "flex items-center gap-2",
                                    children: [
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                            onClick: toggleSound,
                                            "aria-label": soundOn ? "خاموش کردن زنگ سفارش" : "روشن کردن زنگ سفارش",
                                            title: soundOn ? "زنگ سفارش روشن است" : "زنگ سفارش خاموش است",
                                            className: "w-9 h-9 rounded-full bg-white/6 border border-white/12 text-base",
                                            children: soundOn ? "🔔" : "🔕"
                                        }, void 0, false, {
                                            fileName: "[project]/components/admin/AdminShell.tsx",
                                            lineNumber: 263,
                                            columnNumber: 15
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$client$2f$app$2d$dir$2f$link$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"], {
                                            href: "/",
                                            target: "_blank",
                                            className: "btn-outline btn-sm hidden sm:inline-flex",
                                            children: "مشاهده سایت"
                                        }, void 0, false, {
                                            fileName: "[project]/components/admin/AdminShell.tsx",
                                            lineNumber: 271,
                                            columnNumber: 15
                                        }, this),
                                        username && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                            className: "text-xs text-[var(--color-ash)] hidden md:inline",
                                            children: username
                                        }, void 0, false, {
                                            fileName: "[project]/components/admin/AdminShell.tsx",
                                            lineNumber: 274,
                                            columnNumber: 28
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                            onClick: onLogout,
                                            className: "btn-outline btn-sm",
                                            children: "خروج"
                                        }, void 0, false, {
                                            fileName: "[project]/components/admin/AdminShell.tsx",
                                            lineNumber: 275,
                                            columnNumber: 15
                                        }, this)
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/components/admin/AdminShell.tsx",
                                    lineNumber: 262,
                                    columnNumber: 13
                                }, this)
                            ]
                        }, void 0, true, {
                            fileName: "[project]/components/admin/AdminShell.tsx",
                            lineNumber: 254,
                            columnNumber: 11
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("nav", {
                            className: "border-t border-white/6 bg-[var(--color-ink)]/70 backdrop-blur-sm",
                            "aria-label": "بخش‌های پنل",
                            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "max-w-6xl mx-auto px-3 sm:px-5 flex gap-1.5 overflow-x-auto no-scrollbar py-2",
                                children: TABS.map((t)=>{
                                    const active = isActive(t.href);
                                    const badge = t.href === "/admin/orders" ? pulse.received : 0;
                                    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$client$2f$app$2d$dir$2f$link$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"], {
                                        href: t.href,
                                        "aria-current": active ? "page" : undefined,
                                        className: `relative shrink-0 inline-flex items-center gap-1.5 rounded-full px-3.5 py-2 text-[13px] font-bold border transition-colors ${active ? "bg-[var(--color-ember)] border-[var(--color-ember)] text-white" : "border-white/10 text-[var(--color-ash)] hover:border-white/30 hover:text-[var(--color-bone)]"}`,
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                "aria-hidden": "true",
                                                children: t.icon
                                            }, void 0, false, {
                                                fileName: "[project]/components/admin/AdminShell.tsx",
                                                lineNumber: 296,
                                                columnNumber: 21
                                            }, this),
                                            t.label,
                                            badge > 0 && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                className: "panel-pulse min-w-5 h-5 px-1.5 rounded-full bg-amber-400 text-black text-[11px] font-black flex items-center justify-center",
                                                children: (0, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$adminClient$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["fa"])(badge)
                                            }, void 0, false, {
                                                fileName: "[project]/components/admin/AdminShell.tsx",
                                                lineNumber: 299,
                                                columnNumber: 23
                                            }, this)
                                        ]
                                    }, t.href, true, {
                                        fileName: "[project]/components/admin/AdminShell.tsx",
                                        lineNumber: 286,
                                        columnNumber: 19
                                    }, this);
                                })
                            }, void 0, false, {
                                fileName: "[project]/components/admin/AdminShell.tsx",
                                lineNumber: 281,
                                columnNumber: 13
                            }, this)
                        }, void 0, false, {
                            fileName: "[project]/components/admin/AdminShell.tsx",
                            lineNumber: 280,
                            columnNumber: 11
                        }, this)
                    ]
                }, void 0, true, {
                    fileName: "[project]/components/admin/AdminShell.tsx",
                    lineNumber: 253,
                    columnNumber: 9
                }, this),
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("main", {
                    className: "max-w-6xl mx-auto px-4 sm:px-5 py-6 pb-24",
                    children: !dbConfigured ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "panel-card p-6 text-center leading-8",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                className: "font-extrabold mb-2",
                                children: "دیتابیس هنوز وصل نشده"
                            }, void 0, false, {
                                fileName: "[project]/components/admin/AdminShell.tsx",
                                lineNumber: 313,
                                columnNumber: 15
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                className: "text-sm text-[var(--color-ash)]",
                                children: [
                                    "برای کار کردنِ پنل، در Vercel یک دیتابیس Neon/Postgres وصل کنید تا ",
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                        dir: "ltr",
                                        children: "DATABASE_URL"
                                    }, void 0, false, {
                                        fileName: "[project]/components/admin/AdminShell.tsx",
                                        lineNumber: 315,
                                        columnNumber: 84
                                    }, this),
                                    " تنظیم شود، بعد دوباره دیپلوی کنید."
                                ]
                            }, void 0, true, {
                                fileName: "[project]/components/admin/AdminShell.tsx",
                                lineNumber: 314,
                                columnNumber: 15
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/components/admin/AdminShell.tsx",
                        lineNumber: 312,
                        columnNumber: 13
                    }, this) : children
                }, void 0, false, {
                    fileName: "[project]/components/admin/AdminShell.tsx",
                    lineNumber: 310,
                    columnNumber: 9
                }, this)
            ]
        }, void 0, true, {
            fileName: "[project]/components/admin/AdminShell.tsx",
            lineNumber: 246,
            columnNumber: 7
        }, this)
    }, void 0, false, {
        fileName: "[project]/components/admin/AdminShell.tsx",
        lineNumber: 245,
        columnNumber: 5
    }, this);
}
_s3(Shell, "LPV67HVnbbZpF6l4dtObrLB5i3M=", false, function() {
    return [
        __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$navigation$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["usePathname"],
        __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$admin$2f$ui$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useToast"]
    ];
});
_c2 = Shell;
function AdminShell({ children }) {
    _s4();
    const pathname = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$navigation$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["usePathname"])();
    const cached = ("TURBOPACK compile-time truthy", 1) ? sessionStorage.getItem("gorg-admin-meta") : "TURBOPACK unreachable";
    const [state, setState] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(cached ? "in" : "loading");
    const [meta, setMeta] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])({
        businessName: "رستوران گرگ",
        username: "",
        dbConfigured: true
    });
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useEffect"])({
        "AdminShell.useEffect": ()=>{
            if (cached) {
                try {
                    setMeta(JSON.parse(cached));
                } catch  {
                /* نادیده گرفته می‌شود */ }
            }
        // eslint-disable-next-line react-hooks/exhaustive-deps
        }
    }["AdminShell.useEffect"], []);
    const check = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useCallback"])({
        "AdminShell.useCallback[check]": async ()=>{
            try {
                const r = await (0, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$adminClient$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["api"])("/api/admin/me");
                const next = {
                    businessName: r.businessName,
                    username: r.username,
                    dbConfigured: r.dbConfigured
                };
                setMeta(next);
                setState("in");
                sessionStorage.setItem("gorg-admin-meta", JSON.stringify(next));
            } catch  {
                setState("out");
                sessionStorage.removeItem("gorg-admin-meta");
            }
        }
    }["AdminShell.useCallback[check]"], []);
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useEffect"])({
        "AdminShell.useEffect": ()=>{
            // eslint-disable-next-line react-hooks/set-state-in-effect
            check();
            const out = {
                "AdminShell.useEffect.out": ()=>setState("out")
            }["AdminShell.useEffect.out"];
            window.addEventListener("admin-unauth", out);
            return ({
                "AdminShell.useEffect": ()=>window.removeEventListener("admin-unauth", out)
            })["AdminShell.useEffect"];
        }
    }["AdminShell.useEffect"], [
        check
    ]);
    async function logout() {
        await fetch("/api/admin/logout", {
            method: "POST"
        });
        sessionStorage.removeItem("gorg-admin-meta");
        setState("out");
    }
    // لینکِ ایمیلِ «رمز را فراموش کرده‌ام» به همین مسیر می‌رسد؛ چون کاربر هنوز
    // واردنشده، باید بدون گذر از چرخه‌ی ورود، مستقیم نمایش داده شود
    if (pathname === "/admin/reset-password") return children;
    if (state === "loading") {
        return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
            className: "min-h-screen flex items-center justify-center text-[var(--color-ash)] text-sm",
            children: "در حال بارگذاری…"
        }, void 0, false, {
            fileName: "[project]/components/admin/AdminShell.tsx",
            lineNumber: 376,
            columnNumber: 12
        }, this);
    }
    if (state === "out") return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(LoginForm, {
        onDone: check
    }, void 0, false, {
        fileName: "[project]/components/admin/AdminShell.tsx",
        lineNumber: 378,
        columnNumber: 31
    }, this);
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$components$2f$admin$2f$ui$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["ToastProvider"], {
        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(Shell, {
            businessName: meta.businessName,
            username: meta.username,
            dbConfigured: meta.dbConfigured,
            onLogout: logout,
            children: children
        }, void 0, false, {
            fileName: "[project]/components/admin/AdminShell.tsx",
            lineNumber: 382,
            columnNumber: 7
        }, this)
    }, void 0, false, {
        fileName: "[project]/components/admin/AdminShell.tsx",
        lineNumber: 381,
        columnNumber: 5
    }, this);
}
_s4(AdminShell, "nbdkU4bgWuusyTwkpwgc1VEJPRM=", false, function() {
    return [
        __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$navigation$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["usePathname"]
    ];
});
_c3 = AdminShell;
var _c, _c1, _c2, _c3;
__turbopack_context__.k.register(_c, "ForgotPassword");
__turbopack_context__.k.register(_c1, "LoginForm");
__turbopack_context__.k.register(_c2, "Shell");
__turbopack_context__.k.register(_c3, "AdminShell");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
]);

//# sourceMappingURL=_1dvyn-4._.js.map