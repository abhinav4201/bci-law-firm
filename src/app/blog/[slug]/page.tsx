import { getBlogPosts } from "@/lib/content";
import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { BlogPost } from "@/lib/types";
import { Calendar, User } from "lucide-react";

export const revalidate = 3600;

export async function generateStaticParams() {
  const posts = await getBlogPosts();
  return posts.map((post: BlogPost) => ({
    slug: post.slug,
  }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const posts = await getBlogPosts();
  const post = posts.find((p: BlogPost) => p.slug === slug);

  if (!post) {
    return { title: "Post not found" };
  }

  return {
    title: post.title,
    description: post.summary,
  };
}

export default async function BlogPostPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const posts = await getBlogPosts();
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
      <div
        className='prose prose-lg max-w-none text-foreground leading-relaxed'
        dangerouslySetInnerHTML={{ __html: post.content }}
      />
    </article>
  );
}
