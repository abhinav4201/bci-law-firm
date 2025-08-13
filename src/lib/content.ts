import fs from "fs";
import path from "path";
import type { SiteConfig, Profile, PracticeArea, BlogPost } from "./types";
import { db } from "./firebase";
import {
  collection,
  getDocs,
  query,
  orderBy,
  QueryDocumentSnapshot,
  DocumentData,
} from "firebase/firestore";

const contentDirectory = path.join(process.cwd(), "content");

export function getSiteConfig(): SiteConfig {
  const fullPath = path.join(contentDirectory, "siteConfig.json");
  const fileContents = fs.readFileSync(fullPath, "utf8");
  return JSON.parse(fileContents);
}

export function getProfile(): Profile {
  const fullPath = path.join(contentDirectory, "profile.json");
  const fileContents = fs.readFileSync(fullPath, "utf8");
  return JSON.parse(fileContents);
}

export function getPracticeAreas(): PracticeArea[] {
  const fullPath = path.join(contentDirectory, "practiceAreas.json");
  const fileContents = fs.readFileSync(fullPath, "utf8");
  const data: PracticeArea[] = JSON.parse(fileContents);
  return data.sort((a, b) => a.title.localeCompare(b.title));
}

// NEW FUNCTION TO GET BLOG POSTS
export async function getBlogPosts(): Promise<BlogPost[]> {
  const postsCol = collection(db, "posts");
  // NOTE: Firestore requires you to create an index for this query.
  // The error message in the terminal will give you a direct link to create it.
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
