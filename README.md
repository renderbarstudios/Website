# Renderbar Studios — Website

Production marketing site for **Renderbar Studios**, a Jacksonville, FL media
production studio. FAA Part 107 drone documentation, event livestreaming, and
short-form video.

> **Motion. Story. Vision.**

Built with **Next.js 14 (App Router) · TypeScript · Tailwind CSS**, deployed on
**Vercel**. Lead forms post to **Zoho CRM** via direct, server-side REST calls.

---

## Stack

| Area      | Choice                                                |
| --------- | ----------------------------------------------------- |
| Framework | Next.js 14, App Router, React Server Components        |
| Language  | TypeScript                                            |
| Styling   | Tailwind CSS 3 + brand design tokens                  |
| Fonts     | Montserrat via `next/font/google` (self-hosted)       |
| Forms     | Client → Next.js API routes → Zoho CRM REST (direct)  |
| Blog      | MDX files in `content/blog/` (`next-mdx-remote`)      |
| Hosting   | Vercel (free tier), custom domain `renderbar.net`     |

---

## Local setup

```bash
npm install
cp .env.local.example .env.local   # fill in values (see "Zoho setup")
npm run dev                        # http://localhost:3000
```

Other scripts:

```bash
npm run build   # production build — must pass with no type errors
npm run start   # serve the production build locally
npm run lint    # eslint
```

The site **builds and runs without Zoho credentials** — forms only need them at
runtime to actually create leads.

---

## Project structure

```
app/
  layout.tsx            Root layout (Montserrat, metadata, nav/footer)
  page.tsx              Home — 5-slide hero carousel + flagships
  drone/                Drone documentation landing + lead form
  livestream/           Livestreaming landing + booking form
  services/             All services + pricing
  about/                Brand story, founders, credentials
  blog/                 Blog index + [slug] (MDX)
  contact/              Contact form
  api/
    contact/route.ts    → lib/leads → Zoho
    drone/route.ts      → lib/leads → Zoho
    livestream/route.ts → lib/leads → Zoho
  sitemap.ts            /sitemap.xml
  robots.ts             /robots.txt
  opengraph-image.tsx   Branded OG image (1200×630)
  icon.png              Favicon (brand lens mark)
components/             Navbar, Footer, HeroCarousel, forms, JSON-LD, …
content/blog/*.mdx      Blog posts (add a file + frontmatter to publish)
lib/
  site.ts               Single source of truth: NAP, services, packages
  zoho.ts               Server-only Zoho auth + token cache + createLead
  leads.ts              Thin form→Zoho wrappers (contact/drone/livestream)
  validation.ts         Input validation & sanitization
  rate-limit.ts         In-memory per-IP token bucket
  blog.ts               MDX loader (frontmatter via gray-matter)
public/brand/logo/      Brand logo set
public/images/          Photography
```

---

## Brand tokens

Defined in `tailwind.config.ts`:

| Token            | Hex       | Role                                  |
| ---------------- | --------- | ------------------------------------- |
| `signal-red`     | `#E01A1A` | Primary CTA, key headlines, emphasis  |
| `electric-blue`  | `#2B3A9E` | Links, secondary UI                   |
| `live-green`     | `#6CC520` | Success / "go" states only            |
| `studio-gray`    | `#555555` | Body text on light                    |
| `void-black`     | `#0A0A0A` | Primary dark background               |
| `dark-surface`   | `#141414` | Cards on dark                         |
| `mid-gray`       | `#888888` | Captions, metadata                    |
| `light-gray`     | `#E8E8E8` | Borders, dividers                     |
| `off-white`      | `#F5F4F2` | Light backgrounds / text on dark      |

Dark-first. Red is for action and large headlines only — never body copy
(white-on-red passes WCAG AA for large text only).

---

## Zoho setup (one-time)

The forms create **Leads** in Zoho CRM using a server-side OAuth refresh token.
Do this once and store the three secrets in `.env.local` and in Vercel.

1. **Self Client** — go to <https://api-console.zoho.com>, create a
   **Self Client** application. Note the **Client ID** and **Client Secret**.
2. **Grant token** — in the Self Client "Generate Code" tab, request scope
   `ZohoCRM.modules.ALL`, pick a duration (e.g. 10 minutes), and generate the
   grant code.
3. **Refresh token** — exchange the grant code for a refresh token (run within
   the duration window). Replace the placeholders:

   ```bash
   curl -X POST "https://accounts.zoho.com/oauth/v2/token" \
     -d "grant_type=authorization_code" \
     -d "client_id=YOUR_CLIENT_ID" \
     -d "client_secret=YOUR_CLIENT_SECRET" \
     -d "code=YOUR_GRANT_CODE"
   ```

   Copy the `refresh_token` from the JSON response.
4. **Env vars** — put the values in `.env.local`:

   ```
   ZOHO_CLIENT_ID=...
   ZOHO_CLIENT_SECRET=...
   ZOHO_REFRESH_TOKEN=...
   ZOHO_ACCOUNTS_DOMAIN=https://accounts.zoho.com
   ZOHO_API_DOMAIN=https://www.zohoapis.com
   ```

   Use the matching domains for your data center (EU `.eu`, India `.in`,
   Australia `.com.au`).

**Data model:** Zoho Leads require `Last_Name`. The single `name` field is split
(last word → `Last_Name`, rest → `First_Name`). `email`, `phone`, and `company`
map to their Zoho fields; everything else (package/service, job-site address,
event details, message/notes) is concatenated, labeled, into `Description` —
plus an ISO submission timestamp — so nothing is lost before custom Zoho fields
exist. Each form sets a distinct `Lead_Source`.

**Extending later:** all CRM auth lives in `lib/zoho.ts` and is reused via
`lib/leads.ts`. A future client portal, booking calendar, or invoice tracker can
reuse the same token cache to create Deals/Invoices — see the `// FUTURE:`
markers in those files.

---

## Forms, security & spam

- **Server-side validation** in every API route (required fields + email).
- **Honeypot** (`website`) field + **per-IP rate limiting** (token bucket) +
  Cloudflare Turnstile on the contact, drone, livestream, and Dubai lead forms.
  Each API route validates the one-time token, matching action, and configured
  site hostname before sending a lead to Zoho.
- All input is **sanitized** before reaching Zoho. Zoho errors are logged
  server-side only and never leaked to the client.
- **Security headers + CSP** in `next.config.mjs`: HSTS, `X-Frame-Options:
  DENY`, `X-Content-Type-Options: nosniff`, `Referrer-Policy`,
  `Permissions-Policy`, and a CSP allowing self + Google Fonts. Zoho is called
  only from the server, so Zoho domains are intentionally **not** in the CSP.

---

## SEO

- Per-page metadata via the Next.js Metadata API (`%s | Renderbar Studios`).
- JSON-LD: `LocalBusiness` (home/contact), `Service` (service pages),
  `Article` (posts), `BreadcrumbList` site-wide.
- `app/sitemap.ts`, `app/robots.ts`, branded `app/opengraph-image.tsx`.
- Static generation, `next/font` (zero CLS), `next/image`, semantic HTML.

---

## Deploy to Vercel

1. Push this repo to GitHub.
2. In Vercel, **Add New → Project** and import the repo.
   Framework preset: **Next.js** (auto-detected). Root directory: this folder.
3. **Environment Variables** — add `NEXT_PUBLIC_SITE_URL`,
   `NEXT_PUBLIC_TURNSTILE_SITE_KEY`, `TURNSTILE_SECRET`, and the four Zoho
   vars (Production + Preview). The Turnstile sitekey is public; keep the
   secret key server-only. `TURNSTILE_SECRET_KEY` remains supported for
   compatibility with the earlier integration.
4. Deploy. Or from the CLI:

   ```bash
   npx vercel        # preview
   npx vercel --prod # production
   ```

### Custom domain (`renderbar.net`)

1. Vercel → Project → **Settings → Domains** → add `renderbar.net` and
   `www.renderbar.net`.
2. At your registrar, point DNS to Vercel:
   - Apex `renderbar.net` → **A** record `76.76.21.21` (or the ALIAS/ANAME Vercel
     shows), and
   - `www` → **CNAME** `cname.vercel-dns.com`.
3. Set `NEXT_PUBLIC_SITE_URL=https://renderbar.net` in Production env vars.
   HTTPS/HSTS is issued and enforced automatically.

---

## Adding a blog post

Create `content/blog/<slug>.mdx` with frontmatter:

```mdx
---
title: "Your Post Title"
description: "One-sentence summary for SEO and cards."
date: "2025-06-01"
author: "Renderbar Studios"
readingTime: "5 min read"
tags: ["Drone Documentation", "Roofing"]
---

Write the post body in Markdown/MDX here.
```

It appears automatically on `/blog` and at `/blog/<slug>` (sorted by date) and
is added to the sitemap.

---

© Renderbar Studios LLC · FAA Part 107 Licensed · Jacksonville, FL
