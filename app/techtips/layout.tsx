import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Tech Tips & Utilities',
  description:
    'Curated collection of favorite software, productivity utilities, browser extensions, and developer scripts by Md Al Shahoriar Hossain.',
  openGraph: {
    title: 'Tech Tips & Utilities | Md Al Shahoriar Hossain',
    description:
      'Curated collection of favorite software, productivity utilities, browser extensions, and developer scripts by Md Al Shahoriar Hossain.',
    url: 'https://shahoriar.bd/techtips',
  },
};

export default function TechTipsLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}