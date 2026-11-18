import { ogSize, renderHallmarkOgCard } from '@/lib/ogCard';

export const alt = 'Contact and Collaboration: Md Al Shahoriar Hossain';
export const size = ogSize;
export const contentType = 'image/png';

export default async function Image() {
  return renderHallmarkOgCard({
    routePill: 'shahoriar.bd/contact',
    tagPill: 'Get in Touch',
    headline: 'Contact and Collaboration',
    headlineSize: '98px',
  });
}
