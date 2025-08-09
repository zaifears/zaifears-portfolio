import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faFacebook, faLinkedin, faYoutube } from '@fortawesome/free-brands-svg-icons';
import { faEnvelope, faCalendarAlt } from '@fortawesome/free-solid-svg-icons';

const contactMethods = [
    { name: 'Email', href: 'mailto:alshahoriar.hossain@gmail.com', icon: faEnvelope },
    { name: 'Facebook', href: 'https://facebook.com/alshahoriar.h-ossain', icon: faFacebook },
    { name: 'LinkedIn', href: 'https://www.linkedin.com/in/shahoriarhossain/', icon: faLinkedin },
    { name: 'YouTube', href: 'https://www.youtube.com/@takatunes', icon: faYoutube },
];

export default function ContactPage() {
  return (
    <section className="flex flex-col items-center justify-center min-h-[calc(100vh-100px)] text-center py-8 px-4">
      <h1 className="font-bold text-4xl md:text-5xl mb-4 text-neutral-800 dark:text-neutral-200">
        Contact Me
      </h1>
      <p className="text-lg text-neutral-600 dark:text-neutral-400 mb-12 max-w-xl">
        Want to connect? Feel free to reach out via any platform. I'm always open to new opportunities and collaborations.
      </p>

      {/* Full-width button for scheduling a meeting is now at the top */}
      <div className="w-full max-w-3xl mx-auto mb-6">
        <a
          href="https://cal.com/zaifears"
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center justify-center p-6 bg-neutral-900 border border-neutral-800 rounded-lg 
                     transition-all duration-300 hover:border-blue-500 hover:bg-neutral-800 hover:scale-105 
                     text-neutral-100 dark:text-neutral-100 shadow-lg w-full"
        >
          <FontAwesomeIcon icon={faCalendarAlt} className="w-8 h-8 mr-4 text-blue-400" />
          <span className="text-base font-medium">Schedule an Online Meeting</span>
        </a>
      </div>

      {/* Grid container for the other contact methods */}
      <div className="grid grid-cols-2 md:grid-cols-2 gap-6 w-full max-w-3xl mx-auto">
        {contactMethods.map((method) => (
          <a
            key={method.name}
            href={method.href}
            target="_blank"
            rel="noopener noreferrer"
            className="flex flex-col items-center justify-center p-6 bg-neutral-900 border border-neutral-800 rounded-lg 
                       transition-all duration-300 hover:border-blue-500 hover:bg-neutral-800 hover:scale-105 
                       text-neutral-100 dark:text-neutral-100 shadow-lg"
          >
            <FontAwesomeIcon icon={method.icon} className="w-8 h-8 mb-3 text-blue-400" />
            <span className="text-base font-medium">{method.name}</span>
          </a>
        ))}
      </div>
    </section>
  );
}