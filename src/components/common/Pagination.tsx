"use client";

interface PaginationProps {
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
}

export const Pagination = ({
  currentPage,
  totalPages,
  onPageChange,
}: PaginationProps) => {
  if (totalPages <= 1) {
    return null; // Don't render pagination if there's only one page
  }

  return (
    <div className='flex justify-center items-center gap-4 mt-12'>
      <button
        onClick={() => onPageChange(currentPage - 1)}
        disabled={currentPage === 1}
        // --- UPDATED: Added hover effect and transition ---
        className='px-4 py-2 border rounded-md font-semibold disabled:opacity-50 disabled:cursor-not-allowed hover:bg-gray-100 transition-colors'
      >
        « Previous
      </button>
      <span className='text-sm text-gray-600'>
        Page {currentPage} of {totalPages}
      </span>
      <button
        onClick={() => onPageChange(currentPage + 1)}
        disabled={currentPage === totalPages}
        // --- UPDATED: Added hover effect and transition ---
        className='px-4 py-2 border rounded-md font-semibold disabled:opacity-50 disabled:cursor-not-allowed hover:bg-gray-100 transition-colors'
      >
        Next »
      </button>
    </div>
  );
};
