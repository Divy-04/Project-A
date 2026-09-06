import { Placeholder, type Tone } from "./Placeholder";
import { imageUrl, parseRatio, srcSet } from "@/sanity/image";
import type { SiteImage } from "@/sanity/types";

/**
 * A photograph slot: the Sanity image when there is one, the hatched
 * `Placeholder` when there is not yet.
 *
 * Same footprint either way — a fixed-ratio box, or `fill` for a slot whose
 * size the layout decides — so a photograph arriving from the Studio changes
 * no geometry. That is the whole reason the placeholders carried final
 * ratios from the first cut.
 *
 * The image is a plain `<img>` with a `srcset` from Sanity's CDN (see
 * `src/sanity/image.ts` for why not `next/image`). Width and height are set
 * so the browser reserves the box before the bytes arrive, and the asset's
 * LQIP is painted underneath while it loads.
 */
export function Photo({
  image,
  alt,
  ratio = "4/3",
  sizes = "100vw",
  priority = false,
  className = "",
  rounded = "rounded-sm",
  fill = false,
  label,
  sublabel,
  tone = "neutral",
}: {
  image?: SiteImage | null;
  /** Overrides the editor's alt text; falls back to it, then to empty. */
  alt?: string;
  ratio?: string;
  /** The `sizes` attribute — how wide the slot is at each breakpoint. */
  sizes?: string;
  /** Above the fold: eager load, high fetch priority. One or two per page. */
  priority?: boolean;
  className?: string;
  rounded?: string;
  fill?: boolean;
  /** Placeholder caption while no photograph exists. */
  label: string;
  sublabel?: string;
  tone?: Tone;
}) {
  if (!image?.asset) {
    return (
      <Placeholder
        label={label}
        sublabel={sublabel}
        tone={tone}
        ratio={ratio}
        className={className}
        rounded={rounded}
        fill={fill}
      />
    );
  }

  const r = fill ? undefined : parseRatio(ratio);
  const { width, height } = image.asset.metadata.dimensions;
  const w = Math.min(width, 1200);
  const h = Math.round(r ? w / r : (w * height) / width);
  const lqip = image.asset.metadata.lqip;

  /* In `fill` mode the CDN cannot crop to a ratio it does not know, so the
     browser crops with object-fit and the hotspot steers it. */
  const objectPosition =
    fill && image.hotspot
      ? `${(image.hotspot.x * 100).toFixed(1)}% ${(image.hotspot.y * 100).toFixed(1)}%`
      : undefined;

  return (
    <div
      style={fill ? undefined : { aspectRatio: ratio }}
      className={`${fill ? "absolute inset-0" : "relative w-full"} overflow-hidden bg-line ${rounded} ${className}`}
    >
      {/* eslint-disable-next-line @next/next/no-img-element -- srcset comes
          from Sanity's CDN, which already resizes; see src/sanity/image.ts */}
      <img
        src={imageUrl(image, w, r)}
        srcSet={srcSet(image, r)}
        sizes={sizes}
        width={w}
        height={h}
        alt={alt ?? image.alt ?? ""}
        loading={priority ? "eager" : "lazy"}
        fetchPriority={priority ? "high" : undefined}
        decoding="async"
        style={{
          backgroundImage: lqip ? `url(${lqip})` : undefined,
          backgroundSize: "cover",
          objectPosition,
        }}
        className="absolute inset-0 h-full w-full object-cover"
      />
    </div>
  );
}
