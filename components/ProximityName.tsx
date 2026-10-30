"use client";

import { useRef } from "react";
import type { PointerEvent } from "react";

const RADIUS = 220; // px of influence around the pointer

/**
 * Giant footer wordmark. Letters near the pointer lift and warm to orange;
 * each letter's pull (--k, 0 → 1) is written straight to the DOM.
 */
export function ProximityName({ text, className = "" }: { text: string; className?: string }) {
  const ref = useRef<HTMLParagraphElement>(null);

  function onMove(event: PointerEvent<HTMLParagraphElement>) {
    if (event.pointerType !== "mouse") return;
    for (const letter of ref.current?.children ?? []) {
      const rect = letter.getBoundingClientRect();
      const dx = event.clientX - (rect.left + rect.width / 2);
      const dy = event.clientY - (rect.top + rect.height / 2);
      const k = Math.max(0, 1 - Math.hypot(dx, dy) / RADIUS);
      (letter as HTMLElement).style.setProperty("--k", k.toFixed(3));
    }
  }

  function onLeave() {
    for (const letter of ref.current?.children ?? []) (letter as HTMLElement).style.setProperty("--k", "0");
  }

  return (
    <p ref={ref} aria-hidden="true" onPointerMove={onMove} onPointerLeave={onLeave} className={`flex select-none ${className}`}>
      {[...text].map((char, i) => (
        <span
          key={i}
          className="inline-block transition-[transform,color] duration-300 ease-out [color:color-mix(in_srgb,var(--accent)_calc(var(--k,0)*100%),var(--foreground))] [transform:translateY(calc(var(--k,0)*-12%))] motion-reduce:transform-none"
        >
          {char === " " ? " " : char}
        </span>
      ))}
    </p>
  );
}
