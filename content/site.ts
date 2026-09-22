export const site = {
  name: "Jude Musyoki",
  role: "Software Engineer",
  niche: "Data-heavy dashboards & geospatial visualization",
  tagline:
    "I turn messy real-world data — city incident reports, IoT sensor streams, waste-collection telemetry — into fast, accessible dashboards people actually use.",
  email: "judemusyoki@gmail.com",
  location: {
    based: "Aarhus, Denmark",
    from: "Nairobi, Kenya",
  },
  github: "https://github.com/judemusyoki",
  linkedin: "https://www.linkedin.com/in/judemusyoki" as string | undefined,
  // TODO: drop resume.pdf into /public and set this to "/resume.pdf".
  resumeUrl: undefined as string | undefined,
  availability: "Available for freelance & full-time opportunities",
  /** Decorative panel beside the hero on large screens: "map", "sparkline", or "none". */
  heroVisual: "map" as "map" | "sparkline" | "none",
  url: process.env.NEXT_PUBLIC_SITE_URL ?? "http://localhost:3000",
};

/** Ordered from the smallest engagement to the largest, then the audit. */
export const services = [
  {
    title: "Websites & marketing sites",
    body: "Fast, accessible Next.js sites with content you can edit yourself, built to be found and to load quickly on any device.",
  },
  {
    title: "Dashboards & data products",
    body: "KPI views, charts, and map-based interfaces — clustered markers, live overlays, route views — that stay fast with real data volumes.",
  },
  {
    title: "Full platform builds",
    body: "Multi-role web platforms from data model to deployment: auth, i18n, background jobs, exports, and a test suite.",
  },
  {
    title: "Frontend audits",
    body: "Performance, accessibility, and code-quality reviews of an existing app, with concrete fixes you can act on.",
  },
];

/** How an engagement runs, shown under the services. */
export const workflow = [
  {
    step: "Discovery call",
    body: "Thirty minutes on what you have, what you need, and whether I'm the right fit.",
  },
  {
    step: "Scoped proposal",
    body: "A written scope with milestones, deliverables, and what's explicitly out of scope.",
  },
  {
    step: "Build in weekly increments",
    body: "Working software on a preview URL every week, so you see progress and steer early.",
  },
  {
    step: "Handover with docs",
    body: "Deployed, documented, and tested, with a walkthrough so your team can run it without me.",
  },
];

export const about = [
  `I'm a software engineer based in Aarhus, Denmark, and originally from Nairobi, Kenya, specialising in interfaces for dense, live data. By day I build GreenCast Connect at Spiio, a commercial IoT platform that turns soil-sensor data into agronomic insight for golf courses and grounds teams. Outside work I apply the same craft to civic problems back home — emergency-incident analytics for Nairobi's fire and rescue services, and smart waste-collection operations.`,
  `The common thread: taking data that's messy, high-volume, or locked in spreadsheets, and shipping an interface where the important thing is obvious in seconds. I care about the details that make that trustworthy — strict TypeScript, tested logic, accessible markup, dashboards that load fast and work in both themes. If your product needs to show people data, I can take it from raw feed to production.`,
];
