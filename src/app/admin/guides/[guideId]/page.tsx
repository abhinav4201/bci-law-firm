import { adminDb } from "@/lib/firebaseAdmin";
import { notFound } from "next/navigation";
import { BlogPost } from "@/lib/types";
import { PostEditorLoader } from "@/components/admin/PostEditorLoader";

export default async function EditGuidePage({
  params,
}: {
  params: Promise<{ guideId: string }>;
}) {
  const { guideId } = await params;
  const isNew = guideId === "new";

  let post: BlogPost | undefined = undefined;

  if (!isNew) {
    const postDoc = await adminDb.collection("posts").doc(guideId).get();

    if (!postDoc.exists || postDoc.data()?.type !== "guide") {
      return notFound();
    }

    const data = postDoc.data();
    post = {
      id: postDoc.id,
      title: data?.title || "",
      summary: data?.summary || "",
      content: data?.content || "",
      author: data?.author || "",
      slug: data?.slug || "",
      publishedDate: data?.publishedDate.toDate().toISOString(),
      metaDescription: data?.metaDescription || "",
      tags: data?.tags || [],
      type: "guide",
      topic: data?.topic || "",
    };
  }

  return (
    <div>
      <h1 className='text-3xl font-bold mb-6'>
        {isNew ? "Create New Guide" : "Edit Guide"}
      </h1>
      <PostEditorLoader post={post} isGuide={true} />
    </div>
  );
}
