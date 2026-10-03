# Comprehensive Website SEO & Agentic Audit: shahoriar.bd

**Audit Target:** https://shahoriar.bd  
**Owner:** Md Al Shahoriar Hossain  
**Audit Date:** October 2026  
**Tooling:** claude-seo runtime v2.4.1 (Playwright Chromium, BeautifulSoup4, Lighthouse Agentic Suite)  
**Overall SEO Health Score:** **87 / 100** (Grade: A-)

---

## 1. Executive Summary

| Category | Weight | Score | Weighted Score | Status |
| :--- | :---: | :---: | :---: | :--- |
| **Technical SEO** | 22% | 88/100 | 19.4 | Excellent security headers, Cloudflare edge HTTP/3, small canonical/robots gaps |
| **Content Quality & E-E-A-T** | 23% | 92/100 | 21.2 | Outstanding firsthand authority (EY, bKash, ICAB, BUP), but blog H1 duplication bug |
| **On-Page SEO** | 20% | 82/100 | 16.4 | Clean titles/meta, but missing page-level OG/Twitter cards on 7 routes & heading skips |
| **Schema & Structured Data** | 10% | 88/100 | 8.8 | Strong Person, WebSite, SoftwareApp graphs; missing ContactPage & Credential schemas |
| **Performance (CWV)** | 10% | 90/100 | 9.0 | Fast Next.js rendering, deferred scripts; opportunity for Speculation Rules API |
| **AI Search Readiness** | 10% | 86/100 | 8.6 | 100/100 Agent UX, HTTP Link discovery headers; llms.txt syntax format violation |
| **Images** | 5% | 80/100 | 4.0 | Next/Image responsive sizes, but 40+ empty alt tags in techtips & external ImgBB hosting |
| **Total Weighted Score** | **100%** | **87 / 100** | **87.4** | **Solid Engineering Foundation with Targeted Optimization Opportunities** |

---

## 2. Top Critical & High-Priority Findings

1. **Duplicate `<h1>` Tags on Contentful Blog Posts (High)**  
   In [app/life/[slug]/page.tsx](file:///a:/zaifears-portfolio/app/life/[slug]/page.tsx), the page title is rendered as an `<h1>`. However, the Contentful Rich Text renderer explicitly maps `BLOCKS.HEADING_1` to an `<h1>` tag as well. Whenever a blog author formats a top-level section header in Contentful, the rendered page produces multiple `<h1>` elements (e.g. `/life/joining-ey-bangladesh-audit-articleship` has 2 `<h1>` tags).
   *Fix:* Map `BLOCKS.HEADING_1` to `<h2>`, `BLOCKS.HEADING_2` to `<h3>`, and `BLOCKS.HEADING_3` to `<h4>`.

2. **`llms.txt` Fails Official Standard & Lighthouse Agentic Audit (High)**  
   While `shahoriar.bd` advertises `llms.txt` via HTTP `Link` headers and redirects `/llm.txt`, `agentic_check.py` detected that [app/llms.txt/route.ts](file:///a:/zaifears-portfolio/app/llms.txt/route.ts) fails the official `llmstxt.org` specification:
   - Missing blockquote summary (`> ...`) immediately below the H1 title.
   - Contains raw plain-text URLs (`- Professional profile: https://...`) instead of standard Markdown links (`- [Professional Profile](https://...): description`).
   *Fix:* Format according to the `llmstxt.org` specification.

3. **Missing Page-Level Open Graph and Twitter Card Metadata on 7 Routes (High)**  
   Core indexable routes—including `/skills`, `/education`, `/projects`, `/life`, `/ai`, `/contact`, and `/design-portfolio`—do not export page-level `openGraph` or `twitter` cards. They default to the generic root layout preview (*"Md Al Shahoriar Hossain | Portfolio"*), degrading social preview click-through rates on LinkedIn, Twitter/X, Discord, and Slack.
   *Fix:* Add explicit `openGraph` and `twitter` blocks to the metadata exports of each page.

4. **Canonical Trailing Slash Inconsistency with Sitemap (Medium)**  
   In [app/page.tsx](file:///a:/zaifears-portfolio/app/page.tsx), `alternates.canonical` is set to `'https://shahoriar.bd/'` (with a trailing slash), whereas [app/sitemap.ts](file:///a:/zaifears-portfolio/app/sitemap.ts) publishes `'https://shahoriar.bd'` (without trailing slash). Furthermore, [app/techtips/layout.tsx](file:///a:/zaifears-portfolio/app/techtips/layout.tsx) and [app/ide/page.tsx](file:///a:/zaifears-portfolio/app/ide/page.tsx) omit canonical tags entirely.
   *Fix:* Harmonize root canonical to `'https://shahoriar.bd'` and add canonical tags to `/techtips` and `/ide`.

5. **Homepage H1 Concatenation & Screen Reader Duplication (Medium)**  
   In [app/components/HeroSection.tsx](file:///a:/zaifears-portfolio/app/components/HeroSection.tsx), the H1 contains both an `<span className="sr-only">Md Al Shahoriar Hossain</span>` and visible block spans (`MD AL`, `SHAHORIAR`, `Hossain`). Search engine DOM text parsers concatenate these into `"Md Al Shahoriar HossainMD ALSHAHORIARHossain"`.
   *Fix:* Restructure the H1 so the visual text itself forms the natural accessible text without a redundant adjacent `sr-only` duplicate.

6. **40+ Software Logos with Empty `alt=""` on `/techtips` (Medium)**  
   In [app/techtips/page.tsx](file:///a:/zaifears-portfolio/app/techtips/page.tsx), the `ItemCard` component renders software logos (7-Zip, RustDesk, Aegis, NewPipe, Immich, etc.) with `alt=""`, stripping their semantic context and omitting them from image search indexing.
   *Fix:* Update to `alt={`${item.name} logo`}`.

7. **External Third-Party Image Hosting on `i.ibb.co.com` (Medium)**  
   The primary corporate EY logo in [app/skills/SkillsTabs.tsx](file:///a:/zaifears-portfolio/app/skills/SkillsTabs.tsx) and screenshots in [app/projects/tapo-viewer/page.tsx](file:///a:/zaifears-portfolio/app/projects/tapo-viewer/page.tsx) are hotlinked from `i.ibb.co.com`. This introduces external DNS lookups, potential link rot, and hotlink blocking.
   *Fix:* Download and host assets locally in `/public/skills/` and `/public/projects/tapo-viewer/`.

---

## 3. Detailed Category Audits

### 3.1 Technical SEO (Score: 88/100)
- **Crawlability & Indexability:** Googlebot and major search engine crawlers have full access. All 36 sitemap URLs return 200 OK.
- **Sitemap Coverage:** [app/sitemap.ts](file:///a:/zaifears-portfolio/app/sitemap.ts) dynamically crawls 23 Contentful blog posts and 13 static pages. However, `/projects/locreminder/policy` (a public privacy policy page with canonical tag) was omitted from the sitemap.
- **Robots Isolation:** Standalone tools `/shoily`, `/bizcomp`, and `/meetup` are excluded from the sitemap but not disallowed in `robots.txt`. Note: in `app/meetup/layout.tsx`, the title contains a corrupted UTF-8 replacement glyph (`'Iftar Meetup 2026  NDC2021A'`).
- **HTTP Response Headers:** Industry-leading security headers are present across all pages:
  - `Strict-Transport-Security: max-age=31536000; includeSubDomains`
  - `X-Content-Type-Options: nosniff`
  - `X-Frame-Options: DENY`
  - `Content-Security-Policy: frame-ancestors 'none'`
  - `Referrer-Policy: strict-origin-when-cross-origin`
  - `Permissions-Policy: camera=(), microphone=(), geolocation=()`

### 3.2 Content Quality & E-E-A-T (Score: 92/100)
- **Firsthand Experience:** Exceptionally genuine documentation of articleship at EY Bangladesh (Islam Hoque Hanif & Co.), AML/CFT internship at bKash, BUP finance coursework, and CA preparation at ICAB.
- **Algorithmic Quality Evaluation:**
  - Automated analysis via `content_quality.py`: Overall quality **91/100**.
  - Filler Score: **0%**.
  - AI Phrasing Pattern Score: **0%** (natural human voice).
  - Information Density: **1.0** (exceptionally high).
- **Heading Hierarchies:**
  - `/projects`: Skips from `<h1>Projects</h1>` directly to `<h3>` project cards without an `<h2>`.
  - `/design-portfolio`: Skips `<h1>` entirely; starts with `<h2>Design Portfolio</h2>`.
  - `/techtips`: Software grid cards use `<h3>` without any parent `<h2>` on Apps, Android, and Extension tabs.

### 3.3 On-Page SEO (Score: 82/100)
- **Title Tags & Meta Descriptions:** Core pages feature keyword-rich, targeted titles and meta descriptions calibrated to user intent (e.g. *Bangladesh Youth Tax Calculator*, *DSE Paper Trading Simulator*, *Tapo Desktop App*).
- **Social Metadata Deficit:** 7 major routes lack page-level `openGraph` and `twitter` tags, preventing tailored link cards on LinkedIn, Twitter, and messaging apps.

### 3.4 Schema / Structured Data (Score: 88/100)
- **Entity Knowledge Graph:** Root layout injects rich `Person` schema (`@id: https://shahoriar.bd/#person`) and `WebSite` schema (`@id: https://shahoriar.bd/#website`), establishing unambiguous entity relationships (`worksFor`, `alumniOf`, `knowsAbout`, `sameAs`, `subjectOf`).
- **Software Applications:** `SoftwareApplication` markup is deployed across StockSimulatorBD, Bangladesh Youth Tax Calculator, LocReminder, and Tapo-Viewer.
- **BlogPosting:** Full schema deployed on `/life/[slug]` with reading time and date markers.
- **FAQPage Note:** FAQPage schema is present on the homepage and Youth Tax Calculator. Note: Google retired FAQ rich result accordions for all websites on May 7, 2026. Keep existing schema for LLM semantic indexing, but do not expect SERP dropdown snippets.
- **Expansion Opportunities:** Add `ContactPage` schema to `/contact`, `EducationalOccupationalCredential` to `/skills`, and `CollectionPage` / `Blog` to `/life`.

### 3.5 Performance & Core Web Vitals (Score: 90/100)
- **Zero CLS:** Fonts are self-hosted via `geist/font`, and Next.js Image components reserve layout dimensions.
- **Script Deferral:** Microsoft Clarity initializes inside `requestIdleCallback` (with a 3000ms fallback), avoiding main-thread contention during LCP.
- **Preload Optimization:** `preload_check.py` scored 50/100. Adding the Speculation Rules API for instant prefetching/prerendering of top internal routes (`/skills`, `/projects`, `/ai`) will provide near-zero navigation latency.
- **Image Priority:** The desktop hero image has `priority={true}`. Adding explicit `fetchpriority="high"` further accelerates browser preloading.

### 3.6 AI Search Readiness & Agentic SEO (Score: 86/100)
- **Agent Tree Score:** `agent_ux_check.py` achieved **100/100** (clean accessibility tree, 12 landmarks, 0 div-onclick pseudo-buttons).
- **AI Profile:** Dedicated `/ai` machine-readable profile provides authoritative, structured facts for LLM retrieval.
- **Crawler Permissions:** Robots.txt allows all major AI crawlers (`GPTBot`, `Claude-SearchBot`, `PerplexityBot`, `Applebot-Extended`, `CCBot`).
- **llms.txt Fix:** Reformat `/llms.txt` to include a blockquote summary and Markdown links to comply with the `llmstxt.org` standard and pass Lighthouse Agentic audits.

### 3.7 Images (Score: 80/100)
- Next.js modern image pipeline active across the site.
- Empty alt attributes on `/techtips` logo cards must be resolved.
- External hotlinked assets on `i.ibb.co.com` should be migrated to local `/public/` storage.

---

## 4. Prioritized Recommendations by Category

### Phase 1: Critical & High Impact (Days 1–3)
1. **Fix Blog Post H1 Mapping:** In [app/life/[slug]/page.tsx](file:///a:/zaifears-portfolio/app/life/[slug]/page.tsx), map `BLOCKS.HEADING_1` to `<h2>`.
2. **Reformat `llms.txt`:** In [app/llms.txt/route.ts](file:///a:/zaifears-portfolio/app/llms.txt/route.ts), add blockquote summary and convert URLs to Markdown links.
3. **Harmonize Root Canonical:** In [app/page.tsx](file:///a:/zaifears-portfolio/app/page.tsx), change `canonical: 'https://shahoriar.bd/'` to `'https://shahoriar.bd'`.
4. **Add Canonical to `/techtips` and `/ide`:** Update [app/techtips/layout.tsx](file:///a:/zaifears-portfolio/app/techtips/layout.tsx) and [app/ide/page.tsx](file:///a:/zaifears-portfolio/app/ide/page.tsx).
5. **Add OpenGraph & Twitter Cards:** Add explicit social card metadata to `/skills`, `/education`, `/projects`, `/life`, `/ai`, `/contact`, and `/design-portfolio`.

### Phase 2: On-Page Architecture & Accessibility (Week 1)
6. **Populate Alt Text on `/techtips`:** Change `alt=""` to `alt={`${item.name} logo`}` in `ItemCard`.
7. **Fix Heading Levels:** Add `<h2>` section headers on `/projects` and add an `<h1>` on `/design-portfolio`.
8. **Fix Homepage H1 Duplication:** Revise [app/components/HeroSection.tsx](file:///a:/zaifears-portfolio/app/components/HeroSection.tsx) to eliminate duplicate sr-only text.
9. **Add Privacy Policy to Sitemap:** Include `/projects/locreminder/policy` in [app/sitemap.ts](file:///a:/zaifears-portfolio/app/sitemap.ts).
10. **Clean Up `robots.txt` & Standalone Apps:** Disallow `/shoily`, `/bizcomp`, and `/meetup` in [app/robots.ts](file:///a:/zaifears-portfolio/app/robots.ts), and fix title encoding in [app/meetup/layout.tsx](file:///a:/zaifears-portfolio/app/meetup/layout.tsx).

### Phase 3: Performance & Image Consolidation (Weeks 2–3)
11. **Localize Hotlinked Images:** Move external EY logo and Tapo-Viewer screenshots to local `/public/` assets.
12. **Implement Speculation Rules:** Inject `<script type="speculationrules">` for instant prefetching/prerendering of `/skills`, `/projects`, and `/ai`.
13. **Add `fetchpriority="high"`:** Add explicit high fetch priority to the primary hero portrait image.

### Phase 4: SXO & Structured Data Expansion (Month 1)
14. **Elevate Resume Visibility:** Add a direct "Resume" link in [app/components/nav.tsx](file:///a:/zaifears-portfolio/app/components/nav.tsx) and hero CTA to reduce recruiter friction.
15. **Add ContactPage Schema:** Add `ContactPage` and `ContactPoint` JSON-LD to [app/contact/page.tsx](file:///a:/zaifears-portfolio/app/contact/page.tsx).
16. **Add Credential Schema:** Add `EducationalOccupationalCredential` / `ItemList` markup to the Certifications tab on `/skills`.
