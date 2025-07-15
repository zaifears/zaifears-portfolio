export default function Footer() {
  return (
    <footer className="mb-16">
        {/* All the previous links like rss, github, etc., have been removed. */}
        {/* The copyright text has been updated to your name. */}
        {/* The year will still update automatically. */}
        <p className="text-sm text-neutral-600 dark:text-neutral-400">
          © {new Date().getFullYear()} Shahoriar Hossain
        </p>
    </footer>
  )
}
