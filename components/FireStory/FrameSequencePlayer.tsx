"use client";

import { forwardRef, useEffect, useImperativeHandle, useRef, useState } from "react";

export interface FrameSequenceHandle {
  /**
   * پیشرفت ۰ تا ۱ (اعشاری). فریم‌های مجاور با هم ترکیب (کراس‌فید) می‌شوند،
   * پس حتی اگر ۱۰۰ فریم بیشتر نداریم، حرکت پله‌پله/تیکه‌تیکه دیده نمی‌شود.
   */
  setProgress: (progress: number) => void;
}

interface Props {
  frameCount: number;
  framePrefix: string; // مثلاً "/video/frames/frame_" یا "/video/frames-mobile/frame_"
  onFirstFrameReady?: () => void;
  /**
   * "cover": فریم را با برش، به‌اندازه‌ی کل کانواس می‌کِشد (برای دسکتاپ که
   * صفحه افقی است و فریم ۱۶:۹ تقریباً کل صفحه را پر می‌کند).
   *
   * "contain-blur": کل فریم را بدون هیچ برشی و هم‌عرض صفحه نشان می‌دهد و
   * فضای خالی بالا و پایین را با نسخه‌ی تارِ همان فریم پر می‌کند؛ برای
   * موبایل (صفحه‌ی عمودی) که با "cover" فقط یک نوار باریک وسط فیلم دیده
   * می‌شد و تصویر خیلی زوم بود.
   */
  fit?: "cover" | "contain-blur";
  /**
   * فقط برای "contain-blur". ۱ یعنی کل فریم دقیقاً هم‌عرض صفحه. اگر فیلم را
   * روی موبایل کمی بزرگ‌تر می‌خواهید، عددی مثل ۱٫۲ بدهید (لبه‌های چپ و
   * راست کمی بریده می‌شود).
   */
  zoom?: number;
}

type Frame = ImageBitmap | HTMLImageElement;

const frameWidth = (f: Frame) => (f instanceof HTMLImageElement ? f.naturalWidth : f.width);
const frameHeight = (f: Frame) => (f instanceof HTMLImageElement ? f.naturalHeight : f.height);

// سقف تعداد پیکسل‌های بوم. قبلاً بوم با devicePixelRatio کامل (روی آیفون ×۳،
// یعنی حدود ۳ میلیون پیکسل) ساخته می‌شد و در هر فریم تمام آن دوباره پر می‌شد؛
// در حالی‌که خودِ فریم‌های فیلم فقط ۷۲۰×۱۲۸۰ هستند، پس این پیکسل‌های اضافه
// هیچ کیفیتی اضافه نمی‌کردند و فقط اسکرول را سنگین/تکه‌تکه می‌کردند.
// مرورگر بوم را خودش (روی GPU و تقریباً رایگان) به اندازه‌ی صفحه بزرگ می‌کند.
const MAX_CANVAS_PIXELS = 1_000_000;

// چند «پله‌ی ترکیب» بین هر دو فریم. ۳۲ یعنی بین فریم n و n+1، ۳۲ حالت
// میانی داریم؛ برای چشم پیوسته دیده می‌شود ولی هر بار که پله عوض نشده
// رسم مجدد انجام نمی‌شود.
const BLEND_STEPS = 32;

// بوم پس‌زمینه فقط ۲ ردیف پیکسل است: ردیف اول = رنگ‌های لبه‌ی بالای فریم،
// ردیف دوم = رنگ‌های لبه‌ی پایین. مرورگر موقع کشیدنش روی کل صفحه، آن را
// نرم می‌کند؛ نتیجه این است که رنگ‌های لبه‌ی فیلم بی‌درز به بالا و پایین
// صفحه ادامه پیدا می‌کند (بدون هیچ خواندنِ پیکسل یا فیلترِ سنگین).
const BACKDROP_W = 12;
const BACKDROP_H = 2;

// محو شدن لبه‌ی بالا و پایین فریمِ وسط، تا خطِ سخت بین فیلم و پس‌زمینه دیده نشود
const FRAME_EDGE_MASK = "linear-gradient(to bottom, transparent 0%, #000 16%, #000 84%, transparent 100%)";

/**
 * پخش‌کننده‌ی «دنباله‌ی فریم» روی canvas (به‌جای <video currentTime=...>
 * که با اسکرول سریع، از موتور دیکود مرورگر عبور می‌کند و لگ می‌زند).
 */
const FrameSequencePlayer = forwardRef<FrameSequenceHandle, Props>(function FrameSequencePlayer(
  { frameCount, framePrefix, onFirstFrameReady, fit = "cover", zoom = 1 },
  ref
) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const backdropRef = useRef<HTMLCanvasElement>(null);
  const stepRef = useRef<HTMLCanvasElement | null>(null);
  const ctxRef = useRef<CanvasRenderingContext2D | null>(null);
  const framesRef = useRef<(Frame | undefined)[]>([]);
  const progressRef = useRef(0);
  const lastKeyRef = useRef(-1);
  const sizedRef = useRef(false);
  const aspectRef = useRef(16 / 9);
  const [firstFrameReady, setFirstFrameReady] = useState(false);
  const [aspect, setAspect] = useState(16 / 9);

  // فریم موردنظر؛ اگر هنوز دانلود/دیکود نشده، نزدیک‌ترین فریمِ آماده.
  // (روی شبکه‌ی کند به‌جای فریز شدن، تصویر هم‌جهت با اسکرول دیده می‌شود.)
  const resolve = (index: number): Frame | undefined => {
    const frames = framesRef.current;
    const direct = frames[index];
    if (direct) return direct;
    for (let offset = 1; offset < frames.length; offset++) {
      const before = frames[index - offset];
      if (before) return before;
      const after = frames[index + offset];
      if (after) return after;
    }
    return undefined;
  };

  // نسبت بوم در هر دو حالت (cover و contain) یا با صفحه یا با خودِ فریم
  // یکی است؛ فرمول «cover» در حالت contain هم دقیقاً کل فریم را بی‌برش می‌کشد.
  const drawFrame = (ctx: CanvasRenderingContext2D, src: Frame, w: number, h: number) => {
    const sw = frameWidth(src);
    const sh = frameHeight(src);
    const scale = Math.max(w / sw, h / sh);
    const dw = sw * scale;
    const dh = sh * scale;
    ctx.drawImage(src, (w - dw) / 2, (h - dh) / 2, dw, dh);
  };

  const drawBackdrop = (src: Frame) => {
    // پس‌زمینه: لبه‌ی بالا و پایین فریم را به دو ردیف کوچک می‌کنیم (دو مرحله‌ای
    // تا نویز/دندانه ایجاد نشود). عمداً از ctx.filter استفاده نشده چون در
    // Safari/iOS پشتیبانی نمی‌شود.
    const backdrop = backdropRef.current;
    if (!backdrop) return;
    if (!stepRef.current) {
      const step = document.createElement("canvas");
      step.width = 192;
      step.height = 108;
      stepRef.current = step;
    }
    const stepCtx = stepRef.current.getContext("2d");
    const bctx = backdrop.getContext("2d");
    if (!stepCtx || !bctx) return;

    stepCtx.imageSmoothingQuality = "high";
    stepCtx.drawImage(src, 0, 0, 192, 108);
    bctx.imageSmoothingQuality = "high";
    bctx.drawImage(stepRef.current, 0, 0, 192, 10, 0, 0, BACKDROP_W, 1); // لبه‌ی بالا
    bctx.drawImage(stepRef.current, 0, 98, 192, 10, 0, 1, BACKDROP_W, 1); // لبه‌ی پایین
  };

  const paint = (force = false) => {
    const canvas = canvasRef.current;
    if (!canvas || !sizedRef.current) return;

    const clamped = Math.min(1, Math.max(0, progressRef.current));
    const key = Math.round(clamped * (frameCount - 1) * BLEND_STEPS);
    if (!force && key === lastKeyRef.current) return;

    const pos = key / BLEND_STEPS;
    const i0 = Math.min(frameCount - 1, Math.floor(pos));
    const mix = pos - i0;

    const from = resolve(i0);
    if (!from) return;

    let ctx = ctxRef.current;
    if (!ctx) {
      // فریم کامل و مات است، پس کانال آلفا لازم نیست (ترکیب‌کردنِ بوم با
      // صفحه ارزان‌تر می‌شود)
      ctx = canvas.getContext("2d", { alpha: false });
      ctxRef.current = ctx;
    }
    if (!ctx) return;
    lastKeyRef.current = key;

    const w = canvas.width;
    const h = canvas.height;
    drawFrame(ctx, from, w, h);

    // فریم بعدی را با شفافیتِ متناسب روی فریم فعلی می‌کشیم
    if (mix > 0.001 && i0 + 1 < frameCount) {
      const to = resolve(i0 + 1);
      if (to && to !== from) {
        ctx.globalAlpha = mix;
        drawFrame(ctx, to, w, h);
        ctx.globalAlpha = 1;
      }
    }

    if (fit === "contain-blur") drawBackdrop(from);
  };

  const applySize = (cssW: number, cssH: number) => {
    const canvas = canvasRef.current;
    if (!canvas || cssW <= 0 || cssH <= 0) return;

    const dpr = window.devicePixelRatio || 1;
    let w: number;
    let h: number;
    if (fit === "contain-blur") {
      w = Math.max(1, Math.round(cssW * Math.min(dpr, 2)));
      h = Math.max(1, Math.round(w / aspectRef.current));
    } else {
      const k = Math.min(dpr, 2, Math.sqrt(MAX_CANVAS_PIXELS / (cssW * cssH)));
      w = Math.max(1, Math.round(cssW * k));
      h = Math.max(1, Math.round(cssH * k));
    }
    if (canvas.width !== w || canvas.height !== h) {
      canvas.width = w;
      canvas.height = h;
    }
    sizedRef.current = true;
    paint(true);
  };

  useImperativeHandle(ref, () => ({
    setProgress: (progress: number) => {
      progressRef.current = progress;
      paint();
    },
  }));

  useEffect(() => {
    let cancelled = false;
    const frames: (Frame | undefined)[] = new Array(frameCount).fill(undefined);
    framesRef.current = frames;
    lastKeyRef.current = -1;
    let anyFrameSeen = false;

    const accept = (i: number, frame: Frame) => {
      if (cancelled) {
        if (typeof ImageBitmap !== "undefined" && frame instanceof ImageBitmap) frame.close();
        return;
      }
      frames[i] = frame;
      if (!anyFrameSeen) {
        anyFrameSeen = true;
        aspectRef.current = frameWidth(frame) / frameHeight(frame);
        setAspect(aspectRef.current);
        setFirstFrameReady(true);
        onFirstFrameReady?.();
      }
      // هر فریمی که برسد ممکن است دقیقاً همانی باشد که الان لازم داریم
      // (یا از فریمِ جایگزینِ فعلی به هدف نزدیک‌تر باشد)، پس دوباره رسم کن
      paint(true);
    };

    for (let i = 0; i < frameCount; i++) {
      const img = new Image();
      img.decoding = "async";
      img.onload = async () => {
        if (cancelled) return;
        // دیکودِ JPEG را همین‌جا و یک‌بار انجام می‌دهیم. اگر خودِ تگ Image
        // را نگه داریم، Safari موبایل برای صرفه‌جویی در حافظه فریم‌های
        // دیکودشده را دور می‌ریزد و موقع اسکرول دوباره وسطِ رسم دیکود
        // می‌کند — همان «گیر کردن‌های» ناگهانی. ImageBitmap دیکودشده می‌ماند.
        let frame: Frame = img;
        if (typeof createImageBitmap === "function") {
          try {
            frame = await createImageBitmap(img);
          } catch {
            frame = img;
          }
        }
        accept(i, frame);
      };
      img.src = `${framePrefix}${String(i + 1).padStart(3, "0")}.jpg`;
    }

    const canvas = canvasRef.current;
    let ro: ResizeObserver | null = null;
    if (canvas) {
      ro = new ResizeObserver((entries) => {
        const rect = entries[0]?.contentRect;
        if (rect) applySize(rect.width, rect.height);
      });
      ro.observe(canvas);
    }

    return () => {
      cancelled = true;
      ro?.disconnect();
      sizedRef.current = false;
      frames.forEach((f) => {
        if (f && typeof ImageBitmap !== "undefined" && f instanceof ImageBitmap) f.close();
      });
      framesRef.current = [];
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [frameCount, framePrefix, fit]);

  const fade = { opacity: firstFrameReady ? 1 : 0, transition: "opacity 0.3s" };

  if (fit === "contain-blur") {
    return (
      <>
        <canvas
          ref={backdropRef}
          width={BACKDROP_W}
          height={BACKDROP_H}
          aria-hidden="true"
          className="absolute inset-0 w-full h-full"
          style={fade}
        />
        {/* هرچه از لبه‌ی فیلم دورتر شویم، پس‌زمینه تیره‌تر و در رنگ سایت حل می‌شود */}
        <div
          aria-hidden="true"
          className="absolute inset-0 pointer-events-none"
          style={{
            background:
              "linear-gradient(to bottom, var(--color-ink) 0%, rgba(13,4,3,0.7) 20%, rgba(13,4,3,0.25) 38%, rgba(13,4,3,0.25) 62%, rgba(13,4,3,0.7) 80%, var(--color-ink) 100%)",
          }}
        />
        <canvas
          ref={canvasRef}
          className="absolute top-1/2 left-1/2"
          style={{
            ...fade,
            width: `${zoom * 100}%`,
            aspectRatio: String(aspect),
            transform: "translate(-50%, -50%)",
            maskImage: FRAME_EDGE_MASK,
            WebkitMaskImage: FRAME_EDGE_MASK,
          }}
        />
      </>
    );
  }

  return <canvas ref={canvasRef} className="absolute inset-0 w-full h-full" style={fade} />;
});

export default FrameSequencePlayer;
