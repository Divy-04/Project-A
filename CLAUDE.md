@AGENTS.md

# AADI ENTERPRISE — showcase site

Marketing site for a fabrication business in Himatnagar, Sabarkantha, Gujarat.
Owner: Nilesh Patel. Three divisions, **equal weight** — Aluminium & Glass,
PVC / KDM Profile, and Furniture. The reference photos the client sent skew
furniture only because that's what he happened to have on hand; never let the
site tilt that way.

Primary job of this site is to **be found**. It has to rank locally for
Himatnagar and the towns around it. A friend of the client handles SEO
separately, so our obligation is to hand over something structurally
SEO-clean: static HTML, real copy in the markup, fast, no CLS.

## Agreed sequence

1. **Design first** — build it, client reviews, client approves.
2. Then Sanity (schema, Studio, webhook) **and the Telegram credentials for
   the enquiry form** — the client asked for both in the same pass.
3. Then deployment.

Within step 1: homepage first, and the client approves it before the other
three pages get built. Do not start Sanity or deployment work early.

**Where it stands (6 Sep 2026):** step 1 approved; step 2 built — the Studio
is deployed and the site reads Sanity (see **Sanity** below). The enquiry form
emails via Brevo — decided 6 Sep in place of Telegram, wired and tested. Step 3
not started.

**Next:** an SEO pass on 7 Sep 2026 (see **SEO pass** below), then deployment
to Cloudflare under **aadienterprise.in** — domain decided, not yet bought.

Because deployment comes last, the enquiry form being unconfigured during
step 1 costs nothing: the site is not public, so there is no real enquiry to
lose. It must be wired in step 2 regardless — it cannot ship disconnected.

## Status

**Built — every page statically prerendered, nothing 404s:**

| Route | Notes |
| --- | --- |
| `/` | Hero · TrustStrip · Services · FeaturedWork · HowItWorks · ServiceArea · Testimonials · CtaBand |
| `/gallery` | Editorial masthead, sticky division selector, grid/list toggle |
| `/gallery/[slug]` | 9 project pages, `generateStaticParams` |
| `/services/[slug]` | 3 division pages — these carry the commercial search terms |
| `/about` | Owner block, record strip, divisions, four commitments, service area |
| `/contact` | Call/WhatsApp/email, NAP, map facade, per-division WhatsApp links, FAQ |
| `/sitemap.xml`, `/robots.txt` | Generated from the same data the pages use |

Plus `ƒ /api/enquiry` — the only non-static route, see **Enquiry form** below.

Nav order is **Home · Our Work · About · Contact**. It lives in
`src/data/nav.ts` — the header, the footer's Pages column and the mobile tab
bar all map over the same array, and it carries Home itself, so don't prepend
a second one. `label` is the full name, `short` is the tab-bar caption (a
fifth of a phone screen: "Our Work" becomes "Work"), `icon` is a key the tab
bar resolves to a component so the data file never imports JSX. It used to
live in `Header.tsx`; the tab bar is a client component, so importing it from
there would have pulled the whole header into the client bundle.

Header/Footer/MobileTabBar are global. `LocalBusiness` JSON-LD
(`BusinessSchema.tsx`) is emitted once in the root layout; `BreadcrumbList`
JSON-LD rides along with `Breadcrumbs.tsx` on every nested page.

Shared building blocks: `PageHeader`, `Breadcrumbs`, `ProjectCard`,
`ProjectIndex`, `GalleryBrowser`, `Swatches`, `SpecList`, `Faqs`, `Marquee`,
`CountUp`, `EnquiryForm`, `Backdrop`, `CtaBand` (moved out of `home/` — every
page uses it), `SectionHead`, `Placeholder`, `Photo` (a Sanity image, or the
`Placeholder` in the same footprint), `Button`, `FooterMap` (takes
`tone="dark" | "light"` and a `ratio`), `MobileTabBar`.

`ProjectCard` has two variants. `plain` (the default) is the editorial one —
image slot, caption beneath, no frame — used by the homepage and the service
pages. `card` is a bordered surface carrying the photograph, title, town, month
and a two-line clamp of what was involved; the gallery uses it. The split
exists because a card on a rail floats on its own and needs an edge and enough
detail to be worth stopping on, whereas one sitting inside a composed page
does not.

## Pages must survive without photographs

The first cut of the division pages was a photo slot, a six-item list and
about five sentences — the client's words were "image image image, and looks
empty other than image". He was right, and it mattered more than it looked:
a page with nothing to read has nothing to rank.

The fix was content that does not depend on photography ever arriving, and it
lives on each **Division** document in Sanity (seeded from the old
`services.ts`):

- **`finishGroups`** — named colour swatches, rendered as CSS boxes by
  `Swatches.tsx`. The single most useful thing on the page: someone choosing a
  shutter colour genuinely wants it, and it costs nothing to ship.
- **`specs`** — "what the quote covers". Every value is a **plausible draft
  and TBC**; Nilesh has to confirm them. A wrong section size or lead time in
  print is worse than none.
- **`faqs`** — division-specific, rendered by `Faqs.tsx`.
- **`intro`** — a real lead paragraph; `blurb` stays the card-sized version.

That took the division pages from roughly 150 words to 500+. Keep new pages
to the same standard: if stripping the image slots leaves nothing, the page
is not finished.

## Page design language

The client's verdict on the first cut was "simple and very basic". The answer
is being applied page by page, About first. Three patterns, chosen because
they are layout rather than motion and so cost nothing at runtime:

- **Editorial masthead.** `.display` in globals.css — `clamp()` type that
  scales continuously with the viewport instead of stepping at breakpoints,
  with one phrase in brand red. Replaces `PageHeader` where a page deserves a
  masthead; `PageHeader` still serves the rest.
- **Bento grid.** `.bento` cell class plus an asymmetric CSS grid. This is
  what fixes "empty other than image": the owner portrait becomes one cell
  among six rather than a large lonely rectangle waiting on a photograph.
  At `lg` the portrait cell spans the three rows beside it and the slot
  fills that height instead of carrying its own aspect ratio (`Placeholder
  fill`), so the photograph can never outgrow the block and the whole grid
  fits one laptop screen. The first cut gave it a fixed 4:5 slot two columns
  wide; at a 1536px viewport that ran past 900px and stretched the stat cards
  to match — flagged during review. Below `lg` there is no row to borrow
  from, so the slot goes back to 4:5.
- **Sticky chapters.** `lg:sticky lg:top-28` on the left column so a section
  heading holds while its narrative scrolls past. Pure CSS.

Plus one **dark band** (`bg-slate`) per long page to break the rhythm — the
statement on About. Use it sparingly; two dark bands on one page reads as a
different site.

**Columns of unequal length are held by alignment, not by rules.** The footer
was ruled with `gap-px` hairlines for one round and the client rejected it —
"why are there grid lines between the contents". What actually carries a row
of columns is: every column starting at the same top edge, every heading the
same `eyebrow` on the same baseline, and the same `mt-5` under each one. Get
those three right and no borders are needed.

The corollary is to control length at the source. Nine towns stacked one per
line would run far deeper than a three-item link column beside it, so the
footer's service-area list is wrapped inline instead. Borders would have
concealed that unevenness; without them it has to actually not exist.

`gap-px` over a lit background is still the right tool where cells are
genuinely tabular — TrustStrip, the About record strip — just not for a
footer.

Applied so far: `/about`, `/gallery`. Still on the first cut: `/`,
`/contact`, `/services/[slug]` — though all three now carry the app-style
mobile shell, which is a separate axis from the page treatments above.

## The mobile shell is an application, not a page

Asked for directly by the client: on a phone the site should behave like an
app, with the navigation at the bottom where a thumb reaches.

`MobileTabBar.tsx` replaced two separate things — a hamburger in the header
that opened a dropdown (`MobileNav`), and a sticky Call/WhatsApp bar
(`MobileActionBar`). Both are deleted. Two navigation mechanisms on one screen
was one too many, and the header sheet was the only part of the site that
rendered content only after a tap; every destination is now a permanent tab
sitting in the served HTML of every page.

- **Five slots: Home · Work · Call · About · Contact.** Call keeps the centre
  in brand red. For a trade business it is the highest-converting element on
  the site and it must not lose its place to navigation.
- **WhatsApp moved up to the header**, `lg:hidden`, opposite the wordmark.
  Both ways of getting in touch stay one tap away, in two different corners,
  and the bottom edge is left free for the gallery's division dock.
- **The bar is flat — no raised centre FAB.** A floating action button pokes
  ~14px above the bar, and on `/gallery` the division rail docks directly on
  top of this and would collide with it.
- Active state is a `brand-tint` pill behind the icon plus `aria-current`,
  derived from `usePathname`. `/` matches only itself; every other tab owns
  its child routes, so `/gallery/<slug>` still lights up Work.
- Both bars are **opaque**, not `/95` glass. Translucent chrome over the red
  `CtaBand` tinted pink, which read as a rendering fault rather than a choice.

Above `lg` none of this renders and the header is the whole navigation, so the
desktop header now shows its phone CTA at `lg:` rather than `sm:`.

### Clearing the fixed chrome

`--tabbar-h` in `globals.css` is the bar's real height including the
home-indicator inset, declared once so anything that has to clear it can just
say so. `.footer-base` pads by it, and by `--dock-h` as well on the one page
that docks a second bar, selected with `body:has(.gallery-dock)`. Where
`:has()` is unsupported the footer keeps the plain allowance — a few pixels
off one page rather than a broken layout everywhere.

**Do not put a `py-*` utility on `.footer-base`.** Tailwind's utilities layer
outranks the components layer, so `py-6` silently beat the rule and buried the
copyright line under the tab bar. It is `pt-6` plus the class, and the class
owns the bottom.

## Filtering without hiding content

`GalleryBrowser.tsx` is a client component, which the gallery deliberately
avoided at first. The rule that makes it safe: **state defaults to unfiltered,
so the server renders every project and nothing is hidden on first paint.**
Filtering only ever removes items in response to a click. Verified — all nine
projects are in the served HTML.

Divisions come from Sanity (`getDivisions`) rather than being hard-coded, so a
fourth division needs no edit here. A CSS-only `:checked` filter was
considered and rejected for exactly that reason: it would have pinned the
division slugs into a stylesheet.

The browser renders in two shapes off one piece of state:

- Below `lg` the division chips dock above the tab bar (`.gallery-dock`) and
  slide sideways, and the projects become a horizontal rail of `card`-variant
  cards you swipe. Both controls end up in the same thumb arc, which is the
  whole reason for moving them down there.
- At `lg` and up the chips go back to a bar that sticks under the header and
  the same cards lay out as a three-column grid with the list toggle.

**The cards are rendered once and re-laid-out by CSS** — the container is a
snap rail on a phone and `lg:grid` on a desktop. Rendering a rail for phones
and a separate grid for desktop would have put nine duplicate project links in
the markup, which is exactly the thing a site built to be crawled should not
do. Verified: nine cards, nine links, none hidden.

Selecting a division **resets the rail to the start and scrolls the tapped
chip into view**. Without the reset you tap a division while three cards deep
in "All work" and land mid-set with a half-card clipped off the left edge,
which reads as the filter having done nothing.

`.rail` carries the scroll-snap plumbing for both. It bleeds through the page
gutter with a negative margin so a half-scrolled card is not clipped by it,
and puts that gutter back as `scroll-padding-inline` so the first item still
snaps flush with the copy above rather than hard against the screen edge.

Chip rows scroll horizontally rather than wrapping on a phone — a wrapping
filter bar changes height as you switch, which shifts what is underneath it.
The desktop bar wraps freely because there is room for all four.

## Graphics without photographs

There is not one image file in this repo and there will not be until the
client supplies photographs — `public/` is empty and `next/image` has never
been imported. Full-bleed hero photography and parallax backgrounds are the
only things that genuinely have to wait for that. Everything else is done
with weightless layers:

- `.grain` — one 160px `feTurbulence` tile inlined as a data URI, no request.
  `.grain-light` drops it to 3% for light grounds.
- `.setout` / `.setout-dark` — a 72px technical grid, radially masked to the
  top right. **The mask is tight on purpose**: at a wider extent the grid ran
  behind the body copy, which is both ugly and the one place decoration must
  never be.
- `.wash-brand` / `.wash-dark` — a single radial `background-image` layer on
  the section itself, so there is no stacking to manage.
- `Backdrop.tsx` — `ElevationBackdrop` (a partition), `KitchenBackdrop` (a
  kitchen run) and `MarkWatermark`, all in the same hand as the scroll-section
  scenes, all tinted from `currentColor` by the parent.

Rules that came out of building it:

- **Size backdrops by width, not height.** Scaled to fill a band's height they
  crop to a stray mullion and a door swing, which reads as an artefact rather
  than a drawing.
- Every backdrop is `aria-hidden`, `absolute` and `pointer-events-none`, and
  the content next to it needs `relative z-10`. Decoration nested inside an
  `<a>` is fine without `pointer-events-none` — clicks bubble to the link.
- `MarkWatermark` is redrawn rather than reusing `Mark`: stroke width scales
  with the viewBox, so `Mark`'s 2 units on a 24-unit box comes out ~50px thick
  at watermark size.

## Small text in the brand red

The business-card red is **4.35:1 on the ground and 3.63:1 on the slate** —
both under AA for the 11px `.eyebrow` caps, so every label on the site was
failing. Two tokens fix it without touching the card colour anywhere it is
used as a fill, a button or large type:

- `--color-brand-ink` `#cf3624` — small text on light grounds (4.74:1)
- `--color-brand-lift` `#f2705a` — small text on dark grounds (5.9:1)

Use those for anything under ~19px. `text-brand` stays correct for icons
(3:1 suffices for non-text), fills and headings. Note 18px bold is *not* WCAG
large text — the threshold is 18.66px bold — so `text-lg` in red needs the
token too.

## Motion

Restrained by the client's choice. The rule inherited from the scroll-reveal
that had to be removed: **no element starts hidden.** Everything is a hover
state, a toggle the reader asked for, or decoration written on top of a value
that is already correct in the HTML.

- `Marquee` — CSS keyframe on a duplicated track, no JS. Pauses on hover,
  stops dead under `prefers-reduced-motion`.
- `Faqs` — native `<details>`; the answers are in the HTML whether open or
  closed, so crawlers read all of them. Height animates via
  `interpolate-size`, wrapped in `@supports` so unsupported browsers snap open
  rather than break.
- `CountUp` — the real number is server-rendered; the effect only writes to
  the DOM node afterwards. No JS, failed hydration or reduced motion all still
  show the right figure.
- `ProjectIndex` — rows tint and the title steps right on hover.
- `.link-wipe` — underline that wipes in from the left.
- `.rail-item` — the one scroll-driven effect on the site. Cards ease from
  `scale(.93)` and **45% opacity** up to full as they slide onto the gallery
  rail, on an `animation-timeline: view(x)`. It keeps the rule the removed
  `.reveal` broke: the base state is already finished, the keyframes run only
  inside `@supports (animation-timeline: view(x))`, and even there the fill
  holds an off-screen card **dimmed, never hidden**. Scoped to `max-width:
  1023px` — at `lg` the container is a grid, not a scroller. Verified against
  a Googlebot render: nine cards, zero hidden, lowest opacity 0.45.

Every one of these is disabled or made static under `prefers-reduced-motion`.

## Enquiry form

`/contact` posts to `src/app/api/enquiry/route.ts`, which sends one email per
enquiry through **Brevo** (free plan, 300/day). It was Telegram until 6 Sep
2026; the client chose email instead. Only the route changed — the form does
not know which provider is behind it.

**The API key must never reach the browser.** Calling Brevo straight from the
form would put the key in the page source, and anyone reading it could send
300 emails a day as us. That is the entire reason this route exists — it is
the only server-side code on the site.

Configure via `.env.local` (see `.env.example`; `.env*` is gitignored):
`BREVO_API_KEY`, `ENQUIRY_FROM` (a sender verified in Brevo) and `ENQUIRY_TO`
(the business Gmail). With any missing the endpoint returns 503 and the form
says "not connected yet" and points at the phone — it never shows a thank-you
for a message that went nowhere. Do not "fix" a 503 by hiding the form, faking
a success state, or stubbing the endpoint — the visible failure plus the phone
fallback is the point.

The Brevo account is the developer's (pdivy945@gmail.com), and the sender is
that address, because a verified sender needs a one-time code from the inbox
owner and the client was not to hand. Recipients need no verification, so
enquiries land in the business Gmail regardless. At deployment the sender
should move to the real domain (Brevo verifies a domain via DNS), which drops
the developer's address from the From line. The form collects no customer
email, so there is nothing to reply to — the owner rings the number. The
email is deliberately plain: read on a phone, the number is the one thing
that has to be tappable.

A honeypot field catches most bots. Call and WhatsApp remain the primary
actions and work with no JavaScript; the form is the third option.

**Sanity is wired** (step 2). Every page reads the dataset at build time and
the Studio is live at https://aadi-enterprise.sanity.studio — see **Sanity**.

**Not started:** the SEO pass (7 Sep), deployment (and with it the publish →
rebuild webhook), real photos, real testimonials.

## Sanity

Project `hhvsb0rp`, dataset `production`, **public**. The site reads published
content anonymously at build time — there is no Sanity credential anywhere in
the Next app or on the host, and there must not be. The Studio is its own
package in `studio/` (Sanity v6, hosted at aadi-enterprise.sanity.studio, not
embedded), so the site bundle carries no editor.

Site-side code:

- `src/sanity/client.ts` — one client. `useCdn: false` because a publish
  triggers a rebuild within seconds and the CDN can lag it; `perspective:
  "published"` so drafts never leak.
- `src/sanity/queries.ts` — every GROQ projection. `types.ts` — the shapes
  they return. `loaders.ts` — `getSettings`, `getDivisions`, `getProjects`,
  `getHomePage`, `getAboutPage`, `getTestimonials`, wrapped in React `cache()`
  so a page's components each ask without re-querying. A missing singleton
  throws with the fix in the message: the build fails rather than shipping a
  blank footer.
- `src/lib/links.ts` (`telLink`, `waLink`, `mapsUrl` derived from settings),
  `src/lib/site-url.ts` (the origin — infrastructure, so env not CMS),
  `src/lib/format.ts`.
- Server components call the loaders directly. The client components that
  need settings — `Header`, `MobileTabBar`, `EnquiryForm` — get only the
  fields they use, as props from the layout or page.

Content model — three lists, three single documents, one shared image type:

- `project` — title, slug, division (reference), location, completedOn (a
  date; shown as month + year), summary, `images[]`. The first image is the
  lead. Every published project is a page, a card, and a candidate for the
  homepage strip.
- `division` — the three services: title, short, slug, order, blurb, intro,
  items, image, tone (placeholder tint), `finishGroups` (swatches use
  `@sanity/color-input`; GROQ reads `color.hex`), `specs`, `faqs`.
- `testimonial` — quote, name, town, work, order.
- `homePage` — three hero slots, before/after for the slider, the
  where-we-work photo, and **`featuredProjects`**: references the owner picks
  and orders, max six. Empty → the six newest. Nothing is uploaded twice.
- `aboutPage` — owner portrait, `ownerStory[]`, statement, milestones,
  principles.
- `siteSettings` — name, owner, phone, WhatsApp, email, address, hours,
  establishedYear, projectsCompleted, credential, serviceAreas, optional
  `mapsUrl`.
- `photo` — the image type every photograph field uses: hotspot on, **alt
  text required**, and an async rule that rejects anything under 1200px on
  the long side, quoting the dimensions.

Singletons are pinned in `studio/structure.ts`, hidden from "create new" via
`schema.templates`, and stripped of delete/duplicate via `document.actions`.

**Photographs render as a plain `<img>` with a `srcset`, not `next/image`.**
`Photo.tsx` takes a `SiteImage` or renders the `Placeholder` in the same
footprint, so a photo arriving from the Studio changes no geometry.
`src/sanity/image.ts` builds the URLs: widths 320–2000 capped at the original
(never upscale), `auto=format`, quality 78, and with a `ratio` the CDN crops
to it honouring the editor's hotspot. Width and height attributes reserve the
box; the asset's LQIP paints underneath while it loads. Why not `next/image`:
the CDN already resizes, a custom `loader` cannot be passed from a server
component, and a plain `<img>` keeps photographs working on a host with no
image service. `ComparisonSlider` is the exception — it keeps `next/image`
for the local PNG fallbacks and sets `unoptimized` for CDN URLs.

**Words stay in code.** Section headings, hero copy, the FAQ on /contact, the
process illustrations and the logo were written for the layout. The Studio
owns the facts (settings), the growing content (projects, testimonials) and
every photograph.

The old `src/data/*.ts` content files moved to `studio/seed/data/` and are now
only the seed's input. `studio/seed/seed.ts` writes 18 documents with
deterministic ids (`project-<slug>`, `division-<slug>`, the singleton names)
and **refuses to run against a non-empty dataset** — after handover it would
overwrite the owner's edits; `-- --force` is the deliberate override. The seed
keeps **three projects per division on purpose**: the reference photos skewed
furniture, and an unbalanced gallery is the most visible way that tilt gets
back in. Once Nilesh is adding projects, balance is his. `nav.ts` stays in
`src/data`: navigation is structure, not content.

Commands from the root: `npm run studio` (local Studio, with the Vision GROQ
console that is left out of the hosted build on purpose), `npm run
studio:deploy`, `npm run seed`. Deploy and seed need a Developer-role token in
`SANITY_AUTH_TOKEN`. The setup token was deleted on 6 Sep 2026 once the Studio
and seed were in place; a future deploy or forced re-seed needs a fresh
Developer-role token from sanity.io/manage → API → Tokens, used and then
deleted the same way. `sanity.cli.ts` pins `studioHost` and the `appId` so
deploys run unattended with `-y`.

**Rebuild on publish is wired at deployment, not before.** Sanity → Manage →
API → Webhooks: a POST on create/update/delete to the host's build hook URL
(Cloudflare Pages, Netlify and Vercel all issue one). Full rebuild, one to two
minutes; there is no on-demand revalidation route, so nothing depends on the
host supporting ISR. Until that webhook exists a publish changes nothing on
the live site.

A renamed field has to change in three places — the schema, the GROQ
projection and `types.ts` — because TypeScript cannot check a GROQ string.

## Stack

Next.js 16.3 App Router (Turbopack) · React 19.2 · TypeScript · Tailwind v4.
Every route is statically prerendered (`○ (Static)`) — keep it that way.

Sanity v6 Studio in `studio/` — its own `package.json`, excluded from the root
`tsconfig` and ESLint. The site itself depends only on `@sanity/client` and
`@sanity/image-url`. Note `@sanity/icons` v5 exports each icon from its own
subpath (`@sanity/icons/Cog`); a root import type-checks and then fails the
Studio build.

- `next lint` **does not exist** in Next 16. Use `npx eslint src --ext .ts,.tsx`.
- Font is Archivo via `next/font/google`, self-hosted, variable.
- No image files yet. `Placeholder.tsx` draws hatched slots where photos go.
  The client will supply high-quality photos later; the ones in his Pictures
  folder were reference for us, not for the site.

## Design language

Tokens live in the `@theme` block at the top of `src/app/globals.css`. Palette
is taken from the business card: vermillion red on warm off-white with
near-black text. Red is an **accent** — one element per view, not a theme.

- `--color-brand #d93a28` · `--color-ink #141414` · `--color-ground #faf9f7`
- `--color-ink-3` is `#6b665f`, darkened from the original to hold 4.5:1 at
  11px caps. Don't lighten it back.
- `.shell` is the page gutter + max width. `.eyebrow` is the small caps label.

Modern, minimalist, professional — and the design must not cost speed.

### Copy rules paid for once

- **Never `.toLowerCase()` a division title or category label.** They are
  proper nouns with real casing — "PVC — KDM Profile" comes out as
  "pvc — kdm profile", which shipped to three pages before it was caught.
  Write sentences that take the label as-is.
- The big-number strip treatment (`text-3xl font-extrabold`) is for numerals
  only. `/about` originally fed it place names and "Sabarkantha" pushed the
  page into horizontal scroll at 390px; it uses a label-over-value record
  block instead.

### No generic scroll-reveal

A `view()`-timeline `.reveal` was tried and **removed**: any element that never
registers an entry phase stays stuck at `opacity: 0`, which hides real content
from real users. Not a trade worth making on a site whose whole job is to be
found and read. There's a comment in globals.css recording this — don't
reintroduce it.

## "How it works" — the scroll-driven section

Files: `home/HowItWorks.tsx` (layout + copy), `home/scenes.tsx` (the four SVG
scenes), `ScrollRig.tsx` (the rig), and the HIW block in `globals.css`.

This section went through many rounds with the client. Where it landed:

- **No people.** Product only. Figures were tried repeatedly and rejected.
- **Small.** The drawing is a contained card beside the copy, not a
  full-bleed background. Do not make it full-screen again.
- **Kitchen example.** All four scenes are one modular-kitchen job, drawn on a
  shared set-out (`FLOOR`, `RUN_L`, `WALL_T` … in scenes.tsx). Scenes 01 and 04
  are the *same wall* with the same dimension under it — that registration is
  what makes it read as one job rather than four pictures.
- The four beats: tape pulls across and a readout **counts up to 2400** →
  **eight separate parts** land on the bench one at a time →
  **small blacked-out van, right to left** → unit seats into the gap, sealed,
  signed off.
- **Slow on purpose.** 125svh of scroll per step. The client explicitly asked
  for slower so nothing flies past.

### SEO contract — do not break

1. All four steps' headings and body copy sit in the HTML at full opacity, one
   per panel. They are moved out of view by a **transform on the strip** —
   never `display:none`, `visibility:hidden` or `opacity:0`. Googlebot renders
   without scrolling; a translated panel is still visible to it, a hidden one
   is not.
2. The illustrations are `aria-hidden` and carry nothing that isn't already in
   the step copy. That's what makes them safe to animate.
3. The pin, the strip and the spacer heights live in the **base** CSS rules,
   not in JS-added ones, so hydration changes no geometry and the section
   contributes zero CLS.
4. `prefers-reduced-motion` unwinds the strip into a plain vertical stack.

### How the rig works

`ScrollRig` renders nothing and publishes custom properties only:
`--pan` and `--gp` on the section, and **`--sp` per panel**.

Per-panel `--sp` is load-bearing. A single shared value has to reset 1 → 0 at
every step boundary, and damping across that discontinuity plays the incoming
scene **backwards** before it plays forwards — the reverse-flicker the client
reported. Each panel now derives progress from its own spacer, so it is
monotonic and damping can never run a scene in reverse. Don't collapse it back
to one value.

`--sp` defaults to **1** in the base CSS (`.hiw-panel`), not 0, so with no JS —
Googlebot, failed hydration, reduced motion — every scene renders finished
rather than frozen mid-flight. The rig starts writing real values 300px before
the section reaches the viewport, so that default is never seen.

CSS classes compose as **ramp + motion**: a ramp class (`.hiw-ra`…`.hiw-rd`,
`.hiw-d0`…`.hiw-d7`) sets `--t` on an element, and a motion class
(`.hiw-fromL`, `.hiw-back`, `.hiw-pop`, …) reads `var(--t, 1)`. Everything
resolves by ~0.66 of a step, before the camera starts panning at `HOLD`.

### Gotchas paid for once

- **A CSS `transform` overrides an SVG `transform` attribute on the same
  element.** Static placement and scrubbed motion must live on different
  elements — see the nested `<g>` pair in `SceneDeliver`.
- Transform and opacity only in scrubbed rules, so scenes stay on the
  compositor.
- Scene ids (`s1`…`s4`) must stay unique — all four scenes are in the DOM at
  once, and duplicate pattern/clipPath ids collide.

## Verifying changes to this section

Worth re-running after any edit here. Install `playwright-core` temporarily,
drive the cached chromium at `%LOCALAPPDATA%\ms-playwright\chromium-*`, then
uninstall and delete the scripts so the tree stays project files only.

Checks that matter: Googlebot view (render, never scroll — all four headings
must be `opacity: 1` and in the DOM), CLS ≈ 0, a monotonic scrub with **zero**
regressions, no overflow at 1440/1280/768/390/360, and reduced motion falling
back to a stack.

To screenshot a specific step, solve the rig's own formula rather than guessing
a scroll fraction — the pin's height offsets the mapping:

```
y = trackTop + pinHeight + i*stepHeight + within*stepHeight - 0.72*viewportHeight
```

## SEO pass — scheduled 7 Sep 2026

The site's job is to be found. The structural half is done: static HTML, real
copy, canonicals, sitemap, robots, LocalBusiness + BreadcrumbList JSON-LD, alt
text enforced in the Studio, no CLS, a page per project. This pass finishes the
on-page and technical half before the first push to Cloudflare. The SEO friend
does off-site; the job here is handing over a site that does not hold them back.

In code, in this order:

1. **Domain.** `siteUrl` fallback and `.env.example` → `https://aadienterprise.in`.
2. **Titles and descriptions** rewritten to the commercial search terms —
   "Aluminium Windows, Doors & Partitions in Himatnagar" rather than
   "Aluminium & Glass in Himatnagar". Draft a page-by-page table first and get
   Divy's approval so it does not clash with the friend's plan.
3. **Open Graph image.** There is none. A branded card (logo, three divisions)
   generated at build, until real photography replaces it.
4. **Structured data.** `openingHoursSpecification` and `geo` on the business
   record once hours and the pin are confirmed; a `Service` record on each
   division page; `FAQPage` on the division and contact questions; per-project
   `lastModified` in the sitemap from Sanity's `_updatedAt`.
5. **Image weight — the biggest item.** The eight PNGs in `public/images/process`
   are 1.6–1.9 MB each and the slider `priority`-preloads one below the fold.
   Compress to WebP (roughly a tenth), serve them plain — Cloudflare has no
   Next image optimiser, and the Sanity photographs already bypass it. Drop
   the `priority`.
6. **Completeness.** `lang="en-IN"`, web manifest and touch icons, and
   env-gated hooks for Search Console verification and Cloudflare Web
   Analytics so neither needs a code change later.
7. **Audit.** Lighthouse at 1536×766 and 390×844, a Googlebot render (every
   heading and all nine project links in the served HTML, nothing hidden),
   scores recorded here.

Not code — with owners:

- **Google Business Profile** (Nilesh): claim and verify at the Durga Complex
  address, categories, photos, hours, link to the site. Most of local ranking
  lives here. Its URL then goes into Site settings → Google Maps link.
- **Search Console** (Divy, once the domain is live): DNS verification at
  Cloudflare, submit the sitemap.
- **Citations** (SEO friend): JustDial, IndiaMART, Sulekha, Bing Places, with
  name, address and phone identical everywhere.
- **Content cadence** (Nilesh): a project a fortnight with the town in it.
- **Backlinks** (SEO friend): a KDM dealer listing pointing at the site first.

Not doing: town-by-town "doorway" pages. Thin pages per town are a penalty
risk, and the gallery already ties real towns to real jobs.

## Open — needs the client

In **Site settings** in the Studio (seeded from the old `site.ts`
placeholders), everything that was marked `TBC`:

- Real Google Maps pin for `mapsUrl` (ask him to drop a location and share the
  link). Once the Google Business Profile exists, point at the **listing**, not
  a plain map search — direction requests on GBP are a local ranking signal.
- WhatsApp number (currently assumed same as mobile), PIN code, opening hours,
  established year, projects-completed count, which towns he actually travels to.
- Real testimonials. Real photos.
- Still unanswered: which division earns most, residential vs commercial split,
  price positioning, whether ceiling/wall panelling is a regular service, and
  what "Mariya" on the business card refers to.

## Before it can go live

Deployment is step 3, so none of this is urgent yet — but nothing here may be
skipped when it is.

- [ ] `BREVO_API_KEY`, `ENQUIRY_FROM` and `ENQUIRY_TO` set on the host (steps
      in `.env.example`). Send a real test enquiry and confirm it arrives in
      the business Gmail; have Nilesh mark the first one "not spam". Consider
      regenerating the key first — the setup one was photographed.
- [ ] `NEXT_PUBLIC_SITE_URL` set to the real domain — canonicals, the sitemap,
      robots.txt and the LocalBusiness JSON-LD all build off it.
- [ ] Every `specs` value on the three **Division** documents confirmed by
      Nilesh. They are my drafts. Publishing a wrong section size or lead time
      is worse than publishing none.
- [ ] All `TBC` values in **Site settings** confirmed.
- [ ] **About page milestone years confirmed** (Studio → About page). The
      five dates are inferred from `establishedYear` and are invented. A wrong year
      on an About page is exactly the kind of thing a local customer notices.
      Nothing there is written as a quotation in Nilesh's mouth, and it should
      stay that way — the statement band is an unattributed principle on
      purpose.
- [ ] Real testimonials replacing the placeholder quotes.
- [ ] **Google Maps link** in Site settings pointed at the Google Business
      Profile listing.
- [ ] Sanity webhook (Manage → API → Webhooks) pointed at the host's build
      hook, then publish a test edit and watch the site rebuild.
- [x] The `setup` Developer token deleted in Manage → API → Tokens (6 Sep
      2026). Nothing live uses one.
- [ ] Nilesh invited to the Sanity project as **Editor** (Manage → Members),
      and shown the Studio once: Projects → + → fill → upload → Publish.

## Open — needs a decision

- **The real domain — decided 6 Sep: aadienterprise.in**, to be bought. Until
  the SEO pass switches it, `siteUrl` in `src/lib/site-url.ts` still falls back
  to the old `.com` guess. Canonical URLs, the sitemap, robots.txt and the
  LocalBusiness JSON-LD all build off it. Overridable at build time with
  `NEXT_PUBLIC_SITE_URL`, which is what the host will set.
- **Hosting — decided 6 Sep: Cloudflare.** Two things to know. The old
  Cloudflare Pages adapter for Next is frozen and does not support Next 16;
  the supported path is Cloudflare's OpenNext adapter, deploying to Workers
  with static assets — same free tier, same push-to-deploy, and it runs the
  one server function (`/api/enquiry`). And there is no Next image optimiser
  there, so the local PNGs must be pre-compressed and served plain (the SEO
  pass does this; the Sanity photographs already bypass it). Verify both
  against Cloudflare's current docs at deploy time — this area changes often.
- **First-load JS is 173 KB gzipped**, of which ~150 KB is the React 19 +
  App Router runtime. I told the client to expect under 100 KB earlier and that
  was wrong. Worth flagging: the original reason for choosing Next was an
  embedded Studio, and that reason evaporated once Sanity hosts the Studio
  separately — Astro would ship near-zero JS. The client has not been asked to
  decide, and switching now would mean rebuilding what exists.
- No team or shop photos will be supplied. **Owner photo slot only.**

## Footer map

As of Divy's 6 Sep 2026 frontend commit — the developer's own change, not the
client's — `FooterMap.tsx` is a lazy-loaded Google Maps **iframe** fed by
`mapsEmbedUrl(settings)`. The reasoning below is the
standing recommendation, not the current state.

`FooterMap.tsx` was a facade — inline SVG, no network request, no third party,
opens real Google Maps directions on tap. A live iframe would cost 500 KB+ of
tiles and third-party script on every page and set Google cookies. Keep it a
facade.
