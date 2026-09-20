"use client";

import { forwardRef, useEffect, useImperativeHandle, useRef, useState } from "react";

// ترکیبِ دو فریمِ همسایه (frame blending) حرکتِ کند را نرم می‌کند، ولی وقتی
// بین دو فریم تغییرِ زیادی باشد (کاهوی در حال افتادن، دود) «تصویر دوتایی /
// روح» می‌سازد. پیش‌فرض خاموش است. فقط اگر فیلمتان فریم‌های بسیار نزدیک به
// هم دارد (مثلاً ۳۰۰+ فریم) روشنش کنید.
const BLEND_FRAMES = false;

export interface FrameSequenceHandle {
  /**
   * فریم را بر اساس پیشرفت ۰ تا ۱ رسم می‌کند. پیشرفت عدد اعشاری است:
   * وقتی بین دو فریم قرار بگیرد (مثلاً ۴۲٫۳)، هر دو فریمِ همسایه با
   * درصدِ متناسب روی هم ترکیب می‌شوند (frame blending) تا حرکتِ کند،
   * «پله‌پله» دیده نشود.
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
  const imagesRef = useRef<HTMLImageElement[]>([]);
  // موقعیتِ فعلی به‌صورت اعشاری (۰ تا frameCount-1)
  const positionRef = useRef(0);
  // کلیدِ آخرین چیزی که کشیده شد؛ اگر تغییری نکرده باشد دوباره نمی‌کشیم
  const lastKeyRef = useRef("");
  const [firstFrameReady, setFirstFrameReady] = useState(false);
  const [aspect, setAspect] = useState(16 / 9);

  const drawCover = (canvas: HTMLCanvasElement, img: HTMLImageElement, next?: HTMLImageElement, mix = 0) => {
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    // سقفِ ۲ برای dpr: فریم‌های منبع فقط ۷۲۰/۱۲۸۰ پیکسل‌اند؛ روی گوشی‌های
    // dpr=۳ کشیدنِ کانواسِ ۳ برابری فقط بارِ اضافه روی پردازنده می‌گذاشت
    // (و همان چیزی است که اسکرول سریع را روی موبایل «ناصاف» می‌کند).
    const dpr = Math.min(window.devicePixelRatio || 1, 2);
    const pxW = Math.round(canvas.clientWidth * dpr);
    const pxH = Math.round(canvas.clientHeight * dpr);
    if (pxW === 0 || pxH === 0) return;
    if (canvas.width !== pxW || canvas.height !== pxH) {
      canvas.width = pxW;
      canvas.height = pxH;
    }

    ctx.globalAlpha = 1;
    ctx.clearRect(0, 0, pxW, pxH);

    const paint = (im: HTMLImageElement) => {
      const scale = Math.max(pxW / im.naturalWidth, pxH / im.naturalHeight);
      const drawW = im.naturalWidth * scale;
      const drawH = im.naturalHeight * scale;
      ctx.drawImage(im, (pxW - drawW) / 2, (pxH - drawH) / 2, drawW, drawH);
    };

    paint(img);
    if (next && mix > 0) {
      ctx.globalAlpha = mix;
      paint(next);
      ctx.globalAlpha = 1;
    }
  };

  const drawContain = (canvas: HTMLCanvasElement, img: HTMLImageElement, next?: HTMLImageElement, mix = 0) => {
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    // بوم فریم هم‌نسبت با خود فیلم است (CSS آن را هم‌عرض صفحه می‌کند)،
    // پس کافی است کل تصویر را بدون هیچ برشی در آن بکشیم.
    const dpr = Math.min(window.devicePixelRatio || 1, 2);
    const pxW = Math.round(canvas.clientWidth * dpr);
    if (pxW === 0) return;
    const pxH = Math.round((pxW * img.naturalHeight) / img.naturalWidth);
    if (canvas.width !== pxW || canvas.height !== pxH) {
      canvas.width = pxW;
      canvas.height = pxH;
    }
    ctx.globalAlpha = 1;
    ctx.drawImage(img, 0, 0, pxW, pxH);
    if (next && mix > 0) {
      ctx.globalAlpha = mix;
      ctx.drawImage(next, 0, 0, pxW, pxH);
      ctx.globalAlpha = 1;
    }

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
    stepCtx.drawImage(img, 0, 0, 192, 108);
    bctx.imageSmoothingQuality = "high";
    bctx.drawImage(stepRef.current, 0, 0, 192, 10, 0, 0, BACKDROP_W, 1); // لبه‌ی بالا
    bctx.drawImage(stepRef.current, 0, 98, 192, 10, 0, 1, BACKDROP_W, 1); // لبه‌ی پایین
  };

  const isReady = (img?: HTMLImageElement) => !!img && img.complete && img.naturalWidth > 0;

  // روی شبکه‌ی کند (مثلاً LTE)، ممکن است دقیقاً فریمی که الان لازم داریم
  // هنوز دانلود نشده باشد. قبلاً در این حالت drawFrame هیچ‌کاری نمی‌کرد
  // و بومِ صفحه دقیقاً روی همان فریمِ قبلی «فریز» می‌ماند — همان حسِ
  // گیر کردنِ مصنوعی که با اسکرولِ سریع دیده می‌شود. حالا به‌جایش
  // نزدیک‌ترین فریمِ آماده را نشان می‌دهیم تا چیزی هرچند نه ۱۰۰٪ دقیق،
  // ولی هم‌جهت با اسکرول دیده شود؛ و به‌محض رسیدنِ فریمِ واقعی (در
  // onload پایین‌تر) خودش جای آن را می‌گیرد.
  const resolveImage = (index: number): HTMLImageElement | undefined => {
    const images = imagesRef.current;
    const direct = images[index];
    if (isReady(direct)) return direct;
    for (let offset = 1; offset < images.length; offset++) {
      const before = images[index - offset];
      if (isReady(before)) return before;
      const after = images[index + offset];
      if (isReady(after)) return after;
    }
    return undefined;
  };

  // position اعشاری است: بخشِ صحیحش فریمِ پایه و بخشِ اعشاریش درصدِ
  // ترکیب با فریمِ بعدی. حالتِ «تقریباً دقیقاً روی یک فریم» را گرد می‌کنیم
  // تا برای هر تغییرِ ناچیز دوباره چیزی کشیده نشود.
  const drawFrame = (position: number, force = false) => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    let base = Math.floor(position);
    let mix = BLEND_FRAMES ? position - base : 0;
    if (!BLEND_FRAMES) base = Math.round(position);
    else if (mix < 0.03) mix = 0;
    else if (mix > 0.97) {
      base += 1;
      mix = 0;
    }
    base = Math.min(frameCount - 1, Math.max(0, base));

    const key = `${base}:${Math.round(mix * 32)}`;
    if (!force && key === lastKeyRef.current) return;

    const img = resolveImage(base);
    if (!img) return;

    const nextDirect = mix > 0 ? imagesRef.current[base + 1] : undefined;
    const next = isReady(nextDirect) ? nextDirect : undefined;

    lastKeyRef.current = key;
    if (fit === "contain-blur") drawContain(canvas, img, next, next ? mix : 0);
    else drawCover(canvas, img, next, next ? mix : 0);
  };

  useImperativeHandle(ref, () => ({
    setProgress: (progress: number) => {
      const clamped = Math.min(1, Math.max(0, progress));
      const position = clamped * (frameCount - 1);
      positionRef.current = position;
      drawFrame(position);
    },
  }));

  useEffect(() => {
    let cancelled = false;
    const images: HTMLImageElement[] = Array.from({ length: frameCount }, () => new Image());
    imagesRef.current = images;

    // با ۳۰۰ فریم، درخواستِ همه‌ی فریم‌ها با هم (به‌ترتیب ۱ تا ۳۰۰) شبکه را
    // خفه می‌کرد و روی موبایل/LTE اسکرولِ اول فقط فریم‌های ابتدایی را می‌دید.
    // حالا «درشت به ریز» بارگذاری می‌شود: اول فریمِ اول و آخر، بعد هر ۳۲تا،
    // بعد هر ۱۶تا، ... تا همه. پس از همان ثانیه‌های اول، کل فیلم (با فریمِ
    // نزدیک) قابل‌اسکرول است و بعد فریم‌ها ریزتر می‌شوند.
    const order: number[] = [];
    const seen = new Set<number>();
    const add = (i: number) => {
      if (i >= 0 && i < frameCount && !seen.has(i)) {
        seen.add(i);
        order.push(i);
      }
    };
    add(0);
    add(frameCount - 1);
    for (const stride of [32, 16, 8, 4, 2, 1]) {
      for (let i = 0; i < frameCount; i += stride) add(i);
    }

    const MAX_PARALLEL = 6;
    let cursor = 0;
    let active = 0;

    const pump = () => {
      while (!cancelled && active < MAX_PARALLEL && cursor < order.length) {
        const i = order[cursor++];
        const img = images[i];
        active++;
        const finish = () => {
          active--;
          pump();
        };
        img.decoding = "async";
        img.onload = () => {
          if (!cancelled) {
            if (i === 0) {
              setAspect(img.naturalWidth / img.naturalHeight);
              setFirstFrameReady(true);
              onFirstFrameReady?.();
            }
            // هر فریمی که برسد ممکن است دقیقاً همانی باشد که الان لازم داریم
            // (یا از فریمِ جایگزینِ فعلی به هدف نزدیک‌تر باشد)، پس دوباره رسم کن
            drawFrame(positionRef.current, true);
          }
          finish();
        };
        img.onerror = finish;
        img.src = `${framePrefix}${String(i + 1).padStart(3, "0")}.jpg`;
      }
    };
    pump();

    const redraw = () => drawFrame(positionRef.current, true);
    const ro = new ResizeObserver(redraw);
    if (canvasRef.current) ro.observe(canvasRef.current);
    window.addEventListener("orientationchange", redraw);

    return () => {
      cancelled = true;
      ro.disconnect();
      window.removeEventListener("orientationchange", redraw);
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
