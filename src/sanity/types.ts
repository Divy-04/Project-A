/**
 * The shapes the site reads from Sanity — what the GROQ projections in
 * `queries.ts` return, not the raw documents. Components import from here and
 * never from the Studio's schema, so the Next app has no build dependency on
 * `studio/`.
 *
 * Keep these in step with the projections. TypeScript cannot check a GROQ
 * string, so a field renamed in the schema has to be renamed in three places:
 * the Studio schema, the projection, and here.
 */

export type Tone = "warm" | "cool" | "neutral";

export type ImageAsset = {
  _id: string;
  url: string;
  metadata: {
    /** ~20px JPEG as a data URI; painted under the image while it loads. */
    lqip?: string;
    dimensions: { width: number; height: number; aspectRatio: number };
  };
};

/** An image field with its asset dereferenced, plus the editor's alt text. */
export type SiteImage = {
  alt?: string;
  asset: ImageAsset;
  hotspot?: { x: number; y: number; width: number; height: number };
  crop?: { top: number; bottom: number; left: number; right: number };
};

export type DivisionRef = {
  slug: string;
  title: string;
  short: string;
  tone: Tone;
};

export type Swatch = { name: string; hex: string; ring?: boolean };
export type FinishGroup = { label: string; note: string; swatches: Swatch[] };
export type Spec = { label: string; value: string };
export type Faq = { q: string; a: string };

export type Division = DivisionRef & {
  blurb: string;
  intro: string;
  items: string[];
  finishGroups: FinishGroup[];
  specs: Spec[];
  faqs: Faq[];
  image: SiteImage | null;
};

export type Project = {
  _id: string;
  slug: string;
  title: string;
  division: DivisionRef;
  location: string;
  /** ISO date; the site shows month and year only. */
  completedOn: string;
  summary: string;
  /** Sanity's `_updatedAt` — the sitemap's lastModified for this page. */
  updatedAt: string;
  images: SiteImage[];
};

export type Testimonial = {
  _id: string;
  quote: string;
  name: string;
  town: string;
  work: string;
};

export type SiteSettings = {
  name: string;
  owner: string;
  phone: string;
  phoneDisplay: string;
  whatsapp: string;
  email: string;
  address: {
    line1: string;
    city: string;
    district: string;
    state: string;
    postalCode: string;
  };
  hours: string;
  hoursShort: string;
  establishedYear: number;
  projectsCompleted: number;
  serviceAreas: string[];
  /** Optional override — the Google Business Profile listing, once it exists. */
  mapsUrl: string | null;
};

export type HomePage = {
  heroLead: SiteImage | null;
  heroSmallLeft: SiteImage | null;
  heroSmallRight: SiteImage | null;
  beforeImage: SiteImage | null;
  afterImage: SiteImage | null;
  areaImage: SiteImage | null;
  /** Editor's picks, or the newest projects when nothing is picked. */
  featuredProjects: Project[];
};

export type Milestone = { year: string; title: string; body: string };
export type Principle = { title: string; body: string };

export type AboutPage = {
  ownerPortrait: SiteImage | null;
  ownerStory: string[];
  statement: string;
  milestones: Milestone[];
  principles: Principle[];
};
