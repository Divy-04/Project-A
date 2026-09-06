import type { Faq } from "@/sanity/types";

/**
 * FAQ accordion built on native <details>/<summary>.
 *
 * No JavaScript, no state, keyboard and screen-reader behaviour for free —
 * and, critically, the answers are in the HTML whether the panel is open or
 * not, so a crawler reads all of them. The open/close is animated with
 * `interpolate-size` in globals.css, which degrades to an instant toggle in
 * browsers that don't support it rather than breaking.
 */
export function Faqs({ faqs }: { faqs: Faq[] }) {
  return (
    <div className="border-t border-line">
      {faqs.map((faq) => (
        <details key={faq.q} className="faq group border-b border-line">
          <summary className="flex cursor-pointer list-none items-start justify-between gap-6 py-5 text-left">
            <span className="text-[1.0625rem] font-bold tracking-[-0.02em] transition-colors group-hover:text-brand">
              {faq.q}
            </span>

            {/* Plus that becomes a minus — the vertical stroke scales away */}
            <span
              aria-hidden="true"
              className="relative mt-1.5 h-3.5 w-3.5 shrink-0 text-ink-3 transition-colors group-hover:text-brand"
            >
              <span className="absolute top-1/2 left-0 h-px w-full -translate-y-1/2 bg-current" />
              <span className="faq-tick absolute top-0 left-1/2 h-full w-px -translate-x-1/2 bg-current" />
            </span>
          </summary>

          <div className="faq-panel">
            <p className="max-w-2xl pb-6 text-[0.9375rem] leading-relaxed text-ink-2">
              {faq.a}
            </p>
          </div>
        </details>
      ))}
    </div>
  );
}
