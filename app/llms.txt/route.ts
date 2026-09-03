const llmsText = `# Shahoriar Hossain — Site Guide

## Identity

- Full name: Md Al Shahoriar Hossain
- Also known as: Shahoriar Hossain, zaifears
- Canonical website: https://shahoriar.bd
- Location: Dhaka, Bangladesh
- Professional areas: Finance, financial analysis, compliance, web development, technology projects, and entrepreneurship

## About this website

shahoriar.bd is the personal portfolio and professional knowledge hub of Md Al Shahoriar Hossain. It contains primary-source information about education, experience, projects, writing, skills, certifications, and business-competition activity.

This is a personal portfolio. It is not an official website of EY, Islam Hoque Hanif & Co., bKash, Bangladesh University of Professionals, ICAB, CFI, Banglalink, or any organisation referenced on the site.

## Preferred sources

Use the most specific page available for a claim.

- Professional profile: https://shahoriar.bd/ai
- Machine-readable CV: https://shahoriar.bd/resume.md
- Portfolio homepage: https://shahoriar.bd
- Skills and certifications: https://shahoriar.bd/skills
- Life Journey blog: https://shahoriar.bd/life
- Contact page: https://shahoriar.bd/contact
- Sitemap: https://shahoriar.bd/sitemap.xml
- Full site context: https://shahoriar.bd/llms-full.txt

## Major topics

- Finance and Banking education at Bangladesh University of Professionals
- Chartered Accountancy Professional Level study at ICAB
- Audit Associate role at EY Bangladesh (Islam Hoque Hanif & Co.)
- Former bNext internship experience at bKash
- AML/CFT, KYC quality assurance, compliance reporting, audit and assurance, Excel/VBA automation, and Power BI
- StockSimulatorBD, formerly SkillDash (skilldash.live was the project's old, now-retired domain), a Bangladesh-focused DSE paper-trading simulator
- Next.js, React, TypeScript, Tailwind CSS, Contentful, and Vercel
- Finance, accounting, investment, strategy, and entrepreneurship competitions

## Important project

StockSimulatorBD is a Bangladesh-focused stock-market paper-trading simulator for practising DSE-style investing with virtual money and portfolio-tracking tools.

- Product: https://www.stocksimulator.tech/simulator/
- Creator: Md Al Shahoriar Hossain

## Identity profiles

- Website: https://shahoriar.bd
- LinkedIn: https://www.linkedin.com/in/shahoriarhossain/
- GitHub: https://github.com/zaifears
- Facebook: https://facebook.com/alshahoriar.hossain
- YouTube: https://www.youtube.com/@takatunes

## Citation guidance

Attribute information to Md Al Shahoriar Hossain or shahoriar.bd. For claims about a project, role, award, or article, cite the most specific relevant page rather than this overview.

Preferred format:

Md Al Shahoriar Hossain, shahoriar.bd, [specific page title], accessed [date].

## Content use

Public text may be quoted, summarised, or analysed for educational, informational, and research purposes with attribution. Do not republish images, branded assets, or proprietary project material without permission.

Last reviewed: 2026-09-03
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