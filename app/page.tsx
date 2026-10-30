import type { CSSProperties } from "react";
import { site, statement, stats, principles, buildProcess, workflow, focus, reasons } from "@/content/site";
import { projects, experience, earlierCareer, currentRole } from "@/content/projects";
import { skills, marquees } from "@/content/skills";
import { Section, Eyebrow } from "@/components/Section";
import { SplitWords, ScrubWords, Emphasis } from "@/components/Typography";
import { CountUp } from "@/components/CountUp";
import { LocalTime } from "@/components/LocalTime";
import { WorkRows } from "@/components/WorkRows";
import { ServicesShowcase } from "@/components/ServicesShowcase";
import { CopyEmailButton } from "@/components/CopyEmailButton";
import { ContactTrigger } from "@/components/ContactForm";
import { ArrowIcon, ArrowLink, arrowLinkClass, ArrowCircle, ghostButton, primaryButton, secondaryButton } from "@/components/Buttons";

const pad = (n: number) => String(n).padStart(2, "0");

// Every tool from the toolkit, for the strip under the hero.
const allTools = [...new Set(skills.flatMap((group) => group.items))];

function Marquee({ items, className, duration, reverse = false }: { items: string[]; className: string; duration: string; reverse?: boolean }) {
  return (
    <div aria-hidden="true" className="overflow-hidden">
      <div className={`marquee-track flex w-max ${reverse ? "reverse" : ""} ${className}`} style={{ "--marquee-duration": duration } as CSSProperties}>
        {[0, 1].map((copy) => (
          <span key={copy} className="flex shrink-0 items-center">
            {items.map((item) => (
              <span key={item} className="flex items-center whitespace-nowrap">
                {item}
                <span className="px-[0.45em] opacity-60">·</span>
              </span>
            ))}
          </span>
        ))}
      </div>
    </div>
  );
}

export default function Home() {
  return (
    <>
      {/* 01 · Intro */}
      <section id="top" data-section="Intro" aria-label="Introduction" className="relative isolate overflow-hidden">
        <div aria-hidden="true" className="dot-grid absolute inset-0 -z-10 [mask-image:radial-gradient(ellipse_90%_80%_at_50%_30%,#000_30%,transparent_100%)]" />
        <div aria-hidden="true" className="absolute -top-64 -right-48 -z-10 h-[52rem] w-[64rem] rounded-full bg-[radial-gradient(closest-side,rgb(255_91_46/0.17),transparent)]" />

        <div className="container-x flex min-h-[calc(100svh-4.25rem)] flex-col pt-28 pb-12 sm:pt-32">
          <div className="fade-up flex flex-wrap items-center justify-between gap-4" style={{ "--delay": "0.05s" } as CSSProperties}>
            <p className="inline-flex items-center gap-3 rounded-full border border-border-strong bg-background/50 px-4 py-2 text-sm backdrop-blur">
              <span className="relative flex size-2" aria-hidden="true">
                <span className="hp-pulse absolute inline-flex size-full rounded-full bg-accent" />
                <span className="relative inline-flex size-2 rounded-full bg-accent" />
              </span>
              {site.now}
            </p>
            <p className="hidden font-mono text-sm text-soft md:block">
              {site.location.based} · <LocalTime showZone />
            </p>
          </div>

          <div className="mt-auto pt-20">
            <h1 className="text-[clamp(3.25rem,9.6vw,8.75rem)] leading-[0.92] font-semibold tracking-[-0.05em]">
              <SplitWords text={site.name} />
            </h1>
            <p className="fade-up mt-5 text-[clamp(1.5rem,3.2vw,2.9rem)] leading-tight font-medium tracking-[-0.035em] text-accent-text" style={{ "--delay": "0.45s" } as CSSProperties}>
              {site.role}
            </p>
            <div className="fade-up mt-12 grid gap-10 lg:grid-cols-[minmax(0,44rem)_1fr] lg:items-end" style={{ "--delay": "0.6s" } as CSSProperties}>
              <p className="text-lg leading-relaxed text-soft text-pretty sm:text-xl">{site.tagline}</p>
              <div className="flex flex-wrap items-center gap-3 lg:justify-end">
                <a href="#work" className={primaryButton}>
                  View my work
                  <ArrowIcon className="transition-transform group-hover:translate-x-0.5" />
                </a>
                <a href="#contact" className={secondaryButton}>
                  Contact me
                </a>
                {site.resumeUrl ? (
                  <a href={site.resumeUrl} className={ghostButton}>
                    Resume
                  </a>
                ) : (
                  <a href={site.github} target="_blank" rel="noopener noreferrer" className={ghostButton}>
                    GitHub <span aria-hidden="true">↗</span>
                  </a>
                )}
              </div>
            </div>
          </div>
        </div>

        <div className="border-t border-border py-5">
          <Marquee items={allTools.map((t) => t.toUpperCase())} duration="90s" className="font-mono text-sm tracking-[0.25em] text-soft" />
        </div>
      </section>

      {/* 02 · Who I am */}
      <section id="about" data-section="Who I am" aria-labelledby="about-heading" className="border-t border-border py-28 md:py-40">
        <div className="container-x">
          <Eyebrow index={2} className="reveal">
            <span id="about-heading">Who I am</span>
          </Eyebrow>
          <ScrubWords
            text={statement}
            className="mt-8 max-w-6xl text-[clamp(1.85rem,3.9vw,3.6rem)] leading-[1.14] font-medium tracking-[-0.035em] text-pretty"
          />
          <dl className="mt-20 grid gap-x-8 gap-y-12 border-t border-border pt-12 sm:grid-cols-3">
            {stats.map((stat) => (
              <div key={stat.label} className="reveal flex flex-col">
                <dt className="order-2 mt-3 text-sm text-soft">{stat.label}</dt>
                <dd className="order-1 text-[clamp(3rem,5.5vw,4.75rem)] leading-none font-semibold tracking-[-0.05em]">
                  <CountUp value={stat.value} />
                  {stat.suffix}
                </dd>
              </div>
            ))}
          </dl>
        </div>
      </section>

      {/* 03 · Selected work */}
      <Section id="work" index={3} eyebrow="Selected work" title="Complex products, built *end to end.*" bleed>
        <WorkRows projects={projects} />
      </Section>

      {/* 04 · Services */}
      <Section id="services" index={4} eyebrow="What I do" label="Services" title="Interfaces people can use, on a frontend that *lasts.*" intro="The work I get hired for: the screens people act on, and the system underneath that keeps them working as the product grows.">
        <ServicesShowcase />
        <div className="grid gap-10 border-t border-border pt-10 lg:grid-cols-[1fr_2fr]">
          <div>
            <p className="eyebrow text-[11px] text-muted">How an engagement runs</p>
            <div className="mt-6">
              <ContactTrigger className={arrowLinkClass}>
                Start a project
                <ArrowCircle />
              </ContactTrigger>
            </div>
          </div>
          <ol className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {workflow.map((item, i) => (
              <li key={item.step} className="text-sm">
                <p className="font-mono text-xs text-accent-text">{pad(i + 1)}</p>
                <p className="mt-2 font-medium">{item.step}</p>
                <p className="mt-1.5 leading-relaxed text-muted">{item.body}</p>
              </li>
            ))}
          </ol>
        </div>
      </Section>

      {/* 05 · Philosophy */}
      <Section id="philosophy" index={5} eyebrow="Development philosophy" label="Philosophy" title="How I keep a large frontend *healthy.*">
        <ol>
          {principles.map((principle, i) => (
            <li key={principle.title} className="reveal grid gap-4 border-t border-border py-12 md:grid-cols-[7rem_1fr_1fr] md:gap-8 md:py-16">
              <span className="font-mono text-sm text-muted md:pt-3">{pad(i + 1)}</span>
              <h3 className="text-[clamp(1.75rem,3vw,2.6rem)] leading-tight font-semibold tracking-[-0.035em]">{principle.title}</h3>
              <p className="text-lg leading-relaxed text-soft text-pretty md:pt-2">{principle.body}</p>
            </li>
          ))}
        </ol>
      </Section>

      {/* 06 · Toolkit */}
      <Section id="toolkit" index={6} eyebrow="Technology ecosystem" label="Toolkit" title="The tools I reach for, and what they let me build." bleed>
        <div className="space-y-2 py-4">
          <Marquee items={marquees[0]} duration="60s" className="text-[clamp(3rem,7.4vw,6.5rem)] leading-[1.1] font-semibold tracking-[-0.05em] text-foreground/90" />
          <Marquee items={marquees[1]} duration="60s" reverse className="text-[clamp(3rem,7.4vw,6.5rem)] leading-[1.1] font-semibold tracking-[-0.05em] text-foreground/90" />
        </div>
        <ul className="container-x mt-20 grid gap-x-10 md:grid-cols-2">
          {skills.map((group, i) => (
            <li key={group.title} className="reveal grid grid-cols-[3rem_1fr] border-t border-border py-8">
              <span className="pt-1 font-mono text-xs text-muted">{pad(i + 1)}</span>
              <div>
                <h3 className="flex items-baseline justify-between gap-4 text-xl font-medium tracking-[-0.02em]">
                  {group.title}
                  {group.badge && <span className="eyebrow text-[10px] text-muted">{group.badge}</span>}
                </h3>
                <p className="mt-2 text-soft">{group.body}</p>
                <p className="mt-3 font-mono text-xs leading-relaxed text-muted">{group.items.join(" / ")}</p>
              </div>
            </li>
          ))}
        </ul>
      </Section>

      {/* 07 · Experience */}
      <Section id="experience" index={7} eyebrow="Experience" title="Where I’ve *shipped.*">
        <ol>
          {experience.map((role, i) => (
            <li key={`${role.company}-${role.period}`} className="reveal grid gap-6 border-t border-border py-12 lg:grid-cols-[16rem_1fr_1.4fr] lg:gap-10">
              <p className="flex items-center gap-3 self-start font-mono text-sm text-soft">
                {role.period}
                {i === 0 && (
                  <span className="inline-flex items-center gap-1.5 text-accent-text">
                    <span className="size-1.5 rounded-full bg-accent" aria-hidden="true" /> Now
                  </span>
                )}
              </p>
              <div>
                <h3 className="text-2xl font-semibold tracking-[-0.03em]">
                  {role.companyUrl ? (
                    <a href={role.companyUrl} target="_blank" rel="noopener noreferrer" className="hover:text-accent-text">
                      {role.company}
                    </a>
                  ) : (
                    role.company
                  )}
                </h3>
                <p className="mt-1 text-soft">{role.title}</p>
              </div>
              <div>
                <p className="leading-relaxed text-soft text-pretty">{role.intro}</p>
                <details className="group mt-5">
                  <summary className="inline-flex cursor-pointer items-center gap-3 text-sm font-medium">
                    What I shipped
                    <span aria-hidden="true" className="grid size-7 place-items-center rounded-full border border-border-strong transition-transform duration-300 group-open:rotate-45">
                      +
                    </span>
                  </summary>
                  <ul className="mt-5 space-y-3 text-sm leading-relaxed text-soft">
                    {role.bullets.map((bullet) => (
                      <li key={bullet} className="flex gap-3">
                        <span aria-hidden="true" className="mt-2.5 h-px w-3 shrink-0 bg-accent" />
                        {bullet}
                      </li>
                    ))}
                  </ul>
                  <p className="mt-5 font-mono text-xs leading-relaxed text-muted">{role.stack.join(" / ")}</p>
                </details>
              </div>
            </li>
          ))}
          <li className="reveal grid gap-6 border-y border-border py-12 lg:grid-cols-[16rem_1fr_1.4fr] lg:gap-10">
            <p className="self-start font-mono text-sm text-soft">{earlierCareer.period}</p>
            <div>
              <h3 className="text-2xl font-semibold tracking-[-0.03em]">Earlier career</h3>
              <p className="mt-1 text-soft">{earlierCareer.title}</p>
            </div>
            <div>
              <p className="leading-relaxed text-soft text-pretty">{earlierCareer.intro}</p>
              <ul className="mt-6 divide-y divide-border border-t border-border">
                {earlierCareer.roles.map((role) => (
                  <li key={role.org} className="grid gap-1 py-4 sm:grid-cols-[6.5rem_1fr] sm:gap-4">
                    <p className="font-mono text-xs text-muted sm:pt-0.5">{role.period}</p>
                    <div>
                      <p className="font-medium">
                        {role.org}
                        {role.place && <span className="text-muted"> ({role.place})</span>}
                        <span className="font-normal text-soft"> · {role.title}</span>
                      </p>
                      <p className="mt-1 text-sm leading-relaxed text-muted">{role.note}</p>
                    </div>
                  </li>
                ))}
              </ul>
            </div>
          </li>
        </ol>
      </Section>

      {/* 08 · How I build */}
      <Section id="process" index={8} eyebrow="How I build" label="Process" title="From a brief to a frontend that *holds up.*">
        <ol className="relative grid gap-12 sm:grid-cols-2 lg:grid-cols-5 lg:gap-8">
          <span aria-hidden="true" className="absolute top-[0.4rem] right-0 left-0 hidden h-px bg-border-strong lg:block" />
          <span aria-hidden="true" className="draw-x absolute top-[0.4rem] right-0 left-0 hidden h-px origin-left bg-accent lg:block" />
          {buildProcess.map((item, i) => (
            <li key={item.step} className="reveal relative">
              <span aria-hidden="true" className="relative block size-3.5 rounded-full border border-muted bg-background" />
              <p className="mt-8 font-mono text-xs text-muted">{pad(i + 1)}</p>
              <h3 className="mt-3 text-[clamp(1.4rem,1.9vw,1.75rem)] leading-tight font-semibold tracking-[-0.03em] text-balance">{item.step}</h3>
              <p className="mt-3 text-[15px] leading-relaxed text-soft text-pretty">{item.body}</p>
            </li>
          ))}
        </ol>
      </Section>

      {/* 09 · Current focus */}
      <section id="focus" data-section="Current focus" aria-labelledby="focus-heading" className="border-t border-border py-28 md:py-40">
        <div className="container-x grid gap-10 lg:grid-cols-[1fr_2fr]">
          <Eyebrow index={9} className="reveal self-start lg:pt-5">
            Current focus
          </Eyebrow>
          <div className="reveal">
            <h2 id="focus-heading" className="display-h2">
              <Emphasis text={focus.title} />
            </h2>
            <p className="mt-8 max-w-2xl text-lg leading-relaxed text-soft text-pretty">{focus.body}</p>
            <dl className="mt-12 grid gap-8 border-t border-border pt-8 sm:grid-cols-3">
              {[
                ["Role", currentRole.title],
                ["Since", focus.since],
              ].map(([term, value]) => (
                <div key={term}>
                  <dt className="eyebrow text-[11px] text-muted">{term}</dt>
                  <dd className="mt-3">{value}</dd>
                </div>
              ))}
              <div>
                <dt className="eyebrow text-[11px] text-muted">Based in</dt>
                <dd className="mt-3">
                  {site.location.based} · <span className="font-mono text-sm"><LocalTime showZone /></span>
                </dd>
              </div>
            </dl>
            <div className="mt-10">
              <ArrowLink href="#experience">See where I’ve been</ArrowLink>
            </div>
          </div>
        </div>
      </section>

      {/* 10 · Why work with me */}
      <Section id="why" index={10} eyebrow="Why work with me" title="What you can *count on.*">
        <ol className="grid gap-x-16 md:grid-cols-2">
          {reasons.map((reason, i) => (
            <li key={reason.title} className="reveal border-t border-border py-10">
              <h3 className="flex items-baseline gap-4 text-2xl font-semibold tracking-[-0.03em]">
                <span className="font-mono text-xs font-normal text-accent-text">{pad(i + 1)}</span>
                {reason.title}
              </h3>
              <p className="mt-4 max-w-lg pl-9 text-lg leading-relaxed text-soft text-pretty">{reason.body}</p>
            </li>
          ))}
        </ol>
      </Section>

      {/* 11 · Contact */}
      <section id="contact" data-section="Let’s talk" aria-labelledby="contact-heading" className="relative isolate overflow-hidden border-t border-border py-32 text-center md:py-48">
        <div aria-hidden="true" className="absolute inset-x-0 -bottom-80 -z-10 mx-auto h-[44rem] max-w-6xl rounded-full bg-[radial-gradient(closest-side,rgb(255_91_46/0.16),transparent)]" />
        <div className="container-x">
          <p className="eyebrow reveal text-muted">11 · Let’s talk</p>
          <h2 id="contact-heading" className="reveal mx-auto mt-8 max-w-6xl text-[clamp(3.25rem,9vw,8.5rem)] leading-[0.92] font-semibold tracking-[-0.055em] text-balance">
            Building something <span className="text-accent">complex?</span>
          </h2>
          <p className="reveal mx-auto mt-8 max-w-xl text-lg leading-relaxed text-soft text-pretty">
            {site.availability}. Have a project, a question or a role in mind? Send a message — I reply within a day.
          </p>
          <div className="reveal mt-12 flex flex-wrap items-center justify-center gap-3">
            <ContactTrigger className={primaryButton}>
              Start a conversation
              <ArrowIcon className="transition-transform group-hover:translate-x-0.5" />
            </ContactTrigger>
            <CopyEmailButton email={site.email} />
            {site.resumeUrl ? (
              <a href={site.resumeUrl} className={ghostButton}>
                Download resume
              </a>
            ) : (
              site.linkedin && (
                <a href={site.linkedin} target="_blank" rel="noopener noreferrer" className={ghostButton}>
                  LinkedIn <span aria-hidden="true">↗</span>
                </a>
              )
            )}
          </div>
        </div>
      </section>
    </>
  );
}
