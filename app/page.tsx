import Image from 'next/image';
// Imports the FontAwesomeIcon component and the specific icons you need
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faFacebook, faLinkedin, faYoutube } from '@fortawesome/free-brands-svg-icons';

export default function Page() {
  return (
    <div className="container mx-auto px-4 py-8">
      <h2 className="text-xl font-semibold mb-4 text-pink-600">Who is Shahoriar?</h2>

      {/* Hero Section: Profile picture and introduction */}
      <div className="flex flex-col md:flex-row items-center md:items-start gap-8 mb-8">
        <div className="w-48 h-48 flex-shrink-0">
          <Image
            src="/my-profile.jpg"
            alt="MD AL SHAHORIAR HOSSAIN"
            width={193}
            height={193}
            className="rounded-lg shadow-md object-cover w-full h-full"
          />
        </div>

        <div className="text-center md:text-left">
          <h1 className="text-3xl font-bold tracking-tight mb-2">MD AL SHAHORIAR HOSSAIN</h1>
          <p className="text-lg text-neutral-600 dark:text-neutral-300 leading-relaxed mb-4">
            Hello everyone! This is Shahoriar Hossain, aka Zaifears Republic. Thank you for showing interest in
            my life. This website is basically a portfolio and life log. Enjoy!
          </p>
        </div>
      </div>

      {/* About Me Section */}
      <div className="border-t pt-8 mt-8">
        <h2 className="text-2xl font-semibold mb-4">About me:</h2>
        <p className="text-neutral-600 dark:text-neutral-300 leading-relaxed">
          Tech enthusiast with a passion for stock market analysis and active investment. Occasionally
          writes about economy and finance-related issues. Recognized for trustworthiness and enthusiasm in
          expanding knowledge and learning new things. Feel free to reach out!
        </p>
      </div>

      {/* Social Links Section */}
      <div className="border-t pt-8 mt-8">
        <h2 className="text-2xl font-semibold mb-4">Social Links</h2>
        <div className="flex justify-start gap-6">
          {/* Replaced <i> tags with the FontAwesomeIcon component for reliability */}
          <a href="https://facebook.com/alshahoriar.hossain" target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:text-blue-800 text-3xl">
            <FontAwesomeIcon icon={faFacebook} />
          </a>
          <a href="https://www.linkedin.com/in/shahoriarhossain/" target="_blank" rel="noopener noreferrer" className="text-blue-700 hover:text-blue-900 text-3xl">
            <FontAwesomeIcon icon={faLinkedin} />
          </a>
          <a href="https://www.youtube.com/@takatunes" target="_blank" rel="noopener noreferrer" className="text-red-600 hover:text-red-800 text-3xl">
            <FontAwesomeIcon icon={faYoutube} />
          </a>
        </div>
      </div>
    </div>
  );
}
