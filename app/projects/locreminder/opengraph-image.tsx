import { ogSize, renderHallmarkOgCard } from '@/lib/ogCard';

export const alt = 'LocReminder: Location-Based GPS Alarm for Android';
export const size = ogSize;
export const contentType = 'image/png';

export default async function Image() {
  return renderHallmarkOgCard({
    routePill: 'shahoriar.bd/projects/locreminder',
    tagPill: 'Free Android GPS Alarm',
    headline: 'LocReminder',
    headlineSize: '108px',
    publicAssetPath: 'projects/locreminder/icon.png',
    imageFit: 'logo',
    footerTitle: 'Location-Based Alarm for Android',
    footerSubtitle: '100% Free & Open Source, Offline Maps, Zero Tracking',
  });
}
