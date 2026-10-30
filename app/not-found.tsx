import type { Metadata } from "next";
import Link from "next/link";
import { ArrowIcon, primaryButton } from "@/components/Buttons";

export const metadata: Metadata = { title: "Null Island" };

/**
 * 0°, 0° — "Null Island" is where records with broken or missing coordinates
 * land on a map. A fitting place for a broken link on a geospatial portfolio.
 */
export default function NotFound() {
  return (
    <div className="container-x grid min-h-[80svh] items-center gap-12 pt-32 pb-20 lg:grid-cols-2">
      <div>
        <p className="eyebrow text-accent-text">
          404 · 0.0000° N, 0.0000° E
        </p>
        <h1 className="mt-6 text-[clamp(3rem,7vw,6rem)] leading-[0.95] font-semibold tracking-[-0.05em]">
          You&apos;ve reached <span className="text-accent">Null Island.</span>
        </h1>
        <p className="mt-6 max-w-lg leading-relaxed text-soft sm:text-lg">
          It&apos;s the spot in the Gulf of Guinea where every record with a missing coordinate ends up
          on the map. This page doesn&apos;t exist — but you&apos;re in very large company.
        </p>
        <Link
          href="/"
          className={`${primaryButton} mt-10`}
        >
          <ArrowIcon className="rotate-180 transition-transform group-hover:-translate-x-0.5" />
          Navigate home
        </Link>
      </div>

      <svg viewBox="0 0 400 300" className="w-full overflow-hidden rounded-3xl border border-border bg-surface" aria-hidden="true">
        <defs>
          <pattern id="graticule" width="40" height="40" patternUnits="userSpaceOnUse">
            <path d="M40 0H0V40" fill="none" stroke="var(--border)" strokeWidth="1" />
          </pattern>
        </defs>
        <rect width="400" height="300" fill="url(#graticule)" />
        {/* Equator and prime meridian */}
        <path d="M0 160H400M200 0V300" stroke="var(--muted)" strokeOpacity="0.5" strokeDasharray="3 5" />
        <text x="208" y="20" fontSize="10" fill="var(--muted)" fontFamily="ui-monospace, monospace">0° lon</text>
        <text x="8" y="154" fontSize="10" fill="var(--muted)" fontFamily="ui-monospace, monospace">0° lat</text>

        {/* Waves */}
        {[0, 1, 2].map((row) => (
          <g key={row} className="drift" style={{ animationDuration: `${4 + row * 1.5}s` }}>
            <path
              d={`M-40 ${200 + row * 26} ${Array.from({ length: 12 }, () => "q 10 -6 20 0 t 20 0").join(" ")}`}
              fill="none"
              stroke="var(--accent)"
              strokeOpacity={0.5 - row * 0.12}
              strokeWidth="1.5"
              strokeLinecap="round"
            />
          </g>
        ))}

        {/* The island */}
        <g className="bob">
          <ellipse cx="200" cy="168" rx="46" ry="9" fill="var(--foreground)" fillOpacity="0.85" />
          <path d="M198 166 C 196 140, 202 118, 206 104" stroke="var(--muted)" strokeWidth="3" fill="none" strokeLinecap="round" />
          <path d="M206 104 c -14 -6 -26 0 -30 8 M206 104 c 12 -8 26 -6 30 2 M206 104 c -4 -12 -16 -18 -24 -16 M206 104 c 6 -12 18 -14 26 -10" stroke="var(--accent-text)" strokeWidth="3" fill="none" strokeLinecap="round" />
        </g>

        {/* Pin dropped at 0,0 */}
        <g>
          <circle
            cx="200"
            cy="160"
            r="4"
            fill="var(--accent)"
            className="hp-pulse"
            style={{ transformBox: "fill-box", transformOrigin: "center" }}
          />
          <circle cx="200" cy="160" r="3.5" fill="var(--accent)" />
        </g>
      </svg>
    </div>
  );
}
