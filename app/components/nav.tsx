"use client";

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faHome,
  faUserGraduate,
  faCogs,
  faEnvelope,
  faFlag,
  faCalendarAlt,
  faMicrochip
} from '@fortawesome/free-solid-svg-icons';

interface NavItem {
  href: string;
  name: string;
  icon: any;
  desktopOnly?: boolean;
}

const navItems: NavItem[] = [
  { href: '/', name: 'Home', icon: faHome },
  { href: '/life', name: 'Life', icon: faFlag },
  { href: '/skills', name: 'Skills', icon: faCogs },
  { href: '/techtips', name: 'Tech Tips', icon: faMicrochip },
  { href: '/education', name: 'Education', icon: faUserGraduate },
  { href: '/contact', name: 'Contact', icon: faEnvelope },
  {
    href: 'https://cal.com/zaifears',
    name: 'Schedule a Meeting',
    icon: faCalendarAlt,
    desktopOnly: true
  },
];

const isNavItemActive = (itemHref: string, pathname: string): boolean => {
  if (itemHref === '/') {
    return pathname === '/';
  }
  return pathname.startsWith(itemHref);
};

export function Navbar() {
  const pathname = usePathname();

  return (
    <>
      {/* Desktop Sidebar */}
      <aside className="hidden md:flex md:flex-col md:fixed md:inset-y-0 md:left-0 md:z-40 w-64 p-6 bg-transparent text-gray-600 dark:text-gray-400 font-mono justify-center md:h-screen md:overflow-y-auto">
        <nav>
          <ul>
            {navItems.map((item) => {
              const isActive = isNavItemActive(item.href, pathname);
              const isExternal = item.href.startsWith('http');

              if (isExternal) {
                return (
                  <li key={item.name} className="mb-4">
                    <a
                      href={item.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      className={`flex items-center p-2 rounded-md transition-all duration-300 hover:text-blue-500 dark:hover:text-blue-400 hover:bg-gray-200 dark:hover:bg-gray-900`}
                    >
                      <FontAwesomeIcon icon={item.icon} className="w-5 h-5 mr-3" />
                      <span>{item.name}</span>
                    </a>
                  </li>
                );
              }

              return (
                <li key={item.name} className="mb-4">
                  <Link
                    href={item.href}
                    className={`flex items-center p-2 rounded-md transition-all duration-300 ${
                      isActive
                        ? 'text-blue-600 bg-gray-200 dark:text-blue-400 dark:bg-gray-800 scale-95 translate-x-2'
                        : 'hover:text-blue-500 dark:hover:text-blue-400 hover:bg-gray-200 dark:hover:bg-gray-900'
                    }`}
                  >
                    <FontAwesomeIcon icon={item.icon} className="w-5 h-5 mr-3" />
                    <span>{item.name}</span>
                  </Link>
                </li>
              );
            })}
          </ul>
        </nav>
      </aside>

      {/* Mobile Bottom Navigation Bar - Floating Glass Pill */}
      <div className="md:hidden fixed bottom-4 left-4 right-4 z-50">
        <nav className="flex justify-between items-center gap-1 py-3 px-1 bg-white/80 dark:bg-gray-900/80 backdrop-blur-xl rounded-2xl shadow-lg shadow-black/10 dark:shadow-black/30 border border-gray-200/50 dark:border-white/10">
          {navItems
            .filter(item => !item.desktopOnly)
            .map((item) => {
              const isActive = isNavItemActive(item.href, pathname);

              return (
                <Link
                  key={item.name}
                  href={item.href}
                  className={`relative flex flex-1 flex-col items-center justify-center gap-1 py-2 px-0.5 rounded-lg transition-all duration-300 ${
                    isActive
                      ? 'text-white bg-blue-500 dark:bg-blue-600 shadow-md shadow-blue-500/30'
                      : 'text-gray-600 dark:text-gray-400 hover:text-blue-500 dark:hover:text-blue-400 hover:bg-gray-100 dark:hover:bg-white/10'
                  }`}
                >
                  <FontAwesomeIcon icon={item.icon} className="w-4 h-4" />
                  <span className="text-[10px] font-semibold whitespace-nowrap leading-none">{item.name}</span>
                </Link>
              );
            })}
        </nav>
      </div>
    </>
  );
}