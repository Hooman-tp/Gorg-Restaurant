import { NextRequest, NextResponse } from "next/server";
import { AdminSession, COOKIE_NAME, verifyAdminToken } from "./adminAuth";
import { isDbConfigured } from "./db";

type Handler = (req: NextRequest, admin: AdminSession) => Promise<Response>;

const noStore = { "Cache-Control": "no-store" };

export function json(body: unknown, status = 200) {
  return NextResponse.json(body, { status, headers: noStore });
}

/** فقط ادمینِ واردشده؛ خطاها همیشه JSON فارسی برمی‌گردانند */
export function adminOnly(handler: Handler): (req: NextRequest) => Promise<Response> {
  return async (req) => {
    const admin = verifyAdminToken(req.cookies.get(COOKIE_NAME)?.value);
    if (!admin) {
      return json({ error: "دسترسی ندارید" }, 401);
    }
    if (!isDbConfigured()) {
      return json({ error: "دیتابیس هنوز وصل نشده (DATABASE_URL)" }, 503);
    }
    try {
      return await handler(req, admin);
    } catch (err) {
      console.error("admin api error", req.nextUrl.pathname, err);
      const msg = err instanceof Error && err.message && /[\u0600-\u06FF]/.test(err.message) ? err.message : "خطای سرور؛ دوباره تلاش کنید";
      return json({ error: msg }, 500);
    }
  };
}

export async function readBody<T = Record<string, unknown>>(req: NextRequest): Promise<T> {
  try {
    return (await req.json()) as T;
  } catch {
    return {} as T;
  }
}

export const str = (v: unknown, max = 200) => (typeof v === "string" ? v.trim().slice(0, max) : "");
export const int = (v: unknown, def = 0) => {
  const n = Math.round(Number(v));
  return Number.isFinite(n) ? n : def;
};
