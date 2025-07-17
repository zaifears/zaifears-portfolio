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
    <section className="flex flex-col items-center justify-center text-center">
      <h1 className="font-bold text-4xl mb-4">Contact Me</h1>
      <p className="text-lg text-gray-400 mb-12">
        Want to connect? Feel free to reach out via any platform.
      </p>

      <div className="grid grid-cols-2 md:grid-cols-3 gap-4 w-full max-w-2xl">
        {contactMethods.map((method) => (
          <a
            key={method.name}
            href={method.href}
            target="_blank"
            rel="noopener noreferrer"
            // ✅ UPDATED: Removed 'aspect-square' and adjusted padding for smaller boxes.
            className="flex flex-col items-center justify-center p-4 bg-gray-900 border border-gray-800 rounded-lg transition-all duration-300 hover:border-blue-400 hover:bg-gray-800 hover:scale-105"
          >
            {/* ✅ UPDATED: Adjusted icon size and margin. */}
            <FontAwesomeIcon icon={method.icon} className="w-7 h-7 mb-2 text-blue-400" />
            <span className="text-base text-white">{method.name}</span>
          </a>
        ))}
      </div>
    </section>
  );
}
