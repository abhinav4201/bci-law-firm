/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { useState, FormEvent } from "react";
import { useRouter } from "next/navigation";
import { BlogPost } from "@/lib/types";
import Link from "next/link";
import { Editor } from "@tinymce/tinymce-react";

export const PostEditor = ({ post }: { post?: BlogPost }) => {
  const router = useRouter();

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
  // --- NEW STATE FIELDS ---
  const [type, setType] = useState<"blog" | "guide">(post?.type || "blog");
  const [topic, setTopic] = useState(post?.topic || "");

  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError("");

    const tagsArray = tags
      .split(",")
      .map((tag) => tag.trim())
      .filter(Boolean);

    // --- UPDATED POST DATA OBJECT ---
    const postData = {
      title,
      summary,
      content,
      author,
      slug,
      metaDescription,
      tags: tagsArray,
      type, // Now includes the content type
      topic, // Now includes the topic
    };

    const url = post?.id ? `/api/admin/posts/${post.id}` : "/api/admin/posts";
    const method = post?.id ? "PUT" : "POST";

    try {
      const response = await fetch(url, {
        method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(postData),
      });

      if (!response.ok) {
        const errorResult = await response.json();
        throw new Error(errorResult.error || "Failed to save the post.");
      }

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
      className='space-y-6 bg-white p-8 rounded-lg shadow-md'
    >
      {error && (
        <p className='text-red-600 bg-red-100 p-3 rounded text-center font-medium'>
          {error}
        </p>
      )}

      {/* --- Title, Slug, Author fields (no change) --- */}
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

      {/* --- NEWLY ADDED SECTION FOR TYPE AND TOPIC --- */}
      <div className='grid md:grid-cols-2 gap-6'>
        <div>
          <label
            htmlFor='type'
            className='block text-sm font-medium text-gray-700'
          >
            Content Type
          </label>
          <select
            id='type'
            value={type}
            onChange={(e) => setType(e.target.value as "blog" | "guide")}
            className='mt-1 block w-full rounded-md border-gray-300 shadow-sm'
          >
            <option value='blog'>Blog Post</option>
            <option value='guide'>Legal Guide</option>
          </select>
        </div>
        <div>
          <label
            htmlFor='topic'
            className='block text-sm font-medium text-gray-700'
          >
            Topic / Category
          </label>
          <input
            id='topic'
            value={topic}
            onChange={(e) => setTopic(e.target.value)}
            placeholder='e.g., Family Law'
            className='mt-1 block w-full rounded-md border-gray-300 shadow-sm'
            required
          />
        </div>
      </div>
      {/* --- END OF NEW SECTION --- */}

      {/* --- Summary, Meta Description, Tags, Editor, Buttons (no change) --- */}
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
        <Editor
          apiKey={process.env.NEXT_PUBLIC_TINYMCE_API_KEY}
          value={content}
          onEditorChange={(newValue) => setContent(newValue)}
          init={{
            height: 500,
            menubar: false,
            plugins: [
              "advlist",
              "autolink",
              "lists",
              "link",
              "image",
              "charmap",
              "preview",
              "anchor",
              "searchreplace",
              "visualblocks",
              "code",
              "fullscreen",
              "insertdatetime",
              "media",
              "table",
              "help",
              "wordcount",
            ],
            toolbar:
              "undo redo | blocks | " +
              "bold italic forecolor | alignleft aligncenter " +
              "alignright alignjustify | bullist numlist outdent indent | " +
              "removeformat | help",
            content_style:
              "body { font-family:Inter,sans-serif; font-size:16px }",
          }}
        />
      </div>
      <div className='flex justify-end items-center gap-4 pt-4 border-t'>
        <Link href='/admin/posts' className='text-gray-600 hover:underline'>
          Cancel
        </Link>
        <button
          type='submit'
          disabled={isLoading}
          className='bg-brand-primary text-white px-6 py-2 rounded-lg font-semibold hover:opacity-90 transition-opacity disabled:bg-gray-400'
        >
          {isLoading ? "Saving..." : post?.id ? "Update Post" : "Create Post"}
        </button>
      </div>
    </form>
  );
};
