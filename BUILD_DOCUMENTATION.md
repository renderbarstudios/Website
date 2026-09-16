# Renderbar Studios — Full Build Documentation

**Status:** ✅ LIVE at https://renderbar.net
**Last updated:** 2026-06-03

This is the complete documentation for the Renderbar Studios website: what it is,
how it's built, every account involved, and step-by-step guides for running,
editing, deploying, and maintaining it.

> 🔐 **Credentials:** account usernames and where to manage them are in §4 of
> this doc. The actual secret values (Zoho API keys) are in the **separate
> `CREDENTIALS-PRIVATE.md`** file (gitignored, included in your package). Keep
> that file and `.env.local` private.

---

## 1. Project overview

Production marketing website for **Renderbar Studios** — a Jacksonville, FL
media production studio (FAA Part 107 drone documentation, event livestreaming,
short-form video) — plus a **private Dubai investor landing page**.

- **Goal:** convert local contractors, developers, roofers, and event hosts into
  leads (drone documentation + livestreaming are the flagship services).
- **Tagline:** *Motion. Story. Vision.*
- **Contact:** (904) 431-7006 · info@renderbar.net · Jacksonville, FL 32223

### What's live

| URL | What |
| --- | --- |
| https://renderbar.net | Main site (apex, HTTPS + HSTS) |
| https://www.renderbar.net | Redirects (308) to apex |
| https://renderbar.net/dubai | **Private** Dubai investor page (unlisted, noindex, direct-link only) |

Live integrations: Zoho CRM lead capture, Google Analytics, Zoho SalesIQ chat.

---

## 2. Tech stack

| Area | Choice |
| --- | --- |
| Framework | Next.js 14 (App Router, React Server Components) |
| Language | TypeScript |
| Styling | Tailwind CSS 3 + custom brand tokens |
| Fonts | Montserrat via `next/font/google` (self-hosted, zero-CLS) |
| Forms | Client → Next.js API routes → Zoho CRM REST (server-side) |
| Blog | MDX files (`next-mdx-remote` v6 + `gray-matter`) |
| Analytics | Google Analytics (gtag.js) |
| Live chat | Zoho SalesIQ widget |
| Hosting | Vercel (free tier) |
| Domain | renderbar.net (registered at Squarespace) |

No database, no auth system, no CMS — static-first. Content lives in code
(`lib/site.ts`) and MDX files.

---

## 3. Repository structure

```
renderbar/
├─ app/
│  ├─ layout.tsx            Root layout — fonts, metadata, GA + SalesIQ, nav/footer
│  ├─ page.tsx              Home (5-slide hero carousel + flagship sections)
│  ├─ globals.css           Base styles + brand component classes
│  ├─ drone/page.tsx        Drone documentation landing + lead form
│  ├─ livestream/page.tsx   Livestreaming landing + booking form
│  ├─ services/page.tsx     All services + pricing
│  ├─ about/page.tsx        Brand story, founders, credentials
│  ├─ blog/page.tsx         Blog index
│  ├─ blog/[slug]/page.tsx  Blog post (renders MDX)
│  ├─ contact/page.tsx      Contact form
│  ├─ dubai/page.tsx        PRIVATE Dubai investor page (noindex)
│  ├─ api/
│  │  ├─ contact/route.ts   Lead handler → Zoho
│  │  ├─ drone/route.ts     Lead handler → Zoho
│  │  ├─ livestream/route.ts Lead handler → Zoho
│  │  └─ dubai/route.ts     Lead handler → Zoho
│  ├─ sitemap.ts            /sitemap.xml
│  ├─ robots.ts             /robots.txt
│  ├─ opengraph-image.tsx   Branded social-share image (1200×630)
│  ├─ icon.png              Favicon (brand lens mark)
│  └─ not-found.tsx         404 page
├─ components/
│  ├─ Navbar.tsx, Footer.tsx, Logo.tsx
│  ├─ HeroCarousel.tsx      5-banner accessible auto-rotating hero
│  ├─ FlagshipSection.tsx, PackageGrid.tsx, CTAStrip.tsx
│  ├─ StageTimeline.tsx, TrustBar.tsx, SectionHeading.tsx
│  ├─ JsonLd.tsx            Structured data (LocalBusiness/Service/Article/Breadcrumb)
│  ├─ MDXComponents.tsx     Blog MDX renderers (incl. <Figure> images)
│  └─ forms/                fields, useLeadForm, FormStatus, 4 form components
├─ lib/
│  ├─ site.ts               SINGLE SOURCE OF TRUTH: NAP, services, packages, nav
│  ├─ zoho.ts               Zoho auth + token cache (server-only)
│  ├─ leads.ts              Form → Zoho field mappers
│  ├─ validation.ts         Input validation & sanitization
│  ├─ rate-limit.ts         In-memory per-IP rate limiter
│  └─ blog.ts               MDX loader (frontmatter)
├─ content/blog/*.mdx       Blog posts (add a file to publish)
├─ public/
│  ├─ brand/logo/           Logo set (active = full_logo_knockout.png)
│  └─ images/               Photography + public/images/dubai/ (CC0 Dubai photos)
├─ next.config.mjs          Security headers + Content-Security-Policy
├─ tailwind.config.ts       Brand color tokens + typography scale
├─ .env.local              Local secrets (gitignored — included in your package)
├─ .env.local.example       Template for env vars
├─ README.md                Quick reference
├─ HANDOFF.md               Operational handoff summary
├─ BUILD_DOCUMENTATION.md   This file
└─ CREDENTIALS-PRIVATE.md   Secret values (gitignored — included in your package)
```

---

## 4. Accounts & credentials

> The site has **no login of its own** (no admin panel/password). "Credentials"
> means the third-party accounts that host/power it. Account passwords are YOUR
> personal logins — store them in a password manager. The only machine
> credentials are the Zoho API keys (in `CREDENTIALS-PRIVATE.md` + `.env.local`).

| Service | Username / identifier | Password / secret | Where to manage |
| --- | --- | --- | --- |
| **Vercel** (hosting) | account `renderbar` · team `tigi-3326s-projects` · project `renderbar` | Your Vercel login (OAuth/email — not stored here) | https://vercel.com/tigi-3326s-projects/renderbar |
| **Zoho CRM** (leads) | Your Zoho account | API keys → see `CREDENTIALS-PRIVATE.md` | https://crm.zoho.com · https://api-console.zoho.com |
| **Squarespace** (domain registrar) | Your Squarespace account | Your login (not stored here) | Squarespace → Settings → Domains → renderbar.net |
| **Google Analytics** | Your Google account · property `G-Y88K67L3X6` | Your Google login (not stored here) | https://analytics.google.com |
| **Zoho SalesIQ** (chat) | Your Zoho account · widget `siq25cdb…` | (same Zoho login) | https://salesiq.zoho.com |
| **Email** | info@renderbar.net | (your mail host) | — |

Public (non-secret) IDs used in code:
- Google Analytics Measurement ID: **`G-Y88K67L3X6`**
- Zoho SalesIQ widget code: **`siq25cdb7d7ba1835b2b011fa784936feaf704c1a7c61cc1d5d216a76b6f3ade6b4`**
- Vercel project ID: **`prj_xFohxqxEGhwpAIr91u08ZiDUOSV2`**

The Zoho **client ID / client secret / refresh token** are the only true secrets.
They live in (1) `CREDENTIALS-PRIVATE.md`, (2) `renderbar/.env.local` (local
dev), and (3) Vercel → Settings → Environment Variables (production). To rotate
them, see §6.4.

---

## 5. Step-by-step: first-time setup & running locally

**Prerequisites:** Node.js 18+ (built/tested on Node 24), npm.

1. **Unzip** the package. Open a terminal in the `renderbar/` folder.
2. **Install dependencies:**
   ```bash
   npm install
   ```
3. **Environment variables.** If `.env.local` is already in the package, you're
   set. Otherwise copy the template and fill it in:
   ```bash
   cp .env.local.example .env.local
   # then paste the Zoho values from CREDENTIALS-PRIVATE.md
   ```
4. **Run the dev server:**
   ```bash
   npm run dev
   ```
   Open http://localhost:3000. Hot-reloads on save.
   *(Note: Google Analytics and the SalesIQ chat are intentionally disabled in
   dev — they only load in production.)*
5. **Production build check** (always run before deploying — must be clean):
   ```bash
   npm run build
   ```
   ⚠️ Don't run `npm run build` while `npm run dev` is running — they share the
   `.next` folder and the dev server will break. Stop dev first (Ctrl-C).

---

## 6. Step-by-step: the common tasks

### 6.1 Deploy to production (Vercel)

The Vercel CLI is the fastest path. From the `renderbar/` folder:

```bash
npx vercel login      # one-time: sign in as the "renderbar" account (browser)
npx vercel --prod --yes
```

This builds on Vercel and promotes to production. Within ~1 minute the live site
(renderbar.net) reflects your changes. Alternatively, connect the repo to GitHub
and Vercel auto-deploys on every push (Vercel dashboard → Project → Git).

### 6.2 Edit text, services, or pricing

Almost all site content is in **`lib/site.ts`** — services, package names/prices,
feature bullets, nav links, contact info (NAP), and the 5 hero verticals. Edit
there and it updates everywhere (pages, footer, structured data, sitemap). Then
`npm run build` and deploy.

Page-specific copy (headlines, section intros) lives in each page file under
`app/…/page.tsx`.

### 6.3 Add a blog post

Create `content/blog/<your-slug>.mdx` with frontmatter:

```mdx
---
title: "Your Post Title"
description: "One-sentence summary for SEO + cards."
date: "2026-06-10"
author: "Renderbar Studios"
readingTime: "5 min read"
tags: ["Drone Documentation", "Roofing"]
---

Write the body in Markdown/MDX. To add an image:

<Figure src="/images/your-image.jpg" alt="Describe it" caption="Optional caption" />
```

It appears automatically on `/blog`, at `/blog/<your-slug>`, and in the sitemap.
Deploy to publish.

### 6.4 Rotate / refresh the Zoho API credentials

Do this if the keys leak, or if Zoho lead creation ever starts failing with auth
errors. At https://api-console.zoho.com (your **Self Client** app):

1. **Generate Code** tab → scope `ZohoCRM.modules.ALL` → pick a short duration →
   generate the grant **code**.
2. Exchange the grant code for a new refresh token (run within the duration
   window; values from `CREDENTIALS-PRIVATE.md`):
   ```bash
   curl -X POST "https://accounts.zoho.com/oauth/v2/token" \
     -d "grant_type=authorization_code" \
     -d "client_id=YOUR_CLIENT_ID" \
     -d "client_secret=YOUR_CLIENT_SECRET" \
     -d "code=YOUR_GRANT_CODE"
   ```
3. Copy `refresh_token` from the JSON response.
4. Update it in **two places**: `renderbar/.env.local` (local) and **Vercel →
   Settings → Environment Variables → `ZOHO_REFRESH_TOKEN`** (production), then
   redeploy.

Data-center note: domains are driven by env vars. US = `accounts.zoho.com` /
`www.zohoapis.com` (current). EU `.eu`, India `.in`, Australia `.com.au`.

### 6.5 Update the Dubai page

File: `app/dubai/page.tsx`.
- **AED pricing:** edit the `fromPrice` values in the `DUBAI_SERVICES` array
  (currently INDICATIVE placeholders — the page says so). Replace with real rates.
- **Regulatory wording:** currently generic "GCAA-aligned, fully insured." Add
  specific GCAA/DCAA permit names/numbers if/when you have them.
- **Images:** hero + drone card use real CC0 Dubai photos in
  `public/images/dubai/`. Swap with your own UAE footage anytime (one-line `src`).

**Make the Dubai page PUBLIC** (it's currently private/unlisted) when ready:
1. In `app/dubai/page.tsx`, remove `robots: { index: false, follow: false }`.
2. In `lib/site.ts`, add `{ href: "/dubai", label: "Dubai" }` back to `NAV_LINKS`.
3. In `app/sitemap.ts`, add the `/dubai` path back.
Deploy.

### 6.6 Replace the logo or images

- **Logo:** the active site logo is `public/brand/logo/full_logo_knockout.png`
  (white wordmark). To change it, replace that file (keep ~5.67:1 aspect) or edit
  the `full` source in `components/Logo.tsx`.
- **Images:** drop files in `public/images/` and reference them by path. Use
  `next/image` (already used throughout) for automatic optimization.

### 6.7 Custom domain (already done — for reference)

renderbar.net is live. DNS at Squarespace points to Vercel:
- A `@` → `216.198.79.1` and `64.29.17.1`
- CNAME `www` → `cname.vercel-dns.com`

`www` 308-redirects to the apex; Vercel auto-issues SSL + HSTS. (See HANDOFF.md
§5 for the full cutover steps if you ever re-point DNS.)

---

## 7. Integrations

### Zoho CRM (lead capture) — server-side
- 4 forms → 4 API routes (`/api/{contact,drone,livestream,dubai}`) → `lib/leads.ts`
  → `lib/zoho.ts` → Zoho **Leads** module.
- Each form sets a distinct **`Lead_Source`**: "Website Contact Form", "Drone Lead
  Form", "Livestream Booking Form", "Dubai Landing Page" — so leads are segmented.
- Field mapping: the single name splits into `First_Name`/`Last_Name`;
  email/phone/company map directly; everything else (service, job-site address,
  event details, message/notes) is concatenated into `Description` with an ISO
  timestamp. The access token is cached in memory and auto-refreshed.
- **All Zoho calls are server-side only.** Credentials never reach the browser.

### Google Analytics — `app/layout.tsx`
- gtag.js, ID `G-Y88K67L3X6`. **Production only** (not loaded on localhost).

### Zoho SalesIQ chat — `app/layout.tsx`
- Widget loads site-wide, lazy, **production only**.

---

## 8. Security

- **Headers + CSP** in `next.config.mjs`: HSTS, `X-Frame-Options: DENY`,
  `X-Content-Type-Options: nosniff`, `Referrer-Policy`, `Permissions-Policy`, and
  a Content-Security-Policy allowing self + Google Fonts + Google Analytics +
  Zoho SalesIQ widget hosts. (Zoho **CRM** lead calls are server-side and not in
  the CSP.)
- **Secrets** only in env vars (`.env.local` + Vercel) — never in client code,
  never committed (`.env*.local` and `CREDENTIALS-PRIVATE.md` are gitignored).
- **Spam protection** on every form: hidden honeypot field + per-IP rate limiting.
- **Validation/sanitization** of all input server-side before Zoho.
- HTTPS enforced (Vercel) + HSTS.

---

## 9. SEO

- Per-page metadata (Next Metadata API), title template `%s | Renderbar Studios`.
- JSON-LD: `LocalBusiness` (home/contact), `Service` (service pages), `Article`
  (blog), `BreadcrumbList` site-wide.
- `app/sitemap.ts`, `app/robots.ts`, branded `app/opengraph-image.tsx`.
- Static generation, `next/font` (zero CLS), `next/image`, semantic HTML.
- The Dubai page is intentionally `noindex` (private).

---

## 10. Brand system (reference)

**Colors** (`tailwind.config.ts`): signal-red `#E01A1A` (CTAs/emphasis),
electric-blue `#2B3A9E` (graphics), **link-blue `#6E83E0`** (accessible blue for
text/links on dark — added for WCAG AA), live-green `#6CC520` (success only),
void-black `#0A0A0A` (bg), dark-surface `#141414` (cards), mid-gray `#888888`
(captions), off-white `#F5F4F2` (text on dark). Dark-first; red for CTAs/large
headlines only (never body copy).

**Typography:** Montserrat (200–900). Display/H1 Black 900; H2 ExtraBold; H3
Bold; labels/eyebrows bold uppercase tracked.

**Logo:** RGB "lens" icon + "RENDERBAR / STUDIOS" wordmark. Don't recolor the
rings, stretch, or add shadows. Active file: `full_logo_knockout.png` (white).

---

## 11. Troubleshooting

| Symptom | Fix |
| --- | --- |
| Dev server shows blank/broken page after a build | You ran `npm run build` while `dev` was running. `rm -rf .next` and restart `npm run dev`. |
| Forms return "couldn't submit / please call" | Zoho auth failing — check env vars in Vercel; rotate refresh token (§6.4). Errors are logged server-side only. |
| Vercel build fails | Run `npm run build` locally to see the real error. Common past causes (already fixed): OG image Satori `display:flex`, `next-mdx-remote` version. |
| Logo/image not updating | Hard-refresh; `next/image` caches. Confirm the file path and that you redeployed. |
| GA/chat not showing locally | Expected — both are production-only by design. |

---

## 12. Outstanding / optional items

1. **Cookie-consent banner** — GA sets cookies; recommended for UAE PDPL + EU GDPR.
2. **Dubai AED pricing** — replace indicative placeholders with real numbers.
3. **Dubai GCAA/DCAA wording** — make specific if permits are finalized.
4. **2 Dubai service-card images** — swap generic stock for first-party footage.
5. **Make /dubai public** when ready (§6.5).

---

*Renderbar Studios — Motion. Story. Vision.*
