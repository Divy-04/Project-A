import type { ReactNode } from "react";
import { ElevationBackdrop } from "./Backdrop";

/**
 * The masthead every inner page opens with.
 *
 * One h1 per page, always the first thing in the main landmark, always real
 * text. The eyebrow above it is a plain <p> rather than a heading so the
 * document outline stays h1 → h2 → h3 with nothing skipped.
 *
 * Carries the set-out grid, the brand wash and a partition elevation, all
 * behind the content and all masked or faded away from the left where the
 * heading and body copy sit. Because this one component fronts the gallery,
 * the contact page, every division and every project, dressing it once
 * dresses most of the site.
 */
export function PageHeader({
  eyebrow,
  title,
  intro,
  aside,
  children,
}: {
  eyebrow: string;
  title: ReactNode;
  intro?: string;
  aside?: ReactNode;
  children?: ReactNode;
}) {
  return (
    <section className="setout wash-brand relative overflow-hidden border-b border-line bg-ground">
      {/* Sized by width, not height: scaled to fill the band it was cropped
          so hard that only a stray mullion and the door swing showed, which
          reads as a stray mark rather than a drawing. */}
      <ElevationBackdrop className="top-1/2 -right-20 hidden w-[32rem] -translate-y-1/2 text-ink/[0.06] lg:block" />

      <div className="relative z-10 shell pt-10 pb-14 lg:pt-14 lg:pb-20">
        {children}

        <div className="flex flex-col gap-8 lg:flex-row lg:items-end lg:justify-between lg:gap-16">
          <div className="max-w-3xl">
            <p className="eyebrow text-brand-ink">{eyebrow}</p>
            <h1 className="mt-5 text-[2rem] leading-[1.06] font-extrabold tracking-[-0.035em] text-balance sm:text-[2.75rem] lg:text-[3.5rem]">
              {title}
            </h1>
            {intro && (
              <p className="mt-6 max-w-xl text-base leading-relaxed text-ink-2 sm:text-[1.0625rem]">
                {intro}
              </p>
            )}
          </div>

          {aside && <div className="shrink-0">{aside}</div>}
        </div>
      </div>
    </section>
  );
}
