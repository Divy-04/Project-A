# AADI ENTERPRISE — Sanity Studio

The editing app for the site. Hosted by Sanity at
**https://aadi-enterprise.sanity.studio** — it is not part of the Next build
and the site never bundles it.

- Project `hhvsb0rp`, dataset `production` (public — the site reads it
  anonymously at build time).
- Schema in `schemaTypes/`. Three lists (project, division, testimonial),
  three single documents (homePage, aboutPage, siteSettings), and `photo` —
  the image type every photograph field uses, with required alt text and a
  1200px minimum on the long side.
- `structure.ts` pins the three single documents below the lists; the config
  hides them from "create new" and strips delete/duplicate from them.

## Commands

Run from this folder, or from the repo root via `npm run studio`,
`npm run studio:deploy` and `npm run seed`.

```
npm run dev       # Studio on http://localhost:3333 with the Vision GROQ console
npm run deploy    # build and publish to aadi-enterprise.sanity.studio
npm run seed      # load the placeholder content (refuses if the dataset has any)
```

`deploy` and `seed` need a Developer-role token in `SANITY_AUTH_TOKEN`
(see `.env.example` at the root). The seed is idempotent on document ids;
`npm run seed -- --force` replaces everything, which after handover means
overwriting the owner's edits — so it asks you to mean it.

## After a schema change

Deploy the Studio. Then rebuild the site if the change touched a field the
GROQ projections in `src/sanity/queries.ts` read — a renamed field has to be
renamed in the schema, the projection and `src/sanity/types.ts`.
