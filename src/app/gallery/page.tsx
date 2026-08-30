import type { Metadata } from "next";
import { ElevationBackdrop } from "@/components/Backdrop";
import { Breadcrumbs } from "@/components/Breadcrumbs";
import { CtaBand } from "@/components/CtaBand";
import { GalleryBrowser } from "@/components/GalleryBrowser";
import { projects } from "@/data/projects";
import { services } from "@/data/services";
import { site } from "@/data/site";

export const metadata: Metadata = {
  title: "Our Work",
  description: `Completed aluminium, glass, PVC profile and furniture projects across ${site.address.city} and ${site.address.district}. Photographs, location and what each job involved.`,
  alternates: { canonical: "/gallery" },
};

/**
 * The work index.
 *
 * This used to be three stacked sections with anchor links that jumped
 * between them. It is one set of projects and a selector now — pick a
 * division, or switch between the card grid and the list. The selector is
 * sticky, so it stays reachable however far down you are.
 *
 * The browser is a client component, but it renders every project unfiltered
 * on the server: nothing is hidden until someone clicks. See GalleryBrowser.
 */
export default function GalleryPage() {
  const towns = new Set(projects.map((p) => p.location.split(",").pop()!.trim()));

  const facts = [
    ["Projects", String(projects.length)],
    ["Divisions", String(services.length)],
    ["Towns", String(towns.size)],
    ["Based in", site.address.city],
  ];

  return (
    <>
      <section className="setout wash-brand relative overflow-hidden bg-ground">
        <ElevationBackdrop className="top-1/2 -right-20 hidden w-[32rem] -translate-y-1/2 text-ink/[0.06] lg:block" />

        <div className="relative z-10 shell pt-10 pb-14 lg:pt-14 lg:pb-20">
          <Breadcrumbs trail={[{ href: "/gallery", label: "Our Work" }]} />

          <p className="eyebrow text-brand-ink">Our work</p>
          <h1 className="display mt-6 max-w-4xl">
            Measured, made and{" "}
            <span className="text-brand">fitted by us</span>.
          </h1>

          <div className="mt-12 grid gap-10 border-t border-line pt-10 lg:grid-cols-12 lg:gap-16">
            <p className="text-base leading-relaxed text-ink-2 lg:col-span-7 lg:text-[1.0625rem]">
              Finished jobs across all three divisions, most recent first.
              Every one has its own page with photographs, the town it was done
              in and a note on what was involved.
            </p>

            <dl className="grid grid-cols-2 gap-x-8 gap-y-6 lg:col-span-5">
              {facts.map(([label, value]) => (
                <div key={label}>
                  <dt className="eyebrow text-ink-3">{label}</dt>
                  <dd className="mt-2 text-2xl font-extrabold tracking-[-0.03em] tabular-nums">
                    {value}
                  </dd>
                </div>
              ))}
            </dl>
          </div>
        </div>
      </section>

      <GalleryBrowser
        projects={projects}
        divisions={services.map(({ slug, title, short }) => ({
          slug,
          title,
          short,
        }))}
      />

      <CtaBand />
    </>
  );
}
