import { createClient } from "@sanity/client";

/**
 * The one Sanity client the site uses.
 *
 * Every page is prerendered, so this runs at build time (and in `next dev`),
 * never in the browser. The dataset is public, so no token is involved: the
 * build reads published content anonymously, and the only credential in the
 * project is the Studio's, which lives in `studio/` and never here.
 *
 * `useCdn: false` on purpose. The rebuild that a publish triggers fires within
 * seconds of the edit, and the CDN can lag a publish by a few seconds — long
 * enough to build a site from the version before the one just published.
 * The API is authoritative; a build makes a dozen requests, so speed is moot.
 *
 * `perspective: "published"` means drafts are never read. A half-written
 * project in the Studio cannot leak onto the site.
 */
export const projectId =
  process.env.NEXT_PUBLIC_SANITY_PROJECT_ID ?? "hhvsb0rp";
export const dataset = process.env.NEXT_PUBLIC_SANITY_DATASET ?? "production";

/** Pin the API date. Bumping it is a deliberate act, not a side effect. */
export const apiVersion = "2026-09-01";

export const client = createClient({
  projectId,
  dataset,
  apiVersion,
  useCdn: false,
  perspective: "published",
});
