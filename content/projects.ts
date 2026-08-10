export interface ProjectImage {
  src: string;
  alt: string;
  caption?: string;
}

export interface Project {
  slug: string;
  title: string;
  tagline: string;
  summary: string; // 2–3 sentences for the home-page card
  problem: string[];
  role: string[];
  decisions: { heading: string; body: string }[];
  outcomes: string[];
  stack: string[];
  links: { demo?: string; repo?: string; demoNote?: string };
  images: ProjectImage[];
  cardImage?: ProjectImage;
}

export const projects: Project[] = [
  {
    slug: "smartbin",
    title: "SmartBin — Waste Collection Operations",
    tagline: "Live waste-collection operations for two cities — with zero backend.",
    summary:
      "A smart-city dashboard tracking ~250 IoT bins across Nairobi and Copenhagen: a live fill-level map, two weeks of analytics, and a route planner that cuts collection distance by 30–50%. The whole thing runs on a deterministic clock-driven simulation — no backend, no database, yet every visitor sees the same live-ticking data.",
    problem: [
      "City waste teams mostly collect on fixed schedules, blind to what's actually in the bins. The result is both kinds of waste at once: trucks visiting half-empty bins, and full bins overflowing between visits. IoT fill sensors solve the sensing half — but the data is only useful if dispatchers get a live operational picture and routes that react to it.",
      "I built SmartBin to demonstrate what that operational layer looks like: live fill levels on a map, missed-pickup analytics, and optimized collection routes, for two cities with different geographies (Nairobi, ~140 bins across 10 districts; Copenhagen, ~110 bins across 8 districts).",
    ],
    role: [
      "Solo project — product design, data modelling, and the full build. The city is a URL segment, so /nairobi and /copenhagen are two complete, independently browsable deployments of the same system.",
    ],
    decisions: [
      {
        heading: "A deterministic simulation instead of a backend",
        body: "Every value in the app — fill levels, pickups, overflow events — is a pure function of the current time, computed by stateless hashing (hashRand(purpose, binId, dayIndex)). Server and client renders agree byte-for-byte, so SSR works without hydration mismatches, and two browsers opened side by side show identical live-ticking data. The payoff: a convincingly 'live' operational system with zero hosting cost, zero database, and perfectly reproducible states.",
      },
      {
        heading: "Route optimization that shows its work",
        body: "The route planner builds a collection route from the city depot with nearest-neighbour construction, then improves it with 2-opt local search. The UI draws the optimized route against the naive bin-order route on the map, with the distance saving quantified — typically 30–50% shorter.",
      },
      {
        heading: "The map as the operational home",
        body: "A Leaflet map with marker clustering is the landing view: every bin colored by fill band, KPIs ticking every 30 seconds, so a dispatcher's first glance answers 'where is it getting critical?'",
      },
      {
        heading: "Shareable state everywhere",
        body: "The bin ledger's full view state — filters, sort, search, pagination — is URL-encoded, so any filtered view is a link a colleague can open identically. Grids export to CSV for the spreadsheet crowd.",
      },
      {
        heading: "Polish that survives a hard refresh",
        body: "Dark/light theme is cookie-persisted and applied server-side, so there is no flash of the wrong theme on first paint. Design tokens are centralized and typed, flowing through the MUI theme.",
      },
    ],
    outcomes: [
      "~250 simulated IoT bins across 2 cities, live-ticking and identical for every visitor",
      "30–50% route-distance savings vs naive bin ordering (nearest-neighbour + 2-opt)",
      "4 views: live map overview, 14-day analytics, route planner, exportable bin ledger",
      "35 Vitest unit tests covering the simulation, routing, and KPI logic",
      "Zero backend: deploys as a static-friendly Next.js app with no infrastructure cost",
    ],
    stack: [
      "Next.js 14 (App Router)",
      "TypeScript (strict)",
      "MUI 7",
      "Apache ECharts",
      "Leaflet + OpenStreetMap",
      "MUI X DataGrid",
      "Vitest",
    ],
    links: {
      repo: "https://github.com/judemusyoki/bin-ops",
      // TODO: set once deployed to Vercel, e.g. https://smartbin-ops.vercel.app
      demo: undefined,
    },
    images: [
      {
        src: "/images/smartbin/overview.webp",
        alt: "SmartBin overview: live Leaflet map of Nairobi with bins colored by fill level and KPI cards",
        caption: "Live overview — every bin colored by fill band, KPIs ticking every 30s.",
      },
      {
        src: "/images/smartbin/routes.webp",
        alt: "SmartBin route planner showing an optimized collection route on the map with distance savings",
        caption: "Route planner — optimized route vs naive ordering, savings quantified.",
      },
      {
        src: "/images/smartbin/analytics.webp",
        alt: "SmartBin analytics: 14-day fill trends, district comparison, and collection charts",
        caption: "14-day analytics — fill trends, districts, completed vs missed collections.",
      },
      {
        src: "/images/smartbin/bins.webp",
        alt: "SmartBin bin ledger: sortable, searchable data grid with CSV export",
        caption: "Bin ledger — URL-encoded view state, CSV export.",
      },
    ],
  },
  {
    slug: "nairobi-incident-dashboard",
    title: "Nairobi Incident Dashboard",
    tagline:
      "Emergency-incident analytics for Nairobi's Fire & Rescue and disaster-risk teams.",
    summary:
      "An authenticated analytics platform built on Nairobi City County fire-brigade and disaster-risk records: a clustered city-wide incident map, operational dashboards including response-time-vs-SLA performance, and a shareable data explorer — in English and Swahili.",
    problem: [
      "Nairobi's fire brigade and disaster-risk teams generate detailed incident records — fires, building collapses, accidents — but the data lives in raw operational logs. Leadership had no spatial picture of where incidents concentrate, no view of response-time performance against SLA, and no self-serve way for analysts to slice the data.",
      "The dashboard gives both teams their own lens on the same data: FRS (Fire & Rescue Services) gets an operations view — call-outs, response times, appliances dispatched — while DRR (Disaster Risk Reduction) gets impact analytics: casualties, causes, and affected sub-counties.",
    ],
    role: [
      "Sole engineer across the stack: a Next.js 14 frontend (this project) and a separate NestJS API deployed on Railway. Auth0 gates every route, with an ADMIN/FRR/DRR role model controlling access.",
    ],
    decisions: [
      {
        heading: "A full-bleed incident map as the landing view",
        body: "The dashboard opens on a clustered Leaflet map of the whole city — incidents color-coded by type, fire stations marked, popups on hover — beside a live summary panel. Dark mode CSS-inverts and hue-rotates the OpenStreetMap tiles for a native-feeling dark map without a paid tile provider.",
      },
      {
        heading: "Operations analytics that answer management questions",
        body: "The FRS view alone has 8 ECharts panels — call-outs per day, response-time distribution, monthly trends, appliance dispatch breakdowns — headlined by a response-performance chart that splits every incident into within-SLA vs beyond-SLA per sub-county. That one chart turns raw logs into an accountability tool.",
      },
      {
        heading: "Every analysis is a shareable link",
        body: "The data explorer encodes its entire view state — source, filters, period, sort — in the URL. An analyst who finds something can paste a link and a colleague opens the exact same view.",
      },
      {
        heading: "Bilingual by construction",
        body: "English and Swahili via next-intl, with a build-gating script that fails CI if locale keys drift out of parity — translations can't silently go missing.",
      },
      {
        heading: "A real security posture",
        body: "Auth0 sessions enforced in middleware on every route; API tokens live server-side only, with the browser going through route-handler proxies; a nonce-based Content-Security-Policy in production. Built like the government data it handles deserves.",
      },
    ],
    outcomes: [
      "Per-sub-county SLA visibility for fire-and-rescue response times — previously invisible in raw logs",
      "14 charts across the FRS operations and DRR analytics views, plus a live incident map",
      "Fully bilingual (English / Swahili) with locale parity enforced at build time",
      "Role-based access (ADMIN / FRR / DRR) over an Auth0-gated NestJS API",
      "Shareable, URL-encoded analysis views with CSV export",
    ],
    stack: [
      "Next.js 14 (App Router)",
      "TypeScript (strict)",
      "MUI 7",
      "Apache ECharts",
      "Leaflet + marker clustering",
      "Auth0",
      "next-intl (EN/SW)",
      "NestJS API on Railway",
    ],
    links: {
      repo: "https://github.com/judemusyoki/nairobi-dashboard-web",
      demoNote: "Private demo available on request — happy to do a walkthrough call.",
    },
    images: [
      // TODO: capture authenticated screenshots locally (dashboard map, FRS SLA chart,
      // data explorer, Swahili view) and list them here.
    ],
  },
];

export const experience = {
  company: "Spiio",
  companyUrl: "https://greencastconnect.com/",
  // TODO: confirm exact title and start date.
  title: "Software Engineer",
  period: "Present",
  intro:
    "I work on GreenCast Connect Desktop, a commercial B2B IoT platform that turns environmental sensor data into agronomic insights for golf courses and grounds teams.",
  bullets: [
    "Build features across the platform's data-heavy surfaces: the sensor map, data explorer, growing-degree-day tracking, and alerting.",
    "Ship in a production codebase serving customers in 5 languages, with Auth0, Sentry monitoring, and a Vitest + Playwright test suite.",
    "Same domain as my personal projects — live sensor data, maps, and charts — but at commercial scale on Vercel.",
  ],
  stack: [
    "Next.js 14",
    "TypeScript",
    "MUI",
    "Apache ECharts",
    "Google Maps",
    "Auth0",
    "next-intl (5 locales)",
    "Sentry",
    "Vitest + Playwright",
  ],
};
