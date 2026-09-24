module.exports = [
"[externals]/next/dist/compiled/next-server/app-route-turbo.runtime.dev.js [external] (next/dist/compiled/next-server/app-route-turbo.runtime.dev.js, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("next/dist/compiled/next-server/app-route-turbo.runtime.dev.js", () => require("next/dist/compiled/next-server/app-route-turbo.runtime.dev.js"));

module.exports = mod;
}),
"[externals]/next/dist/compiled/@opentelemetry/api [external] (next/dist/compiled/@opentelemetry/api, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("next/dist/compiled/@opentelemetry/api", () => require("next/dist/compiled/@opentelemetry/api"));

module.exports = mod;
}),
"[externals]/next/dist/compiled/next-server/app-page-turbo.runtime.dev.js [external] (next/dist/compiled/next-server/app-page-turbo.runtime.dev.js, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("next/dist/compiled/next-server/app-page-turbo.runtime.dev.js", () => require("next/dist/compiled/next-server/app-page-turbo.runtime.dev.js"));

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
"[externals]/next/dist/shared/lib/no-fallback-error.external.js [external] (next/dist/shared/lib/no-fallback-error.external.js, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("next/dist/shared/lib/no-fallback-error.external.js", () => require("next/dist/shared/lib/no-fallback-error.external.js"));

module.exports = mod;
}),
"[externals]/next/dist/server/app-render/after-task-async-storage.external.js [external] (next/dist/server/app-render/after-task-async-storage.external.js, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("next/dist/server/app-render/after-task-async-storage.external.js", () => require("next/dist/server/app-render/after-task-async-storage.external.js"));

module.exports = mod;
}),
"[externals]/crypto [external] (crypto, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("crypto", () => require("crypto"));

module.exports = mod;
}),
"[project]/lib/userAuth.ts [app-route] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "OTP_MAX_ATTEMPTS",
    ()=>OTP_MAX_ATTEMPTS,
    "OTP_MAX_PER_HOUR_IP",
    ()=>OTP_MAX_PER_HOUR_IP,
    "OTP_MAX_PER_HOUR_PHONE",
    ()=>OTP_MAX_PER_HOUR_PHONE,
    "OTP_RESEND_S",
    ()=>OTP_RESEND_S,
    "OTP_TTL_S",
    ()=>OTP_TTL_S,
    "SESSION_COOKIE",
    ()=>SESSION_COOKIE,
    "SESSION_MAX_AGE_S",
    ()=>SESSION_MAX_AGE_S,
    "clientIp",
    ()=>clientIp,
    "createSessionToken",
    ()=>createSessionToken,
    "generateOtpCode",
    ()=>generateOtpCode,
    "hashOtp",
    ()=>hashOtp,
    "isAuthConfigured",
    ()=>isAuthConfigured,
    "readSessionPhone",
    ()=>readSessionPhone,
    "safeEqualHex",
    ()=>safeEqualHex,
    "signValue",
    ()=>signValue
]);
var __TURBOPACK__imported__module__$5b$externals$5d2f$crypto__$5b$external$5d$__$28$crypto$2c$__cjs$29$__ = __turbopack_context__.i("[externals]/crypto [external] (crypto, cjs)");
;
const SESSION_COOKIE = "gorg_session";
const SESSION_MAX_AGE_S = 30 * 24 * 60 * 60; // ۳۰ روز
const OTP_TTL_S = 5 * 60; // اعتبار کد: ۵ دقیقه
const OTP_RESEND_S = 120; // فاصله‌ی حداقلی بین دو پیامک به یک شماره
const OTP_MAX_ATTEMPTS = 5; // حداکثر تلاشِ اشتباه برای هر کد
const OTP_MAX_PER_HOUR_PHONE = 5; // حداکثر پیامک به یک شماره در ساعت
const OTP_MAX_PER_HOUR_IP = 10; // حداکثر درخواست از یک IP در ساعت (جلوگیری از سوءاستفاده از اعتبار پیامک)
function getSecret() {
    return process.env.AUTH_SECRET || process.env.ADMIN_SESSION_SECRET || process.env.ADMIN_PASSWORD || null;
}
function isAuthConfigured() {
    return Boolean(getSecret());
}
function sign(purpose, value) {
    const secret = getSecret();
    if (!secret) throw new Error("AUTH_SECRET تنظیم نشده است");
    return (0, __TURBOPACK__imported__module__$5b$externals$5d2f$crypto__$5b$external$5d$__$28$crypto$2c$__cjs$29$__["createHmac"])("sha256", secret).update(`${purpose}:${value}`).digest("hex");
}
function signValue(purpose, value) {
    return sign(purpose, value);
}
function generateOtpCode() {
    return String((0, __TURBOPACK__imported__module__$5b$externals$5d2f$crypto__$5b$external$5d$__$28$crypto$2c$__cjs$29$__["randomInt"])(100000, 1000000));
}
function hashOtp(phone, code) {
    return sign("otp", `${phone}:${code}`);
}
function safeEqualHex(a, b) {
    const x = Buffer.from(a);
    const y = Buffer.from(b);
    return x.length === y.length && (0, __TURBOPACK__imported__module__$5b$externals$5d2f$crypto__$5b$external$5d$__$28$crypto$2c$__cjs$29$__["timingSafeEqual"])(x, y);
}
function createSessionToken(phone) {
    const exp = Date.now() + SESSION_MAX_AGE_S * 1000;
    return `${phone}.${exp}.${sign("session", `${phone}.${exp}`)}`;
}
function readSessionPhone(token) {
    if (!token || !isAuthConfigured()) return null;
    const [phone, exp, sig] = token.split(".");
    if (!phone || !exp || !sig || !/^09\d{9}$/.test(phone)) return null;
    if (!(Number(exp) > Date.now())) return null;
    try {
        return safeEqualHex(sig, sign("session", `${phone}.${exp}`)) ? phone : null;
    } catch  {
        return null;
    }
}
function clientIp(req) {
    const fwd = req.headers.get("x-forwarded-for");
    return (fwd ? fwd.split(",")[0].trim() : req.headers.get("x-real-ip")) || "unknown";
}
}),
"[project]/app/api/auth/me/route.ts [app-route] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "GET",
    ()=>GET
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$server$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/server.js [app-route] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$userAuth$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/lib/userAuth.ts [app-route] (ecmascript)");
;
;
async function GET(req) {
    const phone = (0, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$userAuth$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["readSessionPhone"])(req.cookies.get(__TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$userAuth$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["SESSION_COOKIE"])?.value);
    return __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$server$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["NextResponse"].json({
        phone
    }, {
        headers: {
            "Cache-Control": "no-store"
        }
    });
}
}),
];

//# sourceMappingURL=%5Broot-of-the-server%5D__1dm4qsp._.js.map