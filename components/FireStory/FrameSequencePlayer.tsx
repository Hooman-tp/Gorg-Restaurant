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
}

/**
 * پخش‌کننده‌ی «دنباله‌ی فریم» روی canvas (به‌جای <video currentTime=...>
 * که با اسکرول سریع، از موتور دیکود مرورگر عبور می‌کند و لگ می‌زند).
 *
 * چرا فقط cover و نه contain/بلور؟ چون حالا برای دسکتاپ و موبایل دو منبع
 * جدا با نسبت‌ابعاد متناسب همان دستگاه داریم (افقی برای دسکتاپ، عمودی
 * برای موبایل)، پس cover دیگر نیازی به برش تهاجمی ندارد و کل صفحه را
 * تمیز پر می‌کند، بدون حاشیه یا لایه‌ی بلورِ اضافه.
 */
const FrameSequencePlayer = forwardRef<FrameSequenceHandle, Props>(function FrameSequencePlayer(
  { frameCount, framePrefix, onFirstFrameReady },
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

    const scale = Math.max(pxW / img.naturalWidth, pxH / img.naturalHeight);
    const drawW = img.naturalWidth * scale;
    const drawH = img.naturalHeight * scale;
    const dx = (pxW - drawW) / 2;
    const dy = (pxH - drawH) / 2;

    ctx.clearRect(0, 0, pxW, pxH);
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
