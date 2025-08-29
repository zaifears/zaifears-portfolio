"use client";

import Image from 'next/image';

// --- Your 9 Portfolio Projects ---
// The code will use these to build the grid.
const projects = [
  {
    title: 'Video Editing',
    imageUrl: '/idea.png',
    link: 'https://youtu.be/CpYpsI5xuRs',
  },
  {
    title: 'Professional Document Cover Making',
    imageUrl: '/cover.png',
    link: 'https://www.canva.com/design/DAGcKwfI6qM/c0f3fTToGlt0d4PMkpjSgg/view?utm_content=DAGcKwfI6qM&utm_campaign=designshare&utm_medium=link2&utm_source=uniquelinks&utlId=h69393c0a13',
  },
  {
    title: 'Non-Professional Document Cover',
    imageUrl: '/nonpro.png',
    link: 'https://www.canva.com/design/DAGgT9-Q-Q8/hCFAVzHDHwPaxWRiris0ww/view?utm_content=DAGgT9-Q-Q8&utm_campaign=designshare&utm_medium=link2&utm_source=uniquelinks&utlId=hffd11cf88d',
  },
  {
    title: 'Facebook Engagement Post Design',
    imageUrl: '/buppost.png',
    link: 'https://www.canva.com/design/DAGiWcVvsjA/yj6gZQz2dHkrV8pOqGP0MA/view?utm_content=DAGiWcVvsjA&utm_campaign=designshare&utm_medium=link2&utm_source=uniquelinks&utlId=hfefb050eec',
  },
  {
    title: 'Academic Slide Design',
    imageUrl: '/academic.png',
    link: 'https://www.canva.com/design/DAGq_Q3iKOE/8clts3JgJFqU4v4B395P7w/view?utm_content=DAGq_Q3iKOE&utm_campaign=designshare&utm_medium=link2&utm_source=uniquelinks&utlId=hab78aa9cf4',
  },
  {
    title: 'Pitchdeck Presentation Design',
    imageUrl: '/pitchdeck.png',
    link: 'https://www.canva.com/design/DAGr4wdLlkE/oLTeurFpRHc2ICBhmXYe-w/view?utm_content=DAGr4wdLlkE&utm_campaign=designshare&utm_medium=link2&utm_source=uniquelinks&utlId=h3fe602c5c1',
  },
  {
    title: 'Logo Design',
    imageUrl: '/logo.png',
    link: 'https://www.canva.com/design/DAGdeOW8OdQ/5gv337iPyli20l8jR-mr2Q/view?utm_content=DAGdeOW8OdQ&utm_campaign=designshare&utm_medium=link2&utm_source=uniquelinks&utlId=h5beaa67856',
  },
  {
    title: 'YouTube Thumbnail Design',
    imageUrl: '/thumbnail.png',
    link: 'https://www.canva.com/design/DAGwZwUCgV4/ISRyJJHuEFH2-1B3Tce8pg/view?utm_content=DAGwZwUCgV4&utm_campaign=designshare&utm_medium=link2&utm_source=uniquelinks&utlId=hc40b87f1c2',
  },
  {
    title: 'Facebook Generic Posts',
    imageUrl: '/generic.png',
    link: 'https://www.canva.com/design/DAGxLutpogY/Ks7ZnGAmcSlSeYIeeAYbFw/view?utm_content=DAGxLutpogY&utm_campaign=designshare&utm_medium=link2&utm_source=uniquelinks&utlId=he00f019a8e',
  }
];

// This component holds the content for your design portfolio.
export default function PortfolioContent() {
  return (
    <div>
      <div className="text-center mb-12">
        <h2 className="text-3xl font-bold mb-2">Design Portfolio</h2>
        <p className="text-gray-400">A selection of my recent design work.</p>
        <p className="text-blue-400 text-sm mt-4">Click on any project below to view the design or video.</p>
      </div>
      
      {/* --- Portfolio Grid (2-columns on desktop, with a larger gap) --- */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {projects.map((project, index) => (
          <a
            key={index}
            href={project.link}
            target="_blank"
            rel="noopener noreferrer"
            className="group block bg-gray-900/50 border border-gray-800/50 rounded-2xl overflow-hidden transition-all duration-300 hover:border-blue-500/30 hover:transform hover:scale-[1.02] hover:shadow-2xl"
          >
            {/* Aspect-video creates a 16:9 rectangular shape */}
            <div className="relative aspect-video">
              <Image
                src={project.imageUrl}
                alt={project.title}
                fill
                className="object-cover transition-transform duration-300 group-hover:scale-105"
                // Add an error handler for missing images
                onError={(e) => {
                  (e.target as HTMLImageElement).src = 'https://placehold.co/800x450/171717/FFFFFF?text=Image+Not+Found';
                }}
              />
              {/* Overlay */}
              <div className="absolute inset-0 bg-black/30 group-hover:bg-black/10 transition-colors duration-300"></div>
            </div>
            <div className="p-4">
              <h3 className="font-bold text-white group-hover:text-blue-400 transition-colors duration-300">
                {project.title}
              </h3>
            </div>
          </a>
        ))}
      </div>

    </div>
  );
}

