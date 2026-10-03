import Image from "next/image";

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
    <span className={`inline-flex items-end gap-1.5 sm:gap-2.5 ${className}`}>
      <span className="relative h-10 w-14 shrink-0 translate-y-1 overflow-hidden rounded-sm sm:h-14 sm:w-20 sm:translate-y-2">
        <Image
          src="/images/process/logo.webp"
          alt="AADI Enterprise logo"
          fill
          sizes="80px"
          className="object-contain"
        />
      </span>
      <span className="flex flex-col leading-none">
        <span className="text-base font-extrabold tracking-[-0.02em] uppercase sm:text-xl">
          <span className="text-brand-ink sm:text-brand">AADI</span>{" "}
          <span className="text-ink">ENTERPRISE</span>
        </span>
        {showTagline && (
          <span className="eyebrow mt-1 block text-[0.4375rem] tracking-[0.04em] text-ink-3 sm:text-[0.5625rem] sm:tracking-[0.16em]">
            Aluminium · Glass · PVC · Furniture
          </span>
        )}
      </span>
      <span className="sr-only">AADI ENTERPRISE</span>
    </span>
  );
}

/** Stacked variant used in the footer, on a dark ground. */
export function WordmarkStacked({ className = "" }: { className?: string }) {
  return (
    <span className={`inline-flex items-end gap-1.5 sm:gap-2.5 ${className}`}>
      <span className="relative h-10 w-14 shrink-0 translate-y-1 overflow-hidden rounded-sm sm:h-14 sm:w-20 sm:translate-y-2">
        <Image
          src="/images/process/logo.webp"
          alt="AADI Enterprise logo"
          fill
          sizes="80px"
          className="object-contain"
        />
      </span>
      <span className="flex flex-col leading-none">
        <span className="text-base font-extrabold tracking-[-0.02em] uppercase text-white sm:text-xl">
          <span className="text-brand">AADI</span> ENTERPRISE
        </span>
        <span className="eyebrow mt-1 text-[0.4375rem] tracking-[0.04em] text-white/45 sm:mt-1 sm:text-[0.5625rem] sm:tracking-[0.16em]">
          Aluminium · Glass · PVC · Furniture
        </span>
      </span>
    </span>
  );
}
