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
  ctaText = 'Explore',
}: {
  title: string;
  description: string;
  icon: IconDefinition;
  href: string;
  className?: string;
  children?: React.ReactNode;
  ctaText?: string;
}) {
  return (
    <motion.div
      whileHover={{ y: -4 }}
      transition={{ duration: 0.25 }}
      className={`h-full ${className}`}
    >
      <Link href={href} className="block h-full rounded-card">
        <div className="group relative flex h-full flex-col rounded-card border border-rule bg-paper-2 p-6 transition-colors duration-200 hover:bg-paper-3">
          {children ? (
            children
          ) : (
            <>
              <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-control bg-accent-soft text-lg text-accent-text">
                <FontAwesomeIcon icon={icon} />
              </div>
              <h3 className="mb-2 text-xl font-semibold text-ink">{title}</h3>
              <p className="grow text-sm text-muted">{description}</p>
              <div className="mt-4 flex items-center gap-2 text-ink">
                <span className="text-sm font-medium">{ctaText}</span>
                <span className="flex h-7 w-7 items-center justify-center rounded-full bg-accent text-accent-ink transition-transform duration-200 group-hover:translate-x-1">
                  <FontAwesomeIcon icon={faArrowRight} className="h-3 w-3" />
                </span>
              </div>
            </>
          )}
        </div>
      </Link>
    </motion.div>
  );
}
