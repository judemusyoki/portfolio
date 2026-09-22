import Link from "next/link";
import { ThemeToggle } from "@/components/ThemeToggle";

const nav = [
  { href: "/#projects", label: "Projects" },
  { href: "/#experience", label: "Experience" },
  { href: "/#skills", label: "Skills" },
  { href: "/#about", label: "About" },
  { href: "/#contact", label: "Contact" },
];

/**
 * Phone: brand + theme toggle on the first row, links on a full-width second row.
 * sm and up: single row — brand, then links, then toggle.
 */
export function Header() {
  return (
    <header className="sticky top-0 z-40 border-b border-border bg-background/80 backdrop-blur">
      <div className="mx-auto flex max-w-5xl flex-wrap items-center justify-between gap-y-1 px-4 py-3 sm:px-6">
        <Link
          href="/"
          className="font-mono text-sm font-semibold tracking-tight text-foreground"
        >
          jude<span className="text-accent">.</span>musyoki
        </Link>
        <div className="sm:order-3 sm:ml-2">
          <ThemeToggle />
        </div>
        <nav
          aria-label="Main"
          className="order-3 flex w-full items-center gap-0.5 sm:order-2 sm:ml-auto sm:w-auto sm:gap-2"
        >
          {nav.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className="rounded-md px-1.5 py-1.5 text-xs text-muted transition-colors hover:text-foreground sm:px-3 sm:text-sm"
            >
              {item.label}
            </Link>
          ))}
        </nav>
      </div>
    </header>
  );
}
