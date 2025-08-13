import { db } from "./firebase";
import {
  collection,
  getDocs,
  query,
  orderBy,
  QueryDocumentSnapshot,
  DocumentData,
} from "firebase/firestore";
import { BlogPost } from "./types"; // Assuming BlogPost is in types

// This function is safe to run on client or server
export async function getBlogPosts(): Promise<BlogPost[]> {
  const postsCol = collection(db, "posts");
  const q = query(postsCol, orderBy("publishedDate", "desc"));
  const postSnapshot = await getDocs(q);
  const postList = postSnapshot.docs.map(
    (doc: QueryDocumentSnapshot<DocumentData>) =>
      ({
        id: doc.id,
        ...doc.data(),
      } as BlogPost)
  );
  return postList;
}
