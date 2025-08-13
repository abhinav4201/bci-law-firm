import { getBlogPosts } from "@/lib/content";
import { BlogPost } from "@/lib/types";
import Link from "next/link";
import { Calendar, ArrowRight } from "lucide-react";

// Revalidate the page every hour to fetch new posts
export const revalidate = 3600;

export default async function BlogPage() {
  const posts = await getBlogPosts();

  return (
    <div className='max-w-4xl mx-auto'>
      <h1 className='text-5xl font-extrabold text-center mb-12 text-brand-primary'>
        Legal Insights & Articles
      </h1>
      <div className='space-y-10'>
        {posts.map((post: BlogPost) => (
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
        {posts.length === 0 && (
          <p className='text-center text-muted text-lg py-10'>
            No articles have been published yet. Please check back later.
          </p>
        )}
      </div>
    </div>
  );
}
