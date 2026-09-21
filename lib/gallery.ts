import { dbQuery, isDbConfigured, Row } from "./db";
import { galleryPhotos as staticPhotos } from "./galleryData";

/**
 * عکس‌های گالری. منبعِ اصلی دیتابیس است (پنل مدیریت ← گالری آن را ویرایش
 * می‌کند و سایت همان را نشان می‌دهد). بار اول، گالریِ موجود در
 * lib/galleryData.ts به دیتابیس منتقل می‌شود؛ اگر دیتابیس وصل نباشد یا خطا
 * بدهد، همان گالریِ استاتیک نمایش داده می‌شود.
 */

export interface GalleryPhoto {
  src: string;
  alt: string;
  width: number;
  height: number;
}

export interface AdminGalleryPhoto extends GalleryPhoto {
  id: string;
  active: boolean;
  sortOrder: number;
}

let cache: { at: number; value: GalleryPhoto[] } | null = null;
const TTL_MS = 8000;
let seedPromise: Promise<void> | null = null;

function invalidateGalleryCache() {
  cache = null;
}

/** اولین بار گالریِ استاتیک را وارد دیتابیس می‌کند (فقط یک‌بار) */
async function seedIfNeeded(): Promise<void> {
  if (!seedPromise) {
    seedPromise = (async () => {
      const done = await dbQuery("SELECT 1 FROM site_settings WHERE key = 'gallery_seeded'");
      if (done.length > 0) return;
      const existing = await dbQuery("SELECT 1 FROM gallery_photos LIMIT 1");
      if (existing.length === 0) {
        let order = 0;
        for (const p of staticPhotos) {
          const id = `g-seed-${order}`;
          await dbQuery(
            `INSERT INTO gallery_photos (id, image, alt, width, height, sort_order)
             VALUES ($1,$2,$3,$4,$5,$6) ON CONFLICT (id) DO NOTHING`,
            [id, p.src, p.alt, p.width, p.height, order++]
          );
        }
      }
      await dbQuery("INSERT INTO site_settings (key, value) VALUES ('gallery_seeded', '1') ON CONFLICT (key) DO NOTHING");
    })().catch((err) => {
      seedPromise = null;
      throw err;
    });
  }
  return seedPromise;
}

function toPhoto(r: Row): AdminGalleryPhoto {
  return {
    id: String(r.id),
    src: String(r.image),
    alt: String(r.alt ?? ""),
    width: Number(r.width) || 1179,
    height: Number(r.height) || 900,
    active: Boolean(r.active),
    sortOrder: Number(r.sort_order),
  };
}

/** گالریِ قابل‌نمایش برای مشتری (صفحه‌ی /gallery و تیزر صفحه‌ی اصلی) */
export async function getGalleryPhotos(opts: { fresh?: boolean } = {}): Promise<GalleryPhoto[]> {
  if (!isDbConfigured()) return staticPhotos;
  if (!opts.fresh && cache && Date.now() - cache.at < TTL_MS) return cache.value;
  try {
    await seedIfNeeded();
    const rows = await dbQuery("SELECT * FROM gallery_photos WHERE active = true ORDER BY sort_order, id");
    const value = rows.length > 0 ? rows.map(toPhoto) : staticPhotos;
    cache = { at: Date.now(), value };
    return value;
  } catch (err) {
    console.error("getGalleryPhotos error؛ گالری استاتیک نمایش داده می‌شود", err);
    return cache?.value ?? staticPhotos;
  }
}

/** ── پنل مدیریت ── */

export async function getAdminGalleryPhotos(): Promise<AdminGalleryPhoto[]> {
  await seedIfNeeded();
  const rows = await dbQuery("SELECT * FROM gallery_photos ORDER BY sort_order, id");
  return rows.map(toPhoto);
}

function newId(): string {
  return `g-${Date.now().toString(36)}${Math.random().toString(36).slice(2, 6)}`;
}

export async function saveGalleryPhoto(input: {
  id?: string;
  src: string;
  alt?: string;
  width?: number;
  height?: number;
  active?: boolean;
}): Promise<string> {
  await seedIfNeeded();
  const id = input.id && input.id.trim() ? input.id.trim() : newId();
  const alt = (input.alt ?? "").trim().slice(0, 300);
  const width = Math.max(1, Math.round(Number(input.width) || 1179));
  const height = Math.max(1, Math.round(Number(input.height) || 900));
  const src = input.src.trim().slice(0, 500);
  const exists = await dbQuery("SELECT 1 FROM gallery_photos WHERE id = $1", [id]);
  if (exists.length > 0) {
    await dbQuery(`UPDATE gallery_photos SET image=$2, alt=$3, width=$4, height=$5, active=$6 WHERE id=$1`, [
      id,
      src,
      alt,
      width,
      height,
      input.active !== false,
    ]);
  } else {
    const max = await dbQuery("SELECT COALESCE(MAX(sort_order), 0)::int AS m FROM gallery_photos");
    await dbQuery(
      `INSERT INTO gallery_photos (id, image, alt, width, height, active, sort_order)
       VALUES ($1,$2,$3,$4,$5,$6,$7)`,
      [id, src, alt, width, height, input.active !== false, Number(max[0]?.m ?? 0) + 1]
    );
  }
  invalidateGalleryCache();
  return id;
}

export async function setGalleryPhotoActive(id: string, active: boolean) {
  await dbQuery("UPDATE gallery_photos SET active = $2 WHERE id = $1", [id, active]);
  invalidateGalleryCache();
}

export async function deleteGalleryPhoto(id: string) {
  await dbQuery("DELETE FROM gallery_photos WHERE id = $1", [id]);
  invalidateGalleryCache();
}

/** جابه‌جایی ترتیبِ یک عکس (بالا/پایین) */
export async function moveGalleryPhoto(id: string, dir: -1 | 1) {
  const rows = await dbQuery("SELECT id FROM gallery_photos ORDER BY sort_order, id");
  const ids = rows.map((r) => String(r.id));
  const i = ids.indexOf(id);
  const j = i + dir;
  if (i < 0 || j < 0 || j >= ids.length) return;
  [ids[i], ids[j]] = [ids[j], ids[i]];
  const base = await dbQuery("SELECT COALESCE(MIN(sort_order), 0)::int AS m FROM gallery_photos WHERE id = ANY($1::text[])", [ids]);
  const start = Number(base[0]?.m ?? 0);
  for (let k = 0; k < ids.length; k++) {
    await dbQuery("UPDATE gallery_photos SET sort_order = $2 WHERE id = $1", [ids[k], start + k]);
  }
  invalidateGalleryCache();
}

/** عکسِ آپلودشده (base64) را نگه می‌دارد و مسیرِ قابل‌نمایش آن را برمی‌گرداند */
export async function saveGalleryUpload(mime: string, base64: string): Promise<string> {
  const id = `gimg-${Date.now().toString(36)}${Math.random().toString(36).slice(2, 6)}`;
  await dbQuery("INSERT INTO gallery_uploads (id, mime, data) VALUES ($1,$2,$3)", [id, mime, base64]);
  return `/api/gallery-image/${id}`;
}

export async function getGalleryUpload(id: string): Promise<{ mime: string; data: string } | null> {
  const rows = await dbQuery("SELECT mime, data FROM gallery_uploads WHERE id = $1", [id]);
  return rows[0] ? { mime: String(rows[0].mime), data: String(rows[0].data) } : null;
}
