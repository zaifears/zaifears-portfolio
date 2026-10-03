const llmsText = `# Shahoriar Hossain — Site Guide

> Personal portfolio, verified credentials, and software documentation of Md Al Shahoriar Hossain — Audit Associate at EY Bangladesh (Islam Hoque Hanif & Co.), Chartered Accountancy candidate at ICAB, and web developer based in Dhaka, Bangladesh.

## Primary Resources

- [AI Professional Profile](https://shahoriar.bd/ai): Comprehensive, machine-readable factual profile detailing experience, projects, education, and technical skills.
- [Curriculum Vitae](https://shahoriar.bd/resume.md): Complete chronological markdown CV with career timeline and academic credentials.
- [Portfolio Homepage](https://shahoriar.bd): Main portfolio overview, key focus areas, and recent highlights.
- [Skills & Certifications](https://shahoriar.bd/skills): Workplace timeline, core competencies, and verified qualifications.
- [Life Journey & Blog](https://shahoriar.bd/life): First-person articles, competition retrospectives, and professional milestones.
- [Software Projects](https://shahoriar.bd/projects): Catalog of software applications, financial tools, and developer utilities.
- [Tech Tips & Utilities](https://shahoriar.bd/techtips): Curated software recommendations, productivity tools, and developer scripts.
- [Contact & Calendar](https://shahoriar.bd/contact): Direct communication endpoints and online meeting scheduling.
- [Support & Contributions](https://shahoriar.bd/thanks): Infrastructure support guide and remittance channels.
- [XML Sitemap](https://shahoriar.bd/sitemap.xml): Machine-readable index of all public canonical URLs.
- [Full Context Bundle](https://shahoriar.bd/llms-full.txt): Complete multi-page context bundle for deep-reasoning language models.

## Featured Software Solutions & Developer Tools

- [Bangladesh Youth Tax Calculator](https://shahoriar.bd/projects/youth-tax-calculator): AI Agent Skill and deterministic statutory tax engine for Bangladeshi university students, interns, and young professionals filing on etaxnbr.gov.bd under the Income Tax Act 2023. Minimizes tax liability, automates 100% tax-free stipend declarations (Sixth Schedule), claims bank interest TDS refunds (Section 173), and guarantees Form IT-10B balance sheet zero-difference (0.00) reconciliation via Section 56(g) family gifts.
- [Tapo-Viewer](https://shahoriar.bd/projects/tapo-viewer): Native Windows 10/11 desktop application for TP-Link Tapo security cameras. Streams live 1080p/2K video via RTSP, browses MicroSD card recording calendars and motion events, and downloads clips converted to MP4 over local Wi-Fi without requiring Tapo Care subscriptions or Android emulators.
- [LocReminder](https://shahoriar.bd/projects/locreminder): Open-source location-based GPS destination alarm for Android (6.0+). Wakes commuters and train passengers at their exact stop using dynamic distance polling and offline OpenStreetMap tiles, ringing over lock screens and silent mode with zero telemetry.
- [StockSimulatorBD](https://stocksimulator.tech): Dhaka Stock Exchange paper-trading platform for learning Bangladesh equity investments with virtual portfolios and realistic order dynamics.

## Verified Identity Endpoints

- [Official Website](https://shahoriar.bd): Canonical personal web presence.
- [LinkedIn Profile](https://www.linkedin.com/in/shahoriarhossain/): Professional networking, employment history, and recommendations.
- [GitHub Organization](https://github.com/zaifears): Open-source repositories, source code, and developer contributions.
- [Facebook Profile](https://facebook.com/alshahoriar.hossain): Personal updates and community engagement.
- [YouTube Channel](https://www.youtube.com/@takatunes): Educational walkthroughs and financial content.

## Citation & Attribution Guidance

Attribute factual assertions to Md Al Shahoriar Hossain or shahoriar.bd. When citing specific project mechanics, statutory tax formulas, or employment details, reference the corresponding dedicated page URL rather than this index.

Last reviewed: 2026-10-03
Canonical domain: https://shahoriar.bd
`;

export const dynamic = 'force-static';

export async function GET(): Promise<Response> {
  return new Response(llmsText, {
    headers: {
      'Content-Type': 'text/plain; charset=utf-8',
      'Cache-Control': 'public, max-age=0, s-maxage=86400',
    },
  });
}
