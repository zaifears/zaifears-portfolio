"use client";

import Link from 'next/link';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowRight } from '@fortawesome/free-solid-svg-icons';
import { motion } from 'framer-motion';
import type { IconDefinition } from '@fortawesome/fontawesome-svg-core';

export default function BentoCard({
  title,
  description,
  icon,
  href,
  className = "col-span-1 row-span-1",
  children,
}: {
  title: string;
  description: string;
  icon: IconDefinition;
  href: string;
  className?: string;
  children?: React.ReactNode;
}) {
  return (
    <motion.div
      whileHover={{ y: -8 }}
      transition={{ duration: 0.3 }}
      className={`h-full ${className}`}
    >
      <Link href={href} className="block h-full">
        <div className="relative h-full p-6 rounded-2xl border border-gray-200 dark:border-white/10 backdrop-blur-xl transition-all duration-300 hover:border-gray-300 dark:hover:border-white/20 overflow-hidden group cursor-pointer bg-gray-100/50 dark:bg-white/5">
          <div className="absolute inset-0 bg-gray-100/0 group-hover:bg-gray-100/50 dark:bg-white/0 dark:group-hover:bg-white/5 transition-colors duration-300" />

          <div className="relative z-10 flex flex-col h-full">
            {children ? (
              children
            ) : (
              <>
                <div className="text-3xl mb-3 text-gray-500 dark:text-white/60 group-hover:text-gray-700 dark:group-hover:text-white/80 transition-colors duration-300">
                  <FontAwesomeIcon icon={icon} />
                </div>
                <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-2">{title}</h3>
                <p className="text-gray-600 dark:text-white/50 text-sm grow">{description}</p>
                <div className="mt-4 flex items-center gap-2 text-gray-500 dark:text-white/60 group-hover:text-gray-700 dark:group-hover:text-white/80 transition-colors duration-300">
                  <span className="text-sm font-medium">Explore</span>
                  <motion.span
                    className="inline-block"
                    whileHover={{ x: 4 }}
                  >
                    <FontAwesomeIcon icon={faArrowRight} className="w-4 h-4" />
                  </motion.span>
                </div>
              </>
            )}
          </div>
        </div>
      </Link>
    </motion.div>
  );
}
