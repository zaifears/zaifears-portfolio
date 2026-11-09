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

const itemBase =
  'flex items-center gap-3 rounded-control px-4 py-3 font-medium transition-colors duration-200';
const itemIdle = 'text-ink-2 hover:bg-paper-3 hover:text-ink';
const itemActive = 'bg-accent text-accent-ink';

export function Navbar() {
  const pathname = usePathname();

  return (
    <>
      {/* Desktop sidebar: a floating rounded panel */}
      <aside className="hidden md:flex md:flex-col fixed top-4 bottom-4 left-4 z-40 w-60 rounded-panel border border-rule bg-paper-2 p-5 overflow-y-auto">
        <Link href="/" className="mb-6 block rounded-card bg-paper px-4 py-3 border border-rule">
          <p className="text-sm text-muted">zaifears</p>
          <p className="font-semibold text-ink leading-tight">Md Al Shahoriar</p>
        </Link>
        <nav className="flex-1 flex flex-col justify-center">
          <ul className="flex flex-col gap-1.5">
            {navItems.map((item) => {
              const isActive = isNavItemActive(item.href, pathname);
              const isExternal = item.href.startsWith('http') || item.href.endsWith('.md');

              if (isExternal) {
                return (
                  <li key={item.name}>
                    <a
                      href={item.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      className={`${itemBase} ${itemIdle}`}
                    >
                      <FontAwesomeIcon icon={item.icon} className="w-5 h-5" />
                      <span>{item.name}</span>
                    </a>
                  </li>
                );
              }

              return (
                <li key={item.name}>
                  <Link
                    href={item.href}
                    aria-current={isActive ? 'page' : undefined}
                    className={`${itemBase} ${isActive ? itemActive : itemIdle}`}
                  >
                    <FontAwesomeIcon icon={item.icon} className="w-5 h-5" />
                    <span>{item.name}</span>
                  </Link>
                </li>
              );
            })}
          </ul>
        </nav>
      </aside>

      {/* Mobile: floating pill dock */}
      <div className="md:hidden fixed bottom-4 left-3 right-3 z-50">
        <nav className="flex justify-between items-center gap-1 p-1.5 rounded-full bg-paper-2/90 backdrop-blur-xl border border-rule">
          {navItems
            .filter(item => !item.desktopOnly)
            .map((item) => {
              const isActive = isNavItemActive(item.href, pathname);

              return (
                <Link
                  key={item.name}
                  href={item.href}
                  aria-current={isActive ? 'page' : undefined}
                  className={`relative flex flex-1 min-w-0 flex-col items-center justify-center gap-1 py-2 px-0.5 rounded-full transition-colors duration-200 text-center ${
                    isActive
                      ? 'bg-accent text-accent-ink'
                      : 'text-muted hover:text-ink hover:bg-paper-3'
                  }`}
                >
                  <FontAwesomeIcon icon={item.icon} className="w-4 h-4 mx-auto" />
                  <span className="text-[10px] font-medium whitespace-nowrap overflow-hidden text-ellipsis leading-none text-center w-full">{item.name}</span>
                </Link>
              );
            })}
        </nav>
      </div>
    </>
  );
}
