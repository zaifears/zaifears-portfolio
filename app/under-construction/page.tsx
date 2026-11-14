import type { Metadata } from 'next';
import UnderConstructionClient from './UnderConstructionClient';

export const metadata: Metadata = {
  title: 'Under Construction — StockSimulatorBD',
  description:
    'StockSimulatorBD is currently under construction. Thank you for staying with us. Set a Google Calendar reminder for Sunday at 10:00 AM BST.',
  alternates: {
    canonical: 'https://shahoriar.bd/under-construction',
  },
  robots: {
    index: false,
    follow: true,
  },
  openGraph: {
    title: 'Under Construction — StockSimulatorBD',
    description:
      'StockSimulatorBD is currently under construction. Thank you for staying with us. Set a Google Calendar reminder for Sunday at 10:00 AM BST.',
    url: 'https://shahoriar.bd/under-construction',
    type: 'website',
  },
  twitter: {
    card: 'summary',
    title: 'Under Construction — StockSimulatorBD',
    description:
      'StockSimulatorBD is currently under construction. Thank you for staying with us.',
  },
};

export default function UnderConstructionPage() {
  return <UnderConstructionClient />;
}
