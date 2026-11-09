"use client";

import { Suspense, useState, useEffect } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowRight } from '@fortawesome/free-solid-svg-icons';
import { motion, useReducedMotion } from 'framer-motion';
import LiveTime from './LiveTime';
import Weather from './Weather';

const itemVariants = {
  hidden: { opacity: 0, y: 10 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.4 },
  },
};

const skills = [
  'Financial Analysis',
  'Web Development',
  'Data Visualization',
  'Financial Modeling',
  'Business Competition',
];

export default function HeroSection() {
  const [animationsEnabled, setAnimationsEnabled] = useState(false);
  const reduceMotion = useReducedMotion();
  const [wordIndex, setWordIndex] = useState(0);
  const [paused, setPaused] = useState(false);

  useEffect(() => {
    // Defer animation enabling until after page is interactive
    if (typeof requestIdleCallback !== 'undefined') {
      const id = requestIdleCallback(() => setAnimationsEnabled(true));
      return () => cancelIdleCallback(id);
    } else {
      const timeoutId = setTimeout(() => setAnimationsEnabled(true), 1000);
      return () => clearTimeout(timeoutId);
    }
  }, []);

  // Rotate one word at a time. Reduced motion swaps the word in place instead of sliding it.
  useEffect(() => {
    if (!animationsEnabled || paused) return;
    const id = setInterval(() => setWordIndex((i) => (i + 1) % skills.length), 2200);
    return () => clearInterval(id);
  }, [animationsEnabled, paused]);

  return (
    <motion.section
      className="min-h-[80vh] flex flex-col justify-center max-w-6xl mx-auto"
    >
      {/* Time and weather, as two quiet chips */}
      <motion.div
        variants={itemVariants}
        initial="visible"
        animate={animationsEnabled ? "visible" : "hidden"}
        className="mb-8 flex flex-wrap items-center gap-3 justify-center md:justify-start"
      >
        <LiveTime />
        <Suspense fallback={<div className="rounded-full border border-rule bg-paper-2 px-4 py-2 text-sm text-muted">--°C</div>}>
          <Weather />
        </Suspense>
      </motion.div>

      <div className="grid grid-cols-1 md:grid-cols-[minmax(0,1.1fr)_minmax(0,0.9fr)] items-center gap-8 md:gap-12">
        {/* Portrait: a cutout set in a large rounded blue tile */}
        <motion.div
          variants={itemVariants}
          initial="visible"
          animate={animationsEnabled ? "visible" : "hidden"}
          className="relative mx-auto w-full max-w-72 sm:max-w-sm md:max-w-none aspect-square overflow-hidden rounded-panel bg-accent md:order-2"
        >
          <Image
            src="/shahoriar_portfolio.png"
            alt="Md Al Shahoriar Hossain portrait"
            fill
            className="object-contain object-bottom"
            priority={true}
            sizes="(max-width: 768px) 320px, 480px"
          />
        </motion.div>

        {/* Name, rotating skills and the one action */}
        <header className="flex flex-col items-center md:items-start text-center md:text-left md:order-1">
          <motion.div variants={itemVariants} initial="visible" animate={animationsEnabled ? "visible" : "hidden"} className="mb-8">
            <h1 className="mb-6 text-ink leading-[0.95] tracking-tight">
              <span className="block text-5xl sm:text-6xl lg:text-7xl">Md Al</span>
              <span className="block text-5xl sm:text-6xl lg:text-7xl">Shahoriar</span>
              <span className="block text-5xl sm:text-6xl lg:text-7xl">Hossain</span>
            </h1>

            {/* Rotating Skills Section */}
            <div className="flex flex-col sm:flex-row items-center gap-2 sm:gap-3">
              <span className="text-lg md:text-xl text-muted whitespace-nowrap">I do</span>
              <div
                className="relative h-11 overflow-hidden rounded-full bg-accent-soft px-5"
                onMouseEnter={() => setPaused(true)}
                onMouseLeave={() => setPaused(false)}
                onFocus={() => setPaused(true)}
                onBlur={() => setPaused(false)}
              >
                <motion.div
                  animate={{ y: `-${wordIndex * 44}px` }}
                  transition={{ duration: reduceMotion ? 0 : 0.5, ease: 'easeInOut' }}
                  className="flex flex-col items-center sm:items-start will-change-transform"
                >
                  {skills.map((skill, i) => (
                    <span key={skill} aria-hidden={i !== wordIndex} className="h-11 flex items-center whitespace-nowrap text-lg md:text-xl font-medium text-accent-text">{skill}</span>
                  ))}
                </motion.div>
              </div>
            </div>
          </motion.div>

          <motion.div variants={itemVariants} initial="visible" animate={animationsEnabled ? "visible" : "hidden"}>
            <Link href="/contact" className="btn-primary group">
              <span>Get in touch</span>
              <motion.span whileHover={{ x: 4 }}>
                <FontAwesomeIcon icon={faArrowRight} className="w-4 h-4" />
              </motion.span>
            </Link>
          </motion.div>
        </header>
      </div>
    </motion.section>
  );
}
