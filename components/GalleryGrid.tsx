"use client";

import { useCallback, useEffect, useLayoutEffect, useRef, useState } from "react";
import { flushSync } from "react-dom";
import Image from "next/image";
import FxTilt from "./FxTilt";

interface GalleryPhoto {
  src: string;
  alt: string;
  width?: number;
  height?: number;
}

/**
 * جهتِ «عکس بعدی». سایت راست‌به‌چپ است و دکمه‌ی «بعدی» سمتِ چپ بود؛ پس عکسِ بعدی
 * سمتِ چپ قرار می‌گیرد و با کشیدنِ انگشت به «راست» می‌آید.
 * اگر دوست داشتید برعکس باشد (کشیدن به چپ = عکس بعدی) فقط این عدد را 1 کنید.
 */
const NEXT_SIDE: -1 | 1 = -1;

const fa = (n: number) => n.toLocaleString("fa-IR");

type LenisLike = { stop: () => void; start: () => void };

function Lightbox({ photos, start, onClose }: { photos: GalleryPhoto[]; start: number; onClose: () => void }) {
  const n = photos.length;
  const [index, setIndex] = useState(start);
  const [hint, setHint] = useState(false);
  const overlayRef = useRef<HTMLDivElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);
  const busy = useRef(false);
  const suppressClick = useRef(false);
  const drag = useRef<{
    id: number;
    x0: number;
    y0: number;
    axis: "x" | "y" | null;
    dx: number;
    dy: number;
    samples: { x: number; y: number; t: number }[];
  } | null>(null);

  const wrap = useCallback((i: number) => ((i % n) + n) % n, [n]);
  const canNext = n > 1;
  const canPrev = n > 2;

  // بعد از هر تغییرِ عکس، آفستِ کشیدن صفر می‌شود (همزمان با جابه‌جایی نقش‌ها؛ بدون پرش)
  useLayoutEffect(() => {
    trackRef.current?.style.setProperty("--dx", "0px");
  }, [index]);

  // قفل اسکرولِ صفحه پشتِ لایت‌باکس (Lenis + بدنه)
  useEffect(() => {
    const lenis = (window as unknown as { __lenis?: LenisLike }).__lenis;
    lenis?.stop();
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = prev;
      lenis?.start();
    };
  }, []);

  // راهنمای کشیدن، فقط روی لمسی و فقط یک‌بار در هر نشست
  useEffect(() => {
    if (n < 2 || !window.matchMedia("(pointer: coarse)").matches) return;
    try {
      if (sessionStorage.getItem("gorg-swipe-hint")) return;
      sessionStorage.setItem("gorg-swipe-hint", "1");
    } catch {
      /* ignore */
    }
    const show = window.setTimeout(() => setHint(true), 500);
    const hide = window.setTimeout(() => setHint(false), 4200);
    return () => {
      window.clearTimeout(show);
      window.clearTimeout(hide);
    };
  }, [n]);

  // رفتن به عکس بعدی/قبلی با انیمیشن (دکمه‌ها، کیبورد و رها کردنِ انگشت)
  const commit = useCallback(
    (step: 1 | -1) => {
      const track = trackRef.current;
      if (!track || busy.current) return;
      busy.current = true;
      setHint(false);
      const W = track.clientWidth;
      // برای دیدنِ اسلایدِ سمتِ NEXT_SIDE باید همه به سمتِ مخالفش بروند
      const target = (step === 1 ? -NEXT_SIDE : NEXT_SIDE) * W;
      track.classList.add("lb-anim");
      track.style.setProperty("--dx", `${target}px`);
      window.setTimeout(() => {
        track.classList.remove("lb-anim");
        flushSync(() => setIndex((i) => wrap(i + step)));
        busy.current = false;
      }, 330);
    },
    [wrap]
  );

  const snapBack = useCallback(() => {
    const track = trackRef.current;
    const overlay = overlayRef.current;
    if (!track) return;
    track.classList.add("lb-anim");
    track.style.setProperty("--dx", "0px");
    track.style.setProperty("--dy", "0px");
    track.style.setProperty("--sc", "1");
    overlay?.style.setProperty("--bgo", "0.95");
    window.setTimeout(() => track.classList.remove("lb-anim"), 340);
  }, []);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
      // سایت راست‌به‌چپ است: فلشِ راست = قبلی، فلشِ چپ = بعدی
      if (e.key === "ArrowRight" && canPrev) commit(-1);
      if (e.key === "ArrowLeft" && canNext) commit(1);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [canNext, canPrev, commit, onClose]);

  const onPointerDown = (e: React.PointerEvent) => {
    if (busy.current) return;
    if (e.pointerType === "mouse" && e.button !== 0) return;
    if ((e.target as HTMLElement).closest("button")) return;
    drag.current = {
      id: e.pointerId,
      x0: e.clientX,
      y0: e.clientY,
      axis: null,
      dx: 0,
      dy: 0,
      samples: [{ x: e.clientX, y: e.clientY, t: performance.now() }],
    };
  };

  const onPointerMove = (e: React.PointerEvent) => {
    const d = drag.current;
    const track = trackRef.current;
    const overlay = overlayRef.current;
    if (!d || d.id !== e.pointerId || !track || !overlay) return;
    const dx = e.clientX - d.x0;
    const dy = e.clientY - d.y0;
    if (!d.axis) {
      if (Math.hypot(dx, dy) < 8) return;
      d.axis = Math.abs(dx) > Math.abs(dy) ? "x" : "y";
      try {
        overlay.setPointerCapture(e.pointerId);
      } catch {
        /* ignore */
      }
      track.classList.remove("lb-anim");
    }
    d.dx = dx;
    d.dy = dy;
    d.samples.push({ x: e.clientX, y: e.clientY, t: performance.now() });
    if (d.samples.length > 5) d.samples.shift();
    suppressClick.current = true;

    if (d.axis === "x") {
      // اگر در آن جهت عکسی نیست، مقاومتِ کشسان
      const towardNext = Math.sign(dx) === -NEXT_SIDE;
      const allowed = towardNext ? canNext : canPrev;
      track.style.setProperty("--dx", `${allowed ? dx : dx * 0.28}px`);
    } else {
      const a = Math.abs(dy);
      track.style.setProperty("--dy", `${dy}px`);
      track.style.setProperty("--sc", String(1 - Math.min(a / 1200, 0.14)));
      overlay.style.setProperty("--bgo", String(0.95 * (1 - Math.min(a / 420, 0.85))));
    }
  };

  const finishDrag = (e: React.PointerEvent, cancelled: boolean) => {
    const d = drag.current;
    if (!d || d.id !== e.pointerId) return;
    drag.current = null;
    const overlay = overlayRef.current;
    const track = trackRef.current;
    try {
      overlay?.releasePointerCapture(e.pointerId);
    } catch {
      /* ignore */
    }
    window.setTimeout(() => {
      suppressClick.current = false;
    }, 0);
    if (!d.axis || !track || !overlay) return;
    if (cancelled) {
      snapBack();
      return;
    }

    // سرعتِ آخرین لحظه‌های کشیدن (پیکسل بر میلی‌ثانیه)
    const last = d.samples[d.samples.length - 1];
    const first = d.samples.find((s) => last.t - s.t <= 120) ?? d.samples[0];
    const dt = Math.max(1, last.t - first.t);
    const vx = (last.x - first.x) / dt;
    const vy = (last.y - first.y) / dt;

    if (d.axis === "x") {
      const W = track.clientWidth;
      const step: 1 | -1 = Math.sign(d.dx) === -NEXT_SIDE ? 1 : -1;
      const allowed = step === 1 ? canNext : canPrev;
      const passed = Math.abs(d.dx) > W * 0.18 || Math.abs(vx) > 0.45;
      if (allowed && passed) commit(step);
      else snapBack();
    } else if (Math.abs(d.dy) > 110 || Math.abs(vy) > 0.6) {
      // بستن با کشیدن به بالا یا پایین
      track.classList.add("lb-anim");
      track.style.setProperty("--dy", `${Math.sign(d.dy || 1) * window.innerHeight}px`);
      overlay.style.setProperty("--bgo", "0");
      window.setTimeout(onClose, 260);
    } else {
      snapBack();
    }
  };

  const onClickOverlay = (e: React.MouseEvent) => {
    if (suppressClick.current) return;
    if ((e.target as HTMLElement).closest("[data-lb-keep]")) return;
    onClose();
  };

  const slides: { off: -1 | 0 | 1; idx: number }[] = [{ off: 0, idx: index }];
  if (n >= 2) slides.push({ off: NEXT_SIDE, idx: wrap(index + 1) });
  if (n >= 3) slides.push({ off: (-NEXT_SIDE) as -1 | 1, idx: wrap(index - 1) });

  return (
    <div
      ref={overlayRef}
      role="dialog"
      aria-modal="true"
      aria-label="نمای بزرگ تصویر"
      className="lb-overlay"
      data-lenis-prevent
      onClick={onClickOverlay}
      onPointerDown={onPointerDown}
      onPointerMove={onPointerMove}
      onPointerUp={(e) => finishDrag(e, false)}
      onPointerCancel={(e) => finishDrag(e, true)}
    >
      <div ref={trackRef} className="lb-track">
        {slides.map(({ off, idx }) => (
          <div
            key={idx}
            className="lb-slide"
            aria-hidden={off !== 0}
            style={{ transform: `translate3d(calc(${off * 100}% + var(--dx, 0px)), 0, 0)` }}
          >
            <div data-lb-keep className="relative mx-auto w-full h-full max-w-5xl">
              <Image
                src={photos[idx].src}
                alt={photos[idx].alt}
                fill
                sizes="100vw"
                loading="eager"
                priority={off === 0}
                draggable={false}
                className="object-contain"
              />
            </div>
          </div>
        ))}
      </div>

      <div className="absolute top-5 inset-x-0 z-10 flex justify-center pointer-events-none">
        <span className="text-xs font-bold tracking-wider text-white/80 bg-white/10 rounded-full px-3 py-1">
          {fa(index + 1)} / {fa(n)}
        </span>
      </div>

      <button
        onClick={(e) => {
          e.stopPropagation();
          onClose();
        }}
        aria-label="بستن"
        className="absolute top-5 left-5 z-10 w-10 h-10 rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center text-lg"
      >
        ✕
      </button>

      {/* فلش‌ها فقط برای دسکتاپ (روی موبایل با کشیدنِ انگشت جایگزین شده‌اند) */}
      {canPrev && (
        <button
          onClick={(e) => {
            e.stopPropagation();
            commit(-1);
          }}
          aria-label="تصویر قبلی"
          className="lb-arrow absolute right-4 sm:right-8 top-1/2 -translate-y-1/2 z-10 w-11 h-11 rounded-full bg-white/10 hover:bg-[var(--color-ember)] transition-colors items-center justify-center text-xl"
        >
          ›
        </button>
      )}
      {canNext && (
        <button
          onClick={(e) => {
            e.stopPropagation();
            commit(1);
          }}
          aria-label="تصویر بعدی"
          className="lb-arrow absolute left-4 sm:left-8 top-1/2 -translate-y-1/2 z-10 w-11 h-11 rounded-full bg-white/10 hover:bg-[var(--color-ember)] transition-colors items-center justify-center text-xl"
        >
          ‹
        </button>
      )}

      {hint && (
        <div className="lb-hint absolute bottom-8 inset-x-0 z-10 flex justify-center pointer-events-none">
          <span className="text-xs text-white/85 bg-black/55 backdrop-blur rounded-full px-4 py-2">
            <span>‹</span>&nbsp; برای عوض کردن عکس، انگشت را بکشید &nbsp;<span>›</span>
          </span>
        </div>
      )}
    </div>
  );
}

export default function GalleryGrid({ photos }: { photos: GalleryPhoto[] }) {
  const [openIndex, setOpenIndex] = useState<number | null>(null);
  const close = useCallback(() => setOpenIndex(null), []);

  return (
    <>
      <div className="columns-2 sm:columns-3 gap-3 [column-fill:_balance]">
        {photos.map((photo, i) => (
          <div key={i} className="mb-3 break-inside-avoid">
            <FxTilt
              as="button"
              max={5}
              onClick={() => setOpenIndex(i)}
              className="gallery-tile gorg-card relative block w-full rounded-xl overflow-hidden"
              aria-label={`مشاهده‌ی بزرگ‌تر ${photo.alt}`}
            >
              <Image
                src={photo.src}
                alt={photo.alt}
                width={photo.width ?? 1179}
                height={photo.height ?? 900}
                sizes="(max-width: 640px) 45vw, 30vw"
                className="w-full h-auto object-cover"
              />
              <span className="gt-shade" aria-hidden="true" />
              <span className="gt-shine" aria-hidden="true" />
              <span className="gt-frame" aria-hidden="true" />
              <span className="gt-icon" aria-hidden="true">
                <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M15 3h6v6M9 21H3v-6M21 3l-7 7M3 21l7-7" />
                </svg>
              </span>
            </FxTilt>
          </div>
        ))}
      </div>

      {openIndex !== null && <Lightbox photos={photos} start={openIndex} onClose={close} />}
    </>
  );
}
