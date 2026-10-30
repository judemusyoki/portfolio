"use client";

import { useEffect, useState } from "react";
import { usePathname } from "next/navigation";

type Entry = { id: string; label: string };

function scrollTo(id: string) {
  document.getElementById(id)?.scrollIntoView({ behavior: "smooth", block: "start" });
}

/**
 * Right-hand rail (xl+): one dot per `[data-section]` on the page, the
 * current one labelled "02 WHO I AM". Also marks the matching header link
 * with aria-current. Re-scans on every route, so case studies get their own.
 */
export function SectionRail() {
  const pathname = usePathname();
  const [entries, setEntries] = useState<Entry[]>([]);
  const [active, setActive] = useState(0);

  useEffect(() => {
    const sections = [...document.querySelectorAll<HTMLElement>("[data-section]")];
    // eslint-disable-next-line react-hooks/set-state-in-effect -- the list comes from the DOM of the route that just rendered
    setEntries(sections.map((el) => ({ id: el.id, label: el.dataset.section ?? "" })));
    setActive(0);

    const links = document.querySelectorAll<HTMLAnchorElement>("header nav a[href*='#']");
    const mark = (id: string) => {
      const hash = id === "top" ? "#top" : `#${id}`;
      links.forEach((link) => {
        if (link.hash === hash && pathname === "/") link.setAttribute("aria-current", "location");
        else link.removeAttribute("aria-current");
      });
    };
    mark("top");

    // Whichever section spans the middle of the viewport is current.
    const observer = new IntersectionObserver(
      (records) => {
        for (const record of records) {
          if (!record.isIntersecting) continue;
          const index = sections.indexOf(record.target as HTMLElement);
          setActive(index);
          mark(sections[index].id);
        }
      },
      { rootMargin: "-50% 0px -50% 0px" },
    );
    sections.forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  }, [pathname]);

  if (entries.length < 2) return null;
  const go = (index: number) => {
    const entry = entries[Math.min(entries.length - 1, Math.max(0, index))];
    scrollTo(entry.id);
  };

  return (
    <nav aria-label="Page sections" className="rail fixed top-1/2 right-5 z-30 hidden -translate-y-1/2 xl:block">
      <div className="flex flex-col items-center rounded-full border border-border-strong bg-background/60 py-3 backdrop-blur-xl">
        <button type="button" onClick={() => go(active - 1)} aria-label="Previous section" className="grid size-8 place-items-center text-muted hover:text-foreground">
          <svg width="12" height="12" viewBox="0 0 12 12" fill="none" stroke="currentColor" strokeWidth="1.6" aria-hidden="true">
            <path d="m2.5 7.5 3.5-3.5 3.5 3.5" />
          </svg>
        </button>
        <span className="my-1.5 h-px w-4 bg-border-strong" aria-hidden="true" />
        <ol className="flex flex-col items-center py-1">
          {entries.map((entry, i) => {
            const current = i === active;
            return (
              <li key={entry.id} className="relative">
                <button
                  type="button"
                  onClick={() => scrollTo(entry.id)}
                  aria-label={`${String(i + 1).padStart(2, "0")} ${entry.label}`}
                  aria-current={current ? "location" : undefined}
                  className="group grid size-7 place-items-center"
                >
                  <span
                    className={`block rounded-full transition-all duration-300 ${
                      current
                        ? "size-3 bg-accent shadow-[0_0_0_4px_rgb(255_91_46/0.18),0_0_18px_rgb(255_91_46/0.6)]"
                        : "size-1.5 bg-muted group-hover:bg-foreground"
                    }`}
                  />
                </button>
                {current && (
                  <span
                    aria-hidden="true"
                    className="rail-label absolute top-1/2 right-full mr-3 -translate-y-1/2 rounded-md border border-accent/40 bg-background px-2.5 py-1 font-mono text-[10px] whitespace-nowrap uppercase tracking-[0.1em] backdrop-blur"
                  >
                    <span className="text-muted">{String(i + 1).padStart(2, "0")}</span>{" "}
                    <span className="font-semibold text-accent-text">{entry.label}</span>
                  </span>
                )}
              </li>
            );
          })}
        </ol>
        <span className="my-1.5 h-px w-4 bg-border-strong" aria-hidden="true" />
        <button type="button" onClick={() => go(active + 1)} aria-label="Next section" className="grid size-8 place-items-center text-muted hover:text-foreground">
          <svg width="12" height="12" viewBox="0 0 12 12" fill="none" stroke="currentColor" strokeWidth="1.6" aria-hidden="true">
            <path d="m2.5 4.5 3.5 3.5 3.5-3.5" />
          </svg>
        </button>
      </div>
    </nav>
  );
}
