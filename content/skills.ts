export type SkillTone = "teal" | "sky" | "amber" | "rose";
export type SkillIcon = "chart" | "map" | "layout" | "database";

export interface SkillGroup {
  title: string;
  icon: SkillIcon;
  tone: SkillTone;
  /** Labelled rows of chips inside the card. */
  rows: { label: string; items: string[] }[];
}

/**
 * Grouped by the kind of problem a client brings, not by language.
 * Every item here appears in a case study or a role in `projects.ts`.
 */
export const skills: SkillGroup[] = [
  {
    title: "Dashboards & data visualization",
    icon: "chart",
    tone: "teal",
    rows: [
      {
        label: "Charts & tables",
        items: ["Apache ECharts", "MUI X DataGrid", "PDF reports (@react-pdf)"],
      },
      {
        label: "Data shapes",
        items: [
          "Time series",
          "KPI summaries",
          "Live-ticking feeds",
          "Audit ledgers",
          "Exportable evidence packs",
        ],
      },
    ],
  },
  {
    title: "Maps & geospatial",
    icon: "map",
    tone: "sky",
    rows: [
      {
        label: "Map UIs",
        items: ["Leaflet", "Marker clustering", "Google Maps API", "OpenStreetMap"],
      },
      {
        label: "Geo data",
        items: [
          "PostGIS",
          "GeoJSON",
          "Google Earth Engine",
          "Satellite forest screening (Whisp)",
          "Route optimisation",
        ],
      },
    ],
  },
  {
    title: "Frontend & product",
    icon: "layout",
    tone: "amber",
    rows: [
      {
        label: "Framework",
        items: [
          "Next.js (App Router, Server Components)",
          "React",
          "TypeScript (strict)",
          "Vue + Quasar",
        ],
      },
      {
        label: "UI",
        items: ["MUI / Material-UI", "Tailwind CSS", "Storybook", "Redux"],
      },
      {
        label: "Product",
        items: [
          "Auth0",
          "i18n (next-intl, 5 locales)",
          "Accessibility",
          "Dark / light theming",
        ],
      },
    ],
  },
  {
    title: "Backend, data & delivery",
    icon: "database",
    tone: "rose",
    rows: [
      {
        label: "APIs & data",
        items: [
          "GraphQL (Apollo, URQL)",
          "Prisma",
          "Drizzle ORM",
          "PostgreSQL / Supabase",
          "NestJS",
          "Python pipelines",
          "Zod",
        ],
      },
      {
        label: "Delivery",
        items: ["Vercel", "Cloudflare Workers", "GitHub Actions", "Sentry", "Railway"],
      },
      {
        label: "Testing",
        items: ["Vitest", "Playwright", "Jest", "pytest"],
      },
    ],
  },
];
