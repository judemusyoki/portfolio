"use client";

import Image from "next/image";
import Link from "next/link";
import type { PointerEvent } from "react";
import type { Project } from "@/content/projects";

/** Which edge of the row is nearer the pointer: -101% (top) or 101% (bottom). */
function edge(event: PointerEvent<HTMLElement>) {
  const rect = event.currentTarget.getBoundingClientRect();
  return event.clientY - rect.top < rect.height / 2 ? "-101%" : "101%";
}

function enter(event: PointerEvent<HTMLElement>) {
  const row = event.currentTarget;
  // Jump the panel to the entry edge without animating, then slide it in.
  row.setAttribute("data-snap", "");
  row.style.setProperty("--from", edge(event));
  void row.offsetWidth;
  row.removeAttribute("data-snap");
  row.setAttribute("data-active", "");
}

function leave(event: PointerEvent<HTMLElement>) {
  const row = event.currentTarget;
  row.style.setProperty("--from", edge(event));
  row.removeAttribute("data-active");
}

/**
 * Full-width project names. On hover an orange panel slides in from the edge
 * the pointer crossed, carrying a marquee of the name and a screenshot pill.
 */
export function WorkRows({ projects }: { projects: Project[] }) {
  return (
    <nav aria-label="Case studies" className="flex h-[clamp(320px,58vh,560px)] flex-col border-y border-border">
      {projects.map((project, i) => {
        const image = project.cardImage ?? project.images[0];
        return (
          <div
            key={project.slug}
            onPointerEnter={enter}
            onPointerLeave={leave}
            className={`flow-row relative flex-1 overflow-hidden ${i > 0 ? "border-t border-border" : ""}`}
          >
            <Link
              href={`/projects/${project.slug}`}
              className="relative flex h-full items-center justify-center text-[clamp(2rem,5.6vw,4.75rem)] font-medium tracking-[-0.04em]"
            >
              {project.name}
              <span className="sr-only"> — {project.category} case study</span>
            </Link>
            <div aria-hidden="true" className="flow-panel pointer-events-none absolute inset-0 overflow-hidden bg-accent text-background">
              <div className="marquee-track flex h-full w-max" style={{ "--marquee-duration": "14s" } as React.CSSProperties}>
                {Array.from({ length: 8 }, (_, n) => (
                  <div key={n} className="flex h-full shrink-0 items-center">
                    <span className="px-[1.5vw] text-[clamp(2rem,5.6vw,4.75rem)] leading-none font-medium tracking-[-0.04em] whitespace-nowrap">
                      {project.name}
                    </span>
                    {image && (
                      <Image
                        src={image.src}
                        alt=""
                        width={480}
                        height={300}
                        sizes="240px"
                        className="mx-[2vw] h-[62%] w-[clamp(120px,16vw,240px)] rounded-full bg-background object-cover object-top"
                      />
                    )}
                  </div>
                ))}
              </div>
            </div>
          </div>
        );
      })}
    </nav>
  );
}
