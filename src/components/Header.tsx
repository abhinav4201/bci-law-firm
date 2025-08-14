"use client";

import Link from "next/link";
import { useAuth } from "@/context/AuthContext";
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "@/lib/firebase";
import { useEffect, useState } from "react";
import { Menu, X } from "lucide-react";

export const Header = ({ advocateName }: { advocateName: string }) => {
  const { user, setUser, openLoginModal } = useAuth();
  const [isMobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) =>
      setUser(currentUser)
    );
    return () => unsubscribe();
  }, [setUser]);

  const navLinks = [
    { name: "Home", href: "/" },
    { name: "Advocate Profile", href: "/profile" },
    { name: "Practice Areas", href: "/practice-areas" },
    { name: "Blog", href: "/blog" },
    { name: "Legal Guides", href: "/legal-guides" }, // NEW
    { name: "Contact", href: "/contact" },
  ];

  return (
    <header className='bg-brand-primary shadow-md sticky top-0 z-30'>
      <div className='container mx-auto px-4 sm:px-6 lg:px-8'>
        <div className='flex items-center justify-between h-20'>
          <Link href='/'>
            <span className='text-xl font-bold text-white'>{advocateName}</span>
          </Link>

          <nav className='hidden md:flex items-center space-x-6'>
            {navLinks.map((link) => (
              <Link key={link.name} href={link.href}>
                <span className='text-sm font-medium text-gray-300 hover:text-white transition-colors'>
                  {link.name}
                </span>
              </Link>
            ))}
            {user ? (
              <Link
                href='/admin/dashboard'
                className='bg-brand-accent text-brand-primary px-4 py-2 rounded-md text-sm font-semibold hover:opacity-90 transition-opacity shadow-sm'
              >
                Dashboard
              </Link>
            ) : (
              <button
                onClick={openLoginModal}
                className='bg-brand-accent text-brand-primary px-4 py-2 rounded-md text-sm font-semibold hover:opacity-90 transition-opacity shadow-sm'
              >
                Admin
              </button>
            )}
          </nav>

          <div className='md:hidden'>
            <button
              onClick={() => setMobileMenuOpen(true)}
              aria-label='Open menu'
            >
              <Menu className='h-6 w-6 text-white' />
            </button>
          </div>
        </div>
      </div>
      {isMobileMenuOpen && (
        <div className='fixed inset-0 z-50 md:hidden'>
          <div
            className='absolute inset-0 bg-black/20 backdrop-blur-sm'
            onClick={() => setMobileMenuOpen(false)}
          ></div>
          <div className='relative bg-white w-4/5 max-w-xs h-full p-6 flex flex-col'>
            <button
              onClick={() => setMobileMenuOpen(false)}
              className='self-end mb-8'
              aria-label='Close menu'
            >
              <X className='h-6 w-6' />
            </button>
            <nav className='flex flex-col space-y-4'>
              {navLinks.map((link) => (
                <Link
                  key={link.name}
                  href={link.href}
                  onClick={() => setMobileMenuOpen(false)}
                  className='text-lg font-medium text-muted hover:text-brand-primary'
                >
                  {link.name}
                </Link>
              ))}
            </nav>
          </div>
        </div>
      )}
    </header>
  );
};
