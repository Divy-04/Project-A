import { mapsEmbedUrl, mapsUrl } from "@/data/site";
import { ArrowIcon, PinIcon } from "./icons";

/**
 * Shared live map for the footer and contact page. The map is lazy-loaded so
 * it does not block the first render, while the directions link remains
 * available independently of the embed.
 */

const tones = {
  dark: {
    frame: "border-white/10 bg-[#232120] hover:border-white/25",
    divider: "border-white/10",
    label: "text-white/70 group-hover:text-white",
    arrow: "text-white/70",
    block: "#2e2b29",
    blockLit: "#3a3532",
    road: "#454039",
  },
  light: {
    frame: "border-line bg-[#efece7] hover:border-line-strong",
    divider: "border-line",
    label: "text-ink-2 group-hover:text-ink",
    arrow: "text-ink-3",
    block: "#e2ded7",
    blockLit: "#d6d0c7",
    road: "#c9c2b8",
  },
} as const;

export function FooterMap({
  tone = "dark",
  ratio = "16/10",
  label = "Get directions",
}: {
  tone?: keyof typeof tones;
  ratio?: string;
  label?: string;
}) {
  const t = tones[tone];

  return (
    <div className={`group overflow-hidden rounded-sm border ${t.frame}`}>
      <div className="relative w-full" style={{ aspectRatio: ratio }}>
        <iframe
          src={mapsEmbedUrl}
          title="AADI Enterprise location map"
          loading="lazy"
          referrerPolicy="no-referrer-when-downgrade"
          className="absolute inset-0 h-full w-full border-0"
        />
      </div>

      {/* The full address sits alongside this wherever it is used. */}
      <div
        className={`flex items-center justify-between gap-3 border-t px-4 py-3 ${t.divider}`}
      >
        <a
          href={mapsUrl}
          target="_blank"
          rel="noopener noreferrer"
          className={`flex min-w-0 items-center gap-2 text-xs font-semibold transition-colors ${t.label}`}
        >
          <PinIcon className="h-3.5 w-3.5 shrink-0 text-brand" />
          {label}
          <ArrowIcon
            className={`h-3.5 w-3.5 shrink-0 transition-transform group-hover:translate-x-0.5 ${t.arrow}`}
          />
        </a>
      </div>
    </div>
  );
}
