'use client'; // This component needs to be a Client Component to check the URL

import { usePathname } from 'next/navigation';
import { Navbar } from '@/app/components/nav'; // UPDATED: Changed path to use alias

export default function LayoutWrapper({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();
  const isBizCompPage = pathname === '/bizcomp';

  return (
    <>
      {isBizCompPage ? (
        // If we're on the /bizcomp page, just render the page content directly
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

