import { ogSize, renderHallmarkOgCard } from '@/lib/ogCard';

export const alt =
  'Bangladesh Youth Tax Calculator: AI Agent Skill & e-Return Filing Engine';
export const size = ogSize;
export const contentType = 'image/png';

export default async function Image() {
  return renderHallmarkOgCard({
    routePill: 'shahoriar.bd/projects/youth-tax-calculator',
    tagPill: 'Income Tax Act 2023',
    headline: 'Youth Tax Calculator',
    headlineSize: '96px',
    publicAssetPath: 'projects/youth-tax-calculator/BD-Logos.png',
    imageFit: 'logo',
    footerTitle: 'Bangladesh e-Return (etaxnbr.gov.bd) Engine',
    footerSubtitle: 'Zero-Difference IT-10B Balance Sheet & Student Tax Exemptions',
  });
}
