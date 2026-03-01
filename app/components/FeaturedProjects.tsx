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

export default function FeaturedProjects() {
  return (
    <motion.section
      variants={containerVariants}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: "0px 0px -200px 0px" }}
      className="px-4 md:px-8 max-w-7xl mx-auto py-20 border-t border-gray-200 dark:border-white/10"
    >
      <motion.h2
        variants={itemVariants}
        className="text-4xl md:text-5xl font-black mb-12 text-gray-900 dark:text-white"
      >
        Featured Projects
      </motion.h2>

      <div className="space-y-8">
        {/* SkillDash Project */}
        <motion.div
          variants={itemVariants}
          className="relative rounded-2xl border border-gray-200 dark:border-white/10 backdrop-blur-xl bg-gray-100/50 dark:bg-white/5 hover:border-gray-300 dark:hover:border-white/20 transition-all duration-300 group overflow-hidden"
        >
          <div className="grid grid-cols-1 md:grid-cols-2 gap-0 items-stretch">
            <Link
              href="https://skilldash.live/simulator"
              target="_blank"
              rel="noopener noreferrer"
              className="relative h-64 md:h-auto order-2 md:order-1 overflow-hidden cursor-pointer"
            >
              <Image
                src="/skilldash-banner.png"
                alt="SkillDash Simulator - DSE Stock Simulator"
                fill
                className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
              />
            </Link>
            <div className="p-8 flex flex-col justify-center order-1 md:order-2">
              <h3 className="text-2xl md:text-3xl font-bold text-gray-900 dark:text-white mb-4">SkillDash Simulator</h3>
              <p className="text-gray-600 dark:text-white/70 mb-4 leading-relaxed">
                Bangladesh&apos;s DSE Stock Simulator. Practice Dhaka Stock Exchange trading without risk using our paper trading simulator. The DSE module replicates live market conditions.
              </p>
              <Link
                href="https://skilldash.live/simulator"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 text-gray-500 dark:text-white/60 group-hover:text-gray-900 dark:group-hover:text-white transition-colors w-fit"
              >
                Visit skilldash.live <FontAwesomeIcon icon={faArrowRight} className="w-4 h-4" />
              </Link>
            </div>
          </div>
        </motion.div>

        {/* Business Competition Projects */}
        <motion.div
          variants={itemVariants}
          className="relative rounded-2xl border border-gray-200 dark:border-white/10 backdrop-blur-xl bg-gray-100/50 dark:bg-white/5 hover:border-gray-300 dark:hover:border-white/20 transition-all duration-300 group overflow-hidden"
        >
          <div className="grid grid-cols-1 md:grid-cols-2 gap-0 items-stretch">
            <div className="p-8 flex flex-col justify-center">
              <h3 className="text-2xl md:text-3xl font-bold text-gray-900 dark:text-white mb-4">Business Competition Projects</h3>
              <p className="text-gray-600 dark:text-white/70 mb-4 leading-relaxed">
                Strategic Solutions & Market Analysis. National competition winning strategies, financial models, and market research. Explore innovative business proposals.
              </p>
              <Link
                href="/bizcomp"
                className="inline-flex items-center gap-2 text-gray-500 dark:text-white/60 group-hover:text-gray-900 dark:group-hover:text-white transition-colors w-fit"
              >
                View Cases <FontAwesomeIcon icon={faArrowRight} className="w-4 h-4" />
              </Link>
            </div>
            <Link
              href="/bizcomp"
              className="relative h-64 md:h-auto overflow-hidden cursor-pointer"
            >
              <Image
                src="/bizcomp.png"
                alt="Business Competition Projects"
                fill
                className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
              />
            </Link>
          </div>
        </motion.div>
      </div>
    </motion.section>
  );
}
