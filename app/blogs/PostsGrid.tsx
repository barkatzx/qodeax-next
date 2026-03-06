"use client";

import { Button } from "@/components/ui/Button";
import Glass from "@/components/ui/Glass";
import { motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";
import { BiSolidCategory } from "react-icons/bi";
import { FaArrowRight, FaChevronLeft, FaChevronRight } from "react-icons/fa";
import { IoTimer } from "react-icons/io5";
import { Post } from "./page";

interface PostGridProps {
  posts: Post[];
}

export default function PostsGrid({ posts }: PostGridProps) {
  const [currentPage, setCurrentPage] = useState(1);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [hoveredPost, setHoveredPost] = useState<string | null>(null);
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const itemsPerPage = 6;

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setMousePosition({ x: e.clientX, y: e.clientY });
    };
    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, []);

  // Extract unique categories from all posts
  const allCategories = Array.from(
    new Set(
      posts.flatMap((post) => post.categories?.map((cat) => cat.title) || []),
    ),
  ).sort();

  // Filter posts by selected category
  const filteredPosts = selectedCategory
    ? posts.filter((post) =>
        post.categories?.some((cat) => cat.title === selectedCategory),
      )
    : posts;

  const totalPages = Math.ceil(filteredPosts.length / itemsPerPage);
  const paginatedPosts = filteredPosts.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage,
  );

  const handleNext = () =>
    setCurrentPage((prev) => Math.min(prev + 1, totalPages));
  const handlePrevious = () => setCurrentPage((prev) => Math.max(prev - 1, 1));
  const handlePageClick = (page: number) => setCurrentPage(page);

  const handleCategoryClick = (category: string | null) => {
    setSelectedCategory(category);
    setCurrentPage(1);
  };

  // Format date helper
  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return new Intl.DateTimeFormat("en-US", {
      month: "short",
      day: "numeric",
      year: "numeric",
    }).format(date);
  };

  return (
    <section className="container mx-auto py-10">
      {/* Animated Background */}
      <div
        className=""
        style={{
          left: `${mousePosition.x * 0.02}px`,
          top: `${mousePosition.y * 0.02}px`,
          transition: "transform 0.5s ease-out",
        }}
      />

      <div className="">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <motion.div
            initial={{ scale: 0.9 }}
            animate={{ scale: 1 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/5 border border-white/10 mb-5"
          >
            <span className="w-2 h-2 rounded-full bg-blue-400 animate-pulse" />
            <span className="text-sm font-medium text-white/80">
              Latest Articles
            </span>
          </motion.div>

          <h2 className="text-4xl md:text-5xl lg:text-6xl font-[Recoleta] text-white mb-5">
            Insights, Code & Creative Thinking
          </h2>

          <p className="text-xl text-white/60 max-w-5xl mx-auto">
            Thoughtful explorations where technology, design, and creative
            thinking come together. Discover practical insights, real
            experiences, and fresh perspectives from the world of modern
            development and digital innovation.
          </p>
        </motion.div>

        {/* Category Navigation */}
        {allCategories.length > 0 && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            viewport={{ once: true }}
            className="mb-10"
          >
            <div className="flex flex-wrap items-center justify-center gap-3">
              {/* All Categories Button */}
              <Button
                variant="gradient"
                onClick={() => handleCategoryClick(null)}
                className={`px-5 py-2.5 rounded-full text-sm font-medium transition-all duration-300 ${
                  selectedCategory !== null
                    ? "opacity-50 hover:opacity-100"
                    : ""
                }`}
              >
                All Posts
                <span className="ml-2 text-xs opacity-70">
                  ({posts.length})
                </span>
              </Button>

              {/* Individual Category Buttons */}
              {allCategories.map((category, index) => {
                const categoryPostCount = posts.filter((post) =>
                  post.categories?.some((cat) => cat.title === category),
                ).length;

                return (
                  <motion.div
                    key={category}
                    initial={{ opacity: 0, y: 10 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.3, delay: index * 0.05 }}
                    viewport={{ once: true }}
                  >
                    <Button
                      variant="gradient"
                      onClick={() => handleCategoryClick(category)}
                      className={`px-5 py-2.5 rounded-full text-sm font-medium transition-all duration-300 flex items-center gap-2 ${
                        selectedCategory !== category
                          ? "opacity-50 hover:opacity-100"
                          : ""
                      }`}
                    >
                      <BiSolidCategory className="w-3 h-3" />
                      {category}
                      <span className="text-xs opacity-70">
                        ({categoryPostCount})
                      </span>
                    </Button>
                  </motion.div>
                );
              })}
            </div>

            {/* Active Filter Indicator */}
            {selectedCategory && (
              <motion.div
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                className="text-center mt-4"
              >
                <p className="text-sm text-white/50">
                  Showing posts in{" "}
                  <span className="text-blue-400 font-medium">
                    {selectedCategory}
                  </span>{" "}
                  ({filteredPosts.length}{" "}
                  {filteredPosts.length === 1 ? "article" : "articles"})
                </p>
              </motion.div>
            )}
          </motion.div>
        )}

        {filteredPosts.length === 0 ? (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center py-20"
          >
            <div className="relative w-32 h-32 mx-auto mb-6">
              <div className="absolute inset-0 rounded-full bg-gradient-to-r from-blue-500/20 to-purple-500/20 animate-pulse" />
              <div className="absolute inset-2 rounded-full bg-gray-800 flex items-center justify-center">
                <span className="text-4xl">📝</span>
              </div>
            </div>
            <h3 className="text-2xl font-semibold text-white mb-2">
              No posts in this category
            </h3>
            <p className="text-white/60 mb-4">
              Try selecting a different category
            </p>
            <Button
              variant="gradient"
              onClick={() => handleCategoryClick(null)}
              className="px-6 py-2 rounded-full text-sm font-medium"
            >
              View all posts
            </Button>
          </motion.div>
        ) : (
          <>
            {/* Modern Grid Layout - 3 columns on desktop */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
              {paginatedPosts.map((post, index) => (
                <motion.article
                  key={post._id}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  viewport={{ once: true }}
                  onHoverStart={() => setHoveredPost(post._id)}
                  onHoverEnd={() => setHoveredPost(null)}
                  className="group relative"
                >
                  {/* Card Container */}
                  <Glass
                    variant="blue"
                    className="relative h-full rounded-2xl overflow-hidden transition-all duration-500 hover:scale-[1.02] hover:shadow-2xl hover:shadow-blue-500/10"
                  >
                    {/* Image Container */}
                    <div className="relative h-48 overflow-hidden">
                      {post.mainImage?.asset?.url ? (
                        <Image
                          src={post.mainImage.asset.url}
                          alt={post.title}
                          fill
                          className="object-cover transition-transform duration-700 group-hover:scale-110"
                          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                        />
                      ) : (
                        <div className="w-full h-full bg-gradient-to-br from-gray-800 to-gray-900" />
                      )}

                      {/* Image Overlay */}
                      <div className="absolute inset-0 bg-gradient-to-t from-gray-900 via-transparent to-transparent opacity-60" />
                    </div>

                    {/* Content */}
                    <div className="p-5">
                      {/* Title */}
                      <Link href={`/blogs/${post.slug.current}`}>
                        <h3 className="text-xl font-[Recoleta] text-white mb-2 hover:text-blue-400 transition-colors duration-300 line-clamp-2">
                          {post.title}
                        </h3>
                      </Link>

                      {/* Author, Category, Reading Time */}
                      <div className="flex items-center gap-3 text-xs text-white/50 mb-5 flex-wrap">
                        {post.categories && post.categories.length > 0 && (
                          <span className="flex items-center gap-1">
                            <BiSolidCategory className="w-3 h-3 text-blue-400" />
                            {post.categories[0].title}
                            {post.categories.length > 1 &&
                              ` +${post.categories.length - 1}`}
                          </span>
                        )}

                        <span className="flex items-center gap-1">
                          <IoTimer className="w-3 h-3 text-blue-400" />
                          {post.estimatedReadingTime || 5} min read
                        </span>
                      </div>

                      {/* Excerpt */}
                      {post.excerpt && (
                        <p className="text-white/50 text-sm leading-relaxed mb-4 line-clamp-5">
                          {post.excerpt}
                        </p>
                      )}

                      {/* Date and Read More */}
                      <div className="flex items-center justify-between pt-3 border-t border-white/10">
                        <span className="text-xs text-white/30">
                          {formatDate(post.publishedAt)}
                        </span>

                        <Link
                          href={`/blogs/${post.slug.current}`}
                          className="inline-flex items-center gap-1.5 text-xs font-medium text-white/70 hover:text-blue-400 transition-colors duration-300 group/link"
                        >
                          <span>Read more</span>
                          <FaArrowRight className="w-2.5 h-2.5 transform group-hover/link:translate-x-1 transition-transform duration-300" />
                        </Link>
                      </div>
                    </div>

                    {/* Hover Effect Gradient */}
                    <div
                      className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"
                      style={{
                        background: `radial-gradient(600px circle at ${mousePosition.x}px ${mousePosition.y}px, rgba(59, 130, 246, 0.1), transparent 40%)`,
                      }}
                    />
                  </Glass>
                </motion.article>
              ))}
            </div>

            {/* Modern Pagination */}
            {totalPages > 1 && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3 }}
                className="mt-16"
              >
                <div className="flex flex-col items-center gap-6">
                  {/* Pagination Controls */}
                  <div className="flex items-center gap-3">
                    <Button
                      variant="gradient"
                      onClick={handlePrevious}
                      disabled={currentPage === 1}
                      className="p-3 rounded-xl"
                    >
                      <FaChevronLeft className="w-4 h-4" />
                    </Button>

                    <div className="flex items-center gap-2">
                      {Array.from(
                        { length: Math.min(5, totalPages) },
                        (_, i) => {
                          let pageNum;
                          if (totalPages <= 5) {
                            pageNum = i + 1;
                          } else if (currentPage <= 3) {
                            pageNum = i + 1;
                          } else if (currentPage >= totalPages - 2) {
                            pageNum = totalPages - 4 + i;
                          } else {
                            pageNum = currentPage - 2 + i;
                          }

                          return (
                            <Button
                              key={pageNum}
                              variant="gradient"
                              onClick={() => handlePageClick(pageNum)}
                              className={`w-10 h-10 rounded-xl font-medium transition-all duration-300 ${
                                currentPage !== pageNum
                                  ? "opacity-50 hover:opacity-100"
                                  : ""
                              }`}
                            >
                              {pageNum}
                            </Button>
                          );
                        },
                      )}
                    </div>

                    <Button
                      variant="gradient"
                      onClick={handleNext}
                      disabled={currentPage === totalPages}
                      className="p-3 rounded-xl"
                    >
                      <FaChevronRight className="w-4 h-4" />
                    </Button>
                  </div>

                  {/* Page Info */}
                  <div className="flex items-center gap-4 text-sm">
                    <span className="text-white/40">
                      Page {currentPage} of {totalPages}
                    </span>
                    <span className="w-1 h-1 rounded-full bg-white/20" />
                    <span className="text-white/40">
                      {filteredPosts.length} total articles
                    </span>
                  </div>
                </div>
              </motion.div>
            )}
          </>
        )}
      </div>
    </section>
  );
}
