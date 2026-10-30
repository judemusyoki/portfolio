export interface SkillGroup {
  title: string;
  /** One line on what the group lets me build. */
  body: string;
  items: string[];
  /** Small qualifier shown beside the title, e.g. how deep the experience goes. */
  badge?: string;
}

/**
 * Frontend first, then the data and delivery work around it.
 * Every item here appears in a case study or a role in `projects.ts`.
 */
export const skills: SkillGroup[] = [
  {
    title: "Web & mobile frontend",
    body: "Typed React on the web and React Native on mobile, from the same conventions.",
    items: ["Next.js (App Router)", "React", "React Native (Expo and bare)", "TypeScript (strict)", "Vue + Quasar"],
  },
  {
    title: "UI systems",
    body: "Component libraries that keep a product consistent as it grows.",
    items: ["MUI / Material-UI", "Tailwind CSS", "Storybook", "Redux"],
  },
  {
    title: "Product essentials",
    body: "The parts that make an app ready for real users.",
    items: ["Auth0", "i18n (next-intl, 5 locales)", "Accessibility", "Dark / light theming"],
  },
  {
    title: "Charts & tables",
    body: "Dense data made readable, from KPI tiles to ten-thousand-row grids.",
    items: ["Apache ECharts", "MUI X DataGrid", "PDF reports (@react-pdf)"],
  },
  {
    title: "Data shapes",
    body: "The kinds of data I have shipped interfaces for.",
    items: ["Time series", "KPI summaries", "Live-ticking feeds", "Audit ledgers", "Evidence packs"],
  },
  {
    title: "Map interfaces",
    body: "Map-first views that stay fast with thousands of points.",
    items: ["Leaflet", "Marker clustering", "Google Maps & Places API", "OpenStreetMap"],
  },
  {
    title: "Geo data",
    body: "The spatial work behind the map.",
    items: ["PostGIS", "GeoJSON", "Google Earth Engine", "Whisp forest screening", "Route optimisation"],
  },
  {
    title: "APIs & data",
    badge: "Full stack",
    body: "Across the stack when the product needs it.",
    items: ["GraphQL (Apollo, URQL)", "Prisma", "Drizzle", "PostgreSQL / Supabase", "NestJS", "Python", "Zod"],
  },
  {
    title: "Testing",
    body: "Proof that it works, enforced in CI.",
    items: ["Vitest", "Testing Library", "Playwright", "Jest", "pytest"],
  },
  {
    title: "Delivery",
    body: "Shipping, scheduling and watching it in production.",
    items: ["Vercel", "Cloudflare Workers", "GitHub Actions", "Sentry", "Railway"],
  },
];

/** The two big scrolling rows above the toolkit grid. */
export const marquees = [
  ["Next.js", "React", "TypeScript", "Apache ECharts", "Leaflet", "Tailwind CSS", "React Native"],
  ["PostGIS", "Earth Engine", "GraphQL", "Supabase", "NestJS", "Playwright", "Vercel"],
];
