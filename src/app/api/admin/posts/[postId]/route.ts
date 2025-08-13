import { NextResponse } from "next/server";
import { adminDb } from "@/lib/firebaseAdmin";

// PUT handler to update a post
export async function PUT(
  request: Request,
  { params }: { params: Promise<{ postId: string }> }
) {
  try {
    const { postId } = await params;
    const postData = await request.json();
    await adminDb.collection("posts").doc(postId).update(postData);
    return NextResponse.json({ success: true, id: postId });
  } catch (error) {
    console.error(`Error updating post ${params}:`, error);
    return NextResponse.json(
      { error: "Failed to update post" },
      { status: 500 }
    );
  }
}

// DELETE handler to delete a post
export async function DELETE(
  request: Request,
  { params }: { params: Promise<{ postId: string }> }
) {
  try {
    const { postId } = await params;
    await adminDb.collection("posts").doc(postId).delete();
    return NextResponse.json({ success: true });
  } catch (error) {
    console.error(`Error deleting post ${params}:`, error);
    return NextResponse.json(
      { error: "Failed to delete post" },
      { status: 500 }
    );
  }
}
