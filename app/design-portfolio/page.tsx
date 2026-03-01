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
        <PortfolioContent />
      </div>
    </div>
  );
}