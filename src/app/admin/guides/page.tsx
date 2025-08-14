import Link from "next/link";
import { PlusCircle } from "lucide-react";
import { adminDb } from "@/lib/firebaseAdmin";
import { PostClientManager } from "@/components/admin/PostClientManager";

export default async function AdminGuidesPage() {
  const guidesSnapshot = await adminDb
    .collection("posts")
    .where("type", "==", "guide") // Fetch only guides
    .orderBy("publishedDate", "desc")
    .get();

  const initialGuides = guidesSnapshot.docs.map((doc) => {
    const data = doc.data();
    return {
      id: doc.id,
      title: data.title || "Untitled",
      summary: data.summary || "",
      author: data.author || "Unknown",
      publishedDate: data.publishedDate.toDate().toLocaleDateString("en-US", {
        year: "numeric",
        month: "long",
        day: "numeric",
      }),
      content: data.content || "",
      slug: data.slug || "",
      metaDescription: data.metaDescription || "",
      tags: data.tags || [],
      type: "guide",
      topic: data.topic || "",
    };
  });

  return (
    <div>
      <div className='flex justify-between items-center mb-6'>
        <h1 className='text-3xl font-bold'>Manage Legal Guides</h1>
        <Link
          href='/admin/guides/new' // Point to the new guide editor
          className='bg-brand-primary text-white px-4 py-2 rounded-lg flex items-center hover:bg-brand-secondary transition-colors'
        >
          <PlusCircle className='h-5 w-5 mr-2' />
          Create New Guide
        </Link>
      </div>
      {/* The PostClientManager can be reused, just pass the correct data and links */}
      <PostClientManager initialPosts={initialGuides} postType='guide' />
    </div>
  );
}
