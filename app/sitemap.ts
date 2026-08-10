import type { MetadataRoute } from "next";
import { site } from "@/content/site";
import { projects } from "@/content/projects";

export default function sitemap(): MetadataRoute.Sitemap {
  return [
    { url: site.url, priority: 1 },
    ...projects.map((project) => ({
      url: `${site.url}/projects/${project.slug}`,
      priority: 0.8,
    })),
  ];
}
