import { Button } from "@/components/Button";
import { Placeholder } from "@/components/Placeholder";
import { ArrowIcon, CheckIcon, PhoneIcon } from "@/components/icons";
import { site, telLink } from "@/data/site";

export function Hero() {
  return (
    <section className="setout wash-brand relative overflow-hidden bg-ground">
      <div className="relative z-10 shell grid items-center gap-12 pt-14 pb-16 lg:grid-cols-12 lg:gap-16 lg:pt-20 lg:pb-24">
        <div className="lg:col-span-6">
          <p className="eyebrow text-ink-3">
            {site.address.city} · {site.address.district} · Since{" "}
            {site.establishedYear}
          </p>

          <h1 className="mt-6 text-[2.25rem] leading-[1.05] font-extrabold tracking-[-0.035em] text-balance sm:text-5xl lg:text-[3.75rem]">
            Aluminium, glass and interior work across{" "}
            <span className="text-brand">Himatnagar</span>.
          </h1>

          <p className="mt-6 max-w-lg text-base leading-relaxed text-ink-2 sm:text-[1.0625rem]">
            Three divisions under one workshop — aluminium and glass
            fabrication, KDM PVC profile, and made-to-measure furniture.
            Measured, fabricated and fitted by our own team.
          </p>

          <div className="mt-9 flex flex-col gap-3 sm:flex-row sm:flex-wrap sm:items-center">
            <Button href={telLink} size="lg" className="w-full sm:w-auto">
              <PhoneIcon className="h-4 w-4" />
              Call {site.phoneDisplay}
            </Button>
            <Button
              href="/gallery"
              variant="outline"
              size="lg"
              className="w-full sm:w-auto"
            >
              See our work
              <ArrowIcon className="h-4 w-4" />
            </Button>
          </div>

          <p className="mt-9 flex items-center gap-2.5 text-sm font-medium text-ink-2">
            <span className="flex h-5 w-5 items-center justify-center rounded-full bg-brand-tint text-brand">
              <CheckIcon className="h-3 w-3" />
            </span>
            {site.credential}
          </p>
        </div>

        {/* Asymmetric image pair. Ratios here are final — real photography
            drops in without shifting the layout. */}
        <div className="lg:col-span-6">
          <div className="relative">
            <Placeholder
              label="Hero Project"
              sublabel="Aluminium sliding system · 3:2"
              tone="cool"
              ratio="3/2"
            />
            <div className="mt-3 grid grid-cols-2 gap-3">
              <Placeholder
                label="Modular Kitchen"
                sublabel="4:3"
                tone="warm"
                ratio="4/3"
              />
              <Placeholder
                label="Office Partition"
                sublabel="4:3"
                tone="neutral"
                ratio="4/3"
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
