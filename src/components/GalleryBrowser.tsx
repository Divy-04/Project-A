"use client";

import { useEffect, useRef, useState } from "react";
import { ProjectCard } from "./ProjectCard";
import { ProjectIndex } from "./ProjectIndex";
import { GridIcon, ListIcon } from "./icons";
import type { Project } from "@/data/projects";

type Division = { slug: string; title: string; short: string };

/**
 * The work browser: pick a division, pick a view.
 *
 * The filter defaults to "all" and the view to "grid", which is what the
 * server renders — so every project is in the HTML with nothing hidden, and a
 * crawler (or anyone whose JS failed) gets the complete set. Filtering only
 * ever removes items in response to a click, never on first paint. That is
 * the same rule the rest of the site follows: no content starts hidden.
 *
 * Divisions are derived from the data rather than hard-coded, so when Sanity
 * starts supplying them this keeps working without an edit here.
 *
 * Two shapes, one set of projects:
 *
 * - Below `lg` the division chips dock to the bottom of the screen above the
 *   tab bar and slide sideways, and the projects themselves become a
 *   horizontal rail of cards you swipe through. Both controls sit in the same
 *   thumb arc, which is the whole point of moving them down there.
 * - At `lg` and up the chips go back to a bar that sticks under the header,
 *   and the same cards lay out as a three-column grid with the list toggle.
 *
 * The cards are rendered **once** and re-laid-out by CSS. Rendering a rail
 * for phones and a separate grid for desktop would have put nine duplicate
 * project links in the markup, which is exactly the kind of thing a site
 * built to be crawled should not do.
 */
export function GalleryBrowser({
  projects,
  divisions,
}: {
  projects: Project[];
  divisions: Division[];
}) {
  const [division, setDivision] = useState("all");
  const [view, setView] = useState<"grid" | "index">("grid");
  const railRef = useRef<HTMLDivElement>(null);
  const projectsSectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    if (!window.matchMedia("(max-width: 1023px)").matches) return;

    const frame = window.requestAnimationFrame(() => {
      projectsSectionRef.current?.scrollIntoView({
        block: "start",
        behavior: "auto",
      });
    });

    return () => window.cancelAnimationFrame(frame);
  }, []);

  /**
   * Switching division has to reset the rail, not just re-fill it. Without
   * this you tap "Furniture" while three cards deep in "All work" and land in
   * the middle of the new set with a half-card clipped off the left edge,
   * which reads as the filter having done nothing. The chip itself is scrolled
   * into view too — on a phone the one you just tapped is often the one that
   * was half off the end of the dock.
   */
  function choose(slug: string, chip: HTMLElement) {
    setDivision(slug);

    const behavior: ScrollBehavior = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    ).matches
      ? "auto"
      : "smooth";

    railRef.current?.scrollTo({ left: 0, behavior });
    // Only where the chips actually scroll — the desktop bar wraps instead.
    if (chip.closest(".rail")) {
      chip.scrollIntoView({ inline: "center", block: "nearest", behavior });
    }
  }

  const counts = new Map<string, number>();
  for (const p of projects) counts.set(p.category, (counts.get(p.category) ?? 0) + 1);

  const filters = [
    { slug: "all", title: "All work", count: projects.length },
    ...divisions.map((d) => ({
      slug: d.slug,
      title: d.title,
      count: counts.get(d.slug) ?? 0,
    })),
  ];

  const shown =
    division === "all"
      ? projects
      : projects.filter((p) => p.category === division);

  const active = filters.find((f) => f.slug === division);

  /* One chip row, rendered in two places. Only ever one of them is in the
     accessibility tree — the other is `display:none` at that width. */
  const chips = (
    <>
      {filters.map((f) => {
        const on = f.slug === division;
        return (
          <button
            key={f.slug}
            type="button"
            aria-pressed={on}
            onClick={(e) => choose(f.slug, e.currentTarget)}
            className={`inline-flex shrink-0 snap-start items-center gap-2 rounded-full border px-4 py-2 text-sm font-semibold transition-colors lg:rounded-sm lg:px-3.5 ${
              on
                ? "border-ink bg-ink text-white"
                : "border-line bg-surface text-ink-2 hover:border-line-strong hover:text-ink"
            }`}
          >
            {f.title}
            <span
              className={`text-xs tabular-nums ${on ? "text-white/55" : "text-ink-3"}`}
            >
              {f.count}
            </span>
          </button>
        );
      })}
    </>
  );

  return (
    <>
      {/* Phones and tablets: the selector docks above the tab bar. It stays
          put while the page scrolls, so switching division never means
          scrolling back up to the top of the list to do it. */}
      <div className="gallery-dock fixed inset-x-0 bottom-[var(--tabbar-h)] z-40 border-t border-black/10 bg-ground lg:hidden">
        <div className="relative">
          <div
            role="group"
            aria-label="Filter work by division"
            className="rail flex gap-2 overflow-x-auto px-5 py-3 md:px-8"
          >
            {chips}
          </div>
          <span
            aria-hidden="true"
            className="pointer-events-none absolute inset-y-0 right-0 w-10 bg-gradient-to-l from-ground to-transparent"
          />
        </div>
      </div>

      {/* Desktop: same control, back under the header where there is a header
          to sit under. */}
      <div className="sticky top-[4.5rem] z-30 hidden border-y border-line bg-ground/90 backdrop-blur-md lg:block">
        <div className="shell flex items-center gap-4 py-3">
          <div
            role="group"
            aria-label="Filter work by division"
            className="flex min-w-0 flex-1 flex-wrap gap-2"
          >
            {chips}
          </div>

          <div
            role="group"
            aria-label="Change layout"
            className="flex shrink-0 gap-1"
          >
            {(
              [
                ["grid", GridIcon, "Grid"],
                ["index", ListIcon, "List"],
              ] as const
            ).map(([key, Icon, label]) => (
              <button
                key={key}
                type="button"
                aria-pressed={view === key}
                onClick={() => setView(key)}
                title={`${label} view`}
                className={`inline-flex h-9 w-9 items-center justify-center rounded-sm border transition-colors ${
                  view === key
                    ? "border-ink bg-ink text-white"
                    : "border-line bg-surface text-ink-3 hover:border-line-strong hover:text-ink"
                }`}
              >
                <Icon className="h-4 w-4" />
                <span className="sr-only">{label} view</span>
              </button>
            ))}
          </div>
        </div>
      </div>

      <section
        ref={projectsSectionRef}
        className="scroll-mt-16 bg-ground py-14 lg:scroll-mt-0 lg:py-20"
      >
        <div className="shell">
          {/* Announced on change, so a screen-reader user knows the filter did
              something — the visual result is off-screen for them. */}
          <p aria-live="polite" className="eyebrow text-ink-3">
            {shown.length} {shown.length === 1 ? "project" : "projects"}
            {division !== "all" && active ? ` · ${active.title}` : ""}
          </p>

          {shown.length === 0 ? (
            <p className="mt-10 text-[0.9375rem] text-ink-2">
              Nothing here yet in this division. Call and ask — plenty of work
              never makes it onto the site.
            </p>
          ) : view === "index" ? (
            <div className="mt-10">
              <ProjectIndex projects={shown} />
            </div>
          ) : (
            /* A rail on a phone, a grid on a desktop — same cards, same DOM.
               The negative margin lets the rail bleed to the screen edges so
               the card you are half-way onto is not clipped by the gutter,
               and `.rail` puts the gutter back as scroll padding so the first
               card still snaps flush with the text above it. */
            <div
              ref={railRef}
              className="rail -mx-5 mt-8 flex snap-x snap-mandatory gap-4 overflow-x-auto px-5 pb-2 md:-mx-8 md:px-8 lg:mx-0 lg:mt-10 lg:grid lg:snap-none lg:grid-cols-3 lg:gap-6 lg:overflow-visible lg:px-0 lg:pb-0"
            >
              {shown.map((project) => (
                <div
                  key={project.slug}
                  className="rail-item w-[78vw] max-w-[19rem] shrink-0 snap-start lg:w-auto lg:max-w-none"
                >
                  <ProjectCard project={project} variant="card" />
                </div>
              ))}
            </div>
          )}
        </div>
      </section>
    </>
  );
}
