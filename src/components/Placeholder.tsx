/**
 * Labelled image placeholder.
 *
 * Deliberately neutral — tonal blocks with a hatch texture and a caption,
 * not stock photography. Stock images of foreign kitchens would flatter the
 * layout and set an expectation the real site photos will not meet; these
 * let you judge composition, hierarchy and spacing honestly.
 *
 * Each of these becomes a Sanity image with a `next/image` + Sanity loader
 * once real photography arrives. Aspect ratios are already final, so the
 * swap causes no layout change.
 */

const tones = {
  cool: "bg-[#dfe3e6] text-[#5d6a72]",
  warm: "bg-[#e6dfd6] text-[#7a6a58]",
  neutral: "bg-[#e3e1dd] text-[#77726b]",
  dark: "bg-slate text-white/40",
} as const;

export type Tone = keyof typeof tones;

export function Placeholder({
  label,
  sublabel,
  tone = "neutral",
  ratio = "4/3",
  className = "",
  rounded = "rounded-sm",
}: {
  label: string;
  sublabel?: string;
  tone?: Tone;
  ratio?: string;
  className?: string;
  rounded?: string;
}) {
  const isDark = tone === "dark";

  return (
    <div
      style={{ aspectRatio: ratio }}
      className={`relative w-full overflow-hidden ${rounded} ${tones[tone]} ${className}`}
      role="img"
      aria-label={`Placeholder for ${label} photograph`}
    >
      <div
        className={`absolute inset-0 ${isDark ? "ph-hatch-light" : "ph-hatch"}`}
      />

      {/* Corner ticks — a light framing device so the block reads as a
          reserved slot rather than a failed image. */}
      <Ticks isDark={isDark} />

      <div className="absolute inset-0 flex flex-col items-center justify-center gap-1.5 px-6 text-center">
        <svg
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth={1.25}
          aria-hidden="true"
          className="h-7 w-7 opacity-70"
        >
          <rect x="2.5" y="4.5" width="19" height="15" rx="1.5" />
          <circle cx="8.25" cy="9.75" r="1.75" />
          <path d="M2.5 16.5 8 11.5l4.5 4 3-2.5 6 5" />
        </svg>
        <span className="eyebrow mt-1 opacity-90">{label}</span>
        {sublabel && (
          <span className="text-[0.6875rem] tracking-wide opacity-60">
            {sublabel}
          </span>
        )}
      </div>
    </div>
  );
}

function Ticks({ isDark }: { isDark: boolean }) {
  const c = isDark ? "border-white/15" : "border-black/10";
  return (
    <>
      <span className={`absolute top-3 left-3 h-3 w-3 border-t border-l ${c}`} />
      <span
        className={`absolute top-3 right-3 h-3 w-3 border-t border-r ${c}`}
      />
      <span
        className={`absolute bottom-3 left-3 h-3 w-3 border-b border-l ${c}`}
      />
      <span
        className={`absolute right-3 bottom-3 h-3 w-3 border-r border-b ${c}`}
      />
    </>
  );
}
