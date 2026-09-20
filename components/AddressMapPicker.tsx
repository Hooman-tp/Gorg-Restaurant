"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import * as L from "leaflet";
import "leaflet/dist/leaflet.css";

export interface PickedLocation {
  lat: number;
  lng: number;
  /** آدرسِ متنیِ پیشنهادیِ همان نقطه (ممکن است خالی باشد اگر سرویس آدرس‌یابی جواب نداد) */
  text: string;
}

// مرکز تهران؛ اگر مشتری قبلاً موقعیتی ذخیره کرده باشد از همان شروع می‌شود
const TEHRAN: [number, number] = [35.715, 51.404];

/** مختصات → آدرس متنی فارسی (OpenStreetMap Nominatim، بدون نیاز به کلید) */
async function reverseGeocode(lat: number, lng: number, signal: AbortSignal): Promise<string> {
  const url =
    "https://nominatim.openstreetmap.org/reverse?format=jsonv2&addressdetails=1&zoom=18&accept-language=fa" +
    `&lat=${lat}&lon=${lng}`;
  const res = await fetch(url, { signal, headers: { Accept: "application/json" } });
  if (!res.ok) throw new Error("geocode failed");
  const data = await res.json();
  const a = (data?.address ?? {}) as Record<string, string | undefined>;
  const parts = [
    a.road || a.pedestrian || a.footway || a.path,
    a.neighbourhood || a.suburb || a.quarter,
    a.city_district,
    a.city || a.town || a.village || a.county,
  ].filter((p): p is string => Boolean(p));
  const unique = parts.filter((p, i) => parts.indexOf(p) === i);
  if (unique.length) return unique.join("، ");
  return typeof data?.display_name === "string" ? data.display_name.split(",").slice(0, 3).join("،") : "";
}

function CrosshairIcon() {
  return (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <circle cx="12" cy="12" r="4" stroke="currentColor" strokeWidth="2" />
      <path d="M12 2v3M12 19v3M2 12h3M19 12h3" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
    </svg>
  );
}

/**
 * انتخاب آدرس روی نقشه (شبیه اسنپ): نقشه زیرِ سنجاقِ ثابتِ وسط حرکت می‌کند.
 * ‏«موقعیت فعلی من» با GPS، و آدرس متنی خودکار از روی نقطه پیشنهاد می‌شود.
 */
export default function AddressMapPicker({
  initial,
  onConfirm,
  onClose,
}: {
  initial?: { lat: number; lng: number } | null;
  onConfirm: (loc: PickedLocation) => void;
  onClose: () => void;
}) {
  const mapEl = useRef<HTMLDivElement>(null);
  const mapRef = useRef<L.Map | null>(null);
  const geoAbort = useRef<AbortController | null>(null);
  const geoTimer = useRef<ReturnType<typeof setTimeout> | null>(null);
  // تا کاربر نقشه را جابه‌جا نکرده (یا GPS نزده)، «مرکز نقشه» هنوز موقعیتِ واقعیِ او نیست
  const placedRef = useRef(Boolean(initial));

  const [center, setCenter] = useState<{ lat: number; lng: number }>(
    initial ? { lat: initial.lat, lng: initial.lng } : { lat: TEHRAN[0], lng: TEHRAN[1] }
  );
  const [text, setText] = useState("");
  const [placed, setPlaced] = useState(Boolean(initial));
  const [looking, setLooking] = useState(false);
  const [moving, setMoving] = useState(false);
  const [gpsBusy, setGpsBusy] = useState(false);
  const [gpsError, setGpsError] = useState("");
  const [tilesFailed, setTilesFailed] = useState(false);

  // آدرس متنیِ نقطه‌ی وسط (با کمی تأخیر تا موقع کشیدنِ نقشه درخواستِ الکی نرود)
  const lookup = useCallback((lat: number, lng: number) => {
    if (geoTimer.current) clearTimeout(geoTimer.current);
    geoAbort.current?.abort();
    setLooking(true);
    geoTimer.current = setTimeout(async () => {
      const ctrl = new AbortController();
      geoAbort.current = ctrl;
      try {
        setText(await reverseGeocode(lat, lng, ctrl.signal));
      } catch (err) {
        if ((err as Error)?.name !== "AbortError") setText("");
      } finally {
        if (!ctrl.signal.aborted) setLooking(false);
      }
    }, 700);
  }, []);

  const markPlaced = useCallback(() => {
    placedRef.current = true;
    setPlaced(true);
  }, []);

  // ساختن نقشه (یک‌بار)
  useEffect(() => {
    const el = mapEl.current;
    if (!el) return;

    const start = initial ?? { lat: TEHRAN[0], lng: TEHRAN[1] };
    const map = L.map(el, {
      center: [start.lat, start.lng],
      zoom: initial ? 17 : 12,
      zoomControl: false,
      attributionControl: true,
    });
    map.attributionControl.setPrefix(false);
    let failed = 0;
    const tiles = L.tileLayer("https://tile.openstreetmap.org/{z}/{x}/{y}.png", {
      maxZoom: 19,
      attribution: '© <a href="https://www.openstreetmap.org/copyright" target="_blank" rel="noopener noreferrer">OpenStreetMap</a>',
    }).addTo(map);
    tiles.on("tileerror", () => {
      failed += 1;
      if (failed >= 4) setTilesFailed(true);
    });
    tiles.on("tileload", () => {
      failed = 0;
      setTilesFailed(false);
    });

    map.on("dragstart zoomstart", markPlaced);
    map.on("movestart", () => setMoving(true));
    map.on("moveend", () => {
      setMoving(false);
      const c = map.getCenter();
      setCenter({ lat: c.lat, lng: c.lng });
      if (placedRef.current) lookup(c.lat, c.lng);
    });
    mapRef.current = map;

    // اندازه‌ی نقشه بعد از باز شدنِ پنجره درست حساب شود
    const t = setTimeout(() => map.invalidateSize(), 120);
    if (initial) lookup(initial.lat, initial.lng);

    // اگر قبلاً اجازه‌ی موقعیت مکانی داده شده، بدون پرسیدنِ دوباره به مکان کاربر برو
    if (!initial && navigator.permissions?.query) {
      navigator.permissions
        .query({ name: "geolocation" as PermissionName })
        .then((p) => {
          if (p.state === "granted") {
            navigator.geolocation.getCurrentPosition(
              (pos) => {
                markPlaced();
                map.setView([pos.coords.latitude, pos.coords.longitude], 17);
              },
              () => {},
              { enableHighAccuracy: true, timeout: 8000 }
            );
          }
        })
        .catch(() => {});
    }

    return () => {
      clearTimeout(t);
      if (geoTimer.current) clearTimeout(geoTimer.current);
      geoAbort.current?.abort();
      map.remove();
      mapRef.current = null;
    };
    // فقط یک‌بار موقع باز شدن اجرا می‌شود
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // بستن با Escape و جلوگیری از اسکرولِ صفحه‌ی زیرِ نقشه
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    window.addEventListener("keydown", onKey);
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      window.removeEventListener("keydown", onKey);
      document.body.style.overflow = prev;
    };
  }, [onClose]);

  function goToMyLocation() {
    if (!navigator.geolocation) {
      setGpsError("مرورگر شما موقعیت مکانی را پشتیبانی نمی‌کند؛ نقشه را با دست جابه‌جا کنید.");
      return;
    }
    setGpsBusy(true);
    setGpsError("");
    navigator.geolocation.getCurrentPosition(
      (pos) => {
        setGpsBusy(false);
        markPlaced();
        mapRef.current?.setView([pos.coords.latitude, pos.coords.longitude], 17);
      },
      (err) => {
        setGpsBusy(false);
        setGpsError(
          err.code === 1
            ? "دسترسی به موقعیت مکانی مجاز نشده؛ در تنظیمات مرورگر اجازه بدهید یا نقشه را با دست جابه‌جا کنید."
            : "موقعیت شما پیدا نشد؛ نقشه را با دست جابه‌جا کنید."
        );
      },
      { enableHighAccuracy: true, timeout: 10000, maximumAge: 30000 }
    );
  }

  function confirm() {
    // مرکزِ لحظه‌ی زدنِ کلید (نه مقدارِ ذخیره‌شده) تا اگر نقشه هنوز در حال سُر خوردن است، دقیق باشد
    const c = mapRef.current?.getCenter() ?? center;
    onConfirm({
      lat: Number(c.lat.toFixed(6)),
      lng: Number(c.lng.toFixed(6)),
      // اگر آدرسِ نقطه‌ی جدید هنوز نیامده، آدرسِ قدیمی را نمی‌فرستیم تا با موقعیت نخواند
      text: looking ? "" : text,
    });
  }

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-label="انتخاب آدرس روی نقشه"
      data-lenis-prevent
      className="address-map fixed inset-0 z-[170] flex flex-col bg-[var(--color-ink)]"
    >
      <div className="flex items-center justify-between gap-3 px-5 py-3 border-b border-white/10 bg-[var(--color-charcoal)]">
        <h2 className="font-extrabold text-base">موقعیت خود را روی نقشه مشخص کنید</h2>
        <button
          type="button"
          onClick={onClose}
          aria-label="بستن نقشه"
          className="w-9 h-9 shrink-0 rounded-full bg-white/5 border border-white/12 flex items-center justify-center text-sm hover:bg-white/10"
        >
          ✕
        </button>
      </div>

      <div className="relative flex-1 min-h-0">
        <div ref={mapEl} dir="ltr" className="absolute inset-0 z-0" />

        {/* سنجاقِ ثابتِ وسط: نوکِ آن دقیقاً روی مرکز نقشه است */}
        <div className="pointer-events-none absolute inset-0 z-[500]">
          <div className="absolute left-1/2 top-1/2">
            <span
              aria-hidden="true"
              className="absolute left-0 top-0 block w-3 h-1.5 -translate-x-1/2 -translate-y-1/2 rounded-full bg-black/35 blur-[1px]"
            />
            <svg
              width="40"
              height="52"
              viewBox="0 0 40 52"
              aria-hidden="true"
              className={`map-pin absolute left-0 top-0 drop-shadow-[0_6px_8px_rgba(0,0,0,0.4)] ${moving ? "is-moving" : ""}`}
            >
              <path
                d="M20 0C9 0 0 8.7 0 19.6 0 33.8 20 52 20 52s20-18.2 20-32.4C40 8.7 31 0 20 0Z"
                fill="#dd4a34"
              />
              <circle cx="20" cy="19.5" r="7.5" fill="#fff" />
            </svg>
          </div>
        </div>

        {/* کلیدهای کنار نقشه */}
        <div className="absolute left-3 top-3 z-[600] flex flex-col gap-2">
          <button
            type="button"
            onClick={() => mapRef.current?.zoomIn()}
            aria-label="بزرگ‌نمایی"
            className="w-10 h-10 rounded-xl bg-[var(--color-charcoal)] border border-white/15 text-lg font-bold shadow-lg"
          >
            +
          </button>
          <button
            type="button"
            onClick={() => mapRef.current?.zoomOut()}
            aria-label="کوچک‌نمایی"
            className="w-10 h-10 rounded-xl bg-[var(--color-charcoal)] border border-white/15 text-lg font-bold shadow-lg"
          >
            −
          </button>
        </div>
        <button
          type="button"
          onClick={goToMyLocation}
          disabled={gpsBusy}
          className="absolute left-3 bottom-4 z-[600] inline-flex items-center gap-2 rounded-full bg-[var(--color-charcoal)] border border-white/15 px-4 py-2.5 text-xs font-bold shadow-lg disabled:opacity-60"
        >
          <CrosshairIcon />
          {gpsBusy ? "در حال یافتن…" : "موقعیت فعلی من"}
        </button>

        {tilesFailed && (
          <p className="absolute inset-x-3 top-3 z-[600] mx-auto max-w-sm rounded-xl bg-black/80 px-4 py-2.5 text-center text-xs leading-6">
            نقشه بارگذاری نشد. اینترنت را بررسی کنید یا این پنجره را ببندید و آدرس را تایپ کنید.
          </p>
        )}
      </div>

      <div className="border-t border-white/10 bg-[var(--color-charcoal)] px-5 pt-4 pb-5 space-y-3">
        <div>
          <p className="text-xs text-[var(--color-ash)]">آدرسِ این نقطه</p>
          <p className="mt-1 text-sm font-bold leading-7 min-h-[1.75rem]" aria-live="polite">
            {!placed ? (
              <span className="text-[var(--color-ash)] font-normal">
                نقشه را با دست جابه‌جا کنید تا سنجاق روی محل شما قرار بگیرد (یا «موقعیت فعلی من» را بزنید).
              </span>
            ) : looking ? (
              <span className="text-[var(--color-ash)] font-normal">در حال یافتن آدرس…</span>
            ) : text ? (
              text
            ) : (
              <span className="text-[var(--color-ash)] font-normal">
                آدرس متنی پیدا نشد؛ موقعیت ثبت می‌شود و می‌توانید آدرس را خودتان بنویسید.
              </span>
            )}
          </p>
        </div>
        {gpsError && (
          <p role="alert" className="text-xs text-[var(--color-ember-light)] leading-6">
            {gpsError}
          </p>
        )}
        <button type="button" onClick={confirm} disabled={!placed} className="btn-primary w-full disabled:opacity-40 disabled:pointer-events-none">
          تأیید این موقعیت
        </button>
      </div>
    </div>
  );
}
