import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Online Python IDE & Code Runner',
  description:
    'Write, run, and test Python code online directly in your browser. Fast, interactive, and zero setup required.',
  alternates: {
    canonical: 'https://shahoriar.bd/ide',
  },
  openGraph: {
    title: 'Online Python IDE & Code Runner | Md Al Shahoriar Hossain',
    description:
      'Write, run, and test Python code online directly in your browser. Fast, interactive, and zero setup required.',
    url: 'https://shahoriar.bd/ide',
    siteName: 'Md Al Shahoriar Hossain',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Online Python IDE & Code Runner',
    description:
      'Write, run, and test Python code online directly in your browser.',
  },
};

export default function IDELayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
