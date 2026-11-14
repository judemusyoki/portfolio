export interface ProjectImage {
  src: string;
  alt: string;
  caption?: string;
}

export interface Project {
  slug: string;
  title: string;
  /** Short name for the big work rows. */
  name: string;
  /** Mono label above the summary, e.g. "EUDR coffee traceability". */
  category: string;
  tagline: string;
  summary: string; // 2–3 sentences for the home-page card
  /** One-line result, shown on the card and above the fold on the case study. */
  outcome: string;
  problem: string[];
  role: string[];
  decisions: { heading: string; body: string }[];
  outcomes: string[];
  stack: string[];
  links: { demo?: string; demoNote?: string };
  images: ProjectImage[];
  cardImage?: ProjectImage;
}

export const projects: Project[] = [
  {
    slug: "rebalance",
    title: "Rebalance — Bike-share rebalancing operations",
    name: "Rebalance",
    category: "Bike-share rebalancing operations",
    outcome:
      "A ranked worklist of the hubs about to run empty, from three months of live 5-minute data on 471 Aarhus hubs",
    tagline:
      "Which hubs run empty in the next three hours, and the van route that prevents it — ranked by rentals lost, not model accuracy.",
    summary:
      "A prototype of a consulting-grade operations tool for bike-share operators, built against Donkey Republic's live Aarhus system (471 virtual hubs, roughly 700 bikes) via GBFS 3.0 and Open-Meteo weather. It predicts which hubs will run empty in the next 1–3 hours, ranks them by the rentals lost if nobody acts, and generates van routes to prevent it. The hero screen is a worklist of interventions, not a map; the forecasting and routing are clearly labelled stand-ins designed to be swapped for a trained model and a solver.",
    problem: [
      "A bike-share operator loses a rental every time someone walks up to an empty hub. Rebalancing teams fix that by moving bikes around in vans, usually from a map and experience. With hundreds of hubs that breaks down: in Aarhus, Donkey Republic runs roughly 700 bikes across 471 virtual hubs, and more than half of those hubs are empty at any given moment. 'Will it be empty?' is true almost everywhere; the useful question is where an empty hub will actually cost rentals in the next few hours.",
      "Rebalance is a portfolio prototype of the tool a consultant would put in front of that team. It predicts which hubs run empty in the next 1–3 hours, ranks them by rentals lost if nobody acts, and generates van routes to prevent it. The success metric is that lost-rental number, not model accuracy. It runs on real live data — the Aarhus GBFS 3.0 feed polled every five minutes since August 2026, plus Open-Meteo weather — and is honest about what is a stand-in and what is not.",
    ],
    role: [
      "Solo design and build, end to end: the ingester (Cloudflare Workers on cron triggers, Drizzle ORM, Supabase Postgres with PostGIS), the analytics SQL, the routing planner and the Next.js frontend, deployed on Vercel with a read-only database role. No authentication, no rider-facing features, no trained ML model and no OR-Tools yet, no write path from the frontend — all stated as non-goals rather than left implied.",
    ],
    decisions: [
      {
        heading: "Rank by rentals lost, not by probability of empty",
        body: "An hour-of-week demand profile per station — the last 8 weeks, van moves excluded, rates shrunk toward the hub average where data is thin — feeds a SQL baseline that projects each hub's stock at +1, +2 and +3 hours. Hubs are ranked by expected lost rentals, demand times stockout risk, so a busy hub with two bikes outranks a dormant one with none. The worklist groups the result into priority bands; most of the 471 hubs correctly fall into 'OK'.",
      },
      {
        heading: "Frontend first, on stand-ins built to be replaced",
        body: "The planned order was data, model, solver, then UI. It was flipped so the project was showable early: the frontend was built on a SQL baseline instead of a trained model and a greedy value-per-minute route planner in TypeScript instead of OR-Tools. Both are labelled as stand-ins in the UI, and both were designed around their interfaces — the risk view keeps its columns when a model replaces it, and the planner keeps its inputs and outputs when a solver does — so swapping them changes nothing downstream.",
      },
      {
        heading: "A pipeline that assumes it will be audited",
        body: "Polling every five minutes since August 2026 produces dense snapshots: one row per station per poll, about 135k rows a day, roughly 4.6 million over three months. Stations are stored as slowly-changing dimensions, feed health is recorded for every fetch, every payload is validated with Zod before anything touches a fact table, and weather rows are upserted so forecasts converge to actuals as they arrive. All bulk writes are chunked, after large inserts failed silently only on deployed Workers.",
      },
      {
        heading: "Gaps that are explained, not hidden",
        body: "Cloudflare's free Workers plan caps CPU at 10 ms per run; a poll needs about 120 ms. Cloudflare tolerates the overrun for stretches, then kills every run for hours. A killed run leaves no trace in the database — the isolate dies before the error handler runs, so the feed-health table stays green — which is why the gaps were only diagnosed from Cloudflare's invocation analytics. Rather than hide this, the data-health page carries a 90-day coverage strip, one cell per day against the 288 polls expected, and a note saying exactly why the empty stretches are there.",
      },
      {
        heading: "Three concurrent queries, then silence",
        body: "After the redesign, pages started streaming forever with no error anywhere. The cause was postgres.js 4.1.1: with more queries in flight than connections in the pool, it completes the first three and never dispatches the rest. The earlier pages had never issued more than three queries at once, so it went unnoticed. Reproduced in a standalone script outside Next.js, fixed by pinning 3.4.9.",
      },
      {
        heading: "A dispatcher's console, in paper and in the dark",
        body: "The worklist shows a runway sparkline and minutes-to-empty per hub, opens a side sheet on click and has ⌘K hub search; a feed-freshness indicator and a weather strip sit on every page. Van routes are a full-screen map linked both ways to the plan panel, with a time-axis strip per van that shows when a delivery arrives after the hub has already emptied, and planner inputs that live in the URL. Light mode is a warm 'paper' theme; dark mode is a 'console' theme where the element that matters glows. Every figure is set in monospace tabular numerals.",
      },
    ],
    outcomes: [
      "Three months of live data: 5-minute polls of 471 Aarhus hubs since August 2026, ~4.6M snapshot rows, feed health recorded for every fetch",
      "A ranked worklist of interventions grouped by priority band, with a runway sparkline and minutes-to-empty per hub, a side sheet per hub and ⌘K search",
      "Van routes on a full-screen map linked both ways to the plan panel, with a per-van time axis that flags deliveries arriving after the hub has emptied",
      "Hub detail: 7-day history continuing into the +3 h projection, hour-of-week heatmaps, nearest hubs with spare bikes",
      "A data-health page with a 90-day coverage strip that shows the gaps and says why they are there",
      "Forecasting and routing shipped as labelled stand-ins behind stable interfaces, ready for a trained model and an OR-Tools solver",
    ],
    stack: [
      "Next.js 16 (App Router, Cache Components)",
      "TypeScript (strict)",
      "MUI 9",
      "Leaflet 1.9 (imperative)",
      "Apache ECharts 6",
      "Supabase Postgres + PostGIS",
      "Drizzle ORM",
      "Cloudflare Workers (cron)",
      "GBFS 3.0 · Open-Meteo",
      "Zod, Vitest",
    ],
    links: {
      demo: "https://bike-rebalancing.vercel.app",
      demoNote:
        "Live data from Aarhus, read-only and without login. The feed polls every five minutes but is throttled on a free tier, so it may show as stale.",
    },
    images: [
      {
        src: "/images/rebalance/worklist.webp",
        alt: "Rebalance worklist: headline tiles for rentals at stake, bikes on hubs, empty hubs and last observation, a stale-feed warning, then hubs grouped into Soon, Watch and OK bands with a runway sparkline, minutes to empty, demand, risk, lost rentals and a Deliver or Collect action per row",
        caption:
          "The hero screen — hubs ranked by rentals lost in the next three hours, grouped by priority band. The red STALE indicator and the warning strip are the feed-freshness check, honest about a throttled ingester.",
      },
      {
        src: "/images/rebalance/routes.webp",
        alt: "Rebalance van routes: a plan panel with van count, capacity, depot stock and horizon inputs, result tiles for rentals saved, bikes moved, driving and unmet, and a per-van timeline with one late stop, beside a full-screen dark map of Aarhus with the numbered route and a hovered stop's tooltip",
        caption:
          "Van routes — plan panel and map linked both ways; the timeline strip marks the stop where the van arrives after the hub has emptied, and the hovered stop is highlighted in both.",
      },
      {
        src: "/images/rebalance/health.webp",
        alt: "Rebalance data-health page: tiles for last successful poll, 7-day coverage, all-time coverage and snapshot rows, a note explaining the Cloudflare CPU-limit gaps, a 90-day strip of polls captured per day and a per-feed table of attempts, failures and latency",
        caption: "Data health — a 90-day coverage strip that shows the gaps, and the note that explains them.",
      },
      {
        src: "/images/rebalance/search.webp",
        alt: "Rebalance ⌘K hub search open over the data-health page: hubs listed with their bike count and priority band, and go-to shortcuts for the worklist, van routes and data health",
        caption: "⌘K on any page — find a hub by name or id, with its stock and priority, or jump between screens.",
      },
    ],
  },
  {
    slug: "chanzo",
    title: "Chanzo — EUDR coffee traceability",
    name: "Chanzo",
    category: "EUDR coffee traceability",
    outcome:
      "All 5 seeded fraud patterns caught; 3,501 plots screened in about four minutes",
    tagline:
      "From a farmer's GPS point to an importer-ready due diligence file — with every decision on the record.",
    summary:
      "An EUDR compliance chain for Kenyan coffee cooperatives and their exporters: 3,500 smallholder plots screened against satellite forest data (FAO Whisp on Google Earth Engine), cherry deliveries tracked through factory lots into export consignments, a review queue where a person clears or excludes every flagged plot with a reason, and a one-click evidence pack — EU-format geolocation file, due diligence statement, hashed manifest — for the importer to file. Synthetic data with five seeded fraud patterns, all of them caught.",
    problem: [
      "From 30 December 2026 the EU will not accept coffee unless the importer can show, plot by plot, that it was not grown on land deforested after 2020. Kenya sends roughly 58% of its coffee to the EU, and it comes from hundreds of thousands of smallholders through cooperative wet mills. Mapping the plots is the easy half — Kenya's coffee authority is already doing it with Kobo Collect, and free field apps abound.",
      "The hard half sits with the exporter: turning thousands of GPS points into a defensible file. Which plots does this container actually contain? Which ones did the satellite flag, who looked at them, what did they decide and why? If a plot is excluded, how much coffee drops out of the declaration? Chanzo is the exporter-side chain — custody, review, evidence, statement — built to production standards on synthetic data.",
    ],
    role: [
      "Solo project — regulatory research (the Commission's FAQ, guidance and GeoJSON spec, verified against the source texts), data model, synthetic-data generator, screening pipeline, web back office, compliance export. Built in phases with a written plan and a progress diary; every design decision recorded with its reason.",
    ],
    decisions: [
      {
        heading: "Real satellite screening, not a mock",
        body: "Each plot is screened with FAO's Whisp on Google Earth Engine — the same open tool the FAO used in its Kenyan pilots. Points are buffered to the plot's declared area before screening (Whisp does not do this for you), the result is stored with the Whisp version and dataset versions it was computed against, and it is labelled in the UI as a due-diligence input, never a certificate. A nightly GitHub Actions job re-screens what has gone stale.",
      },
      {
        heading: "A synthetic cooperative with the fraud built in",
        body: "No real farmer data exists in the system. A deterministic generator places eight factories on real Nyeri cropland, 3,077 farmers and 3,501 plots, a season of deliveries — and five seeded failure patterns: plots on real post-2020 forest-loss pixels, duplicate farmer registrations, GPS fixes taken under canopy, one plot claimed by two members, and farmers delivering more cherry than their land could grow. The seeded labels are the acceptance test: the checks find 100% of four patterns and 11 of 12 forest-loss plots (the twelfth is a 0.14 ha plot the satellite honestly rates low).",
      },
      {
        heading: "Flags block; people decide",
        body: "No plot is ever excluded by software. A flag turns the plot 'pending' and blocks its coffee from any consignment. A clerk works a master–detail queue — evidence in one plain-English sentence, the map, the history — and clears or excludes with a required reason. Every decision keeps the actor, time and reason on the flag; if a later check finds the same condition, the flag re-opens and shows the earlier decision.",
      },
      {
        heading: "Custody as the source of truth for weight",
        body: "Deliveries at the factory gate go into lots (a processing batch: cherry in, parchment out), lots go into consignments. Every number on a consignment — plots, farmers, cherry, parchment, green, and the 'claimable' green after exclusions — is derived from that chain, so a plot excluded in the review queue reduces the declarable weight of the shipment by exactly its share.",
      },
      {
        heading: "Evidence that cannot quietly change",
        body: "Submitting a consignment freezes a numbered version: the cleared plots with their geometry, the screening result each one had, every decision, the weights. Later changes create version 2; version 1 is kept. The evidence pack is a ZIP with the EU Information System GeoJSON (spec v1.5: six-decimal points, Area always set, validated), the Annex II due diligence statement as PDF and JSON, CSVs of plots, exclusions and decisions, and a manifest of SHA-256 hashes stored on first generation and re-checked on every later download.",
      },
      {
        heading: "Read the regulation, then correct the brief",
        body: "The project brief assumed polygons for every plot and a 500-plot cap per file. The texts say otherwise: plots up to 4 ha may be a single point (so the field capture defaults to one GPS fix), and the '500' is a limit on scientific-name lines, not plots. Both findings changed the design and are documented with their sources.",
      },
    ],
    outcomes: [
      "3,501 plots screened end to end on Google Earth Engine in about four minutes per full run",
      "5 seeded fraud patterns: 100% recall on four, 11/12 on satellite forest loss — scored automatically against the generator's labels",
      "Consignment page: plots · cleared · pending · excluded, each line traceable to a named farmer and a timestamp; claimable weight recomputed as decisions land",
      "One-click evidence pack: EU-format GeoJSON, DDS draft (PDF + JSON), decisions CSV, hashed manifest; frozen, numbered versions",
      "Full chain in the UI: record a delivery → open and close a lot → assemble a consignment → review → submit → ship, every step audited",
      "Nightly automation on three free tiers: Whisp screening (GitHub Actions), spatial checks (Cloudflare Worker), app on Vercel",
    ],
    stack: [
      "Next.js 15 (App Router, Server Components)",
      "TypeScript (strict)",
      "MUI 7 + MUI X DataGrid",
      "Leaflet + marker clustering",
      "Supabase Postgres + PostGIS",
      "Drizzle ORM",
      "Cloudflare Workers (cron)",
      "Python · openforis-whisp · Google Earth Engine",
      "GitHub Actions",
      "@react-pdf/renderer, Zod, Vitest, pytest",
    ],
    links: {
      demo: "https://chanzo-w8ad-chi.vercel.app",
      demoNote:
        "All data is synthetic; the demo runs without login as a seeded clerk and exporter officer.",
    },
    images: [
      {
        src: "/images/chanzo/consignment.webp",
        alt: "Chanzo consignment page: lifecycle stepper, readiness tiles for plots cleared, pending and excluded, and the pending-plot table",
        caption:
          "The hero screen — every plot in the shipment in one of three buckets; only cleared plots are declared.",
      },
      {
        src: "/images/chanzo/review.webp",
        alt: "Chanzo review queue: list of flagged plots on the left, the selected plot's evidence, map and decision buttons on the right",
        caption: "Review queue — evidence in plain English, a required reason on every decision.",
      },
      {
        src: "/images/chanzo/dashboard.webp",
        alt: "Chanzo dashboard: factory list with status counts beside a clustered map of 3,501 plots centred on the exporter's office in Nyeri",
        caption: "Dashboard — 3,501 synthetic plots on real Nyeri cropland, clustered by status.",
      },
      {
        src: "/images/chanzo/lot.webp",
        alt: "Chanzo lot page: deliveries in a factory processing batch with cherry, parchment and outturn figures",
        caption: "Custody — deliveries into a lot, parchment weighed at close, then into a consignment.",
      },
      {
        src: "/images/chanzo/deliveries.webp",
        alt: "Chanzo deliveries ledger: factory-gate weighings with member, plot status, weight and lot",
        caption: "Deliveries ledger — the factory gate, where traceability starts.",
      },
    ],
  },
  {
    slug: "smartbin",
    title: "SmartBin — Waste Collection Operations",
    name: "SmartBin",
    category: "Waste collection operations",
    outcome:
      "30–50% less collection distance across ~250 bins in two cities, with zero backend",
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
      demo: "https://bin-ops.vercel.app/copenhagen",
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
    name: "Nairobi Response",
    category: "Emergency response analytics",
    outcome:
      "Response-time SLA visibility per sub-county, from raw logs to a live map and analytics in English and Swahili",
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
      demo: "https://nairobi-dashboard-demo.vercel.app/try",
      demoNote:
        "Synthetic data that resets nightly. Pick a role on the Try page — DRR analyst or FRR officer — no account needed.",
    },
    images: [
      {
        src: "/images/nairobi/overview.webp",
        alt: "Nairobi Incident Dashboard: clustered Leaflet map of incidents across Nairobi County with KPI cards and a latest-incidents list in the sidebar",
        caption:
          "Overview — 80 incidents clustered on the map, headline KPIs, and the latest reports, with an ALL / FRS / DRR view switch.",
      },
      // TODO: add the FRS SLA chart, data explorer, and Swahili views.
    ],
  },
];

export interface Experience {
  company: string;
  companyUrl?: string;
  /** Public product links: the marketing site and the app-store listings. */
  product?: { name: string; url: string; appStore?: string; googlePlay?: string };
  /** Public source, when the work is open source. */
  repo?: { url: string; label: string };
  title: string;
  period: string;
  intro: string;
  bullets: string[];
  stack: string[];
}

/** Resume order: current role first. The first entry is treated as the current role. */
export const experience: Experience[] = [
  {
    company: "Spiio",
    companyUrl: "https://greencastconnect.com/",
    product: {
      name: "GreenCast Connect",
      url: "https://greencastconnect.com/",
      appStore: "https://apps.apple.com/us/app/greencast-connect-by-syngenta/id6737599088",
      googlePlay: "https://play.google.com/store/apps/details?id=com.gcx.live",
    },
    title: "Senior Frontend Engineer",
    period: "Mar 2023 – Present",
    intro:
      "Lead frontend engineer on GreenCast Connect, Syngenta’s turf-management platform built by Spiio, used daily by commercial customers across the industry on web and mobile. I rebuilt the web app from scratch, spent over a year on the React Native app, own the architecture and conventions, and built the visualisation layer that turns sensor data into decisions.",
    bullets: [
      "Rebuilt the web app from scratch on Next.js (now Next.js 16 / React 19), replacing the original Redux app, and set the engineering standards: feature-based architecture, directory structure, testing and coding conventions.",
      "Architected a shared library of 130+ reusable components used across the platform.",
      "Spent over a year on the React Native mobile app, in both Expo and bare React Native, building it from scratch alongside the web platform so both clients share the same data model and conventions.",
      "Designed and built the data-visualisation layer in Apache ECharts: 30+ custom charts, a drag-and-drop widget dashboard and a Data Explorer that turn raw sensor data into clear insight.",
      "Built the interactive map dashboard on Google Maps and Places API (New), with marker clustering, location search and a map-first view of sites and sensors.",
      "Built the testing and CI/CD setup: 400+ Vitest and Testing Library test files with coverage thresholds, Playwright end-to-end tests on every pull request via GitHub Actions, and Husky pre-commit gates.",
      "Hardened frontend security (Auth0 on every page, bearer-token API requests, a nonce-based Content Security Policy, clickjacking protection) and set up Sentry alerting plus Smartlook and Google Analytics flow tracking.",
      "Led a major API data-model migration to nested time-series structures; shipped i18n in 5 languages, new-user onboarding and an in-app product tour; set up Claude Code with shared conventions and an MCP integration for the team.",
    ],
    stack: [
      "Next.js 16",
      "React 19",
      "TypeScript",
      "React Native (Expo and bare)",
      "MUI",
      "Apache ECharts",
      "Google Maps & Places API",
      "Auth0",
      "next-intl (5 locales)",
      "Sentry",
      "Vitest + Testing Library",
      "Playwright",
      "GitHub Actions",
    ],
  },
  {
    company: "Acter",
    companyUrl: "https://github.com/acterglobal",
    repo: { url: "https://github.com/acterglobal/code", label: "Open source · 175 merged PRs" },
    title: "Full Stack Developer",
    period: "Apr 2021 – Dec 2022",
    intro:
      "An open-source community-organising platform from the Danish non-profit Acter Global, for grassroots groups, activists and NGOs. I worked across the stack, from the Next.js front end to the GraphQL API and database layer, and I’m the third-largest contributor to the codebase.",
    bullets: [
      "Built and optimised UI components in TypeScript, Next.js and Material-UI — the same front-end stack I work in today at Spiio.",
      "Developed and tuned the backend: a GraphQL server with a URQL client and Prisma ORM on PostgreSQL.",
      "Implemented Auth0 authentication and wrote Jest test suites; documented components in Storybook.",
    ],
    stack: [
      "Next.js",
      "TypeScript",
      "Material-UI",
      "GraphQL",
      "URQL",
      "Prisma",
      "PostgreSQL",
      "Auth0",
      "Jest",
      "Storybook",
    ],
  },
  {
    company: "WasteHero",
    companyUrl: "https://wastehero.io/",
    title: "Frontend Developer Intern",
    period: "Jun 2020 – Nov 2020",
    intro:
      "A smart waste-management platform: the same problem space as my SmartBin project, on a commercial product with real customers.",
    bullets: [
      "Shipped new features in React and TypeScript, working with Apollo Client, GraphQL, Material UI and Redux.",
      "Worked with the Google Maps API — my first map-heavy product interface, and the start of a thread that runs through everything I've built since.",
      "Implemented scalable features to improve the user experience; finished with a recommendation letter and certificate of internship.",
    ],
    stack: [
      "React",
      "TypeScript",
      "Apollo Client",
      "GraphQL",
      "Material UI",
      "Redux",
      "Google Maps API",
    ],
  },
];

export interface EarlierRole {
  org: string;
  /** Shown after the org name, e.g. a country. */
  place?: string;
  title: string;
  period: string;
  note: string;
}

/** Digital marketing & technology consulting, 2013–2019 — most recent first. */
export const earlierCareer = {
  period: "2013 – 2019",
  title: "Digital marketing & technology consulting",
  intro:
    "Before engineering I spent six years on the business side: rolling out a core banking system, then running marketing, SEO and e-commerce for consumer brands in Kenya. It's why I start from the person using the interface and the decision they need to make.",
  roles: [
    {
      org: "Sandstorm Kenya",
      title: "Marketing Lead Consultant",
      period: "2018 – 2019",
      note: "Oversaw the Shopify e-commerce site for local and international markets, and all marketing.",
    },
    {
      org: "EatOut Kenya",
      title: "Digital Marketing Manager",
      period: "2016",
      note: "Led digital strategy for East Africa's largest online restaurant guide.",
    },
    {
      org: "Jumia Food",
      title: "Marketing Manager",
      period: "2015 – 2016",
      note: "Marketing strategy and budget, CRM, campaign tracking and a brand-ambassador acquisition programme.",
    },
    {
      org: "MagicBox",
      title: "Technical Director & Campaign Manager",
      period: "2014 – 2015",
      note: "Website structure, SEO, email and search-advertising strategy.",
    },
    {
      org: "Vistaar Finance",
      place: "India",
      title: "Associate Consultant, Technology",
      period: "2013 – 2014",
      note: "Implemented a new core banking system: coordinated UAT, trained users across 90+ branches and migrated 35+ of them.",
    },
  ] satisfies EarlierRole[],
};

export const currentRole = experience[0];
