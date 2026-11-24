# Qodeax Website

The Qodeax agency website — a Next.js App Router site for a software engineering
agency, built with the QDMS design language.

## Stack

- Next.js 15 (App Router) + React 18 + TypeScript
- Tailwind CSS v4 with CSS-first design tokens (`app/globals.css`)
- Bricolage Grotesque headings + Outfit body via `next/font`
- Sanity for projects and blog content
- EmailJS for the contact form
- Lucide icons

## Pages

- `/` — agency homepage with services, QDMS product, process, work, FAQ, and contact
- `/products` — QDMS product page with capabilities and product previews
- `/projects` and `/projects/[slug]` — Sanity-backed project archive and detail pages
- `/blogs` and `/blogs/[slug]` — Sanity-backed blog archive and article pages
- `/privacy`, `/terms`, `/cookies` — legal pages

Removed routes (`/about`, `/services`, `/contact`, `/career`) redirect to the
relevant homepage sections or the homepage.

## Architecture

| Concern | Location |
| --- | --- |
| Design tokens, base styles, long-form typography | `app/globals.css` |
| Global UI primitives | `components/ui/` |
| Header, footer, container, section | `components/layout/` |
| Reusable page sections | `components/sections/` |
| Shared cards | `components/cards/` |
| QDMS product preview UI | `components/products/qdms/previews/` |
| Site data and copy | `data/` |
| Sanity queries and data access | `lib/content.ts` |
| Sanity client and portable text | `sanity/` |

## Development

```bash
npm install
npm run dev
```

Production checks:

```bash
npm run typecheck
npm run lint
npm run build
```

## Environment

Copy `.env.local.example` values into `.env.local` (or configure them in the
deployment environment):

- `NEXT_PUBLIC_SANITY_PROJECT_ID`
- `NEXT_PUBLIC_SANITY_DATASET`
- `NEXT_PUBLIC_SERVICE_ID`
- `NEXT_PUBLIC_TEMPLATE_ID`
- `NEXT_PUBLIC_USER_ID`
- `NEXT_PUBLIC_PHONE_NUMBER`
- `NEXT_PUBLIC_SITE_URL` (used for canonical URLs and the sitemap)

The contact form posts to EmailJS with the same fields and template variables as
before. Product previews are illustrative and use sample data.
