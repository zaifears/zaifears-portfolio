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
  { href: '/education', name: 'Education', icon: faUserGraduate },
  { href: '/skills', name: 'Skills', icon: faCogs },
  { href: '/techtips', name: 'Tech Tips', icon: faMicrochip },
  { href: '/contact', name: 'Contact', icon: faEnvelope },
  { href: '/life', name: 'Life', icon: faFlag },
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
      <aside className="hidden md:flex flex-col w-64 h-screen p-6 bg-gray-100 dark:bg-black text-gray-600 dark:text-gray-400 font-mono justify-center sticky top-0">
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

      {/* Mobile Bottom Navigation Bar */}
      <div className="md:hidden fixed bottom-0 left-0 right-0 bg-white dark:bg-black border-t border-gray-200 dark:border-gray-800 z-50">
        <nav className="flex justify-around items-center py-3">
          {navItems
            .filter(item => !item.desktopOnly)
            .map((item) => {
              const isActive = isNavItemActive(item.href, pathname);

              return (
                <Link
                  key={item.name}
                  href={item.href}
                  className={`relative flex flex-col items-center text-center p-2 rounded-lg transition-all duration-200 w-16 ${
                    isActive
                      ? 'text-blue-600 dark:text-blue-400 scale-110'
                      : 'text-gray-500 dark:text-gray-400 hover:text-blue-500 dark:hover:text-blue-400'
                  }`}
                >
                  {isActive && <span className="absolute -top-1 h-1 w-8 bg-blue-500 dark:bg-blue-400 rounded-full"></span>}
                  <FontAwesomeIcon icon={item.icon} className="w-6 h-6 mb-1" />
                  <span className="text-xs font-semibold">{item.name}</span>
                </Link>
              );
            })}
        </nav>
      </div>
    </>
  );
}