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

const panel =
  'group relative rounded-panel border border-rule bg-paper-2 p-3 transition-colors duration-200 hover:bg-paper-3';
const media = 'relative h-64 md:h-auto md:min-h-80 overflow-hidden rounded-card';
const copy = 'flex flex-col justify-center gap-4 p-6 md:p-10';
const textLink =
  'inline-flex w-fit items-center gap-3 rounded-full bg-accent px-5 py-3 font-medium text-accent-ink transition-transform duration-200 hover:-translate-y-0.5';

export default function FeaturedProjects() {
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
        Featured Projects
      </motion.h2>

      <div className="space-y-6">
        {/* StockSimulatorBD Project */}
        <motion.div variants={itemVariants} className={panel}>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3 items-stretch">
            <Link
              href="https://stocksimulator.tech/simulator"
              target="_blank"
              rel="noopener noreferrer"
              className={`${media} order-2 md:order-1 cursor-pointer`}
            >
              <Image
                src="/stocksimbd-banner.png"
                alt="StockSimulatorBD - DSE Stock Simulator"
                fill
                sizes="(max-width: 768px) 100vw, 540px"
                className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
              />
            </Link>
            <div className={`${copy} order-1 md:order-2`}>
              <h3 className="text-2xl md:text-3xl font-semibold text-ink">StockSimulatorBD</h3>
              <p className="text-ink-2 leading-relaxed">
                Bangladesh&apos;s DSE paper trading simulator. Replicates live market conditions so investors can learn the Dhaka Stock Exchange without risking real capital.
              </p>
              <Link
                href="https://stocksimulator.tech/simulator"
                target="_blank"
                rel="noopener noreferrer"
                className={textLink}
              >
                Open StockSimulatorBD <FontAwesomeIcon icon={faArrowRight} className="w-4 h-4" />
              </Link>
            </div>
          </div>
        </motion.div>

        {/* Business Competition Projects */}
        <motion.div variants={itemVariants} className={panel}>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3 items-stretch">
            <div className={copy}>
              <h3 className="text-2xl md:text-3xl font-semibold text-ink">Business Competition Projects</h3>
              <p className="text-ink-2 leading-relaxed">
                20+ national business competitions. Financial models, market analyses, and strategic proposals from winning cases at Excelerate, Accolyze, Technopreneurship, and more.
              </p>
              <Link
                href="/bizcomp"
                rel="nofollow"
                className={textLink}
              >
                View Cases <FontAwesomeIcon icon={faArrowRight} className="w-4 h-4" />
              </Link>
            </div>
            <Link
              href="/bizcomp"
              rel="nofollow"
              className={`${media} cursor-pointer`}
            >
              <Image
                src="/bizcomp.png"
                alt="Business Competition Projects"
                fill
                sizes="(max-width: 768px) 100vw, 540px"
                className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
              />
            </Link>
          </div>
        </motion.div>
      </div>
    </motion.section>
  );
}
