"use client"; // This is required to use hooks like useState and useRouter

import Link from 'next/link';
import { useState } from 'react';
import { useRouter } from 'next/navigation'; // Import useRouter for navigation

const navItems = {
  '/': {
    name: 'Home',
  },
  '/education': {
    name: 'Education',
  },
  '/skills': {
    name: 'Skills',
  },
};

export function Navbar() {
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const router = useRouter(); // Initialize the router

  const handleSearch = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter' && searchQuery.trim() !== '') {
      // Navigate to the search results page with the query
      router.push(`/search?q=${encodeURIComponent(searchQuery.trim())}`);
      setIsSearchOpen(false); // Close search bar after navigation
      setSearchQuery(''); // Clear search query
    }
  };

  return (
    <aside className="sticky top-0 z-50 bg-white dark:bg-black -ml-[8px] mb-16 tracking-tight py-4 border-b border-neutral-200 dark:border-neutral-800">
      <nav
        className="flex flex-row items-center justify-between relative px-0 pb-0 fade md:overflow-auto scroll-pr-6"
        id="nav"
      >
        {/* Navigation Links */}
        {!isSearchOpen && (
          <div className="flex flex-row space-x-0 pr-10">
            {Object.entries(navItems).map(([path, { name }]) => (
              <Link
                key={path}
                href={path}
                className="transition-all hover:text-neutral-800 dark:hover:text-neutral-200 flex align-middle relative py-1 px-2"
              >
                {name}
              </Link>
            ))}
          </div>
        )}

        {/* Search Input Field */}
        {isSearchOpen && (
          <div className="w-full">
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              onKeyDown={handleSearch}
              placeholder="Search website..."
              className="w-full bg-transparent focus:outline-none focus:ring-0 text-lg"
              autoFocus
            />
          </div>
        )}

        {/* Search Toggle Button (Always visible now) */}
        <div className="flex items-center ml-auto">
          <button
            onClick={() => setIsSearchOpen(!isSearchOpen)}
            className="transition-all hover:text-neutral-800 dark:hover:text-neutral-200 p-2"
            aria-label="Toggle search"
          >
            {isSearchOpen ? (
              // Close Icon (X)
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-5 w-5"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M6 18L18 6M6 6l12 12"
                />
              </svg>
            ) : (
              // Search Icon
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-5 w-5"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                />
              </svg>
            )}
          </button>
        </div>
      </nav>
    </aside>
  );
}
