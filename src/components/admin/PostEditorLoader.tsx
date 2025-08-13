"use client";

import dynamic from "next/dynamic";
import { BlogPost } from "@/lib/types";

// Dynamically import the PostEditor inside a Client Component
const PostEditor = dynamic(
  () => import("@/components/admin/PostEditor").then((mod) => mod.PostEditor),
  {
    ssr: false,
    loading: () => <p className='text-center p-8'>Loading Editor...</p>,
  }
);

// This wrapper component receives the server-fetched data and passes it down
export function PostEditorLoader({ post }: { post?: BlogPost }) {
  return <PostEditor post={post} />;
}
