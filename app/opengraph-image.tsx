import { ogSize, renderHallmarkOgCard } from '@/lib/ogCard';

export const alt = 'Md Al Shahoriar Hossain | Portfolio and Projects';
export const size = ogSize;
export const contentType = 'image/png';

export default async function Image() {
  return renderHallmarkOgCard({
    routePill: 'shahoriar.bd',
    tagPill: 'Portfolio and Projects',
    headline: 'Md Al Shahoriar Hossain',
    subtitle: 'Personal Blog about ongoing life',
    footerTitle: 'Financial Analysis, Web Development, Data Visualization',
    footerSubtitle:
      'Audit Associate at EY Bangladesh, CA Candidate (ICAB), BUP',
  });
}
