"use client";

import { useEffect, useId, useMemo, useRef, useState } from "react";
import { useRouter } from "next/navigation";
import { site, nav } from "@/content/site";
import { projects } from "@/content/projects";
import { openContact } from "@/components/ContactForm";

/** Dispatch on window to open the palette from anywhere. */
export const OPEN_PALETTE_EVENT = "palette:open";

type Command = {
  id: string;
  group: "Go to" | "Case studies" | "Actions";
  label: string;
  hint?: string;
  run: () => void;
};

/**
 * ⌘K / Ctrl+K palette on a native <dialog> (focus trap, Esc and inert
 * background for free). Listbox pattern: focus stays in the input and
 * aria-activedescendant points at the highlighted option.
 */
export function CommandPalette() {
  const router = useRouter();
  const dialogRef = useRef<HTMLDialogElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  const [query, setQuery] = useState("");
  const [active, setActive] = useState(0);
  const [toast, setToast] = useState("");
  const listId = useId();

  const commands = useMemo<Command[]>(() => {
    const go = (href: string) => () => router.push(href);
    return [
      ...nav.map((item) => ({
        id: `nav-${item.href}`,
        group: "Go to" as const,
        label: item.label,
        run: go(item.href),
      })),
      ...projects.map((project) => ({
        id: `project-${project.slug}`,
        group: "Case studies" as const,
        label: project.name,
        hint: project.outcome,
        run: go(`/projects/${project.slug}`),
      })),
      {
        id: "copy-email",
        group: "Actions",
        label: "Copy email address",
        hint: site.email,
        run: () => {
          navigator.clipboard?.writeText(site.email).then(
            () => setToast("Email copied ✓"),
            () => setToast(site.email),
          );
        },
      },
      {
        id: "message",
        group: "Actions",
        label: "Send me a message",
        run: () => openContact(),
      },
      {
        id: "github",
        group: "Actions",
        label: "Open GitHub",
        run: () => window.open(site.github, "_blank", "noopener"),
      },
      ...(site.linkedin
        ? [
            {
              id: "linkedin",
              group: "Actions" as const,
              label: "Open LinkedIn",
              run: () => window.open(site.linkedin, "_blank", "noopener"),
            },
          ]
        : []),
    ];
  }, [router]);

  const results = useMemo(() => {
    const q = query.trim().toLowerCase();
    if (!q) return commands;
    return commands.filter((c) =>
      `${c.group} ${c.label} ${c.hint ?? ""}`.toLowerCase().includes(q),
    );
  }, [commands, query]);

  useEffect(() => {
    function open() {
      const dialog = dialogRef.current;
      if (!dialog || dialog.open) return;
      setQuery("");
      setActive(0);
      setToast("");
      dialog.showModal();
    }
    function onKey(event: KeyboardEvent) {
      if (event.key.toLowerCase() === "k" && (event.metaKey || event.ctrlKey)) {
        event.preventDefault();
        if (dialogRef.current?.open) dialogRef.current.close();
        else open();
      }
    }
    window.addEventListener(OPEN_PALETTE_EVENT, open);
    window.addEventListener("keydown", onKey);
    return () => {
      window.removeEventListener(OPEN_PALETTE_EVENT, open);
      window.removeEventListener("keydown", onKey);
    };
  }, []);

  function execute(command: Command | undefined) {
    if (!command) return;
    command.run();
    // Keep the dialog open for the copy action so the confirmation is visible.
    if (command.id !== "copy-email") dialogRef.current?.close();
  }

  function onInputKey(event: React.KeyboardEvent<HTMLInputElement>) {
    if (event.key === "ArrowDown") {
      event.preventDefault();
      setActive((i) => (i + 1) % Math.max(results.length, 1));
    } else if (event.key === "ArrowUp") {
      event.preventDefault();
      setActive((i) => (i - 1 + results.length) % Math.max(results.length, 1));
    } else if (event.key === "Enter") {
      event.preventDefault();
      execute(results[active]);
    }
  }

  const activeId = results[active] ? `${listId}-${results[active].id}` : undefined;
  let lastGroup = "";

  return (
    <dialog
      ref={dialogRef}
      aria-label="Command palette"
      onClick={(event) => {
        // Clicks on the backdrop land on the <dialog> element itself.
        if (event.target === event.currentTarget) event.currentTarget.close();
      }}
      className="palette m-auto mt-[12vh] w-[min(36rem,calc(100vw-2rem))] overflow-hidden rounded-2xl border border-border bg-surface p-0 text-foreground shadow-2xl backdrop:bg-black/60 backdrop:backdrop-blur-sm"
    >
      <div className="flex items-center gap-3 border-b border-border px-4">
        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="shrink-0 text-muted" aria-hidden="true">
          <circle cx="11" cy="11" r="7" />
          <path d="m20 20-3.5-3.5" />
        </svg>
        <input
          ref={inputRef}
          value={query}
          onChange={(event) => {
            setQuery(event.target.value);
            setActive(0);
          }}
          onKeyDown={onInputKey}
          placeholder="Jump to a project, copy my email…"
          role="combobox"
          aria-expanded="true"
          aria-controls={listId}
          aria-activedescendant={activeId}
          aria-autocomplete="list"
          className="h-14 w-full bg-transparent text-base outline-none placeholder:text-muted focus-visible:outline-none"
        />
        <kbd className="shrink-0 rounded border border-border px-1.5 font-mono text-[11px] text-muted">
          esc
        </kbd>
      </div>
      <ul
        id={listId}
        role="listbox"
        aria-label="Commands"
        className="max-h-[min(24rem,60vh)] overflow-y-auto p-2"
      >
        {results.length === 0 && (
          <li className="px-3 py-8 text-center text-sm text-muted">
            No matches. Try “map”, “email” or “Chanzo”.
          </li>
        )}
        {results.map((command, index) => {
          const header = command.group !== lastGroup ? command.group : null;
          lastGroup = command.group;
          return (
            <li key={command.id} role="presentation">
              {header && (
                <p
                  role="presentation"
                  className="px-3 pt-3 pb-1 font-mono text-[11px] uppercase tracking-widest text-muted"
                >
                  {header}
                </p>
              )}
              <div
                id={`${listId}-${command.id}`}
                role="option"
                aria-selected={index === active}
                onMouseMove={() => setActive(index)}
                onClick={() => execute(command)}
                className="flex cursor-pointer items-baseline justify-between gap-4 rounded-lg px-3 py-2.5 text-sm aria-selected:bg-accent-soft aria-selected:text-accent-text"
              >
                <span className="truncate">{command.label}</span>
                {command.hint && (
                  <span className="hidden max-w-[50%] truncate font-mono text-[11px] text-muted sm:inline">
                    {command.hint}
                  </span>
                )}
              </div>
            </li>
          );
        })}
      </ul>
      <p
        aria-live="polite"
        className="flex items-center justify-between border-t border-border px-4 py-2 font-mono text-[11px] text-muted"
      >
        <span>{toast || "↑↓ to move · ↵ to select"}</span>
        <span>{results.length} results</span>
      </p>
    </dialog>
  );
}
