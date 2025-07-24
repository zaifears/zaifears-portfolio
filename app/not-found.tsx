    import Link from 'next/link';

    export default function NotFound() {
      return (
        <div className="flex flex-col items-center justify-center min-h-[calc(100vh-100px)] text-center px-4">
          <h1 className="text-6xl md:text-8xl font-bold text-neutral-800 dark:text-neutral-200 mb-4">
            404
          </h1>
          <p className="text-4xl md:text-5xl text-neutral-600 dark:text-neutral-400 mb-8">
            ¯\_(ツ)_/¯
          </p>
          <h2 className="text-2xl md:text-3xl font-semibold text-neutral-700 dark:text-neutral-300 mb-6">
            Page Not Found
          </h2>
          <p className="text-lg text-neutral-600 dark:text-neutral-400 mb-8 max-w-md">
            Oops! It seems the page you're looking for doesn't exist or has been moved.
            Don't worry, I made this website using AI, so it was bound to happen XD.
          </p>
          <Link
            href="/"
            className="px-6 py-3 rounded-lg bg-neutral-800 text-white dark:bg-neutral-200 dark:text-black
                       hover:bg-neutral-700 dark:hover:bg-neutral-300 transition-colors text-lg font-medium"
          >
            Go back home
          </Link>
        </div>
      );
    }
    