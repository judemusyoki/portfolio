import Image from "next/image";
import Link from "next/link";
import type { Project } from "@/content/projects";
import { Chip } from "@/components/Chip";

export function ProjectCard({
  project,
  eager = false,
}: {
  project: Project;
  /** Load the card image immediately. Use for cards above the fold (LCP candidates). */
  eager?: boolean;
}) {
  const image = project.cardImage ?? project.images[0];
  return (
    <article className="overflow-hidden rounded-xl border border-border bg-card transition-colors hover:border-muted">
      {image && (
        <Link href={`/projects/${project.slug}`} tabIndex={-1} aria-hidden="true">
          <Image
            src={image.src}
            alt={image.alt}
            width={1600}
            height={1000}
            loading={eager ? "eager" : "lazy"}
            className="border-b border-border"
          />
        </Link>
      )}
      <div className="flex flex-col gap-4 p-6">
        <h3 className="text-xl font-semibold">
          <Link
            href={`/projects/${project.slug}`}
            className="transition-colors hover:text-accent"
          >
            {project.title}
          </Link>
        </h3>
        <p className="flex gap-3 text-sm leading-snug">
          <span className="shrink-0 pt-0.5 font-mono text-[11px] uppercase tracking-widest text-accent">
            Result
          </span>
          <span className="font-medium">{project.outcome}</span>
        </p>
        <p className="text-sm leading-relaxed text-muted">{project.summary}</p>
        <ul className="flex flex-wrap gap-2" aria-label="Technologies used">
          {project.stack.slice(0, 5).map((tech) => (
            <li key={tech}>
              <Chip label={tech} />
            </li>
          ))}
        </ul>
        <p className="flex flex-wrap items-center gap-4 pt-1 text-sm font-medium">
          <Link
            href={`/projects/${project.slug}`}
            className="text-accent hover:underline"
          >
            Case study →
          </Link>
          {project.links.demo && (
            <a
              href={project.links.demo}
              target="_blank"
              rel="noopener noreferrer"
              className="text-muted transition-colors hover:text-foreground"
            >
              Live demo ↗
            </a>
          )}
        </p>
      </div>
    </article>
  );
}
