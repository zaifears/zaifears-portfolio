'use client'; // This component needs to be a Client Component to check the URL

import { usePathname } from 'next/navigation';
import { Navbar } from '@/app/components/nav';

export default function LayoutWrapper({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();
  
  // Check if the current path starts with /bizcomp (matches /bizcomp and all child routes)
  const isBizCompPage = pathname.startsWith('/bizcomp');

  return (
    <>
      {isBizCompPage ? (
        // If we're on any /bizcomp route, render without navbar
        <>{children}</>
      ) : (
        // On all other pages, render the default layout with the navbar
        <div className="flex min-h-screen">
          <Navbar />
          <main className="flex-1 p-4 md:p-8 pb-20 md:pb-8">
            {children}
          </main>
        </div>
      )}
    </>
  );
}
