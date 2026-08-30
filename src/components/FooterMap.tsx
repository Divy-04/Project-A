import { mapsUrl } from "@/data/site";
import { ArrowIcon, PinIcon } from "./icons";

/**
 * Map facade.
 *
 * A live Google Maps iframe costs 500 KB+ of tiles and third-party script on
 * every page it appears on, sets Google cookies, and is a reliable way to
 * wreck Core Web Vitals. This is a schematic locator instead — inline SVG, no
 * network request, no third party — that opens real Google Maps directions on
 * tap, which is what anyone tapping a map actually wants.
 *
 * Once the Google Business Profile exists, point `mapsUrl` at the listing
 * rather than a plain pin: clicks and direction requests on GBP feed local
 * map-pack ranking.
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
    <a
      href={mapsUrl}
      target="_blank"
      rel="noopener noreferrer"
      className={`group block overflow-hidden rounded-sm border transition-colors ${t.frame}`}
    >
      <div className="relative w-full" style={{ aspectRatio: ratio }}>
        <svg
          viewBox="0 0 320 200"
          preserveAspectRatio="xMidYMid slice"
          aria-hidden="true"
          className="absolute inset-0 h-full w-full"
        >
          {/* Five columns of blocks rather than three: the same schematic has
              to hold at 220px in the footer and at 600px on the contact page,
              and the sparser version looked crude blown up. */}
          <g fill={t.block}>
            {(
              [
                [4, 4, 52, 40],
                [4, 52, 52, 44],
                [4, 104, 52, 44],
                [4, 156, 52, 40],
                [64, 4, 56, 40],
                [64, 52, 56, 44],
                [64, 156, 56, 40],
                [132, 4, 56, 40],
                [132, 156, 56, 40],
                [198, 4, 52, 40],
                [198, 52, 52, 44],
                [198, 104, 52, 44],
                [198, 156, 52, 40],
                [262, 4, 54, 40],
                [262, 52, 54, 44],
                [262, 104, 54, 44],
                [262, 156, 54, 40],
              ] as const
            ).map(([x, y, w, h]) => (
              <rect key={`${x}-${y}`} x={x} y={y} width={w} height={h} rx="2" />
            ))}

            {/* the blocks either side of the pin, picked out */}
            <rect x="64" y="104" width="56" height="44" rx="2" fill={t.blockLit} />
            <rect x="132" y="52" width="56" height="96" rx="2" fill={t.blockLit} />
          </g>

          <g stroke={t.road} strokeLinecap="square" fill="none">
            <g strokeWidth="6">
              <path d="M60 0V200M194 0V200M256 0V200" />
              <path d="M0 48H320M0 152H320" />
            </g>
            {/* the through roads, a shade wider */}
            <g strokeWidth="9">
              <path d="M0 100H320" />
              <path d="M126 0V200" />
            </g>
          </g>

          {/* pin, on the highlighted block */}
          <g transform="translate(160 100)">
            <ellipse cx="0" cy="26" rx="13" ry="4" fill="#000" opacity="0.35" />
            <path
              d="M0 24C0 24 15 9.5 15 -1a15 15 0 1 0-30 0c0 10.5 15 25 15 25Z"
              fill="#d93a28"
            />
            <circle cx="0" cy="-1.5" r="5.25" fill="#fff" />
          </g>
        </svg>
      </div>

      {/* The full address sits alongside this wherever it is used, so the
          label only needs to carry the action. */}
      <div
        className={`flex items-center justify-between gap-3 border-t px-4 py-3 ${t.divider}`}
      >
        <span
          className={`flex items-center gap-2 text-xs font-semibold transition-colors ${t.label}`}
        >
          <PinIcon className="h-3.5 w-3.5 shrink-0 text-brand" />
          {label}
        </span>
        <ArrowIcon
          className={`h-3.5 w-3.5 shrink-0 transition-transform group-hover:translate-x-0.5 ${t.arrow}`}
        />
      </div>
    </a>
  );
}
