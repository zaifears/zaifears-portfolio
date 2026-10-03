import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Tech Tips & Utilities',
  description:
    'Curated collection of favorite software, productivity utilities, browser extensions, and developer scripts by Md Al Shahoriar Hossain.',
  alternates: {
    canonical: 'https://shahoriar.bd/techtips',
  },
  openGraph: {
    title: 'Tech Tips & Utilities | Md Al Shahoriar Hossain',
    description:
      'Curated collection of favorite software, productivity utilities, browser extensions, and developer scripts by Md Al Shahoriar Hossain.',
    url: 'https://shahoriar.bd/techtips',
    siteName: 'Md Al Shahoriar Hossain',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Tech Tips & Utilities | Md Al Shahoriar Hossain',
    description:
      'Curated collection of favorite software, productivity utilities, browser extensions, and developer scripts by Md Al Shahoriar Hossain.',
  },
};

export default function TechTipsLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}