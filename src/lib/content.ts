import { db } from "./firebase";
import {
  collection,
  getDocs,
  query,
  orderBy,
  where, // --- IMPORT 'where' ---
  QueryDocumentSnapshot,
  DocumentData,
} from "firebase/firestore";
import { BlogPost } from "./types";

// --- MODIFIED FUNCTION ---
// It now accepts an optional 'type' argument to filter the content.
export async function getPosts(type?: "blog" | "guide"): Promise<BlogPost[]> {
  const postsCol = collection(db, "posts");

  // Start with the base query
  let q = query(postsCol, orderBy("publishedDate", "desc"));

  // If a type is specified, add the "where" clause to filter
  if (type) {
    q = query(
      postsCol,
      where("type", "==", type),
      orderBy("publishedDate", "desc")
    );
  }

  const postSnapshot = await getDocs(q);
  const postList = postSnapshot.docs.map(
    (doc: QueryDocumentSnapshot<DocumentData>) => {
      const data = doc.data();
      return {
        id: doc.id,
        ...data,
        // Convert Timestamp to a user-friendly date string immediately
        publishedDate: data.publishedDate.toDate().toLocaleDateString("en-US", {
          year: "numeric",
          month: "long",
          day: "numeric",
        }),
      } as BlogPost;
    }
  );
  return postList;
}
