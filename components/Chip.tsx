export function Chip({
  label,
  variant = "accent",
}: {
  label: string;
  variant?: "accent" | "neutral";
}) {
  const styles =
    variant === "neutral"
      ? "border border-border bg-background text-foreground"
      : "bg-accent-soft text-accent";
  return (
    <span className={`rounded-full px-3 py-1 font-mono text-xs ${styles}`}>
      {label}
    </span>
  );
}
