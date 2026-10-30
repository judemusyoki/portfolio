import type { ReactNode } from "react";
import Link from "next/link";

export const primaryButton =
  "group inline-flex items-center gap-2 rounded-full bg-accent-strong px-6 py-3.5 font-semibold text-white shadow-[0_0_0_1px_rgb(255_91_46/0.45),0_12px_40px_-12px_rgb(255_91_46/0.7)] transition-colors hover:bg-accent";

export const secondaryButton =
  "inline-flex items-center gap-2 rounded-full border border-border-strong px-6 py-3.5 font-semibold transition-colors hover:border-foreground";

export const ghostButton =
  "group inline-flex items-center gap-2 px-4 py-3.5 font-semibold text-muted transition-colors hover:text-foreground";

export function ArrowIcon({ className = "" }: { className?: string }) {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true" className={className}>
      <path d="M5 12h14M13 6l6 6-6 6" />
    </svg>
  );
}

export const arrowLinkClass = "group inline-flex items-center gap-3 font-medium";

/** The outlined arrow circle that follows an ArrowLink's text. */
export function ArrowCircle({ external = false }: { external?: boolean }) {
  return (
    <span className="grid size-9 place-items-center rounded-full border border-border-strong transition-colors group-hover:border-accent group-hover:bg-accent group-hover:text-background">
      <ArrowIcon className={`transition-transform group-hover:translate-x-0.5 ${external ? "-rotate-45" : ""}`} />
    </span>
  );
}

/** "See how I can help (→)": text beside an outlined arrow circle. */
export function ArrowLink({ href, children, external = false }: { href: string; children: ReactNode; external?: boolean }) {
  const className = arrowLinkClass;
  const content = (
    <>
      {children}
      <ArrowCircle external={external} />
    </>
  );
  if (external || href.startsWith("mailto:")) {
    return (
      <a href={href} className={className} {...(external ? { target: "_blank", rel: "noopener noreferrer" } : {})}>
        {content}
      </a>
    );
  }
  return (
    <Link href={href} className={className}>
      {content}
    </Link>
  );
}
