import Link from "next/link";

export default function NotFound() {
  return (
    <div className="mx-auto flex max-w-5xl flex-col items-start gap-4 px-4 py-24 sm:px-6">
      <p className="font-mono text-sm text-accent">404</p>
      <h1 className="text-3xl font-bold tracking-tight">Page not found</h1>
      <p className="text-muted">
        That page doesn&apos;t exist — but the projects do.
      </p>
      <Link
        href="/"
        className="mt-2 rounded-md border border-border px-4 py-2 text-sm font-semibold transition-colors hover:border-muted"
      >
        ← Back home
      </Link>
    </div>
  );
}
