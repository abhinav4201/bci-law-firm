
"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { Edit, Trash2 } from "lucide-react";
import { BlogPost } from "@/lib/types";
import { Pagination } from "../common/Pagination"; // Import the pagination component

const POSTS_PER_PAGE = 10;

export const PostClientManager = ({
  postType,
}: {
  postType: "blog" | "guide";
}) => {
  const [posts, setPosts] = useState<BlogPost[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPosts, setTotalPosts] = useState(0);

  useEffect(() => {
    const fetchPosts = async () => {
      setIsLoading(true);
      const params = new URLSearchParams({
        page: currentPage.toString(),
        limit: POSTS_PER_PAGE.toString(),
        type: postType,
      });

      const response = await fetch(`/api/admin/posts?${params.toString()}`);
      const data = await response.json();

      setPosts(data.posts || []);
      setTotalPosts(data.total || 0);
      setIsLoading(false);
    };

    fetchPosts();
  }, [currentPage, postType]);

  const handleDelete = async (postId: string) => {
    if (
      confirm(
        "Are you sure you want to delete this? This action cannot be undone."
      )
    ) {
      const response = await fetch(`/api/admin/posts/${postId}`, {
        method: "DELETE",
      });
      if (response.ok) {
        setPosts(posts.filter((p) => p.id !== postId));
        setTotalPosts((prev) => prev - 1);
        alert("Deleted successfully.");
      } else {
        alert("Failed to delete.");
      }
    }
  };

  const totalPages = Math.ceil(totalPosts / POSTS_PER_PAGE);

  return (
    <div className='bg-white p-6 rounded-lg shadow space-y-4'>
      <div className='overflow-x-auto'>
        <table className='w-full text-left'>
          <thead className='border-b-2'>
            <tr className='border-b'>
              <th className='p-2 font-semibold'>Title</th>
              <th className='p-2 font-semibold'>Author</th>
              <th className='p-2 font-semibold'>Published Date</th>
              <th className='p-2 font-semibold'>Actions</th>
            </tr>
          </thead>
          <tbody>
            {isLoading ? (
              <tr>
                <td colSpan={4} className='text-center p-8'>
                  Loading...
                </td>
              </tr>
            ) : (
              posts.map((post) => (
                <tr key={post.id} className='border-b hover:bg-gray-50'>
                  <td className='p-2 font-medium'>{post.title}</td>
                  <td className='p-2'>{post.author}</td>
                  <td className='p-2'>
                    {new Date(post.publishedDate).toLocaleDateString()}
                  </td>
                  <td className='p-2 flex items-center space-x-2'>
                    <Link
                      href={
                        postType === "blog"
                          ? `/admin/posts/${post.id}`
                          : `/admin/guides/${post.id}`
                      }
                      className='p-1 text-blue-600 hover:text-blue-800'
                      title='Edit'
                    >
                      <Edit className='h-4 w-4' />
                    </Link>
                    <button
                      onClick={() => handleDelete(post.id)}
                      className='p-1 text-red-600 hover:text-red-800'
                      title='Delete'
                    >
                      <Trash2 className='h-4 w-4' />
                    </button>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
      {!isLoading && posts.length === 0 && (
        <p className='text-center text-gray-500 py-8'>
          No {postType}s found. Create one to get started!
        </p>
      )}
      <Pagination
        currentPage={currentPage}
        totalPages={totalPages}
        onPageChange={setCurrentPage}
      />
    </div>
  );
};
