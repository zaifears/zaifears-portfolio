import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faFacebook, faLinkedin, faYoutube } from '@fortawesome/free-brands-svg-icons';
import { faEnvelope, faCalendarAlt } from '@fortawesome/free-solid-svg-icons';

const contactMethods = [
    { name: 'Email', href: 'mailto:alshahoriar.hossain@gmail.com', icon: faEnvelope, color: 'text-red-400', hoverColor: 'hover:border-red-500', description: 'Send me an email for professional inquiries' },
    { name: 'Facebook', href: 'https://facebook.com/alshahoriar.hossain', icon: faFacebook, color: 'text-blue-500', hoverColor: 'hover:border-blue-500', description: 'Connect with me on Facebook' },
    { name: 'LinkedIn', href: 'https://www.linkedin.com/in/shahoriarhossain/', icon: faLinkedin, color: 'text-blue-600', hoverColor: 'hover:border-blue-600', description: 'Professional networking and career updates' },
    { name: 'YouTube', href: 'https://www.youtube.com/@takatunes', icon: faYoutube, color: 'text-red-500', hoverColor: 'hover:border-red-500', description: 'Check out my video content' },
];

export default function ContactPage() {
  return (
    <div className="min-h-screen bg-black text-white">
      <div className="max-w-6xl mx-auto px-4 py-12">
        {/* Header */}
        <div className="text-center mb-16">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">Contact Me</h1>
          <p className="text-gray-400 text-lg max-w-2xl mx-auto">
            Want to connect? Feel free to reach out via any platform. I'm always open to new opportunities and collaborations.
          </p>
        </div>

        {/* Schedule Meeting Card - Featured */}
        <div className="mb-12 max-w-4xl mx-auto">
          <a
            href="https://cal.com/zaifears"
            target="_blank"
            rel="noopener noreferrer"
            className="group block bg-gradient-to-r from-blue-600/20 to-purple-600/20 backdrop-blur-sm border border-blue-500/30 rounded-2xl p-8 hover:border-blue-400/50 hover:bg-gradient-to-r hover:from-blue-600/30 hover:to-purple-600/30 transition-all duration-300 hover:transform hover:scale-[1.02] hover:shadow-2xl hover:shadow-blue-600/10"
          >
            <div className="flex items-center justify-center gap-6">
              <div className="flex-shrink-0">
                <div className="w-20 h-20 bg-blue-600/20 rounded-2xl flex items-center justify-center group-hover:bg-blue-600/30 transition-colors duration-300">
                  <FontAwesomeIcon icon={faCalendarAlt} className="w-10 h-10 text-blue-400" />
                </div>
              </div>
              <div className="text-center">
                <h2 className="text-2xl font-bold mb-2 group-hover:text-blue-400 transition-colors duration-300">Schedule an Online Meeting</h2>
                <p className="text-gray-400 group-hover:text-gray-300 transition-colors duration-300">
                  Book a time that works for both of us to discuss opportunities, projects, or just to chat
                </p>
              </div>
              <div className="flex-shrink-0">
                <svg className="w-6 h-6 text-gray-400 group-hover:text-white transition-all duration-300 group-hover:transform group-hover:translate-x-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6"/>
                </svg>
              </div>
            </div>
          </a>
        </div>

        {/* Contact Methods Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 max-w-6xl mx-auto">
          {contactMethods.map((method) => (
            <a
              key={method.name}
              href={method.href}
              target="_blank"
              rel="noopener noreferrer"
              className={`group bg-gray-900/50 backdrop-blur-sm border border-gray-800/50 rounded-2xl p-6 hover:bg-gray-800/50 ${method.hoverColor} transition-all duration-300 hover:transform hover:scale-[1.05] hover:shadow-2xl text-center`}
            >
              <div className="flex flex-col items-center">
                <div className="w-16 h-16 bg-gray-800/50 rounded-xl flex items-center justify-center mb-4 group-hover:bg-gray-700/50 transition-colors duration-300">
                  <FontAwesomeIcon icon={method.icon} className={`w-8 h-8 ${method.color} transition-transform duration-300 group-hover:scale-110`} />
                </div>
                <h3 className="text-xl font-bold mb-2 group-hover:text-white transition-colors duration-300">{method.name}</h3>
                <p className="text-gray-400 text-sm leading-relaxed group-hover:text-gray-300 transition-colors duration-300">
                  {method.description}
                </p>
                <div className="mt-3 flex items-center text-blue-400 text-sm font-semibold opacity-0 group-hover:opacity-100 transition-all duration-300 group-hover:transform group-hover:translate-y-0 translate-y-2">
                  Get in touch
                  <svg className="w-4 h-4 ml-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14"/>
                  </svg>
                </div>
              </div>
            </a>
          ))}
        </div>

        {/* Additional Contact Info */}
        <div className="mt-16 text-center">
          <div className="bg-gray-900/30 backdrop-blur-sm border border-gray-800/50 rounded-2xl p-8 max-w-2xl mx-auto">
            <h3 className="text-2xl font-bold mb-4">Let's Work Together</h3>
            <p className="text-gray-400 leading-relaxed">
              Whether you're looking for collaboration on a project, need technical assistance, or just want to have a conversation about finance, technology, or entrepreneurship, I'd love to hear from you. Don't hesitate to reach out through any of the channels above!
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}