import Link from 'next/link'

// The navItems object now holds the direct links.
// I've changed the key for "contact me" to be the actual mailto link.
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
    <aside className="-ml-[8px] mb-16 tracking-tight">
      <div className="lg:sticky lg:top-20">
        <nav
          className="flex flex-row items-start relative px-0 pb-0 fade md:overflow-auto scroll-pr-6 md:relative"
          id="nav"
        >
          <div className="flex flex-row space-x-0 pr-10">
            {/* The rest of the code works as before. It reads the key as the link destination (href). */}
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
      </div>
    </aside>
  )
}
