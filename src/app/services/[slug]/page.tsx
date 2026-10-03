import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ElevationBackdrop, KitchenBackdrop } from "@/components/Backdrop";
import { Breadcrumbs } from "@/components/Breadcrumbs";
import { Button } from "@/components/Button";
import { CtaBand } from "@/components/CtaBand";
import { Faqs } from "@/components/Faqs";
import { PageHeader } from "@/components/PageHeader";
import { Photo } from "@/components/Photo";
import { ProjectCard } from "@/components/ProjectCard";
import { SectionHead } from "@/components/SectionHead";
import { SpecList } from "@/components/SpecList";
import { Swatches } from "@/components/Swatches";
import { ArrowIcon, CheckIcon, PhoneIcon } from "@/components/icons";
import { FaqSchema } from "@/components/FaqSchema";
import { ServiceSchema } from "@/components/ServiceSchema";
import { divisionSeo } from "@/data/seo";
import { telLink } from "@/lib/links";
import { pageMetadata } from "@/lib/page-meta";
import {
  getDivision,
  getDivisions,
  getProjectsInDivision,
  getSettings,
} from "@/sanity/loaders";

/**
 * One page per division.
 *
 * These carry the commercial search terms — "aluminium partition Himatnagar",
 * "PVC door Sabarkantha" — which the homepage can only ever mention in
 * passing. All three are held at equal weight; none gets a longer page than
 * the others by accident.
 *
 * The page is built to stand up with no photographs at all. Finishes, the
 * specification list and the FAQs are the substance; the one image slot is
 * supporting, not load-bearing. That was the fix for these pages reading as a
 * grey box and a bulleted list.
 */
export async function generateStaticParams() {
  const divisions = await getDivisions();
  return divisions.map((division) => ({ slug: division.slug }));
}

export async function generateMetadata({
  params,
}: PageProps<"/services/[slug]">): Promise<Metadata> {
  const { slug } = await params;
  const service = await getDivision(slug);
  if (!service) return {};

  const seo = divisionSeo(service);
  return pageMetadata({
    title: seo.title,
    description: seo.description,
    path: `/services/${service.slug}`,
  });
}

export default async function ServicePage({
  params,
}: PageProps<"/services/[slug]">) {
  const { slug } = await params;
  const [service, divisions, site] = await Promise.all([
    getDivision(slug),
    getDivisions(),
    getSettings(),
  ]);
  if (!service) notFound();

  const work = await getProjectsInDivision(service.slug);
  const others = divisions.filter((s) => s.slug !== service.slug);
  const seo = divisionSeo(service);

  return (
    <>
      <ServiceSchema
        division={service}
        name={seo.title}
        description={seo.description}
        areas={site.serviceAreas}
      />
      <FaqSchema faqs={service.faqs} />

      <PageHeader
        eyebrow={`Division · ${service.short}`}
        title={seo.heading}
        intro={service.blurb}
        aside={
          <Button href={telLink(site)} size="lg">
            <PhoneIcon className="h-4 w-4" />
            Call {site.phoneDisplay}
          </Button>
        }
      >
        <Breadcrumbs
          trail={[
            { href: "/#services", label: "Services" },
            { href: `/services/${service.slug}`, label: service.title },
          ]}
        />
      </PageHeader>

      {/* Lead: the longer intro carries this section, with the scope list
          beside it. The image slot is deliberately secondary and small.
          The backdrop is drawn to match the division — a partition for the
          two that glaze and clad, a kitchen run for furniture. */}
      <section className="relative overflow-hidden bg-ground py-16 lg:py-24">
        {service.slug === "furniture" ? (
          <KitchenBackdrop className="-bottom-20 -left-28 hidden w-[34rem] text-ink/[0.06] xl:block" />
        ) : (
          <ElevationBackdrop className="-bottom-24 -left-24 hidden w-[32rem] text-ink/[0.06] xl:block" />
        )}

        <div className="relative z-10 shell grid gap-12 lg:grid-cols-12 lg:gap-16">
          <div className="lg:col-span-7">
            <SectionHead
              label="What we take on"
              title="Everything in this division, in-house."
            />
            <p className="mt-8 max-w-2xl text-base leading-relaxed text-ink-2 sm:text-[1.0625rem]">
              {service.intro}
            </p>

            <ul className="mt-9 grid gap-x-8 gap-y-3.5 sm:grid-cols-2">
              {service.items.map((item) => (
                <li
                  key={item}
                  className="flex items-start gap-3 text-[0.9375rem] text-ink-2"
                >
                  <span className="mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-brand-tint text-brand">
                    <CheckIcon className="h-3 w-3" />
                  </span>
                  {item}
                </li>
              ))}
            </ul>
          </div>

          <div className="lg:col-span-5">
            <div className="lg:sticky lg:top-28">
              <Photo
                image={service.image}
                ratio="4/5"
                sizes="(min-width: 1024px) 38vw, 92vw"
                label={service.title}
                sublabel="Division photograph · 4:5"
                tone={service.tone}
              />
            </div>
          </div>
        </div>
      </section>

      {/* Finishes. The most useful thing on the page while there are no
          photographs, and it stays useful once there are. */}
      {service.finishGroups.length > 0 && (
        <section className="border-y border-line bg-surface py-20 lg:py-24">
          <div className="shell">
            <SectionHead
              label="Finishes"
              title="Choose the finish, not just the shape."
              intro="Colours here are indicative — every one of them looks different on a screen than it does in your hand, so ask to see a sample before you decide."
            />
            <div className="mt-14">
              <Swatches groups={service.finishGroups} />
            </div>
          </div>
        </section>
      )}

      {service.specs.length > 0 && (
        <section className="bg-ground py-20 lg:py-24">
          <div className="shell grid gap-12 lg:grid-cols-12 lg:gap-16">
            <div className="lg:col-span-5">
              <SectionHead
                label="Specification"
                title="What the quote covers."
                intro="Written down so you can hold our figure against anyone else's and know you are comparing the same thing."
              />
            </div>
            <div className="lg:col-span-7">
              <SpecList specs={service.specs} />
            </div>
          </div>
        </section>
      )}

      {work.length > 0 && (
        <section className="border-y border-line bg-surface py-20 lg:py-24">
          <div className="shell">
            <SectionHead
              label="Recent work"
              title={`${service.short} jobs we have finished.`}
              intro={`Completed ${service.title} projects around ${site.address.city}. Each one has its own page with photographs and location.`}
              align="between"
              action={
                <Button href="/gallery" variant="outline">
                  All projects
                  <ArrowIcon className="h-4 w-4" />
                </Button>
              }
            />
            <div className="mt-12 grid gap-x-6 gap-y-10 sm:grid-cols-2 lg:grid-cols-3">
              {work.map((project) => (
                <ProjectCard key={project._id} project={project} />
              ))}
            </div>
          </div>
        </section>
      )}

      {service.faqs.length > 0 && (
        <section className="bg-ground py-20 lg:py-24">
          <div className="shell grid gap-12 lg:grid-cols-12 lg:gap-16">
            <div className="lg:col-span-5">
              <SectionHead
                label="Questions"
                title={`What we get asked about ${service.short}.`}
              />
            </div>
            <div className="lg:col-span-7">
              <Faqs faqs={service.faqs} />
            </div>
          </div>
        </section>
      )}

      <section className="border-t border-line bg-surface py-20 lg:py-24">
        <div className="shell">
          <SectionHead
            label="The other two divisions"
            title="Same workshop, same crew."
            intro="Most jobs touch more than one division. Having all three under one roof is what stops a project stalling between trades."
          />

          <div className="mt-12 grid gap-8 sm:grid-cols-2">
            {others.map((other) => (
              <Link
                key={other.slug}
                href={`/services/${other.slug}`}
                className="group flex flex-col rounded-sm border border-line bg-ground p-7 transition-colors hover:border-line-strong"
              >
                <h3 className="text-xl font-bold tracking-[-0.02em] transition-colors group-hover:text-brand">
                  {other.title}
                </h3>
                <p className="mt-3 flex-1 text-[0.9375rem] leading-relaxed text-ink-2">
                  {other.blurb}
                </p>
                <span className="mt-6 inline-flex items-center gap-2 text-sm font-semibold text-ink">
                  View division
                  <ArrowIcon className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
                </span>
              </Link>
            ))}
          </div>
        </div>
      </section>

      <CtaBand />
    </>
  );
}
