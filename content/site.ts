export const site = {
  name: "Jude Musyoki",
  role: "Software Engineer",
  niche: "Data-heavy dashboards & geospatial visualization",
  tagline:
    "I turn messy real-world data — city incident reports, IoT sensor streams, waste-collection telemetry — into fast, accessible dashboards people actually use.",
  email: "judemusyoki@gmail.com",
  github: "https://github.com/judemusyoki",
  // TODO: confirm LinkedIn URL before launch — leave undefined to hide the link.
  linkedin: undefined as string | undefined,
  // TODO: drop resume.pdf into /public and set this to "/resume.pdf".
  resumeUrl: undefined as string | undefined,
  availability: "Available for freelance & full-time opportunities",
  url: process.env.NEXT_PUBLIC_SITE_URL ?? "http://localhost:3000",
};

export const services = [
  {
    title: "Dashboards & data visualization",
    body: "KPI views, charts, and analytics screens that stay fast with real data volumes.",
  },
  {
    title: "Map-based interfaces",
    body: "Interactive geospatial UIs — clustered markers, live overlays, route views.",
  },
  {
    title: "Next.js / TypeScript products",
    body: "Full product builds from design to deployment, with auth, i18n, and testing.",
  },
  {
    title: "Frontend audits",
    body: "Performance, accessibility, and code-quality reviews with concrete fixes.",
  },
];

export const about = [
  `I'm a software engineer specialising in interfaces for dense, live data. By day I build GreenCast Connect at Spiio, a commercial IoT platform that turns soil-sensor data into agronomic insight for golf courses and grounds teams. Outside work I apply the same craft to civic problems — emergency-incident analytics for Nairobi's fire and rescue services, and smart waste-collection operations.`,
  `The common thread: taking data that's messy, high-volume, or locked in spreadsheets, and shipping an interface where the important thing is obvious in seconds. I care about the details that make that trustworthy — strict TypeScript, tested logic, accessible markup, dashboards that load fast and work in both themes. If your product needs to show people data, I can take it from raw feed to production.`,
];
