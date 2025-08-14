import { getPosts } from "@/lib/content"; // --- Use the generic getPosts function ---
import { BlogFilter } from "@/components/BlogFilter";

export const revalidate = 3600;

export default async function BlogPage() {
  // --- CORRECTED: Fetch only posts with type 'blog' ---
  const blogPosts = await getPosts("blog");

  // Calculate unique topics from the fetched blog posts
  const uniqueTopics = [
    ...new Set(blogPosts.map((p) => p.topic).filter(Boolean)),
  ];

  return (
    <div className='max-w-4xl mx-auto'>
      <h1 className='text-5xl font-extrabold text-center mb-6 text-brand-primary'>
        Legal Insights & Articles
      </h1>

      <BlogFilter initialPosts={blogPosts} initialTopics={uniqueTopics} />
    </div>
  );
}
