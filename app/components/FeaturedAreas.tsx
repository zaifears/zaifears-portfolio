"use client";

import Link from 'next/link';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowRight, faBriefcase, faCode, faLightbulb, faUsers } from '@fortawesome/free-solid-svg-icons';
import { motion } from 'framer-motion';
import BentoCard from './BentoCard';

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

export default function FeaturedAreas() {
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
        className="text-4xl md:text-5xl font-black mb-12 text-gray-900 dark:text-white"
      >
        Featured Areas
      </motion.h2>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 auto-rows-[240px]">
        {/* Skills - Large card spanning 2 columns and 2 rows */}
        <div className="col-span-1 sm:col-span-2 sm:row-span-2 row-span-1">
          <motion.div
            whileHover={{ y: -8 }}
            transition={{ duration: 0.3 }}
            variants={itemVariants}
            className="h-full"
          >
            <Link href="/skills" className="block h-full">
              <div className="relative h-full p-6 rounded-2xl border border-gray-200 dark:border-white/10 backdrop-blur-xl transition-all duration-300 hover:border-gray-300 dark:hover:border-white/20 overflow-hidden group cursor-pointer bg-gray-100/50 dark:bg-white/5">
                <div className="absolute inset-0 bg-gray-100/0 group-hover:bg-gray-100/50 dark:bg-white/0 dark:group-hover:bg-white/5 transition-colors duration-300" />
                <div className="relative z-10 flex flex-col h-full">
                  <div className="text-5xl mb-4 text-gray-500 dark:text-white/60 group-hover:text-gray-700 dark:group-hover:text-white/80 transition-colors duration-300">
                    <FontAwesomeIcon icon={faCode} />
                  </div>
                  <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-3">Skills</h3>
                  <p className="text-gray-600 dark:text-white/50 text-sm grow mb-4">
                    Technical expertise and professional certifications showcasing my capabilities in modern technologies and frameworks
                  </p>
                  <div className="flex items-center gap-2 text-gray-500 dark:text-white/60 group-hover:text-gray-700 dark:group-hover:text-white/80 transition-colors duration-300">
                    <span className="text-sm font-medium">View skills</span>
                    <motion.span
                      className="inline-block"
                      whileHover={{ x: 4 }}
                    >
                      <FontAwesomeIcon icon={faArrowRight} className="w-4 h-4" />
                    </motion.span>
                  </div>
                </div>
              </div>
            </Link>
          </motion.div>
        </div>

        {/* Projects & Work Card */}
        <motion.div variants={itemVariants} className="h-full">
          <BentoCard
            title="Projects & Work"
            description="Professional projects"
            icon={faBriefcase}
            href="/bizcomp"
          />
        </motion.div>

        {/* Education Card */}
        <motion.div variants={itemVariants} className="h-full">
          <BentoCard
            title="Education"
            description="Academic background"
            icon={faLightbulb}
            href="/education"
          />
        </motion.div>

        {/* Life/Journal Card */}
        <motion.div variants={itemVariants} className="h-full">
          <BentoCard
            title="Life"
            description="Personal insights"
            icon={faUsers}
            href="/life"
          />
        </motion.div>

        {/* Contact Card */}
        <motion.div variants={itemVariants} className="h-full">
          <BentoCard
            title="Contact"
            description="Let's connect"
            icon={faArrowRight}
            href="/contact"
          />
        </motion.div>
      </div>
    </motion.section>
  );
}
