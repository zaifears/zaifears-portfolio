# Performance & Core Web Vitals (CWV) Audit: shahoriar.bd

## Status Summary
- **Category Score:** 90 / 100
- **Status:** Fast Next.js Turbopack/Vercel Stack, Clean Layout, Speculation Opportunity

---

## 1. Core Web Vitals Static Assessment
- **LCP (Largest Contentful Paint):**
  - Hero image in `HeroSection.tsx` is marked with `priority={true}` and responsive `sizes`.
  - Opportunity: Add explicit `fetchpriority="high"` attribute to ensure priority scheduling by the browser preload scanner before JavaScript hydrations.
- **INP (Interaction to Next Paint):**
  - Zero heavy third-party render-blocking scripts.
  - Microsoft Clarity analytics script is deferred via `requestIdleCallback` (3000ms fallback).
  - All interactive controls are native semantic elements with lightweight Framer Motion transitions.
- **CLS (Cumulative Layout Shift):**
  - Zero layout shifts detected (`analyze_visual.py`).
  - Next.js font optimization (`GeistSans`, `GeistMono`) prevents FOIT/FOUT.
  - Next.js `<Image>` components reserve exact aspect ratios and dimensions.

---

## 2. Speculation Rules & Modern Preload
- **`preload_check.py` Result:** Score **50 / 100**.
  - Current state: 0 speculation rules inline blocks or headers.
  - Recommendation: Implement the Speculation Rules API (supported in Chrome 121+) to allow instant prefetching and prerendering for frequent user pathways (`/skills`, `/projects`, `/life`, `/ai`).
