import Link from 'next/link'

const navItems = {
  '/': {
    name: 'Home',
  },
  'mailto:alshahoriar.hossain@gmail.com': {
    name: 'Contact Me',
  },
}

export function Navbar() {
  return (
    // ✅ UPDATED: These classes make the navigation bar sticky.
    // 'sticky top-0' pins it to the top of the screen.
    // 'z-50' ensures it stays above other content.
    // 'bg-white dark:bg-black' gives it a solid background so content doesn't show through.
    // 'py-4' adds some vertical padding for spacing.
    // 'border-b' adds a subtle line underneath for visual separation.
    <aside className="sticky top-0 z-50 bg-white dark:bg-black -ml-[8px] mb-16 tracking-tight py-4 border-b border-neutral-200 dark:border-neutral-800">
      <nav
        className="flex flex-row items-start relative px-0 pb-0 fade md:overflow-auto scroll-pr-6"
        id="nav"
      >
        <div className="flex flex-row space-x-0 pr-10">
          {Object.entries(navItems).map(([path, { name }]) => {
            return (
              <Link
                key={path}
                href={path}
                className="transition-all hover:text-neutral-800 dark:hover:text-neutral-200 flex align-middle relative py-1 px-2"
              >
                {name}
              </Link>
            )
          })}
        </div>
      </nav>
    </aside>
  )
}
