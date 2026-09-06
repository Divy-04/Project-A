import { defineField, defineType } from "sanity";

/**
 * Every photograph on the site is one of these.
 *
 * Two things the plain `image` type does not give us:
 *
 * - A required description. It is the alt text — what a screen reader says
 *   and what a search engine reads — and a photograph without one is a hole
 *   in the page for both.
 * - A size floor. The site asks the CDN for up to 2000px; a 600px upload
 *   would come out soft on a desktop, so the Studio refuses it with the
 *   dimensions in the message rather than letting it through.
 *
 * Hotspot is on so the editor can mark the part that must never be cropped
 * out — the slots on the site are different shapes from the photographs.
 */
const MIN_LONG_SIDE = 1200;

export const photo = defineType({
  name: "photo",
  title: "Photograph",
  type: "image",
  options: {
    hotspot: true,
    metadata: ["lqip", "blurhash", "palette"],
  },
  fields: [
    defineField({
      name: "alt",
      title: "Describe the photograph",
      type: "string",
      description:
        "One short sentence saying what is in the picture — e.g. \"Three-track aluminium sliding door in champagne finish\". Used by search engines and read aloud to blind visitors.",
      validation: (rule) =>
        rule
          .required()
          .max(160)
          .error("Please describe the photograph in a short sentence."),
    }),
  ],
  validation: (rule) =>
    rule.custom(async (value, context) => {
      const ref = value?.asset?._ref;
      if (!ref) return true;

      const client = context.getClient({ apiVersion: "2026-09-01" });
      const dims = await client.fetch<{ width: number; height: number } | null>(
        `*[_id == $id][0].metadata.dimensions`,
        { id: ref },
      );
      if (!dims) return true;

      const longSide = Math.max(dims.width, dims.height);
      if (longSide < MIN_LONG_SIDE) {
        return `This photograph is only ${dims.width} × ${dims.height} pixels and will look blurry on a large screen. Please upload one at least ${MIN_LONG_SIDE} pixels on its longest side — any recent phone photo is.`;
      }
      return true;
    }),
});
