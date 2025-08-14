"use client";

import { useState } from "react";
import { BlogPost } from "@/lib/types";
import Link from "next/link";
import { Calendar, ArrowRight } from "lucide-react";
import { Pagination } from "./common/Pagination"; // --- IMPORT Pagination ---

interface BlogFilterProps {
  initialPosts: BlogPost[];
  initialTopics: string[];
}

const POSTS_PER_PAGE = 5; // --- SET POSTS PER PAGE ---

export function BlogFilter({ initialPosts, initialTopics }: BlogFilterProps) {
  const [selectedTopic, setSelectedTopic] = useState<string | null>(null);
  const [currentPage, setCurrentPage] = useState(1); // --- NEW: Pagination state ---

  // Apply topic filter first
  const topicFilteredPosts = selectedTopic
    ? initialPosts.filter((post) => post.topic === selectedTopic)
    : initialPosts;

  // --- NEW: Pagination Logic ---
  const totalPages = Math.ceil(topicFilteredPosts.length / POSTS_PER_PAGE);
  const paginatedPosts = topicFilteredPosts.slice(
    (currentPage - 1) * POSTS_PER_PAGE,
    currentPage * POSTS_PER_PAGE
  );

  const handleTopicChange = (topic: string | null) => {
    setSelectedTopic(topic);
    setCurrentPage(1); // Reset to first page when topic changes
  };
  // --- END NEW ---

  return (
    <div>
      {/* --- Topic Filter UI (Updated to use handleTopicChange) --- */}
      <div className='flex justify-center flex-wrap gap-2 mb-12'>
        <button
          onClick={() => handleTopicChange(null)}
          className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${
            !selectedTopic
              ? "bg-brand-primary text-white"
              : "bg-gray-200 text-gray-700 hover:bg-gray-300"
          }`}
        >
          All Topics
        </button>
        {initialTopics.map((topic) => (
          <button
            key={topic}
            onClick={() => handleTopicChange(topic)}
            className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${
              selectedTopic === topic
                ? "bg-brand-primary text-white"
                : "bg-gray-200 text-gray-700 hover:bg-gray-300"
            }`}
          >
            {topic} ({initialPosts.filter((p) => p.topic === topic).length})
          </button>
        ))}
      </div>

      {/* --- Display Paginated Posts --- */}
      <div className='space-y-10'>
        {paginatedPosts.map((post: BlogPost) => (
          <Link
            href={`/blog/${post.slug}`}
            key={post.id}
            className='block p-8 bg-card rounded-xl shadow-lg hover:shadow-2xl hover:-translate-y-1 transition-all duration-300 group'
          >
            <h2 className='text-3xl font-bold text-brand-secondary group-hover:text-brand-accent transition-colors mb-3'>
              {post.title}
            </h2>
            <div className='flex items-center text-muted text-sm mb-4'>
              <Calendar className='h-4 w-4 mr-2' />
              <span>{post.publishedDate}</span>
              <span className='mx-2'>|</span>
              <span>By {post.author}</span>
            </div>
            <p className='text-foreground text-lg mb-5'>{post.summary}</p>
            <span className='font-semibold inline-flex items-center text-brand-primary'>
              Read More <ArrowRight className='ml-2 h-4 w-4' />
            </span>
          </Link>
        ))}
        {paginatedPosts.length === 0 && (
          <p className='text-center text-muted text-lg py-10'>
            No articles found for this topic.
          </p>
        )}
      </div>

      {/* --- NEW: Render Pagination Component --- */}
      <Pagination
        currentPage={currentPage}
        totalPages={totalPages}
        onPageChange={setCurrentPage}
      />
    </div>
  );
}
