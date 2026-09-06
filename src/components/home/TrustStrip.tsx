import { CountUp } from "@/components/CountUp";
import { getSettings } from "@/sanity/loaders";

/**
 * `value` is what renders and what sits in the HTML; CountUp only animates
 * toward it once it scrolls into view. Anything without a number — the KDM
 * credential — is plain text, since there is nothing to count.
 */
export async function TrustStrip() {
  const site = await getSettings();

  const stats = [
    { value: 2026 - site.establishedYear, suffix: "+", label: "Years in the trade" },
    { value: site.projectsCompleted, suffix: "+", label: "Projects completed" },
    { value: 3, suffix: "", label: "Divisions in-house" },
    { text: "KDM", label: "Authorised distributor" },
  ];

  return (
    <section className="border-y border-line bg-surface">
      <div className="shell">
        {/* gap-px over a line-coloured ground draws the dividers, so no
            per-cell border juggling across breakpoints */}
        <div className="-mx-5 grid grid-cols-2 gap-px bg-line md:-mx-8 lg:grid-cols-4">
          {stats.map((s) => (
            <div key={s.label} className="bg-surface px-5 py-8 md:px-8 lg:py-10">
              <p className="text-3xl font-extrabold tracking-[-0.03em] text-ink tabular-nums lg:text-[2.5rem]">
                {s.text ?? <CountUp value={s.value!} suffix={s.suffix} />}
              </p>
              <p className="eyebrow mt-2.5 text-ink-3">{s.label}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
