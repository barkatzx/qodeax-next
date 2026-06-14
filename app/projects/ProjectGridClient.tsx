"use client";

import { theme } from "@/components/lib/theme";
import Glass from "@/components/ui/Glass";
import { motion } from "framer-motion";
import { useState } from "react";

// Matches exactly what Sanity returns for blockContent
interface SanityBlock {
  _type: string;
  children?: Array<{ _type: string; text?: string }>;
}

interface Project {
  _id: string;
  title: string;
  mainImage?: {
    asset?: {
      url: string;
    };
  };
  categories?: string[];
  technologies?: string[];
  features?: string[];
  slug: {
    current: string;
  };
  liveLink?: string;
  clientRepo?: string;
  serverRepo?: string;
  body?: SanityBlock[];
}

interface ProjectGridClientProps {
  projects?: Project[];
}

const FaArrowRight = ({ className = "" }) => (
  <svg
    className={className}
    fill="currentColor"
    viewBox="0 0 16 16"
    width="16"
    height="16"
  >
    <path
      fillRule="evenodd"
      d="M1 8a.5.5 0 0 1 .5-.5h11.793l-3.147-3.146a.5.5 0 0 1 .708-.708l4 4a.5.5 0 0 1 0 .708l-4 4a.5.5 0 0 1-.708-.708L13.293 8.5H1.5A.5.5 0 0 1 1 8z"
    />
  </svg>
);

const FaChevronLeft = ({ className = "" }) => (
  <svg
    className={className}
    fill="currentColor"
    viewBox="0 0 16 16"
    width="16"
    height="16"
  >
    <path
      fillRule="evenodd"
      d="M11.354 1.646a.5.5 0 0 1 0 .708L5.707 8l5.647 5.646a.5.5 0 0 1-.708.708l-6-6a.5.5 0 0 1 0-.708l6-6a.5.5 0 0 1 .708 0z"
    />
  </svg>
);

const FaChevronRight = ({ className = "" }) => (
  <svg
    className={className}
    fill="currentColor"
    viewBox="0 0 16 16"
    width="16"
    height="16"
  >
    <path
      fillRule="evenodd"
      d="M4.646 1.646a.5.5 0 0 1 .708 0l6 6a.5.5 0 0 1 0 .708l-6 6a.5.5 0 0 1-.708-.708L10.293 8 4.646 2.354a.5.5 0 0 1 0-.708z"
    />
  </svg>
);

const FaLayerGroup = ({ className = "" }) => (
  <svg
    className={className}
    fill="currentColor"
    viewBox="0 0 16 16"
    width="16"
    height="16"
  >
    <path d="M1.5 1.5A.5.5 0 0 1 2 1h12a.5.5 0 0 1 .5.5v2a.5.5 0 0 1-.5.5H2a.5.5 0 0 1-.5-.5v-2zm1 .5v1h11v-1h-11zm-1 3A.5.5 0 0 1 2 5h12a.5.5 0 0 1 .5.5v2a.5.5 0 0 1-.5.5H2a.5.5 0 0 1-.5-.5v-2zm1 .5v1h11v-1h-11zm-1 3A.5.5 0 0 1 2 9h12a.5.5 0 0 1 .5.5v2a.5.5 0 0 1-.5.5H2a.5.5 0 0 1-.5-.5v-2zm1 .5v1h11v-1h-11z" />
  </svg>
);

// Safely extract plain text from Sanity portable text (blockContent)
const blockContentToPlainText = (blocks?: SanityBlock[]): string => {
  if (!blocks || !Array.isArray(blocks)) return "";
  return blocks
    .filter((block) => block._type === "block" && Array.isArray(block.children))
    .map((block) => block.children!.map((child) => child.text ?? "").join(""))
    .join(" ")
    .trim();
};

// ✅ FIXED: Since GROQ already resolves asset-> { url }, just append
// Sanity CDN transform params directly onto the resolved URL string.
const getSanityImageUrl = (
  imageUrl: string,
  width: number,
  height: number,
): string => {
  try {
    const url = new URL(imageUrl);
    url.searchParams.set("w", width.toString());
    url.searchParams.set("h", height.toString());
    url.searchParams.set("fit", "crop");
    return url.toString();
  } catch {
    return imageUrl;
  }
};

export default function ProjectGridClient({
  projects = [],
}: ProjectGridClientProps) {
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 9;

  const totalPages = Math.ceil(projects.length / itemsPerPage);
  const paginatedProjects = projects.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage,
  );

  const handleNext = () =>
    setCurrentPage((prev) => Math.min(prev + 1, totalPages));
  const handlePrevious = () => setCurrentPage((prev) => Math.max(prev - 1, 1));

  const buttonStyle = {
    background: `linear-gradient(135deg, ${theme.primary} 0%, ${theme.primaryLight} 100%)`,
    border: "1px solid rgba(255, 255, 255, 0.2)",
    boxShadow: `0 8px 32px ${theme.primary}20, 0 2px 8px rgba(255, 255, 255, 0.1) inset`,
  };

  const truncateDescription = (text: string = "", wordLimit = 30) => {
    const words = text.split(" ").filter(Boolean);
    if (words.length <= wordLimit) return text;
    return words.slice(0, wordLimit).join(" ") + "...";
  };

  return (
    <section className="container mx-auto px-4 md:px-8 py-12 md:py-20 relative overflow-hidden min-h-screen">
      <div className="max-w-7xl mx-auto relative">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, type: "spring" }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <div className="inline-flex items-center gap-3 px-4 py-2 rounded-full border border-white/10 bg-white/5 mb-5">
            <span className="w-2 h-2 rounded-full bg-blue-500 animate-pulse" />
            <span className="text-sm text-white/80">Digital Portfolio</span>
          </div>
          <h2 className="font-[Recoleta] text-4xl md:text-5xl mb-5 bg-gradient-to-r from-white to-gray-500 bg-clip-text text-transparent">
            Interactive Showcase
          </h2>

          <p className="text-white/70 text-xl max-w-5xl mx-auto">
            Explore my complete portfolio featuring Full Stack applications,
            WordPress websites, and Flutter mobile applications
          </p>
        </motion.div>

        {projects.length === 0 ? (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="text-center py-20"
          >
            <div className="relative w-48 h-48 mx-auto mb-8">
              <div className="absolute inset-0 rounded-full animate-pulse" />
              <div className="absolute inset-8 rounded-full flex items-center justify-center">
                <span className="text-6xl">🚀</span>
              </div>
            </div>
            <p className="text-white/70 text-xl">No projects found...</p>
          </motion.div>
        ) : (
          <>
            {/* Project Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
              {paginatedProjects.map((project, index) => {
                const descriptionText = blockContentToPlainText(project.body);

                // ✅ FIXED: Safe optional chaining — asset may be undefined
                const imageUrl = project.mainImage?.asset?.url
                  ? getSanityImageUrl(project.mainImage.asset.url, 600, 400)
                  : null;

                return (
                  <motion.div
                    key={project._id}
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, delay: index * 0.1 }}
                    viewport={{ once: true }}
                    className="relative"
                  >
                    <Glass variant="blue">
                      <div className="relative rounded-2xl overflow-hidden hover:shadow-2xl transition-all duration-500 group h-full flex flex-col">
                        {/* Image */}
                        <div className="relative overflow-hidden h-48 md:h-56 bg-white/5">
                          {/* ✅ FIXED: Use resolved imageUrl directly, with fallback */}
                          {imageUrl ? (
                            <img
                              src={imageUrl}
                              alt={project.title}
                              className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                            />
                          ) : (
                            <div className="w-full h-full flex items-center justify-center text-white/20 text-4xl">
                              🖼️
                            </div>
                          )}
                        </div>

                        {/* Content */}
                        <div className="p-5 md:p-6 flex-1 flex flex-col">
                          {/* Badges */}
                          {/* Badges - show ALL categories */}
                          <div className="flex gap-2 mb-3 flex-wrap">
                            {project.categories &&
                            project.categories.length > 0 ? (
                              project.categories.map((cat, i) => (
                                <Glass
                                  key={i}
                                  variant="blue"
                                  className="px-3 py-1 text-white rounded-full text-xs"
                                >
                                  {cat}
                                </Glass>
                              ))
                            ) : (
                              <Glass
                                variant="blue"
                                className="px-3 py-1 text-white rounded-full text-xs"
                              >
                                Uncategorized
                              </Glass>
                            )}
                          </div>

                          {/* Title */}
                          <h3 className="font-[Recoleta] text-2xl text-white mb-3">
                            {project.title}
                          </h3>

                          {/* Description */}
                          <div className="mb-4 flex-1">
                            <p className="text-white/80 text-sm leading-relaxed line-clamp-4">
                              {truncateDescription(
                                descriptionText || "No description available",
                              )}
                            </p>
                          </div>

                          {/* Tech Tags */}
                          <div className="mb-6">
                            <div className="flex flex-wrap gap-1.5">
                              {project.technologies
                                ?.slice(0, 4)
                                .map((tech, i) => (
                                  <span
                                    key={i}
                                    className="px-2 py-1 text-xs text-white/80 font-medium rounded border border-white/10 hover:border-white/20 hover:text-white cursor-default transition-colors"
                                    style={{
                                      background:
                                        "linear-gradient(135deg, rgba(255,255,255,0.05) 0%, rgba(255,255,255,0.02) 100%)",
                                    }}
                                  >
                                    {tech}
                                  </span>
                                ))}
                              {(project.technologies?.length ?? 0) > 4 && (
                                <span className="px-2 py-1 text-xs text-white/70 font-medium rounded border border-white/10">
                                  +{project.technologies!.length - 4} more
                                </span>
                              )}
                            </div>
                          </div>

                          {/* CTA Button */}
                          <motion.div
                            whileHover={{ scale: 1.02 }}
                            whileTap={{ scale: 0.98 }}
                            className="mt-auto"
                          >
                            <a href={`/projects/${project.slug.current}`}>
                              <button
                                className="w-full py-3 text-white font-semibold rounded-xl overflow-hidden group/btn relative"
                                style={buttonStyle}
                              >
                                <span className="relative z-10 flex items-center justify-center gap-2">
                                  View Project Details
                                  <FaArrowRight className="transform group-hover/btn:translate-x-1 transition-transform" />
                                </span>
                                <div className="absolute inset-0 bg-gradient-to-r from-[#0097e6] to-[#00a8ff] opacity-0 group-hover/btn:opacity-100 transition-opacity duration-300" />
                                <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent translate-x-[-100%] group-hover/btn:translate-x-[100%] transition-transform duration-1000" />
                              </button>
                            </a>
                          </motion.div>
                        </div>
                      </div>
                    </Glass>
                  </motion.div>
                );
              })}
            </div>

            {/* Pagination */}
            {totalPages > 1 && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="mt-12 md:mt-20"
              >
                <div className="flex flex-col md:flex-row items-center justify-center gap-4">
                  {/* Previous */}
                  <button
                    onClick={handlePrevious}
                    disabled={currentPage === 1}
                    className={`flex items-center justify-center px-6 py-3 md:px-8 md:py-4 rounded-xl md:rounded-2xl font-semibold transition-all duration-300 ${
                      currentPage === 1
                        ? "opacity-50 cursor-not-allowed"
                        : "hover:shadow-lg transform hover:-translate-x-1"
                    }`}
                    style={
                      currentPage === 1
                        ? {
                            background:
                              "linear-gradient(135deg, rgba(255,255,255,0.05) 0%, rgba(255,255,255,0.02) 100%)",
                            border: "1px solid rgba(255,255,255,0.1)",
                            color: "rgba(255,255,255,0.3)",
                          }
                        : {
                            background:
                              "linear-gradient(135deg, rgba(255,255,255,0.1) 0%, rgba(255,255,255,0.05) 100%)",
                            border: "1px solid rgba(255,255,255,0.1)",
                            color: "rgba(255,255,255,0.9)",
                          }
                    }
                  >
                    <FaChevronLeft className="w-4 h-4 mr-2" />
                    <span className="text-sm">Previous</span>
                  </button>

                  {/* Page Numbers */}
                  <div className="flex items-center justify-center rounded-xl p-2">
                    {totalPages <= 5 ? (
                      [...Array(totalPages)].map((_, i) => (
                        <button
                          key={i + 1}
                          onClick={() => setCurrentPage(i + 1)}
                          className={`w-10 h-10 rounded-xl font-bold transition-all duration-300 text-sm mx-1 ${
                            currentPage === i + 1
                              ? "text-white shadow-lg scale-110"
                              : "text-white/70 hover:text-white hover:scale-105"
                          }`}
                          style={
                            currentPage === i + 1
                              ? buttonStyle
                              : {
                                  background:
                                    "linear-gradient(135deg, rgba(255,255,255,0.05) 0%, rgba(255,255,255,0.02) 100%)",
                                }
                          }
                        >
                          {i + 1}
                        </button>
                      ))
                    ) : (
                      <>
                        {currentPage > 2 && (
                          <span className="text-white/50 px-2">...</span>
                        )}
                        {[
                          Math.max(1, currentPage - 1),
                          currentPage,
                          Math.min(totalPages, currentPage + 1),
                        ]
                          .filter((page, i, arr) => arr.indexOf(page) === i)
                          .map((page) => (
                            <button
                              key={page}
                              onClick={() => setCurrentPage(page)}
                              className={`w-10 h-10 rounded-xl font-bold transition-all duration-300 text-sm mx-1 ${
                                currentPage === page
                                  ? "text-white shadow-lg scale-110"
                                  : "text-white/70 hover:text-white hover:scale-105"
                              }`}
                              style={
                                currentPage === page
                                  ? buttonStyle
                                  : {
                                      background:
                                        "linear-gradient(135deg, rgba(255,255,255,0.05) 0%, rgba(255,255,255,0.02) 100%)",
                                    }
                              }
                            >
                              {page}
                            </button>
                          ))}
                        {currentPage < totalPages - 1 && (
                          <span className="text-white/50 px-2">...</span>
                        )}
                      </>
                    )}
                  </div>

                  {/* Next */}
                  <button
                    onClick={handleNext}
                    disabled={currentPage === totalPages}
                    className={`flex items-center justify-center px-6 py-3 md:px-8 md:py-4 rounded-xl md:rounded-2xl font-semibold transition-all duration-300 ${
                      currentPage === totalPages
                        ? "opacity-50 cursor-not-allowed"
                        : "hover:shadow-lg transform hover:translate-x-1"
                    }`}
                    style={
                      currentPage === totalPages
                        ? {
                            background:
                              "linear-gradient(135deg, rgba(255,255,255,0.05) 0%, rgba(255,255,255,0.02) 100%)",
                            border: "1px solid rgba(255,255,255,0.1)",
                            color: "rgba(255,255,255,0.3)",
                          }
                        : {
                            background:
                              "linear-gradient(135deg, rgba(255,255,255,0.1) 0%, rgba(255,255,255,0.05) 100%)",
                            border: "1px solid rgba(255,255,255,0.1)",
                            color: "rgba(255,255,255,0.9)",
                          }
                    }
                  >
                    <span className="text-sm">Next</span>
                    <FaChevronRight className="w-4 h-4 ml-2" />
                  </button>
                </div>

                {/* Results Count */}
                <div className="text-center mt-6">
                  <span className="text-white/70 text-sm">
                    Showing{" "}
                    {Math.min(
                      (currentPage - 1) * itemsPerPage + 1,
                      projects.length,
                    )}
                    –{Math.min(currentPage * itemsPerPage, projects.length)} of{" "}
                    {projects.length} projects
                  </span>
                </div>
              </motion.div>
            )}
          </>
        )}
      </div>
    </section>
  );
}
