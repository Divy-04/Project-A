import { SectionHead } from "@/components/SectionHead";
import { testimonials } from "@/data/testimonials";

export function Testimonials() {
  return (
    <section className="bg-ground py-20 lg:py-28">
      <div className="shell">
        <SectionHead label="What customers say" title="In their words." />

        <div className="mt-14 grid gap-6 md:grid-cols-3">
          {testimonials.map((t) => (
            <figure
              key={t.quote}
              className="flex flex-col justify-between border border-line bg-surface p-8"
            >
              <blockquote className="text-[0.9375rem] leading-relaxed text-ink-2">
                <span
                  aria-hidden="true"
                  className="mb-4 block text-3xl leading-none font-extrabold text-brand"
                >
                  &ldquo;
                </span>
                {t.quote}
              </blockquote>
              <figcaption className="mt-8 border-t border-line pt-5">
                <p className="text-sm font-semibold text-ink">{t.name}</p>
                <p className="mt-1 text-xs text-ink-3">
                  {t.work} · {t.town}
                </p>
              </figcaption>
            </figure>
          ))}
        </div>
      </div>
    </section>
  );
}
