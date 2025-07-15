import Image from 'next/image';
// We still need these for the social media icons.
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faFacebook, faLinkedin, faYoutube } from '@fortawesome/free-brands-svg-icons';

// ✅ The problematic 'import { BlogPosts } from ...' line has been removed.

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
        <div className="flex justify-start gap-6 items-center">
          {/* Facebook Link */}
          <a href="https://facebook.com/alshahoriar.hossain" target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:text-blue-800 text-3xl">
            <FontAwesomeIcon icon={faFacebook} />
          </a>
          {/* LinkedIn Link */}
          <a href="https://www.linkedin.com/in/shahoriarhossain/" target="_blank" rel="noopener noreferrer" className="text-blue-700 hover:text-blue-900 text-3xl">
            <FontAwesomeIcon icon={faLinkedin} />
          </a>
          {/* YouTube Link */}
          <a href="https://www.youtube.com/@takatunes" target="_blank" rel="noopener noreferrer" className="text-red-600 hover:text-red-800 text-3xl">
            <FontAwesomeIcon icon={faYoutube} />
          </a>
          
          {/* Email link using a reliable inline SVG */}
          <a href="mailto:alshahoriar.hossain@gmail.com" className="text-neutral-500 dark:text-neutral-400 hover:text-black dark:hover:text-white text-3xl">
            <svg
              className="w-8 h-8"
              fill="currentColor"
              viewBox="0 0 512 512"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path d="M48 64C21.5 64 0 85.5 0 112c0 15.1 7.1 29.3 19.2 38.4L236.8 313.6c11.4 8.5 27 8.5 38.4 0L492.8 150.4c12.1-9.1 19.2-23.3 19.2-38.4c0-26.5-21.5-48-48-48H48zM0 176V384c0 35.3 28.7 64 64 64h384c35.3 0 64-28.7 64-64V176L294.4 339.2c-22.8 17.1-54 17.1-76.8 0L0 176z" />
            </svg>
          </a>
        </div>
      </div>
    </div>
  );
}
// Force new commit