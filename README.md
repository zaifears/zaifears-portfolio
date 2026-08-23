<div align="center">

  <img src="public/shahoriar_portfolio.png" alt="Md Al Shahoriar Hossain" width="130" style="border-radius: 50%;" />

  <h1>Md Al Shahoriar Hossain</h1>

  <p><strong>Finance & Banking • Chartered Accountancy Candidate • Software Developer</strong></p>

  <p>
    <a href="https://shahoriar.bd"><img src="https://img.shields.io/badge/🌐_Live_Site-shahoriar.bd-2563eb?style=for-the-badge" alt="Live Site" /></a>
    <a href="https://shahoriar.bd/projects"><img src="https://img.shields.io/badge/🚀_Projects-Explore_Work-1d4ed8?style=for-the-badge" alt="Projects" /></a>
    <a href="https://shahoriar.bd/contact"><img src="https://img.shields.io/badge/💬_Contact-Get_in_Touch-059669?style=for-the-badge" alt="Contact" /></a>
  </p>

  <p>
    <img src="https://img.shields.io/badge/Next.js-16.3-000000?style=flat-square&logo=nextdotjs&logoColor=white" alt="Next.js" />
    <img src="https://img.shields.io/badge/React-19-61DAFB?style=flat-square&logo=react&logoColor=black" alt="React" />
    <img src="https://img.shields.io/badge/TypeScript-5.9-3178C6?style=flat-square&logo=typescript&logoColor=white" alt="TypeScript" />
    <img src="https://img.shields.io/badge/Tailwind_CSS-v4-06B6D4?style=flat-square&logo=tailwindcss&logoColor=white" alt="Tailwind CSS" />
    <img src="https://img.shields.io/badge/Contentful-Headless_CMS-8A2BE2?style=flat-square&logo=contentful&logoColor=white" alt="Contentful" />
    <img src="https://img.shields.io/badge/Framer_Motion-12-0055FF?style=flat-square&logo=framer&logoColor=white" alt="Framer Motion" />
    <img src="https://img.shields.io/badge/Vercel-Deployed-000000?style=flat-square&logo=vercel&logoColor=white" alt="Vercel" />
    <img src="https://img.shields.io/badge/Package_Manager-pnpm-F69220?style=flat-square&logo=pnpm&logoColor=white" alt="pnpm" />
  </p>

  <p><em>Personal portfolio, shipped software showcase, and professional knowledge platform bridging corporate finance, risk compliance, and full-stack software development.</em></p>

</div>

---

## 📌 Overview

This repository houses the source code for [**shahoriar.bd**](https://shahoriar.bd) — the personal digital headquarters of **Md Al Shahoriar Hossain** (`zaifears`).

The site is built with a dual-track architecture designed to serve two primary audiences equally:
1. **Finance & Corporate Leadership** — Highlighting BBA studies in Finance & Banking at BUP, ICAB Chartered Accountancy qualifications, AML/CFT risk management at bKash, and 20+ national business competition victories (including Champion at *Excelerate 2025* and Runner-Up at *Accolyze 2025*).
2. **Technology & Engineering Employers** — Showcasing real shipped applications like **StockSimulatorBD** (Dhaka Stock Exchange paper trading platform), **LocReminder** (Flutter/Android offline GPS alarm), **AML/CFT Scraper**, and full-stack web applications.

---

## ✨ Key Surfaces & Features

| Route | Purpose & Description |
|---|---|
| [**`/` (Home)**](https://shahoriar.bd) | Editorial homepage featuring real-time Dhaka weather & live time widgets, interactive rotating skills carousel, Bento grid area navigation, flagship project spotlights, and In the Press national news features. |
| [**`/projects`**](https://shahoriar.bd/projects) | Dedicated engineering & tools showcase highlighting **StockSimulatorBD**, **LocReminder**, **Leave Tracker** (Excel VBA), and the Python-powered **AML/CFT Scraper**. |
| [**`/projects/locreminder`**](https://shahoriar.bd/projects/locreminder) | Product landing page and privacy policy for the LocReminder Android application with APK downloads, feature highlights, and permission transparency. |
| [**`/skills`**](https://shahoriar.bd/skills) | Tabbed interface covering workplace timeline (bKash, IFA Consultancy), technical capabilities (Power BI, Financial Modeling, Next.js, Stata, SPSS, Python AI automation), verified certifications with credentials, and design work. |
| [**`/education`**](https://shahoriar.bd/education) | Comprehensive academic profile spanning BUP (BBA in Finance & Banking), ICAB (Chartered Accountancy Certificate Level), Notre Dame College (HSC), and Ideal School & College (SSC). |
| [**`/life`** & **`/life/[slug]`**](https://shahoriar.bd/life) | Dynamic editorial journal powered by Contentful CMS, featuring rich-text typography, video embeds, image galleries, reading time estimates, and full Article schema. |
| [**`/bizcomp`**](https://shahoriar.bd/bizcomp) | Case study directory featuring financial models, interactive dashboards, and pitch decks from 20+ national business competitions. |
| [**`/contact`**](https://shahoriar.bd/contact) | Unified communication portal with direct social links and integrated Cal.com appointment scheduling. |
| [**`/ai`** & **`/llms.txt`**](https://shahoriar.bd/ai) | Machine-readable, structured semantic profiles formatted for LLM crawlers, search engines, and AI agents. |
| [**`/techtips`**](https://shahoriar.bd/techtips) | Curated collection of productivity utilities, PowerShell commands, browser extensions, and web tools. |
| [**`/ide`**](https://shahoriar.bd/ide) | Lightweight in-browser Python IDE for testing, running, and demonstrating Python automation scripts. |

---

## 🛠️ Architecture & Tech Stack

```
zaifears-portfolio
├── Framework: Next.js 16.3 (App Router with Turbopack)
├── UI Library: React 19 & TypeScript 5.9
├── Styling: Tailwind CSS v4 (@tailwindcss/postcss)
├── Motion: Framer Motion 12 (Hardware-accelerated animations)
├── Typography: Geist Sans & Geist Mono
├── Headless CMS: Contentful Delivery API (Incremental Static Regeneration)
├── Icons: Lucide React & FontAwesome 6
├── Charts: Chart.js & Recharts
├── Analytics: Vercel Analytics, Speed Insights & Microsoft Clarity
└── Package Manager: pnpm exclusively
```

---

## 📂 Project Structure

```
zaifears-portfolio/
├── app/
│   ├── ai/                      # Machine-readable AI profile & schemas
│   ├── api/                     # Serverless API routes (export, revalidate, zakat)
│   ├── bizcomp/                 # Business competition dashboards & microsites
│   ├── components/              # Shared UI components & layout elements
│   │   ├── BentoCard.tsx        # Action-oriented interactive bento cards
│   │   ├── FeaturedAreas.tsx    # Section navigation grid
│   │   ├── FeaturedPress.tsx    # National media mentions
│   │   ├── FeaturedProjects.tsx # Flagship project showcases
│   │   ├── HeroSection.tsx      # Main headline, rotating wheel & widgets
│   │   ├── LiveTime.tsx         # Dhaka live time clock
│   │   ├── Weather.tsx          # Real-time weather widget
│   │   └── nav.tsx              # Desktop sidebar & floating mobile pill nav
│   ├── contact/                 # Contact channels & Cal.com scheduling
│   ├── design-portfolio/        # Visual design and presentation slide showcase
│   ├── education/               # Academic degrees & qualifications
│   ├── ide/                     # In-browser Python IDE
│   ├── life/                    # Contentful blog index & [slug] dynamic post renderer
│   ├── projects/                # Shipped tools directory & LocReminder app page
│   ├── skills/                  # Tabbed skills, workplace timeline & certs
│   ├── techtips/                # Curated developer and productivity tools
│   ├── global.css               # Design tokens, custom scrollbars, animations
│   ├── layout.tsx               # Root layout, theme provider & analytics
│   ├── LayoutWrapper.tsx        # Conditional navigation frame wrapper
│   ├── llms.txt/page.tsx        # LLM text profile
│   ├── robots.ts                # Search engine crawler policies
│   └── sitemap.ts               # Dynamic XML sitemap generator
├── lib/
│   └── contentfulClient.ts      # Contentful headless CMS client
├── public/                      # Static assets, logos, and illustrations
├── DESIGN.md                    # Visual system, color tokens, and anti-pattern rules
├── PRODUCT.md                   # Brand truth, audience definition, and core facts
└── package.json                 # Dependencies and build scripts
```

---

## 🚀 Getting Started

### Prerequisites
* **Node.js**: `v20.x` or higher
* **Package Manager**: [`pnpm`](https://pnpm.io/) (`corepack enable pnpm`)

> **Note**: Always use `pnpm` for installing and managing dependencies. Do not use `npm` or `yarn`.

### Installation

1. **Clone the repository**:
   ```bash
   git clone https://github.com/zaifears/zaifears-portfolio.git
   cd zaifears-portfolio
   ```

2. **Install dependencies**:
   ```bash
   pnpm install
   ```

3. **Configure Environment Variables**:
   Create a `.env.local` file in the root directory:
   ```env
   CONTENTFUL_SPACE_ID=your_contentful_space_id
   CONTENTFUL_ACCESS_TOKEN=your_contentful_delivery_token
   OPENWEATHERMAP_API_KEY=your_openweathermap_api_key
   ```

4. **Run the development server**:
   ```bash
   pnpm dev
   ```
   Open [http://localhost:3000](http://localhost:3000) to view the site in your browser.

5. **Build for production**:
   ```bash
   pnpm build
   pnpm start
   ```

---

## 🎨 Design System & Standards

The user interface follows the **Impeccable Design System** documented in [`DESIGN.md`](./DESIGN.md) and [`PRODUCT.md`](./PRODUCT.md):

* **Single Accent Palette**: Precise `blue-600` primary accent with adaptive dark/light `gray-*` tokens via `next-themes`.
* **Typography Scale**: Clean pairing of `Geist Sans` for headings/editorial prose and `Geist Mono` for kickers, labels, and code blocks.
* **Layout Hierarchy**: Left-anchored reading flow harmonized with the desktop sidebar and responsive floating mobile pill navigation.
* **Performance**: Optimized hardware-accelerated transforms (`will-change-transform`), deferred widget hydration (`requestIdleCallback`), and Next.js Image optimization with responsive srcset sizes.

---

## 📬 Contact & Connect

* **Website**: [shahoriar.bd](https://shahoriar.bd)
* **Email**: [alshahoriar.hossain@gmail.com](mailto:alshahoriar.hossain@gmail.com)
* **LinkedIn**: [linkedin.com/in/shahoriarhossain](https://www.linkedin.com/in/shahoriarhossain/)
* **GitHub**: [@zaifears](https://github.com/zaifears)
* **YouTube**: [@takatunes](https://www.youtube.com/@takatunes)
* **Schedule a Meeting**: [cal.com/zaifears](https://cal.com/zaifears)

---

<div align="center">
  <sub>Designed & Developed by Md Al Shahoriar Hossain. Built with Next.js, React, and Tailwind CSS.</sub>
</div>
