// src/app/sitemap.ts

import { MetadataRoute } from "next";
import { getBlogPosts } from "@/lib/content";
import { getPracticeAreas } from "@/lib/content-server";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const siteUrl = "https://www.yourdomain.com"; // REPLACE WITH YOUR DOMAIN

  // Get static routes
  const staticRoutes = [
    "",
    "/profile",
    "/practice-areas",
    "/blog",
    "/contact",
  ].map((route) => ({
    url: `${siteUrl}${route}`,
    lastModified: new Date(),
  }));

  // Get blog post routes
  const posts = await getBlogPosts();
  const postRoutes = posts.map((post) => ({
    url: `${siteUrl}/blog/${post.slug}`,
    lastModified: new Date(post.publishedDate),
  }));

  // Get practice area routes
  const practiceAreas = getPracticeAreas();
  const practiceAreaRoutes = practiceAreas.map((area) => ({
    url: `${siteUrl}/practice-areas/${area.slug}`,
    lastModified: new Date(),
  }));

  return [...staticRoutes, ...postRoutes, ...practiceAreaRoutes];
}
