"use client";

import { forwardRef, useEffect, useImperativeHandle, useRef, useState } from "react";

export interface FrameSequenceHandle {
  /** فریم را بر اساس پیشرفت ۰ تا ۱ رسم می‌کند */
  setProgress: (progress: number) => void;
}

interface Props {
  frameCount: number;
  framePrefix: string; // مثلاً "/video/frames/frame_" یا "/video/frames-mobile/frame_"
  onFirstFrameReady?: () => void;
  /**
   * "cover": فریم را با برش، به‌اندازه‌ی کل کانواس می‌کِشد (زمانی خوب که
   * نسبت‌ابعاد فریم با نسبت‌ابعاد کانواس نزدیک باشد، مثل موبایل).
   * "contain-blur": کل فریم را بدون هیچ برشی، وسط کانواس جا می‌دهد و
   * پشتش را با نسخه‌ی بزرگ‌شده و بلورِ همان فریم پر می‌کند؛ برای دسکتاپ
   * که فریمِ عمودیِ فیلم با کادر افقیِ هیرو هم‌نسبت نیست، تا چیزی از
   * تصویر اصلی حذف نشود.
   */
  fit?: "cover" | "contain-blur";
}

/**
 * پخش‌کننده‌ی «دنباله‌ی فریم» روی canvas (به‌جای <video currentTime=...>
 * که با اسکرول سریع، از موتور دیکود مرورگر عبور می‌کند و لگ می‌زند).
 */
const FrameSequencePlayer = forwardRef<FrameSequenceHandle, Props>(function FrameSequencePlayer(
  { frameCount, framePrefix, onFirstFrameReady, fit = "cover" },
  ref
) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const imagesRef = useRef<HTMLImageElement[]>([]);
  const currentIndexRef = useRef(0);
  const [firstFrameReady, setFirstFrameReady] = useState(false);

  const drawFrame = (index: number) => {
    const canvas = canvasRef.current;
    const img = imagesRef.current[index];
    if (!canvas || !img || !img.complete || img.naturalWidth === 0) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const dpr = window.devicePixelRatio || 1;
    const cssW = canvas.clientWidth;
    const cssH = canvas.clientHeight;
    const pxW = Math.round(cssW * dpr);
    const pxH = Math.round(cssH * dpr);
    if (pxW === 0 || pxH === 0) return;
    if (canvas.width !== pxW || canvas.height !== pxH) {
      canvas.width = pxW;
      canvas.height = pxH;
    }

    ctx.clearRect(0, 0, pxW, pxH);

    if (fit === "contain-blur") {
      // لایه‌ی پس‌زمینه: نسخه‌ی بزرگ‌شده و بلورِ فریم، تمام کانواس را پر می‌کند
      const coverScale = Math.max(pxW / img.naturalWidth, pxH / img.naturalHeight);
      const coverW = img.naturalWidth * coverScale;
      const coverH = img.naturalHeight * coverScale;
      ctx.save();
      ctx.filter = "blur(60px) brightness(0.5)";
      ctx.drawImage(img, (pxW - coverW) / 2, (pxH - coverH) / 2, coverW, coverH);
      ctx.restore();

      // لایه‌ی اصلی: کل فریم بدون برش، وسط‌چین
      const containScale = Math.min(pxW / img.naturalWidth, pxH / img.naturalHeight);
      const drawW = img.naturalWidth * containScale;
      const drawH = img.naturalHeight * containScale;
      ctx.drawImage(img, (pxW - drawW) / 2, (pxH - drawH) / 2, drawW, drawH);
      return;
    }

    const scale = Math.max(pxW / img.naturalWidth, pxH / img.naturalHeight);
    const drawW = img.naturalWidth * scale;
    const drawH = img.naturalHeight * scale;
    const dx = (pxW - drawW) / 2;
    const dy = (pxH - drawH) / 2;

    ctx.drawImage(img, dx, dy, drawW, drawH);
  };

  useImperativeHandle(ref, () => ({
    setProgress: (progress: number) => {
      const index = Math.min(frameCount - 1, Math.max(0, Math.round(progress * (frameCount - 1))));
      currentIndexRef.current = index;
      drawFrame(index);
    },
  }));

  useEffect(() => {
    let cancelled = false;
    const images: HTMLImageElement[] = [];

    for (let i = 0; i < frameCount; i++) {
      const img = new Image();
      img.src = `${framePrefix}${String(i + 1).padStart(3, "0")}.jpg`;
      img.onload = () => {
        if (i === 0 && !cancelled) {
          drawFrame(0);
          setFirstFrameReady(true);
          onFirstFrameReady?.();
        }
      };
      images.push(img);
    }
    imagesRef.current = images;

    const redraw = () => drawFrame(currentIndexRef.current);
    const ro = new ResizeObserver(redraw);
    if (canvasRef.current) ro.observe(canvasRef.current);
    window.addEventListener("orientationchange", redraw);

    return () => {
      cancelled = true;
      ro.disconnect();
      window.removeEventListener("orientationchange", redraw);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [frameCount, framePrefix]);

  return (
    <canvas
      ref={canvasRef}
      className="absolute inset-0 w-full h-full"
      style={{ opacity: firstFrameReady ? 1 : 0, transition: "opacity 0.3s" }}
    />
  );
});

export default FrameSequencePlayer;
