import { ImagesIcon } from "@sanity/icons/Images";
import { defineArrayMember, defineField, defineType } from "sanity";

/**
 * One completed job. Every published project becomes its own page at
 * /gallery/<slug>, a card in the gallery, and a candidate for the homepage
 * strip — so this is the document that grows the site.
 */
export const project = defineType({
  name: "project",
  title: "Project",
  type: "document",
  icon: ImagesIcon,
  fields: [
    defineField({
      name: "title",
      title: "Title",
      type: "string",
      description:
        "What was made — e.g. \"L-Shaped Modular Kitchen\" or \"Glazed Office Partition\".",
      validation: (rule) => rule.required().max(80),
    }),
    defineField({
      name: "slug",
      title: "Web address",
      type: "slug",
      description:
        "The end of the page's address. Click Generate to make it from the title. Once the project is published, leave it alone — changing it breaks links people have shared.",
      options: { source: "title", maxLength: 96 },
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "division",
      title: "Division",
      type: "reference",
      to: [{ type: "division" }],
      description: "Which of the three divisions did this job.",
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "location",
      title: "Location",
      type: "string",
      description:
        "The town, or the area and town — e.g. \"Idar\" or \"Motipura, Himatnagar\". Town names are what local search runs on, so spell them the way people search for them.",
      validation: (rule) => rule.required().max(60),
    }),
    defineField({
      name: "completedOn",
      title: "Completed",
      type: "date",
      description: "When the job was finished. Only the month and year are shown.",
      options: { dateFormat: "MMMM YYYY" },
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "summary",
      title: "What was involved",
      type: "text",
      rows: 3,
      description:
        "One or two sentences on the job — the material, the finish, anything unusual. Shows on the card and at the top of the project page.",
      validation: (rule) => rule.required().min(40).max(280),
    }),
    defineField({
      name: "images",
      title: "Photographs",
      type: "array",
      of: [defineArrayMember({ type: "photo" })],
      description:
        "The first photograph is the lead shot, shown large and on the card. Drag to reorder. Up to twelve.",
      validation: (rule) => rule.max(12),
    }),
  ],
  orderings: [
    {
      title: "Most recent first",
      name: "completedOnDesc",
      by: [{ field: "completedOn", direction: "desc" }],
    },
  ],
  preview: {
    select: {
      title: "title",
      location: "location",
      division: "division.title",
      media: "images.0",
    },
    prepare({ title, location, division, media }) {
      return {
        title,
        subtitle: [division, location].filter(Boolean).join(" · "),
        media,
      };
    },
  },
});
