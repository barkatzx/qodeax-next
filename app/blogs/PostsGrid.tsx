"use client";

import { Button } from "@/components/ui/Button";
import Glass from "@/components/ui/Glass";
import { AnimatePresence, motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import { BiSolidCategory } from "react-icons/bi";
import { FaArrowRight, FaChevronLeft, FaChevronRight } from "react-icons/fa";
import { HiSearch, HiX } from "react-icons/hi";
import { IoTimer } from "react-icons/io5";
import { Post } from "./page";

interface PostGridProps {
  posts: Post[];
}

const formatDate = (dateString: string) =>
  new Intl.DateTimeFormat("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
  }).format(new Date(dateString));

export default function PostsGrid({ posts }: PostGridProps) {
  const [currentPage, setCurrentPage] = useState(1);
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [searchQuery, setSearchQuery] = useState("");
  const itemsPerPage = 6;

  const allCategories = Array.from(
    new Set(
      posts.flatMap((post) => post.categories?.map((cat) => cat.title) || []),
    ),
  ).sort();

  // Filter: category + title keyword search
  const filteredPosts = posts.filter((post) => {
    const matchesCategory =
      !selectedCategory ||
      post.categories?.some((cat) => cat.title === selectedCategory);
    const matchesSearch =
      !searchQuery.trim() ||
      post.title.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  const totalPages = Math.ceil(filteredPosts.length / itemsPerPage);
  const paginatedPosts = filteredPosts.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage,
  );

  const handleCategoryClick = (category: string | null) => {
    setSelectedCategory(category);
    setCurrentPage(1);
  };

  const handleSearch = (value: string) => {
    setSearchQuery(value);
    setCurrentPage(1);
  };

  const handleNext = () =>
    setCurrentPage((prev) => Math.min(prev + 1, totalPages));
  const handlePrevious = () => setCurrentPage((prev) => Math.max(prev - 1, 1));

  return (
    <section className="container mx-auto py-10">
      {/* Search Bar */}
      <motion.div
        initial={{ opacity: 0, y: 16 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        viewport={{ once: true }}
        className="mb-5 flex justify-center"
      >
        <div className="relative w-full max-w-md">
          <HiSearch className="absolute left-4 top-1/2 -translate-y-1/2 text-white/40 w-4 h-4 pointer-events-none" />
          <input
            type="text"
            placeholder="Search by keyword..."
            value={searchQuery}
            onChange={(e) => handleSearch(e.target.value)}
            className="w-full bg-white/5 border border-white/10 rounded-2xl pl-11 pr-10 py-3 text-sm text-white placeholder-white/30 focus:outline-none focus:border-blue-500/50 focus:bg-white/8 transition-all duration-200"
          />
          {searchQuery && (
            <button
              onClick={() => handleSearch("")}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-white/40 hover:text-white transition-colors"
            >
              <HiX className="w-4 h-4" />
            </button>
          )}
        </div>
      </motion.div>

      {/* Category Filter */}
      {allCategories.length > 0 && (
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.1 }}
          viewport={{ once: true }}
          className="mb-10 font-[Outfit-Regular]"
        >
          <div className="flex flex-wrap items-center justify-center gap-3">
            <Button
              variant="gradient"
              onClick={() => handleCategoryClick(null)}
              className={`px-5 py-2.5 rounded-full text-sm transition-all duration-300 ${
                selectedCategory !== null ? "opacity-50 hover:opacity-100" : ""
              }`}
            >
              Latest Blogs
              <span className="ml-2 text-sm font-[Outfit-Regular]">
                ({posts.length})
              </span>
            </Button>

            {allCategories.map((category) => {
              const count = posts.filter((post) =>
                post.categories?.some((cat) => cat.title === category),
              ).length;

              return (
                <Button
                  key={category}
                  variant="gradient"
                  onClick={() => handleCategoryClick(category)}
                  className={`px-5 py-2.5 rounded-full text-sm font-medium transition-all duration-300 flex items-center gap-2 ${
                    selectedCategory !== category
                      ? "opacity-70 hover:opacity-100"
                      : ""
                  }`}
                >
                  {category}
                  <span className="font-[Outfit-Regular] text-sm">
                    ({count})
                  </span>
                </Button>
              );
            })}
          </div>

          {(selectedCategory || searchQuery) && (
            <motion.p
              initial={{ opacity: 0, y: -8 }}
              animate={{ opacity: 1, y: 0 }}
              className="text-center mt-4 text-sm text-white/50"
            >
              {filteredPosts.length === 0 ? (
                "No matching articles"
              ) : (
                <>
                  Showing{" "}
                  <span className="text-blue-400 font-medium">
                    {filteredPosts.length}{" "}
                    {filteredPosts.length === 1 ? "article" : "articles"}
                  </span>
                  {selectedCategory && (
                    <>
                      {" "}
                      in{" "}
                      <span className="text-blue-400 font-medium">
                        {selectedCategory}
                      </span>
                    </>
                  )}
                  {searchQuery && (
                    <>
                      {" "}
                      matching "
                      <span className="text-blue-400 font-medium">
                        {searchQuery}
                      </span>
                      "
                    </>
                  )}
                </>
              )}
            </motion.p>
          )}
        </motion.div>
      )}

      {/* Empty State */}
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
            No posts found
          </h3>
          <p className="text-white/60 mb-4">
            Try a different search or category
          </p>
          <Button
            variant="gradient"
            onClick={() => {
              handleSearch("");
              handleCategoryClick(null);
            }}
            className="px-6 py-2 rounded-full text-sm font-medium"
          >
            Clear filters
          </Button>
        </motion.div>
      ) : (
        <>
          {/* Posts Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
            <AnimatePresence mode="popLayout">
              {paginatedPosts.map((post, index) => (
                <motion.article
                  key={post._id}
                  layout
                  initial={{ opacity: 0, y: 24 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -12 }}
                  transition={{ duration: 0.4, delay: index * 0.08 }}
                  className="group relative"
                >
                  <Glass
                    variant="blue"
                    className="relative h-full rounded-2xl overflow-hidden transition-all duration-500 hover:scale-[1.02] hover:shadow-2xl hover:shadow-blue-500/10"
                  >
                    {/* Image */}
                    <div className="relative h-64 overflow-hidden">
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
                      <div className="absolute inset-0 bg-gradient-to-t from-gray-900 via-transparent to-transparent opacity-60" />
                    </div>

                    {/* Content */}
                    <div className="p-5">
                      <Link href={`/blogs/${post.slug.current}`}>
                        <h3 className="text-xl font-[Recoleta] text-white/70 mb-3 hover:text-blue-400 transition-colors duration-300 line-clamp-2">
                          {post.title}
                        </h3>
                      </Link>

                      <div className="flex items-center gap-3 text-sm text-white/50 mb-5 flex-wrap font-[Outfit-Regular]">
                        {post.categories && post.categories.length > 0 && (
                          <span className="flex items-center gap-1">
                            <BiSolidCategory className="w-3 h-3" />
                            {post.categories[0].title}
                            {post.categories.length > 1 &&
                              ` +${post.categories.length - 1}`}
                          </span>
                        )}
                        <span className="flex items-center gap-1">
                          <IoTimer className="w-3 h-3" />
                          {post.estimatedReadingTime || 5} min read
                        </span>
                      </div>

                      {post.excerpt && (
                        <p className="text-white/50 text-sm leading-relaxed mb-4 line-clamp-5">
                          {post.excerpt}
                        </p>
                      )}

                      <div className="flex items-center justify-between pt-3 border-t border-white/10 font-[Outfit-Regular]">
                        <span className="text-xs text-white/30">
                          Published: {formatDate(post.publishedAt)}
                        </span>
                        <Link
                          href={`/blogs/${post.slug.current}`}
                          className="inline-flex items-center gap-1.5 text-xs font-medium text-white/70 hover:text-blue-400 transition-colors duration-300 group/link "
                        >
                          Read more
                          <FaArrowRight className="w-2.5 h-2.5 transform group-hover/link:translate-x-1 transition-transform duration-300" />
                        </Link>
                      </div>
                    </div>
                  </Glass>
                </motion.article>
              ))}
            </AnimatePresence>
          </div>

          {/* Pagination */}
          {totalPages > 1 && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
              className="mt-16 flex flex-col items-center gap-6"
            >
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
                  {Array.from({ length: Math.min(5, totalPages) }, (_, i) => {
                    let pageNum: number;
                    if (totalPages <= 5) pageNum = i + 1;
                    else if (currentPage <= 3) pageNum = i + 1;
                    else if (currentPage >= totalPages - 2)
                      pageNum = totalPages - 4 + i;
                    else pageNum = currentPage - 2 + i;

                    return (
                      <Button
                        key={pageNum}
                        variant="gradient"
                        onClick={() => setCurrentPage(pageNum)}
                        className={`w-10 h-10 rounded-xl font-medium transition-all duration-300 ${
                          currentPage !== pageNum
                            ? "opacity-50 hover:opacity-100"
                            : ""
                        }`}
                      >
                        {pageNum}
                      </Button>
                    );
                  })}
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

              <div className="flex items-center gap-4 text-sm">
                <span className="text-white/40">
                  Page {currentPage} of {totalPages}
                </span>
                <span className="w-1 h-1 rounded-full bg-white/20" />
                <span className="text-white/40">
                  {filteredPosts.length} total articles
                </span>
              </div>
            </motion.div>
          )}
        </>
      )}
    </section>
  );
}
