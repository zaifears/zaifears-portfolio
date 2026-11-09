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
    <section className="max-w-6xl mx-auto py-10 md:py-14">
      <h2 className="text-3xl md:text-5xl font-semibold mb-8 text-ink">
        In the Press
      </h2>
      <ul className="flex flex-col gap-4">
        {pressMentions.map((mention) => (
          <li key={mention.id} className="group">
            <a 
              href={mention.url} 
              target="_blank" 
              rel="noopener noreferrer" 
              className="block rounded-card border border-rule bg-paper-2 p-5 transition-colors duration-200 hover:bg-paper-3"
            >
              <div className="text-sm text-muted mb-1">
                {mention.publisher}
              </div>
              <div className="font-medium text-accent-text group-hover:underline">
                {mention.title}
              </div>
            </a>
          </li>
        ))}
      </ul>
    </section>
  );
}
