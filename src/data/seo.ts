/**
 * Search wording, in one place.
 *
 * What lives here is what Google reads first: the title and description of
 * each page, and the main heading of each division page.
 *
 * The keywords come from Google's own suggestions (researched 3 Oct 2026):
 * people type the product and the town — "aluminium window", "domal window",
 * "glass partition", "modular kitchen in himatnagar", "carpenter in
 * himatnagar". Above all they type **"PVC furniture"**, not "PVC profile",
 * which mostly brings up manufacturers selling sheet to the trade. So the
 * PVC page is headed and titled for furniture while the division keeps its
 * name everywhere else.
 *
 * The site carries no prices and no Gujarati text — both were tried and
 * taken out at Divy's request on 3 Oct 2026. Do not add them back without
 * asking.
 *
 * Titles stay near 60 characters before the " – AADI ENTERPRISE" suffix the
 * layout adds; descriptions near 155. Longer ones get cut off in results.
 *
 * Keyed by division slug. A division added in the Studio without an entry
 * here still gets a sensible heading and title from its own name — see
 * `divisionSeo`.
 */

export type DivisionSeo = {
  /**
   * The page's h1. The division keeps its name in the eyebrow, breadcrumb
   * and nav; the heading says what people search for.
   */
  heading: string;
  /** The page <title>, before the site name. */
  title: string;
  description: string;
};

const DIVISIONS: Record<string, DivisionSeo> = {
  "aluminium-glass": {
    heading: "Aluminium Windows & Glass in Himatnagar",
    title: "Aluminium Windows, Doors & Glass Partitions in Himatnagar",
    description:
      "Aluminium sliding and domal windows, doors, aluminium kitchens, office glass partitions and ACP cladding — measured and fitted in Himatnagar and Sabarkantha.",
  },
  "pvc-profile": {
    heading: "PVC Furniture & Doors in Himatnagar",
    title: "PVC Furniture, Kitchens & Doors in Himatnagar",
    description:
      "PVC furniture in Kaka and Polywood board — kitchens, wardrobes, bathroom doors, mandir, mariya (loft) and ceilings. Waterproof, termite-proof, in Himatnagar.",
  },
  furniture: {
    heading: "Furniture & Modular Kitchens in Himatnagar",
    title: "Modular Kitchens, Wardrobes & All Furniture in Himatnagar",
    description:
      "Modular kitchens, wardrobes, beds, TV units, mandir, office and shop furniture — every kind of furniture, built to your room by our carpenters in Himatnagar.",
  },
};

/**
 * How a project page names its kind of work in its description — the phrase
 * people search, so "PVC furniture work", not "PVC Profile work".
 */
const WORK: Record<string, string> = {
  "aluminium-glass": "Aluminium and glass work",
  "pvc-profile": "PVC furniture work",
  furniture: "Furniture work",
};

export const divisionWork = (division: { slug: string; title: string }) =>
  WORK[division.slug] ?? `${division.title} work`;

export function divisionSeo(division: {
  slug: string;
  title: string;
  blurb: string;
}): DivisionSeo {
  return (
    DIVISIONS[division.slug] ?? {
      heading: `${division.title} in Himatnagar`,
      title: `${division.title} in Himatnagar`,
      description: division.blurb,
    }
  );
}

export const PAGES = {
  home: {
    description:
      "Aluminium windows and partitions, PVC furniture and doors, modular kitchens and every kind of furniture — made and fitted in Himatnagar. Free site visit.",
  },
  gallery: {
    title: "Our Work: Aluminium, PVC & Furniture Projects, Himatnagar",
    description:
      "Photos of finished aluminium, glass, PVC and furniture jobs across Himatnagar and Sabarkantha — with the town and what each job involved.",
  },
  about: {
    title: "About Our Fabrication Workshop in Himatnagar",
  },
  contact: {
    title: "Contact Us: Free Site Visit & Quote in Himatnagar",
  },
} as const;
