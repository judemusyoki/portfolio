"use client";

import { useEffect } from "react";
import { site } from "@/content/site";

let greeted = false;

/** A note for whoever opens devtools. Logged once per page load. */
export function ConsoleHello() {
  useEffect(() => {
    if (greeted) return;
    greeted = true;
    console.log(
      `%c${site.name}%c\nOh hey — you opened devtools. That's my kind of person.\nThis site is static Next.js: CSS scroll-driven animations, React <ViewTransition>, no animation library.\nPress ⌘K (or Ctrl K) to get around, or say hi: ${site.email}`,
      "font: 600 20px/1.6 system-ui; color: #ff5b2e;",
      "font: 12px/1.6 ui-monospace, monospace;",
    );
  }, []);
  return null;
}
