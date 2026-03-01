import dynamic from 'next/dynamic';
import { Suspense } from 'react';
import HeroSection from './components/HeroSection';
import FeaturedAreas from './components/FeaturedAreas';

const FeaturedProjects = dynamic(() => import('./components/FeaturedProjects'), {
  loading: () => <div className="h-100" />,
});
const GetStarted = dynamic(() => import('./components/GetStarted'), {
  loading: () => <div className="h-100" />,
});

export default function Page() {
  return (
    <div className="min-h-screen bg-white dark:bg-black text-gray-900 dark:text-white overflow-hidden">
      {/* Animated gradient background */}
      <div className="fixed inset-0 md:left-64 z-0">
        <div className="absolute -top-40 -right-40 w-96 h-96 bg-blue-500/20 dark:bg-blue-500/10 rounded-full mix-blend-multiply filter blur-3xl animate-blob" />
        <div className="absolute -bottom-40 -left-40 w-96 h-96 bg-purple-500/20 dark:bg-purple-500/10 rounded-full mix-blend-multiply filter blur-3xl animate-blob animation-delay-2000" />
      </div>

      {/* Content */}
      <div className="relative z-10">
        <HeroSection />
        <FeaturedAreas />
        <Suspense fallback={<div className="h-[400px]" />}>
          <FeaturedProjects />
        </Suspense>
        <Suspense fallback={<div className="h-[300px]" />}>
          <GetStarted />
        </Suspense>
      </div>
    </div>
  );
}
