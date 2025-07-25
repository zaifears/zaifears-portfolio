import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faFacebook, faLinkedin, faYoutube, faWhatsapp } from '@fortawesome/free-brands-svg-icons';
import { faPhone, faEnvelope } from '@fortawesome/free-solid-svg-icons';

const contactMethods = [
    { name: 'Phone', href: 'tel:+8801865333143', icon: faPhone },
    { name: 'Email', href: 'mailto:alshahoriar.hossain@gmail.com', icon: faEnvelope },
    { name: 'WhatsApp', href: 'https://wa.me/8801865333143', icon: faWhatsapp },
    { name: 'Facebook', href: 'https://facebook.com/alshahoriar.hossain', icon: faFacebook },
    { name: 'LinkedIn', href: 'https://www.linkedin.com/in/shahoriarhossain/', icon: faLinkedin },
    { name: 'YouTube', href: 'https://www.youtube.com/@takatunes', icon: faYoutube },
];

export default function ContactPage() {
  return (
    // Main container: Ensure it takes full height and centers content
    // min-h-[calc(100vh-100px)] ensures it fills the viewport minus a potential header/footer height
    // py-8 px-4 for overall page padding
    <section className="flex flex-col items-center justify-center min-h-[calc(100vh-100px)] text-center py-8 px-4">
      <h1 className="font-bold text-4xl md:text-5xl mb-4 text-neutral-800 dark:text-neutral-200">
        Contact Me
      </h1>
      <p className="text-lg text-neutral-600 dark:text-neutral-400 mb-12 max-w-xl">
        Want to connect? Feel free to reach out via any platform. I'm always open to new opportunities and collaborations.
      </p>

      {/* Grid container for contact methods */}
      {/* gap-6 for more spacing between items, mx-auto to center the grid on larger screens */}
      {/* max-w-3xl to give more room for the grid before wrapping */}
      <div className="grid grid-cols-2 md:grid-cols-3 gap-6 w-full max-w-3xl mx-auto">
        {contactMethods.map((method) => (
          <a
            key={method.name}
            href={method.href}
            target="_blank"
            rel="noopener noreferrer"
            className="flex flex-col items-center justify-center p-6 bg-neutral-900 border border-neutral-800 rounded-lg 
                       transition-all duration-300 hover:border-blue-500 hover:bg-neutral-800 hover:scale-105 
                       text-neutral-100 dark:text-neutral-100 shadow-lg" // Added shadow and text color
          >
            <FontAwesomeIcon icon={method.icon} className="w-8 h-8 mb-3 text-blue-400" /> {/* Increased icon size */}
            <span className="text-base font-medium">{method.name}</span>
          </a>
        ))}
      </div>
    </section>
  );
}
