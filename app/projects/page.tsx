import { client } from "@/sanity/client";
import ProjectGridClient from "./ProjectGridClient";

interface Project {
  _id: string;
  title: string;
  mainImage?: {
    asset?: {
      url: string;
    };
  };
  categories?: string[]; // ✅ was "category: string" — schema is array "categories"
  technologies?: string[]; // ✅ was "technology" — schema field is "technologies"
  features?: string[]; // ✅ added — exists in schema
  slug: { current: string };
  liveLink?: string; // ✅ was "livelink" — schema field is "liveLink" (camelCase)
  clientRepo?: string; // ✅ was "clientlink" — schema field is "clientRepo"
  serverRepo?: string; // ✅ was "serverlink" — schema field is "serverRepo"
  body?: Array<{
    // ✅ was "description: string" — schema field is "body" (blockContent)
    _type: string;
    children?: Array<{ _type: string; text?: string }>;
  }>;
}

// ✅ FIXED: field names now match the Sanity schema exactly
const PROJECTS_QUERY = `*[
  _type == "project" && defined(slug.current)
] | order(_createdAt desc) {
  _id,
  title,
  mainImage {
    asset-> {
      url
    }
  },
  categories,
  technologies,
  features,
  body,
  slug,
  liveLink,
  clientRepo,
  serverRepo
}`;

const options: { next: { revalidate: number } } = { next: { revalidate: 30 } };

export default async function ProjectsPage() {
  try {
    const projects = await client.fetch<Project[]>(PROJECTS_QUERY, {}, options);

    return <ProjectGridClient projects={projects} />;
  } catch (error) {
    console.error("Error fetching projects:", error);
    return (
      <div className="min-h-screen flex items-center justify-center bg-black">
        <div className="text-center">
          <div className="text-6xl mb-4">🚧</div>
          <h1 className="text-2xl font-bold text-white mb-2">
            Projects Loading Error
          </h1>
          <p className="text-white/70">
            Unable to load projects. Please try again later.
          </p>
        </div>
      </div>
    );
  }
}
