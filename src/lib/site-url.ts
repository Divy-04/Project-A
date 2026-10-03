/**
 * The site's own origin. Canonical URLs, the sitemap, robots.txt and the
 * LocalBusiness JSON-LD all build off it, so it has to be right before launch.
 *
 * Infrastructure, not content — it belongs to the deployment, not to the
 * editor, which is why it is an environment variable rather than a Sanity
 * field. The fallback is the live domain, bought 3 Oct 2026.
 */
export const siteUrl = (
  process.env.NEXT_PUBLIC_SITE_URL ?? "https://aadienterprise.in"
).replace(/\/$/, "");
