import { client } from "@/sanity/client";
import type { BlogPost, Project } from "@/lib/types";

const revalidateOptions = { next: { revalidate: 60 } };

const PROJECT_FIELDS = `
  _id,
  title,
  mainImage { asset-> { url } },
  categories,
  technologies,
  features,
  body,
  slug,
  liveLink,
  clientRepo,
  serverRepo
`;

const PROJECTS_QUERY = `*[
  _type == "project" && defined(slug.current)
] | order(_createdAt desc) { ${PROJECT_FIELDS} }`;

const LATEST_PROJECTS_QUERY = `*[
  _type == "project" && defined(slug.current)
] | order(_createdAt desc)[0...6] { ${PROJECT_FIELDS} }`;

const PROJECT_QUERY = `*[_type == "project" && slug.current == $slug][0] {
  ${PROJECT_FIELDS}
}`;

const POSTS_QUERY = `*[
  _type == "post" && defined(slug.current)
] | order(publishedAt desc)[0...24]{
  _id,
  title,
  slug,
  excerpt,
  author->{ name, image, bio },
  publishedAt,
  mainImage { asset->{ url } },
  categories[]->{ title },
  estimatedReadingTime
}`;

const POST_QUERY = `*[_type == "post" && slug.current == $slug][0]{
  _id,
  title,
  body,
  publishedAt,
  excerpt,
  categories[]->{ title },
  mainImage,
  author->{ name, image, bio },
  estimatedReadingTime,
  slug
}`;

const RECENT_POSTS_QUERY = `*[
  _type == "post" && slug.current != $slug
] | order(publishedAt desc)[0...4]{
  _id,
  title,
  slug,
  publishedAt,
  excerpt,
  mainImage { asset->{ url } },
  categories[]->{ title },
  estimatedReadingTime
}`;

export async function getProjects(): Promise<Project[]> {
  try {
    return await client.fetch<Project[]>(PROJECTS_QUERY, {}, revalidateOptions);
  } catch (error) {
    console.error("Unable to load projects:", error);
    return [];
  }
}

export async function getLatestProjects(): Promise<Project[]> {
  try {
    return await client.fetch<Project[]>(LATEST_PROJECTS_QUERY, {}, revalidateOptions);
  } catch (error) {
    console.error("Unable to load latest projects:", error);
    return [];
  }
}

export async function getProjectBySlug(slug: string) {
  try {
    return await client.fetch<Project | null>(
      PROJECT_QUERY,
      { slug },
      revalidateOptions,
    );
  } catch (error) {
    console.error("Unable to load project:", error);
    return null;
  }
}

export async function getProjectSlugs() {
  try {
    return await client.fetch<{ slug: { current: string } }[]>(
      `*[_type == "project" && defined(slug.current)]{ slug { current } }`,
    );
  } catch {
    return [];
  }
}

export async function getPosts(): Promise<BlogPost[]> {
  try {
    return await client.fetch<BlogPost[]>(POSTS_QUERY, {}, revalidateOptions);
  } catch (error) {
    console.error("Unable to load posts:", error);
    return [];
  }
}

export async function getPostBySlug(slug: string) {
  try {
    return await client.fetch<Record<string, unknown> | null>(
      POST_QUERY,
      { slug },
      revalidateOptions,
    );
  } catch (error) {
    console.error("Unable to load post:", error);
    return null;
  }
}

export async function getRecentPosts(slug: string): Promise<BlogPost[]> {
  try {
    return await client.fetch<BlogPost[]>(
      RECENT_POSTS_QUERY,
      { slug },
      revalidateOptions,
    );
  } catch {
    return [];
  }
}

export async function getPostSlugs() {
  try {
    return await client.fetch<string[]>(
      `*[_type == "post" && defined(slug.current)].slug.current`,
    );
  } catch {
    return [];
  }
}
