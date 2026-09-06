import Link from "next/link";
import { Photo } from "@/components/Photo";
import { ArrowIcon } from "@/components/icons";
import { formatCompleted } from "@/lib/format";
import type { Project } from "@/sanity/types";

/**
 * One project in a grid or a rail. Used on the homepage, the gallery and the
 * service pages, so the card only ever has to be got right once.
 *
 * Two variants:
 *
 * - `plain` (default) — the editorial treatment: an image slot with the
 *   caption set beneath it, no frame. This is what the homepage and the
 *   service pages use, where cards sit inside a page that already has plenty
 *   of structure around them.
 *
 * - `card` — a bordered surface holding the photograph, the title, where and
 *   when, and a line of what was involved. The gallery uses this. It is the
 *   variant that survives being pulled out of a page and put on a rail: on a
 *   phone the cards slide horizontally one at a time, and a card floating on
 *   its own needs an edge and enough detail to be worth stopping on.
 *
 * The photograph is the project's first image; until the owner uploads one
 * the slot shows the hatched placeholder in the division's tone.
 */
export function ProjectCard({
  project,
  variant = "plain",
}: {
  project: Project;
  variant?: "plain" | "card";
}) {
  const lead = project.images[0];
  const count = project.images.length;
  const { tone, title: division } = project.division;

  if (variant === "card") {
    return (
      <article className="group h-full">
        <Link
          href={`/gallery/${project.slug}`}
          className="flex h-full flex-col overflow-hidden rounded-lg border border-line bg-surface transition-colors hover:border-line-strong"
        >
          <div className="relative overflow-hidden">
            <Photo
              image={lead}
              ratio="4/3"
              sizes="(min-width: 1024px) 30vw, 19rem"
              rounded="rounded-none"
              className="transition-transform duration-500 group-hover:scale-[1.03]"
              label={count ? `${count} photos` : division}
              tone={tone}
            />

            {/* The label rides on the image so the body below can open with
                the title. On a rail the division is the first thing you need
                to read — it is what tells you the filter did something. */}
            <span className="eyebrow absolute top-3 left-3 rounded-full bg-surface/95 px-2.5 py-1.5 text-brand-ink backdrop-blur-sm">
              {division}
            </span>
          </div>

          <div className="flex flex-1 flex-col p-4 md:p-5">
            <h3 className="text-[1.0625rem] leading-snug font-bold tracking-[-0.02em] transition-colors group-hover:text-brand">
              {project.title}
            </h3>
            <p className="mt-1.5 text-xs text-ink-3">
              {project.location} · {formatCompleted(project.completedOn)}
            </p>
            <p className="mt-3 line-clamp-2 text-sm leading-relaxed text-ink-2">
              {project.summary}
            </p>

            <span className="mt-auto inline-flex items-center gap-1.5 pt-4 text-xs font-semibold text-brand-ink">
              View project
              <ArrowIcon className="h-3.5 w-3.5 transition-transform duration-300 group-hover:translate-x-1" />
            </span>
          </div>
        </Link>
      </article>
    );
  }

  return (
    <article className="group">
      <Link href={`/gallery/${project.slug}`} className="block">
        <div className="overflow-hidden">
          <Photo
            image={lead}
            ratio="4/3"
            sizes="(min-width: 1024px) 30vw, (min-width: 640px) 45vw, 92vw"
            className="transition-transform duration-500 group-hover:scale-[1.02]"
            label={division}
            sublabel={count ? `${count} photos · 4:3` : "4:3"}
            tone={tone}
          />
        </div>

        <div className="mt-5">
          <p className="eyebrow text-brand-ink">{division}</p>
          <h3 className="mt-2.5 text-lg font-bold tracking-[-0.02em] transition-colors group-hover:text-brand">
            {project.title}
          </h3>
          <p className="mt-1.5 text-sm text-ink-3">{project.location}</p>
        </div>
      </Link>
    </article>
  );
}
