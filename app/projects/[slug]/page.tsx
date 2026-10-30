import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { projects } from "@/content/projects";
import { ProjectShot } from "@/components/ProjectShot";
import { CaseToc } from "@/components/CaseToc";
import { Eyebrow } from "@/components/Section";
import { ArrowIcon, primaryButton } from "@/components/Buttons";

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

const toc = [
  { id: "problem", label: "The problem" },
  { id: "role", label: "My role" },
  { id: "decisions", label: "Key decisions" },
  { id: "screens", label: "In the app" },
  { id: "outcomes", label: "Outcomes" },
];

function CaseSection({ id, title, children }: { id: string; title: string; children: React.ReactNode }) {
  const n = toc.findIndex((t) => t.id === id) + 1;
  return (
    <section id={id} data-section={toc[n - 1].label} aria-labelledby={`${id}-heading`} className="scroll-mt-28 border-t border-border pt-12">
      <Eyebrow index={n}>{toc[n - 1].label}</Eyebrow>
      <h2 id={`${id}-heading`} className="mt-5 text-[clamp(2rem,3.6vw,3rem)] leading-tight font-semibold tracking-[-0.04em] text-balance">
        {title}
      </h2>
      {children}
    </section>
  );
}

export default async function ProjectPage({
  params,
}: PageProps<"/projects/[slug]">) {
  const { slug } = await params;
  const index = projects.findIndex((p) => p.slug === slug);
  const project = projects[index];
  if (!project) notFound();

  const next = projects[(index + 1) % projects.length];
  const nextImage = next.cardImage ?? next.images[0];
  const subtitle = project.title.split(" — ")[1] ?? project.category;
  const hero = project.cardImage ?? project.images[0];
  const gallery = project.images.filter((image) => image.src !== hero?.src);
  const sections = gallery.length ? toc : toc.filter((t) => t.id !== "screens");

  return (
    <article className="pb-32">
      <header id="top" data-section="Overview" className="relative isolate overflow-hidden pt-32 sm:pt-40">
        <div aria-hidden="true" className="dot-grid absolute inset-0 -z-10 [mask-image:radial-gradient(ellipse_80%_70%_at_50%_0%,#000_30%,transparent_100%)]" />
        <div aria-hidden="true" className="absolute -top-72 -right-48 -z-10 h-[46rem] w-[58rem] rounded-full bg-[radial-gradient(closest-side,rgb(255_91_46/0.15),transparent)]" />
        <div className="container-x">
          <Link href="/#work" className="group inline-flex items-center gap-2 text-sm text-soft transition-colors hover:text-foreground">
            <ArrowIcon className="rotate-180 transition-transform group-hover:-translate-x-1" />
            All work
          </Link>
          <p className="eyebrow fade-up mt-12 text-muted">
            Case study <span className="text-accent-text">{String(index + 1).padStart(2, "0")}</span> / {String(projects.length).padStart(2, "0")} · {project.category}
          </p>
          <h1 className="fade-up mt-6 text-[clamp(3.25rem,9vw,8rem)] leading-[0.92] font-semibold tracking-[-0.05em]">{project.name}</h1>
          <p className="fade-up mt-4 text-[clamp(1.4rem,2.8vw,2.4rem)] leading-tight font-medium tracking-[-0.035em] text-accent-text" style={{ "--delay": "0.1s" } as React.CSSProperties}>
            {subtitle}
          </p>
          <div className="fade-up mt-14 grid gap-10 border-t border-border pt-10 md:grid-cols-[1.3fr_1fr_auto]" style={{ "--delay": "0.2s" } as React.CSSProperties}>
            <p className="text-lg leading-relaxed text-soft text-pretty sm:text-xl">{project.tagline}</p>
            <div>
              <p className="eyebrow text-[11px] text-muted">Result</p>
              <p className="mt-3 leading-snug font-medium">{project.outcome}</p>
            </div>
            <div className="flex flex-col items-start gap-3 text-sm">
              {project.links.demo && (
                <a href={project.links.demo} target="_blank" rel="noopener noreferrer" className={primaryButton}>
                  Live demo
                  <ArrowIcon className="-rotate-45" />
                </a>
              )}
              {project.links.demoNote && <span className="max-w-60 leading-relaxed text-muted">{project.links.demoNote}</span>}
            </div>
          </div>
        </div>
      </header>

      {hero && (
        <figure className="container-x mt-16">
          <div className="overflow-hidden rounded-3xl border border-border bg-surface">
            <ProjectShot slug={project.slug} image={hero} eager sizes="(min-width: 1440px) 1328px, 100vw" className="w-full" />
          </div>
          {hero.caption && <figcaption className="mt-4 text-sm text-muted">{hero.caption}</figcaption>}
        </figure>
      )}

      <div className="container-x mt-28 grid gap-16 lg:grid-cols-[14rem_minmax(0,1fr)] lg:gap-20">
        <aside className="hidden lg:block">
          <div className="sticky top-28">
            <CaseToc items={sections} />
            <p className="eyebrow mt-12 text-[11px] text-muted">Stack</p>
            <p className="mt-3 font-mono text-xs leading-relaxed text-muted">{project.stack.join(" / ")}</p>
          </div>
        </aside>

        <div className="max-w-4xl space-y-28">
          <CaseSection id="problem" title="Why this needed building">
            {project.problem.map((paragraph) => (
              <p key={paragraph.slice(0, 32)} className="mt-6 text-lg leading-relaxed text-soft text-pretty">
                {paragraph}
              </p>
            ))}
          </CaseSection>

          <CaseSection id="role" title="What I did">
            {project.role.map((paragraph) => (
              <p key={paragraph.slice(0, 32)} className="mt-6 text-lg leading-relaxed text-soft text-pretty">
                {paragraph}
              </p>
            ))}
            <p className="mt-8 font-mono text-xs leading-relaxed text-muted lg:hidden">{project.stack.join(" / ")}</p>
          </CaseSection>

          <CaseSection id="decisions" title="Key technical decisions">
            <ol className="mt-10">
              {project.decisions.map((decision, i) => (
                <li key={decision.heading} className="reveal grid gap-3 border-t border-border py-10 md:grid-cols-[4rem_1fr]">
                  <span className="font-mono text-sm text-accent-text md:pt-1.5">{String(i + 1).padStart(2, "0")}</span>
                  <div>
                    <h3 className="text-2xl leading-tight font-semibold tracking-[-0.03em]">{decision.heading}</h3>
                    <p className="mt-4 leading-relaxed text-soft text-pretty">{decision.body}</p>
                  </div>
                </li>
              ))}
            </ol>
          </CaseSection>

          {gallery.length > 0 && (
            <CaseSection id="screens" title="In the app">
              <div className="mt-10 space-y-16">
                {gallery.map((image) => (
                  <figure key={image.src}>
                    <div className="clip-reveal overflow-hidden rounded-2xl border border-border bg-surface">
                      <Image src={image.src} alt={image.alt} width={1600} height={1000} sizes="(min-width: 1024px) 896px, 100vw" />
                    </div>
                    {image.caption && <figcaption className="mt-4 text-sm text-muted">{image.caption}</figcaption>}
                  </figure>
                ))}
              </div>
            </CaseSection>
          )}

          <CaseSection id="outcomes" title="What it delivered">
            <ul className="mt-10 border-b border-border">
              {project.outcomes.map((outcome) => (
                <li key={outcome} className="reveal flex gap-5 border-t border-border py-6 text-lg leading-relaxed text-pretty">
                  <span className="mt-3.5 h-px w-4 shrink-0 bg-accent" aria-hidden="true" />
                  {outcome}
                </li>
              ))}
            </ul>
          </CaseSection>
        </div>
      </div>

      {next.slug !== project.slug && (
        <nav aria-label="Next project" className="container-x mt-36">
          <Link href={`/projects/${next.slug}`} className="group grid items-center gap-10 border-t border-border pt-14 md:grid-cols-[1fr_minmax(0,26rem)]">
            <div>
              <p className="eyebrow text-[11px] text-muted">Next case study</p>
              <p className="mt-6 flex items-center gap-5 text-[clamp(2.75rem,7vw,6rem)] leading-none font-semibold tracking-[-0.05em] transition-colors group-hover:text-accent">
                {next.name}
                <span className="grid size-14 shrink-0 place-items-center rounded-full border border-border-strong transition-colors group-hover:border-accent group-hover:bg-accent group-hover:text-background sm:size-16">
                  <ArrowIcon className="size-6 transition-transform group-hover:translate-x-0.5" />
                </span>
              </p>
              <p className="mt-6 max-w-md text-soft">{next.outcome}</p>
            </div>
            {nextImage && (
              <div className="overflow-hidden rounded-2xl border border-border bg-surface">
                <ProjectShot
                  slug={next.slug}
                  image={nextImage}
                  sizes="416px"
                  className="aspect-[16/10] w-full object-cover object-top transition-transform duration-700 group-hover:scale-[1.04]"
                />
              </div>
            )}
          </Link>
        </nav>
      )}
    </article>
  );
}
