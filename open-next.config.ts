import { defineCloudflareConfig } from "@opennextjs/cloudflare";
import staticAssetsIncrementalCache from "@opennextjs/cloudflare/overrides/incremental-cache/static-assets-incremental-cache";

/**
 * Every page is prerendered at build time and content changes only by a full
 * rebuild (the Sanity webhook hits the Workers Builds deploy hook), so the
 * cache is the read-only one that serves build output from static assets — no
 * R2 bucket to create or pay for. It cannot revalidate, and nothing here asks
 * it to. Cache interception answers a prerendered page before the Next server
 * loads, which keeps each request well inside the free plan's CPU budget.
 */
export default defineCloudflareConfig({
  incrementalCache: staticAssetsIncrementalCache,
  enableCacheInterception: true,
});
