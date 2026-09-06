import Link from "next/link";
import { Photo } from "@/components/Photo";
import { SectionHead } from "@/components/SectionHead";
import { ArrowIcon } from "@/components/icons";
import { getDivisions } from "@/sanity/loaders";

export async function Services() {
  const divisions = await getDivisions();

  return (
    <section id="services" className="scroll-mt-24 bg-ground py-20 lg:py-28">
      <div className="shell">
        <SectionHead
          label="What we do"
          title="Three divisions, one workshop."
          intro="Equal weight across all three — the same crew measures, fabricates and fits, so nothing gets handed off to a subcontractor halfway through."
        />

        <div className="mt-14 grid gap-10 md:grid-cols-3 md:gap-8">
          {divisions.map((service, i) => (
            <article key={service.slug} className="group flex flex-col">
              <Link href={`/services/${service.slug}`} className="block">
                <Photo
                  image={service.image}
                  ratio="4/3"
                  sizes="(min-width: 768px) 30vw, 92vw"
                  label={service.short}
                  sublabel="4:3"
                  tone={service.tone}
                />
              </Link>

              <div className="mt-6 flex flex-1 flex-col">
                <p className="eyebrow text-ink-3">
                  {String(i + 1).padStart(2, "0")}
                </p>
                <h3 className="mt-3 text-xl font-bold tracking-[-0.02em]">
                  <Link
                    href={`/services/${service.slug}`}
                    className="transition-colors group-hover:text-brand"
                  >
                    {service.title}
                  </Link>
                </h3>
                <p className="mt-3 text-[0.9375rem] leading-relaxed text-ink-2">
                  {service.blurb}
                </p>

                <ul className="mt-5 flex flex-wrap gap-x-2 gap-y-2">
                  {service.items.slice(0, 5).map((item) => (
                    <li
                      key={item}
                      className="rounded-sm border border-line bg-surface px-2.5 py-1 text-xs font-medium text-ink-2"
                    >
                      {item}
                    </li>
                  ))}
                  {service.items.length > 5 && (
                    <li className="px-1 py-1 text-xs font-medium text-ink-3">
                      +{service.items.length - 5} more
                    </li>
                  )}
                </ul>

                <Link
                  href={`/services/${service.slug}`}
                  className="mt-6 inline-flex items-center gap-2 self-start text-sm font-semibold text-ink transition-colors hover:text-brand"
                >
                  View {service.short} work
                  <ArrowIcon className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
                </Link>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
