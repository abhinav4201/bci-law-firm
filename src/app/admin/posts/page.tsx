import Link from "next/link";
import { PlusCircle } from "lucide-react";
import { adminDb } from "@/lib/firebaseAdmin";
import { PostClientManager } from "@/components/admin/PostClientManager";

export default async function AdminPostsPage() {
  const postsSnapshot = await adminDb
    .collection("posts")
    .orderBy("publishedDate", "desc")
    .get();

  // Corrected mapping to explicitly define the object shape for TypeScript
  const initialPosts = postsSnapshot.docs.map((doc) => {
    const data = doc.data();
    return {
      id: doc.id,
      title: data.title || "Untitled", // Add defaults for safety
      summary: data.summary || "",
      author: data.author || "Unknown",
      publishedDate: data.publishedDate.toDate().toLocaleDateString("en-US", {
        year: "numeric",
        month: "long",
        day: "numeric",
      }),
      // Make sure to include all properties expected by the Post type
      content: data.content || "",
    };
  });

  return (
    <div>
      <div className='flex justify-between items-center mb-6'>
        <h1 className='text-3xl font-bold'>Manage Posts</h1>
        <Link
          href='/admin/posts/new'
          className='bg-brand-primary text-white px-4 py-2 rounded-lg flex items-center hover:bg-brand-secondary transition-colors'
        >
          <PlusCircle className='h-5 w-5 mr-2' />
          Create New Post
        </Link>
      </div>
      <PostClientManager initialPosts={initialPosts} />
    </div>
  );
}
