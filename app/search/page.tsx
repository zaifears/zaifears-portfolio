"use client"; // This is a client component as it uses hooks

import { useSearchParams } from 'next/navigation'; // Import useSearchParams to get query from URL
import Link from 'next/link';
import { useEffect, useState } from 'react';

// Define a type for your search results
interface SearchResult {
  title: string;
  description: string;
  path: string;
  content: string; // The content that will be searched
}

// Mock data representing content from your pages.
// In a real application, this might come from a local JSON file,
// or a pre-indexed search data generated at build time.
const searchableContent: SearchResult[] = [
  {
    title: "Welcome to My Portfolio",
    description: "This is the homepage of my portfolio, showcasing my journey and projects.",
    path: "/",
    content: "Welcome to my portfolio! Here you'll find information about my skills, education, and projects. I'm passionate about technology and learning new things. This site was built with the help of AI and hosted on Vercel."
  },
  {
    title: "My Education Journey",
    description: "Details about my academic background and learning experiences.",
    path: "/education",
    content: "My educational background includes degrees in computer science and certifications in various programming languages. I've focused on data structures, algorithms, and software engineering principles. Continuous learning is a core part of my philosophy."
  },
  {
    title: "Skills and Expertise",
    description: "A list of my technical and soft skills.",
    path: "/skills",
    content: "My technical skills include JavaScript, TypeScript, React, Next.js, Node.js, Python, and database management. I also possess strong problem-solving, communication, and teamwork skills, honed through various projects."
  },
  // Add more mock data for other pages/sections if you have them
];

export default function SearchPage() {
  const searchParams = useSearchParams();
  const searchQuery = searchParams.get('q') || ''; // Get the 'q' parameter from the URL
  const [results, setResults] = useState<SearchResult[]>([]);

  useEffect(() => {
    if (searchQuery) {
      const lowerCaseQuery = searchQuery.toLowerCase();
      const filteredResults = searchableContent.filter(item =>
        item.title.toLowerCase().includes(lowerCaseQuery) ||
        item.description.toLowerCase().includes(lowerCaseQuery) ||
        item.content.toLowerCase().includes(lowerCaseQuery) // Search within the content
      );
      setResults(filteredResults);
    } else {
      setResults([]); // Clear results if no query
    }
  }, [searchQuery]); // Re-run effect when searchQuery changes

  return (
    <div className="max-w-3xl mx-auto py-8 px-4">
      <h1 className="font-bold text-4xl md:text-5xl tracking-tight leading-tight mb-8">
        Search Results for "{searchQuery}"
      </h1>

      {searchQuery === '' ? (
        <p className="text-neutral-600 dark:text-neutral-400">Please enter a search query.</p>
      ) : results.length === 0 ? (
        <p className="text-neutral-600 dark:text-neutral-400">No results found for "{searchQuery}".</p>
      ) : (
        <div className="space-y-6">
          {results.map((result) => (
            <div key={result.path} className="border border-neutral-200 dark:border-neutral-800 rounded-lg p-4">
              <Link href={result.path} className="block hover:underline">
                <h2 className="text-xl font-semibold text-neutral-900 dark:text-neutral-100 mb-1">
                  {result.title}
                </h2>
                <p className="text-neutral-600 dark:text-neutral-400 text-sm">
                  {result.description}
                </p>
              </Link>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
