import Link from "next/link";
import { MobileMenu } from "@/components/MobileMenu";
import { nav, site } from "@/content/site";

/** The circled initials, shared by the header and the mobile menu. */
export function Monogram() {
  return (
    <Link href="/" aria-label={`${site.name} — home`} className="flex items-center gap-3">
      <span className="grid size-10 place-items-center rounded-full border border-border-strong bg-background/60 text-[0.8rem] font-semibold tracking-tight backdrop-blur-xl">
        {site.initials}
      </span>
      <span className="hidden text-sm font-medium sm:inline">{site.name}</span>
    </Link>
  );
}

/**
 * Fixed, transparent header: initials on the left, a pill of section links on
 * the right (lg+), "Menu" below that. SectionRail marks the current link.
 */
export function Header() {
  return (
    <header className="pointer-events-none fixed inset-x-0 top-0 z-40 before:absolute before:inset-x-0 before:top-0 before:-z-10 before:h-24 before:bg-gradient-to-b before:from-background/90 before:to-transparent">
      <div className="flex items-center justify-between px-5 py-4 sm:px-8 sm:py-4 lg:px-10">
        <div className="pointer-events-auto">
          <Monogram />
        </div>
        <nav aria-label="Main" className="pointer-events-auto hidden rounded-full border border-border-strong bg-background/60 px-2 py-1.5 backdrop-blur-xl lg:block">
          <ul className="flex items-center">
            {nav.map((item) => (
              <li key={item.href}>
                <Link
                  href={item.href}
                  className="flex items-center gap-2 rounded-full px-4 py-1.5 text-sm transition-colors hover:text-accent-text aria-[current]:before:size-1.5 aria-[current]:before:rounded-full aria-[current]:before:bg-accent aria-[current]:before:content-['']"
                >
                  {item.label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>
        <div className="pointer-events-auto lg:hidden">
          <MobileMenu />
        </div>
      </div>
    </header>
  );
}
