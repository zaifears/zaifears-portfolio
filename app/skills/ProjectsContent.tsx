"use client";

import { motion } from "framer-motion";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowUpRightFromSquare } from "@fortawesome/free-solid-svg-icons";

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.1, delayChildren: 0.1 },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5 } },
};

const features: { icon: string; text: string }[] = [
  { icon: "🔐", text: "Role-based login — 9 teams, 9 passwords, each team sees only their own data" },
  { icon: "⚡", text: "Auto-fill — select a name, ID and designation populate instantly" },
  { icon: "📅", text: "Custom calendar date picker — built from scratch in VBA, no third-party tools" },
  { icon: "📊", text: "Individual report generator — one click pulls any employee's full absence history" },
  { icon: "🔄", text: "Live leave totals — automatically aggregated across all 9 teams" },
  { icon: "💾", text: "Auto-save — data saves silently every time a user leaves their sheet" },
  { icon: "🖥️", text: "Looks and feels like a standalone app — no Excel ribbon, no sheet tabs, no formula bar" },
];

const tools: string[] = [
  "Excel VBA",
  "UserForms",
  "Class Modules",
  "XLOOKUP",
  "SUMIFS",
  "INDIRECT",
];

export default function ProjectsContent() {
  return (
    <motion.div
      variants={containerVariants}
      initial="hidden"
      animate="visible"
      className="max-w-5xl mx-auto space-y-8"
    >
      {/* Section header */}
      <motion.div variants={itemVariants} className="text-center mb-10">
        <h2 className="text-3xl font-bold mb-3">Featured Projects</h2>
        <p className="text-gray-600 dark:text-gray-400">
          A showcase of my recent technical and business projects.
        </p>
      </motion.div>

      {/* ── Leave Tracker Pro card ── */}
      <motion.div
        variants={itemVariants}
        className="group bg-gray-50 dark:bg-gray-900/50 dark:backdrop-blur-sm border border-gray-200 dark:border-gray-800/50 rounded-2xl overflow-hidden transition-all duration-300 hover:border-blue-500/30 hover:shadow-lg"
      >

        {/* ── TOP: 16:9 video full width ── */}
        <div className="relative w-full" style={{ paddingBottom: "56.25%" }}>
          <iframe
            className="absolute inset-0 w-full h-full"
            src="https://www.youtube.com/embed/cPi_UGe0LQE"
            title="I Built a Full Leave Tracker System in Excel"
            frameBorder="0"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
            referrerPolicy="strict-origin-when-cross-origin"
            allowFullScreen
          />
        </div>

        {/* ── MIDDLE: title + story + tools in a two-col layout on desktop ── */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-0 border-t border-gray-200 dark:border-gray-800/50">

          {/* Left col — title + story */}
          <div className="p-6 md:p-8 flex flex-col gap-4 md:border-r border-gray-200 dark:border-gray-800/50">
            <div>
              <span className="inline-block text-xs font-semibold tracking-widest uppercase text-blue-600 dark:text-blue-400 bg-blue-50 dark:bg-blue-900/30 border border-blue-100 dark:border-blue-800/40 px-3 py-1 rounded-full mb-3">
                Excel VBA · HR Automation
              </span>
              <h3 className="text-xl md:text-2xl font-bold text-gray-900 dark:text-white leading-snug group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors duration-300">
                I Built a Full Leave Tracker System in Excel
              </h3>
            </div>
            <div className="text-sm text-gray-600 dark:text-gray-400 leading-relaxed space-y-2">
              <p>
                Our department was tracking absences for 9 teams in a single
                shared spreadsheet — no access control, no validation, pure chaos.
              </p>
              <p>
                My first idea was to fix it entirely with Excel formulas.
                That lasted about 10 minutes.
              </p>
              <p>
                So I learned VBA from scratch and built a proper role-based HR
                absence management system — in a single day.
              </p>
            </div>
            <a
              href="https://www.youtube.com/watch?v=cPi_UGe0LQE"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 text-sm text-gray-500 dark:text-white/60 group-hover:text-gray-900 dark:group-hover:text-white transition-colors w-fit mt-auto"
            >
              Watch on YouTube
              <FontAwesomeIcon icon={faArrowUpRightFromSquare} className="w-3 h-3" />
            </a>
          </div>

          {/* Right col — tool tags + feature list */}
          <div className="p-6 md:p-8 flex flex-col gap-5">

            {/* Tools */}
            <div>
              <p className="text-xs font-semibold uppercase tracking-widest text-gray-400 dark:text-gray-500 mb-3">
                Tools used
              </p>
              <div className="flex flex-wrap gap-2">
                {tools.map((tool) => (
                  <span
                    key={tool}
                    className="text-xs font-medium bg-gray-100 dark:bg-gray-800/50 border border-gray-200 dark:border-gray-700/50 text-gray-700 dark:text-gray-300 px-2.5 py-1 rounded-lg"
                  >
                    {tool}
                  </span>
                ))}
              </div>
            </div>

            {/* Features */}
            <div>
              <p className="text-xs font-semibold uppercase tracking-widest text-gray-400 dark:text-gray-500 mb-3">
                What it does
              </p>
              <div className="flex flex-col gap-2.5">
                {features.map((f) => (
                  <div
                    key={f.text}
                    className="flex items-start gap-2.5 text-sm text-gray-600 dark:text-gray-400"
                  >
                    <span className="mt-0.5 shrink-0">{f.icon}</span>
                    <span className="leading-snug">{f.text}</span>
                  </div>
                ))}
              </div>
            </div>

          </div>
        </div>

        {/* ── BOTTOM: footer note ── */}
        <div className="px-6 md:px-8 py-4 border-t border-gray-200 dark:border-gray-800/50">
          <p className="text-xs text-gray-400 dark:text-gray-500">
            Built entirely in Microsoft Excel VBA — no database, no server, no paid tools.
          </p>
        </div>

      </motion.div>

      {/* Add more project cards below here */}
    </motion.div>
  );
}