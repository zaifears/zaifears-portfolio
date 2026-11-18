import { ogSize, renderHallmarkOgCard } from '@/lib/ogCard';

export const alt =
  'TapFeed (Tapo-Viewer): Free Tapo Camera App for PC and Windows 11/10';
export const size = ogSize;
export const contentType = 'image/png';

export default async function Image() {
  return renderHallmarkOgCard({
    routePill: 'shahoriar.bd/projects/tapfeed',
    tagPill: 'Free Windows 11 & 10 App',
    headline: 'TapFeed (Tapo-Viewer)',
    headlineSize: '96px',
    publicAssetPath: 'projects/tapfeed/TapFeed.png',
    imageFit: 'logo',
    footerTitle: 'Free & Open Source Tapo App for PC',
    footerSubtitle: 'Live HD View, PTZ Controls & MicroSD Downloads',
  });
}
