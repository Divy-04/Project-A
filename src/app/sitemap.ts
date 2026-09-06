import type { MetadataRoute } from "next";
import { siteUrl } from "@/lib/site-url";
import { getDivisions, getProjects } from "@/sanity/loaders";

/**
 * Built from the same data the pages are, so a project published in the
 * Studio appears here on the next build without anyone updating a list.
 *
 * `lastModified` is deliberately omitted rather than stamped with the build
 * date: telling Google every page changed on every deploy is worse than
 * telling it nothing. Reinstate it per-project once it is worth carrying
 * `_updatedAt` through the projection.
 */
export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const [divisions, projects] = await Promise.all([
    getDivisions(),
    getProjects(),
  ]);
  const url = (path: string) => `${siteUrl}${path}`;

  return [
    { url: url("/"), changeFrequency: "monthly", priority: 1 },
    { url: url("/gallery"), changeFrequency: "weekly", priority: 0.9 },
    { url: url("/about"), changeFrequency: "yearly", priority: 0.7 },
    { url: url("/contact"), changeFrequency: "yearly", priority: 0.8 },

    ...divisions.map((division) => ({
      url: url(`/services/${division.slug}`),
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
