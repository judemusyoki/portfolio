"use client";

import { useEffect, useRef, useState } from "react";
import { services } from "@/content/site";

const pad = (n: number) => String(n + 1).padStart(2, "0");

/**
 * Services as tall panels on the right; on lg+ the left column sticks with a
 * giant number and a list that follows whichever panel is mid-screen.
 */
export function ServicesShowcase() {
  const [active, setActive] = useState(0);
  const panels = useRef<(HTMLElement | null)[]>([]);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (records) => {
        for (const record of records) {
          if (record.isIntersecting) setActive(panels.current.indexOf(record.target as HTMLElement));
        }
      },
      { rootMargin: "-50% 0px -50% 0px" },
    );
    panels.current.forEach((el) => el && observer.observe(el));
    return () => observer.disconnect();
  }, []);

  return (
    <div className="grid gap-x-16 lg:grid-cols-2">
      <div aria-hidden="true" className="hidden lg:block">
        <div className="sticky top-24 flex h-[calc(100svh-8rem)] flex-col justify-between">
          <p key={active} className="number-in text-[clamp(10rem,17vw,15rem)] leading-[0.8] font-semibold tracking-[-0.06em] text-accent">
            {pad(active)}
          </p>
          <ul className="space-y-3 pb-4">
            {services.map((service, i) => (
              <li
                key={service.title}
                className={`flex items-center gap-4 text-xl transition-colors duration-300 ${i === active ? "text-foreground" : "text-muted"}`}
              >
                <span
                  className={`h-px transition-all duration-500 ${i === active ? "w-12 bg-accent" : "w-5 bg-border-strong"}`}
                />
                {service.title}
              </li>
            ))}
          </ul>
        </div>
      </div>

      <ol>
        {services.map((service, i) => (
          <li
            key={service.title}
            ref={(el) => {
              panels.current[i] = el;
            }}
            className="flex flex-col justify-center border-t border-border py-14 lg:min-h-[75svh] lg:py-24"
          >
            <p className="font-mono text-sm text-accent-text lg:hidden">{pad(i)}</p>
            <h3 className="mt-3 flex flex-wrap items-center gap-x-4 gap-y-2 text-[clamp(1.75rem,2.8vw,2.5rem)] leading-tight font-semibold tracking-[-0.035em] lg:mt-0">
              {service.title}
              {service.badge && (
                <span className="rounded-full border border-accent/50 px-3 py-1 font-mono text-[10px] font-normal tracking-[0.15em] text-accent-text uppercase">
                  {service.badge}
                </span>
              )}
            </h3>
            <p className="mt-5 max-w-xl text-lg leading-relaxed text-soft text-pretty">{service.body}</p>
            <p className="eyebrow mt-10 text-[11px] text-muted">What I build</p>
            <ul className="mt-4 space-y-2.5">
              {service.builds.map((item) => (
                <li key={item} className="flex items-center gap-4 text-lg">
                  <span aria-hidden="true" className="h-px w-4 shrink-0 bg-muted" />
                  {item}
                </li>
              ))}
            </ul>
            <details className="group mt-10 border-t border-border pt-6">
              <summary className="flex cursor-pointer items-center justify-between gap-4 font-medium">
                <span data-cursor>The technical detail</span>
                <span data-cursor aria-hidden="true" className="grid size-8 place-items-center rounded-full border border-border-strong transition-transform duration-300 group-open:rotate-45">
                  +
                </span>
              </summary>
              <p className="mt-4 max-w-xl leading-relaxed text-soft text-pretty">{service.detail}</p>
            </details>
          </li>
        ))}
      </ol>
    </div>
  );
}
