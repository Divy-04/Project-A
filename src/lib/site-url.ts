/**
 * The site's own origin. Canonical URLs, the sitemap, robots.txt and the
 * LocalBusiness JSON-LD all build off it, so it has to be right before launch.
 *
 * Infrastructure, not content — it belongs to the deployment, not to the
 * editor, which is why it is an environment variable rather than a Sanity
 * field. TBC: the fallback is a guess at the real domain.
 */
export const siteUrl = (
  process.env.NEXT_PUBLIC_SITE_URL ?? "https://aadienterprise.com"
).replace(/\/$/, "");
