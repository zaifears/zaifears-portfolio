import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Iftar Meetup 2026 — NDC2021A',
  description: 'Join us for the NDC2021A Iftar Meetup on 25th February 2026 at Dhaka University Swimming Pool. Happy Ramadan!',
  openGraph: {
    title: 'Iftar Meetup 2026 — NDC2021A',
    description: 'Join us for the NDC2021A Iftar Meetup on 25th February 2026 at Dhaka University Swimming Pool.',
    images: ['/meetup/ndc.png'],
  },
  robots: {
    index: false,
    follow: false,
    googleBot: {
      index: false,
      follow: false,
      'max-video-preview': -1,
      'max-image-preview': 'none',
      'max-snippet': -1,
    },
  },
};

export default function MeetupLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
