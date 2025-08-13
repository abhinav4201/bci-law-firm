"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { ChevronRight } from "lucide-react";

export const Breadcrumb = () => {
  const pathname = usePathname();
  const pathSegments = pathname.split("/").filter((segment) => segment);

  // Don't show breadcrumbs on the homepage
  if (pathSegments.length === 0) {
    return null;
  }

  return (
    <nav aria-label='Breadcrumb' className='mb-6'>
      <ol className='flex items-center space-x-2 text-sm text-muted'>
        <li>
          <Link href='/' className='hover:text-brand-primary'>
            Home
          </Link>
        </li>
        {pathSegments.map((segment, index) => {
          const href = `/${pathSegments.slice(0, index + 1).join("/")}`;
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
