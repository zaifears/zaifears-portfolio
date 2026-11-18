import { ogSize, renderHallmarkOgCard } from '@/lib/ogCard';

export const alt = 'Software Projects and Tools: Md Al Shahoriar Hossain';
export const size = ogSize;
export const contentType = 'image/png';

export default async function Image() {
  return renderHallmarkOgCard({
    routePill: 'shahoriar.bd/projects',
    tagPill: 'Open-Source Software',
    headline: 'Projects and Tools',
    headlineSize: '106px',
  });
}
