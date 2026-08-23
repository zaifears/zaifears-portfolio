import React from 'react';

export default function FeaturedPress() {
  const pressMentions = [
    {
      id: 1,
      publisher: "Business Inspection BD",
      title: "FINACT BRAC University Hosts Excelerate 2025 Excel Competition",
      url: "https://businessinspection.com.bd/finact-brac-university-hosts-excelerate-2025-excel-competition/"
    },
    {
      id: 2,
      publisher: "Bangladesh University of Professionals (BUP)",
      title: "A Team from the Department of Finance & Banking, BUP Secures First Runner-Up Position at Accolyze 2025",
      url: "https://bup.edu.bd/news/details/944"
    },
    {
      id: 3,
      publisher: "Bangladesh University of Professionals (BUP)",
      title: "BUP Finance and Banking Student Secures The First Runner-Up Position at Gigalogy Technopreneurship 2026",
      url: "https://bup.edu.bd/news/details/936"
    },
    {
      id: 4,
      publisher: "Bangladesh University of Professionals (BUP)",
      title: "Department of Finance & Banking Demonstrates Continued Excellence at Capitalizer 2026 with Second Runner-Up Achievement",
      url: "https://bup.edu.bd/news/details/1029"
    }
  ];

  return (
    <section className="px-4 md:px-8 max-w-7xl mx-auto py-20 border-t border-gray-200 dark:border-gray-800">
      <h2 className="text-2xl font-bold tracking-tight mb-6 text-gray-900 dark:text-white">
        In the Press
      </h2>
      <ul className="flex flex-col gap-4">
        {pressMentions.map((mention) => (
          <li key={mention.id} className="group">
            <a 
              href={mention.url} 
              target="_blank" 
              rel="noopener noreferrer" 
              className="block p-4 rounded-lg border border-gray-200 dark:border-gray-800 hover:bg-gray-50 dark:hover:bg-gray-900 transition-colors"
            >
              <div className="text-sm text-gray-500 dark:text-gray-400 mb-1">
                {mention.publisher}
              </div>
              <div className="font-medium text-blue-600 dark:text-blue-400 group-hover:underline">
                {mention.title}
              </div>
            </a>
          </li>
        ))}
      </ul>
    </section>
  );
}
