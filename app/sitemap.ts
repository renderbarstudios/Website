import type { MetadataRoute } from "next";
import { SITE } from "@/lib/site";
import { getAllPosts } from "@/lib/blog";

export default function sitemap(): MetadataRoute.Sitemap {
  const base = SITE.url;
  const lastModified = new Date();

  const paths = [
    { path: "/", changeFrequency: "weekly", priority: 1 },
    { path: "/drone", changeFrequency: "weekly", priority: 0.9 },
    { path: "/livestream", changeFrequency: "weekly", priority: 0.9 },
    { path: "/services", changeFrequency: "monthly", priority: 0.8 },
    { path: "/about", changeFrequency: "monthly", priority: 0.5 },
    { path: "/blog", changeFrequency: "weekly", priority: 0.6 },
    { path: "/contact", changeFrequency: "yearly", priority: 0.5 },
  ] as const;

  const staticRoutes: MetadataRoute.Sitemap = paths.map((r) => ({
    url: `${base}${r.path === "/" ? "" : r.path}` || base,
    lastModified,
    changeFrequency: r.changeFrequency,
    priority: r.priority,
  }));

  const postRoutes: MetadataRoute.Sitemap = getAllPosts().map((post) => ({
    url: `${base}/blog/${post.slug}`,
    lastModified: new Date(post.date),
    changeFrequency: "monthly",
    priority: 0.6,
  }));

  return [...staticRoutes, ...postRoutes];
}
