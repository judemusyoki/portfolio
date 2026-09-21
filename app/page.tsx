import { site, services, about } from "@/content/site";
import { projects, experience, currentRole } from "@/content/projects";
import { ProjectCard } from "@/components/ProjectCard";
import { Section } from "@/components/Section";
import { Chip } from "@/components/Chip";
import { CopyEmailButton } from "@/components/CopyEmailButton";

export default function Home() {
  return (
    <>
      {/* Hero */}
      <section aria-label="Introduction" className="py-20 sm:py-28">
        <div className="mx-auto max-w-5xl px-4 sm:px-6">
          <p className="mb-6 inline-flex items-center gap-2 rounded-full border border-border px-3 py-1 text-xs text-muted">
            <span
              className="h-2 w-2 rounded-full bg-accent"
              aria-hidden="true"
            />
            {site.availability}
          </p>
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
          <p className="mt-6 flex flex-wrap gap-5 text-sm text-muted">
            <a
              href={site.github}
              target="_blank"
              rel="noopener noreferrer"
              className="transition-colors hover:text-foreground"
            >
              GitHub ↗
            </a>
            {site.linkedin && (
              <a
                href={site.linkedin}
                target="_blank"
                rel="noopener noreferrer"
                className="transition-colors hover:text-foreground"
              >
                LinkedIn ↗
              </a>
            )}
            {site.resumeUrl && (
              <a
                href={site.resumeUrl}
                className="transition-colors hover:text-foreground"
              >
                Resume (PDF) ↗
              </a>
            )}
          </p>
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

      {/* About */}
      <Section id="about" title="About">
        <div className="max-w-2xl space-y-4 leading-relaxed text-muted">
          {about.map((paragraph) => (
            <p key={paragraph.slice(0, 32)}>{paragraph}</p>
          ))}
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
