import Link from "next/link";
import { ArrowIcon } from "@/components/icons";
import { formatCompleted, toneForCategory, type Project } from "@/data/projects";

const swatch: Record<string, string> = {
  cool: "#dfe3e6",
  warm: "#e6dfd6",
  neutral: "#e3e1dd",
};

/**
 * Every job as an index, the way an architecture practice lists its work:
 * number, title, town, division, date. Dense, scannable, and it puts far more
 * real text on the page than the same jobs shown as picture tiles.
 *
 * The row tints and the title shifts on hover. Nothing is hidden before
 * interaction — hover only adds — so there is no state in which a reader
 * cannot see the whole list.
 */
export function ProjectIndex({ projects }: { projects: Project[] }) {
  return (
    <ol className="border-t border-line">
      {projects.map((project, i) => (
        <li key={project.slug}>
          <Link
            href={`/gallery/${project.slug}`}
            className="index-row group grid grid-cols-[2.5rem_1fr_auto] items-baseline gap-x-4 border-b border-line py-5 sm:grid-cols-[3.5rem_1fr_9rem_10.5rem_2rem] sm:gap-x-6 sm:py-6"
          >
            <span className="eyebrow text-ink-3 tabular-nums">
              {String(i + 1).padStart(2, "0")}
            </span>

            <span className="index-title col-start-2 flex items-baseline gap-3 font-bold tracking-[-0.02em] sm:text-[1.0625rem]">
              <span
                aria-hidden="true"
                style={{ background: swatch[toneForCategory(project.category)] }}
                className="h-2.5 w-2.5 shrink-0 translate-y-px rounded-full ring-1 ring-line-strong ring-inset"
              />
              {project.title}
            </span>

            <span className="col-start-3 row-start-1 text-right text-[0.8125rem] text-ink-3 sm:col-start-3 sm:text-left">
              {project.location}
            </span>

            <span className="col-span-2 col-start-2 text-[0.8125rem] text-ink-3 sm:col-span-1 sm:col-start-4 sm:row-start-1 sm:whitespace-nowrap">
              {project.categoryLabel}
              <span className="sm:hidden"> · {formatCompleted(project.completedOn)}</span>
            </span>

            <span className="hidden sm:col-start-5 sm:row-start-1 sm:flex sm:justify-end">
              <ArrowIcon className="h-4 w-4 text-ink-3 transition-transform duration-300 group-hover:translate-x-1 group-hover:text-brand" />
            </span>
          </Link>
        </li>
      ))}
    </ol>
  );
}
