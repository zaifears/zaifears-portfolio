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
      title: "BUP News & Achievements - Feature 944",
      url: "https://bup.edu.bd/news/details/944"
    },
    {
      id: 3,
      publisher: "Bangladesh University of Professionals (BUP)",
      title: "BUP News & Achievements - Feature 936",
      url: "https://bup.edu.bd/news/details/936"
    }
  ];

  return (
    <section className="py-12 border-t border-neutral-200 dark:border-neutral-800">
      <h2 className="text-2xl font-bold tracking-tight mb-6 text-neutral-900 dark:text-neutral-100">
        In the Press
      </h2>
      <ul className="flex flex-col gap-4">
        {pressMentions.map((mention) => (
          <li key={mention.id} className="group">
            <a 
              href={mention.url} 
              target="_blank" 
              rel="noopener noreferrer" 
              className="block p-4 rounded-lg border border-neutral-200 dark:border-neutral-800 hover:bg-neutral-50 dark:hover:bg-neutral-900 transition-colors"
            >
              <div className="text-sm text-neutral-500 dark:text-neutral-400 mb-1">
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
