import type { ReactNode } from "react";
import { Emphasis } from "@/components/Typography";

/** "02 —— WHO I AM". */
export function Eyebrow({ index, children, className = "" }: { index: number; children: ReactNode; className?: string }) {
  return (
    <p className={`eyebrow flex items-center gap-3 ${className}`}>
      <span className="text-accent-text">{String(index).padStart(2, "0")}</span>
      <span className="draw-x h-px w-8 origin-left bg-border-strong" aria-hidden="true" />
      {children}
    </p>
  );
}

/**
 * Numbered page section with a display headline. `label` names the section
 * in the side rail (see SectionRail), which reads `data-section`.
 */
export function Section({
  id,
  index,
  label,
  eyebrow,
  title,
  intro,
  children,
  bleed = false,
  className = "",
}: {
  id: string;
  index: number;
  /** Short rail label; defaults to the eyebrow. */
  label?: string;
  eyebrow: string;
  /** Display headline; *asterisks* mark accent words. */
  title: string;
  intro?: string;
  children: ReactNode;
  /** Render children edge to edge instead of inside the page gutter. */
  bleed?: boolean;
  className?: string;
}) {
  return (
    <section
      id={id}
      data-section={label ?? eyebrow}
      aria-labelledby={`${id}-heading`}
      className={`border-t border-border py-28 md:py-40 ${className}`}
    >
      <div className="container-x">
        <header className="reveal mb-14 md:mb-20">
          <Eyebrow index={index}>{eyebrow}</Eyebrow>
          <h2 id={`${id}-heading`} className="display-h2 mt-6 max-w-5xl">
            <Emphasis text={title} />
          </h2>
          {intro && <p className="mt-6 max-w-2xl text-lg leading-relaxed text-soft text-pretty">{intro}</p>}
        </header>
        {!bleed && children}
      </div>
      {bleed && children}
    </section>
  );
}
