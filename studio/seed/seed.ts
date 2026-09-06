import {
  createClient,
  type IdentifiedSanityDocumentStub,
} from "@sanity/client";
import { projects } from "./data/projects";
import { services } from "./data/services";
import { site } from "./data/site";
import { milestones, ownerStory, principles, statement } from "./data/story";
import { testimonials } from "./data/testimonials";

/**
 * Seeds the dataset with the placeholder content the site went into design
 * review with, so the Studio opens populated and the owner replaces rather
 * than starts from nothing.
 *
 *   SANITY_AUTH_TOKEN=… npx sanity exec seed/seed.ts
 *
 * Refuses to run against a dataset that already has content — after the
 * first run the Studio owns the data and this script would overwrite the
 * owner's edits. `-- --force` overrides that, deliberately.
 *
 * IDs are deterministic (`project-<slug>`, `division-<slug>`, the three
 * singleton names) so a forced re-run replaces documents in place instead of
 * duplicating them, and the homepage's featured references resolve.
 */

const token = process.env.SANITY_AUTH_TOKEN;
if (!token) {
  console.error(
    "SANITY_AUTH_TOKEN is not set. Export the Developer token from .env.local before running the seed.",
  );
  process.exit(1);
}

const client = createClient({
  projectId: "hhvsb0rp",
  dataset: "production",
  apiVersion: "2026-09-01",
  token,
  useCdn: false,
});

const TYPES = [
  "project",
  "division",
  "testimonial",
  "homePage",
  "aboutPage",
  "siteSettings",
];

const force = process.argv.includes("--force");

/** Stable array keys from the content itself, so re-seeding is idempotent. */
const key = (...parts: (string | number)[]) =>
  parts
    .join("-")
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)/g, "")
    .slice(0, 48);

/** The shape `@sanity/color-input` stores. It reads `hex`; the rest keeps its
 *  picker consistent when the swatch is opened. */
function hexToColor(hex: string) {
  const n = parseInt(hex.slice(1), 16);
  const r = (n >> 16) & 255;
  const g = (n >> 8) & 255;
  const b = n & 255;
  const rn = r / 255;
  const gn = g / 255;
  const bn = b / 255;
  const max = Math.max(rn, gn, bn);
  const min = Math.min(rn, gn, bn);
  const d = max - min;
  const l = (max + min) / 2;

  let h = 0;
  if (d) {
    h =
      max === rn
        ? ((gn - bn) / d) % 6
        : max === gn
          ? (bn - rn) / d + 2
          : (rn - gn) / d + 4;
    h = Math.round(h * 60);
    if (h < 0) h += 360;
  }
  const s = d ? d / (1 - Math.abs(2 * l - 1)) : 0;

  return {
    _type: "color",
    hex,
    alpha: 1,
    rgb: { _type: "rgbaColor", r, g, b, a: 1 },
    hsl: { _type: "hslaColor", h, s, l, a: 1 },
    hsv: { _type: "hsvaColor", h, s: max ? d / max : 0, v: max, a: 1 },
  };
}

const divisionDocs = services.map((s, i) => ({
  _id: `division-${s.slug}`,
  _type: "division",
  title: s.title,
  short: s.short,
  slug: { _type: "slug", current: s.slug },
  order: i + 1,
  blurb: s.blurb,
  intro: s.intro,
  items: [...s.items],
  tone: s.tone,
  finishGroups: s.finishGroups.map((g, gi) => ({
    _key: key("g", gi, g.label),
    _type: "finishGroup",
    label: g.label,
    note: g.note,
    swatches: g.swatches.map((sw, si) => ({
      _key: key("s", si, sw.name),
      _type: "swatch",
      name: sw.name,
      color: hexToColor(sw.hex),
      ring: sw.ring ?? false,
    })),
  })),
  specs: s.specs.map((sp, i) => ({
    _key: key("sp", i, sp.label),
    _type: "spec",
    label: sp.label,
    value: sp.value,
  })),
  faqs: s.faqs.map((f, i) => ({
    _key: key("f", i),
    _type: "faq",
    q: f.q,
    a: f.a,
  })),
}));

const projectDocs = projects.map((p) => ({
  _id: `project-${p.slug}`,
  _type: "project",
  title: p.title,
  slug: { _type: "slug", current: p.slug },
  division: { _type: "reference", _ref: `division-${p.category}` },
  location: p.location,
  // "2026-05" in the placeholder data; Sanity's date type wants a full day.
  completedOn: `${p.completedOn}-01`,
  summary: p.summary,
}));

const testimonialDocs = testimonials.map((t, i) => ({
  _id: `testimonial-${i + 1}`,
  _type: "testimonial",
  quote: t.quote,
  name: t.name,
  town: t.town,
  work: t.work,
  order: i + 1,
}));

const siteSettingsDoc = {
  _id: "siteSettings",
  _type: "siteSettings",
  name: site.name,
  owner: site.owner,
  phone: site.phone,
  phoneDisplay: site.phoneDisplay,
  whatsapp: site.whatsapp,
  email: site.email,
  address: { ...site.address },
  hours: site.hours,
  hoursShort: site.hoursShort,
  establishedYear: site.establishedYear,
  projectsCompleted: site.projectsCompleted,
  credential: site.credential,
  serviceAreas: [...site.serviceAreas],
};

const homePageDoc = {
  _id: "homePage",
  _type: "homePage",
  featuredProjects: projects
    .filter((p) => p.featured)
    .map((p) => ({
      _key: key(p.slug),
      _type: "reference",
      _ref: `project-${p.slug}`,
    })),
};

const aboutPageDoc = {
  _id: "aboutPage",
  _type: "aboutPage",
  ownerStory: [...ownerStory],
  statement,
  milestones: milestones.map((m, i) => ({
    _key: key("m", i, m.year),
    _type: "milestone",
    year: m.year,
    title: m.title,
    body: m.body,
  })),
  principles: principles.map((p, i) => ({
    _key: key("p", i, p.title),
    _type: "principle",
    title: p.title,
    body: p.body,
  })),
};

async function main() {
  const existing = await client.fetch<number>(`count(*[_type in $types])`, {
    types: TYPES,
  });

  if (existing > 0 && !force) {
    console.log(
      `The dataset already holds ${existing} content documents. Refusing to overwrite them.\n` +
        `If you really want to replace everything with the seed: npx sanity exec seed/seed.ts -- --force`,
    );
    process.exit(2);
  }

  const docs: IdentifiedSanityDocumentStub[] = [
    ...divisionDocs,
    ...projectDocs,
    ...testimonialDocs,
    siteSettingsDoc,
    homePageDoc,
    aboutPageDoc,
  ];

  // Divisions first so the project references resolve within the same commit.
  let tx = client.transaction();
  for (const doc of docs) tx = tx.createOrReplace(doc);
  const result = await tx.commit();

  console.log(`Seeded ${result.results.length} documents into production:`);
  console.log(`  ${divisionDocs.length} divisions, ${projectDocs.length} projects, ${testimonialDocs.length} testimonials`);
  console.log(`  siteSettings, homePage (${homePageDoc.featuredProjects.length} featured), aboutPage`);
}

main().catch((error) => {
  console.error(error);
  process.exit(1);
});
