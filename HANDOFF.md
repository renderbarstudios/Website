# Renderbar Studios — Project Handoff

Last updated: 2026-06-03

This is the operational handoff for the Renderbar Studios marketing site. For
setup/dev details see **README.md**; this doc covers current state, access,
what's live, and what's outstanding.

---

## 1. What this is

Production marketing site for Renderbar Studios (Jacksonville, FL media
production studio) + a private Dubai investor landing page.

- **Stack:** Next.js 14 (App Router) · TypeScript · Tailwind CSS
- **Hosting:** Vercel — project `tigi-3326s-projects/renderbar` (`prj_xFohxqxEGhwpAIr91u08ZiDUOSV2`)
- **Repo location:** `…/Renderbar Studios/website/renderbar` (the older Vite
  draft in the parent `website/` folder is unused and can be archived/deleted)

---

## 2. Live URLs

- **Production (Vercel):** https://renderbar-tigi-3326s-projects.vercel.app
- **Dubai investor page (private):** `…/dubai` — hidden from nav/footer/sitemap
  and `noindex`, but reachable by direct link. Share this link with investors.
- **Custom domain:** `renderbar.net` — **attached in Vercel but NOT live yet**
  (DNS still points to Squarespace). See §5.

---

## 3. Deploy & run

```bash
npm install
npm run dev      # http://localhost:3000
npm run build    # must pass clean before deploy
npx vercel --prod --yes   # deploy to production (builds remotely)
```

**Gotcha:** don't run `npm run build` while `npm run dev` is running — they
share `.next` and the dev server breaks. Stop dev first (or `rm -rf .next`).

Env vars are set in **Vercel → Settings → Environment Variables** (Production)
and locally in `renderbar/.env.local` (gitignored). Required:
`NEXT_PUBLIC_SITE_URL`, `ZOHO_CLIENT_ID`, `ZOHO_CLIENT_SECRET`,
`ZOHO_REFRESH_TOKEN`, `ZOHO_ACCOUNTS_DOMAIN`, `ZOHO_API_DOMAIN`. See
`.env.local.example`.

---

## 4. Integrations (all live in production)

| Integration | Detail |
| --- | --- |
| **Zoho CRM (leads)** | Server-side only (`lib/zoho.ts` + `lib/leads.ts`). 4 forms → 4 API routes → Zoho Leads. Each form sets a distinct `Lead_Source` (Website Contact Form / Drone Lead Form / Livestream Booking Form / Dubai Landing Page). US data center. Tested live end-to-end. |
| **Google Analytics** | gtag.js, ID `G-Y88K67L3X6`, in `app/layout.tsx`. **Production-only** (not loaded in dev). |
| **Zoho SalesIQ chat** | Widget `siq25cdb7d7ba1835b2b011fa784936feaf704c1a7c61cc1d5d216a76b6f3ade6b4`, in `app/layout.tsx`. Production-only, lazy-loaded. |

Secrets are NOT in this repo. The Zoho refresh token / client secret live only
in Vercel env vars and the local `.env.local`. To rotate: regenerate the Self
Client secret / refresh token at api-console.zoho.com (see README §"Zoho setup")
and update both places.

**CSP note:** `next.config.mjs` allows self + Google Fonts + GA hosts + Zoho
SalesIQ widget/CDN/websocket hosts. The Zoho *CRM* (lead) calls are server-side
and intentionally NOT in the CSP. If you add another client-side third party,
add its hosts to the relevant CSP directive or the browser will block it.

---

## 5. Custom domain — renderbar.net (✅ LIVE as of 2026-06-03)

`renderbar.net` is live: apex serves the site over HTTPS (valid cert + HSTS),
and `www.renderbar.net` 308-redirects to the apex. DNS at Squarespace points to
Vercel — apex A records `216.198.79.1` + `64.29.17.1`, `www` CNAME
`cname.vercel-dns.com`. The original cutover instructions are kept below for
reference / DR.

To go live (reference — already done), edit DNS in **Squarespace →
Settings → Domains → renderbar.net → DNS Settings → Custom Records**:

Remove the Squarespace records:
- A `@` → `198.49.23.145`, `198.185.159.145`, `198.49.23.144`, `198.185.159.144`
- CNAME `www` → `ext-sq.squarespace.com`

Add the Vercel records:
- A `@` → `216.198.79.1`
- A `@` → `64.29.17.1`
- CNAME `www` → `cname.vercel-dns.com`

(`76.76.21.21` also works if Squarespace only allows one A record.) Propagation +
auto SSL/HSTS takes ~10–60 min. Verify: `https://renderbar.net` returns 200 and
`www` redirects to the apex.

---

## 6. Outstanding items / decisions

1. **Cookie-consent banner — recommended.** GA is live and sets cookies with no
   consent gate. For UAE PDPL and EU GDPR this is a compliance gap. Add a
   lightweight banner that defers GA until the visitor accepts. (Not built.)
2. **Dubai AED pricing** is INDICATIVE placeholder (From AED 1,650/mo,
   2,600/event, 2,600/mo). The page literally says "indicative." Swap the
   `fromPrice` values in `app/dubai/page.tsx` (`DUBAI_SERVICES`) with real rates.
3. **Dubai regulatory wording** is generic ("GCAA-aligned, fully insured"). If
   specific GCAA/DCAA permit names/numbers exist, drop them into the Dubai page.
4. **Dubai service-card images:** the drone card uses a real CC0 Dubai aerial;
   the livestream + short-form cards still use generic (non-Dubai) stock. Swap
   when real Renderbar UAE footage is available.
5. **Dubai page is private (`noindex`).** When ready to make it public: remove
   `robots: { index:false, follow:false }` from `app/dubai/page.tsx`, re-add it
   to `NAV_LINKS` (`lib/site.ts`) and the sitemap (`app/sitemap.ts`).

---

## 7. Key files

```
app/layout.tsx          Root layout — fonts, metadata, GA + SalesIQ, nav/footer
app/page.tsx            Home (5-slide hero carousel + flagships)
app/{drone,livestream,services,about,blog,contact}/   Pages
app/dubai/page.tsx      Private Dubai investor page
app/api/{contact,drone,livestream,dubai}/route.ts     Lead handlers → Zoho
app/{sitemap,robots}.ts, app/opengraph-image.tsx      SEO
lib/site.ts             Single source of truth: NAP, services, packages, nav
lib/zoho.ts             Zoho auth + token cache (server-only)
lib/leads.ts            Form → Zoho mappers (one per form)
components/              Navbar, Footer, Logo, HeroCarousel, forms/, JsonLd, …
content/blog/*.mdx       Blog posts (add a file w/ frontmatter to publish)
public/brand/logo/       Logo set (active nav/footer = full_logo_knockout.png)
public/images/dubai/     CC0 Dubai photos + CREDITS.txt
```

## 8. Assets & licensing notes

- **Logo:** active site logo is `public/brand/logo/full_logo_knockout.png`
  (white wordmark). Other variants (icon, wordmark, gray-on-dark) remain in
  `public/brand/logo/` if needed.
- **Dubai photos:** CC0 1.0 (public domain, no attribution required) via
  Openverse/Wikimedia — see `public/images/dubai/CREDITS.txt`.
- No image-generation tooling was available in this environment, so the Dubai
  hero/drone visuals are real CC0 photos (an earlier branded-SVG skyline was
  removed). Replace with first-party footage anytime — one-line `src` swap.

---

## 9. Status snapshot at handoff

- ✅ All pages built, responsive, dark-themed, brand-consistent
- ✅ 4 lead forms → Zoho (validation, honeypot, rate-limit) — live-tested
- ✅ GA + SalesIQ live in production
- ✅ Security headers + CSP, SEO (metadata, JSON-LD, sitemap, robots, OG image)
- ✅ Deployed to Vercel production; `npm run build` clean (18 routes)
- ✅ `renderbar.net` LIVE — apex + `www`→apex 308 redirect + SSL/HSTS
- ⏳ Cookie consent, real AED pricing, GCAA wording, 2 card images (§6)
