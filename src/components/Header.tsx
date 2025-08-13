"use client"; // Add this line

import Link from "next/link";
// import { getSiteConfig } from "@/lib/content";
import { Menu } from "lucide-react";
import { useAuth } from "@/context/AuthContext"; // Import useAuth

export const Header = ({ advocateName }: { advocateName: string }) => {
  const { openLoginModal } = useAuth(); // Get the modal function

  const navLinks = [
    { name: "Home", href: "/" },
    { name: "Advocate Profile", href: "/profile" },
    { name: "Practice Areas", href: "/practice-areas" },
    { name: "Blog", href: "/blog" },
    { name: "Contact", href: "/contact" },
  ];

  return (
    <header className='bg-card/80 backdrop-blur-sm border-b border-border sticky top-0 z-50'>
      <div className='container mx-auto px-4 sm:px-6 lg:px-8'>
        <div className='flex items-center justify-between h-16'>
          <div className='flex-shrink-0'>
            <Link href='/' className='text-xl font-bold'>
              {advocateName}
            </Link>
          </div>
          <nav className='hidden md:block'>
            <div className='ml-10 flex items-baseline space-x-4'>
              {navLinks.map((link) => (
                <Link
                  key={link.name}
                  href={link.href}
                  className='text-muted hover:text-foreground px-3 py-2 rounded-md text-sm font-medium transition-colors'
                >
                  {link.name}
                </Link>
              ))}
              {/* Add the Admin button here */}
              <button
                onClick={openLoginModal}
                className='bg-brand-secondary text-white px-3 py-2 rounded-md text-sm font-medium'
              >
                Admin
              </button>
            </div>
          </nav>
          <div className='md:hidden'>
            <button className='p-2 rounded-md text-muted hover:bg-gray-100'>
              <Menu className='h-6 w-6' />
            </button>
          </div>
        </div>
      </div>
    </header>
  );
};
