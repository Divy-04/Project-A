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
 * Two things to fix before launch: `siteUrl` has to be the real domain, and
 * `areaServed` is only as accurate as the towns in Site settings. Once the
 * Google Business Profile exists, add its URL to `sameAs` — that association
 * is a direct ranking signal.
 */
export async function BusinessSchema() {
  const [site, divisions] = await Promise.all([getSettings(), getDivisions()]);

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "HomeAndConstructionBusiness",
    "@id": `${siteUrl}/#business`,
    name: site.name,
    url: siteUrl,
    telephone: site.phone,
    email: site.email,
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
