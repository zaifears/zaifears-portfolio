# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## What this repo is

The personal portfolio + professional web presence of Md Al Shahoriar Hossain (site: `shahoriar.bd`), plus a grab-bag of unrelated internal tools and one-off mini web apps that live under the same Next.js deployment. Read the "Standalone feature routes" section before assuming any change generalizes across routes — most routes are islands.

## Commands

```bash
pnpm install       # install deps — use pnpm only, never npm/yarn (no package-lock.json is committed)
pnpm dev           # start dev server (Turbopack)
pnpm build         # production build (this is also the only type-check step — no separate `tsc --noEmit` or lint script exists)
pnpm start         # run production build
pnpm test          # run tests/**/*.test.ts via node's built-in test runner (--import tsx)
```

Run a single test file directly: `node --import tsx --test tests/bangla-input.test.ts`

There is currently only one test file ([tests/bangla-input.test.ts](tests/bangla-input.test.ts)), covering the Bangla-input helpers in `lib/`. There is no ESLint/Prettier config in the repo — don't assume a lint step exists.

### Environment variables actually in use

`.env.example` only documents Pusher keys and is stale/incomplete — the real `.env.local` (untracked) additionally sets `CONTENTFUL_ACCESS_TOKEN`, `CONTENTFUL_SPACE_ID` (required — the site fails Contentful fetches without them, see below), `KV_REST_API_*`/`KV_URL`/`REDIS_URL` (Vercel KV/Redis), `LIVE_TEXT_PASSWORD`, and `TELEGRAM_BOT_TOKEN`. If you add a feature needing a new env var, update `.env.example` too since it's the only local reference.

## Root layout & site-wide SEO machinery

[app/layout.tsx](app/layout.tsx) is heavy: it defines the global `<html>`/`<body>` shell, Geist fonts, Vercel Analytics/SpeedInsights, a service-worker registration script (`/sw.js`), and two site-wide JSON-LD blocks (`Person` and `WebSite` schema, both keyed off `@id: https://shahoriar.bd/#person`) that every page inherits. Individual pages layer their own JSON-LD on top (e.g. `BreadcrumbList`, `BlogPosting`, `FAQPage`, `SoftwareApplication` — see [app/page.tsx](app/page.tsx) and [app/life/[slug]/page.tsx](app/life/[slug]/page.tsx) for examples). When adding a new indexable page, follow this pattern: page-level `metadata` export with `alternates.canonical`, plus a relevant JSON-LD `<script>` block if the content type warrants one.

The site is explicitly tuned for LLM/AI discoverability, not just classic SEO:
- [app/ai/page.tsx](app/ai/page.tsx) is a machine-readable profile page (`/ai`) meant to be the canonical source for AI systems answering questions about the site owner.
- [app/llms.txt/route.ts](app/llms.txt/route.ts) serves a plain-text site guide at `/llms.txt` (there's also an `/llms-full.txt` referenced from it, plus a `/resume.md`).
- [next.config.js](next.config.js) injects a `Link: </llms.txt>; rel="llms-txt", </llms-full.txt>; rel="llms-full-txt"` header on every response, and permanently redirects `/llm.txt` → `/llms.txt`.

[app/sitemap.ts](app/sitemap.ts) and [app/robots.ts](app/robots.ts) both hardcode the route list rather than deriving it from the filesystem — if you add or remove a top-level indexable page, update both by hand. Both explicitly exclude the Zakat tools (`/zakat-calculation`, `/zakat-report`) and `robots.ts` also disallows `/bride-selector` — these are private/internal tools, not portfolio content, despite being publicly reachable.

## Layout shell: full-screen routes bypass the navbar

[app/LayoutWrapper.tsx](app/LayoutWrapper.tsx) (client component) decides per-route whether to render the sidebar/bottom-nav shell ([app/components/nav.tsx](app/components/nav.tsx)) around `children`, or render `children` completely bare. Routes under `/bizcomp`, `/meetup`, `/zakat-calculation`, and `/zakat-report` render full-screen with no nav — they're self-contained apps with their own chrome. (There's also a dead `/zakat-calulation` typo-prefix check in that same condition; harmless since the correctly-spelled route is also listed, but don't be surprised by it if you search for route-bypass logic.) If you add a new full-screen mini-app, add its path prefix to `isFullScreenPage` here.

[app/components/nav.tsx](app/components/nav.tsx) renders two different UIs from one `navItems` array: a fixed left sidebar on desktop (`md:` and up) and a floating glass-pill bottom bar on mobile. Nav items can be marked `desktopOnly` (used for the external `cal.com/zaifears` scheduling link, which the mobile bar filters out).

## Contentful CMS layer

[lib/contentfulClient.ts](lib/contentfulClient.ts) wraps the Contentful SDK: it suppresses a Node `DEP0169` deprecation warning from the SDK's internal `url.parse()` use, and wraps every call in `withRetry` (retries up to twice with exponential backoff, but only for 5xx/network errors — 4xx errors are not retried). Always fetch content through the exported `getContentfulEntries`, never instantiate `contentfulClient` calls directly, so retry behavior stays consistent. If `CONTENTFUL_SPACE_ID`/`CONTENTFUL_ACCESS_TOKEN` are missing it logs an error and creates a client with empty strings rather than throwing — pages using it degrade to empty-content states instead of crashing (see the `try/catch → return []` pattern in `getCertificates` and `getLifeEvent`).

Two Contentful content types are consumed today:
- **`zaifearsBlogPost`** — powers `/life` (index) and `/life/[slug]` (detail). The detail page ([app/life/[slug]/page.tsx](app/life/[slug]/page.tsx)) renders Contentful rich text via `@contentful/rich-text-react-renderer` with custom `renderNode` handlers for embedded YouTube video entries and embedded image assets, computes reading time from `documentToPlainTextString`, and builds full `BlogPosting`+`BreadcrumbList` JSON-LD. It sets `export const revalidate = 60` (ISR) and implements `generateStaticParams`/`generateMetadata`.
- **`certificate`** — powers the "Certifications" tab on `/skills` (see [app/skills/page.tsx](app/skills/page.tsx) → [app/skills/SkillsTabs.tsx](app/skills/SkillsTabs.tsx)).

[app/api/revalidate/route.ts](app/api/revalidate/route.ts) is an on-demand ISR webhook (intended to be called by a Contentful "publish" webhook): POST with `{ path }` revalidates that path, or with no body revalidates `/`, `/skills`, `/life` as a default set. It has no auth/signature check on the request — worth knowing if you're asked to harden it.

`/skills` itself is mostly hardcoded content ([app/skills/SkillsTabs.tsx](app/skills/SkillsTabs.tsx) — workplace timeline, technical skills, core competencies are literal arrays in the component) with only the Certifications tab and the sibling `/design-portfolio` content ([app/design-portfolio/PortfolioContent.tsx](app/design-portfolio/PortfolioContent.tsx), reused inside a `SkillsTabs` tab) coming from elsewhere. `/education` ([app/education/page.tsx](app/education/page.tsx)) is fully static/hardcoded, no CMS.

## The Zakat tools — three separate systems, only two actually wired up

This is the most likely place to get confused, because there are **three** distinct Zakat-related state models in the tree and only two are reachable from a page:

1. **`/zakat-calculation`** ([app/zakat-calculation/page.tsx](app/zakat-calculation/page.tsx)) — the live, working calculator. Single client component with its own local `useState` (business info + `assets`/`liabilities` line-item arrays, switching presets based on `clientType: 'institution' | 'person'`). Computes totals client-side (2.5%, 2.577%, 2.6% zakat rate cards) and POSTs to [app/api/export/route.ts](app/api/export/route.ts) to download a generated `.xlsx` via `exceljs`. Client-side validation flags invalid numeric cells (`amountStatus: 'valid'|'invalid'|null`) before allowing export, and shows a copyable debug code block if the export request fails.

2. **`/zakat-report`** ([app/zakat-report/page.tsx](app/zakat-report/page.tsx)) — a different tool: a form that generates a Bangla-language Word document from a template. POSTs to [app/api/generate-zakat-report/route.ts](app/api/generate-zakat-report/route.ts), which fills `public/template/Zakat_Report_Professional.docx` via `docxtemplater`+`pizzip` (template is cached in-process after first read: `templateBufferCache`). Client name and other free-text fields may arrive in Bijoy ANSI (legacy Bangla keyboard encoding) rather than Unicode — [lib/banglaInput.ts](lib/banglaInput.ts) detects which (`detectBanglaInputMethod`) and [lib/banglaServer.ts](lib/banglaServer.ts) (`autoConvertBijoyAnsiToUnicode`) converts it server-side before templating. This route has its own field-by-field required/optional/pattern validation (`REQUIRED_FIELDS`, `TIMELINE_PATTERN`, `JAKAT_RATE_PATTERN`, etc.) and a separate `types.ts`/`utils.ts` local to `app/zakat-report/`.

3. **Orphaned code** — [app/zakat-calculation/state.ts](app/zakat-calculation/state.ts) (a `zakatReducer` with `HYDRATE_STATE`/`ADD_ROW`/`UPDATE_ROW`/etc.), [app/zakat-calculation/lib/types.ts](app/zakat-calculation/lib/types.ts), [lib/calculations.ts](app/zakat-calculation/lib/calculations.ts), [lib/defaultState.ts](app/zakat-calculation/lib/defaultState.ts), and the whole [app/zakat-calculation/components/](app/zakat-calculation/components/) directory (`ClientInfoTab`, `GoldSilverTab`, `CashBankTab`, `OtherAssetsTab`, `DebtsTab`, `SummaryTab`, `TabBar`, `StickyFooter`, `CellInput`, `NumberInput`, `SummaryPrimitives`) implement a more elaborate multi-tab spreadsheet-style calculator (separate Gold/Silver, Cash/Bank, Other Assets, Debts sheets feeding into a Summary tab). **None of this is imported by `app/zakat-calculation/page.tsx`** — confirmed by grep, nothing in `app/` references `zakatReducer` or any `*Tab.tsx` outside that same orphaned set. Treat this as either dead code or a not-yet-integrated in-progress feature; don't assume editing it affects the live `/zakat-calculation` page, and check with whoever's driving the task before deleting or resurrecting it.

Both Zakat tools render full-screen (no navbar, see above), are excluded from the sitemap, and are `disallow`ed in robots.txt — they're internal/client tools embedded in the public site, not portfolio content. [app/components/QuickCalculator.tsx](app/components/QuickCalculator.tsx) (a floating pocket calculator with localStorage-persisted history, key `zakatQuickCalculatorHistoryV1`) is shared between both `/zakat-calculation` and `/zakat-report`.

## Standalone feature routes (independent of everything above)

Each of these is its own self-contained app with its own `layout.tsx`/components and no shared state with the rest of the site — don't assume conventions from one carry into another:

- **`app/bizcomp/*`** — separate business-competition microsites, each its own thing: `accfinity` (with `r2`/`r3` sub-rounds and a `product-page`), `btm-iut` (with `explore`/`quiz`/`shop`/`why-us` sections), `capitalizer` (`r2`/`finale`), `excelerate` (`r2`). These read as competition-specific landing/tool pages built for specific events, not a shared "bizcomp framework."
- **`app/bride-selector`** — standalone tool, deliberately excluded from robots.txt indexing.
- **`app/ide`**, **`app/meetup`**, **`app/techtips`** — independent single-page routes.
- **`app/utils/cybersecly`** — effectively dead: it contains only a `MOVED.md` stub saying its contents moved to `app/bizcomp/technopreneurship/utils/`, but that directory **does not currently exist** in this repo. Don't go looking for "CyLink" functionality expecting to find it live.

## UI primitives & theming

[app/components/ui/](app/components/ui/) holds small shadcn-style primitives (`alert`, `badge`, `button`, `card`, `progress`) built on Tailwind color tokens defined in [tailwind.config.js](tailwind.config.js) (`border`, `ring`, `primary`, `secondary`, `muted`, `accent`, `card`, `popover`, `destructive`, all HSL-based). Dark mode is class-based (`dark:` variants throughout, toggled via `next-themes`), not the shadcn CSS-variable-driven light/dark scheme — components hardcode `dark:` Tailwind classes rather than swapping CSS custom properties. [app/global.css](app/global.css) additionally defines the MDX/prose syntax-highlighting palette (`--sh-*` variables, swapped under `.dark:root`), the animated-blob background keyframes (`animate-blob`, used behind several page heroes), and disables text selection on `html` while re-enabling it on `body` (a deliberate mobile UX choice — don't "fix" this thinking it's a bug).

## Path alias

`@/*` maps to the repo root (see [tsconfig.json](tsconfig.json)), e.g. `@/lib/contentfulClient`. Routes inside `app/` also freely use relative imports (`../../../lib/banglaInput`) — both styles coexist, follow whichever the file you're editing already uses.
