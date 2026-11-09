'use client'; // This component needs to be a Client Component to check the URL

import { usePathname } from 'next/navigation';
import { Navbar } from '@/app/components/nav';

export default function LayoutWrapper({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();

  // Full-screen routes bypass the default site shell (navbar + shifted main content).
  const isFullScreenPage =
    pathname.startsWith('/bizcomp') ||
    pathname.startsWith('/meetup') ||
    pathname.startsWith('/zakat-calulation') ||
    pathname.startsWith('/zakat-calculation') ||
    pathname.startsWith('/zakat-report');

  return (
    <>
      {isFullScreenPage ? (
        // If we're on a full-screen route, render without navbar
        <>{children}</>
      ) : (
        // On all other pages, render the default layout with the navbar.
        // `.site` scopes the blue/black palette and the rounded corner scale (see tokens.css).
        <div className="site min-h-screen bg-paper text-ink">
          <Navbar />
          <main className="md:ml-68 p-4 md:p-8 pb-28 md:pb-8">
            {children}
          </main>
        </div>
      )}
    </>
  );
}
