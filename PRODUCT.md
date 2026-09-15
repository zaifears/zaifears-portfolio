# Product

<!-- impeccable:product-schema 1 -->

## Platform

web

## Users

Dual-track audience:
1. Finance & accounting professionals (EY partners, ICAB members, corporate finance recruiters, bKash-type employers).
2. Tech leaders and engineering collaborators (software engineers, startup founders, open-source contributors).
3. Everyday users and learners of his tools (students practicing DSE trading via StockSimulatorBD, professionals using financial calculators and automations).

## Product Purpose

A personal portfolio, technical case study hub, and professional web presence for Md Al Shahoriar Hossain (`zaifears`), hosted at [shahoriar.bd](https://shahoriar.bd).
Success means a visitor leaves recognizing Shahoriar as an authentic problem solver who combines rigorous financial acumen (EY Bangladesh Audit Associate, BUP Finance graduate) with full-stack software development craft.

## Positioning

Shahoriar does not market himself as an agency or a generic "content creator" — he is a dedicated problem solver who builds production-grade financial platforms, mobile tools, and automations that solve real pain points for people without paywalls or ads.

## Operating Context

- Primary website: Next.js 16 App Router application deployed on Vercel at `shahoriar.bd`.
- Monorepo structure hosting the main portfolio, the `/thanks` support & remittance hub, and internal competition/utility microsites (`/bizcomp`, `/meetup`, `/zakat-*`).
- Layout structure: Desktop has fixed sidebar navigation (`md:ml-64` offset); mobile has bottom floating glass pill navigation.

## Capabilities and Constraints

- **Stack**: Next.js 16 (Turbopack, App Router), React 19, TypeScript, Tailwind CSS v4, FontAwesome, Lucide React, Framer Motion.
- **Tone**: Sincere, confident, humble, direct, first-person. No marketing hype, no corporate buzzword soup ("synergies", "thought leader"), and no "creator" labeling.
- **Public vs Private**:
  - Public portfolio routes: `/`, `/projects`, `/skills`, `/education`, `/techtips`, `/contact`, `/life`, `/thanks`.
  - Private/Internal tools: `/zakat-calculation`, `/zakat-report`, `/meetup`, `/bride-selector` (navbar-free, standalone utilities that should not be advertised as portfolio showcases).

## Brand Commitments

- **Name**: Md Al Shahoriar Hossain (short: Shahoriar; handle: `zaifears`).
- **Current Role**: Audit Associate at EY Bangladesh (Islam Hoque Hanif & Co.).
- **Former Role**: bKash — AML & CFT Department (bNext Intern).
- **Education**: BBA in Finance & Banking from Bangladesh University of Professionals (BUP).
- **Professional Qualification**: ICAB Professional Level candidate (do not say "Chartered Accountant" until qualified).
- **Flagship Software**: StockSimulatorBD (`stocksimulator.tech`) — DSE paper trading platform.
- **Competition Track Record**: 20+ national business competitions, including Champion at Excelerate 2025 (National Financial Excel & Power BI Competition).

## Evidence on Hand

- Real working tools: StockSimulatorBD (`https://stocksimulator.tech/simulator`), LocReminder Android app (`/projects/locreminder`), Zakat Calculator (`/zakat-calculation`).
- Real credentials: EY Bangladesh articleship, ICAB progress, BUP academic credentials, GitHub repository (`zaifears`).
- Real banking credentials on `/thanks`: Standard Chartered Bank Motijheel, A/C `18246161201`, SWIFT `SCBLBDDX`, Routing `215274247`, Call Centre `+880 96 66777111`.

## Product Principles

1. **Problem Solver First**: Never frame Shahoriar as an influencer or generic creator; lead with real problem-solving and utility.
2. **Dual-Threat Balance**: Finance rigor and software engineering excellence are equally weighted. Neither career track is subordinate.
3. **Restraint Over Noise**: Avoid badge soup, nested containers, and loud gradients. Clean typography, generous whitespace, and purposeful micro-interactions communicate competence.
4. **Zero-Friction Interactions**: Support flows, project navigation, and contact forms must remain direct, humble, and completely friction-free for the user.
5. **Truthful Representation**: Every claim, title, and metric must strictly reflect real, confirmed achievements.

## Accessibility & Inclusion

- Adherence to WCAG AA contrast standards (minimum 4.5:1 text contrast).
- Respect `prefers-reduced-motion` globally across all animations.
- Touch targets on mobile must maintain a minimum 44px hit area.
