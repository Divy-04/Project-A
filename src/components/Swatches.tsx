import type { FinishGroup } from "@/sanity/types";

/**
 * Finish swatches.
 *
 * The single most useful thing we can put on a division page while there are
 * no photographs: a customer choosing a shutter colour genuinely wants this,
 * it is real indexable content, and it costs nothing to render — every chip is
 * a coloured box, not an image.
 *
 * Pale finishes carry a ring so a near-white chip still reads as a chip
 * against the surface behind it.
 */
export function Swatches({ groups }: { groups: FinishGroup[] }) {
  return (
    <div className="grid gap-12 sm:grid-cols-2 sm:gap-10">
      {groups.map((group) => (
        <div key={group.label}>
          <h3 className="text-lg font-bold tracking-[-0.02em]">
            {group.label}
          </h3>
          <p className="mt-2.5 max-w-sm text-[0.9375rem] leading-relaxed text-ink-2">
            {group.note}
          </p>

          <ul className="mt-7 grid grid-cols-3 gap-x-4 gap-y-6 sm:grid-cols-3">
            {group.swatches.map((swatch) => (
              <li key={swatch.name} className="group">
                <span
                  aria-hidden="true"
                  style={{ background: swatch.hex }}
                  className={`block aspect-square w-full rounded-sm transition-transform duration-300 group-hover:-translate-y-1 ${
                    swatch.ring ? "ring-1 ring-line-strong ring-inset" : ""
                  }`}
                />
                <span className="mt-2.5 block text-[0.8125rem] leading-snug font-medium text-ink-2">
                  {swatch.name}
                </span>
              </li>
            ))}
          </ul>
        </div>
      ))}
    </div>
  );
}
