import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Bride Selector',
  robots: {
    index: false,
    follow: false,
  },
};

export default function BrideSelectorLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
