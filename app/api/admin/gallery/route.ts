import { NextRequest } from "next/server";
import { adminOnly, int, json, readBody, str } from "@/lib/adminApi";
import { deleteGalleryPhoto, getAdminGalleryPhotos, moveGalleryPhoto, saveGalleryPhoto, setGalleryPhotoActive } from "@/lib/gallery";

export const GET = adminOnly(async () => json({ photos: await getAdminGalleryPhotos() }));

interface Body {
  action?: string;
  id?: string;
  photo?: Record<string, unknown>;
  value?: boolean;
  dir?: number;
}

export const POST = adminOnly(async (req: NextRequest) => {
  const b = await readBody<Body>(req);
  switch (b.action) {
    case "savePhoto": {
      const p = b.photo ?? {};
      const src = str(p.src, 500);
      if (!src) return json({ error: "اول یک عکس آپلود کنید" }, 400);
      const id = await saveGalleryPhoto({
        id: str(p.id, 60) || undefined,
        src,
        alt: str(p.alt, 300),
        width: int(p.width, 1179),
        height: int(p.height, 900),
        active: p.active !== false,
      });
      return json({ ok: true, id });
    }
    case "toggleActive": {
      if (!b.id) return json({ error: "درخواست نامعتبر" }, 400);
      await setGalleryPhotoActive(b.id, Boolean(b.value));
      return json({ ok: true });
    }
    case "delete": {
      if (!b.id) return json({ error: "درخواست نامعتبر" }, 400);
      await deleteGalleryPhoto(b.id);
      return json({ ok: true });
    }
    case "move": {
      if (!b.id || (b.dir !== 1 && b.dir !== -1)) return json({ error: "درخواست نامعتبر" }, 400);
      await moveGalleryPhoto(b.id, b.dir);
      return json({ ok: true });
    }
    default:
      return json({ error: "عملیات نامعتبر" }, 400);
  }
});
