/**
 * Decorative "slice of a map" shown beside the hero text on large screens.
 * Abstract street map: roads draw on, incident dots scatter, cluster bubbles pulse.
 * Pure SVG + CSS, fixed data, hidden from assistive tech. Alternative to HeroPanel.
 */

const W = 240;
const H = 150;

// Roads: a few bezier curves in a muted stroke. Drawn on with hp-draw, staggered.
const roads = [
  "M0 42 C 60 30, 120 72, 240 56",
  "M18 150 C 70 100, 112 96, 152 0",
  "M0 112 C 80 122, 160 100, 240 132",
  "M100 0 C 106 60, 160 90, 240 96",
  "M0 78 C 80 82, 160 80, 240 86",
  "M60 0 C 58 50, 40 100, 30 150",
];

// Small incident dots (x, y).
const incidents: Array<[number, number]> = [
  [40, 58],
  [58, 92],
  [70, 45],
  [82, 118],
  [96, 32],
  [104, 84],
  [112, 108],
  [118, 50],
  [126, 128],
  [134, 36],
  [146, 76],
  [158, 116],
  [166, 48],
  [176, 96],
  [186, 128],
  [194, 40],
  [206, 88],
  [216, 112],
  [226, 62],
];

// Cluster bubbles: x, y, count, radius.
const clusters = [
  { x: 92, y: 70, n: 22, r: 11, label: "Westlands" },
  { x: 138, y: 60, n: 17, r: 10, label: "Kasarani" },
  { x: 152, y: 94, n: 14, r: 9, label: "Embakasi" },
  { x: 204, y: 70, n: 2, r: 6 },
];

const total = 80;

export function HeroMap({ className = "" }: { className?: string }) {
  return (
    <div
      aria-hidden="true"
      className={`w-full max-w-xs rounded-xl border border-border bg-card p-5 shadow-[0_0_60px_-20px_var(--accent)] ${className}`}
    >
      <div className="flex items-center justify-between">
        <p className="font-mono text-[11px] uppercase tracking-widest text-muted">
          Incidents · live
        </p>
        <p className="inline-flex items-center gap-1.5 font-mono text-[11px] text-muted">
          <span className="relative flex h-2 w-2">
            <span className="hp-pulse absolute inline-flex h-full w-full rounded-full bg-accent opacity-75" />
            <span className="relative inline-flex h-2 w-2 rounded-full bg-accent" />
          </span>
          {total} total
        </p>
      </div>

      <svg
        viewBox={`0 0 ${W} ${H}`}
        className="mt-3 w-full overflow-hidden rounded-lg"
        style={{ aspectRatio: `${W} / ${H}` }}
      >
        {/* Ground */}
        <rect width={W} height={H} fill="var(--accent)" opacity="0.04" />
        {/* Built-up area */}
        <ellipse
          cx="122"
          cy="78"
          rx="66"
          ry="36"
          fill="var(--accent)"
          fillOpacity="0.06"
          className="hp-fade"
          style={{ animationDelay: "0.8s" }}
        />
        {/* Roads */}
        {roads.map((d, i) => (
          <path
            key={d}
            d={d}
            fill="none"
            stroke="var(--muted)"
            strokeOpacity="0.35"
            strokeWidth={i < 3 ? 1.4 : 0.9}
            strokeLinecap="round"
            pathLength={1}
            className="hp-draw"
            style={{ animationDelay: `${0.1 + i * 0.12}s` }}
          />
        ))}
        {/* Incident dots */}
        {incidents.map(([x, y], i) => (
          <circle
            key={`${x}-${y}`}
            cx={x}
            cy={y}
            r="1.6"
            fill="var(--accent)"
            fillOpacity="0.7"
            className="hp-fade"
            style={{
              animationDelay: `${1 + i * 0.03}s`,
              animationDuration: "0.4s",
            }}
          />
        ))}
        {/* Clusters */}
        {clusters.map((c, i) => (
          <g
            key={c.label ?? `${c.x}-${c.y}`}
            className="hp-fade"
            style={{ animationDelay: `${1.5 + i * 0.12}s` }}
          >
            <circle
              cx={c.x}
              cy={c.y}
              r={c.r}
              fill="none"
              stroke="var(--accent)"
              strokeWidth="1.2"
              className="hm-ring"
              style={{ animationDelay: `${2 + i * 0.4}s` }}
            />
            <circle
              cx={c.x}
              cy={c.y}
              r={c.r}
              fill="var(--accent)"
              stroke="var(--card)"
              strokeWidth="1.5"
            />
            <text
              x={c.x}
              y={c.y}
              textAnchor="middle"
              dominantBaseline="central"
              fontSize={c.r >= 9 ? 8 : 6.5}
              fontWeight="600"
              fontFamily="var(--font-jetbrains-mono), ui-monospace, monospace"
              fill="var(--accent-contrast)"
            >
              {c.n}
            </text>
          </g>
        ))}
      </svg>

      <ul className="mt-4 flex flex-wrap gap-x-4 gap-y-1 font-mono text-[11px] text-muted">
        {clusters
          .filter((c) => c.label)
          .map((c) => (
            <li key={c.label} className="inline-flex items-center gap-1.5">
              <span className="inline-block h-1.5 w-1.5 rounded-full bg-accent" />
              {c.label}
              <span className="text-foreground">{c.n}</span>
            </li>
          ))}
      </ul>
    </div>
  );
}
