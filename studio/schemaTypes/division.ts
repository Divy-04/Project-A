import { ComponentIcon } from "@sanity/icons/Component";
import { defineArrayMember, defineField, defineType } from "sanity";

/**
 * One of the three divisions — Aluminium & Glass, PVC / KDM Profile,
 * Furniture. Each has its own page at /services/<slug>, and those pages are
 * built to stand up with no photographs at all: the finishes, the
 * specification list and the FAQs are the substance. All three live here so
 * the owner can correct a section size or a lead time without a code change.
 */
export const division = defineType({
  name: "division",
  title: "Division",
  type: "document",
  icon: ComponentIcon,
  groups: [
    { name: "main", title: "Overview", default: true },
    { name: "finishes", title: "Finishes" },
    { name: "specs", title: "Specification" },
    { name: "faqs", title: "Questions" },
  ],
  fields: [
    defineField({
      name: "title",
      title: "Name",
      type: "string",
      group: "main",
      description: "The full name, as it appears in headings — e.g. \"Aluminium & Glass\".",
      validation: (rule) => rule.required().max(40),
    }),
    defineField({
      name: "short",
      title: "Short name",
      type: "string",
      group: "main",
      description: "One word for tight spaces — e.g. \"Aluminium\", \"PVC\", \"Furniture\".",
      validation: (rule) => rule.required().max(16),
    }),
    defineField({
      name: "slug",
      title: "Web address",
      type: "slug",
      group: "main",
      description: "The end of the page's address. Do not change this once the site is live.",
      options: { source: "title", maxLength: 40 },
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "order",
      title: "Order on the site",
      type: "number",
      group: "main",
      description: "1, 2, 3 — the order the divisions appear everywhere they are listed.",
      validation: (rule) => rule.required().integer().min(1),
    }),
    defineField({
      name: "blurb",
      title: "Short description",
      type: "text",
      rows: 3,
      group: "main",
      description: "One sentence for the card on the homepage and in the footer.",
      validation: (rule) => rule.required().max(220),
    }),
    defineField({
      name: "intro",
      title: "Introduction",
      type: "text",
      rows: 6,
      group: "main",
      description: "The opening paragraph of the division page. A few sentences on what the work is and how it is done.",
      validation: (rule) => rule.required().min(120),
    }),
    defineField({
      name: "items",
      title: "What we take on",
      type: "array",
      group: "main",
      of: [defineArrayMember({ type: "string" })],
      description: "The list of things this division does — e.g. \"Doors & Windows\", \"Office Partitions\". Six to eight is plenty.",
      validation: (rule) => rule.required().min(3).max(12),
    }),
    defineField({
      name: "image",
      title: "Photograph",
      type: "photo",
      group: "main",
      description: "One photograph that represents the division. Shown on the homepage card and on the division page. Optional — the page works without it.",
    }),
    defineField({
      name: "tone",
      title: "Placeholder colour",
      type: "string",
      group: "main",
      description: "The tint of the grey box shown until a photograph is added. Cool for aluminium and glass, neutral for PVC, warm for furniture.",
      options: {
        list: [
          { title: "Cool", value: "cool" },
          { title: "Neutral", value: "neutral" },
          { title: "Warm", value: "warm" },
        ],
        layout: "radio",
        direction: "horizontal",
      },
      initialValue: "neutral",
      validation: (rule) => rule.required(),
    }),

    defineField({
      name: "finishGroups",
      title: "Finish groups",
      type: "array",
      group: "finishes",
      description: "Colour swatches, in named groups — e.g. \"Frame finishes\" and \"Glass\". Each swatch is a name and a colour.",
      of: [
        defineArrayMember({
          type: "object",
          name: "finishGroup",
          title: "Finish group",
          fields: [
            defineField({
              name: "label",
              title: "Group name",
              type: "string",
              validation: (rule) => rule.required().max(40),
            }),
            defineField({
              name: "note",
              title: "Note",
              type: "text",
              rows: 2,
              description: "A sentence of advice under the group heading.",
              validation: (rule) => rule.required().max(200),
            }),
            defineField({
              name: "swatches",
              title: "Swatches",
              type: "array",
              of: [
                defineArrayMember({
                  type: "object",
                  name: "swatch",
                  title: "Swatch",
                  fields: [
                    defineField({
                      name: "name",
                      title: "Name",
                      type: "string",
                      validation: (rule) => rule.required().max(30),
                    }),
                    defineField({
                      name: "color",
                      title: "Colour",
                      type: "color",
                      options: { disableAlpha: true },
                      validation: (rule) => rule.required(),
                    }),
                    defineField({
                      name: "ring",
                      title: "Very pale colour",
                      type: "boolean",
                      description: "Tick for whites and near-whites so the swatch gets a thin outline and does not vanish into the page.",
                      initialValue: false,
                    }),
                  ],
                  preview: {
                    select: { title: "name", hex: "color.hex" },
                    prepare({ title, hex }) {
                      return { title, subtitle: hex };
                    },
                  },
                }),
              ],
              validation: (rule) => rule.required().min(2).max(12),
            }),
          ],
          preview: {
            select: { title: "label", swatches: "swatches" },
            prepare({ title, swatches }) {
              const n = Array.isArray(swatches) ? swatches.length : 0;
              return { title, subtitle: `${n} swatch${n === 1 ? "" : "es"}` };
            },
          },
        }),
      ],
    }),

    defineField({
      name: "specs",
      title: "What the quote covers",
      type: "array",
      group: "specs",
      description: "Label and value pairs — e.g. \"Glass\" → \"5 mm plain · 8, 10 and 12 mm toughened\". Only put in what you are happy to be held to.",
      of: [
        defineArrayMember({
          type: "object",
          name: "spec",
          title: "Specification",
          fields: [
            defineField({
              name: "label",
              title: "Label",
              type: "string",
              validation: (rule) => rule.required().max(40),
            }),
            defineField({
              name: "value",
              title: "Value",
              type: "string",
              validation: (rule) => rule.required().max(120),
            }),
          ],
          preview: { select: { title: "label", subtitle: "value" } },
        }),
      ],
    }),

    defineField({
      name: "faqs",
      title: "Questions customers ask",
      type: "array",
      group: "faqs",
      description: "The questions you actually get asked, with the answer you actually give. Three to six.",
      of: [
        defineArrayMember({
          type: "object",
          name: "faq",
          title: "Question",
          fields: [
            defineField({
              name: "q",
              title: "Question",
              type: "string",
              validation: (rule) => rule.required().max(120),
            }),
            defineField({
              name: "a",
              title: "Answer",
              type: "text",
              rows: 3,
              validation: (rule) => rule.required().max(500),
            }),
          ],
          preview: { select: { title: "q" } },
        }),
      ],
    }),
  ],
  orderings: [
    {
      title: "Site order",
      name: "orderAsc",
      by: [{ field: "order", direction: "asc" }],
    },
  ],
  preview: {
    select: { title: "title", subtitle: "blurb", media: "image" },
  },
});
