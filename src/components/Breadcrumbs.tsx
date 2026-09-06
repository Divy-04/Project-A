import Link from "next/link";
import { siteUrl } from "@/lib/site-url";

export type Crumb = { href: string; label: string };

/**
 * Breadcrumb trail for the nested pages.
 *
 * Emits BreadcrumbList JSON-LD alongside the visible trail. Google builds the
 * breadcrumb shown under a search result from this, and a result that shows
 * "aadienterprise.com › Our Work › Aluminium & Glass" reads as a real site
 * rather than a loose page — worth the handful of bytes.
 */
export function Breadcrumbs({ trail }: { trail: Crumb[] }) {
  const items = [{ href: "/", label: "Home" }, ...trail];
  const last = items.length - 1;

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items.map((c, i) => ({
      "@type": "ListItem",
      position: i + 1,
      name: c.label,
      item: `${siteUrl}${c.href === "/" ? "" : c.href}`,
    })),
  };

  return (
    <>
      <nav aria-label="Breadcrumb" className="mb-9">
        <ol className="flex flex-wrap items-center gap-x-2 gap-y-1 text-[0.8125rem] text-ink-3">
          {items.map((c, i) => (
            <li key={c.href} className="flex items-center gap-2">
              {i === last ? (
                <span aria-current="page" className="font-medium text-ink-2">
                  {c.label}
                </span>
              ) : (
                <Link href={c.href} className="transition-colors hover:text-ink">
                  {c.label}
                </Link>
              )}
              {i !== last && (
                <span aria-hidden="true" className="text-line-strong">
                  /
                </span>
              )}
            </li>
          ))}
        </ol>
      </nav>

      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
    </>
  );
}
