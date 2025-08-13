"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { ChevronRight } from "lucide-react";

export const AdminBreadcrumb = () => {
  const pathname = usePathname();
  // Filter out empty strings and the base 'admin' segment
  const pathSegments = pathname
    .split("/")
    .filter((segment) => segment && segment !== "admin");

  return (
    <nav aria-label='Breadcrumb' className='mb-6'>
      <ol className='flex items-center space-x-2 text-sm text-muted'>
        <li>
          {/* This now correctly links to the admin dashboard */}
          <Link href='/admin/dashboard' className='hover:text-brand-primary'>
            Admin Home
          </Link>
        </li>
        {pathSegments.map((segment, index) => {
          const href = `/admin/${pathSegments.slice(0, index + 1).join("/")}`;
          const isLast = index === pathSegments.length - 1;
          const title = segment
            .replace(/-/g, " ")
            .replace(/\b\w/g, (l) => l.toUpperCase());

          return (
            <li key={href} className='flex items-center space-x-2'>
              <ChevronRight className='h-4 w-4' />
              {isLast ? (
                <span className='font-semibold text-foreground'>{title}</span>
              ) : (
                <Link href={href} className='hover:text-brand-primary'>
                  {title}
                </Link>
              )}
            </li>
          );
        })}
      </ol>
    </nav>
  );
};
