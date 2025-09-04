'use client';

import Link from 'next/link';
import { useSession, signOut } from 'next-auth/react';
import { useState } from 'react';
import { useLoginDialog } from './LoginDialogProvider';


export default function Navbar() {
  const { data: session } = useSession();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const { openDialog } = useLoginDialog();

  const navigation = [
    { name: 'Home', href: '/' },
    { name: 'About', href: '/about' },
    { name: 'Projects', href: '/projects' },
    { name: 'Skills', href: '/skills' },
    { name: 'Testimonials', href: '/testimonials' },
    { name: 'Contact', href: '/contact' },
  ];

  return (
    <nav className="bg-white shadow-lg dark:bg-gray-900 sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          <div className="flex items-center">
            <Link href="/" className="flex-shrink-0 flex items-center">
              <span className="text-xl font-bold text-primary">
                Imran Safdar
              </span>
            </Link>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-8">
            {navigation.map((item) => (
              <Link
                key={item.name}
                href={item.href}
                className="text-gray-700 hover:text-primary dark:text-gray-300 dark:hover:text-primary px-3 py-2 text-sm font-medium transition-colors"
              >
                {item.name}
              </Link>
            ))}
            
            {session?.user?.role === 'admin' ? (
              <Link
                href="/admin"
                className="bg-primary text-white px-4 py-2 rounded-md text-sm font-medium hover:bg-blue-600 transition-colors"
              >
                Admin
              </Link>
            ) : (
              <button
                onClick={() => openDialog()}
                className="bg-primary text-white px-4 py-2 rounded-md text-sm font-medium hover:bg-blue-600 transition-colors"
              >
                Admin
              </button>
            )}
            
            {session ? (
              <button
                onClick={() => signOut()}
                className="text-gray-700 hover:text-red-600 dark:text-gray-300 dark:hover:text-red-400 px-3 py-2 text-sm font-medium transition-colors"
              >
                Logout
              </button>
            ) : (
              <button
                onClick={() => openDialog()}
                className="text-gray-700 hover:text-primary dark:text-gray-300 dark:hover:text-primary px-3 py-2 text-sm font-medium transition-colors"
              >
                Login
              </button>
            )}
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden flex items-center">
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="inline-flex items-center justify-center p-2 rounded-md text-gray-700 hover:text-primary hover:bg-gray-100 dark:text-gray-300 dark:hover:text-primary dark:hover:bg-gray-800 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-primary"
            >
              <span className="sr-only">Open main menu</span>
              {isMobileMenuOpen ? (
                <svg className="block h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              ) : (
                <svg className="block h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                </svg>
              )}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile menu */}
      {isMobileMenuOpen && (
        <div className="md:hidden">
          <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3 bg-white dark:bg-gray-900 border-t dark:border-gray-700">
            {navigation.map((item) => (
              <Link
                key={item.name}
                href={item.href}
                className="text-gray-700 hover:text-primary dark:text-gray-300 dark:hover:text-primary block px-3 py-2 text-base font-medium transition-colors"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                {item.name}
              </Link>
            ))}
            
            {session?.user?.role === 'admin' ? (
              <Link
                href="/admin"
                className="bg-primary text-white block px-3 py-2 text-base font-medium rounded-md hover:bg-blue-600 transition-colors"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                Admin
              </Link>
            ) : (
              <button
                onClick={() => {
                  openDialog();
                  setIsMobileMenuOpen(false);
                }}
                className="bg-primary text-white block px-3 py-2 text-base font-medium rounded-md hover:bg-blue-600 transition-colors w-full text-left"
              >
                Admin
              </button>
            )}
            
            {session ? (
              <button
                onClick={() => {
                  signOut();
                  setIsMobileMenuOpen(false);
                }}
                className="text-gray-700 hover:text-red-600 dark:text-gray-300 dark:hover:text-red-400 block px-3 py-2 text-base font-medium transition-colors w-full text-left"
              >
                Logout
              </button>
            ) : (
              <button
                onClick={() => {
                  openDialog();
                  setIsMobileMenuOpen(false);
                }}
                className="text-gray-700 hover:text-primary dark:text-gray-300 dark:hover:text-primary block px-3 py-2 text-base font-medium transition-colors w-full text-left"
              >
                Login
              </button>
            )}
          </div>
        </div>
      )}
    </nav>
  );
}

