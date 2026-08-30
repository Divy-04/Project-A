import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Breadcrumbs } from "@/components/Breadcrumbs";
import { Button } from "@/components/Button";
import { CtaBand } from "@/components/CtaBand";
import { PageHeader } from "@/components/PageHeader";
import { Placeholder, type Tone } from "@/components/Placeholder";
import { ProjectCard } from "@/components/ProjectCard";
import { SectionHead } from "@/components/SectionHead";
import { ArrowIcon, PhoneIcon } from "@/components/icons";
import {
  formatCompleted,
  projectBySlug,
  projects,
  toneForCategory,
} from "@/data/projects";
import { services } from "@/data/services";
import { site, telLink } from "@/data/site";

/**
 * One page per completed job.
 *
 * This is the part of the site that grows: every project the owner uploads
 * becomes another indexable page carrying a real town name and a real trade
 * term. Six placeholder records today, statically prerendered — the same
 * generateStaticParams reads from Sanity later without the page changing.
 */
export function generateStaticParams() {
  return projects.map((project) => ({ slug: project.slug }));
}

export async function generateMetadata({
  params,
}: PageProps<"/gallery/[slug]">): Promise<Metadata> {
  const { slug } = await params;
  const project = projectBySlug(slug);
  if (!project) return {};

  return {
    title: `${project.title}, ${project.location}`,
    description: project.summary,
    alternates: { canonical: `/gallery/${project.slug}` },
  };
}

export default async function ProjectPage({
  params,
}: PageProps<"/gallery/[slug]">) {
  const { slug } = await params;
  const project = projectBySlug(slug);
  if (!project) notFound();

  const service = services.find((s) => s.slug === project.category);
  const tone = toneForCategory(project.category) as Tone;

  const index = projects.findIndex((p) => p.slug === project.slug);
  const previous = projects[index - 1];
  const next = projects[index + 1];

  const related = projects
    .filter((p) => p.category === project.category && p.slug !== project.slug)
    .slice(0, 3);

  const facts = [
    { label: "Division", value: project.categoryLabel },
    { label: "Location", value: project.location },
    { label: "Completed", value: formatCompleted(project.completedOn) },
    { label: "Photographs", value: `${project.photoCount}` },
  ];

  return (
    <>
      <PageHeader
        eyebrow={project.categoryLabel}
        title={project.title}
        intro={project.summary}
        aside={
          <Button href={telLink} size="lg">
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
          <Placeholder
            label={project.title}
            sublabel="Lead photograph · 3:2"
            tone={tone}
            ratio="3/2"
          />

          {project.photoCount > 1 && (
            <div className="mt-4 grid gap-4 sm:grid-cols-3">
              {Array.from({ length: project.photoCount - 1 }, (_, i) => (
                <Placeholder
                  key={i}
                  label={`Detail ${i + 1}`}
                  sublabel="4:3"
                  tone={tone}
                  ratio="4/3"
                />
              ))}
            </div>
          )}

          <p className="mt-5 text-[0.8125rem] text-ink-3">
            Photographs to be supplied by {site.owner}. These slots are sized
            and positioned as they will appear.
          </p>
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

            {service && (
              <>
                <p className="eyebrow mt-10 text-ink-3">
                  Related to this division
                </p>
                <ul className="mt-4 flex flex-wrap gap-2">
                  {service.items.map((item) => (
                    <li
                      key={item}
                      className="rounded-sm border border-line bg-ground px-2.5 py-1 text-xs font-medium text-ink-2"
                    >
                      {item}
                    </li>
                  ))}
                </ul>

                <Link
                  href={`/services/${service.slug}`}
                  className="mt-8 inline-flex items-center gap-2 text-sm font-semibold text-ink transition-colors hover:text-brand"
                >
                  More {service.short} work
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
              title={`More ${project.categoryLabel} work.`}
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
                <ProjectCard key={p.slug} project={p} />
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
