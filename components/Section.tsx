import type { ReactNode } from "react";

export function Section({
  id,
  title,
  children,
}: {
  id: string;
  title: string;
  children: ReactNode;
}) {
  return (
    <section id={id} aria-labelledby={`${id}-heading`} className="py-16 sm:py-20">
      <div className="mx-auto max-w-5xl px-4 sm:px-6">
        <h2
          id={`${id}-heading`}
          className="mb-8 font-mono text-sm font-semibold uppercase tracking-widest text-accent"
        >
          {title}
        </h2>
        {children}
      </div>
    </section>
  );
}
