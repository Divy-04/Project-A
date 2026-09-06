import { Photo } from "@/components/Photo";
import { SectionHead } from "@/components/SectionHead";
import { PinIcon } from "@/components/icons";
import { getHomePage, getSettings } from "@/sanity/loaders";

/**
 * Named towns are a genuine local-search signal — and they are honest
 * coverage, not keyword stuffing, as long as the list stays accurate.
 */
export async function ServiceArea() {
  const [site, home] = await Promise.all([getSettings(), getHomePage()]);

  return (
    <section className="border-t border-line bg-surface py-20 lg:py-28">
      <div className="shell grid gap-12 lg:grid-cols-12 lg:gap-16">
        <div className="lg:col-span-6">
          <SectionHead
            label="Where we work"
            title="Based in Himatnagar. Working across Sabarkantha."
            intro="Our workshop and office are in Durga Complex, Himatnagar. We regularly take on work in the surrounding towns — if you are nearby and not on this list, call and ask."
          />

          <ul className="mt-9 flex flex-wrap gap-2">
            {site.serviceAreas.map((town) => (
              <li
                key={town}
                className="inline-flex items-center gap-1.5 rounded-sm border border-line bg-ground px-3 py-1.5 text-sm font-medium text-ink-2"
              >
                <PinIcon className="h-3.5 w-3.5 text-brand" />
                {town}
              </li>
            ))}
          </ul>
        </div>

        <div className="lg:col-span-6">
          <Photo
            image={home.areaImage}
            ratio="4/3"
            sizes="(min-width: 1024px) 45vw, 92vw"
            label="Workshop / Shopfront"
            sublabel="Photo to be supplied · 4:3"
            tone="neutral"
          />
        </div>
      </div>
    </section>
  );
}
