"use client";

import { useEffect, useState } from "react";

/** Sticky contents list for a case study; highlights the section in view. */
export function CaseToc({ items }: { items: { id: string; label: string }[] }) {
  const [active, setActive] = useState(items[0]?.id);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) setActive(entry.target.id);
        }
      },
      { rootMargin: "-30% 0px -60% 0px" },
    );
    for (const item of items) {
      const el = document.getElementById(item.id);
      if (el) observer.observe(el);
    }
    return () => observer.disconnect();
  }, [items]);

  return (
    <nav aria-label="On this page" className="font-mono text-xs">
      <p className="mb-4 uppercase tracking-widest text-muted">On this page</p>
      <ol className="space-y-1 border-l border-border">
        {items.map((item, i) => (
          <li key={item.id}>
            <a
              href={`#${item.id}`}
              aria-current={active === item.id ? "location" : undefined}
              className="-ml-px flex gap-3 border-l border-transparent py-1.5 pl-4 text-muted transition-colors hover:text-foreground aria-[current]:border-accent aria-[current]:text-foreground"
            >
              <span className="text-accent">{String(i + 1).padStart(2, "0")}</span>
              {item.label}
            </a>
          </li>
        ))}
      </ol>
    </nav>
  );
}
