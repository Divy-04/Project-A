/**
 * The three divisions, carried at equal weight throughout the site.
 * Mirrors the future Sanity `service` document type.
 *
 * The finishes, specs and FAQs below exist because the service pages were
 * otherwise a photograph and a six-item list — nothing to read, and nothing
 * for a search engine to rank. All three are real content that does not
 * depend on photography arriving.
 *
 * TBC: every value in `specs` is a plausible trade draft and needs Nilesh to
 * confirm or correct it before launch. Publishing a wrong section size or
 * lead time is worse than publishing none.
 */
export type Swatch = { name: string; hex: string; ring?: boolean };
export type FinishGroup = { label: string; note: string; swatches: Swatch[] };
export type Spec = { label: string; value: string };
export type Faq = { q: string; a: string };

export type Service = {
  slug: string;
  title: string;
  short: string;
  blurb: string;
  /** Longer lead for the division page — the blurb is the card-sized version. */
  intro: string;
  items: string[];
  tone: "warm" | "cool" | "neutral";
  finishGroups: FinishGroup[];
  specs: Spec[];
  faqs: Faq[];
};

export const services: Service[] = [
  {
    slug: "aluminium-glass",
    title: "Aluminium & Glass",
    short: "Aluminium",
    blurb:
      "Sliding and openable systems, office partitions, ACP cladding and structural glazing — fabricated and fitted to site measurement.",
    intro:
      "Aluminium is the division most people call us about first, usually because a window is leaking, a shutter has stopped running, or a shop is being fitted out. We cut and assemble the sections ourselves, so an opening that is out of square gets a frame made for it rather than a standard frame packed out with silicone.",
    items: [
      "Doors & Windows",
      "Office Partitions",
      "ACP Cladding",
      "Structural Glazing",
      "Domal Sections",
      "Toughened Glass",
      "Profile Glass Shutters",
      "Curtain (Parda) Systems",
    ],
    tone: "cool",
    finishGroups: [
      {
        label: "Frame finishes",
        note: "Powder-coated or anodised. Ask to see a sample before choosing — screens flatter every one of these.",
        swatches: [
          { name: "Natural Anodised", hex: "#c5c9cb" },
          { name: "Champagne", hex: "#c6b193" },
          { name: "Matt Black", hex: "#26262a" },
          { name: "Ivory", hex: "#ece6da", ring: true },
          { name: "Wood Coat", hex: "#8b6039" },
          { name: "Coffee Brown", hex: "#4a382b" },
        ],
      },
      {
        label: "Glass",
        note: "Thickness is chosen for the span and the use, not for the price — we will tell you which one the opening needs.",
        swatches: [
          { name: "Clear", hex: "#dde8ec", ring: true },
          { name: "Frosted", hex: "#e4e9e9", ring: true },
          { name: "Bronze Tint", hex: "#9a7f61" },
          { name: "Grey Tint", hex: "#979da0" },
          { name: "Reflective", hex: "#7d939f" },
          { name: "Toughened", hex: "#cfdde2", ring: true },
        ],
      },
    ],
    specs: [
      { label: "Sliding systems", value: "2-track and 3-track, Domal series" },
      { label: "Openable systems", value: "Casement and top-hung, with mesh option" },
      { label: "Glass", value: "5 mm plain · 8, 10 and 12 mm toughened" },
      { label: "Partitions", value: "Full-height and half-height, glazed or panelled" },
      { label: "Included in the quote", value: "Site measurement, fabrication, fitting, sealing and clean-up" },
      { label: "Not included", value: "Civil work, plaster making good, electrical" },
    ],
    faqs: [
      {
        q: "Can you match an existing section?",
        a: "Usually yes. Send a photograph of the frame edge-on and, if you can, a measurement across the section. If the series is discontinued we will tell you rather than fit something close and hope.",
      },
      {
        q: "Is toughened glass necessary?",
        a: "For anything at floor level, in a door, or over a certain span — yes, and we will say so. For a small fixed window above head height it is often an unnecessary cost.",
      },
      {
        q: "Do you do repairs, or only new work?",
        a: "Both. Re-glazing, roller and lock replacement, re-aligning a sliding shutter that has dropped. Call and describe it, or send a photograph.",
      },
      {
        q: "How long does an ACP shopfront take?",
        a: "It depends on the elevation and whether scaffolding is needed. We give a date at quoting stage once we have seen it — not before.",
      },
    ],
  },
  {
    slug: "pvc-kdm-profile",
    title: "PVC — KDM Profile",
    short: "PVC",
    blurb:
      "Authorised KDM distributor. Waterproof, termite-proof PVC profile for doors, shutters, ceilings and wall panelling.",
    intro:
      "PVC profile earns its place in the wet parts of a building. A bathroom door in wood will swell, warp and eventually need replacing; the same door in KDM profile will not. We are an authorised KDM distributor, so the profile is bought direct — the section you are quoted is the section that gets fitted, not a thinner lookalike.",
    items: [
      "PVC Doors",
      "PVC Shutters",
      "Ceiling Panelling",
      "Wall Panelling",
      "Bathroom & Utility Doors",
      "Mariya Work", // TBC — confirm what this covers
    ],
    tone: "neutral",
    finishGroups: [
      {
        label: "Profile colours",
        note: "Solid through the section, so a scratch does not show a different colour underneath.",
        swatches: [
          { name: "White", hex: "#f4f4f1", ring: true },
          { name: "Ivory", hex: "#eee5d1", ring: true },
          { name: "Light Grey", hex: "#a8a9a5" },
          { name: "Charcoal", hex: "#3b3c3a" },
          { name: "Teak Grain", hex: "#9a6a41" },
          { name: "Walnut Grain", hex: "#5d3e2a" },
        ],
      },
      {
        label: "Panelling",
        note: "For ceilings and feature walls. Wipes clean, and will not host termites.",
        swatches: [
          { name: "Plain White", hex: "#f6f6f3", ring: true },
          { name: "Marble", hex: "#e4e2dd", ring: true },
          { name: "Oak Slat", hex: "#b98b57" },
          { name: "Wenge Slat", hex: "#4b382b" },
        ],
      },
    ],
    specs: [
      { label: "Door thickness", value: "Standard and heavy-duty section" },
      { label: "Frame", value: "Matching PVC frame, no wooden chowkhat needed" },
      { label: "Fittings", value: "Stainless hinges, lock and handle" },
      { label: "Panelling", value: "Ceiling and full-height wall, with matched skirting" },
      { label: "Included in the quote", value: "Measurement, frame, shutter, fittings and fitting" },
      { label: "Best used for", value: "Bathrooms, utility areas, wash areas, damp walls" },
    ],
    faqs: [
      {
        q: "Does PVC yellow in sunlight?",
        a: "Cheap profile does. Genuine KDM section is UV-stabilised and holds its colour, which is most of the reason we buy direct rather than from whoever is cheapest that month.",
      },
      {
        q: "Will a PVC door take a normal lock?",
        a: "Yes. We fit stainless hinges and a standard mortice or cylinder lock, so keys and handles are the ordinary kind you can replace anywhere.",
      },
      {
        q: "Can PVC panelling go over an existing damp wall?",
        a: "It can, and it will look fine — but it hides the damp rather than fixing it. If the wall is wet we will say so before quoting.",
      },
      {
        q: "Is it only for bathrooms?",
        a: "No. Ceilings, feature walls, shop interiors and utility doors are all common. It is simply at its best where water is.",
      },
    ],
  },
  {
    slug: "furniture",
    title: "Furniture & Interiors",
    short: "Furniture",
    blurb:
      "Modular kitchens, sliding wardrobes, TV and display units, and complete office furniture — built to the room, not to a catalogue.",
    intro:
      "Nothing here is bought in a box. The room is measured, the carcasses are cut to that measurement, and what arrives is the size of the wall it is going against — which is why the wardrobe reaches the ceiling instead of leaving a dust shelf on top, and why the kitchen run ends flush instead of with a filler strip.",
    items: [
      "Modular Kitchens",
      "Sliding Wardrobes",
      "TV & Display Units",
      "Office Furniture",
      "Wooden Furniture",
      "Pooja & Mandir Units",
    ],
    tone: "warm",
    finishGroups: [
      {
        label: "Shutter finishes",
        note: "Matt hides fingerprints, gloss makes a small kitchen feel larger. Both wipe clean.",
        swatches: [
          { name: "Matt White", hex: "#f1f0ec", ring: true },
          { name: "High Gloss", hex: "#fafaf8", ring: true },
          { name: "Natural Oak", hex: "#c39a6b" },
          { name: "Walnut", hex: "#6a462d" },
          { name: "Charcoal", hex: "#33322f" },
          { name: "Olive", hex: "#6e7355" },
        ],
      },
      {
        label: "Counters",
        note: "Granite is harder and cheaper; quartz is lighter in colour and joins more cleanly.",
        swatches: [
          { name: "Black Granite", hex: "#2b2b2b" },
          { name: "Steel Grey", hex: "#75777a" },
          { name: "White Quartz", hex: "#eeeeea", ring: true },
          { name: "Beige Stone", hex: "#d8cdb8", ring: true },
        ],
      },
    ],
    specs: [
      { label: "Carcass", value: "Marine ply or HDHMR, edge-banded on all faces" },
      { label: "Shutters", value: "Laminate, acrylic or membrane" },
      { label: "Hardware", value: "Soft-close hinges and channels" },
      { label: "Kitchen layouts", value: "Straight, L-shaped, U-shaped and parallel" },
      { label: "Included in the quote", value: "Measurement, fabrication, delivery, fitting and clean-up" },
      { label: "Not included", value: "Appliances, sink and tap unless specified" },
    ],
    faqs: [
      {
        q: "How long does a modular kitchen take?",
        a: "Once measurements are taken and the finish is chosen, most kitchens are fabricated and fitted inside a few weeks. We give a date when we quote, and it is a date we intend to keep rather than a hopeful one.",
      },
      {
        q: "Can you work around an existing counter?",
        a: "Yes — replacing only the shutters and internals is common and much cheaper than starting again, provided the carcasses underneath are sound. We will tell you honestly if they are not.",
      },
      {
        q: "Do you make office furniture too?",
        a: "Reception counters, workstations with cable management, file walls and storage. Same bench, same crew.",
      },
      {
        q: "What if something needs adjusting later?",
        a: "Doors settle and seasons move things. Call and we will come and ease it — that is included, not a separate visit.",
      },
    ],
  },
];

export const serviceBySlug = (slug: string) =>
  services.find((s) => s.slug === slug);
