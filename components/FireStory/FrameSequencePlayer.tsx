"use client";

import { forwardRef, useEffect, useImperativeHandle, useRef, useState } from "react";

const FRAME_COUNT = 100;
const framePath = (i: number) => `/video/frames/frame_${String(i + 1).padStart(3, "0")}.jpg`;

export interface FrameSequenceHandle {
  /** فریم را بر اساس پیشرفت ۰ تا ۱ رسم می‌کند */
  setProgress: (progress: number) => void;
}

/**
 * پخش‌کننده‌ی «دنباله‌ی فریم» روی canvas.
 *
 * چرا به‌جای تگ <video> با currentTime؟ چون seek کردن ویدیوی واقعی روی هر
 * تیک اسکرول، از موتور دیکود مرورگر عبور می‌کند و با اسکرول سریع تقاضای
 * seek بیشتر از توان دیکودر می‌شود؛ نتیجه‌اش همون لگ/توقفی هست که با هر
 * فیلمی تکرار می‌شد. اینجا همه‌ی فریم‌ها از قبل به‌صورت تصویر بارگذاری
 * می‌شوند و فقط یک drawImage روی canvas انجام می‌شود؛ این عملاً هزینه‌ی
 * محاسباتی‌اش صفر است و هیچ‌وقت لگ نمی‌زند، صرف‌نظر از سرعت اسکرول.
 *
 * چرا contain به‌جای cover؟ چون فیلم افقی (16:9) است و موبایل عمودی؛
 * پر کردن کامل صفحه با cover روی موبایل یعنی چند برابر زوم و بریدن شدید
 * تصویر. با contain، کل فریم همیشه دیده می‌شود و فضای خالی اطرافش با
 * همون رنگ تیره‌ی پس‌زمینه‌ی فیلم پر می‌شود که عملاً نامرئی‌ست.
 */
const FrameSequencePlayer = forwardRef<FrameSequenceHandle, { onFirstFrameReady?: () => void }>(
  function FrameSequencePlayer({ onFirstFrameReady }, ref) {
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

      // معادل object-fit:contain برای canvas (کل فریم همیشه کامل دیده می‌شود)
      const scale = Math.min(pxW / img.naturalWidth, pxH / img.naturalHeight);
      const drawW = img.naturalWidth * scale;
      const drawH = img.naturalHeight * scale;
      const dx = (pxW - drawW) / 2;
      const dy = (pxH - drawH) / 2;

      ctx.fillStyle = "#0d0403"; // همون --color-ink، برای پر کردن حاشیه‌ی احتمالی
      ctx.fillRect(0, 0, pxW, pxH);
      ctx.drawImage(img, dx, dy, drawW, drawH);
    };

    useImperativeHandle(ref, () => ({
      setProgress: (progress: number) => {
        const index = Math.min(FRAME_COUNT - 1, Math.max(0, Math.round(progress * (FRAME_COUNT - 1))));
        currentIndexRef.current = index;
        drawFrame(index);
      },
    }));

    useEffect(() => {
      let cancelled = false;
      const images: HTMLImageElement[] = [];

      for (let i = 0; i < FRAME_COUNT; i++) {
        const img = new Image();
        img.src = framePath(i);
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

      // ResizeObserver قابل‌اعتمادتر از رویداد resize پنجره است، چون تغییر
      // اندازه‌ی واقعی خودِ canvas را می‌بیند (مثلاً جمع/بازشدن نوار آدرس
      // موبایل، چرخش صفحه، یا تغییرات ناشی از pin شدن با GSAP)
      const ro = new ResizeObserver(redraw);
      if (canvasRef.current) ro.observe(canvasRef.current);
      window.addEventListener("orientationchange", redraw);

      return () => {
        cancelled = true;
        ro.disconnect();
        window.removeEventListener("orientationchange", redraw);
      };
      // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    return (
      <canvas
        ref={canvasRef}
        className="absolute inset-0 w-full h-full"
        style={{ opacity: firstFrameReady ? 1 : 0, transition: "opacity 0.3s" }}
      />
    );
  }
);

export default FrameSequencePlayer;
