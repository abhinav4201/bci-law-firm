import Link from "next/link";
import { getSiteConfig } from "@/lib/content";

export const Footer = () => {
  const { advocateName, contact, disclaimer } = getSiteConfig();

  return (
    <footer className='bg-[#020617] text-white'>
      <div className='container mx-auto py-16 px-4 sm:px-6 lg:px-8'>
        <div className='grid grid-cols-1 md:grid-cols-3 gap-12'>
          <div className='md:col-span-1'>
            <h3 className='text-2xl font-bold text-white mb-4'>
              {advocateName}
            </h3>
            <p className='text-gray-400 text-sm leading-relaxed'>
              {disclaimer}
            </p>
          </div>
          <div>
            <h3 className='text-lg font-semibold text-white uppercase tracking-wider mb-4'>
              Quick Links
            </h3>
            <ul className='space-y-3'>
              <li>
                <Link
                  href='/profile'
                  className='text-gray-300 hover:text-white hover:underline'
                >
                  Advocate Profile
                </Link>
              </li>
              <li>
                <Link
                  href='/practice-areas'
                  className='text-gray-300 hover:text-white hover:underline'
                >
                  Practice Areas
                </Link>
              </li>
              <li>
                <Link
                  href='/contact'
                  className='text-gray-300 hover:text-white hover:underline'
                >
                  Contact
                </Link>
              </li>
            </ul>
          </div>
          <div>
            <h3 className='text-lg font-semibold text-white uppercase tracking-wider mb-4'>
              Get In Touch
            </h3>
            <ul className='space-y-3 text-gray-300'>
              <li>{contact.address}</li>
              <li>
                <a
                  href={`mailto:${contact.email}`}
                  className='hover:text-white hover:underline'
                >
                  {contact.email}
                </a>
              </li>
              <li>
                <a
                  href={`tel:${contact.phone}`}
                  className='hover:text-white hover:underline'
                >
                  {contact.phone}
                </a>
              </li>
            </ul>
          </div>
        </div>
        <div className='mt-16 pt-8 border-t border-gray-800 text-center text-gray-500'>
          <p>
            &copy; {new Date().getFullYear()} {advocateName}. All Rights
            Reserved.
          </p>
          <p className='text-xs mt-2'>
            Website designed and developed in compliance with Bar Council of
            India regulations.
          </p>
        </div>
      </div>
    </footer>
  );
};
