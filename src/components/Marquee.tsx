/**
 * Slow-running ticker.
 *
 * Pure CSS — one keyframe translating a duplicated track, no JS, no scroll
 * listener. The duplicate is aria-hidden so the list is announced once.
 * `prefers-reduced-motion` stops it dead and leaves the first copy readable,
 * so nothing is ever hidden or in motion for someone who asked for stillness.
 */
export function Marquee({
  items,
  label,
}: {
  items: readonly string[];
  label: string;
}) {
  return (
    <div className="marquee border-y border-line bg-surface py-4">
      <h2 className="sr-only">{label}</h2>
      <div className="marquee-track">
        {[0, 1].map((copy) => (
          <ul
            key={copy}
            aria-hidden={copy === 1 ? "true" : undefined}
            className="marquee-group flex shrink-0 items-center"
          >
            {items.map((item) => (
              <li
                key={item}
                className="eyebrow flex shrink-0 items-center gap-6 px-6 text-ink-3"
              >
                {item}
                <span aria-hidden="true" className="text-brand">
                  ●
                </span>
              </li>
            ))}
          </ul>
        ))}
      </div>
    </div>
  );
}
