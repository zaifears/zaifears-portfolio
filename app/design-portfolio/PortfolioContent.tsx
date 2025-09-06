"use client";

import Image from 'next/image';

const projects = [
  // --- Your 14 Portfolio Projects ---
  // (All projects remain the same as before)
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
    title: 'Minimalistic Slide',
    imageUrl: '/ipm.png',
    link: 'https://www.canva.com/design/DAGrtMyznBM/bcuydRyvr_xym1zqtNjgCw/view?utm_content=DAGrtMyznBM&utm_campaign=designshare&utm_medium=link2&utm_source=uniquelinks&utlId=h09098b2e3b',
  },
  {
    title: 'Seminar Paper Design',
    imageUrl: '/paper.png',
    link: 'https://www.canva.com/design/DAGoDKwOafs/Me_rrdr8fFluhOzBGizhoA/view?utm_content=DAGoDKwOafs&utm_campaign=designshare&utm_medium=link2&utm_source=uniquelinks&utlId=h0fd5653e66',
  },
  {
    title: 'Product Demostration Slide',
    imageUrl: '/square.png',
    link: 'https://www.canva.com/design/DAGqbut5kmc/-cvnPo1R91QywMVtTl_h_A/view?utm_content=DAGqbut5kmc&utm_campaign=designshare&utm_medium=link2&utm_source=uniquelinks&utlId=hf6258046dd',
  },
  {
    title: 'Strong Color Themed',
    imageUrl: '/yamaha.png',
    link: 'https://www.canva.com/design/DAGx7_YlrZQ/nBVBzOWKvdoBHmEDMTZ5PA/view?utm_content=DAGx7_YlrZQ&utm_campaign=designshare&utm_medium=link2&utm_source=uniquelinks&utlId=h3022e3ea0e',
  },
  {
    title: 'Corporate Green Theme',
    imageUrl: '/corpo.png',
    link: 'https://www.canva.com/design/DAGvIuft0D4/yxs68y8whP0yOts5YUQu0g/view?utm_content=DAGvIuft0D4&utm_campaign=designshare&utm_medium=link2&utm_source=uniquelinks&utlId=h4c5f027527',
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

export default function PortfolioContent() {
  return (
    <div>
      <div className="text-center mb-12">
        <h2 className="text-3xl font-bold mb-2">Design Portfolio</h2>
        <p className="text-gray-600 dark:text-gray-400">A selection of my recent design work.</p>
        <p className="text-blue-600 dark:text-blue-400 text-sm mt-4">Click on any project below to view the design or video.</p>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {projects.map((project, index) => (
          <a
            key={index}
            href={project.link}
            target="_blank"
            rel="noopener noreferrer"
            className="group block bg-gray-50 dark:bg-gray-900/50 border border-gray-200 dark:border-gray-800/50 rounded-2xl overflow-hidden transition-all duration-300 hover:border-blue-500/30 hover:transform hover:scale-[1.02] hover:shadow-2xl"
          >
            <div className="relative aspect-video">
              <Image
                src={project.imageUrl}
                alt={project.title}
                fill
                className="object-cover object-center transition-transform duration-300 group-hover:scale-105" // <-- object-cover and object-center added here
                onError={(e) => {
                  (e.target as HTMLImageElement).src = 'https://placehold.co/800x450/171717/FFFFFF?text=Image+Not+Found';
                }}
              />
            </div>
            <div className="p-4 bg-white dark:bg-gray-900">
              <h3 className="font-bold text-gray-800 dark:text-white group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors duration-300">
                {project.title}
              </h3>
            </div>
          </a>
        ))}
      </div>

    </div>
  );
}