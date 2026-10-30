"use client";

import { useEffect, useRef } from "react";

const TARGETS = "a, button, summary, [data-cursor]";
const IDLE = 14; // idle distance from the pointer to each corner, px
const PAD = 6; // gap around a locked target, px
const MAX_LOCK = { width: 520, height: 160 }; // lock only onto targets up to this size, px
// Outer-corner offsets of each L, clockwise from top-left.
const SIGNS = [
  [-1, -1],
  [1, -1],
  [1, 1],
  [-1, 1],
] as const;

/**
 * Reticle cursor: four corners spin slowly around the pointer, then snap
 * to the bounds of whatever link or button is under it. Fine pointers only,
 * and off under reduced motion. Positions are written in a rAF loop, never
 * through React state.
 */
export function TargetCursor() {
  const rootRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const root = rootRef.current;
    const query = window.matchMedia("(pointer: fine) and (prefers-reduced-motion: no-preference)");
    if (!root || !query.matches) return;

    const corners = [...root.querySelectorAll<HTMLElement>("[data-corner]")];
    const dot = root.querySelector<HTMLElement>("[data-dot]")!;
    const html = document.documentElement;
    html.classList.add("has-reticle");

    let x = -100;
    let y = -100;
    let target: Element | null = null;
    let angle = 0;
    let last = performance.now();
    let frame = 0;
    const current = SIGNS.map(() => ({ x: -100, y: -100 }));

    function tick(now: number) {
      const dt = Math.min(64, now - last);
      last = now;
      const locked = target?.isConnected ? target.getBoundingClientRect() : null;
      if (!locked) angle = (angle + dt * 0.0016) % (Math.PI * 2);
      const cos = Math.cos(angle);
      const sin = Math.sin(angle);

      SIGNS.forEach(([sx, sy], i) => {
        let gx: number;
        let gy: number;
        if (locked) {
          gx = sx < 0 ? locked.left - PAD : locked.right + PAD;
          gy = sy < 0 ? locked.top - PAD : locked.bottom + PAD;
        } else {
          gx = x + (sx * cos - sy * sin) * IDLE;
          gy = y + (sx * sin + sy * cos) * IDLE;
        }
        const point = current[i];
        point.x += (gx - point.x) * 0.3;
        point.y += (gy - point.y) * 0.3;
        // Rotate each L about its own outer corner, so the arms keep pointing
        // inward while the reticle spins.
        corners[i].style.transform = `translate3d(${point.x}px, ${point.y}px, 0) rotate(${locked ? 0 : angle}rad)`;
      });
      dot.style.transform = `translate3d(${x}px, ${y}px, 0)`;
      frame = requestAnimationFrame(tick);
    }

    function onMove(event: PointerEvent) {
      if (event.pointerType !== "mouse") return;
      x = event.clientX;
      y = event.clientY;
      root!.style.opacity = "1";
      if (!frame) {
        last = performance.now();
        frame = requestAnimationFrame(tick);
      }
    }
    function onOver(event: PointerEvent) {
      const origin = event.target as Element;
      // A wide control (a full-width <summary>, say) can mark the parts worth
      // locking onto with data-cursor; otherwise lock onto the control itself.
      const hit = origin.closest("[data-cursor]") ?? origin.closest(TARGETS);
      // Full-width rows and large cards would push the corners off-screen;
      // keep the spinning reticle there instead of locking on.
      const rect = hit?.getBoundingClientRect();
      target = rect && rect.width <= MAX_LOCK.width && rect.height <= MAX_LOCK.height ? hit : null;
    }
    function onLeave() {
      root!.style.opacity = "0";
      cancelAnimationFrame(frame);
      frame = 0;
    }

    window.addEventListener("pointermove", onMove, { passive: true });
    document.addEventListener("pointerover", onOver, { passive: true });
    html.addEventListener("pointerleave", onLeave);
    return () => {
      html.classList.remove("has-reticle");
      window.removeEventListener("pointermove", onMove);
      document.removeEventListener("pointerover", onOver);
      html.removeEventListener("pointerleave", onLeave);
      cancelAnimationFrame(frame);
    };
  }, []);

  const arm = "absolute top-0 left-0 size-3 border-white will-change-transform";
  return (
    <div ref={rootRef} aria-hidden="true" className="pointer-events-none fixed inset-0 z-[100] opacity-0 drop-shadow-[0_0_1.5px_rgb(0_0_0/0.7)] transition-opacity duration-300">
      <span data-corner className={`${arm} origin-top-left border-t-[2.5px] border-l-[2.5px]`} />
      <span data-corner className={`${arm} -ml-3 origin-top-right border-t-[2.5px] border-r-[2.5px]`} />
      <span data-corner className={`${arm} -mt-3 -ml-3 origin-bottom-right border-r-[2.5px] border-b-[2.5px]`} />
      <span data-corner className={`${arm} -mt-3 origin-bottom-left border-b-[2.5px] border-l-[2.5px]`} />
      <span data-dot className="absolute top-0 left-0 -mt-[2px] -ml-[2px] size-1 rounded-full bg-white will-change-transform" />
    </div>
  );
}
