import { ogSize, renderHallmarkOgCard } from '@/lib/ogCard';

export const alt = 'Education and Qualifications: Md Al Shahoriar Hossain';
export const size = ogSize;
export const contentType = 'image/png';

export default async function Image() {
  return renderHallmarkOgCard({
    routePill: 'shahoriar.bd/education',
    tagPill: 'Academic Background',
    headline: 'Education and Qualifications',
    headlineSize: '96px',
  });
}
