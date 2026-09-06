import { UserIcon } from "@sanity/icons/User";
import { defineArrayMember, defineField, defineType } from "sanity";

/**
 * The About page's photograph and narrative. One document, edited in place.
 *
 * Nothing here should be written as a quotation in the owner's mouth unless
 * he actually said it — the statement band is an unattributed principle on
 * purpose.
 */
export const aboutPage = defineType({
  name: "aboutPage",
  title: "About page",
  type: "document",
  icon: UserIcon,
  fields: [
    defineField({
      name: "ownerPortrait",
      title: "Owner portrait",
      type: "photo",
      description: "A photograph of the proprietor. Portrait orientation, head and shoulders or waist up. Mark the face with the hotspot so it is never cropped out.",
    }),
    defineField({
      name: "ownerStory",
      title: "About the owner",
      type: "array",
      of: [defineArrayMember({ type: "text", rows: 4 })],
      description: "Two to four paragraphs. Each box is one paragraph.",
      validation: (rule) => rule.required().min(1).max(6),
    }),
    defineField({
      name: "statement",
      title: "Statement",
      type: "text",
      rows: 2,
      description: "The one-line principle shown large on the dark band — e.g. \"Measured on your wall. Built on our bench.\" Not a quotation.",
      validation: (rule) => rule.required().max(160),
    }),
    defineField({
      name: "milestones",
      title: "The story",
      type: "array",
      description: "How the business grew, in order. Years must be right — a wrong date on an About page is exactly what a local customer notices.",
      of: [
        defineArrayMember({
          type: "object",
          name: "milestone",
          title: "Milestone",
          fields: [
            defineField({
              name: "year",
              title: "Year",
              type: "string",
              description: "A year, or a word like \"Today\".",
              validation: (rule) => rule.required().max(12),
            }),
            defineField({
              name: "title",
              title: "Title",
              type: "string",
              validation: (rule) => rule.required().max(60),
            }),
            defineField({
              name: "body",
              title: "What happened",
              type: "text",
              rows: 3,
              validation: (rule) => rule.required().max(400),
            }),
          ],
          preview: {
            select: { title: "title", subtitle: "year" },
          },
        }),
      ],
      validation: (rule) => rule.required().min(2).max(8),
    }),
    defineField({
      name: "principles",
      title: "Commitments",
      type: "array",
      description: "The things done on every job without being asked. Four reads best.",
      of: [
        defineArrayMember({
          type: "object",
          name: "principle",
          title: "Commitment",
          fields: [
            defineField({
              name: "title",
              title: "Title",
              type: "string",
              validation: (rule) => rule.required().max(50),
            }),
            defineField({
              name: "body",
              title: "Detail",
              type: "text",
              rows: 3,
              validation: (rule) => rule.required().max(400),
            }),
          ],
          preview: { select: { title: "title" } },
        }),
      ],
      validation: (rule) => rule.required().min(2).max(6),
    }),
  ],
  preview: {
    prepare: () => ({ title: "About page" }),
  },
});
