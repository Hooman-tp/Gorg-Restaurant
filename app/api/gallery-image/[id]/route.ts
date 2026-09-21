import { NextRequest } from "next/server";
import { getGalleryUpload } from "@/lib/gallery";
import { isDbConfigured } from "@/lib/db";

/** عکس‌های گالری آپلودشده از پنل. شناسه هر بار جدید است، پس کش طولانی امن است. */
export async function GET(_req: NextRequest, ctx: { params: Promise<{ id: string }> }) {
  const { id } = await ctx.params;
  if (!isDbConfigured() || !/^gimg-[a-z0-9]+$/.test(id)) return new Response("Not found", { status: 404 });
  try {
    const img = await getGalleryUpload(id);
    if (!img) return new Response("Not found", { status: 404 });
    return new Response(new Uint8Array(Buffer.from(img.data, "base64")), {
      headers: { "Content-Type": img.mime, "Cache-Control": "public, max-age=31536000, immutable" },
    });
  } catch (err) {
    console.error("gallery-image error", err);
    return new Response("Error", { status: 500 });
  }
}
