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
| PVC — KDM Profile | `pvc-kdm-profile` |
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
| `/gallery/[slug]` | SSG × 9 | `generateStaticParams` from `projects.ts` |
| `/services/[slug]` | SSG × 3 | `generateStaticParams` from `services.ts` |
| `/about` | Static | `src/app/about/page.tsx` |
| `/contact` | Static | `src/app/contact/page.tsx` |
| `/sitemap.xml` | Static | `src/app/sitemap.ts` |
| `/robots.txt` | Static | `src/app/robots.ts` |
| `/api/enquiry` | Dynamic | Telegram relay — see below |

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

All content is hard-coded in `src/data/`, shaped deliberately to mirror the
future Sanity documents one-for-one, so wiring the CMS is a swap rather than a
rewrite.

| File | Mirrors | Holds |
| --- | --- | --- |
| `site.ts` | `siteSettings` singleton | NAP, hours, service areas, credential, URL |
| `services.ts` | `service` × 3 | Copy, scope, finish swatches, specs, FAQs |
| `projects.ts` | `project` × 9 | Title, division, town, date, summary, photo count |
| `story.ts` | `aboutPage` singleton | Owner narrative, milestones, principles |
| `testimonials.ts` | `testimonial` × 3 | Placeholder quotes |
| `nav.ts` | — | Primary navigation: href, full label, tab caption, icon key |

`projects.ts` holds **three per division on purpose.** The reference photos the
client supplied skewed heavily to furniture, and an unbalanced gallery is the
most visible way that tilt gets back into the site.

Values marked `TBC` in `site.ts` and `services.ts` are drafts awaiting the
client's confirmation. See *Before launch* below.

---

## Components

32 components in `src/components/`, with `home/` holding the homepage sections.

**Layout** — `Header`, `Footer`, `MobileTabBar`, `PageHeader`,
`SectionHead`, `Breadcrumbs`, `Button`, `Wordmark`, `icons`.

**Content** — `ProjectCard`, `ProjectIndex`, `GalleryBrowser`, `Swatches`,
`SpecList`, `Faqs`, `EnquiryForm`, `CtaBand`, `Placeholder`, `FooterMap`.

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
5. **Canonicals, sitemap, robots and JSON-LD** all build off `site.url`.

---

## Enquiry form

`/contact` posts to `src/app/api/enquiry/route.ts`, which relays to Telegram.

The bot token must never reach the browser — calling `api.telegram.org`
directly from the form would put it in the page source and let anyone take the
bot over. That is the entire reason this endpoint exists.

Configure via `.env.local` (see `.env.example`):

```
TELEGRAM_BOT_TOKEN=
TELEGRAM_CHAT_ID=
NEXT_PUBLIC_SITE_URL=
```

With either Telegram value missing the endpoint returns 503 and the form says
"not connected yet" and points at the phone. **That is the expected state
right now** — the bot is scheduled for the Sanity pass. It never shows a
thank-you for a message that went nowhere.

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

## Before launch

Nothing here is urgent — deployment is the last phase — but none of it may be
skipped.

- [ ] `TELEGRAM_BOT_TOKEN` + `TELEGRAM_CHAT_ID` set on the host; send a real
      test enquiry and confirm it arrives
- [ ] `NEXT_PUBLIC_SITE_URL` set to the real domain
- [ ] Every `specs` value in `services.ts` confirmed by Nilesh — they are
      drafts, and a wrong section size in print is worse than none
- [ ] All `TBC` values in `site.ts` confirmed
- [ ] `story.ts` milestone years confirmed — they are inferred, not recorded
- [ ] Real testimonials replacing the placeholders
- [ ] `mapsUrl` pointed at the Google Business Profile listing
- [ ] Real photographs

## Open decisions

- **Domain.** `site.url` is a guess.
- **Hosting.** Vercel Hobby's terms exclude commercial use, so it is
  Cloudflare Pages, Netlify or Vercel Pro. The site has one server function,
  so a pure static-file host is out.
- **First-load JS is ~173 KB gzipped**, of which ~150 KB is the React 19 and
  App Router runtime. Next was chosen for an embedded Sanity Studio; that
  reason evaporated once Sanity started hosting the Studio itself.
