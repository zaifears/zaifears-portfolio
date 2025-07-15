// This is the new page for your skills section, based on your visual design.
// The file should be located at: app/skills/page.tsx
import Image from 'next/image';

// Helper component for a single skill item to keep the code clean
const SkillItem = ({ icon, name }: { icon: string; name: string }) => (
  <div className="flex flex-col items-center text-center">
    <div className="relative w-20 h-20 mb-2">
      <Image
        src={`/${icon}`} // e.g., /problem.png
        alt={`${name} icon`}
        width={80}
        height={80}
        className="object-contain"
      />
    </div>
    <p className="font-semibold text-neutral-700 dark:text-neutral-300">{name}</p>
  </div>
);

const TechSkillItem = ({ title, logos, names }: { title: string; logos: { src: string, alt: string, href: string }[]; names: string }) => (
    <div className="flex flex-col items-center text-center p-6 border border-neutral-200 dark:border-neutral-800 rounded-lg h-full">
        <h3 className="text-xl font-bold mb-4">{title}</h3>
        <div className="flex justify-center items-center gap-4 mb-2 flex-grow">
            {logos.map(logo => (
                <a 
                    key={logo.src} 
                    href={logo.href} 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="transition-opacity hover:opacity-75"
                >
                    <div className="relative h-12 w-12">
                         <Image src={`/${logo.src}`} alt={logo.alt} layout="fill" objectFit="contain" />
                    </div>
                </a>
            ))}
        </div>
        <p className="text-neutral-600 dark:text-neutral-400 mt-auto">{names}</p>
    </div>
);


export default function SkillsPage() {
  return (
    <section>
      <h1 className="font-bold text-3xl text-center mb-12">Skills</h1>

      {/* --- Core Competencies Section --- */}
      <div className="mb-16">
        <h2 className="text-2xl font-bold text-center mb-8">Core Competencies</h2>
        <div className="grid grid-cols-2 md:grid-cols-3 gap-y-10 gap-x-6 max-w-4xl mx-auto">
          <SkillItem icon="problem.png" name="Problem-Solving" />
          <SkillItem icon="entrepreneurial.png" name="Entrepreneurial Mindset" />
          <SkillItem icon="analysis.png" name="Analysis & Research" />
          <SkillItem icon="financial.png" name="Financial & Economic Analysis" />
          <SkillItem icon="leadership.png" name="Leadership & Collaboration" />
          <SkillItem icon="presentation.png" name="Presentation & Communication" />
        </div>
      </div>

      {/* --- Technical Skills Section --- */}
      <div className="mb-16">
        <h2 className="text-2xl font-bold text-center mb-8">Technical Skills</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto">
            <TechSkillItem 
                title="Design"
                logos={[
                    {src: 'canva.png', alt: 'Canva', href: 'https://www.canva.com'}, 
                    {src: 'figma.png', alt: 'Figma', href: 'https://www.figma.com'}
                ]}
                names="Canva, Figma"
            />
            <TechSkillItem 
                title="Office & Productivity"
                logos={[
                    {src: 'office.png', alt: 'Microsoft Office', href: 'https://www.office.com'}, 
                    {src: 'google.png', alt: 'Google Workspace', href: 'https://workspace.google.com'}
                ]}
                names="Microsoft Office Suite, Google Workplace"
            />
            <TechSkillItem 
                title="Web Development"
                logos={[
                    {src: 'wordpress.png', alt: 'Wordpress', href: 'https://wordpress.org'}, 
                    {src: 'nextjs.png', alt: 'Next.js', href: 'https://nextjs.org'}
                ]}
                names="Wordpress, Next.js"
            />
            <TechSkillItem 
                title="Data Analysis"
                logos={[
                    {src: 'stata.png', alt: 'Stata', href: 'https://en.wikipedia.org/wiki/Stata'}, 
                    {src: 'spss.png', alt: 'SPSS', href: 'https://en.wikipedia.org/wiki/SPSS'}
                ]}
                names="Stata, SPSS"
            />
            <div className="md:col-span-2">
                 <TechSkillItem 
                    title="IT Support"
                    logos={[{src: 'computer.png', alt: 'Computer Hardware', href: '#'}]}
                    // ✅ UPDATED: The description for IT Support is now more detailed.
                    names="Proficient in building computers from scratch and disassembling hardware components. Skilled at diagnosing and resolving both hardware and software issues, providing comprehensive IT support from physical assembly to troubleshooting"
                />
            </div>
        </div>
      </div>

      {/* --- Contact Me Section --- */}
      <div className="mt-16 p-8 border border-neutral-200 dark:border-neutral-800 rounded-lg text-center bg-neutral-100 dark:bg-neutral-900">
        <h2 className="text-2xl font-bold text-neutral-900 dark:text-white">Got some work? Feel free to reach</h2>
        <div className="flex justify-center gap-8 mt-6">
          {/* Phone Link */}
          <a href="tel:+8801865333143" className="text-neutral-700 dark:text-neutral-300 hover:text-black dark:hover:text-white transition-colors">
            <svg className="w-10 h-10" fill="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path d="M6.62 10.79c1.44 2.83 3.76 5.14 6.59 6.59l2.2-2.2c.27-.27.67-.36 1.02-.24 1.12.37 2.33.57 3.57.57.55 0 1 .45 1 1V20c0 .55-.45 1-1 1-9.39 0-17-7.61-17-17 0-.55.45-1 1-1h3.5c.55 0 1 .45 1 1 0 1.25.2 2.45.57 3.57.11.35.03.74-.25 1.02l-2.2 2.2z"></path></svg>
          </a>
          {/* Email Link */}
          <a href="mailto:alshahoriar.hossain@gmail.com" className="text-neutral-700 dark:text-neutral-300 hover:text-black dark:hover:text-white transition-colors">
            <svg className="w-10 h-10" fill="currentColor" viewBox="0 0 512 512" xmlns="http://www.w3.org/2000/svg"><path d="M48 64C21.5 64 0 85.5 0 112c0 15.1 7.1 29.3 19.2 38.4L236.8 313.6c11.4 8.5 27 8.5 38.4 0L492.8 150.4c12.1-9.1 19.2-23.3 19.2-38.4c0-26.5-21.5-48-48-48H48zM0 176V384c0 35.3 28.7 64 64 64h384c35.3 0 64-28.7 64-64V176L294.4 339.2c-22.8 17.1-54 17.1-76.8 0L0 176z"></path></svg>
          </a>
          {/* WhatsApp Link */}
          <a href="https://wa.me/8801865333143" target="_blank" rel="noopener noreferrer" className="transition-opacity hover:opacity-75">
            <div className="relative w-10 h-10">
                <Image
                  src="/whatsapp.png"
                  alt="WhatsApp"
                  layout="fill"
                  objectFit="contain"
                />
            </div>
          </a>
        </div>
      </div>

      {/* --- Icon Attribution --- */}
      <div className="text-center mt-12">
        <p className="text-xs text-neutral-400 dark:text-neutral-600">
          Icons and logos sourced from <a href="https://www.flaticon.com" target="_blank" rel="noopener noreferrer" className="underline hover:text-blue-500">Flaticon</a>.
        </p>
      </div>
    </section>
  );
}
