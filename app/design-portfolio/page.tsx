import PortfolioContent from './PortfolioContent';

// This page now simply displays the shared PortfolioContent component.
export default function DesignPortfolioPage() {
  return (
    <div className="min-h-screen">
      <div className="max-w-7xl mx-auto px-4 py-12">
        <PortfolioContent />
      </div>
    </div>
  );
}