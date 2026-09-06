import { HomeIcon } from "@sanity/icons/Home";
import { defineArrayMember, defineField, defineType } from "sanity";

/**
 * The homepage's photograph slots and the featured-work picks. One document,
 * edited in place. The words on the homepage stay in code — they were
 * written for the layout — but every picture on it is chosen here.
 */
export const homePage = defineType({
  name: "homePage",
  title: "Home page",
  type: "document",
  icon: HomeIcon,
  groups: [
    { name: "hero", title: "Top of page", default: true },
    { name: "featured", title: "Featured work" },
    { name: "other", title: "Other photographs" },
  ],
  fields: [
    defineField({
      name: "heroLead",
      title: "Main photograph",
      type: "photo",
      group: "hero",
      description: "The large photograph beside the headline. Landscape works best — it is shown 3:2.",
    }),
    defineField({
      name: "heroSmallLeft",
      title: "Small photograph, left",
      type: "photo",
      group: "hero",
      description: "Sits under the main photograph on the left. Shown 4:3.",
    }),
    defineField({
      name: "heroSmallRight",
      title: "Small photograph, right",
      type: "photo",
      group: "hero",
      description: "Sits under the main photograph on the right. Shown 4:3.",
    }),

    defineField({
      name: "featuredProjects",
      title: "Featured projects",
      type: "array",
      group: "featured",
      of: [
        defineArrayMember({
          type: "reference",
          to: [{ type: "project" }],
        }),
      ],
      description: "Pick which projects appear on the homepage, in this order. Three or six fill the rows evenly. Leave empty to show the six most recent automatically.",
      validation: (rule) => rule.max(6).unique(),
    }),

    defineField({
      name: "beforeImage",
      title: "Before photograph",
      type: "photo",
      group: "other",
      description: "The left half of the before-and-after slider. Take both photographs from the same spot. Shown 16:9.",
    }),
    defineField({
      name: "afterImage",
      title: "After photograph",
      type: "photo",
      group: "other",
      description: "The right half of the before-and-after slider. Shown 16:9.",
    }),
    defineField({
      name: "areaImage",
      title: "Where we work photograph",
      type: "photo",
      group: "other",
      description: "Beside the list of towns. Optional. Shown 4:3.",
    }),
  ],
  preview: {
    prepare: () => ({ title: "Home page" }),
  },
});
