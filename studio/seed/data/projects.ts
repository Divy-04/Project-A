/**
 * Placeholder project records.
 *
 * Field-for-field this is the future Sanity `project` document. Each one
 * becomes its own indexable page at /gallery/[slug] — which is what turns
 * the owner's upload habit into a growing set of ranking pages.
 *
 * All content here is dummy copy for design review only.
 */
export type Project = {
  slug: string;
  title: string;
  category: "aluminium-glass" | "pvc-profile" | "furniture";
  categoryLabel: string;
  location: string;
  completedOn: string;
  summary: string;
  photoCount: number;
  featured: boolean;
};

/**
 * Ordered most recent first — that order drives the gallery, the previous/next
 * links, and which six are featured.
 *
 * Three per division, deliberately. The real photographs the client sent were
 * mostly furniture because that is what he happened to have to hand, and it
 * would be very easy to let the site inherit that tilt. Keep this balanced as
 * real projects replace these.
 */
export const projects: Project[] = [
  {
    slug: "office-partition-durga-complex",
    title: "Glazed Office Partition",
    category: "aluminium-glass",
    categoryLabel: "Aluminium & Glass",
    location: "Himatnagar",
    completedOn: "2026-05",
    summary:
      "Full-height aluminium partition with frosted and clear glazing, twin doors and an overhead transom run.",
    photoCount: 4,
    featured: true,
  },
  {
    slug: "modular-kitchen-motipura",
    title: "L-Shaped Modular Kitchen",
    category: "furniture",
    categoryLabel: "Furniture & Interiors",
    location: "Motipura, Himatnagar",
    completedOn: "2026-04",
    summary:
      "Soft-close shutters, granite counter with under-mount sink and full-height utility storage.",
    photoCount: 4,
    featured: true,
  },
  {
    slug: "pvc-door-set-bathroom-utility",
    title: "PVC Door Set, Bath & Utility",
    category: "pvc-profile",
    categoryLabel: "PVC Profile",
    location: "Himatnagar",
    completedOn: "2026-04",
    summary:
      "Four waterproof PVC profile doors with matching frames, moulded panel faces and stainless fittings.",
    photoCount: 3,
    featured: true,
  },
  {
    slug: "sliding-door-farmhouse-idar",
    title: "Poolside Sliding Door System",
    category: "aluminium-glass",
    categoryLabel: "Aluminium & Glass",
    location: "Idar",
    completedOn: "2026-03",
    summary:
      "Three-track sliding system in champagne finish with toughened glass and concealed drainage.",
    photoCount: 3,
    featured: true,
  },
  {
    slug: "sliding-wardrobe-bedroom-set",
    title: "Sliding Wardrobe & Loft",
    category: "furniture",
    categoryLabel: "Furniture & Interiors",
    location: "Himatnagar",
    completedOn: "2026-03",
    summary:
      "Wall-to-wall sliding wardrobe with laminate finish, open column shelving and integrated loft storage.",
    photoCount: 4,
    featured: true,
  },
  {
    slug: "pvc-ceiling-panelling-prantij",
    title: "PVC Ceiling & Wall Panelling",
    category: "pvc-profile",
    categoryLabel: "PVC Profile",
    location: "Prantij",
    completedOn: "2026-02",
    summary:
      "Wood-finish PVC slat ceiling with matching feature wall and recessed LED coving.",
    photoCount: 3,
    featured: true,
  },
  {
    slug: "office-furniture-fitout-talod",
    title: "Office Furniture Fit-out",
    category: "furniture",
    categoryLabel: "Furniture & Interiors",
    location: "Talod",
    completedOn: "2026-02",
    summary:
      "Reception counter, six workstations with cable management and a lockable file wall in matching laminate.",
    photoCount: 4,
    featured: false,
  },
  {
    slug: "acp-cladding-shopfront",
    title: "ACP Shopfront Cladding",
    category: "aluminium-glass",
    categoryLabel: "Aluminium & Glass",
    location: "Talod",
    completedOn: "2026-01",
    summary:
      "Grooved ACP elevation with concealed fixing, aluminium shutter box and signage backing frame.",
    photoCount: 4,
    featured: false,
  },
  {
    slug: "pvc-wall-panelling-shop-modasa",
    title: "PVC Wall Panelling, Retail",
    category: "pvc-profile",
    categoryLabel: "PVC Profile",
    location: "Modasa",
    completedOn: "2025-12",
    summary:
      "Full-height panelling behind the display run, termite-proof and washable, with a matched profile skirting.",
    photoCount: 3,
    featured: false,
  },
];

export const featuredProjects = projects.filter((p) => p.featured);

export const projectBySlug = (slug: string) =>
  projects.find((p) => p.slug === slug);

export const projectsInCategory = (category: Project["category"]) =>
  projects.filter((p) => p.category === category);

/**
 * Placeholder tone per division. Once real photography lands this goes away
 * with the placeholders themselves.
 */
export const toneForCategory = (category: string) =>
  ({
    "aluminium-glass": "cool",
    "pvc-profile": "neutral",
    furniture: "warm",
  })[category] ?? "neutral";

/** "2026-05" → "May 2026". Kept out of the components so it reads one way. */
export const formatCompleted = (value: string) => {
  const [year, month] = value.split("-");
  const name = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ][Number(month) - 1];
  return name ? `${name} ${year}` : year;
};
