import { MetadataRoute } from "next";
import { getPosts } from "@/lib/content";
import { getPracticeAreas } from "@/lib/content-server";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const siteUrl = "https://www.yourdomain.com"; // REPLACE WITH YOUR DOMAIN

  const staticRoutes = [
    "",
    "/profile",
    "/practice-areas",
    "/blog",
    "/legal-guides",
    "/contact",
    "/disclaimer",
    "/privacy-policy",
  ].map((route) => ({
    url: `${siteUrl}${route}`,
    lastModified: new Date(),
    // --- CORRECTED: Using 'as const' to satisfy the specific type requirement ---
    changeFrequency: "monthly" as const,
  }));

  const allPosts = await getPosts();
  const postRoutes = allPosts.map((post) => ({
    url: `${siteUrl}/${post.type === "guide" ? "legal-guides" : "blog"}/${
      post.slug
    }`,
    lastModified: new Date(post.publishedDate),
    // --- CORRECTED: Using 'as const' ---
    changeFrequency: "weekly" as const,
  }));

  const practiceAreaRoutes = getPracticeAreas().map((area) => ({
    url: `${siteUrl}/practice-areas/${area.slug}`,
    lastModified: new Date(),
    // --- CORRECTED: Using 'as const' ---
    changeFrequency: "monthly" as const,
  }));

  return [...staticRoutes, ...postRoutes, ...practiceAreaRoutes];
}
