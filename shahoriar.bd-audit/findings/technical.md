# Technical SEO Audit: shahoriar.bd

## Status Summary
- **Health Score:** 88 / 100
- **Status:** Strong Edge Infrastructure, Minor Canonical & Robots Hygiene Gaps

---

## 1. Crawlability & Indexability
- **Robots.txt Analysis:**
  - Root directive: `allow: /`
  - Current disallow: `['/zakat-calculation', '/zakat-report', '/bride-selector']`
  - **Issue:** Private and standalone apps (`/shoily`, `/bizcomp/*`, `/meetup`, `/ide`) are not listed in `robots.txt` disallows. Although `/shoily` and `/bride-selector` include `robots: { index: false }` in their Next.js layouts, any page disallowed in `robots.txt` cannot have its `noindex` tag crawled by Google. 
  - **Fix:** Keep private routes (`/zakat-calculation`, `/zakat-report`, `/bride-selector`, `/shoily`) either allowed to crawl with a clear `noindex` meta tag, or disallowed in `robots.txt` without relying on `noindex`. Add `/bizcomp` and `/meetup` to `robots.txt` disallow.

- **Sitemap Analysis:**
  - Location: `https://shahoriar.bd/sitemap.xml` (Discovered via `robots.txt`).
  - Total URLs: 36 (13 core pages + 23 Contentful blog posts).
  - Valid XML syntax: Yes (`urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9"`).
  - **Issue:** Missing `/projects/locreminder/policy`, which is an indexable privacy policy required for Android app distribution.
  - **Issue:** Hardcoded priority and URLs in `app/sitemap.ts` rather than unified route config.

---

## 2. Canonical Tags & URL Structure
- **Canonical Consistency:**
  - Homepage (`app/page.tsx`): Declares `https://shahoriar.bd/` (with trailing slash).
  - Sitemap (`app/sitemap.ts`): Emits `https://shahoriar.bd` (without trailing slash).
  - All other pages (`/ai`, `/education`, `/skills`): Emit without trailing slash.
  - **Fix:** Remove trailing slash from `app/page.tsx` canonical to establish exact parity across the entire site.
- **Missing Canonicals:**
  - `/techtips`: [app/techtips/layout.tsx](file:///a:/zaifears-portfolio/app/techtips/layout.tsx) defines `openGraph.url` but lacks `alternates.canonical`.
  - `/ide`: [app/ide/page.tsx](file:///a:/zaifears-portfolio/app/ide/page.tsx) lacks metadata and canonical tag entirely.

---

## 3. Security & HTTP Headers
- **Headers Inspected on `https://shahoriar.bd`:**
  - `strict-transport-security: max-age=31536000; includeSubDomains` (A+ Grade)
  - `x-content-type-options: nosniff` (Active)
  - `x-frame-options: DENY` (Active)
  - `content-security-policy: frame-ancestors 'none'` (Active)
  - `referrer-policy: strict-origin-when-cross-origin` (Active)
  - `permissions-policy: camera=(), microphone=(), geolocation=()` (Active)
  - `link: </llms.txt>; rel="llms-txt", </llms-full.txt>; rel="llms-full-txt"` (Active)
  - `server: cloudflare` / `x-vercel-cache: HIT` (Active edge caching)
