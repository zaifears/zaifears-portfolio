import Link from 'next/link'

const navItems = {
  '/': {
    name: 'Home',
  },
  '/education': {
    name: 'Education',
  },
  '/skills': {
    name: 'Skills',
  },
  // The path for Blog can be a placeholder like '#' since it's not a real link now.
  '/blog': {
    name: 'Blog',
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
            // ✅ If the item is 'Blog', render it as a disabled-looking span.
            if (name === 'Blog') {
              return (
                <span
                  key={path}
                  className="text-neutral-500 dark:text-neutral-600 flex align-middle relative py-1 px-2 cursor-not-allowed"
                  title="Under Maintenance"
                >
                  {name}
                </span>
              );
            }
            // Otherwise, render it as a normal link.
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
