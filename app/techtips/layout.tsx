import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Tech Tips & Utilities',
  description: 'Curated apps, scripts, extensions, and websites for a faster, safer workflow.',
  alternates: {
    canonical: 'https://shahoriar.bd/techtips',
  },
};

export default function TechTipsLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}