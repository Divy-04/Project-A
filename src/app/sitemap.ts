import type { MetadataRoute } from "next";
import { projects } from "@/data/projects";
import { services } from "@/data/services";
import { site } from "@/data/site";

/**
 * Built from the same data the pages are, so a project added in Sanity later
 * appears here without anyone remembering to update a list.
 *
 * `lastModified` is deliberately omitted rather than stamped with the build
 * date: telling Google every page changed on every deploy is worse than
 * telling it nothing. Reinstate it per-project once Sanity carries a real
 * `_updatedAt`.
 */
export default function sitemap(): MetadataRoute.Sitemap {
  const url = (path: string) => `${site.url}${path}`;

  return [
    { url: url("/"), changeFrequency: "monthly", priority: 1 },
    { url: url("/gallery"), changeFrequency: "weekly", priority: 0.9 },
    { url: url("/about"), changeFrequency: "yearly", priority: 0.7 },
    { url: url("/contact"), changeFrequency: "yearly", priority: 0.8 },

    ...services.map((service) => ({
      url: url(`/services/${service.slug}`),
      changeFrequency: "monthly" as const,
      priority: 0.9,
    })),

    ...projects.map((project) => ({
      url: url(`/gallery/${project.slug}`),
      changeFrequency: "yearly" as const,
      priority: 0.6,
    })),
  ];
}
