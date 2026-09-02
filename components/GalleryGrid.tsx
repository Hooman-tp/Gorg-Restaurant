"use client";

import { useEffect, useState } from "react";
import Image from "next/image";

interface GalleryPhoto {
  src: string;
  alt: string;
}

export default function GalleryGrid({ photos }: { photos: GalleryPhoto[] }) {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  const close = () => setOpenIndex(null);
  const prev = () => setOpenIndex((i) => (i === null ? null : (i - 1 + photos.length) % photos.length));
  const next = () => setOpenIndex((i) => (i === null ? null : (i + 1) % photos.length));

  // ناوبری با کیبورد وقتی لایت‌باکس بازه
  useEffect(() => {
    if (openIndex === null) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setOpenIndex(null);
      if (e.key === "ArrowRight") {
        setOpenIndex((i) => (i === null ? null : (i - 1 + photos.length) % photos.length));
      }
      if (e.key === "ArrowLeft") {
        setOpenIndex((i) => (i === null ? null : (i + 1) % photos.length));
      }
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [openIndex, photos.length]);

  return (
    <>
      <div className="columns-2 sm:columns-3 gap-3 [column-fill:_balance]">
        {photos.map((photo, i) => (
          <button
            key={i}
            onClick={() => setOpenIndex(i)}
            className="relative block w-full mb-3 rounded-xl overflow-hidden gorg-card break-inside-avoid"
            aria-label={`مشاهده‌ی بزرگ‌تر ${photo.alt}`}
          >
            <Image
              src={photo.src}
              alt={photo.alt}
              width={500}
              height={i % 3 === 0 ? 650 : 400}
              sizes="(max-width: 640px) 45vw, 30vw"
              className="w-full h-auto object-cover"
            />
          </button>
        ))}
      </div>

      {openIndex !== null && (
        <div
          role="dialog"
          aria-modal="true"
          aria-label="نمای بزرگ تصویر"
          className="fixed inset-0 z-[200] bg-black/92 flex items-center justify-center px-4"
          onClick={close}
        >
          {/* تصویر پایین‌تر از دکمه‌های ناوبری در DOM قرار می‌گیرد تا هیچ‌وقت
              کلیک روی دکمه‌ها را نپوشاند (باگ قبلی دقیقاً همین بود) */}
          <div className="relative max-w-4xl w-full aspect-[4/3]" onClick={(e) => e.stopPropagation()}>
            <Image
              src={photos[openIndex].src}
              alt={photos[openIndex].alt}
              fill
              sizes="90vw"
              className="object-contain"
            />
          </div>

          <button
            onClick={(e) => {
              e.stopPropagation();
              close();
            }}
            aria-label="بستن"
            className="absolute top-5 left-5 z-10 w-10 h-10 rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center text-lg"
          >
            ✕
          </button>
          <button
            onClick={(e) => {
              e.stopPropagation();
              prev();
            }}
            aria-label="تصویر قبلی"
            className="absolute right-4 sm:right-8 z-10 w-11 h-11 rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center text-xl"
          >
            ›
          </button>
          <button
            onClick={(e) => {
              e.stopPropagation();
              next();
            }}
            aria-label="تصویر بعدی"
            className="absolute left-4 sm:left-8 z-10 w-11 h-11 rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center text-xl"
          >
            ‹
          </button>
        </div>
      )}
    </>
  );
}
