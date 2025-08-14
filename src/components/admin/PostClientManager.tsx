/* eslint-disable @typescript-eslint/no-unused-vars */
"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { Edit, Trash2 } from "lucide-react";

// Define a proper type for the posts coming from the server
type Post = {
  id: string;
  title: string;
  summary: string;
  publishedDate: string;
  author: string;
};

export const PostClientManager = ({
  initialPosts,
  postType = "post",
}: {
  initialPosts: Post[];
  postType?: "post" | "guide";
}) => {
  const [posts, setPosts] = useState(initialPosts);
  const router = useRouter();

  const handleDelete = async (postId: string) => {
    if (
      confirm(
        "Are you sure you want to delete this post? This action cannot be undone."
      )
    ) {
      const response = await fetch(`/api/admin/posts/${postId}`, {
        method: "DELETE",
      });

      if (response.ok) {
        setPosts(posts.filter((p) => p.id !== postId));
        alert("Post deleted successfully.");
      } else {
        alert("Failed to delete post.");
      }
    }
  };

  return (
    <div className='bg-white p-6 rounded-lg shadow'>
      <div className='overflow-x-auto'>
        <table className='w-full text-left'>
          <thead>
            <tr className='border-b'>
              <th className='p-2'>Title</th>
              <th className='p-2'>Author</th>
              <th className='p-2'>Published Date</th>
              <th className='p-2'>Actions</th>
            </tr>
          </thead>
          <tbody>
            {posts.map((post) => (
              <tr key={post.id} className='border-b hover:bg-gray-50'>
                <td className='p-2 font-medium'>{post.title}</td>
                <td className='p-2'>{post.author}</td>
                <td className='p-2'>{post.publishedDate}</td>
                <td className='p-2 flex items-center space-x-2'>
                  <Link
                    href={`/admin/${postType}s/${post.id}`}
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
            ))}
          </tbody>
        </table>
      </div>
      {posts.length === 0 && (
        <p className='text-center text-gray-500 py-8'>
          No posts found. Create one to get started!
        </p>
      )}
    </div>
  );
};
