import { NextResponse } from "next/server";
import { adminDb } from "@/lib/firebaseAdmin";
import * as admin from "firebase-admin";

// GET handler to fetch paginated and filtered posts
export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const page = parseInt(searchParams.get("page") || "1", 10);
    const limit = parseInt(searchParams.get("limit") || "10", 10);
    const type = searchParams.get("type"); // 'blog' or 'guide'

    let query: admin.firestore.Query = adminDb.collection("posts");

    // Apply type filter if provided
    if (type === "blog" || type === "guide") {
      query = query.where("type", "==", type);
    }

    // Get total count for pagination before applying limits
    const totalSnapshot = await query.get();
    const total = totalSnapshot.size;

    // Apply ordering and pagination
    const offset = (page - 1) * limit;
    const paginatedQuery = query
      .orderBy("publishedDate", "desc")
      .limit(limit)
      .offset(offset);

    const postsSnapshot = await paginatedQuery.get();
    const posts = postsSnapshot.docs.map((doc) => {
      const data = doc.data();
      return {
        id: doc.id,
        ...data,
        // Ensure date is converted to a serializable format
        publishedDate: data.publishedDate.toDate().toISOString(),
      };
    });

    return NextResponse.json({ posts, total });
  } catch (error) {
    console.error("Error fetching posts:", error);
    return NextResponse.json(
      { error: "Failed to fetch posts" },
      { status: 500 }
    );
  }
}

// POST handler remains unchanged
export async function POST(request: Request) {
  try {
    const post = await request.json();
    const docRef = await adminDb.collection("posts").add({
      ...post,
      publishedDate: admin.firestore.FieldValue.serverTimestamp(),
    });
    return NextResponse.json({ id: docRef.id });
  } catch (error) {
    console.error("Error creating post:", error);
    return NextResponse.json(
      { error: "Failed to create post" },
      { status: 500 }
    );
  }
}
