/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { useState, useEffect, useRef } from "react";
import { useRouter } from "next/navigation";
import { BlogPost } from "@/lib/types";
import Link from "next/link";

export const PostEditor = ({ post }: { post?: BlogPost }) => {
  const router = useRouter();
  const editorRef = useRef<{ CKEditor: any; ClassicEditor: any } | null>(null);
  const { CKEditor, ClassicEditor } = editorRef.current || {};

  // State for all form fields
  const [title, setTitle] = useState(post?.title || "");
  const [summary, setSummary] = useState(post?.summary || "");
  const [content, setContent] = useState(post?.content || "");
  const [author, setAuthor] = useState(post?.author || "");
  const [slug, setSlug] = useState(post?.slug || "");
  const [metaDescription, setMetaDescription] = useState(
    post?.metaDescription || ""
  );
  const [tags, setTags] = useState(post?.tags?.join(", ") || "");

  // State for editor and form status
  const [isEditorLoaded, setIsEditorLoaded] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");

  // Dynamically load the editor on the client side
  useEffect(() => {
    const loadEditor = async () => {
      const { CKEditor } = await import("@ckeditor/ckeditor5-react");
      const ClassicEditor = await import("@ckeditor/ckeditor5-build-classic");
      editorRef.current = { CKEditor, ClassicEditor };
      setIsEditorLoaded(true);
    };

    loadEditor();
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError("");

    const tagsArray = tags
      .split(",")
      .map((tag) => tag.trim())
      .filter(Boolean);
    const postData = {
      title,
      summary,
      content,
      author,
      slug,
      metaDescription,
      tags: tagsArray,
    };

    const url = post?.id ? `/api/admin/posts/${post.id}` : "/api/admin/posts";
    const method = post?.id ? "PUT" : "POST";

    try {
      const response = await fetch(url, {
        method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(postData),
      });

      if (!response.ok) throw new Error("Failed to save the post.");

      alert(`Post ${post?.id ? "updated" : "created"} successfully!`);
      router.push("/admin/posts");
      router.refresh();
    } catch (err: any) {
      setError(err.message);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className='space-y-6 bg-white p-8 rounded-lg shadow'
    >
      {error && (
        <p className='text-red-500 bg-red-100 p-3 rounded text-center'>
          {error}
        </p>
      )}

      {/* --- ALL FORM FIELDS ARE NOW INCLUDED --- */}
      <div>
        <label
          htmlFor='title'
          className='block text-sm font-medium text-gray-700'
        >
          Title
        </label>
        <input
          id='title'
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          className='mt-1 block w-full rounded-md border-gray-300 shadow-sm'
          required
        />
      </div>

      <div>
        <label
          htmlFor='slug'
          className='block text-sm font-medium text-gray-700'
        >
          URL Slug
        </label>
        <input
          id='slug'
          value={slug}
          onChange={(e) => setSlug(e.target.value)}
          placeholder='e.g., how-to-file-for-bail-in-patna'
          className='mt-1 block w-full rounded-md border-gray-300 shadow-sm'
          required
        />
      </div>

      <div>
        <label
          htmlFor='author'
          className='block text-sm font-medium text-gray-700'
        >
          Author
        </label>
        <input
          id='author'
          value={author}
          onChange={(e) => setAuthor(e.target.value)}
          className='mt-1 block w-full rounded-md border-gray-300 shadow-sm'
          required
        />
      </div>

      <div>
        <label
          htmlFor='summary'
          className='block text-sm font-medium text-gray-700'
        >
          Summary (for previews)
        </label>
        <textarea
          id='summary'
          value={summary}
          onChange={(e) => setSummary(e.target.value)}
          rows={3}
          className='mt-1 block w-full rounded-md border-gray-300 shadow-sm'
          required
        />
      </div>

      <div>
        <label
          htmlFor='metaDescription'
          className='block text-sm font-medium text-gray-700'
        >
          Meta Description (For Google Search Results)
        </label>
        <textarea
          id='metaDescription'
          value={metaDescription}
          onChange={(e) => setMetaDescription(e.target.value)}
          rows={3}
          maxLength={160}
          className='mt-1 block w-full rounded-md border-gray-300 shadow-sm'
          required
        />
        <p className='text-xs text-gray-500 mt-1'>
          {metaDescription.length} / 160 characters
        </p>
      </div>

      <div>
        <label
          htmlFor='tags'
          className='block text-sm font-medium text-gray-700'
        >
          Tags (comma-separated)
        </label>
        <input
          id='tags'
          value={tags}
          onChange={(e) => setTags(e.target.value)}
          placeholder='e.g., criminal law, patna high court'
          className='mt-1 block w-full rounded-md border-gray-300 shadow-sm'
        />
      </div>

      <div>
        <label className='block text-sm font-medium text-gray-700 mb-1'>
          Main Content
        </label>
        {isEditorLoaded ? (
          <CKEditor
            editor={ClassicEditor}
            data={content}
            onChange={(event: any, editor: any) => {
              const data = editor.getData();
              setContent(data);
            }}
          />
        ) : (
          <p>Loading editor...</p>
        )}
      </div>

      <div className='flex justify-end items-center gap-4'>
        <Link href='/admin/posts' className='text-gray-600 hover:underline'>
          Cancel
        </Link>
        <button
          type='submit'
          disabled={isLoading}
          className='bg-brand-primary text-white px-6 py-2 rounded-lg hover:bg-brand-secondary disabled:bg-gray-400'
        >
          {isLoading ? "Saving..." : post?.id ? "Update Post" : "Create Post"}
        </button>
      </div>
    </form>
  );
};
