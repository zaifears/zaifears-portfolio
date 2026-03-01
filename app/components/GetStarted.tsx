"use client";

import Image from 'next/image';
import Link from 'next/link';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowRight } from '@fortawesome/free-solid-svg-icons';
import { motion } from 'framer-motion';

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
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.6 },
  },
};

export default function GetStarted() {
  return (
    <motion.section
      variants={containerVariants}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: "0px 0px -200px 0px" }}
      className="px-4 md:px-8 max-w-7xl mx-auto py-20"
    >
      <motion.h2
        variants={itemVariants}
        className="text-4xl md:text-5xl font-black mb-12 text-gray-900 dark:text-white text-center"
      >
        Get Started
      </motion.h2>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
        <motion.div variants={itemVariants}>
          <Link href="/techtips">
            <div className="relative h-56 rounded-2xl border border-gray-200 dark:border-white/10 backdrop-blur-xl overflow-hidden group cursor-pointer hover:border-gray-300 dark:hover:border-white/20 transition-all duration-300">
              <Image
                src="/techtips.png"
                alt="Tech Tips"
                fill
                className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
              />
            </div>
          </Link>
        </motion.div>

        <motion.div variants={itemVariants}>
          <Link href="/design-portfolio">
            <div className="relative h-56 rounded-2xl border border-gray-200 dark:border-white/10 backdrop-blur-xl overflow-hidden group cursor-pointer hover:border-gray-300 dark:hover:border-white/20 transition-all duration-300">
              <Image
                src="/designbox.png"
                alt="Design Portfolio"
                fill
                className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
              />
            </div>
          </Link>
        </motion.div>
      </div>

      {/* Python IDE Button */}
      <motion.div variants={itemVariants} className="max-w-2xl mx-auto">
        <Link href="/ide">
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="w-full py-4 bg-gray-900/10 dark:bg-white/10 border border-gray-900/20 dark:border-white/20 rounded-2xl text-gray-900 dark:text-white font-semibold backdrop-blur-xl hover:bg-gray-900/20 dark:hover:bg-white/20 transition-all duration-300 flex items-center justify-center gap-3 group"
          >
            <span className="text-2xl">🐍</span>
            <span>Code in Python</span>
            <motion.span whileHover={{ x: 4 }}>
              <FontAwesomeIcon icon={faArrowRight} className="w-4 h-4" />
            </motion.span>
          </motion.button>
        </Link>
      </motion.div>
    </motion.section>
  );
}
