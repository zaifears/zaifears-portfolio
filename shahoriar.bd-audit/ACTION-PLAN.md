# Prioritized SEO Action Plan: shahoriar.bd

This action plan implements the 10-principle synthesis framework (**PERCEIVE → ANALYZE → VALIDATE → ACT**). Each recommendation is structured with its foundational principle (**THINK**), systemic dependency (**CONNECT-system**), falsifiability check (**ACCEPT**), and leading monitoring indicator (**GROW**).

---

## Phase 1: Critical & High-Impact Quick Wins (Days 1–3)

### 1. Fix Contentful Rich Text Heading Hierarchy in Blog Detail Pages
- **Target File:** [app/life/[slug]/page.tsx](file:///a:/zaifears-portfolio/app/life/[slug]/page.tsx)
- **THINK (First Principle):** A document must have exactly one `<h1>` defining the primary topic (the article title). Multiple `<h1>` tags dilute document outline clarity for search engines and screen readers.
- **CONNECT-system (Dependencies):** Independent change. Immediate win across all 23 blog posts.
- **ACCEPT (Falsifiability):** Run `python claude-seo run parse_html.py <blog_url> --json`. If `len(result['h1']) > 1`, the fix has failed.
- **GROW (Leading Indicator):** In Google Search Console, inspect URL rich snippets and outline rendering under URL Inspection.
- **Action:**
  ```tsx
  // Inside renderNode in app/life/[slug]/page.tsx:
  [BLOCKS.HEADING_1]: (_node: Node, children: ReactNode) => (
    <h2 className="mb-4 mt-12 text-2xl font-bold tracking-tight text-gray-900 dark:text-white md:text-3xl">
      {children}
    </h2>
  ),
  [BLOCKS.HEADING_2]: (_node: Node, children: ReactNode) => (
    <h3 className="mb-3 mt-8 text-xl font-bold text-gray-900 dark:text-white md:text-2xl">
      {children}
    </h3>
  ),
  [BLOCKS.HEADING_3]: (_node: Node, children: ReactNode) => (
    <h4 className="mb-2 mt-6 text-lg font-bold text-gray-900 dark:text-white">
      {children}
    </h4>
  ),
  ```

---

### 2. Standardize `llms.txt` to Pass Lighthouse Agentic & llmstxt.org Standards
- **Target File:** [app/llms.txt/route.ts](file:///a:/zaifears-portfolio/app/llms.txt/route.ts)
- **THINK (First Principle):** AI agents, crawler engines, and the Lighthouse Agentic Browsing audit parse `llms.txt` using the formal spec (Title → Blockquote Summary → Markdown Links).
- **CONNECT-system (Dependencies):** Builds on existing `Link` header and 301 redirect. Unlocks full passing status for Agentic SEO.
- **ACCEPT (Falsifiability):** Run `python claude-seo run agentic_check.py https://shahoriar.bd --json`. If `data.llms.lighthouse != "pass"`, the fix has failed.
- **GROW (Leading Indicator):** Perplexity, ChatGPT, and Claude Search citation log checks and AI referral traffic.
- **Action:**
  ```markdown
  # Shahoriar Hossain — Site Guide

  > Personal portfolio and professional knowledge hub of Md Al Shahoriar Hossain, Audit Associate at EY Bangladesh (Islam Hoque Hanif & Co.), Chartered Accountancy candidate at ICAB, and web developer based in Dhaka, Bangladesh.

  ## Primary Pages
  - [Professional Profile](https://shahoriar.bd/ai): Machine-readable professional profile detailing experience, education, projects, and skills.
  - [Curriculum Vitae](https://shahoriar.bd/resume.md): Complete chronological markdown resume.
  - [Portfolio](https://shahoriar.bd): Main homepage and executive overview.
  - [Skills & Certifications](https://shahoriar.bd/skills): Workplace history, technical stack, and verified CA/CFI credentials.
  - [Life Journey](https://shahoriar.bd/life): Articles, career milestones, and technical essays.
  - [Projects](https://shahoriar.bd/projects): Technical project catalog and software tools.
  - [Contact](https://shahoriar.bd/contact): Professional contact endpoints and calendar booking.
  ```

---

### 3. Harmonize Root Canonical URL and Add Missing Canonicals
- **Target Files:** [app/page.tsx](file:///a:/zaifears-portfolio/app/page.tsx), [app/techtips/layout.tsx](file:///a:/zaifears-portfolio/app/techtips/layout.tsx), [app/ide/page.tsx](file:///a:/zaifears-portfolio/app/ide/page.tsx)
- **THINK (First Principle):** The canonical tag and the XML sitemap must declare the identical URL string. Divergence (e.g. `https://shahoriar.bd/` vs `https://shahoriar.bd`) introduces canonical ambiguity.
- **CONNECT-system (Dependencies):** None.
- **ACCEPT (Falsifiability):** Inspect HTML `link[rel="canonical"]` on the homepage and compare character-for-character with `<loc>` in `sitemap.xml`.
- **GROW (Leading Indicator):** Zero "Duplicate without user-selected canonical" alerts in Google Search Console.
- **Action:**
  In `app/page.tsx`:
  ```typescript
  alternates: {
    canonical: 'https://shahoriar.bd',
  },
  ```
  In `app/techtips/layout.tsx`:
  ```typescript
  alternates: {
    canonical: 'https://shahoriar.bd/techtips',
  },
  ```

---

### 4. Deploy Page-Level Open Graph & Twitter Cards on 7 Core Routes
- **Target Files:** `/skills`, `/education`, `/projects`, `/life`, `/ai`, `/contact`, `/design-portfolio`
- **THINK (First Principle):** Sharing pages on LinkedIn, Twitter, Discord, and Slack should render the page's exact focus and value proposition, not the generic root homepage snippet.
- **CONNECT-system (Dependencies):** Enhances social sharing CTR and organic referral traffic.
- **ACCEPT (Falsifiability):** Test URLs in LinkedIn Post Inspector or Twitter Card Validator; cards must show specific page titles.
- **GROW (Leading Indicator):** Increased social referral sessions in analytics.

---

## Phase 2: On-Page Architecture & Accessibility (Week 1)

### 5. Populate Meaningful Alt Text for 40+ App Logos on `/techtips`
- **Target File:** [app/techtips/page.tsx](file:///a:/zaifears-portfolio/app/techtips/page.tsx)
- **THINK (First Principle):** Logos that identify tools and applications are non-decorative and convey essential meaning. Empty alt text hides them from screen readers and image search engines.
- **CONNECT-system (Dependencies):** Fixes a11y audit and boosts Google Image search indexing for curated utilities.
- **ACCEPT (Falsifiability):** Run `scratch/audit_images.py`; empty alt count on `/techtips` must be zero.
- **Action:**
  Change line 460 of `app/techtips/page.tsx`:
  ```tsx
  <Image
    src={`/techtips/${item.logo}`}
    alt={`${item.name} logo`}
    width={36}
    height={36}
    className="w-full h-full object-contain rounded-md"
  />
  ```

---

### 6. Correct Heading Hierarchies Across `/projects` and `/design-portfolio`
- **Target Files:** [app/projects/ProjectsContent.tsx](file:///a:/zaifears-portfolio/app/projects/ProjectsContent.tsx), [app/design-portfolio/page.tsx](file:///a:/zaifears-portfolio/app/design-portfolio/page.tsx)
- **THINK (First Principle):** Accessible documents follow a strict, contiguous heading order (H1 → H2 → H3). Skipping levels degrades accessibility score and semantic comprehension.
- **CONNECT-system (Dependencies):** Pairs with Phase 1 blog post heading fix.
- **ACCEPT (Falsifiability):** Run `python claude-seo run parse_html.py <url> --json`; verify no skipped heading levels.
- **Action:**
  - In `ProjectsContent.tsx`: Add an `<h2>Featured Applications</h2>` and `<h2>Internal Tools & Automation</h2>` before the `<h3>` cards.
  - In `DesignPortfolioPage`: Wrap or replace the top component heading with `<h1 className="...">Design Portfolio</h1>`.

---

### 7. Clean Up Homepage H1 Concatenation
- **Target File:** [app/components/HeroSection.tsx](file:///a:/zaifears-portfolio/app/components/HeroSection.tsx)
- **THINK (First Principle):** Crawlers extract all text content inside `<h1>`. Duplicating name in an `sr-only` span right next to visual spans creates corrupted concatenated text.
- **CONNECT-system (Dependencies):** Improves Google knowledge graph entity matching for "Md Al Shahoriar Hossain".
- **ACCEPT (Falsifiability):** `parse_html.py` on the homepage returns `["Md Al Shahoriar Hossain"]`, not `["Md Al Shahoriar HossainMD ALSHAHORIARHossain"]`.

---

### 8. Update `sitemap.ts` and `robots.ts` Consistency
- **Target Files:** [app/sitemap.ts](file:///a:/zaifears-portfolio/app/sitemap.ts), [app/robots.ts](file:///a:/zaifears-portfolio/app/robots.ts), [app/meetup/layout.tsx](file:///a:/zaifears-portfolio/app/meetup/layout.tsx)
- **THINK (First Principle):** Search crawlers should be directed only to clean, public indexable pages. Private or standalone microsites should be consistently disallowed in `robots.txt`.
- **CONNECT-system (Dependencies):** Protects crawl budget on Vercel deployment.
- **Action:**
  - Add `/projects/locreminder/policy` to `sitemap.ts`.
  - Add `/shoily`, `/bizcomp`, and `/meetup` to `disallow` in `robots.ts`.
  - Fix corrupted UTF-8 replacement character in `app/meetup/layout.tsx` title.

---

## Phase 3: Performance & Image Consolidation (Weeks 2–3)

### 9. Localize External ImgBB Images
- **Target Files:** [app/skills/SkillsTabs.tsx](file:///a:/zaifears-portfolio/app/skills/SkillsTabs.tsx), [app/projects/tapo-viewer/page.tsx](file:///a:/zaifears-portfolio/app/projects/tapo-viewer/page.tsx)
- **THINK (First Principle):** Relying on third-party image hosts (`i.ibb.co.com`) adds external DNS lookups, creates connection overhead, and risks broken images if the host throttles or deletes files.
- **CONNECT-system (Dependencies):** Eliminates external dependencies and speeds up LCP.
- **ACCEPT (Falsifiability):** Grep codebase for `i.ibb.co.com`; occurrences must be zero.
- **Action:**
  Save images under `/public/images/` and update references to local relative paths.

---

### 10. Implement Speculation Rules API & Hero `fetchpriority="high"`
- **Target Files:** [app/layout.tsx](file:///a:/zaifears-portfolio/app/layout.tsx), [app/components/HeroSection.tsx](file:///a:/zaifears-portfolio/app/components/HeroSection.tsx)
- **THINK (First Principle):** Chrome 121+ Speculation Rules allow zero-latency instant navigation by prerendering high-probability pathways before click.
- **CONNECT-system (Dependencies):** Boosts `preload_check.py` score from 50 to 100.
- **ACCEPT (Falsifiability):** Run `python claude-seo run preload_check.py https://shahoriar.bd --json`; score should reach 100.
- **Action:**
  Add to `<head>`:
  ```html
  <script type="speculationrules">
  {
    "prerender": [
      {
        "source": "list",
        "urls": ["/skills", "/projects", "/life", "/ai"]
      }
    ]
  }
  </script>
  ```
  And add `fetchpriority="high"` to the hero `<Image>` in `HeroSection.tsx`.

---

## Phase 4: SXO & Structured Data Expansion (Month 1)

### 11. Add Visible Resume Link in Primary Navigation (SXO)
- **Target Files:** [app/components/nav.tsx](file:///a:/zaifears-portfolio/app/components/nav.tsx), [app/components/HeroSection.tsx](file:///a:/zaifears-portfolio/app/components/HeroSection.tsx)
- **THINK (First Principle):** Recruiters and hiring managers spend an average of 6–10 seconds evaluating a portfolio. Forcing them to find a text link at the very bottom under "For AI Systems" is high friction.
- **CONNECT-system (Dependencies):** Dramatically improves recruiter conversion rate.
- **ACCEPT (Falsifiability):** Nav and Hero have a visible "CV" or "Resume" link accessible within 1 click above the fold.
- **GROW (Leading Indicator):** Track `/resume.md` download/view events in Microsoft Clarity and Vercel Analytics.

---

### 12. Expand Schema Graph (`ContactPage`, `Credential`, `CollectionPage`)
- **Target Files:** [app/contact/page.tsx](file:///a:/zaifears-portfolio/app/contact/page.tsx), [app/skills/page.tsx](file:///a:/zaifears-portfolio/app/skills/page.tsx), [app/life/page.tsx](file:///a:/zaifears-portfolio/app/life/page.tsx)
- **THINK (First Principle):** Richer Schema.org entity relationships help Google's Knowledge Graph connect qualifications, contact methods, and articles.
- **CONNECT-system (Dependencies):** Pairs with root `Person` schema (`@id: https://shahoriar.bd/#person`).
- **ACCEPT (Falsifiability):** Validate pages with Google Rich Results Test without errors or warnings.
