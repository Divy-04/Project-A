import { site } from "@/data/site";

/**
 * The partition mark — a monoline frame with a mullion and a half transom.
 * Reads as a window/partition elevation, stays legible at 16px, and costs
 * nothing to ship since it is inline SVG.
 */
export function Mark({ className = "" }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      aria-hidden="true"
      className={className}
      strokeWidth={2}
      stroke="currentColor"
      strokeLinecap="square"
    >
      <rect x="2.5" y="2.5" width="19" height="19" />
      <path d="M12 2.5V21.5" />
      <path d="M2.5 10H12" />
    </svg>
  );
}

/**
 * Typographic wordmark. Kept as real text rather than an image so it scales,
 * stays selectable, and puts the business name in the DOM for search engines.
 */
export function Wordmark({
  showTagline = true,
  className = "",
}: {
  showTagline?: boolean;
  className?: string;
}) {
  return (
    <span className={`inline-flex items-center gap-2.5 ${className}`}>
      <Mark className="h-6 w-6 shrink-0 text-brand" />
      <span className="flex flex-col leading-none">
        <span className="text-[1.0625rem] font-extrabold tracking-[-0.02em] uppercase sm:text-lg">
          <span className="text-brand">Aadi</span>{" "}
          <span className="text-ink">Enterprise</span>
        </span>
        {showTagline && (
          <span className="eyebrow mt-1 hidden text-ink-3 sm:block">
            Aluminium · Glass · PVC · Furniture
          </span>
        )}
      </span>
      <span className="sr-only">{site.name}</span>
    </span>
  );
}

/** Stacked variant used in the footer, on a dark ground. */
export function WordmarkStacked({ className = "" }: { className?: string }) {
  return (
    <span className={`inline-flex flex-col gap-3 ${className}`}>
      <Mark className="h-8 w-8 text-brand" />
      <span className="flex flex-col leading-none">
        <span className="text-xl font-extrabold tracking-[-0.02em] uppercase text-white">
          <span className="text-brand">Aadi</span> Enterprise
        </span>
        <span className="eyebrow mt-2 text-white/45">
          Aluminium · Glass · PVC · Furniture
        </span>
      </span>
    </span>
  );
}
