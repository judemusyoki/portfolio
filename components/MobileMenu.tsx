"use client";

import { useRef } from "react";
import Link from "next/link";
import { nav, site } from "@/content/site";
import type { CSSProperties } from "react";

/**
 * Full-screen menu below lg on a native <dialog> (focus trap and Esc for
 * free). The panel drops in and the links rise one by one (.menu-panel).
 */
export function MobileMenu() {
  const dialogRef = useRef<HTMLDialogElement>(null);
  const close = () => dialogRef.current?.close();

  return (
    <>
      <button
        type="button"
        onClick={() => dialogRef.current?.showModal()}
        aria-haspopup="dialog"
        className="flex items-center gap-1.5 py-2 font-medium"
      >
        Menu
        <svg width="14" height="14" viewBox="0 0 14 14" stroke="currentColor" strokeWidth="1.6" aria-hidden="true">
          <path d="M7 1v12M1 7h12" />
        </svg>
      </button>
      <dialog
        ref={dialogRef}
        aria-label="Menu"
        className="menu-panel fixed inset-0 m-0 h-dvh max-h-none w-full max-w-none bg-surface p-0 text-foreground backdrop:bg-transparent"
      >
        <div className="flex h-full flex-col px-5 py-4 sm:px-8">
          <div className="flex items-center justify-between">
            <span className="grid size-10 place-items-center rounded-full border border-border-strong text-[0.8rem] font-semibold tracking-tight">
              {site.initials}
            </span>
            <button type="button" onClick={close} className="flex items-center gap-1.5 py-2 font-medium">
              Close
              <svg width="14" height="14" viewBox="0 0 14 14" stroke="currentColor" strokeWidth="1.6" aria-hidden="true">
                <path d="M2 2l10 10M12 2 2 12" />
              </svg>
            </button>
          </div>
          <nav aria-label="Menu" className="mt-10 flex-1 overflow-y-auto">
            <ol className="space-y-1">
              {nav.map((item, i) => (
                <li key={item.href} className="overflow-hidden">
                  <Link
                    href={item.href}
                    onClick={close}
                    className="menu-link inline-flex items-start gap-2 text-[clamp(2.75rem,13vw,4.5rem)] leading-[1.05] font-semibold tracking-[-0.045em]"
                    style={{ "--i": i } as CSSProperties}
                  >
                    {item.label}
                    <span className="mt-2 font-mono text-sm font-normal tracking-normal text-accent-text">
                      {String(i + 1).padStart(2, "0")}
                    </span>
                  </Link>
                </li>
              ))}
            </ol>
          </nav>
          <div className="border-t border-border pt-6 pb-4">
            <p className="text-sm text-accent-text">Elsewhere</p>
            <p className="mt-3 flex flex-wrap gap-x-6 gap-y-2 text-lg">
              <a href={site.github} target="_blank" rel="noopener noreferrer" className="text-soft hover:text-foreground">
                GitHub
              </a>
              {site.linkedin && (
                <a href={site.linkedin} target="_blank" rel="noopener noreferrer" className="text-soft hover:text-foreground">
                  LinkedIn
                </a>
              )}
              <a href={`mailto:${site.email}`} className="text-soft hover:text-foreground">
                Email
              </a>
            </p>
          </div>
        </div>
      </dialog>
    </>
  );
}
