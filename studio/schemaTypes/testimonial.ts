import { CommentIcon } from "@sanity/icons/Comment";
import { defineField, defineType } from "sanity";

export const testimonial = defineType({
  name: "testimonial",
  title: "Testimonial",
  type: "document",
  icon: CommentIcon,
  fields: [
    defineField({
      name: "quote",
      title: "What they said",
      type: "text",
      rows: 4,
      description: "In their words, as close as you can. Two or three sentences reads best.",
      validation: (rule) => rule.required().min(40).max(400),
    }),
    defineField({
      name: "name",
      title: "Name",
      type: "string",
      description: "First name and initial is enough if they would rather not have their full name up.",
      validation: (rule) => rule.required().max(60),
    }),
    defineField({
      name: "town",
      title: "Town",
      type: "string",
      validation: (rule) => rule.required().max(40),
    }),
    defineField({
      name: "work",
      title: "The job",
      type: "string",
      description: "What was done for them — e.g. \"Modular Kitchen\", \"Office Partition\".",
      validation: (rule) => rule.required().max(60),
    }),
    defineField({
      name: "order",
      title: "Order",
      type: "number",
      description: "Lower numbers show first. Leave blank to sort by when it was added.",
    }),
  ],
  orderings: [
    {
      title: "Display order",
      name: "orderAsc",
      by: [
        { field: "order", direction: "asc" },
        { field: "_createdAt", direction: "asc" },
      ],
    },
  ],
  preview: {
    select: { title: "name", town: "town", work: "work" },
    prepare({ title, town, work }) {
      return { title, subtitle: [work, town].filter(Boolean).join(" · ") };
    },
  },
});
