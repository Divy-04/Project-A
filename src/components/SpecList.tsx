import type { Spec } from "@/sanity/types";

/**
 * "What the quote covers" — a plain specification list.
 *
 * Nobody local publishes this, which is exactly why it is worth publishing:
 * it answers the questions a customer would otherwise have to ring three
 * fabricators to compare, and it is the kind of specific, unglamorous text
 * that ranks.
 */
export function SpecList({ specs }: { specs: Spec[] }) {
  return (
    <dl className="divide-y divide-line border-y border-line">
      {specs.map((spec) => (
        <div
          key={spec.label}
          className="grid gap-1 py-4 sm:grid-cols-[11rem_1fr] sm:gap-6 sm:py-5"
        >
          <dt className="eyebrow pt-1 text-ink-3">{spec.label}</dt>
          <dd className="text-[0.9375rem] leading-relaxed text-ink">
            {spec.value}
          </dd>
        </div>
      ))}
    </dl>
  );
}
