"use client"; // This is a client component as it uses hooks

import React, { useState, useEffect } from 'react';
import Image from 'next/image';

// Define the structure for a single life event/point
interface LifeEvent {
  id: string; // Unique identifier
  date: string; // For sorting (YYYY-MM-DD format recommended)
  title: string; // Title for both left and right
  imageSrc: string; // Local image path from public directory (for left panel)
  shortText: string; // Very little info for the right panel
  detailedContent: string; // Lots of info for the left panel when selected
}

// Define the base life events without image paths yet
const rawLifeEvents: Omit<LifeEvent, 'imageSrc'>[] = [
  {
    id: 'early-days', date: '2000-01-01', title: 'Early Days & First Steps',
    shortText: 'My formative years and initial curiosities.',
    detailedContent: `A brief look into my formative years and initial curiosities. This period, though distant, shaped my foundational interests and sparked the curiosity that drives me today. It was a time of discovery, simple joys, and the first inklings of what would later become a lifelong passion for understanding how things work and how they can be improved. These early experiences, though seemingly small, were crucial in setting the stage for my future endeavors.`,
  },
  {
    id: 'formative-years', date: '2015-01-01', title: 'Formative Years',
    shortText: 'Key influences and discoveries.',
    detailedContent: `The formative years were a period of significant personal growth and discovery. It was during this time that I developed a keen interest in technology and problem-solving. Early experiences with computers, puzzles, and creative endeavors sparked a lifelong curiosity that continues to drive my learning and professional pursuits.`,
  },
  {
    id: 'learning-journey', date: '2021-08-01', title: 'The Learning Journey Begins',
    shortText: 'Exploring academic pursuits.',
    detailedContent: `My formal academic journey laid the groundwork for my understanding of complex systems and problem-solving. This period was marked by intense study, collaborative projects, and the thrill of new knowledge. Beyond textbooks, it's about developing critical thinking skills and the discipline required to master challenging subjects. Each course, each assignment, and each late-night study session contributed to building a robust foundation for my technical and analytical capabilities.`,
  },
  {
    id: 'early-career', date: '2022-01-01', title: 'Early Career Insights',
    shortText: 'First professional experiences.',
    detailedContent: `My early career experiences provided invaluable real-world exposure to software development and project management. Working in collaborative environments, I learned the importance of teamwork, effective communication, and agile methodologies. These foundational experiences shaped my professional approach and instilled a strong work ethic.`,
  },
  {
    id: 'skill-development', date: '2022-05-01', title: 'Skill Development',
    shortText: 'Honing my technical abilities.',
    detailedContent: `Continuous skill development is paramount in the fast-paced world of technology. This period was dedicated to deep-diving into specific frameworks and languages, attending workshops, and building small projects to solidify my understanding. The focus was on mastering core concepts and becoming proficient in tools essential for modern web development and data analysis.`,
  },
  {
    id: 'community-involvement', date: '2023-08-01', title: 'Community Involvement',
    shortText: 'Contributing to open-source.',
    detailedContent: `Engaging with the tech community has been a rewarding aspect of my journey. I've actively participated in online forums, contributed to open-source projects, and attended virtual meetups. Sharing knowledge and learning from others has not only broadened my perspective but also allowed me to give back to the community that has supported my growth.`,
  },
  {
    id: 'passion-projects', date: '2023-11-15', title: 'Diving into Passions',
    shortText: 'Bringing personal projects to life.',
    detailedContent: `From initial ideas to bringing personal projects to life, this phase has been about exploring what truly excites me beyond formal education or work. These are the endeavors where I've had the freedom to experiment, fail, and learn without constraints. Whether it's a small coding utility, a creative design piece, or a deep dive into a new technology, these projects are fueled purely by curiosity and a desire to build. They represent my self-driven learning and my commitment to continuous improvement.`,
  },
  {
    id: 'recent-achievements', date: '2024-03-20', title: 'Recent Achievements',
    shortText: 'Milestones and successes.',
    detailedContent: `Recently, I achieved a significant milestone in my personal learning journey, successfully deploying a complex application to production. This involved overcoming several technical hurdles and deep-diving into cloud infrastructure. Another achievement includes completing a challenging certification in data analytics, further solidifying my analytical capabilities.`,
  },
  {
    id: 'current-projects', date: '2024-06-10', title: 'Current Projects',
    shortText: 'What I am working on now.',
    detailedContent: `Currently immersed in several exciting projects that challenge my skills and expand my horizons. These include developing a new web application using Next.js, contributing to an open-source initiative, and exploring machine learning applications in finance. Each project is a learning opportunity, pushing me to master new tools and problem-solving techniques.`,
  },
  {
    id: 'future-vision', date: '2025-07-25', title: 'Looking Ahead',
    shortText: 'My aspirations and future path.',
    detailedContent: `My aspirations and goals are constantly evolving, but the core remains: to innovate, learn, and contribute meaningfully. I envision a future where technology empowers individuals and communities, and I aim to be at the forefront of creating such solutions. This involves continuous learning in emerging fields, collaborating with diverse minds, and tackling complex problems with creative solutions. I'm charting the course for what comes next, always seeking new challenges and opportunities for growth. This section outlines my current vision and the steps I plan to take to achieve it.`,
  },
];

// Sort rawLifeEvents by date in ascending order (oldest first) to assign image paths serially
const chronologicalLifeEvents = [...rawLifeEvents].sort((a, b) => {
  return new Date(a.date).getTime() - new Date(b.date).getTime();
});

// Assign imageSrc serially based on chronological order, cycling through 4 images
const lifeEvents: LifeEvent[] = chronologicalLifeEvents.map((event, index) => {
  const imageNumber = (index % 4) + 1; // Cycles 1, 2, 3, 4, 1, 2, 3, 4...
  return {
    ...event,
    imageSrc: `/life-pics/event${imageNumber}.jpg`, // Updated path to eventX.jpg
  };
});

// Sort lifeEvents by date, newest to oldest for display on the right side
const sortedLifeEvents = [...lifeEvents].sort((a, b) => {
  return new Date(b.date).getTime() - new Date(a.date).getTime();
});

export default function LifePage() {
  // State to hold the currently selected event for the left panel
  const [selectedEvent, setSelectedEvent] = useState<LifeEvent | null>(null);

  // Function to handle clicking on a right-side content box
  const handleContentClick = (event: LifeEvent) => {
    setSelectedEvent(event);
  };

  return (
    <div className="flex flex-col md:flex-row min-h-[calc(100vh-100px)] p-4 md:p-8 md:gap-8">
      {/* Left Column: Fixed Display Panel (Larger) */}
      <div className="md:w-2/3 w-full md:pr-4 mb-8 md:mb-0 md:sticky md:top-20 md:self-start
                    p-6 rounded-lg shadow-lg border border-neutral-300 dark:border-neutral-700 bg-neutral-100 dark:bg-neutral-800
                    min-h-[300px] flex flex-col justify-center items-center overflow-y-auto max-h-[calc(100vh-100px)] custom-scrollbar">
        <h1 className="text-3xl md:text-4xl font-bold tracking-tight mb-6 text-neutral-800 dark:text-neutral-200">
          My Life Journey
        </h1>
        {!selectedEvent ? (
          // Default content when nothing is selected
          <div className="text-center py-10">
            <p className="text-2xl font-semibold text-neutral-700 dark:text-neutral-300">
              Interested in my life, huh!
            </p>
            <p className="text-sm text-neutral-500 dark:text-neutral-400 mt-2">
              Click on any section on the right to learn more.
            </p>
          </div>
        ) : (
          // Content when an item is selected - NEW LAYOUT
          // Added pt-4 to this div for top spacing
          <div className="flex flex-col items-start text-left w-full pt-4"> {/* Added pt-4 here */}
            <div className="mb-4 w-full">
              <Image
                src={selectedEvent.imageSrc}
                alt={selectedEvent.title}
                width={0}
                height={0}
                sizes="100vw"
                style={{ width: '100%', height: 'auto' }}
                className="rounded-lg object-cover mb-4"
              />
            </div>
            <h2 className="text-3xl font-bold mb-2 text-neutral-800 dark:text-neutral-200">
              {selectedEvent.title}
            </h2>
            <p className="text-sm text-neutral-600 dark:text-neutral-400 mb-4">
              {new Date(selectedEvent.date).toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}
            </p>
            <p className="text-base text-neutral-700 dark:text-neutral-300 leading-relaxed">
              {selectedEvent.detailedContent}
            </p>
          </div>
        )}
      </div>

      {/* Right Column: Scrollable Content (Smaller Rectangles with Date) */}
      <div className="md:w-1/3 w-full space-y-4 overflow-y-auto max-h-[calc(100vh-100px)] right-column-dots-scrollbar">
        {sortedLifeEvents.map((event) => (
          <div
            key={event.id}
            id={event.id}
            onClick={() => handleContentClick(event)}
            className={`p-4 rounded-lg shadow-md border cursor-pointer transition-all duration-200
              ${selectedEvent?.id === event.id
                ? 'bg-blue-600/20 border-blue-600 text-blue-400 shadow-lg'
                : 'bg-neutral-50 dark:bg-neutral-900 border-neutral-200 dark:border-neutral-800 hover:bg-neutral-200 dark:hover:bg-neutral-700'
              }`}
          >
            <h2 className="text-lg font-semibold mb-1 text-neutral-800 dark:text-neutral-200">
              {event.title}
            </h2>
            <p className="text-sm text-neutral-600 dark:text-neutral-400">
              {new Date(event.date).toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
}
