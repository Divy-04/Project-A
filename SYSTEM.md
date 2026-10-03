# AADI ENTERPRISE — system overview

What the site is and how it is put together. Read `CLAUDE.md` alongside this:
that one records *why* things are the way they are and what must not be
broken; this one is the map.

---

## What it is

A marketing site for AADI ENTERPRISE, a fabrication business in Himatnagar,
Sabarkantha, Gujarat. Proprietor: Nilesh Patel.

Three divisions, carried at **equal weight** everywhere:

| Division | Slug |
| --- | --- |
| Aluminium & Glass | `aluminium-glass` |
| PVC Profile | `pvc-profile` |
| Furniture & Interiors | `furniture` |

The site's primary job is to be **found** — to rank locally for Himatnagar and
the surrounding towns. Every technical decision below follows from that.

---

## Running it

```bash
npm install
npm run dev          # http://localhost:3000
npm run build        # production build
npm start            # serve the production build
npx eslint src --ext .ts,.tsx
```

`next lint` does not exist in Next 16 — use `eslint` directly.

---

## Stack

| | |
| --- | --- |
| Framework | Next.js 16.3, App Router, Turbopack |
| UI | React 19.2, TypeScript |
| Styling | Tailwind CSS v4 (`@theme` tokens in `src/app/globals.css`) |
| Font | Archivo, variable, self-hosted via `next/font/google` |
| Images | **None.** No image files exist; `next/image` is not imported |
| CMS | Sanity — planned, not started |
| Hosting | Not decided |

Every page is statically prerendered. The only server-side code is
`/api/enquiry`.

---

## Routes

16 pages, plus two generated files and one endpoint.

| Route | Type | Source |
| --- | --- | --- |
| `/` | Static | `src/app/page.tsx` |
| `/gallery` | Static | `src/app/gallery/page.tsx` |
| `/gallery/[slug]` | SSG × 9 | `generateStaticParams` from `getProjects()` (Sanity) |
| `/services/[slug]` | SSG × 3 | `generateStaticParams` from `getDivisions()` (Sanity) |
| `/about` | Static | `src/app/about/page.tsx` |
| `/contact` | Static | `src/app/contact/page.tsx` |
| `/sitemap.xml` | Static | `src/app/sitemap.ts` |
| `/robots.txt` | Static | `src/app/robots.ts` |
| `/api/enquiry` | Dynamic | Emails the enquiry via Brevo — see below |

Navigation is **Home · Our Work · About · Contact**, defined once in
`src/data/nav.ts` and reused by the header, the footer and the mobile tab bar.

On phones and tablets those four destinations sit in a bottom tab bar with
Call in the centre, the way an application would carry them — see
*The mobile shell* below. Above `lg` the header is the whole navigation.

Division pages are reached from the homepage and the footer rather than the
top nav. They matter: they carry the commercial search terms ("aluminium
partition Himatnagar", "PVC door Sabarkantha") that the homepage can only
mention in passing.

---

## Data

Content lives in **Sanity** — project `hhvsb0rp`, dataset `production`,
public. The site reads published documents anonymously at build time through
`src/sanity/client.ts`; the GROQ is in `queries.ts`, the shapes in `types.ts`,
and pages call the cached loaders in `loaders.ts` (`getSettings`,
`getDivisions`, `getProjects`, `getHomePage`, `getAboutPage`,
`getTestimonials`). No Sanity credential exists in the app or on the host.

| Document | Count | Holds |
| --- | --- | --- |
| `siteSettings` | 1 | NAP, hours, service areas, established year, project count, Maps link |
| `division` | 3 | Copy, scope items, finish swatches, specs, FAQs, tone |
| `project` | 9 | Title, division, town, completed month, summary, images |
| `homePage` | 1 | Hero slots, before/after, where-we-work photo, featured projects |
| `aboutPage` | 1 | Owner portrait and story, statement, milestones, principles |
| `testimonial` | 3 | Placeholder quotes |

The Studio is its own package in `studio/` and is hosted at
https://aadi-enterprise.sanity.studio — see `studio/README.md`. The old
`src/data/*.ts` content files are now `studio/seed/data/`, the seed's input
only. `src/data/nav.ts` stays in the app: navigation is structure, not content.

The seed keeps **three projects per division on purpose.** The reference
photos the client supplied skewed heavily to furniture, and an unbalanced
gallery is the most visible way that tilt gets back into the site.

Values marked `TBC` in Site settings, and every `specs` value on the three
Division documents, are drafts awaiting the client's confirmation. See *Before
launch* below.

A publish changes nothing on the live site until the Sanity webhook is pointed
at the host's build hook — that is wired at deployment.

---

## Components

32 components in `src/components/`, with `home/` holding the homepage sections.

**Layout** — `Header`, `Footer`, `MobileTabBar`, `PageHeader`,
`SectionHead`, `Breadcrumbs`, `Button`, `Wordmark`, `icons`.

**Content** — `ProjectCard`, `ProjectIndex`, `GalleryBrowser`, `Swatches`,
`SpecList`, `Faqs`, `EnquiryForm`, `CtaBand`, `Photo` (a Sanity image with
`srcset`, or the `Placeholder` in the same footprint), `Placeholder`,
`FooterMap`, `ComparisonSlider`.

**Decoration** — `Backdrop` (line-art elevations and the mark watermark),
`Marquee`, `CountUp`, `ScrollRig` + `home/scenes` (the scroll-driven section).

**Structured data** — `BusinessSchema` emits `LocalBusiness` JSON-LD once in
the root layout; `Breadcrumbs` emits `BreadcrumbList` on every nested page.

Five components are client-side: `GalleryBrowser`, `EnquiryForm`, `CountUp`,
`ScrollRig` and `MobileTabBar`. Every one of them server-renders its finished,
unfiltered state, so **no page content depends on JavaScript to become
visible**. `MobileTabBar` uses the client only to read the current path and
mark the active tab; the links themselves are in the served HTML of every
page. There is no longer any part of the site that renders content only after
a tap — the header dropdown that used to be the one exception is gone.

### The mobile shell

Below `lg` the site is laid out like an application.

- **`MobileTabBar`** is fixed to the bottom: Home · Work · **Call** · About ·
  Contact, with Call in brand red in the centre. It replaced a hamburger menu
  and a separate Call/WhatsApp bar. WhatsApp moved into the header, opposite
  the wordmark, so both ways of getting in touch stay one tap away in two
  different corners.
- **`/gallery` docks its division selector** just above the tab bar and slides
  it sideways, and lays the projects out as a horizontal snap rail of cards
  rather than a grid. The cards are rendered **once** and re-laid-out by CSS —
  a rail below `lg`, a three-column grid above it — so there is exactly one
  set of project links in the markup.
- `--tabbar-h` and `--dock-h` in `globals.css` are the heights of that fixed
  chrome. Anything that has to clear it pads by those variables rather than
  guessing; `.footer-base` does, and picks up the extra dock allowance through
  `body:has(.gallery-dock)`.

---

## The SEO contract

Non-negotiable, because ranking is the point of the site.

1. **Nothing starts hidden.** No content is `display:none`, `opacity:0` or
   filtered out on first paint. The gallery filter defaults to "all"; the
   scroll section renders all four steps at full opacity; FAQ answers sit in
   the HTML whether the accordion is open or shut.
2. **Real text in the markup.** No text baked into images — there are no
   images. Headings, copy, town names and finish names are all live text.
3. **Zero CLS.** All geometry lives in base CSS; JavaScript only ever writes
   custom properties. Measured 0.000 on every page.
4. **One `h1` per page**, no skipped heading levels.
5. **Canonicals, sitemap, robots and JSON-LD** all build off `siteUrl` in
   `src/lib/site-url.ts` (`NEXT_PUBLIC_SITE_URL`, falling back to a
   hard-coded origin).

---

## Enquiry form

`/contact` posts to `src/app/api/enquiry/route.ts`, which sends one email per
enquiry through **Brevo** (free plan, 300/day) to the business Gmail. It was
Telegram until 6 Sep 2026; the client chose email.

The API key must never reach the browser — calling Brevo directly from the
form would put it in the page source and let anyone send 300 emails a day as
us. That is the entire reason this endpoint exists; it is the only server-side
code on the site.

Configure via `.env.local` (see `.env.example` for the steps):

```
BREVO_API_KEY=
ENQUIRY_FROM=      # a sender verified in Brevo
ENQUIRY_TO=        # the business Gmail
NEXT_PUBLIC_SITE_URL=
```

With any of the three missing the endpoint returns 503 and the form says
"not connected yet" and points at the phone. It never shows a thank-you for a
message that went nowhere. Wired and tested 6 Sep 2026 on the developer's
Brevo account; the sender moves to the real domain at deployment.

Call and WhatsApp are the primary actions and work with no JavaScript.

---

## Design

Tokens live in the `@theme` block at the top of `src/app/globals.css`. The
palette comes from the business card: vermillion red on warm off-white with
near-black text. Red is an **accent** — one element per view, not a theme.

```
--color-brand      #d93a28   fills, buttons, large type
--color-brand-ink  #cf3624   small text on light grounds
--color-brand-lift #f2705a   small text on dark grounds
--color-ink        #141414
--color-ink-3      #6b665f
--color-ground     #faf9f7
--color-slate      #1c1b1a
```

The two extra reds exist because the card red measures 4.35:1 on the ground
and 3.63:1 on the slate — both below AA for 11px caps. Everything on the site
now measures at or above 4.5:1.

Since there are no photographs, depth comes from weightless layers: an inline
noise tile (`.grain`), a masked technical grid (`.setout`), radial washes
(`.wash-brand` / `.wash-dark`) and SVG line-art backdrops. Zero image requests.

Motion is restrained by the client's choice, and every piece of it is either a
hover state, a toggle the reader asked for, or decoration written on top of a
value that is already correct in the HTML.

---

## Where it stands (21 Sep 2026)

Design approved. Sanity and the Brevo enquiry form are built, tested and
pushed (last commit `5828ea6`, 13 Sep 2026, which also removed the ended KDM
distributorship — the division is now "PVC Profile"). **Deployment started
2 Oct 2026; the site is live at https://aadienterprise.in since 3 Oct.** The
full plan, revised on 2 Oct 2026, is in `CLAUDE.md` under *Deployment plan*;
the short version:

1. Cloudflare account (Divy's email), then Workers via the OpenNext adapter,
   on workers.dev first.
2. Sanity webhook → the Worker's Deploy Hook, before any content goes in.
3. Real content in the Studio — every project and testimonial is still a
   placeholder.
4. `aadienterprise.in` bought on Nilesh's account, nameservers to Cloudflare,
   domain attached. **Done 3 Oct 2026** (Hostinger, 2 years, auto-renew off
   until Nilesh adds his own payment method; www → apex redirect rule).
5. Site URL switched to `.in`, workers.dev turned off. **Done 3 Oct 2026.**
6. Brevo authenticated on the domain; sender `enquiry@aadienterprise.in`.
   **Done 3 Oct 2026**, test enquiry landed in the inbox.
7. Hand over to Nilesh; the SEO pass in code during his week of fixing the
   project details. **Code side done 3 Oct 2026**: Nilesh is invited as
   Editor, and the SEO pass and the Lighthouse/Googlebot audit are live.
8. After that week: Google Business Profile, then Search Console.

**The code is finished.** What remains is client-side: Hostinger auto-renew,
Nilesh's week in the Studio, the Business Profile (its link goes into Site
settings), Search Console with the TXT record in Cloudflare and the sitemap,
Bing import, then listings and reviews. The full checklist with owners is
in `CLAUDE.md` under *Where it stands (3 Oct 2026)*.

## Picking this up on another machine

Nothing sensitive is in the repo, so a clone plus one env file is enough.

```bash
git clone https://github.com/Divy-04/Project-A.git aadi   # push as Divy-04 only
cd aadi
npm install
cp .env.example .env.local        # fill BREVO_API_KEY, ENQUIRY_FROM, ENQUIRY_TO
npm run dev                        # http://localhost:3000
npm run build                      # every route must still say ○ (Static)
```

- The Brevo values are not in git. Copy them from the old laptop's
  `.env.local`, or regenerate the key in Brevo (Account → SMTP & API). Without
  them everything works except the form, which says "not connected yet".
- **No Sanity token is needed** to develop or build — the dataset is public.
  Only `npm run studio:deploy` and `npm run seed` need one, and both tokens
  ever created have been deleted; make a fresh Developer token at
  sanity.io/manage → API → Tokens for that job and delete it after.
- The Studio has its own dependencies: `cd studio && npm install` before
  `npm run studio` from the root.
- Lint with `npx eslint src --ext .ts,.tsx` — `next lint` no longer exists.
- Review on a 1536×766 viewport for desktop checks; that is what the client
  has been shown on.

## Before launch

Nothing here may be skipped. The same list, with owners, is in `CLAUDE.md`
under *Before it can go live*.

- [ ] `BREVO_API_KEY`, `ENQUIRY_FROM`, `ENQUIRY_TO` set on the Worker; send a
      real test enquiry and confirm it arrives in the business Gmail
- [x] `NEXT_PUBLIC_SITE_URL` set to `https://aadienterprise.in`; the code
      fallback in `src/lib/site-url.ts` and `.env.example` switched from `.com`
- [ ] Every `specs` value on the three Division documents confirmed by Nilesh —
      they are drafts, and a wrong section size in print is worse than none
- [ ] All `TBC` values in Site settings confirmed
- [ ] About page milestone years confirmed — they are inferred, not recorded
- [ ] Real testimonials replacing the placeholders
- [ ] Maps link in Site settings pointed at the Google Business Profile listing
- [ ] Real photographs
- [ ] Sanity webhook pointed at the Worker's Deploy Hook and a test publish
      seen to rebuild
- [ ] Nilesh invited to Sanity as Editor and shown the Studio once

## Decisions

- **Domain: `aadienterprise.in`** (6 Sep). Bought 3 Oct 2026 by Divy at
  Hostinger on Nilesh's account, registrant in Nilesh's name, expiring around
  3 Oct 2028. Cloudflare Registrar
  does not sell `.in`, so an Indian registrar with nameservers moved to
  Cloudflare.
- **Hosting: Cloudflare Workers** via `@opennextjs/cloudflare` (6 Sep; order
  revised 2 Oct). The Pages adapter is frozen without Next 16 support. Account
  on Divy's email; GitHub connection stays Divy-04. Free tier verified 13 Sep
  — figures in `CLAUDE.md`.
- **Enquiries: email via Brevo**, not Telegram (6 Sep).
- **First-load JS is ~173 KB gzipped**, of which ~150 KB is the React 19 and
  App Router runtime. Next was chosen for an embedded Sanity Studio; that
  reason evaporated once Sanity started hosting the Studio itself. Not
  re-opened; switching would mean rebuilding what exists.
