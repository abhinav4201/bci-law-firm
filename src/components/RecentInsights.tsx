import Link from "next/link";
import { getBlogPosts } from "@/lib/content";
import { BlogPost } from "@/lib/types";
import { ArrowRight } from "lucide-react";

export const RecentInsights = async () => {
  const posts = await getBlogPosts();
  const recentPosts = posts.slice(0, 3);

  return (
    <section id='recent-insights' className='py-10'>
      <div className='text-center mb-16'>
        <h2 className='text-3xl font-bold'>Recent Insights</h2>
        <p className='text-muted mt-2'>
          The latest articles and legal commentary.
        </p>
      </div>
      <div className='grid md:grid-cols-2 lg:grid-cols-3 gap-8'>
        {recentPosts.map((post: BlogPost) => (
          <div
            key={post.id}
            className='group relative bg-card p-8 rounded-xl border border-border shadow-sm transition-all duration-300 hover:border-brand-accent hover:shadow-lg'
          >
            <div className='relative z-10'>
              <h3 className='text-2xl font-bold mb-3 text-brand-primary group-hover:text-brand-accent transition-colors'>
                {post.title}
              </h3>
              <p className='text-muted mb-8'>{post.summary}</p>
              <Link href={`/blog/${post.slug}`} className='inline-block'>
                <span className='inline-flex items-center font-semibold text-white bg-brand-primary px-4 py-2 rounded-md shadow-sm hover:bg-brand-secondary transition-colors'>
                  Read More <ArrowRight className='ml-2 h-4 w-4' />
                </span>
              </Link>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};
