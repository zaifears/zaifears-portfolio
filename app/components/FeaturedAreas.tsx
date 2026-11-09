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
      className="max-w-6xl mx-auto py-10 md:py-14"
    >
      <motion.h2
        variants={itemVariants}
        className="text-3xl md:text-5xl font-semibold mb-8 text-ink"
      >
        Featured Areas
      </motion.h2>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 auto-rows-[minmax(250px,auto)]">
        {/* Skills - Large card spanning 2 columns and 2 rows */}
        <div className="col-span-1 sm:col-span-2 sm:row-span-2 row-span-1">
          <motion.div
            whileHover={{ y: -4 }}
            transition={{ duration: 0.25 }}
            variants={itemVariants}
            className="h-full"
          >
            <Link href="/skills" className="block h-full rounded-panel">
              <div className="group relative flex h-full flex-col rounded-panel bg-accent p-8 text-accent-ink">
                <div className="mb-6 flex h-16 w-16 items-center justify-center rounded-card bg-accent-ink/15 text-3xl">
                  <FontAwesomeIcon icon={faCode} />
                </div>
                <h3 className="mb-3 text-3xl font-semibold">Skills</h3>
                <p className="mb-6 grow text-base text-accent-ink/85">
                  Finance modeling, Next.js, TypeScript, Power BI, and CA Certificate Level. See the full stack.
                </p>
                <div className="flex items-center gap-3">
                  <span className="font-medium">View skills</span>
                  <span className="flex h-9 w-9 items-center justify-center rounded-full bg-accent-ink text-accent transition-transform duration-200 group-hover:translate-x-1">
                    <FontAwesomeIcon icon={faArrowRight} className="h-4 w-4" />
                  </span>
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
            href="/projects"
            ctaText="View projects"
          />
        </motion.div>

        {/* Education Card */}
        <motion.div variants={itemVariants} className="h-full">
          <BentoCard
            title="Education"
            description="Academic background"
            icon={faLightbulb}
            href="/education"
            ctaText="See my path"
          />
        </motion.div>

        {/* Life/Journal Card */}
        <motion.div variants={itemVariants} className="h-full">
          <BentoCard
            title="Life"
            description="Personal insights"
            icon={faUsers}
            href="/life"
            ctaText="Read the blog"
          />
        </motion.div>

        {/* Contact Card */}
        <motion.div variants={itemVariants} className="h-full">
          <BentoCard
            title="Contact"
            description="Let's connect"
            icon={faArrowRight}
            href="/contact"
            ctaText="Send a message"
          />
        </motion.div>
      </div>
    </motion.section>
  );
}
