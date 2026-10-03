import { siteUrl } from "@/lib/site-url";
import { getDivisions, getSettings } from "@/sanity/loaders";

/**
 * LocalBusiness structured data, emitted once site-wide.
 *
 * This is the machine-readable version of the name/address/phone block in the
 * footer. It is what lets Google tie the site to the Google Business Profile
 * and to the map pack, which for a single-location trade business is most of
 * the local-search battle.
 *
 * `areaServed` is only as accurate as the towns in Site settings, and the
 * opening hours only as accurate as the hours line there. The Google Maps
 * link in Site settings becomes `hasMap` and `sameAs`: once it points at the
 * Google Business Profile listing, that tie between site and listing — a
 * direct local ranking signal — arrives with no code change.
 */
export async function BusinessSchema() {
  const [site, divisions] = await Promise.all([getSettings(), getDivisions()]);
  const hours = openingHours(site.hours);

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "HomeAndConstructionBusiness",
    "@id": `${siteUrl}/#business`,
    name: site.name,
    url: siteUrl,
    logo: `${siteUrl}/icons/icon-512.png`,
    image: `${siteUrl}/opengraph-image.png`,
    telephone: site.phone,
    email: site.email,
    currenciesAccepted: "INR",
    ...(hours ? { openingHoursSpecification: hours } : {}),
    ...(site.mapsUrl ? { hasMap: site.mapsUrl, sameAs: [site.mapsUrl] } : {}),
    founder: { "@type": "Person", name: site.owner },
    foundingDate: String(site.establishedYear),
    address: {
      "@type": "PostalAddress",
      streetAddress: site.address.line1,
      addressLocality: site.address.city,
      addressRegion: site.address.state,
      postalCode: site.address.postalCode,
      addressCountry: "IN",
    },
    areaServed: site.serviceAreas.map((town) => ({
      "@type": "City",
      name: town,
    })),
    knowsAbout: divisions.flatMap((division) => division.items),
    makesOffer: divisions.map((division) => ({
      "@type": "Offer",
      itemOffered: {
        "@type": "Service",
        name: division.title,
        description: division.blurb,
        url: `${siteUrl}/services/${division.slug}`,
      },
    })),
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
    />
  );
}

const DAYS = [
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday",
  "Sunday",
];

/**
 * Reads the hours line from Site settings — "Monday – Saturday, 9:00 am –
 * 8:00 pm" — into opening-hours data. Anything it cannot read with certainty
 * returns null and the field is left out: wrong hours in structured data are
 * worse than none, because Google may show them.
 */
function openingHours(line: string) {
  const match = line.match(
    /^(\w+)\s*[–-]\s*(\w+),\s*(\d{1,2})(?::(\d{2}))?\s*(am|pm)\s*[–-]\s*(\d{1,2})(?::(\d{2}))?\s*(am|pm)$/i,
  );
  if (!match) return null;

  const [, fromDay, toDay, oh, om = "00", oap, ch, cm = "00", cap] = match;
  const start = DAYS.findIndex((d) => d.toLowerCase() === fromDay.toLowerCase());
  const end = DAYS.findIndex((d) => d.toLowerCase() === toDay.toLowerCase());
  if (start < 0 || end < start) return null;

  const time = (h: string, m: string, ap: string) => {
    const hour = (Number(h) % 12) + (ap.toLowerCase() === "pm" ? 12 : 0);
    return `${String(hour).padStart(2, "0")}:${m}`;
  };

  return [
    {
      "@type": "OpeningHoursSpecification",
      dayOfWeek: DAYS.slice(start, end + 1),
      opens: time(oh, om, oap),
      closes: time(ch, cm, cap),
    },
  ];
}
