import { getBlogPosts } from "@/lib/content";
import { BlogPost } from "@/lib/types";
import Link from "next/link";
import { BookText, ArrowRight } from "lucide-react";

export const revalidate = 3600;

export default async function LegalGuidesPage() {
  // For now, we can reuse the blog posts as guides.
  // In the future, you could create a separate "guides" collection in Firestore.
  const guides = await getBlogPosts();

  return (
    <div className='max-w-4xl mx-auto'>
      <h1 className='text-5xl font-extrabold text-center mb-12 text-brand-primary'>
        Legal Guides & Resources
      </h1>
      <p className='text-center text-lg text-muted mb-12'>
        In-depth articles and guides to help you understand complex legal
        topics.
      </p>
      <div className='space-y-10'>
        {guides.map((guide: BlogPost) => (
          <Link
            href={`/blog/${guide.slug}`} // Links to the same detail page as the blog
            key={guide.id}
            className='block p-8 bg-card rounded-xl shadow-lg hover:shadow-2xl hover:-translate-y-1 transition-all duration-300 group'
          >
            <h2 className='text-3xl font-bold text-brand-secondary group-hover:text-brand-accent transition-colors mb-3'>
              {guide.title}
            </h2>
            <div className='flex items-center text-muted text-sm mb-4'>
              <BookText className='h-4 w-4 mr-2' />
              <span>{guide.author}</span>
            </div>
            <p className='text-foreground text-lg mb-5'>{guide.summary}</p>
            <span className='font-semibold inline-flex items-center text-brand-primary'>
              Read Guide <ArrowRight className='ml-2 h-4 w-4' />
            </span>
          </Link>
        ))}
        {guides.length === 0 && (
          <p className='text-center text-muted text-lg py-10'>
            No guides have been published yet. Please check back later.
          </p>
        )}
      </div>
    </div>
  );
}
