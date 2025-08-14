"use client";

import { useState } from "react";
import { BlogPost } from "@/lib/types";
import Link from "next/link";
import { BookText, ArrowRight } from "lucide-react";
import { Pagination } from "./common/Pagination";

interface GuideListProps {
  initialGuides: BlogPost[];
}

const GUIDES_PER_PAGE = 5;

export function GuideList({ initialGuides }: GuideListProps) {
  const [currentPage, setCurrentPage] = useState(1);

  const totalPages = Math.ceil(initialGuides.length / GUIDES_PER_PAGE);
  const paginatedGuides = initialGuides.slice(
    (currentPage - 1) * GUIDES_PER_PAGE,
    currentPage * GUIDES_PER_PAGE
  );

  return (
    <div>
      <div className='space-y-10'>
        {paginatedGuides.map((guide: BlogPost) => (
          // --- CORRECTED LINK ---
          <Link
            href={`/legal-guides/${guide.slug}`} // Points to the new URL structure
            key={guide.id}
            className='block p-8 bg-card rounded-xl shadow-lg hover:shadow-2xl hover:-translate-y-1 transition-all duration-300 group'
          >
            <h2 className='text-3xl font-bold text-brand-secondary group-hover:text-brand-accent transition-colors mb-3'>
              {guide.title}
            </h2>
            <div className='flex items-center text-muted text-sm mb-4'>
              <BookText className='h-4 w-4 mr-2' />
              <span>{guide.author}</span>
            </div>
            <p className='text-foreground text-lg mb-5'>{guide.summary}</p>
            <span className='font-semibold inline-flex items-center text-brand-primary'>
              Read Guide <ArrowRight className='ml-2 h-4 w-4' />
            </span>
          </Link>
        ))}
        {paginatedGuides.length === 0 && (
          <p className='text-center text-muted text-lg py-10'>
            No guides have been published yet. Please check back later.
          </p>
        )}
      </div>

      <Pagination
        currentPage={currentPage}
        totalPages={totalPages}
        onPageChange={setCurrentPage}
      />
    </div>
  );
}
