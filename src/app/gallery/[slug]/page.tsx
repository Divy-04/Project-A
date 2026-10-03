import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Breadcrumbs } from "@/components/Breadcrumbs";
import { Button } from "@/components/Button";
import { CtaBand } from "@/components/CtaBand";
import { PageHeader } from "@/components/PageHeader";
import { Photo } from "@/components/Photo";
import { ProjectCard } from "@/components/ProjectCard";
import { SectionHead } from "@/components/SectionHead";
import { ArrowIcon, PhoneIcon } from "@/components/icons";
import { formatCompleted } from "@/lib/format";
import { telLink } from "@/lib/links";
import { divisionWork } from "@/data/seo";
import { pageMetadata } from "@/lib/page-meta";
import {
  getDivision,
  getProject,
  getProjects,
  getSettings,
} from "@/sanity/loaders";

/**
 * One page per completed job.
 *
 * This is the part of the site that grows: every project the owner publishes
 * in the Studio becomes another indexable page carrying a real town name and
 * a real trade term. All of them are prerendered — `generateStaticParams`
 * reads the list from Sanity at build time, and a publish triggers a rebuild.
 */
export async function generateStaticParams() {
  const projects = await getProjects();
  return projects.map((project) => ({ slug: project.slug }));
}

export async function generateMetadata({
  params,
}: PageProps<"/gallery/[slug]">): Promise<Metadata> {
  const { slug } = await params;
  const [project, site] = await Promise.all([getProject(slug), getSettings()]);
  if (!project) return {};

  /* The owner's summary first, then a line that always names the division,
     the town and the business — so a short summary still reads as a local
     result for that kind of work. */
  const summary = project.summary.trim().replace(/([^.!?])$/, "$1.");
  return pageMetadata({
    title: `${project.title}, ${project.location}`,
    description: `${summary} ${divisionWork(project.division)} in ${project.location} by ${site.name}.`,
    path: `/gallery/${project.slug}`,
  });
}

export default async function ProjectPage({
  params,
}: PageProps<"/gallery/[slug]">) {
  const { slug } = await params;
  const [project, projects, site] = await Promise.all([
    getProject(slug),
    getProjects(),
    getSettings(),
  ]);
  if (!project) notFound();

  const division = await getDivision(project.division.slug);
  const tone = project.division.tone;

  const index = projects.findIndex((p) => p.slug === project.slug);
  const previous = projects[index - 1];
  const next = projects[index + 1];

  const related = projects
    .filter(
      (p) => p.division.slug === project.division.slug && p.slug !== project.slug,
    )
    .slice(0, 3);

  const [lead, ...details] = project.images;

  const facts = [
    { label: "Division", value: project.division.title },
    { label: "Location", value: project.location },
    { label: "Completed", value: formatCompleted(project.completedOn) },
    ...(project.images.length > 0
      ? [{ label: "Photographs", value: String(project.images.length) }]
      : []),
  ];

  return (
    <>
      <PageHeader
        eyebrow={project.division.title}
        title={project.title}
        intro={project.summary}
        aside={
          <Button href={telLink(site)} size="lg">
            <PhoneIcon className="h-4 w-4" />
            Ask about a job like this
          </Button>
        }
      >
        <Breadcrumbs
          trail={[
            { href: "/gallery", label: "Our Work" },
            { href: `/gallery/${project.slug}`, label: project.title },
          ]}
        />
      </PageHeader>

      {/* Photographs. Ratios are final, so real images drop in without moving
          anything — the lead shot is 3:2 and the set below it 4:3. */}
      <section className="bg-ground py-14 lg:py-20">
        <div className="shell">
          <Photo
            image={lead}
            ratio="3/2"
            priority
            sizes="(min-width: 1280px) 1184px, 92vw"
            label={project.title}
            sublabel="Lead photograph · 3:2"
            tone={tone}
          />

          {details.length > 0 && (
            <div className="mt-4 grid gap-4 sm:grid-cols-3">
              {details.map((image, i) => (
                <Photo
                  key={image.asset._id + i}
                  image={image}
                  ratio="4/3"
                  sizes="(min-width: 640px) 30vw, 92vw"
                  label={`Detail ${i + 1}`}
                  sublabel="4:3"
                  tone={tone}
                />
              ))}
            </div>
          )}

          {!lead && (
            <p className="mt-5 text-[0.8125rem] text-ink-3">
              Photographs to be supplied by {site.owner}. This slot is sized
              and positioned as it will appear.
            </p>
          )}
        </div>
      </section>

      <section className="border-y border-line bg-surface py-16 lg:py-20">
        <div className="shell grid gap-12 lg:grid-cols-12 lg:gap-16">
          <div className="lg:col-span-7">
            <SectionHead
              label="What was involved"
              title="Measured on site, built to that measurement."
            />
            <p className="mt-8 text-[0.9375rem] leading-relaxed text-ink-2 sm:text-base">
              {project.summary} The opening was surveyed before anything was
              cut, the unit was fabricated on our own bench, and our team
              delivered and fitted it — the same four stages every job goes
              through.
            </p>

            {division && (
              <>
                <p className="eyebrow mt-10 text-ink-3">
                  Related to this division
                </p>
                <ul className="mt-4 flex flex-wrap gap-2">
                  {division.items.map((item) => (
                    <li
                      key={item}
                      className="rounded-sm border border-line bg-ground px-2.5 py-1 text-xs font-medium text-ink-2"
                    >
                      {item}
                    </li>
                  ))}
                </ul>

                <Link
                  href={`/services/${division.slug}`}
                  className="mt-8 inline-flex items-center gap-2 text-sm font-semibold text-ink transition-colors hover:text-brand"
                >
                  More {division.short} work
                  <ArrowIcon className="h-4 w-4" />
                </Link>
              </>
            )}
          </div>

          <div className="lg:col-span-5">
            <dl className="divide-y divide-line border-y border-line">
              {facts.map((fact) => (
                <div
                  key={fact.label}
                  className="flex items-baseline justify-between gap-6 py-4"
                >
                  <dt className="eyebrow text-ink-3">{fact.label}</dt>
                  <dd className="text-right text-[0.9375rem] font-semibold text-ink">
                    {fact.value}
                  </dd>
                </div>
              ))}
            </dl>
          </div>
        </div>
      </section>

      {related.length > 0 && (
        <section className="bg-ground py-20 lg:py-24">
          <div className="shell">
            <SectionHead
              label="More like this"
              title={`More ${project.division.title} work.`}
              align="between"
              action={
                <Button href="/gallery" variant="outline">
                  All projects
                  <ArrowIcon className="h-4 w-4" />
                </Button>
              }
            />
            <div className="mt-12 grid gap-x-6 gap-y-10 sm:grid-cols-2 lg:grid-cols-3">
              {related.map((p) => (
                <ProjectCard key={p._id} project={p} />
              ))}
            </div>
          </div>
        </section>
      )}

      <nav
        aria-label="Project navigation"
        className="border-t border-line bg-surface"
      >
        <div className="shell grid divide-y divide-line sm:grid-cols-2 sm:divide-x sm:divide-y-0">
          {previous ? (
            <Link
              href={`/gallery/${previous.slug}`}
              className="group py-8 sm:pr-8"
            >
              <span className="eyebrow text-ink-3">Previous</span>
              <span className="mt-2.5 block font-bold tracking-[-0.02em] transition-colors group-hover:text-brand">
                {previous.title}
              </span>
            </Link>
          ) : (
            <span />
          )}

          {next && (
            <Link
              href={`/gallery/${next.slug}`}
              className="group py-8 sm:pl-8 sm:text-right"
            >
              <span className="eyebrow text-ink-3">Next</span>
              <span className="mt-2.5 block font-bold tracking-[-0.02em] transition-colors group-hover:text-brand">
                {next.title}
              </span>
            </Link>
          )}
        </div>
      </nav>

      <CtaBand />
    </>
  );
}
