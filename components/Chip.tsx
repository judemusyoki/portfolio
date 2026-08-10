export function Chip({ label }: { label: string }) {
  return (
    <span className="rounded-full bg-accent-soft px-3 py-1 font-mono text-xs text-accent">
      {label}
    </span>
  );
}
