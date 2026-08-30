import type { ReactNode } from "react";

/**
 * Consistent section header: hairline rule, letterspaced label, then the
 * heading. Repeating this exact rhythm down the page is most of what makes
 * a minimal layout feel designed rather than sparse.
 */
export function SectionHead({
  label,
  title,
  intro,
  align = "left",
  onDark = false,
  action,
}: {
  label: string;
  title: ReactNode;
  intro?: string;
  align?: "left" | "between";
  onDark?: boolean;
  action?: ReactNode;
}) {
  return (
    <div
      className={`border-t pt-6 ${onDark ? "border-white/15" : "border-line"}`}
    >
      <div
        className={
          align === "between"
            ? "flex flex-col gap-6 sm:flex-row sm:items-end sm:justify-between"
            : ""
        }
      >
        <div className={align === "between" ? "max-w-2xl" : "max-w-3xl"}>
          {/* The ternary here used to return the same colour on both branches.
              Small caps in the card red miss 4.5:1 on either ground, so each
              needs its own shifted red — see the tokens in globals.css. */}
          <p className={`eyebrow ${onDark ? "text-brand-lift" : "text-brand-ink"}`}>
            {label}
          </p>
          <h2
            className={`mt-5 text-[1.75rem] leading-[1.12] font-extrabold tracking-[-0.03em] text-balance sm:text-4xl lg:text-[2.75rem] ${
              onDark ? "text-white" : "text-ink"
            }`}
          >
            {title}
          </h2>
          {intro && (
            <p
              className={`mt-5 max-w-xl text-[0.9375rem] leading-relaxed sm:text-base ${
                onDark ? "text-white/60" : "text-ink-2"
              }`}
            >
              {intro}
            </p>
          )}
        </div>
        {action && <div className="shrink-0">{action}</div>}
      </div>
    </div>
  );
}
