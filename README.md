# AADI ENTERPRISE

Marketing site for a fabrication business in Himatnagar, Sabarkantha, Gujarat
— aluminium and glass, PVC profile, and made-to-measure furniture.

```bash
npm install
npm run dev     # http://localhost:3000
```

Next.js 16 (App Router) · React 19 · TypeScript · Tailwind v4. Every page is
statically prerendered.

## Documentation

| File | What it covers |
| --- | --- |
| [`SYSTEM.md`](SYSTEM.md) | The map — routes, data model, components, environment, what is outstanding |
| [`CLAUDE.md`](CLAUDE.md) | The reasoning — why things are built this way and what must not be broken |
| [`.env.example`](.env.example) | Environment variables, with setup steps |
| [`studio/README.md`](studio/README.md) | The Sanity Studio — schema, commands, deploying |

## Status (21 Sep 2026)

Design approved. Content is in Sanity (Studio at
https://aadi-enterprise.sanity.studio) and the enquiry form emails via Brevo.
**Deployment to Cloudflare Workers is the next step** and has not started —
see *Where it stands* and *Picking this up on another machine* in
`SYSTEM.md`, and *Deployment plan* in `CLAUDE.md`.

The enquiry form says "not connected yet" until `.env.local` carries the three
Brevo values from `.env.example`. Real photographs, real testimonials and the
client's TBC values are still outstanding.
