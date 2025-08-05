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
  faLightbulb // Icon for the new Tech Tips link
} from '@fortawesome/free-solid-svg-icons';

// Define a type for a single navigation item
interface NavItem {
  href: string;
  name: string;
  icon: any; // FontAwesomeIconType
  disabled?: boolean; // Optional: to make an item non-clickable
  tooltip?: string;   // Optional: for hover text when disabled
}

const navItems: NavItem[] = [
  { href: '/', name: 'Home', icon: faHome },
  { href: '/education', name: 'Education', icon: faUserGraduate },
  { href: '/skills', name: 'Skills', icon: faCogs },
  { href: '/techtips', name: 'Tech Tips', icon: faLightbulb },
  { href: '/contact', name: 'Contact', icon: faEnvelope },
  { href: '/life', name: 'Life', icon: faFlag, disabled: true, tooltip: 'Under maintenance' }, // Life is now disabled
];

export function Navbar() {
  const pathname = usePathname();

  return (
    <>
      {/* Desktop Sidebar */}
      <aside className="hidden md:flex flex-col w-64 h-screen p-6 bg-black text-gray-400 font-mono justify-center sticky top-0">
        <nav>
          <ul>
            {navItems.map((item) => {
              const isActive = pathname === item.href;

              // Conditionally render Link or Span based on 'disabled' prop
              if (item.disabled) {
                return (
                  <li key={item.name} className="mb-4">
                    <span
                      className="flex items-center p-2 rounded-md text-gray-600 cursor-not-allowed"
                      title={item.tooltip} // Show tooltip on hover
                    >
                      <FontAwesomeIcon icon={item.icon} className="w-5 h-5 mr-3" />
                      <span>{item.name}</span>
                    </span>
                  </li>
                );
              }

              return (
                <li key={item.name} className="mb-4">
                  <Link
                    href={item.href}
                    className={`flex items-center p-2 rounded-md transition-all duration-300 ${
                      isActive
                        ? 'text-blue-400 bg-gray-800 scale-95 translate-x-2'
                        : 'hover:text-blue-400 hover:bg-gray-900'
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
      <div className="md:hidden fixed bottom-0 left-0 right-0 bg-black border-t border-gray-800 z-50">
        <nav className="flex justify-around items-center p-2">
          {navItems.map((item) => {
            const isActive = pathname === item.href;

            // Conditionally render Link or Div for mobile based on 'disabled' prop
            if (item.disabled) {
              return (
                <div 
                  key={item.name}
                  className="flex flex-col items-center text-center text-gray-600 p-2 cursor-not-allowed"
                  title={item.tooltip} // Show tooltip on hover
                >
                  <FontAwesomeIcon icon={item.icon} className="w-6 h-6 mb-1" />
                  <span className="text-xs">{item.name}</span>
                </div>
              );
            }

            return (
              <Link
                key={item.name}
                href={item.href}
                className={`flex flex-col items-center text-center p-2 transition-colors duration-200 ${
                  isActive ? 'text-blue-400' : 'text-gray-400 hover:text-blue-400'
                }`}
              >
                <FontAwesomeIcon icon={item.icon} className="w-6 h-6 mb-1" />
                <span className="text-xs">{item.name}</span>
              </Link>
            );
          })}
        </nav>
      </div>
    </>
  );
}
