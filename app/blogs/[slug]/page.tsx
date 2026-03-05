import Glass from "@/components/ui/Glass";
import { client } from "@/sanity/client";
import { components } from "@/sanity/portabletext";
import imageUrlBuilder from "@sanity/image-url";
import type { SanityImageSource } from "@sanity/image-url/lib/types/types";
import { PortableText, type SanityDocument } from "next-sanity";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { FaBookReader, FaCalendarAlt, FaFacebook, FaLinkedin } from "react-icons/fa";
import { FaXTwitter } from "react-icons/fa6";

// GROQ query for fetching post by slug
const POST_QUERY = `*[_type == "post" && slug.current == $slug][0]{
  title,
  body,
  publishedAt,
  excerpt,
  categories[]->{ title },
  mainImage,
  author->{ name, image, bio },
  estimatedReadingTime
}`;

// GROQ query for fetching recent posts
const RECENT_POSTS_QUERY = `*[_type == "post" && slug.current != $slug] | order(publishedAt desc)[0...5]{
  title,
  slug,
  publishedAt,
  excerpt,
  mainImage,
  categories[]->{ title }
}`;

// Sanity image URL builder
const { projectId, dataset } = client.config();
const urlFor = (source: SanityImageSource) =>
  projectId && dataset
    ? imageUrlBuilder({ projectId, dataset }).image(source)
    : null;

// ISR (revalidation time in seconds)
export const revalidate = 30;

// Generate static paths
export async function generateStaticParams() {
  const slugs = await client.fetch<string[]>(`*[_type == "post"].slug.current`);
  return slugs.map((slug) => ({ slug }));
}

// TypeScript type for params
type tParams = Promise<{ slug: string }>;

export default async function PostPage(props: { params: tParams }) {
  const { slug } = await props.params;
  const decodedSlug = decodeURIComponent(slug);
  if (!decodedSlug) return notFound();

  const post = await client.fetch<SanityDocument>(POST_QUERY, {
    slug: decodedSlug,
  });
  if (!post) return notFound();

  // Fetch recent posts
  const recentPosts = await client.fetch<SanityDocument[]>(RECENT_POSTS_QUERY, {
    slug: decodedSlug,
  });

  const mainImageUrl = post.mainImage
    ? urlFor(post.mainImage)?.width(1200).height(630).quality(90).url()
    : null;

  const formattedDate = new Date(post.publishedAt).toLocaleDateString("en-US", {
    day: "numeric",
    month: "long",
    year: "numeric",
  });

  const readingTime =
    post.estimatedReadingTime ||
    Math.max(5, Math.ceil((post.body?.length || 0) / 1500));

  // Get current URL for sharing (will be handled client-side)
  const shareUrl = typeof window !== 'undefined' ? window.location.href : '';

  return (
    <main>
      {/* Hero Section */}
      <div className="px-4 md:px-20 py-6 md:py-12">
        <div className="container mx-auto">
          {/* Categories */}
          {post.categories?.length > 0 && (
            <Glass variant="blue" className="inline-flex items-center p-1 rounded-full mb-4">
              <div className="flex gap-1">
                {post.categories.map((cat: { title: string }, idx: number) => (
                  <span
                    key={idx}
                    className="px-4 py-2 text-sm font-medium text-white"
                  >
                    {cat.title}
                  </span>
                ))}
              </div>
            </Glass>
          )}

          {/* Post Title */}
          <h1 className="font-[Recoleta] text-3xl md:text-5xl lg:text-6xl font-bold mb-4 md:mb-6 leading-tight text-white">
            {post.title}
          </h1>

          {/* Excerpt
          {post.excerpt && (
            <p className="text-lg md:text-xl text-white/70 mb-6 max-w-3xl leading-relaxed">
              {post.excerpt}
            </p>
          )} */}

          {/* Meta Info */}
          <div className="flex items-center gap-4 text-white/60 text-sm md:text-base mb-6">
            <span className="flex items-center gap-2">
              <FaCalendarAlt className="text-[#00a8ff]" />
              {formattedDate}
            </span>
            <span className="flex items-center gap-2">
              <FaBookReader className="text-[#4dc3ff]" />
              {readingTime} min read
            </span>
          </div>
        </div>

        {/* Featured Image */}
        {mainImageUrl && (
          <div className="mt-6 md:mt-8">
            <div className="container mx-auto">
              <div className="relative rounded-xl md:rounded-2xl overflow-hidden border border-white/10">
                <Image
                  src={mainImageUrl}
                  alt={post.title}
                  width={800}
                  height={600}
                  className="w-full h-auto object-cover"
                  priority
                  sizes="(max-width: 768px) 100vw, 1200px"
                />
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Content Section with Sidebar */}
      <div className="px-4 md:px-20 py-6 md:py-8">
        <div className="container mx-auto">
          <div className="flex flex-col lg:flex-row gap-8">
            {/* Main Content - Left Side */}
            <div className="lg:w-2/3">
              <Glass variant="blue" className="p-6 md:p-10 rounded-xl md:rounded-2xl">
                {/* Post Content */}
                <div className="prose prose-invert max-w-none">
                  {Array.isArray(post.body) && (
                    <PortableText value={post.body} components={components} />
                  )}
                </div>

                {/* Author Section */}
                {post.author && (
                  <div className="mt-12 pt-8 border-t border-white/10">
                    <div className="flex flex-col md:flex-row gap-6 items-start">
                      {/* Author Image */}
                      <div className="flex-shrink-0">
                        <div className="relative">
                          <Image
                            src={post.author?.image 
                              ? urlFor(post.author.image)?.width(120).height(120).quality(90).url() || "/default-avatar.png" 
                              : "/default-avatar.png"}
                            alt={post.author?.name || "Author"}
                            width={80}
                            height={80}
                            className="rounded-full border-2 border-[#00a8ff]/20"
                          />
                          <div className="absolute -bottom-1 -right-1 w-6 h-6 bg-[#00a8ff] rounded-full border-2 border-white flex items-center justify-center">
                            <span className="text-white text-xs">✓</span>
                          </div>
                        </div>
                      </div>

                      {/* Author Info */}
                      <div className="flex-1">
                        <h3 className="text-xl font-bold text-white mb-1">
                          {post.author.name}
                        </h3>
                        
                        {post.author.bio ? (
                          <div className="text-white/70 text-sm md:text-base leading-relaxed mb-4">
                            <PortableText value={post.author.bio} />
                          </div>
                        ) : (
                          <p className="text-white/50 text-sm mb-4">
                            Writer and contributor
                          </p>
                        )}

                        {/* Social Share */}
                        <div className="flex items-center gap-3">
                          <span className="text-white/50 text-sm">Share this article:</span>
                          <div className="flex gap-2">
                            <a
                              href={`https://twitter.com/intent/tweet?text=${encodeURIComponent(post.title)}&url=${encodeURIComponent(shareUrl)}`}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="w-8 h-8 rounded-lg bg-white/5 border border-white/10 flex items-center justify-center hover:bg-[#00a8ff]/10 hover:border-[#00a8ff]/30 transition-all"
                            >
                              <FaXTwitter className="text-white/70 hover:text-[#00a8ff] transition-colors" />
                            </a>
                            <a
                              href={`https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(shareUrl)}`}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="w-8 h-8 rounded-lg bg-white/5 border border-white/10 flex items-center justify-center hover:bg-[#00a8ff]/10 hover:border-[#00a8ff]/30 transition-all"
                            >
                              <FaFacebook className="text-white/70 hover:text-[#00a8ff] transition-colors" />
                            </a>
                            <a
                              href={`https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(shareUrl)}`}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="w-8 h-8 rounded-lg bg-white/5 border border-white/10 flex items-center justify-center hover:bg-[#00a8ff]/10 hover:border-[#00a8ff]/30 transition-all"
                            >
                              <FaLinkedin className="text-white/70 hover:text-[#00a8ff] transition-colors" />
                            </a>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                )}
              </Glass>
            </div>

            {/* Sidebar - Right Side (Recent Posts) */}
            <div className="lg:w-1/3">
              <Glass variant="blue" className="p-6 rounded-xl md:rounded-2xl sticky top-24">
                <h2 className="font-[Recoleta] text-2xl font-bold text-white mb-6">
                  Recent Posts
                </h2>
                
                <div className="space-y-6">
                  {recentPosts.map((recentPost) => {
                    const recentPostImageUrl = recentPost.mainImage
                      ? urlFor(recentPost.mainImage)?.width(400).height(300).quality(80).url()
                      : null;
                    
                    return (
                      <Link 
                        key={recentPost.slug.current}
                        href={`/blogs/${recentPost.slug.current}`}
                        className="block group"
                      >
                        <div className="flex gap-4">
                          {/* Recent Post Image */}
                          {recentPostImageUrl && (
                            <div className="flex-shrink-0 w-20 h-20 relative rounded-lg overflow-hidden">
                              <Image
                                src={recentPostImageUrl}
                                alt={recentPost.title}
                                fill
                                className="object-cover transition-transform duration-300 group-hover:scale-105"
                              />
                            </div>
                          )}
                          
                          {/* Recent Post Info */}
                          <div className="flex-1">
                            <h3 className="text-white text-lg line-clamp-2 group-hover:text-[#00a8ff] transition-colors mb-1">
                              {recentPost.title}
                            </h3>
                            
                            {/* Category */}
                            {recentPost.categories?.length > 0 && (
                              <span className="text-xs text-[#00a8ff]/80">
                                {recentPost.categories[0].title}
                              </span>
                            )}
                            
                            {/* Date */}
                            <p className="text-white/50 text-xs mt-1">
                              {new Date(recentPost.publishedAt).toLocaleDateString("en-US", {
                                month: "short",
                                day: "numeric",
                                year: "numeric"
                              })}
                            </p>
                          </div>
                        </div>
                      </Link>
                    );
                  })}
                </div>

                {/* View All Link */}
                <div className="mt-6 pt-4 border-t border-white/10">
                  <Link 
                    href="/blogs"
                    className="text-[#00a8ff] hover:text-[#4dc3ff] text-sm font-medium flex items-center gap-2 transition-colors"
                  >
                    View all posts
                    <span className="text-lg">→</span>
                  </Link>
                </div>
              </Glass>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}