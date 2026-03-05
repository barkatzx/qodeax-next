import { client } from "@/sanity/client";
import PostsGrid from "./PostsGrid";

// Define the Post type to match Sanity schema
export interface Post {
  _id: string;
  title: string;
  slug: { current: string };
  publishedAt: string;
  excerpt?: string;
  mainImage?: { 
    asset: { 
      url: string 
    } 
  };
  categories?: { 
    title: string;
    _id?: string;
  }[];
  author?: {
    name: string;
    image?: any;
    bio?: any;
  };
  estimatedReadingTime?: number;
}

// GROQ query for fetching posts
const POSTS_QUERY = `*[
  _type == "post" && defined(slug.current)
] | order(publishedAt desc)[0...12]{
  _id,
  title,
  slug,
  excerpt,
  author->{ 
    name, 
    image, 
    bio 
  },
  publishedAt,
  mainImage { 
    asset->{ 
      url 
    } 
  },
  categories[]->{ 
    title 
  },
  estimatedReadingTime
}`;

// ISR (revalidation time in seconds)
export const revalidate = 30;

// TypeScript type for params (if needed in future)
type tParams = Promise<{ slug: string }>;

export default async function PostsPage() {
  try {
    // Fetch posts from Sanity
    const posts = await client.fetch<Post[]>(POSTS_QUERY);
    
    // Return posts grid with fetched data
    return <PostsGrid posts={posts} />;
    
  } catch (error) {
    // Error handling with user-friendly message
    console.error("Error fetching posts:", error);
    
    return (
      <div className="min-h-screen flex items-center justify-center bg-black">
        <div className="text-center p-8 rounded-2xl bg-white/5 border border-white/10">
          <p className="text-red-400 text-lg mb-2">Failed to load posts</p>
          <p className="text-white/50 text-sm">Please try again later</p>
        </div>
      </div>
    );
  }
}