import type { MetadataRoute } from "next";
import { siteConfig } from "@/data/site";
import { getPosts, getProjects } from "@/lib/content";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const [projects, posts] = await Promise.all([getProjects(), getPosts()]);
  const base = siteConfig.url.replace(/\/$/, "");

  const staticRoutes = ["", "/products", "/projects", "/blogs", "/privacy", "/terms", "/cookies"].map(
    (route) => ({
      url: `${base}${route}`,
      lastModified: new Date(),
      changeFrequency: (route === "" ? "weekly" : "monthly") as "weekly" | "monthly",
      priority: route === "" ? 1 : 0.7,
    }),
  );

  const projectRoutes = projects.map((project) => ({
    url: `${base}/projects/${project.slug.current}`,
    lastModified: new Date(),
    changeFrequency: "monthly" as const,
    priority: 0.6,
  }));

  const postRoutes = posts.map((post) => ({
    url: `${base}/blogs/${post.slug.current}`,
    lastModified: new Date(post.publishedAt),
    changeFrequency: "monthly" as const,
    priority: 0.6,
  }));

  return [...staticRoutes, ...projectRoutes, ...postRoutes];
}
