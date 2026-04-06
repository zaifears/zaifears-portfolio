"use client";

import { Suspense, useState, useEffect } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowRight } from '@fortawesome/free-solid-svg-icons';
import { motion } from 'framer-motion';
import LiveTime from './LiveTime';
import Weather from './Weather';

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
      delayChildren: 0.2,
    },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 10 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.4 },
  },
};

export default function HeroSection() {
  const [animationsEnabled, setAnimationsEnabled] = useState(false);

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

  return (
    <motion.section
      className="min-h-[80vh] flex flex-col justify-center px-4 md:px-8 max-w-7xl mx-auto"
    >
      {/* Time & Weather widgets - Mobile: center top, Desktop: top left */}
      <motion.div variants={itemVariants} className="mb-12 flex md:flex-row flex-col items-center gap-6 justify-center md:justify-start" initial="visible" animate={animationsEnabled ? "visible" : "hidden"}>
        <LiveTime />
        <div className="w-px h-6 bg-gray-300 dark:bg-white/20 hidden md:block" />
        <Suspense fallback={<div className="text-center font-mono text-zinc-500 text-sm">--°C ...</div>}>
          <Weather />
        </Suspense>
      </motion.div>

      {/* Main content wrapper */}
      <div className="flex flex-col md:flex-row items-center md:items-end gap-8 md:gap-12">
        
        {/* Mobile only: Image centered */}
        <motion.div
          variants={itemVariants}
          initial="visible"
          animate={animationsEnabled ? "visible" : "hidden"}
          className="relative w-64 h-64 sm:w-72 sm:h-72 md:hidden shrink-0 order-1"
        >
          {/* Rotating fan background */}
          <motion.div
            className="absolute inset-0 rounded-full will-change-transform"
            animate={animationsEnabled ? { rotate: 360 } : { rotate: 0 }}
            transition={{ duration: 4, repeat: Infinity, ease: "linear" }}
          >
            {/* Fan blade 1 */}
            <div className="absolute inset-0 rounded-full border-t-4 border-blue-500/40" />
            {/* Fan blade 2 */}
            <div className="absolute inset-0 rounded-full border-r-4 border-purple-500/40" style={{ transform: "rotate(120deg)" }} />
            {/* Fan blade 3 */}
            <div className="absolute inset-0 rounded-full border-b-4 border-pink-500/40" style={{ transform: "rotate(240deg)" }} />
          </motion.div>

          {/* Rotating gradient glow background */}
          <motion.div
            className="absolute inset-0 rounded-full bg-linear-to-r from-blue-500/20 to-purple-500/20 blur-2xl will-change-transform"
            animate={animationsEnabled ? { rotate: 360 } : { rotate: 0 }}
            transition={{ duration: 8, repeat: Infinity, ease: "linear" }}
          />
          
          <Image
            src="/Shahoriar_hero.png"
            alt="Shahoriar Hossain"
            fill
            className="object-cover relative z-10"
            priority
            sizes="(max-width: 640px) 256px, 288px"
          />
          {/* Stylish bottom line */}
          <div className="absolute bottom-0 left-0 right-0 h-1 bg-linear-to-r from-transparent via-white to-transparent opacity-60 z-20" />
        </motion.div>

        {/* Left side - Name & text (Mobile: centered, Desktop: flex-1) */}
        <div className="flex-1 w-full md:w-auto flex flex-col items-center md:items-start text-center md:text-left order-2">
          {/* Main headline */}
          <motion.div variants={itemVariants} initial="visible" animate={animationsEnabled ? "visible" : "hidden"} className="mb-8">
            <h1 className="font-black leading-[0.9] tracking-tighter bg-clip-text text-transparent bg-linear-to-r from-gray-900 via-gray-900 to-gray-900/50 dark:from-white dark:via-white dark:to-white/50 mb-6">
              <span className="block text-2xl sm:text-3xl md:text-4xl">MD AL</span>
              <span className="block text-4xl sm:text-5xl md:text-6xl">SHAHORIAR</span>
              <span className="block text-3xl sm:text-4xl md:text-5xl">Hossain</span>
            </h1>
            
            {/* Rotating Skills Section */}
            <div className="flex flex-col sm:flex-row items-center gap-1 sm:gap-3 mb-6">
              <span className="text-lg md:text-xl font-light text-gray-600 dark:text-white/60 whitespace-nowrap h-7 md:h-8 flex items-center justify-center">I do</span>
              <div className="relative h-7 md:h-8 overflow-hidden">
                <motion.div
                  animate={animationsEnabled ? { y: ["0%", "0%", "-16.66%", "-16.66%", "-33.33%", "-33.33%", "-50%", "-50%", "-66.66%", "-66.66%", "-83.33%", "-83.33%"] } : { y: "0%" }}
                  transition={{ 
                    duration: 12,
                    repeat: Infinity,
                    ease: "easeInOut",
                    times: [0, 0.15, 0.166, 0.316, 0.333, 0.483, 0.5, 0.65, 0.666, 0.816, 0.833, 1]
                  }}
                  className="flex flex-col items-center sm:items-start will-change-transform"
                >
                  <span className="h-7 md:h-8 flex items-center justify-center sm:justify-start text-lg md:text-xl font-light text-blue-600 dark:text-blue-400">Financial Analysis</span>
                  <span className="h-7 md:h-8 flex items-center justify-center sm:justify-start text-lg md:text-xl font-light text-purple-600 dark:text-purple-400">Web Development</span>
                  <span className="h-7 md:h-8 flex items-center justify-center sm:justify-start text-lg md:text-xl font-light text-pink-600 dark:text-pink-400">Graphic Design</span>
                  <span className="h-7 md:h-8 flex items-center justify-center sm:justify-start text-lg md:text-xl font-light text-blue-600 dark:text-blue-400">Data Visualization</span>
                  <span className="h-7 md:h-8 flex items-center justify-center sm:justify-start text-lg md:text-xl font-light text-purple-600 dark:text-purple-400">Problem Solving</span>
                  <span className="h-7 md:h-8 flex items-center justify-center sm:justify-start text-lg md:text-xl font-light text-blue-600 dark:text-blue-400">Financial Analysis</span>
                </motion.div>
              </div>
            </div>
          </motion.div>

          {/* CTA Button */}
          <motion.div variants={itemVariants} initial="visible" animate={animationsEnabled ? "visible" : "hidden"}>
            <Link href="/contact" className="inline-block">
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="px-8 py-4 bg-gray-900/10 dark:bg-white/10 border border-gray-900/20 dark:border-white/20 rounded-xl text-gray-900 dark:text-white font-semibold backdrop-blur-xl hover:bg-gray-900/20 dark:hover:bg-white/20 transition-all duration-300 flex items-center gap-3 group"
              >
                Get in touch
                <motion.span whileHover={{ x: 4 }}>
                  <FontAwesomeIcon icon={faArrowRight} className="w-4 h-4" />
                </motion.span>
              </motion.button>
            </Link>
          </motion.div>
        </div>

        {/* Desktop only: Photo on right */}
        <motion.div
          variants={itemVariants}
          initial="visible"
          animate={animationsEnabled ? "visible" : "hidden"}
          className="relative w-64 h-64 sm:w-72 sm:h-72 md:w-80 md:h-80 shrink-0 hidden md:block order-3"
        >
          {/* Rotating fan background */}
          <motion.div
            className="absolute inset-0 rounded-full will-change-transform"
            animate={animationsEnabled ? { rotate: 360 } : { rotate: 0 }}
            transition={{ duration: 4, repeat: Infinity, ease: "linear" }}
          >
            {/* Fan blade 1 */}
            <div className="absolute inset-0 rounded-full border-t-4 border-blue-500/40" />
            {/* Fan blade 2 */}
            <div className="absolute inset-0 rounded-full border-r-4 border-purple-500/40" style={{ transform: "rotate(120deg)" }} />
            {/* Fan blade 3 */}
            <div className="absolute inset-0 rounded-full border-b-4 border-pink-500/40" style={{ transform: "rotate(240deg)" }} />
          </motion.div>

          {/* Rotating gradient glow background */}
          <motion.div
            className="absolute inset-0 rounded-full bg-linear-to-r from-blue-500/20 to-purple-500/20 blur-2xl will-change-transform"
            animate={animationsEnabled ? { rotate: 360 } : { rotate: 0 }}
            transition={{ duration: 8, repeat: Infinity, ease: "linear" }}
          />
          
          <Image
            src="/Shahoriar_hero.png"
            alt="Shahoriar Hossain"
            fill
            className="object-cover relative z-10"
            priority
            sizes="320px"
          />
          {/* Stylish bottom line */}
          <div className="absolute bottom-0 left-0 right-0 h-1 bg-linear-to-r from-transparent via-white to-transparent opacity-60 z-20" />
        </motion.div>
      </div>
    </motion.section>
  );
}
