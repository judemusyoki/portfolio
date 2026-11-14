"use client";

import { createContext, useCallback, useContext, useEffect, useRef, useState } from "react";
import Image from "next/image";
import type { ProjectImage } from "@/content/projects";
import { createRipple, type Ripple } from "@/lib/ripple";

const LightboxContext = createContext<((index: number) => void) | null>(null);

/** Every screenshot is shown in this frame, whatever its own proportions. */
const FRAME = "16 / 10";

/**
 * Case-study screenshot viewer. Clicking any screenshot opens it in a native
 * <dialog>; clicking the focused image moves to the next one through a WebGL
 * ripple-displacement transition, looping around the set. Arrow keys and the
 * buttons go either way, Esc closes.
 */
export function Lightbox({ images, children }: { images: ProjectImage[]; children: React.ReactNode }) {
  const dialogRef = useRef<HTMLDialogElement>(null);
  const frameRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const rippleRef = useRef<Ripple | null>(null);
  const wantRef = useRef(0);
  const [index, setIndex] = useState(0);
  const [open, setOpen] = useState(false);
  // true once the canvas is showing (or animating towards) the current image;
  // until then a plain <img> stands in
  const [onCanvas, setOnCanvas] = useState(false);

  const openAt = useCallback((i: number) => {
    const dialog = dialogRef.current;
    if (!dialog || dialog.open) return;
    wantRef.current = i;
    setIndex(i);
    setOnCanvas(false);
    setOpen(true);
    dialog.showModal();
  }, []);

  // Lock page scroll while open; Esc closes the dialog natively and lands here.
  useEffect(() => {
    const dialog = dialogRef.current;
    if (!dialog) return;
    const onClose = () => {
      setOpen(false);
      setOnCanvas(false);
      document.documentElement.style.overflow = "";
    };
    dialog.addEventListener("close", onClose);
    return () => dialog.removeEventListener("close", onClose);
  }, []);
  useEffect(() => {
    if (open) document.documentElement.style.overflow = "hidden";
  }, [open]);

  // WebGL lives only while the dialog is open. Textures load in order from
  // the clicked image; whichever one is wanted gets drawn as soon as it lands.
  useEffect(() => {
    if (!open || !canvasRef.current || !frameRef.current) return;
    const ripple = createRipple(canvasRef.current, frameRef.current);
    if (!ripple) return;
    rippleRef.current = ripple;
    let cancelled = false;
    const start = wantRef.current;
    const order = images.map((_, i) => (start + i) % images.length);
    (async () => {
      for (const i of order) {
        await ripple.load(images[i].src);
        if (cancelled) return;
        if (i === wantRef.current) {
          ripple.show(images[i].src);
          setOnCanvas(true);
        }
      }
    })();
    return () => {
      cancelled = true;
      rippleRef.current = null;
      ripple.dispose();
    };
  }, [open, images]);

  const go = useCallback(
    (delta: 1 | -1) => {
      const ripple = rippleRef.current;
      if (ripple?.busy()) return;
      const next = (index + delta + images.length) % images.length;
      wantRef.current = next;
      setIndex(next);
      if (ripple && onCanvas && ripple.has(images[next].src)) {
        // the canvas keeps showing throughout; the ripple carries the swap
        ripple.transition(images[next].src);
      } else if (ripple?.has(images[next].src)) {
        ripple.show(images[next].src);
        setOnCanvas(true);
      } else {
        // texture still loading or no WebGL: the <img> shows it meanwhile
        setOnCanvas(false);
      }
    },
    [images, index, onCanvas],
  );

  useEffect(() => {
    if (!open) return;
    const onKey = (event: KeyboardEvent) => {
      if (event.key === "ArrowRight") go(1);
      else if (event.key === "ArrowLeft") go(-1);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open, go]);

  const image = images[index];
  const counter = `${String(index + 1).padStart(2, "0")} / ${String(images.length).padStart(2, "0")}`;
  const navButton = "hidden rounded-full border border-border px-4 py-2 font-mono text-xs transition-colors hover:border-border-strong sm:block";

  return (
    <LightboxContext.Provider value={openAt}>
      {children}
      <dialog
        ref={dialogRef}
        aria-label="Screenshots"
        className="lightbox fixed inset-0 m-0 h-dvh max-h-none w-screen max-w-none bg-transparent p-0 text-foreground backdrop:bg-background/90 backdrop:backdrop-blur-md"
      >
        {open && image && (
          <div className="grid h-full grid-rows-[3.5rem_minmax(0,1fr)_6rem]">
            <div className="flex items-center justify-between gap-4 px-5 sm:px-8">
              <p className="font-mono text-xs text-muted">
                <span className="text-accent-text">{counter}</span>
                <span className="ml-4 hidden sm:inline">click the image for the next one</span>
              </p>
              <button
                type="button"
                onClick={() => dialogRef.current?.close()}
                className="rounded-full border border-border px-4 py-2 text-xs transition-colors hover:border-border-strong hover:text-foreground"
              >
                Close <span className="ml-2 font-mono text-muted">esc</span>
              </button>
            </div>

            {/* The frame has the same proportions for every image, as large as the space allows. */}
            <div className="flex items-center justify-center px-5 sm:px-8">
              <div
                ref={frameRef}
                className="relative w-full overflow-hidden rounded-2xl border border-border bg-surface"
                style={{ aspectRatio: FRAME, maxWidth: "calc((100dvh - 9.5rem) * 1.6)" }}
              >
                <button
                  type="button"
                  onClick={() => go(1)}
                  aria-label="Next screenshot"
                  className="absolute inset-0 block h-full w-full cursor-pointer"
                >
                  <canvas ref={canvasRef} className="pointer-events-none absolute inset-0 h-full w-full" />
                  {!onCanvas && (
                    <Image
                      key={image.src}
                      src={image.src}
                      alt=""
                      fill
                      unoptimized
                      sizes="100vw"
                      className="pointer-events-none object-contain"
                    />
                  )}
                </button>
              </div>
            </div>

            <div className="grid items-center gap-4 px-5 sm:grid-cols-[auto_minmax(0,1fr)_auto] sm:px-8">
              <button type="button" onClick={() => go(-1)} aria-label="Previous screenshot" className={navButton}>
                ←
              </button>
              <p aria-live="polite" className="line-clamp-2 text-center text-sm leading-relaxed text-soft text-pretty">
                {image.caption ?? image.alt}
              </p>
              <button type="button" onClick={() => go(1)} aria-label="Next screenshot" className={navButton}>
                →
              </button>
            </div>
          </div>
        )}
      </dialog>
    </LightboxContext.Provider>
  );
}

/** Wraps a screenshot so clicking it opens the lightbox at that image. */
export function LightboxTrigger({ index, className = "", children }: { index: number; className?: string; children: React.ReactNode }) {
  const openAt = useContext(LightboxContext);
  if (!openAt) return <>{children}</>;
  return (
    <button
      type="button"
      onClick={() => openAt(index)}
      aria-label={`Open screenshot ${index + 1} full screen`}
      className={`block w-full cursor-zoom-in ${className}`}
    >
      {children}
    </button>
  );
}
