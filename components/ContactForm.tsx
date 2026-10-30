"use client";

import { useActionState, useEffect, useId, useRef, type ReactNode } from "react";
import { sendMessage, type ContactState } from "@/app/actions/contact";
import { site } from "@/content/site";
import { ArrowIcon, primaryButton } from "@/components/Buttons";

/** Dispatch on window to open the contact form from anywhere. */
export const OPEN_CONTACT_EVENT = "contact:open";

export function openContact() {
  window.dispatchEvent(new Event(OPEN_CONTACT_EVENT));
}

/** Any button or link-looking element that opens the form. */
export function ContactTrigger({ className, children }: { className?: string; children: ReactNode }) {
  return (
    <button type="button" onClick={openContact} className={className}>
      {children}
    </button>
  );
}

const field =
  "w-full rounded-xl border border-border-strong bg-background px-4 py-3 text-foreground placeholder:text-muted focus-visible:border-accent focus-visible:outline-none";
const label = "eyebrow text-[11px] text-muted";

const initial: ContactState = { status: "idle" };

/**
 * Contact form in a native <dialog> (focus trap and Esc for free). Submits
 * through the sendMessage server action; the dialog stays open to show the
 * result. Opens on OPEN_CONTACT_EVENT.
 */
export function ContactForm() {
  const dialogRef = useRef<HTMLDialogElement>(null);
  const formRef = useRef<HTMLFormElement>(null);
  const [state, action, pending] = useActionState(sendMessage, initial);
  const id = useId();

  useEffect(() => {
    function open() {
      const dialog = dialogRef.current;
      if (dialog && !dialog.open) dialog.showModal();
    }
    window.addEventListener(OPEN_CONTACT_EVENT, open);
    return () => window.removeEventListener(OPEN_CONTACT_EVENT, open);
  }, []);

  const close = () => dialogRef.current?.close();
  const sent = state.status === "sent";

  return (
    <dialog
      ref={dialogRef}
      aria-labelledby={`${id}-title`}
      onClick={(event) => {
        if (event.target === event.currentTarget) close();
      }}
      className="palette m-auto w-[min(34rem,calc(100vw-2rem))] rounded-2xl border border-border bg-surface p-0 text-foreground shadow-2xl backdrop:bg-black/60 backdrop:backdrop-blur-sm"
    >
      <div className="p-6 sm:p-8">
        <div className="flex items-start justify-between gap-6">
          <div>
            <p className={label}>{sent ? "Sent" : "Send a message"}</p>
            <h2 id={`${id}-title`} className="mt-2 text-2xl font-semibold tracking-[-0.03em]">
              {sent ? "Thanks, it’s in my inbox." : "What are you building?"}
            </h2>
          </div>
          <button type="button" onClick={close} aria-label="Close" className="grid size-9 shrink-0 place-items-center rounded-full border border-border-strong text-muted hover:text-foreground">
            <svg width="12" height="12" viewBox="0 0 12 12" stroke="currentColor" strokeWidth="1.6" aria-hidden="true">
              <path d="M1 1l10 10M11 1 1 11" />
            </svg>
          </button>
        </div>

        {sent ? (
          <div className="mt-6">
            <p className="leading-relaxed text-soft">
              I read everything and reply within a day. If it’s urgent, you can also reach me at{" "}
              <a href={`mailto:${site.email}`} className="text-foreground underline decoration-accent underline-offset-4">
                {site.email}
              </a>
              .
            </p>
            <button type="button" onClick={close} className={`${primaryButton} mt-8`}>
              Done
            </button>
          </div>
        ) : (
          <form ref={formRef} action={action} className="mt-6 space-y-5">
            <div className="grid gap-5 sm:grid-cols-2">
              <div>
                <label htmlFor={`${id}-name`} className={label}>
                  Name
                </label>
                <input id={`${id}-name`} name="name" required maxLength={120} autoComplete="name" defaultValue={state.values?.name} className={`${field} mt-2`} />
              </div>
              <div>
                <label htmlFor={`${id}-email`} className={label}>
                  Email
                </label>
                <input id={`${id}-email`} name="email" type="email" required maxLength={254} autoComplete="email" defaultValue={state.values?.email} className={`${field} mt-2`} />
              </div>
            </div>
            <div>
              <label htmlFor={`${id}-message`} className={label}>
                Message
              </label>
              <textarea
                id={`${id}-message`}
                name="message"
                required
                rows={5}
                maxLength={4000}
                defaultValue={state.values?.message}
                placeholder="A project, a question or a role — whatever you have in mind."
                className={`${field} mt-2 resize-y`}
              />
            </div>
            {/* Honeypot: hidden from people, filled by bots. */}
            <div className="absolute -left-[9999px] h-0 w-0 overflow-hidden" aria-hidden="true">
              <label htmlFor={`${id}-company`}>Company</label>
              <input id={`${id}-company`} name="company" tabIndex={-1} autoComplete="off" />
            </div>
            {state.status === "error" && (
              <p role="alert" className="text-sm leading-relaxed text-accent-text">
                {state.message}
              </p>
            )}
            <div className="flex flex-wrap items-center justify-between gap-4 pt-2">
              <button type="submit" disabled={pending} className={`${primaryButton} disabled:opacity-60`}>
                {pending ? "Sending…" : "Send message"}
                {!pending && <ArrowIcon className="transition-transform group-hover:translate-x-0.5" />}
              </button>
              <a href={`mailto:${site.email}`} className="text-sm text-muted underline-offset-4 hover:text-foreground hover:underline">
                Or email me directly
              </a>
            </div>
          </form>
        )}
      </div>
    </dialog>
  );
}
