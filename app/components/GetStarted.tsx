"use client";

import Link from 'next/link';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowRight, faMicrochip, faPalette, faTerminal } from '@fortawesome/free-solid-svg-icons';
import { motion } from 'framer-motion';

const links = [
  { href: '/techtips', label: 'Tech Tips', note: 'Quick guides and technical notes', icon: faMicrochip },
  { href: '/design-portfolio', label: 'Design Portfolio', note: 'Graphic design and visual work', icon: faPalette },
  { href: '/ide', label: 'Code in Python', note: 'A Python editor in your browser', icon: faTerminal },
];

export default function GetStarted() {
  return (
    <motion.section
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "0px 0px -100px 0px" }}
      transition={{ duration: 0.5 }}
      className="max-w-6xl mx-auto py-10 md:py-12"
    >
      <h2 className="text-2xl md:text-3xl font-semibold mb-6 text-ink">Explore More</h2>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
        {links.map((l) => (
          <Link
            key={l.href}
            href={l.href}
            className="group flex items-center gap-4 rounded-card border border-rule bg-paper-2 p-4 transition-colors duration-200 hover:bg-paper-3"
          >
            <span className="flex h-12 w-12 shrink-0 items-center justify-center rounded-control bg-accent-soft text-accent-text">
              <FontAwesomeIcon icon={l.icon} aria-hidden="true" />
            </span>
            <span className="min-w-0 grow">
              <span className="block font-semibold text-ink">{l.label}</span>
              <span className="block text-sm text-muted">{l.note}</span>
            </span>
            <FontAwesomeIcon icon={faArrowRight} className="h-4 w-4 text-muted transition-transform duration-200 group-hover:translate-x-1" aria-hidden="true" />
          </Link>
        ))}
      </div>
    </motion.section>
  );
}
