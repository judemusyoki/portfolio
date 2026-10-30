export const site = {
  name: "Jude Musyoki",
  initials: "JM",
  role: "Senior Frontend Engineer",
  niche: "Senior frontend engineer for complex, data-driven products on web and mobile",
  tagline:
    "I build frontends for complex, changing data, on web and mobile: component systems that hold up as the product grows, interfaces that help people decide faster, and performance treated as a design decision from the first commit.",
  /** The "Now:" pill in the hero. */
  now: "Now: leading the frontend of GreenCast Connect at Spiio",
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
  timeZone: "Europe/Copenhagen",
  url: process.env.NEXT_PUBLIC_SITE_URL ?? "http://localhost:3000",
};

/** Header links; the mobile menu and ⌘K palette list the same targets. */
export const nav = [
  { href: "/#top", label: "Home" },
  { href: "/#about", label: "About" },
  { href: "/#work", label: "Work" },
  { href: "/#services", label: "Services" },
  { href: "/#toolkit", label: "Toolkit" },
  { href: "/#experience", label: "Experience" },
  { href: "/#contact", label: "Contact" },
];

/** Section 02. Words wrapped in *asterisks* render in the accent colour. */
export const statement =
  "I’m Jude, a senior frontend engineer in Aarhus, originally from Nairobi. I lead the web and mobile frontend of a 2,000-user IoT platform at Spiio, and I like the problems where a UI has to make *complex, changing data* feel simple enough for someone to make a better decision.";

/** Career numbers under the statement; every figure is from the resume. */
export const stats = [
  { value: 5, suffix: "+", label: "Years shipping production frontends" },
  { value: 2000, suffix: "+", label: "Users on the platform I lead" },
  { value: 3, suffix: "", label: "Products built end to end, data model to deployment" },
];

/**
 * What I get hired for: the interfaces people use, then the system underneath
 * that keeps them working as the product grows.
 */
export const services = [
  {
    title: "Data-driven product interfaces",
    badge: "Core focus",
    body: "Dashboards, data explorers and map views that make complex, changing data simple enough to act on and stay fast at real volumes. Anything I build for the web, I build for mobile too.",
    builds: [
      "KPI dashboards and user-configurable widget grids",
      "Data explorers with shareable, URL-encoded state",
      "Map-first operational views with clustering",
    ],
    detail:
      "Apache ECharts and MUI X DataGrid, Leaflet or Google Maps with marker clustering, persisted layouts and CSV export. At Spiio this is 30+ custom charts, a Data Explorer and a drag-and-drop widget dashboard; in the case studies, clustered maps of thousands of points.",
  },
  {
    title: "Frontend architecture & component systems",
    body: "The system under the screens: a structure new features land in predictably, a typed component library shared across web and mobile, and tooling that enforces the rules.",
    builds: [
      "Rewrites and migrations, like Redux to Next.js and React 19",
      "Component libraries with consistent, typed APIs, for web and React Native",
      "Testing, CI and coding conventions a team can keep",
    ],
    detail:
      "Feature-sliced structure with clear import boundaries, strict TypeScript, Vitest and Testing Library with coverage thresholds, Playwright on every pull request, pre-commit gates, and Sentry plus flow tracking so the architecture is judged by what hurts in production. At Spiio: a from-scratch rebuild, 130+ shared components and 400+ test files.",
  },
  {
    title: "Full product builds",
    body: "When the product needs more than a frontend: data model to deployment, with auth, i18n, background jobs and exports, plus the marketing site that sells it.",
    builds: [
      "Multi-role apps behind real auth, on web and mobile",
      "Background jobs, exports and audit trails",
      "A fast, findable marketing site alongside the product",
    ],
    detail:
      "Next.js on the front; NestJS, GraphQL or Supabase Postgres behind it. Auth0, Drizzle or Prisma, Cloudflare Workers for scheduled work, Vercel for deployment, Vitest and Playwright in GitHub Actions. Chanzo, SmartBin and the Nairobi dashboard were all built this way.",
  },
  {
    title: "Software audits",
    body: "A senior second pair of eyes on how your team builds: the code standards, architecture, testing and CI/CD behind the product, with fixes ranked by what they would change.",
    builds: [
      "Architecture and code-standards review",
      "Testing, CI/CD and release-pipeline review",
      "Performance and accessibility review",
    ],
    detail:
      "I read the codebase the way a new senior hire would: feature boundaries and import rules, component API consistency, type strictness, test coverage and what the gates actually block, the review process, error monitoring, bundle and rendering cost, WCAG checks. You get a written report with prioritised fixes and the conventions that would keep them fixed.",
  },
];

/** Section "Development philosophy": lessons from running a large frontend. */
export const principles = [
  {
    title: "Organise by feature, not file type",
    body: "Clear boundaries for what each slice owns and what it can import. Feature-sliced design formalises how the Spiio codebase already works, so new features land in a predictable place.",
  },
  {
    title: "The component library is a product",
    body: "I architected 130+ shared components at Spiio. The lesson: consistent APIs and strict typing matter more than the number of components.",
  },
  {
    title: "Make the right thing the easy thing",
    body: "Rules only hold if tooling enforces them: 400+ Vitest and Testing Library files with coverage thresholds, Playwright on every pull request, pre-commit gates for format, lint, test and build. Our Claude Code setup follows the same conventions, so AI-assisted code does too.",
  },
  {
    title: "Observability closes the loop",
    body: "Sentry with Slack alerts, plus Smartlook and GA flow tracking, show where the architecture or the UX is actually hurting, instead of leaving us to guess.",
  },
];

/** Section "How I build": the path from brief to shipped, in order. */
export const buildProcess = [
  {
    step: "Understand the decision",
    body: "Who uses the screen, what they need to decide, and which data has to feed it. Six years in marketing taught me to start here.",
  },
  {
    step: "Shape the data and the hierarchy",
    body: "What must be obvious in seconds, what can wait a click. Volumes, latency and rendering cost are decided now, not fixed later.",
  },
  {
    step: "Build from shared parts",
    body: "Typed, reusable components and clear feature boundaries, so new screens, on web or mobile, come from parts that already exist, and the product can grow in directions nobody planned without a rewrite.",
  },
  {
    step: "Prove it",
    body: "Unit tests for the logic, Playwright for the flows, coverage thresholds and pre-commit gates. CI blocks the merge, not a reviewer’s memory.",
  },
  {
    step: "Watch it live",
    body: "Sentry alerts, Smartlook and GA flow tracking show where the architecture or the UX actually hurts. That drives the next iteration.",
  },
];

/** How a freelance engagement runs; shown compactly under the services. */
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
    step: "Weekly increments",
    body: "Working software on a preview URL every week, so you see progress and steer early.",
  },
  {
    step: "Handover with docs",
    body: "Deployed, documented, and tested, with a walkthrough so your team can run it without me.",
  },
];

/** Section "Current focus". *Asterisks* mark the accent words. */
export const focus = {
  title: "Right now: leading the frontend of *GreenCast Connect* at Spiio.",
  body: "I rebuilt the web app from scratch on Next.js and React 19, replacing the original Redux codebase, spent over a year building the React Native mobile app, and set the architecture, testing and coding standards the team works to. On top of the web app sits the visualisation layer: 30+ ECharts charts for sensor data across locations, time zones and measurement types, a Data Explorer, and a drag-and-drop widget dashboard with user-arranged layouts and persisted state — the closest thing I’ve built to an editor.",
  since: "May 2023",
};

/** Section "Why work with me". */
export const reasons = [
  {
    title: "Senior frontend depth",
    body: "I’ve led a full rewrite, built a React Native app alongside the web platform, set the architecture and conventions for a team, and kept a large React codebase healthy for years. Not just features — the system they live in.",
  },
  {
    title: "Built for growth nobody planned for",
    body: "Feature boundaries, a typed component library and performance decided up front, so the product can grow in new directions, or onto a new platform, without a second rewrite.",
  },
  {
    title: "I start from the user’s decision",
    body: "Six years in marketing and consulting taught me to ask what someone needs to decide before I ask what to put on the screen. It shows in the interfaces.",
  },
  {
    title: "Production habits from day one",
    body: "Strict TypeScript, tests, CI gates, error monitoring and a Content Security Policy are the default, not a phase two — and I document and hand over properly.",
  },
];
