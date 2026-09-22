import type { CSSProperties } from "react";
import { site, services, workflow, about } from "@/content/site";
import { projects, experience, currentRole } from "@/content/projects";
import { skills, type SkillIcon } from "@/content/skills";
import {
  GitHubIcon,
  LinkedInIcon,
  MailIcon,
  FileTextIcon,
  BarChartIcon,
  MapPinIcon,
  LayoutIcon,
  DatabaseIcon,
} from "@/components/Icons";
import { ProjectCard } from "@/components/ProjectCard";
import { Section } from "@/components/Section";
import { Chip } from "@/components/Chip";
import { CopyEmailButton } from "@/components/CopyEmailButton";
import { HeroPanel } from "@/components/HeroPanel";
import { HeroMap } from "@/components/HeroMap";

const skillIcons: Record<SkillIcon, typeof BarChartIcon> = {
  chart: BarChartIcon,
  map: MapPinIcon,
  layout: LayoutIcon,
  database: DatabaseIcon,
};

const iconLinkClass =
  "rounded-md p-1 text-muted transition-colors hover:text-foreground";

export default function Home() {
  return (
    <>
      {/* Hero */}
      <section aria-label="Introduction" className="py-20 sm:py-28">
        <div className="mx-auto grid max-w-5xl gap-12 px-4 sm:px-6 lg:grid-cols-[minmax(0,1fr)_20rem] lg:items-center">
          <div>
            <div className="mb-6 flex flex-wrap items-center gap-x-4 gap-y-2">
              <p className="inline-flex items-center gap-2 rounded-full border border-border px-3 py-1 text-xs text-muted">
                <span
                  className="h-2 w-2 rounded-full bg-accent"
                  aria-hidden="true"
                />
                {site.availability}
              </p>
              <p className="inline-flex items-center gap-1.5 font-mono text-xs text-muted">
                <MapPinIcon size={14} />
                Based in {site.location.based} · from {site.location.from}
              </p>
            </div>
            <h1 className="text-4xl font-bold tracking-tight sm:text-6xl">
              {site.name}
            </h1>
            <p className="mt-3 text-lg font-medium text-accent sm:text-xl">
              {site.role} — {site.niche}
            </p>
            <p className="mt-6 max-w-2xl text-base leading-relaxed text-muted sm:text-lg">
              {site.tagline} Currently building B2B IoT products at{" "}
              <a
                href={currentRole.companyUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="text-foreground underline decoration-accent underline-offset-4 hover:text-accent"
              >
                {currentRole.company}
              </a>
              .
            </p>
            <div className="mt-8 flex flex-wrap items-center gap-4">
              <a
                href={`mailto:${site.email}?subject=Project%20inquiry`}
                className="rounded-md bg-accent px-5 py-2.5 text-sm font-semibold text-accent-contrast transition-opacity hover:opacity-90"
              >
                Hire me for a project
              </a>
              <a
                href="#projects"
                className="rounded-md border border-border px-5 py-2.5 text-sm font-semibold transition-colors hover:border-muted"
              >
                View my work
              </a>
            </div>
            <p className="mt-6 flex items-center gap-3">
              <a
                href={site.github}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="GitHub"
                title="GitHub"
                className={iconLinkClass}
              >
                <GitHubIcon size={22} />
              </a>
              {site.linkedin && (
                <a
                  href={site.linkedin}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="LinkedIn"
                  title="LinkedIn"
                  className={iconLinkClass}
                >
                  <LinkedInIcon size={22} />
                </a>
              )}
              <a
                href={`mailto:${site.email}`}
                aria-label="Email"
                title="Email"
                className={iconLinkClass}
              >
                <MailIcon size={22} />
              </a>
              {site.resumeUrl && (
                <a
                  href={site.resumeUrl}
                  aria-label="Resume (PDF)"
                  title="Resume (PDF)"
                  className={iconLinkClass}
                >
                  <FileTextIcon size={22} />
                </a>
              )}
            </p>
          </div>
          {site.heroVisual === "map" && <HeroMap className="hidden lg:block" />}
          {site.heroVisual === "sparkline" && (
            <HeroPanel className="hidden lg:block" />
          )}
        </div>
      </section>

      {/* Projects */}
      <Section id="projects" title="Selected Projects">
        <div className="grid gap-8 md:grid-cols-2">
          {projects.map((project, index) => (
            <ProjectCard
              key={project.slug}
              project={project}
              eager={index < 2}
            />
          ))}
        </div>
      </Section>

      {/* Experience */}
      <Section id="experience" title="Experience">
        <div className="space-y-6">
          {experience.map((role) => (
            <article
              key={`${role.company}-${role.period}`}
              className="rounded-xl border border-border bg-card p-6 sm:p-8"
            >
              <div className="flex flex-wrap items-baseline justify-between gap-2">
                <h3 className="text-xl font-semibold">
                  {role.title} ·{" "}
                  {role.companyUrl ? (
                    <a
                      href={role.companyUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-accent hover:underline"
                    >
                      {role.company}
                    </a>
                  ) : (
                    <span className="text-accent">{role.company}</span>
                  )}
                </h3>
                <p className="font-mono text-xs text-muted">{role.period}</p>
              </div>
              <p className="mt-4 leading-relaxed text-muted">{role.intro}</p>
              <ul className="mt-4 list-disc space-y-2 pl-5 text-sm leading-relaxed text-muted">
                {role.bullets.map((bullet) => (
                  <li key={bullet}>{bullet}</li>
                ))}
              </ul>
              <ul
                className="mt-6 flex flex-wrap gap-2"
                aria-label={`Technologies used at ${role.company}`}
              >
                {role.stack.map((tech) => (
                  <li key={tech}>
                    <Chip label={tech} />
                  </li>
                ))}
              </ul>
            </article>
          ))}
        </div>
      </Section>

      {/* Skills */}
      <Section id="skills" title="Toolkit">
        <p className="mb-8 max-w-2xl leading-relaxed text-muted">
          Grouped by the kind of problem you bring, not by language. Everything
          here has shipped in a case study or a role above.
        </p>
        <div className="grid gap-6 md:grid-cols-2">
          {skills.map((group) => {
            const Icon = skillIcons[group.icon];
            return (
              <article
                key={group.title}
                style={
                  {
                    "--tone": `var(--tone-${group.tone})`,
                    borderColor:
                      "color-mix(in srgb, var(--tone) 35%, var(--border))",
                  } as CSSProperties
                }
                className="rounded-xl border bg-card p-6 sm:p-8"
              >
                <div className="flex items-center gap-3">
                  <span
                    aria-hidden="true"
                    className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg"
                    style={{
                      color: "var(--tone)",
                      backgroundColor:
                        "color-mix(in srgb, var(--tone) 12%, transparent)",
                    }}
                  >
                    <Icon />
                  </span>
                  <h3 className="text-lg font-semibold">{group.title}</h3>
                </div>
                {group.rows.map((row) => (
                  <div key={row.label} className="mt-5">
                    <p className="font-mono text-[11px] uppercase tracking-widest text-muted">
                      {row.label}
                    </p>
                    <ul
                      className="mt-2 flex flex-wrap gap-2"
                      aria-label={`${group.title}: ${row.label}`}
                    >
                      {row.items.map((item) => (
                        <li key={item}>
                          <Chip label={item} variant="neutral" />
                        </li>
                      ))}
                    </ul>
                  </div>
                ))}
              </article>
            );
          })}
        </div>
      </Section>

      {/* Services */}
      <Section id="services" title="How I Can Help">
        <div className="grid gap-4 sm:grid-cols-2">
          {services.map((service) => (
            <div
              key={service.title}
              className="rounded-xl border border-border bg-card p-5"
            >
              <h3 className="font-semibold">{service.title}</h3>
              <p className="mt-2 text-sm leading-relaxed text-muted">
                {service.body}
              </p>
            </div>
          ))}
        </div>
        <h3 className="mt-12 font-mono text-sm font-semibold uppercase tracking-widest text-muted">
          How we&apos;d work together
        </h3>
        <ol className="mt-6 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {workflow.map((item, index) => (
            <li key={item.step} className="flex gap-4 sm:block">
              <span
                aria-hidden="true"
                className="font-mono text-2xl font-semibold text-accent sm:block"
              >
                {String(index + 1).padStart(2, "0")}
              </span>
              <div className="sm:mt-3">
                <h4 className="font-semibold">{item.step}</h4>
                <p className="mt-1 text-sm leading-relaxed text-muted">
                  {item.body}
                </p>
              </div>
            </li>
          ))}
        </ol>
      </Section>

      {/* About */}
      <Section id="about" title="About">
        <div className="max-w-2xl space-y-4 leading-relaxed text-muted">
          {about.map((paragraph) => (
            <p key={paragraph.slice(0, 32)}>{paragraph}</p>
          ))}
        </div>
      </Section>

      {/* Contact */}
      <Section id="contact" title="Contact">
        <div className="max-w-2xl">
          <h3 className="text-2xl font-semibold sm:text-3xl">
            Have a project or a role in mind?
          </h3>
          <p className="mt-4 leading-relaxed text-muted">
            The best way to reach me is email — I reply within a day. Whether
            it&apos;s a freelance dashboard build or a full-time role, I&apos;d
            love to hear about it.
          </p>
          <div className="mt-6 flex flex-wrap items-center gap-3">
            <a
              href={`mailto:${site.email}`}
              className="font-mono text-base text-accent hover:underline sm:text-lg"
            >
              {site.email}
            </a>
            <CopyEmailButton email={site.email} />
          </div>
        </div>
      </Section>
    </>
  );
}
