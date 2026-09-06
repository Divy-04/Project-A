/**
 * About-page narrative. Mirrors a future Sanity `aboutPage` singleton.
 *
 * TBC — everything here needs Nilesh to confirm it:
 *
 *  - The milestone YEARS are inferred from `establishedYear` (itself TBC) and
 *    are placeholders. Getting a date wrong on an About page is the kind of
 *    small error a local customer notices and remembers.
 *  - Nothing is written as a quotation in his mouth. The statement band is an
 *    unattributed principle on purpose: putting invented words in a real
 *    person's mouth is not a placeholder, it is a fabrication.
 *  - No awards, no staff count, no client names. Only what the business can
 *    stand behind.
 */

export type Milestone = {
  year: string;
  title: string;
  body: string;
};

/** TBC — years and order both need confirming. */
export const milestones: Milestone[] = [
  {
    year: "2011",
    title: "The workshop opens",
    body: "Aadi Enterprise starts in Himatnagar on aluminium and glass — doors, windows and shopfronts, measured and fabricated to order rather than bought in.",
  },
  {
    year: "2015",
    title: "Glazing and partitions",
    body: "Office partitions and structural glazing are added as commercial work around Sabarkantha picks up. The same crew, a bigger bench.",
  },
  {
    year: "2019",
    title: "Authorised for KDM profile",
    body: "The KDM distributorship makes PVC profile a division in its own right, bought direct rather than through a middleman — which is what keeps the quoted section and the fitted section the same thing.",
  },
  {
    year: "2022",
    title: "Furniture, in-house",
    body: "Modular kitchens, wardrobes and office furniture move onto our own bench instead of being sub-contracted, so a job that needs two trades no longer needs two firms.",
  },
  {
    year: "Today",
    title: "Three divisions, one crew",
    body: "Aluminium and glass, KDM PVC profile, and furniture — measured, fabricated, delivered and fitted by the same team, across Himatnagar and the towns around it.",
  },
];

/** The statement band. Deliberately unattributed — see the note above. */
export const statement =
  "Measured on your wall. Built on our bench. Fitted by the same hands that measured it.";

export type Principle = { title: string; body: string };

export const principles: Principle[] = [
  {
    title: "We measure it ourselves",
    body: "Every job starts with one of us at your site with a tape. Nothing is quoted off a photograph or a number read out over the phone, and the visit costs nothing.",
  },
  {
    title: "We build it on our own bench",
    body: "Cutting, mitring and assembly happen in our workshop, to the measurements we took. Nothing is bought in ready-made and forced into an opening it was not made for.",
  },
  {
    title: "We deliver and fit it",
    body: "The same crew that built it brings it and installs it. No handover to a transporter or a subcontractor in the middle, which is where most of the damage and most of the blame-shifting happens.",
  },
  {
    title: "We come back",
    body: "Doors settle and seasons move things. If something needs easing after the job is signed off, call and we will come and ease it.",
  },
];

/** Owner narrative, split so the sticky chapter column has something to scroll against. */
export const ownerStory = [
  "Nilesh Patel has worked in aluminium, glass and interior fabrication in and around Himatnagar since the workshop opened. He still takes the measurements himself, and he is the person you speak to when you call — not a call centre, and not a salesman working on commission.",
  "The business grew the way trade businesses in Sabarkantha usually grow: one job at a time, mostly on what the last customer told the next one. There was no advertising for years, and most of the work still arrives by word of mouth.",
  "That is also why all three divisions sit under one roof. A kitchen needs shutters and glass. A shopfront needs ACP and a PVC ceiling. Keeping the work in-house is what stops a project stalling between two trades who blame each other — and it is the reason a job that starts as one thing can finish as another without a second firm being called in.",
];
