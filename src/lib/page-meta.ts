import type { Metadata } from "next";
import { getSettings } from "@/sanity/loaders";

/**
 * Title, description, canonical and the matching Open Graph fields for one
 * page.
 *
 * Next merges `openGraph` shallowly, so a page that sets any of it loses the
 * layout's site name and locale. Every page goes through here so WhatsApp and
 * Facebook previews carry the page's own title and description, not a blank.
 * The share image is `app/opengraph-image.png`. File-based metadata only
 * reaches pages that set no `openGraph` of their own, which here is none, so
 * it is named explicitly; its path is static and needs no hash.
 */
export async function pageMetadata({
  title,
  description,
  path,
}: {
  /**
   * Without the site name — the layout's template appends it. Leave it out
   * on the homepage, which uses the layout's default title as it stands.
   */
  title?: string;
  description: string;
  path: string;
}): Promise<Metadata> {
  const site = await getSettings();
  const fullTitle = title ? `${title} – ${site.name}` : homeTitle(site.name);

  return {
    ...(title ? { title } : {}),
    description,
    alternates: { canonical: path },
    openGraph: {
      type: "website",
      siteName: site.name,
      locale: "en_IN",
      url: path,
      title: fullTitle,
      description,
      images: [
        {
          url: "/opengraph-image.png",
          width: 1200,
          height: 630,
          alt: `${site.name}, ${site.address.city} — aluminium, PVC furniture and all furniture.`,
        },
      ],
    },
  };
}

/** The homepage title, which leads with the name instead of ending on it. */
export const homeTitle = (name: string) =>
  `${name} – Aluminium, PVC Furniture & Kitchens, Himatnagar`;
