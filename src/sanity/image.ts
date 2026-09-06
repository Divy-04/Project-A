import { createImageUrlBuilder } from "@sanity/image-url";
import { dataset, projectId } from "./client";
import type { SiteImage } from "./types";

/**
 * Image URLs for Sanity's CDN.
 *
 * Nobody ever types an image URL. An editor uploads a photograph in the
 * Studio, the document stores a reference to the asset, and these helpers turn
 * that reference into a `cdn.sanity.io` address with the size, crop and format
 * the slot needs. The same original serves a 400px card and a 1600px lead shot
 * as WebP or AVIF, cropped towards the hotspot the editor marked.
 *
 * The site renders a plain `<img>` with a `srcset` built here rather than
 * `next/image`: the CDN already does the resizing, so there is nothing for the
 * Next optimiser to add, and it keeps the photographs independent of the
 * host — a static-file host with no image service serves them just the same.
 */
const builder = createImageUrlBuilder({ projectId, dataset });

/** Candidate widths for `srcset`. Filtered against the original so a
 *  1000px upload is never asked for at 1600. */
const WIDTHS = [320, 480, 640, 768, 960, 1200, 1600, 2000];

/** Photographs are JPEG at heart; 78 is where the file halves and nobody
 *  can see the difference on a phone. */
const QUALITY = 78;

/** "4/3" or "16/9" → 1.333…; `undefined` when the slot has no fixed ratio. */
export const parseRatio = (ratio?: string) => {
  if (!ratio) return undefined;
  const [w, h] = ratio.split("/").map(Number);
  return w > 0 && h > 0 ? w / h : undefined;
};

/** One URL at one width. With a ratio the CDN crops to it, honouring the
 *  editor's hotspot and crop; without one it scales the whole image. */
export function imageUrl(image: SiteImage, width: number, ratio?: number) {
  let b = builder.image(image).width(width).auto("format").quality(QUALITY);
  if (ratio) b = b.height(Math.round(width / ratio)).fit("crop");
  return b.url();
}

export function srcSet(image: SiteImage, ratio?: number) {
  const original = image.asset.metadata.dimensions.width;
  const widths = WIDTHS.filter((w) => w < original);
  widths.push(Math.min(original, WIDTHS[WIDTHS.length - 1]));
  return widths.map((w) => `${imageUrl(image, w, ratio)} ${w}w`).join(", ");
}
