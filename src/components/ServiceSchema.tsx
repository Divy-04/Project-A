import { siteUrl } from "@/lib/site-url";
import type { Division } from "@/sanity/types";

/**
 * Service structured data for one division page.
 *
 * Points back at the site-wide business record by its `@id` instead of
 * repeating the address, so Google reads the three divisions as services of
 * one business in one place. Each item on the page's list becomes an offer
 * in the catalogue, which is how "aluminium partition" or "PVC wardrobe"
 * gets tied to this page in machine-readable form as well as in the copy.
 */
export function ServiceSchema({
  division,
  name,
  description,
  areas,
}: {
  division: Division;
  name: string;
  description: string;
  areas: string[];
}) {
  const url = `${siteUrl}/services/${division.slug}`;

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Service",
    "@id": `${url}#service`,
    name,
    serviceType: division.title,
    description,
    url,
    provider: { "@id": `${siteUrl}/#business` },
    areaServed: areas.map((town) => ({ "@type": "City", name: town })),
    hasOfferCatalog: {
      "@type": "OfferCatalog",
      name: division.title,
      itemListElement: division.items.map((item) => ({
        "@type": "Offer",
        itemOffered: { "@type": "Service", name: item },
      })),
    },
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
    />
  );
}
