# Image SEO & Optimization Audit: shahoriar.bd

## Status Summary
- **Category Score:** 80 / 100
- **Status:** Automated WebP/AVIF Pipeline, but Empty Alt Attributes & External Hosting

---

## 1. Alt Attribute Audit
- **Empty Alt Attributes on `/techtips`:**
  - Automated regex and AST inspection identified that in [app/techtips/page.tsx](file:///a:/zaifears-portfolio/app/techtips/page.tsx), `ItemCard` renders over 40 software and utility logos with `alt=""`.
  - Empty `alt=""` marks images as purely decorative for assistive technologies and omits them from search image indexes.
  - **Fix:** Update line 460 to:
    ```tsx
    alt={`${item.name} logo`}
    ```

---

## 2. External Third-Party Hosting Dependencies
- In [app/skills/SkillsTabs.tsx](file:///a:/zaifears-portfolio/app/skills/SkillsTabs.tsx):
  `src: 'https://i.ibb.co.com/xtF7LGKn/EY-logo.png'`
- In [app/projects/tapo-viewer/page.tsx](file:///a:/zaifears-portfolio/app/projects/tapo-viewer/page.tsx):
  `https://i.ibb.co.com/SwnsYxYN/dashboard.png`
  `https://i.ibb.co.com/GyvfC3W/login.png`
- **Risk:** `i.ibb.co.com` is a free external host that may experience intermittent rate limiting, DNS latency, ad-blocker filtering, or broken image URLs.
- **Fix:** Download these images and serve them directly from `/public/images/`.
