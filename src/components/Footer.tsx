import Link from "next/link";
import { SiteConfig } from "@/lib/types"; // Import the SiteConfig type

// The component now accepts the 'siteConfig' prop
export const Footer = ({ siteConfig }: { siteConfig: SiteConfig }) => {
  // We use the data from the prop instead of calling a function here
  const { advocateName, contact, disclaimer } = siteConfig;

  return (
    // This uses the new professional color palette defined in globals.css
    <footer
      style={{ backgroundColor: "var(--color-brand-primary)" }}
      className='text-gray-300 relative z-20'
    >
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
                  className='text-gray-300 hover:text-brand-accent'
                >
                  Advocate Profile
                </Link>
              </li>
              <li>
                <Link
                  href='/practice-areas'
                  className='text-gray-300 hover:text-brand-accent'
                >
                  Practice Areas
                </Link>
              </li>
              <li>
                <Link
                  href='/contact'
                  className='text-gray-300 hover:text-brand-accent'
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
                  className='hover:text-brand-accent'
                >
                  {contact.email}
                </a>
              </li>
              <li>
                <a
                  href={`tel:${contact.phone}`}
                  className='hover:text-brand-accent'
                >
                  {contact.phone}
                </a>
              </li>
            </ul>
          </div>
        </div>
        <div className='mt-16 pt-8 border-t border-gray-700 text-center text-gray-500'>
          <p>
            &copy; {new Date().getFullYear()} {advocateName}. All Rights
            Reserved.
          </p>
        </div>
      </div>
    </footer>
  );
};
