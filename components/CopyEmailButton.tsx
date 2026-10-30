"use client";

import { useState } from "react";
import { secondaryButton } from "@/components/Buttons";

/** Outline pill showing the address; clicking copies it. */
export function CopyEmailButton({ email }: { email: string }) {
  const [copied, setCopied] = useState(false);

  async function copy() {
    try {
      await navigator.clipboard.writeText(email);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      // clipboard unavailable — the email is still visible as text
    }
  }

  return (
    <button type="button" onClick={copy} className={secondaryButton} aria-live="polite" title="Copy email address">
      {copied ? "Copied to clipboard ✓" : email}
    </button>
  );
}
