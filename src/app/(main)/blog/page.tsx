import { getBlogPosts } from "@/lib/content";
import { BlogFilter } from "@/components/BlogFilter";

// --- CORRECTED: Re-added the revalidate constant ---
// This tells Next.js to regenerate this page at most once every hour,
// ensuring new blog posts are fetched without a full redeployment.
export const revalidate = 3600; // Revalidate at most every hour

// This remains a Server Component for optimal SEO
export default async function BlogPage() {
  const allPosts = await getBlogPosts();
  // Filter for only blog posts on the server, ensuring the initial page load is clean
  const blogPosts = allPosts.filter((p) => p.type === "blog");

  // Calculate unique topics on the server to pass down to the client component
  const uniqueTopics = [
    ...new Set(blogPosts.map((p) => p.topic).filter(Boolean)),
  ];

  return (
    <div className='max-w-4xl mx-auto'>
      <h1 className='text-5xl font-extrabold text-center mb-6 text-brand-primary'>
        Legal Insights & Articles
      </h1>

      {/*
        The initial render is handled on the server, which is perfect for SEO.
        The BlogFilter component then takes over on the client-side for interactivity.
      */}
      <BlogFilter initialPosts={blogPosts} initialTopics={uniqueTopics} />
    </div>
  );
}
