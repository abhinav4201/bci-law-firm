import { NextResponse } from "next/server";
import { adminDb } from "@/lib/firebaseAdmin";
import {
//   collection,
//   getDocs,
//   addDoc,
  serverTimestamp,
} from "firebase/firestore";

// GET handler to fetch all posts
export async function GET() {
  try {
    const postsSnapshot = await adminDb
      .collection("posts")
      .orderBy("publishedDate", "desc")
      .get();
    const posts = postsSnapshot.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
    }));
    return NextResponse.json(posts);
  } catch (error) {
    console.error("Error fetching posts:", error);
    return NextResponse.json(
      { error: "Failed to fetch posts" },
      { status: 500 }
    );
  }
}

// POST handler to create a new post
export async function POST(request: Request) {
  try {
    const post = await request.json();
    const docRef = await adminDb.collection("posts").add({
      ...post,
      publishedDate: serverTimestamp(), // Use server timestamp
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
