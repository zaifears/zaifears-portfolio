import Link from 'next/link'

const navItems = {
  '/': {
    name: 'Home',
  },
  // ✅ UPDATED: Changed 'contact me' to 'education' and linked it to a new page.
  '/education': {
    name: 'Education',
  },
}

export function Navbar() {
  return (
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
