import { ogSize, renderHallmarkOgCard } from '@/lib/ogCard';

export const alt = 'Skills and Certifications: Md Al Shahoriar Hossain';
export const size = ogSize;
export const contentType = 'image/png';

export default async function Image() {
  return renderHallmarkOgCard({
    routePill: 'shahoriar.bd/skills',
    tagPill: 'Experience and Credentials',
    headline: 'Skills and Certifications',
    headlineSize: '102px',
  });
}
