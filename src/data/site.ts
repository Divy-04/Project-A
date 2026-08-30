/**
 * Business-wide settings.
 *
 * This mirrors the future Sanity `siteSettings` singleton one-for-one, so
 * wiring the CMS later is a swap, not a rewrite.
 *
 * Values marked TBC are placeholders awaiting confirmation from the client.
 */
export const site = {
  name: "AADI ENTERPRISE",
  owner: "Nilesh Patel",

  /**
   * TBC — the client's own domain. Canonical URLs, the sitemap and robots.txt
   * all build off this, so it has to be right before launch. Overridable at
   * build time so staging and production don't need a code change.
   */
  url: process.env.NEXT_PUBLIC_SITE_URL ?? "https://aadienterprise.com",

  phone: "+919724820859",
  phoneDisplay: "97248 20859",
  whatsapp: "919724820859", // TBC — assumed same as mobile
  email: "aadi2912.rangpur@gmail.com",

  address: {
    line1: "B/G-2, Durga Complex",
    city: "Himatnagar",
    district: "Sabarkantha",
    state: "Gujarat",
    postalCode: "383001", // TBC
    country: "India",
  },

  hours: "Monday – Saturday, 9:00 am – 8:00 pm", // TBC
  hoursShort: "Mon–Sat · 9 am – 8 pm", // TBC

  establishedYear: 2011, // TBC
  projectsCompleted: 750, // TBC

  /** Trust credential straight off the business card. */
  credential: "Authorised Distributor — KDM PVC Profile",

  /** TBC — confirm which towns he actually travels to. */
  serviceAreas: [
    "Himatnagar",
    "Idar",
    "Prantij",
    "Talod",
    "Vadali",
    "Khedbrahma",
    "Bhiloda",
    "Modasa",
    "Gandhinagar",
  ],
} as const;

/**
 * TBC — replace with the exact pin. Ask the client to drop a location in
 * Google Maps and share the link, or send lat/long. Once the Google Business
 * Profile exists, point this at the listing instead: direction requests on
 * GBP are a local ranking signal, a plain map search is not.
 */
export const mapsUrl = `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(
  `${site.address.line1}, ${site.address.city}, ${site.address.state} ${site.address.postalCode}`,
)}`;

export const waLink = (message = "Hello, I would like a quote for") =>
  `https://wa.me/${site.whatsapp}?text=${encodeURIComponent(message)}`;

export const telLink = `tel:${site.phone}`;
