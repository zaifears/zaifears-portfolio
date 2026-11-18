import { ogSize, renderHallmarkOgCard } from '@/lib/ogCard';

export const alt = 'Tech Tips and Utilities: Md Al Shahoriar Hossain';
export const size = ogSize;
export const contentType = 'image/png';

export default async function Image() {
  return renderHallmarkOgCard({
    routePill: 'shahoriar.bd/techtips',
    tagPill: 'Curated Toolkit',
    headline: 'Tech Tips and Utilities',
    headlineSize: '102px',
  });
}
