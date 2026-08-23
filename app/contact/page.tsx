import { Metadata } from 'next';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faFacebook, faLinkedin, faYoutube } from '@fortawesome/free-brands-svg-icons';
import { faEnvelope, faCalendarAlt } from '@fortawesome/free-solid-svg-icons';

export const metadata: Metadata = {
  title: 'Contact',
  description: 'Get in touch with Md Al Shahoriar Hossain via email, LinkedIn, Facebook, or YouTube. Available for professional inquiries, collaborations, and networking opportunities.',
  alternates: {
    canonical: 'https://shahoriar.bd/contact',
  },
};

const contactMethods = [
  { name: 'Email', href: 'mailto:alshahoriar.hossain@gmail.com', icon: faEnvelope, color: 'text-blue-600 dark:text-blue-400', hoverColor: 'hover:border-blue-500/50', description: 'Send an email for professional inquiries' },
  { name: 'LinkedIn', href: 'https://www.linkedin.com/in/shahoriarhossain/', icon: faLinkedin, color: 'text-blue-600 dark:text-blue-400', hoverColor: 'hover:border-blue-500/50', description: 'Professional networking and career updates' },
  { name: 'Facebook', href: 'https://facebook.com/alshahoriar.hossain', icon: faFacebook, color: 'text-blue-600 dark:text-blue-400', hoverColor: 'hover:border-blue-500/50', description: 'Personal updates and messaging' },
  { name: 'YouTube', href: 'https://www.youtube.com/@takatunes', icon: faYoutube, color: 'text-blue-600 dark:text-blue-400', hoverColor: 'hover:border-blue-500/50', description: 'Educational video content & walkthroughs' },
];

export default function ContactPage() {
  return (
    <div className="min-h-screen bg-white dark:bg-black text-gray-900 dark:text-white overflow-hidden">
      {/* Animated gradient background */}
      <div className="fixed inset-0 md:left-64 z-0">
        <div className="absolute -top-40 -right-40 w-96 h-96 bg-blue-500/20 dark:bg-blue-500/10 rounded-full mix-blend-multiply filter blur-3xl animate-blob will-change-transform" />
        <div className="absolute -bottom-40 -left-40 w-96 h-96 bg-blue-500/10 dark:bg-blue-500/5 rounded-full mix-blend-multiply filter blur-3xl animate-blob animation-delay-2000 will-change-transform" />
      </div>

      {/* Content */}
      <div className="relative z-10">
      <div className="max-w-6xl mx-auto px-4 py-12">
        {/* Header */}
        <div className="mb-14">
          <h1 className="text-4xl md:text-5xl font-bold tracking-tight mb-4">Contact</h1>
          <p className="text-gray-600 dark:text-gray-400 text-lg max-w-2xl">
            Want to connect? Feel free to reach out via any platform. Available for professional inquiries, collaborations, and discussions.
          </p>
        </div>

        {/* Schedule Meeting Card - Featured */}
        <div className="mb-12 max-w-4xl">
          <a
            href="https://cal.com/zaifears"
            target="_blank"
            rel="noopener noreferrer"
            className="group block bg-gray-50 dark:bg-gray-900/50 border border-gray-200 dark:border-gray-800 rounded-2xl p-6 md:p-8 hover:border-blue-500/50 dark:hover:border-blue-500 transition-all duration-300 hover:scale-[1.01] hover:shadow-xl hover:shadow-blue-600/10"
          >
            <div className="flex flex-col md:flex-row items-center gap-6">
              <div className="shrink-0">
                <div className="w-16 h-16 md:w-20 md:h-20 bg-gray-100 dark:bg-gray-800 rounded-2xl flex items-center justify-center group-hover:bg-blue-50 dark:group-hover:bg-blue-900/30 transition-colors duration-300">
                  <FontAwesomeIcon icon={faCalendarAlt} className="w-8 h-8 md:w-10 md:h-10 text-blue-600 dark:text-blue-400" />
                </div>
              </div>
              <div className="text-center md:text-left flex-1">
                <h2 className="text-xl md:text-2xl font-bold mb-2 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors duration-300">Schedule an Online Meeting</h2>
                <p className="text-sm md:text-base text-gray-600 dark:text-gray-400 group-hover:text-gray-700 dark:group-hover:text-gray-300 transition-colors duration-300">
                  Book a time to discuss finance opportunities, software projects, or collaboration.
                </p>
              </div>
              <div className="shrink-0">
                <span className="inline-flex items-center gap-2 text-sm font-semibold text-blue-600 dark:text-blue-400">
                  Book on Cal.com
                  <svg className="w-4 h-4 transition-transform group-hover:translate-x-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6"/>
                  </svg>
                </span>
              </div>
            </div>
          </a>
        </div>

        {/* Contact Methods Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6">
          {contactMethods.map((method) => (
            <a
              key={method.name}
              href={method.href}
              target="_blank"
              rel="noopener noreferrer"
              className={`group bg-gray-50 dark:bg-gray-900/50 dark:backdrop-blur-sm border border-gray-200 dark:border-gray-800/50 rounded-2xl p-6 ${method.hoverColor} transition-all duration-300 hover:scale-[1.02] hover:shadow-lg`}
            >
              <div className="flex flex-col h-full">
                <div className="w-12 h-12 bg-gray-100 dark:bg-gray-800/50 rounded-xl flex items-center justify-center mb-4 group-hover:bg-blue-50 dark:group-hover:bg-blue-900/30 transition-colors duration-300">
                  <FontAwesomeIcon icon={method.icon} className={`w-5 h-5 ${method.color}`} />
                </div>
                <h3 className="text-lg font-bold mb-1 text-gray-900 dark:text-white group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors duration-300">{method.name}</h3>
                <p className="text-gray-600 dark:text-gray-400 text-sm leading-relaxed grow">
                  {method.description}
                </p>
                <div className="mt-4 flex items-center text-blue-600 dark:text-blue-400 text-sm font-semibold">
                  <span>Connect</span>
                  <svg className="w-4 h-4 ml-1 transition-transform group-hover:translate-x-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14"/>
                  </svg>
                </div>
              </div>
            </a>
          ))}
        </div>

        {/* Additional Contact Info */}
        <div className="mt-16">
          <div className="bg-gray-50 dark:bg-gray-900/30 dark:backdrop-blur-sm border border-gray-200 dark:border-gray-800/50 rounded-2xl p-8 max-w-2xl">
            <h3 className="text-2xl font-bold mb-3">Let&apos;s Work Together</h3>
            <p className="text-gray-600 dark:text-gray-400 leading-relaxed text-sm md:text-base">
              Whether you&apos;re looking to discuss finance and risk advisory, explore software development projects, or talk about technopreneurship in Bangladesh, I&apos;m always glad to connect.
            </p>
          </div>
        </div>
      </div>
      </div>
    </div>
  );
}