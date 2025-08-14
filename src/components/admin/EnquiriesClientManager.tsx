"use client";

import { useState, useEffect } from "react";
import { Download } from "lucide-react";

type Enquiry = {
  id: string;
  name: string;
  email: string;
  phone: string;
  submittedAt: string;
};

export function EnquiriesClientManager() {
  const [enquiries, setEnquiries] = useState<Enquiry[]>([]);
  const [page, setPage] = useState(1);
  const [total, setTotal] = useState(0);
  const [limit] = useState(10);
  const [isLoading, setIsLoading] = useState(true);
  const [filters, setFilters] = useState({ startDate: "", endDate: "" });

  useEffect(() => {
    const fetchEnquiries = async () => {
      setIsLoading(true);
      const params = new URLSearchParams({
        page: page.toString(),
        limit: limit.toString(),
        ...filters,
      });
      const response = await fetch(`/api/admin/enquiries?${params.toString()}`);
      const data = await response.json();
      setEnquiries(data.enquiries);
      setTotal(data.total);
      setIsLoading(false);
    };
    fetchEnquiries();
  }, [page, limit, filters]);

  const handleFilterChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFilters({ ...filters, [e.target.name]: e.target.value });
  };

  const handleFilterSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setPage(1); // Reset to first page on new filter
    // The useEffect will trigger a refetch
  };

  const downloadCSV = () => {
    const headers = ["Name", "Email", "Phone", "Submitted At"];
    const rows = enquiries.map((e) => [
      `"${e.name}"`,
      `"${e.email}"`,
      `"${e.phone}"`,
      `"${new Date(e.submittedAt).toLocaleString()}"`,
    ]);
    const csvContent =
      "data:text/csv;charset=utf-8," +
      [headers.join(","), ...rows.map((r) => r.join(","))].join("\n");

    const encodedUri = encodeURI(csvContent);
    const link = document.createElement("a");
    link.setAttribute("href", encodedUri);
    link.setAttribute(
      "download",
      `enquiries_page-${page}_${new Date().toISOString().split("T")[0]}.csv`
    );
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const totalPages = Math.ceil(total / limit);

  return (
    <div className='bg-white p-6 rounded-lg shadow-md space-y-4'>
      {/* Filter Section */}
      <form
        onSubmit={handleFilterSubmit}
        className='flex flex-wrap items-end gap-4 p-4 border rounded-lg'
      >
        <div>
          <label htmlFor='startDate' className='text-sm font-medium'>
            Start Date
          </label>
          <input
            type='date'
            name='startDate'
            value={filters.startDate}
            onChange={handleFilterChange}
            className='mt-1 block w-full rounded-md border-gray-300 shadow-sm'
          />
        </div>
        <div>
          <label htmlFor='endDate' className='text-sm font-medium'>
            End Date
          </label>
          <input
            type='date'
            name='endDate'
            value={filters.endDate}
            onChange={handleFilterChange}
            className='mt-1 block w-full rounded-md border-gray-300 shadow-sm'
          />
        </div>
        <button
          type='submit'
          className='bg-brand-primary text-white px-4 py-2 rounded-lg'
        >
          Apply Filter
        </button>
        <button
          type='button'
          onClick={downloadCSV}
          className='bg-green-600 text-white px-4 py-2 rounded-lg flex items-center gap-2'
        >
          <Download size={16} />
          Download CSV
        </button>
      </form>

      {/* Table Section */}
      <div className='overflow-x-auto'>
        <table className='w-full text-left'>
          {/* ... table headers ... */}
          <tbody>
            {isLoading ? (
              <tr>
                <td colSpan={4} className='text-center p-8'>
                  Loading...
                </td>
              </tr>
            ) : (
              enquiries.map((enquiry) => (
                <tr key={enquiry.id} className='border-b'>
                  <td className='p-3'>{enquiry.name}</td>
                  <td className='p-3'>{enquiry.email}</td>
                  <td className='p-3'>{enquiry.phone}</td>
                  <td className='p-3'>
                    {new Date(enquiry.submittedAt).toLocaleString()}
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>

      {/* Pagination Section */}
      <div className='flex justify-between items-center'>
        <p>
          Showing {enquiries.length} of {total} results
        </p>
        <div className='flex gap-2'>
          <button
            onClick={() => setPage((p) => Math.max(1, p - 1))}
            disabled={page === 1}
          >
            Previous
          </button>
          <span>
            Page {page} of {totalPages}
          </span>
          <button
            onClick={() => setPage((p) => Math.min(totalPages, p + 1))}
            disabled={page === totalPages}
          >
            Next
          </button>
        </div>
      </div>
    </div>
  );
}
