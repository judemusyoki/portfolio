/**
 * Decorative "slice of a dashboard" shown beside the hero text on large screens.
 * Pure SVG + CSS: no data fetching, no client JS. Values are fixed so server and
 * client render identically. Hidden from assistive tech — the text hero says it all.
 */

// 28 fill-level readings (0–100). Hand-tuned to look like a real sensor series.
const series = [
  41, 43, 42, 45, 48, 47, 51, 54, 53, 57, 60, 58, 62, 65, 63, 61, 64, 68, 71,
  69, 66, 63, 60, 58, 57, 59, 61, 62,
];

// Pickups per day, last 7 days.
const bars = [14, 18, 11, 22, 17, 25, 20];

const W = 240;
const H = 64;
const PAD = 2;

function toPoints(values: number[]) {
  const min = Math.min(...values);
  const max = Math.max(...values);
  const span = max - min || 1;
  return values.map((v, i) => {
    const x = PAD + (i / (values.length - 1)) * (W - PAD * 2);
    const y = PAD + (1 - (v - min) / span) * (H - PAD * 2);
    return [Number(x.toFixed(1)), Number(y.toFixed(1))] as const;
  });
}

const points = toPoints(series);
const linePath = points
  .map(([x, y], i) => `${i === 0 ? "M" : "L"}${x} ${y}`)
  .join(" ");
const areaPath = `${linePath} L${points[points.length - 1][0]} ${H} L${points[0][0]} ${H} Z`;
const [lastX, lastY] = points[points.length - 1];
const latest = series[series.length - 1];
const delta = latest - series[0];
const maxBar = Math.max(...bars);

export function HeroPanel({ className = "" }: { className?: string }) {
  return (
    <div
      aria-hidden="true"
      className={`w-full max-w-xs rounded-xl border border-border bg-card p-5 shadow-[0_0_60px_-20px_var(--accent)] ${className}`}
    >
      <div className="flex items-center justify-between">
        <p className="font-mono text-[11px] uppercase tracking-widest text-muted">
          Fill level · 24h
        </p>
        <p className="inline-flex items-center gap-1.5 font-mono text-[11px] text-muted">
          <span className="relative flex h-2 w-2">
            <span className="hp-pulse absolute inline-flex h-full w-full rounded-full bg-accent opacity-75" />
            <span className="relative inline-flex h-2 w-2 rounded-full bg-accent" />
          </span>
          live
        </p>
      </div>

      <p className="mt-3 flex items-baseline gap-2">
        <span className="text-3xl font-semibold tracking-tight">{latest}%</span>
        <span className="font-mono text-xs text-accent">
          {delta >= 0 ? "+" : ""}
          {delta} pts
        </span>
      </p>

      <svg
        viewBox={`0 0 ${W} ${H}`}
        className="mt-3 h-16 w-full overflow-visible"
        preserveAspectRatio="none"
      >
        <defs>
          <linearGradient id="hp-area" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="var(--accent)" stopOpacity="0.28" />
            <stop offset="100%" stopColor="var(--accent)" stopOpacity="0" />
          </linearGradient>
        </defs>
        <path d={areaPath} fill="url(#hp-area)" className="hp-fade" />
        <path
          d={linePath}
          fill="none"
          stroke="var(--accent)"
          strokeWidth="2"
          strokeLinejoin="round"
          strokeLinecap="round"
          vectorEffect="non-scaling-stroke"
          pathLength={1}
          className="hp-draw"
        />
        <circle
          cx={lastX}
          cy={lastY}
          r="3.5"
          fill="var(--accent)"
          stroke="var(--card)"
          strokeWidth="2"
          vectorEffect="non-scaling-stroke"
          className="hp-fade"
        />
      </svg>

      <div className="mt-5 flex items-center justify-between">
        <p className="font-mono text-[11px] uppercase tracking-widest text-muted">
          Pickups · 7d
        </p>
        <p className="font-mono text-[11px] text-muted">
          {bars.reduce((a, b) => a + b, 0)} total
        </p>
      </div>
      <div className="mt-2 flex h-10 items-end gap-1.5">
        {bars.map((v, i) => (
          <span
            key={i}
            className={`hp-grow flex-1 rounded-sm ${
              v === maxBar ? "bg-accent" : "bg-accent-soft"
            }`}
            style={{
              height: `${(v / maxBar) * 100}%`,
              animationDelay: `${0.6 + i * 0.06}s`,
            }}
          />
        ))}
      </div>
    </div>
  );
}
