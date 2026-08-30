/**
 * Placeholder testimonials — dummy copy for layout review only.
 * Replace with 3–5 real quotes (name + town is enough) before launch.
 * Mirrors the future Sanity `testimonial` document type.
 */
export type Testimonial = {
  quote: string;
  name: string;
  town: string;
  work: string;
};

export const testimonials: Testimonial[] = [
  {
    quote:
      "Measurement was taken on a Monday and the partition was standing by Friday. The finish is clean and the doors still run smooth two years on.",
    name: "Placeholder Name",
    town: "Himatnagar",
    work: "Office Partition",
  },
  {
    quote:
      "We compared three quotes. Aadi was not the cheapest, but the material he showed us was clearly better and he explained why. No regrets.",
    name: "Placeholder Name",
    town: "Idar",
    work: "Modular Kitchen",
  },
  {
    quote:
      "Nilesh bhai handled everything himself — measuring, fitting, and the small adjustments afterwards. Easy to deal with.",
    name: "Placeholder Name",
    town: "Prantij",
    work: "Sliding Wardrobe",
  },
];
