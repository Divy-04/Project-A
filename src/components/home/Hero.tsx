import { Button } from "@/components/Button";
import { Photo } from "@/components/Photo";
import { ArrowIcon, PhoneIcon } from "@/components/icons";
import { telLink } from "@/lib/links";
import { getHomePage, getSettings } from "@/sanity/loaders";

export async function Hero() {
  const [site, home] = await Promise.all([getSettings(), getHomePage()]);

  return (
    <section className="setout wash-brand relative overflow-hidden bg-ground">
      <div className="relative z-10 shell grid items-center gap-12 pt-8 pb-16 lg:grid-cols-12 lg:gap-16 lg:pt-12 lg:pb-24">
        <div className="lg:col-span-6 lg:-translate-y-[30px]">
          <p className="eyebrow text-ink-3">
            {site.address.city} · {site.address.district} · Since{" "}
            {site.establishedYear}
          </p>

          <h1 className="mt-6 text-[2.25rem] leading-[1.05] font-extrabold tracking-[-0.035em] text-balance sm:text-5xl lg:text-[3.75rem]">
            Aluminium, glass and interior work across{" "}
            <span className="text-brand">Himatnagar</span>.
          </h1>

          <p className="mt-6 max-w-lg text-base leading-relaxed text-ink-2 sm:text-[1.0625rem]">
            Three divisions under one workshop — aluminium windows and
            glass, PVC furniture and doors, and made-to-measure furniture.
            All measured, fabricated and expertly installed by our team.
          </p>

          <div className="mt-9 flex flex-col gap-3 sm:flex-row sm:flex-wrap sm:items-center">
            <Button href={telLink(site)} size="lg" className="w-full sm:w-auto">
              <PhoneIcon className="h-4 w-4" />
              Call us
            </Button>
            <Button
              href="/gallery"
              variant="outline"
              size="lg"
              className="w-full border-2 border-ink/25 sm:w-auto"
            >
              See our work
              <ArrowIcon className="h-4 w-4" />
            </Button>
          </div>
        </div>

        {/* Asymmetric image pair. Ratios here are final — the photographs from
            the Studio drop in without shifting the layout. Above the fold, so
            they load eagerly. */}
        <div className="lg:col-span-6">
          <div className="relative">
            <Photo
              image={home.heroLead}
              ratio="3/2"
              priority
              sizes="(min-width: 1024px) 45vw, 92vw"
              label="Hero Project"
              sublabel="Aluminium sliding system · 3:2"
              tone="cool"
            />
            <div className="mt-3 grid grid-cols-2 gap-3">
              <Photo
                image={home.heroSmallLeft}
                ratio="4/3"
                priority
                sizes="(min-width: 1024px) 22vw, 45vw"
                label="Modular Kitchen"
                sublabel="4:3"
                tone="warm"
              />
              <Photo
                image={home.heroSmallRight}
                ratio="4/3"
                priority
                sizes="(min-width: 1024px) 22vw, 45vw"
                label="Office Partition"
                sublabel="4:3"
                tone="neutral"
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
