import type { Metadata } from "next";
import Link from "next/link";
import {
  ElevationBackdrop,
  KitchenBackdrop,
  MarkWatermark,
} from "@/components/Backdrop";
import { Breadcrumbs } from "@/components/Breadcrumbs";
import { Button } from "@/components/Button";
import { CountUp } from "@/components/CountUp";
import { CtaBand } from "@/components/CtaBand";
import { FooterMap } from "@/components/FooterMap";
import { Placeholder } from "@/components/Placeholder";
import { SectionHead } from "@/components/SectionHead";
import { ArrowIcon, CheckIcon, PinIcon } from "@/components/icons";
import { services } from "@/data/services";
import { site } from "@/data/site";
import { milestones, ownerStory, principles, statement } from "@/data/story";

export const metadata: Metadata = {
  title: "About",
  description: `${site.name} is a fabrication workshop in ${site.address.city}, run by ${site.owner}. Aluminium and glass, KDM PVC profile and furniture — measured, made and fitted by our own team.`,
  alternates: { canonical: "/about" },
};

/**
 * Three patterns carry this page, all of them layout rather than motion:
 *
 *  - an editorial masthead on `.display` type that scales with the viewport
 *    instead of stepping at breakpoints;
 *  - a bento grid, so the owner portrait is one cell among several rather
 *    than a large lonely rectangle waiting on a photograph;
 *  - sticky chapter columns, so the heading stays with the text it belongs to
 *    while that text scrolls.
 *
 * Nothing here starts hidden — sticky and grid only — so the rule that came
 * out of removing the scroll-reveal still holds.
 */
export default function AboutPage() {
  const yearsInTrade = 2026 - site.establishedYear;

  return (
    <>
      {/* Masthead */}
      <section className="setout wash-brand relative overflow-hidden border-b border-line bg-ground">
        <ElevationBackdrop className="top-1/2 -right-24 hidden w-[36rem] -translate-y-1/2 text-ink/[0.06] lg:block" />

        <div className="relative z-10 shell pt-10 pb-16 lg:pt-14 lg:pb-24">
          <Breadcrumbs trail={[{ href: "/about", label: "About" }]} />

          <p className="eyebrow text-brand-ink">About us</p>
          <h1 className="display mt-6 max-w-5xl">
            A workshop in {site.address.city}, run by the man who{" "}
            <span className="text-brand">measures your job</span>.
          </h1>

          <div className="mt-12 grid gap-10 border-t border-line pt-10 lg:grid-cols-12 lg:gap-16">
            <p className="text-base leading-relaxed text-ink-2 lg:col-span-7 lg:text-[1.0625rem]">
              {site.name} is a fabrication business covering aluminium and
              glass, KDM PVC profile and made-to-measure furniture. Three
              divisions, one crew, one place — Durga Complex,{" "}
              {site.address.city}.
            </p>

            <dl className="grid grid-cols-2 gap-x-8 gap-y-6 lg:col-span-5 lg:grid-cols-2">
              {[
                ["Established", String(site.establishedYear)],
                ["Divisions", "Three, all in-house"],
                ["Based in", `${site.address.city}, ${site.address.district}`],
                ["Proprietor", site.owner],
              ].map(([label, value]) => (
                <div key={label}>
                  <dt className="eyebrow text-ink-3">{label}</dt>
                  <dd className="mt-2 font-bold tracking-[-0.02em] text-balance">
                    {value}
                  </dd>
                </div>
              ))}
            </dl>
          </div>
        </div>
      </section>

      {/* Bento. The portrait is one cell of six, so the page does not lean on
          a photograph that has not arrived yet. */}
      <section className="bg-ground py-16 lg:py-24">
        <div className="shell grid grid-cols-2 gap-3 lg:grid-cols-4">
          <div className="col-span-2 lg:row-span-2">
            <div className="h-full overflow-hidden rounded-md border border-line bg-surface">
              <Placeholder
                label={site.owner}
                sublabel="Owner portrait · 4:5"
                tone="neutral"
                ratio="4/5"
                rounded="rounded-none"
              />
              <div className="flex items-baseline justify-between gap-4 p-6">
                <div>
                  <p className="text-lg font-bold tracking-[-0.02em]">
                    {site.owner}
                  </p>
                  <p className="mt-1 text-sm text-ink-3">
                    Proprietor · photograph to be supplied
                  </p>
                </div>
              </div>
            </div>
          </div>

          <div className="bento justify-between">
            <p className="eyebrow text-ink-3">Years in the trade</p>
            <p className="mt-8 text-4xl font-extrabold tracking-[-0.03em] tabular-nums lg:text-[3.5rem]">
              <CountUp value={yearsInTrade} suffix="+" />
            </p>
          </div>

          <div className="bento justify-between">
            <p className="eyebrow text-ink-3">Projects completed</p>
            <p className="mt-8 text-4xl font-extrabold tracking-[-0.03em] tabular-nums lg:text-[3.5rem]">
              <CountUp value={site.projectsCompleted} suffix="+" />
            </p>
          </div>

          <div className="bento col-span-2 justify-between border-brand bg-brand">
            <p className="eyebrow text-white/60">Credential</p>
            <div className="mt-8">
              <p className="flex items-start gap-3 text-xl font-bold tracking-[-0.02em] text-white lg:text-2xl">
                <span className="mt-1 flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-white/20 text-white">
                  <CheckIcon className="h-3 w-3" />
                </span>
                {site.credential}
              </p>
              <p className="mt-3 pl-8 text-[0.9375rem] leading-relaxed text-white/75">
                Profile is bought direct, so the section you are quoted is the
                section that gets fitted.
              </p>
            </div>
          </div>

          <div className="bento col-span-2 lg:col-span-2">
            <p className="eyebrow text-ink-3">Where we work</p>
            <p className="mt-4 flex-1 text-[0.9375rem] leading-relaxed text-ink-2">
              {site.serviceAreas.slice(0, 4).join(", ")} and the towns between
              them — {site.serviceAreas.length} in all.
            </p>
            <Link
              href="/contact"
              className="link-wipe mt-6 inline-flex items-center gap-2 self-start text-sm font-semibold text-ink"
            >
              Find the workshop
              <ArrowIcon className="h-4 w-4" />
            </Link>
          </div>

          <div className="col-span-2 lg:col-span-2">
            <FooterMap tone="light" ratio="16/9" label="Get directions" />
          </div>
        </div>
      </section>

      {/* Sticky chapter: the heading holds while the narrative scrolls past. */}
      <section className="border-y border-line bg-surface py-20 lg:py-28">
        <div className="shell grid gap-12 lg:grid-cols-12 lg:gap-16">
          <div className="lg:col-span-4">
            <div className="lg:sticky lg:top-28">
              <SectionHead label="The owner" title={`${site.owner}.`} />
              <div className="mt-8 flex flex-col gap-3 sm:flex-row lg:flex-col lg:items-start">
                <Button href="/gallery">
                  See finished work
                  <ArrowIcon className="h-4 w-4" />
                </Button>
                <Button href="/contact" variant="outline">
                  Get in touch
                </Button>
              </div>
            </div>
          </div>

          <div className="lg:col-span-8">
            <div className="space-y-6 text-base leading-relaxed text-ink-2 sm:text-[1.0625rem]">
              {ownerStory.map((paragraph) => (
                <p key={paragraph.slice(0, 32)}>{paragraph}</p>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Statement band. One dark section breaks the rhythm of a long light
          page — and it is a principle, not a quotation put in anyone's mouth. */}
      <section className="grain setout setout-dark wash-dark relative overflow-hidden bg-slate">
        <MarkWatermark className="-right-20 -bottom-32 h-[34rem] w-[34rem] text-white/[0.045]" />

        <div className="relative z-10 shell py-20 lg:py-28">
          <p className="eyebrow text-brand-lift">How we work</p>
          <p className="display mt-8 max-w-4xl text-white">{statement}</p>
        </div>
      </section>

      {/* Numbered milestones */}
      <section className="bg-ground py-20 lg:py-28">
        <div className="shell grid gap-12 lg:grid-cols-12 lg:gap-16">
          <div className="lg:col-span-4">
            <div className="lg:sticky lg:top-28">
              <SectionHead
                label="The story"
                title="How the three divisions came together."
                intro="Not a plan so much as a sequence — each division was added because a customer needed it and sending the work elsewhere kept going wrong."
              />
            </div>
          </div>

          <ol className="lg:col-span-8">
            {milestones.map((milestone, i) => (
              <li
                key={milestone.year}
                className="grid grid-cols-[3.5rem_1fr] gap-x-5 border-t border-line py-8 sm:grid-cols-[7rem_1fr] sm:gap-x-10 last:border-b"
              >
                <div>
                  <p className="text-lg font-extrabold tracking-[-0.02em] text-brand-ink tabular-nums sm:text-2xl">
                    {milestone.year}
                  </p>
                  <p className="eyebrow mt-2 text-ink-3 tabular-nums">
                    {String(i + 1).padStart(2, "0")}
                  </p>
                </div>
                <div>
                  <h3 className="text-lg font-bold tracking-[-0.02em] sm:text-xl">
                    {milestone.title}
                  </h3>
                  <p className="mt-3 max-w-xl text-[0.9375rem] leading-relaxed text-ink-2">
                    {milestone.body}
                  </p>
                </div>
              </li>
            ))}
          </ol>
        </div>
      </section>

      {/* Commitments */}
      <section className="border-y border-line bg-surface py-20 lg:py-28">
        <div className="shell">
          <SectionHead
            label="Four commitments"
            title="On every job, without being asked."
            intro="None of this is unusual in a good workshop. It is worth writing down because plenty of quotes you will get do not include it."
          />

          <ol className="mt-14 grid gap-x-10 gap-y-12 sm:grid-cols-2">
            {principles.map((principle, i) => (
              <li key={principle.title} className="border-t border-line pt-7">
                <p className="text-5xl font-extrabold tracking-[-0.04em] text-line-strong tabular-nums lg:text-6xl">
                  {String(i + 1).padStart(2, "0")}
                </p>
                <h3 className="mt-6 text-xl font-bold tracking-[-0.02em]">
                  {principle.title}
                </h3>
                <p className="mt-3 text-[0.9375rem] leading-relaxed text-ink-2">
                  {principle.body}
                </p>
              </li>
            ))}
          </ol>
        </div>
      </section>

      {/* Divisions */}
      <section className="relative overflow-hidden bg-ground py-20 lg:py-28">
        <KitchenBackdrop className="-right-28 -bottom-16 hidden w-[34rem] text-ink/[0.06] xl:block" />

        <div className="relative z-10 shell">
          <SectionHead
            label="Three divisions"
            title="Equal weight, on purpose."
            intro="None of these is a sideline. The same crew and the same standard apply across all three, and most jobs end up touching at least two."
          />

          <div className="mt-14 grid gap-8 md:grid-cols-3">
            {services.map((service, i) => (
              <Link
                key={service.slug}
                href={`/services/${service.slug}`}
                className="group flex flex-col rounded-md border border-line bg-surface p-7 transition-colors hover:border-line-strong"
              >
                <p className="eyebrow text-ink-3 tabular-nums">
                  {String(i + 1).padStart(2, "0")}
                </p>
                <h3 className="mt-4 text-xl font-bold tracking-[-0.02em] transition-colors group-hover:text-brand">
                  {service.title}
                </h3>
                <p className="mt-3 flex-1 text-[0.9375rem] leading-relaxed text-ink-2">
                  {service.blurb}
                </p>
                <span className="mt-6 inline-flex items-center gap-2 text-sm font-semibold text-ink">
                  View division
                  <ArrowIcon className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
                </span>
              </Link>
            ))}
          </div>

          <ul className="mt-14 flex flex-wrap gap-2 border-t border-line pt-10">
            {site.serviceAreas.map((town) => (
              <li
                key={town}
                className="inline-flex items-center gap-1.5 rounded-sm border border-line bg-surface px-3 py-1.5 text-sm font-medium text-ink-2"
              >
                <PinIcon className="h-3.5 w-3.5 text-brand" />
                {town}
              </li>
            ))}
          </ul>
        </div>
      </section>

      <CtaBand />
    </>
  );
}
