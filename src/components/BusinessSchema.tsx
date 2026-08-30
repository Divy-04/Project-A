import { services } from "@/data/services";
import { site } from "@/data/site";

/**
 * LocalBusiness structured data, emitted once site-wide.
 *
 * This is the machine-readable version of the name/address/phone block in the
 * footer. It is what lets Google tie the site to the Google Business Profile
 * and to the map pack, which for a single-location trade business is most of
 * the local-search battle.
 *
 * Two things to fix before launch, both marked TBC in site.ts: `site.url` has
 * to be the real domain, and `hasMap`/`areaServed` are only as accurate as the
 * values in there. Once the Google Business Profile exists, add its URL to
 * `sameAs` — that association is a direct ranking signal.
 */
export function BusinessSchema() {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "HomeAndConstructionBusiness",
    "@id": `${site.url}/#business`,
    name: site.name,
    url: site.url,
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
    knowsAbout: services.flatMap((service) => service.items),
    makesOffer: services.map((service) => ({
      "@type": "Offer",
      itemOffered: {
        "@type": "Service",
        name: service.title,
        description: service.blurb,
        url: `${site.url}/services/${service.slug}`,
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
