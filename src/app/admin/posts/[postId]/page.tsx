import { adminDb } from "@/lib/firebaseAdmin";
import { notFound } from "next/navigation";
import { BlogPost } from "@/lib/types";
import { PostEditorLoader } from "@/components/admin/PostEditorLoader"; // Import the new loader

// This page remains a Server Component for fetching data
export default async function EditPostPage({
  params,
}: {
  params: { postId: string };
}) {
  const { postId } = params;
  const isNewPost = postId === "new";

  let post: BlogPost | undefined = undefined;

  if (!isNewPost) {
    const postDoc = await adminDb.collection("posts").doc(postId).get();

    if (!postDoc.exists) {
      return notFound();
    }

    const data = postDoc.data();
    post = {
      id: postDoc.id,
      title: data?.title,
      summary: data?.summary,
      content: data?.content,
      author: data?.author,
      slug: data?.slug,
      publishedDate: data?.publishedDate.toDate().toISOString(),
      metaDescription: data?.metaDescription || "", // Added
      tags: data?.tags || [],
    };
  }

  return (
    <div>
      <h1 className='text-3xl font-bold mb-6'>
        {isNewPost ? "Create New Post" : "Edit Post"}
      </h1>
      {/* Render the client component which handles the dynamic import */}
      <PostEditorLoader post={post} />
    </div>
  );
}
