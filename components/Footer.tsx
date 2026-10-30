import Link from "next/link";
import { nav, site } from "@/content/site";
import { projects } from "@/content/projects";
import { LocalTime } from "@/components/LocalTime";
import { ProximityName } from "@/components/ProximityName";

const heading = "eyebrow text-[11px] text-muted";
const link = "text-soft transition-colors hover:text-foreground";

function External({ href, children }: { href: string; children: string }) {
  return (
    <a href={href} target="_blank" rel="noopener noreferrer" className={`${link} inline-flex items-center gap-1.5`}>
      {children}
      <span aria-hidden="true" className="text-xs">↗</span>
    </a>
  );
}

export function Footer() {
  return (
    <footer className="overflow-hidden border-t border-border bg-surface">
      <div className="container-x grid gap-14 pt-24 pb-16 lg:grid-cols-[1.6fr_1fr_1fr]">
        <div>
          <p className={heading}>Let’s talk</p>
          <a
            href={`mailto:${site.email}`}
            className="mt-5 inline-block text-[clamp(1.5rem,3vw,2.5rem)] font-semibold tracking-[-0.03em] break-all transition-colors hover:text-accent-text"
          >
            {site.email}
          </a>
          <p className="mt-5 max-w-sm leading-relaxed text-soft">
            Open to freelance dashboard builds and senior frontend roles. Email is quickest; I reply within a day.
          </p>
        </div>
        <div className="grid grid-cols-2 gap-10 sm:grid-cols-2 lg:contents">
          <nav aria-label="Footer">
            <p className={heading}>Navigate</p>
            <ul className="mt-5 space-y-3">
              {nav.map((item) => (
                <li key={item.href}>
                  <Link href={item.href} className={link}>
                    {item.label}
                  </Link>
                </li>
              ))}
              {projects.map((project) => (
                <li key={project.slug}>
                  <Link href={`/projects/${project.slug}`} className={link}>
                    {project.name}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>
          <div>
            <p className={heading}>Elsewhere</p>
            <ul className="mt-5 space-y-3">
              <li>
                <External href={site.github}>GitHub</External>
              </li>
              {site.linkedin && (
                <li>
                  <External href={site.linkedin}>LinkedIn</External>
                </li>
              )}
              {site.resumeUrl && (
                <li>
                  <a href={site.resumeUrl} className={link}>
                    Resume (PDF)
                  </a>
                </li>
              )}
              <li className="hidden font-mono text-xs text-muted lg:block">
                Press <kbd className="rounded border border-border-strong px-1">⌘K</kbd> to jump anywhere
              </li>
            </ul>
            <p className="mt-10 text-soft">{site.location.based}</p>
            <p className="mt-1 font-mono text-sm">
              <LocalTime showZone />
            </p>
          </div>
        </div>
      </div>

      {/* Sized by the container, not the viewport, so the name never outgrows the gutter. */}
      <div className="container-x @container">
        <ProximityName
          text={site.name.toUpperCase().replace(" ", "")}
          className="justify-between text-[14cqw] leading-[0.86] font-semibold tracking-[-0.05em] whitespace-nowrap"
        />
      </div>

      <div className="container-x mt-10 flex flex-col gap-4 border-t border-border py-8 text-sm text-muted sm:flex-row sm:items-center sm:justify-between">
        <p>
          © {new Date().getFullYear()} {site.name}. Designed and built by me.
        </p>
        <div className="flex items-center gap-6">
          <p className="hidden md:block">Next.js · Tailwind CSS · no animation library</p>
          <a href="#top" className="inline-flex items-center gap-2 text-foreground hover:text-accent-text">
            Back to top <span aria-hidden="true">↑</span>
          </a>
        </div>
      </div>
    </footer>
  );
}
