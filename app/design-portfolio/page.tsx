import { Metadata } from 'next';
import PortfolioContent from './PortfolioContent';

export const metadata: Metadata = {
  title: 'Design Portfolio',
  description: 'Md Al Shahoriar Hossain\'s design portfolio showcasing graphic design projects, UI/UX work, and creative design solutions. View his creative works and design expertise.',
};

// This page now simply displays the shared PortfolioContent component.
export default function DesignPortfolioPage() {
  return (
    <div className="min-h-screen">
      <div className="max-w-7xl mx-auto px-4 py-12">
        <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "BreadcrumbList",
            "itemListElement": [
              {
                "@type": "ListItem",
                "position": 1,
                "name": "Home",
                "item": "https://shahoriar.bd"
              },
              {
                "@type": "ListItem",
                "position": 2,
                "name": "Design Portfolio",
                "item": "https://shahoriar.bd/design-portfolio"
              }
            ]
          })
        }}
      />
        <PortfolioContent />
      </div>
    </div>
  );
}