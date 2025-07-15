// This is the new page for your skills section.
// The file should be located at: app/skills/page.tsx

export default function SkillsPage() {
  return (
    <section>
      <h1 className="font-bold text-3xl mb-8">Skills</h1>

      {/* --- Core Competencies Section --- */}
      <div className="mb-10">
        <h2 className="text-2xl font-semibold mb-4 text-neutral-800 dark:text-neutral-200">Core Competencies</h2>
        <ul className="list-disc list-inside space-y-2 text-neutral-700 dark:text-neutral-300">
          <li>Problem-Solving & Critical Thinking</li>
          <li>Analysis and Research</li>
          <li>Leadership & Team Collaboration</li>
          <li>Entrepreneurial Mindset</li>
          <li>Financial & Economic Analysis</li>
          <li>Presentation & Communication</li>
        </ul>
      </div>

      {/* --- Technical Skills Section --- */}
      <div className="mb-10">
        <h2 className="text-2xl font-semibold mb-4 text-neutral-800 dark:text-neutral-200">Technical Skills</h2>
        <ul className="list-disc list-inside space-y-2 text-neutral-700 dark:text-neutral-300">
          <li><strong>Office & Productivity:</strong> Microsoft Office Suite, Google Workplace</li>
          <li><strong>Design:</strong> Canva, Figma (Preliminary)</li>
          <li><strong>Web Development:</strong> WordPress & Elementor (Basic)</li>
          <li><strong>Data Analysis:</strong> Stata, SPSS (Preliminary Research)</li>
          <li><strong>IT Support:</strong> Computer Hardware Assembly & Troubleshooting</li>
        </ul>
      </div>

    </section>
  );
}
