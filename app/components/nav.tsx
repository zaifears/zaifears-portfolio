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
  faMicrochip,
  faFolderOpen
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
  { href: '/projects', name: 'Projects', icon: faFolderOpen },
  { href: '/techtips', name: 'Tech Tips', icon: faMicrochip },
  { href: '/education', name: 'Education', icon: faUserGraduate },
  { href: '/contact', name: 'Contact', icon: faEnvelope },
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
        <div className="mb-8 px-2">
          <p className="font-mono text-xs text-gray-500 dark:text-gray-400 uppercase tracking-widest">zaifears</p>
          <p className="text-sm font-medium text-gray-900 dark:text-white mt-1">Md Al Shahoriar</p>
        </div>
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
                  className={`relative flex flex-1 min-w-0 flex-col items-center justify-center gap-1 py-2 px-0.5 rounded-lg transition-all duration-300 text-center ${
                    isActive
                      ? 'text-white bg-blue-700 dark:bg-blue-600 shadow-md shadow-blue-500/30'
                      : 'text-gray-500 dark:text-gray-400 hover:text-blue-700 dark:hover:text-blue-300 hover:bg-gray-100 dark:hover:bg-white/10'
                  }`}
                >
                  <FontAwesomeIcon icon={item.icon} className="w-4 h-4 mx-auto" />
                  <span className="text-[9px] font-semibold tracking-tight whitespace-nowrap overflow-hidden text-ellipsis leading-none text-center w-full">{item.name}</span>
                </Link>
              );
            })}
        </nav>
      </div>
    </>
  );
}