"use client";

import { useSyncExternalStore } from "react";
import { site } from "@/content/site";

const formatter = new Intl.DateTimeFormat("en-GB", {
  hour: "2-digit",
  minute: "2-digit",
  timeZone: site.timeZone,
});

const zoneFormatter = new Intl.DateTimeFormat("en-GB", {
  timeZone: site.timeZone,
  timeZoneName: "short",
});

function subscribe(callback: () => void) {
  const id = setInterval(callback, 10_000);
  return () => clearInterval(id);
}

function zone() {
  return zoneFormatter.formatToParts(new Date()).find((p) => p.type === "timeZoneName")?.value ?? "";
}

/**
 * Live wall-clock time in Aarhus, optionally with the zone ("CET"/"CEST").
 * Empty on the server to avoid a mismatch.
 */
export function LocalTime({ showZone = false }: { showZone?: boolean }) {
  const time = useSyncExternalStore(
    subscribe,
    () => formatter.format(new Date()),
    () => "",
  );
  return (
    <time suppressHydrationWarning className="tabular-nums">
      {time || "--:--"}
      {showZone && <span className="ml-1.5 text-muted">{time ? zone() : ""}</span>}
    </time>
  );
}
