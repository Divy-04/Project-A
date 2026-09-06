import { cache } from "react";
import { client } from "./client";
import {
  aboutPageQuery,
  divisionsQuery,
  homePageQuery,
  projectsQuery,
  settingsQuery,
  testimonialsQuery,
} from "./queries";
import type {
  AboutPage,
  Division,
  HomePage,
  Project,
  SiteSettings,
  Testimonial,
} from "./types";

/**
 * Every read the site makes, as plain async functions.
 *
 * Server components call these directly rather than having data threaded
 * down from the page — `cache()` dedupes within one render, so the settings
 * query runs once per page however many components ask. Client components
 * cannot call these; they get what they need as props from a server parent.
 *
 * A missing singleton is a hard error with the fix in the message. The site
 * would otherwise build with a blank footer and an empty About page and look
 * finished; failing the build is the honest outcome.
 */

const missing = (what: string) =>
  new Error(
    `Sanity: the ${what} document is missing from dataset "${client.config().dataset}". ` +
      "Run `npm run seed` inside studio/ to create it.",
  );

export const getSettings = cache(async (): Promise<SiteSettings> => {
  const settings = await client.fetch<SiteSettings | null>(settingsQuery);
  if (!settings) throw missing("siteSettings");
  return settings;
});

export const getDivisions = cache(
  async (): Promise<Division[]> => client.fetch<Division[]>(divisionsQuery),
);

export const getDivision = cache(async (slug: string) => {
  const divisions = await getDivisions();
  return divisions.find((d) => d.slug === slug) ?? null;
});

export const getProjects = cache(
  async (): Promise<Project[]> => client.fetch<Project[]>(projectsQuery),
);

export const getProject = cache(async (slug: string) => {
  const projects = await getProjects();
  return projects.find((p) => p.slug === slug) ?? null;
});

export const getProjectsInDivision = cache(async (slug: string) => {
  const projects = await getProjects();
  return projects.filter((p) => p.division.slug === slug);
});

export const getTestimonials = cache(
  async (): Promise<Testimonial[]> =>
    client.fetch<Testimonial[]>(testimonialsQuery),
);

/** Six newest — fills the featured strip until the editor has picked any. */
const FEATURED_FALLBACK = 6;

export const getHomePage = cache(async (): Promise<HomePage> => {
  const page = await client.fetch<HomePage | null>(homePageQuery);
  const picked = page?.featuredProjects ?? [];
  const featuredProjects =
    picked.length > 0
      ? picked
      : (await getProjects()).slice(0, FEATURED_FALLBACK);

  return {
    heroLead: page?.heroLead ?? null,
    heroSmallLeft: page?.heroSmallLeft ?? null,
    heroSmallRight: page?.heroSmallRight ?? null,
    beforeImage: page?.beforeImage ?? null,
    afterImage: page?.afterImage ?? null,
    areaImage: page?.areaImage ?? null,
    featuredProjects,
  };
});

export const getAboutPage = cache(async (): Promise<AboutPage> => {
  const page = await client.fetch<AboutPage | null>(aboutPageQuery);
  if (!page) throw missing("aboutPage");
  return page;
});
