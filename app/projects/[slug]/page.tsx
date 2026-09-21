import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { projects } from "@/content/projects";
import { Chip } from "@/components/Chip";

export function generateStaticParams() {
  return projects.map((project) => ({ slug: project.slug }));
}

export async function generateMetadata({
  params,
}: PageProps<"/projects/[slug]">): Promise<Metadata> {
  const { slug } = await params;
  const project = projects.find((p) => p.slug === slug);
  if (!project) return {};
  return {
    title: project.title,
    description: project.summary,
    openGraph: {
      title: project.title,
      description: project.tagline,
      type: "article",
    },
  };
}

function ProjectLinks({
  links,
}: {
  links: { demo?: string; demoNote?: string };
}) {
  return (
    <p className="flex flex-wrap items-center gap-4 text-sm font-medium">
      {links.demo && (
        <a
          href={links.demo}
          target="_blank"
          rel="noopener noreferrer"
          className="rounded-md bg-accent px-4 py-2 font-semibold text-accent-contrast transition-opacity hover:opacity-90"
        >
          Live demo ↗
        </a>
      )}
      {links.demoNote && <span className="text-muted">{links.demoNote}</span>}
    </p>
  );
}

export default async function ProjectPage({
  params,
}: PageProps<"/projects/[slug]">) {
  const { slug } = await params;
  const project = projects.find((p) => p.slug === slug);
  if (!project) notFound();

  const otherProject = projects.find((p) => p.slug !== slug);

  return (
    <article className="mx-auto max-w-3xl px-4 py-16 sm:px-6">
      <Link
        href="/#projects"
        className="text-sm text-muted transition-colors hover:text-foreground"
      >
        ← Back to all projects
      </Link>

      <header className="mt-8">
        <h1 className="text-3xl font-bold tracking-tight sm:text-4xl">
          {project.title}
        </h1>
        <p className="mt-3 text-lg text-accent">{project.tagline}</p>
        <ul className="mt-6 flex flex-wrap gap-2" aria-label="Technologies used">
          {project.stack.map((tech) => (
            <li key={tech}>
              <Chip label={tech} />
            </li>
          ))}
        </ul>
        <div className="mt-6">
          <ProjectLinks links={project.links} />
        </div>
      </header>

      {project.images[0] && (
        <figure className="mt-10">
          <Image
            src={project.images[0].src}
            alt={project.images[0].alt}
            width={1600}
            height={1000}
            loading="eager"
            className="rounded-xl border border-border"
          />
          {project.images[0].caption && (
            <figcaption className="mt-2 text-sm text-muted">
              {project.images[0].caption}
            </figcaption>
          )}
        </figure>
      )}

      <section className="mt-12" aria-labelledby="problem-heading">
        <h2 id="problem-heading" className="text-xl font-semibold">
          The problem
        </h2>
        {project.problem.map((paragraph) => (
          <p
            key={paragraph.slice(0, 32)}
            className="mt-4 leading-relaxed text-muted"
          >
            {paragraph}
          </p>
        ))}
      </section>

      <section className="mt-10" aria-labelledby="role-heading">
        <h2 id="role-heading" className="text-xl font-semibold">
          My role
        </h2>
        {project.role.map((paragraph) => (
          <p
            key={paragraph.slice(0, 32)}
            className="mt-4 leading-relaxed text-muted"
          >
            {paragraph}
          </p>
        ))}
      </section>

      <section className="mt-10" aria-labelledby="decisions-heading">
        <h2 id="decisions-heading" className="text-xl font-semibold">
          Key technical decisions
        </h2>
        <div className="mt-6 space-y-8">
          {project.decisions.map((decision, index) => (
            <div key={decision.heading}>
              <h3 className="font-semibold">
                <span className="mr-2 font-mono text-sm text-accent">
                  {String(index + 1).padStart(2, "0")}
                </span>
                {decision.heading}
              </h3>
              <p className="mt-2 leading-relaxed text-muted">{decision.body}</p>
            </div>
          ))}
        </div>
      </section>

      {project.images.length > 1 && (
        <section className="mt-10" aria-labelledby="screenshots-heading">
          <h2 id="screenshots-heading" className="text-xl font-semibold">
            In the app
          </h2>
          <div className="mt-6 space-y-8">
            {project.images.slice(1).map((image) => (
              <figure key={image.src}>
                <Image
                  src={image.src}
                  alt={image.alt}
                  width={1600}
                  height={1000}
                  className="rounded-xl border border-border"
                />
                {image.caption && (
                  <figcaption className="mt-2 text-sm text-muted">
                    {image.caption}
                  </figcaption>
                )}
              </figure>
            ))}
          </div>
        </section>
      )}

      <section className="mt-10" aria-labelledby="outcomes-heading">
        <h2 id="outcomes-heading" className="text-xl font-semibold">
          Outcomes
        </h2>
        <ul className="mt-4 space-y-3">
          {project.outcomes.map((outcome) => (
            <li key={outcome} className="flex gap-3 leading-relaxed text-muted">
              <span className="mt-1 text-accent" aria-hidden="true">
                ▹
              </span>
              {outcome}
            </li>
          ))}
        </ul>
      </section>

      <footer className="mt-12 border-t border-border pt-8">
        <ProjectLinks links={project.links} />
        {otherProject && (
          <p className="mt-8 text-sm text-muted">
            Next project:{" "}
            <Link
              href={`/projects/${otherProject.slug}`}
              className="font-medium text-accent hover:underline"
            >
              {otherProject.title} →
            </Link>
          </p>
        )}
      </footer>
    </article>
  );
}
