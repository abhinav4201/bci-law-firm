import { getPosts } from "@/lib/content";
import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { BlogPost } from "@/lib/types";
import { Calendar, User, Tag } from "lucide-react";

export const revalidate = 3600;

// This function ensures Next.js pre-builds all your guide pages
export async function generateStaticParams() {
  const posts = await getPosts("guide"); // Fetch only guides
  return posts.map((post: BlogPost) => ({
    slug: post.slug,
  }));
}

export async function generateMetadata({
  params,
}: {
  params: { slug: string };
}): Promise<Metadata> {
  const { slug } = params;
  const posts = await getPosts("guide"); // Fetch only guides
  const post = posts.find((p: BlogPost) => p.slug === slug);

  if (!post) {
    return { title: "Guide not found" };
  }

  return {
    title: post.title,
    description: post.metaDescription,
    keywords: post.tags,
  };
}

// This is the page component that renders the guide
export default async function LegalGuidePage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const posts = await getPosts("guide"); // Fetch only guides
  const post = posts.find((p: BlogPost) => p.slug === slug);

  if (!post) {
    notFound();
  }

  return (
    <article className='max-w-3xl mx-auto p-8 md:p-12 bg-card rounded-xl shadow-lg'>
      <h1 className='text-4xl md:text-5xl font-extrabold text-brand-primary mb-4'>
        {post.title}
      </h1>
      <div className='flex items-center text-muted mb-8'>
        <div className='flex items-center mr-6'>
          <Calendar className='h-5 w-5 mr-2' />
          <span>{post.publishedDate}</span>
        </div>
        <div className='flex items-center'>
          <User className='h-5 w-5 mr-2' />
          <span>{post.author}</span>
        </div>
      </div>
      {post.tags && post.tags.length > 0 && (
        <div className='flex items-center flex-wrap gap-2 mb-8'>
          <Tag className='h-5 w-5 text-muted' />
          {post.tags.map((tag) => (
            <span
              key={tag}
              className='bg-gray-100 text-gray-700 text-xs font-medium px-2.5 py-1 rounded-full'
            >
              {tag}
            </span>
          ))}
        </div>
      )}
      <div
        className='prose prose-lg max-w-none text-foreground leading-relaxed'
        dangerouslySetInnerHTML={{ __html: post.content }}
      />
    </article>
  );
}
