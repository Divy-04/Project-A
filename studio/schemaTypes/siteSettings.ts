import { CogIcon } from "@sanity/icons/Cog";
import { defineArrayMember, defineField, defineType } from "sanity";

/**
 * Business-wide facts. One document, edited in place. Everything here appears
 * in the footer, the contact page, the structured data search engines read,
 * or all three — so a change here changes every page.
 */
export const siteSettings = defineType({
  name: "siteSettings",
  title: "Site settings",
  type: "document",
  icon: CogIcon,
  groups: [
    { name: "contact", title: "Contact", default: true },
    { name: "address", title: "Address & hours" },
    { name: "business", title: "Business" },
  ],
  fields: [
    defineField({
      name: "name",
      title: "Business name",
      type: "string",
      group: "business",
      validation: (rule) => rule.required().max(60),
    }),
    defineField({
      name: "owner",
      title: "Proprietor",
      type: "string",
      group: "business",
      description: "The name customers are told to ask for.",
      validation: (rule) => rule.required().max(60),
    }),

    defineField({
      name: "phone",
      title: "Phone number (for dialling)",
      type: "string",
      group: "contact",
      description: "International format with no spaces, e.g. +919724820859. This is what the Call buttons dial.",
      validation: (rule) =>
        rule
          .required()
          .regex(/^\+[1-9]\d{7,14}$/, { name: "international number" })
          .error("Use the international format with no spaces, e.g. +919724820859"),
    }),
    defineField({
      name: "phoneDisplay",
      title: "Phone number (as shown)",
      type: "string",
      group: "contact",
      description: "How the number is written on the page, e.g. 97248 20859.",
      validation: (rule) => rule.required().max(20),
    }),
    defineField({
      name: "whatsapp",
      title: "WhatsApp number",
      type: "string",
      group: "contact",
      description: "Country code and number, digits only, e.g. 919724820859. Usually the same as the phone without the +.",
      validation: (rule) =>
        rule
          .required()
          .regex(/^[1-9]\d{7,14}$/, { name: "digits only" })
          .error("Digits only, with the country code and no + sign, e.g. 919724820859"),
    }),
    defineField({
      name: "email",
      title: "Email",
      type: "string",
      group: "contact",
      validation: (rule) => rule.required().email(),
    }),

    defineField({
      name: "address",
      title: "Address",
      type: "object",
      group: "address",
      fields: [
        defineField({ name: "line1", title: "Building / street", type: "string", validation: (rule) => rule.required() }),
        defineField({ name: "city", title: "Town", type: "string", validation: (rule) => rule.required() }),
        defineField({ name: "district", title: "District", type: "string", validation: (rule) => rule.required() }),
        defineField({ name: "state", title: "State", type: "string", validation: (rule) => rule.required() }),
        defineField({ name: "postalCode", title: "PIN code", type: "string", validation: (rule) => rule.required().regex(/^\d{6}$/, { name: "6-digit PIN" }) }),
      ],
    }),
    defineField({
      name: "hours",
      title: "Opening hours",
      type: "string",
      group: "address",
      description: "Written in full for the contact page, e.g. \"Monday – Saturday, 9:00 am – 8:00 pm\".",
      validation: (rule) => rule.required().max(80),
    }),
    defineField({
      name: "hoursShort",
      title: "Opening hours (short)",
      type: "string",
      group: "address",
      description: "The compact version for the footer, e.g. \"Mon–Sat · 9 am – 8 pm\".",
      validation: (rule) => rule.required().max(40),
    }),
    defineField({
      name: "mapsUrl",
      title: "Google Maps link",
      type: "url",
      group: "address",
      description: "Optional. Paste the link to the business on Google Maps — ideally the Google Business Profile listing once it exists. Leave blank to search by address.",
    }),

    defineField({
      name: "establishedYear",
      title: "Year established",
      type: "number",
      group: "business",
      description: "Drives \"Since 2011\" and the years-in-trade count.",
      validation: (rule) => rule.required().integer().min(1950).max(2100),
    }),
    defineField({
      name: "projectsCompleted",
      title: "Projects completed",
      type: "number",
      group: "business",
      description: "A round number you can stand behind; the site shows it with a plus sign.",
      validation: (rule) => rule.required().integer().min(0),
    }),
    defineField({
      name: "serviceAreas",
      title: "Towns we work in",
      type: "array",
      group: "business",
      of: [defineArrayMember({ type: "string" })],
      description: "Only towns you genuinely travel to — they appear in the footer, on the homepage and in the data search engines read. The first four are named in the About page.",
      validation: (rule) => rule.required().min(1).max(20).unique(),
    }),
  ],
  preview: {
    prepare: () => ({ title: "Site settings" }),
  },
});
