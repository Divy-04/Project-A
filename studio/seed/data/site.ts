/**
 * Seed values for the `siteSettings` singleton — the placeholders the site
 * went into design review with. After the first seed the Studio owns these;
 * this file is history, not the source of truth.
 */
export const site = {
  name: "AADI ENTERPRISE",
  owner: "Nilesh Patel",


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

export const mapsEmbedUrl = `https://www.google.com/maps?q=${encodeURIComponent(
  `${site.address.line1}, ${site.address.city}, ${site.address.state} ${site.address.postalCode}`,
)}&output=embed`;

export const waLink = (message = "Hello, I would like a quote for") =>
  `https://wa.me/${site.whatsapp}?text=${encodeURIComponent(message)}`;

export const telLink = `tel:${site.phone}`;
