import type { SiteSettings } from "@/sanity/types";

/** Contact links, derived from settings so a number changed in the Studio
 *  changes every button on the site. */

export const telLink = (settings: Pick<SiteSettings, "phone">) =>
  `tel:${settings.phone}`;

export const waLink = (
  settings: Pick<SiteSettings, "whatsapp">,
  message = "Hello, I would like a quote for",
) => `https://wa.me/${settings.whatsapp}?text=${encodeURIComponent(message)}`;

export const fullAddress = (settings: Pick<SiteSettings, "address">) =>
  `${settings.address.line1}, ${settings.address.city}, ${settings.address.state} ${settings.address.postalCode}`;

/**
 * Directions. Prefers the editor-supplied URL — once the Google Business
 * Profile exists that should be the listing, because direction requests on
 * GBP are a local ranking signal and a plain map search is not.
 */
export const mapsUrl = (settings: Pick<SiteSettings, "address" | "mapsUrl">) =>
  settings.mapsUrl ||
  `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(fullAddress(settings))}`;

export const mapsEmbedUrl = (settings: Pick<SiteSettings, "address">) =>
  `https://www.google.com/maps?q=${encodeURIComponent(fullAddress(settings))}&output=embed`;
