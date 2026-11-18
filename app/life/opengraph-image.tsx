import { ogSize, renderHallmarkOgCard } from '@/lib/ogCard';

export const alt = 'Life Journey and Blog: Md Al Shahoriar Hossain';
export const size = ogSize;
export const contentType = 'image/png';

export default async function Image() {
  return renderHallmarkOgCard({
    routePill: 'shahoriar.bd/life',
    tagPill: 'Personal Blog',
    headline: 'Life Journey',
    headlineSize: '116px',
  });
}
