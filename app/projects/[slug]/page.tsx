import ImageGallery from "@/components/Gallery";
import Glass from "@/components/ui/Glass";
import { client } from "@/sanity/client";
import { components } from "@/sanity/portabletext";
import { projectDetailQuery } from "@/sanity/projectsQuery";
import { PortableText, SanityDocument } from "next-sanity";
import Link from "next/link";
import { notFound } from "next/navigation";
import {
  FaArrowLeft,
  FaBookOpen,
  FaCode,
  FaExternalLinkAlt,
  FaGithub,
  FaGlobe,
  FaRocket,
  FaServer,
} from "react-icons/fa";

export const revalidate = 60;

export async function generateStaticParams() {
  const projects = await client.fetch<{ slug: { current: string } }[]>(
    `*[_type == "project"]{ slug { current } }`,
  );
  return projects.map((project) => ({ slug: project.slug.current }));
}

type tParams = Promise<{ slug: string }>;

export default async function ProjectPage(props: { params: tParams }) {
  const { slug } = await props.params;
  const decodedSlug = decodeURIComponent(slug);
  const project = await client.fetch<SanityDocument>(projectDetailQuery, {
    slug: decodedSlug,
  });

  if (!project) return notFound();

  const middleIndex = Math.ceil((project.features?.length ?? 0) / 2);
  const firstHalf = project.features?.slice(0, middleIndex) ?? [];
  const secondHalf = project.features?.slice(middleIndex) ?? [];

  const primaryColor = "#00a8ff";
  const primaryColorLight = "#4dc3ff";

  const buttonStyle = {
    background: `linear-gradient(135deg, ${primaryColor} 0%, ${primaryColorLight} 100%)`,
    border: "1px solid rgba(255, 255, 255, 0.2)",
    boxShadow: `0 8px 32px ${primaryColor}20, 0 2px 8px rgba(255, 255, 255, 0.1) inset`,
  };

  const categories: string[] = project.categories ?? [];

  // ✅ THE FIX: resolve mainImage from GROQ-dereferenced asset url
  const mainImageUrl: string | null = project.mainImage?.asset?.url ?? null;

  return (
    <main className="container mx-auto py-10">
      {/* Hero Section */}
      <div className="">
        <div className="">
          {categories.length > 0 && (
            <div className="mb-6 flex flex-wrap justify-center gap-2">
              {categories.map((cat, i) => (
                <Glass
                  variant="white"
                  key={i}
                  className="font-[Agave] inline-flex items-center justify-center text-center px-4 py-1 text-white font-medium rounded-lg"
                >
                  {cat}
                </Glass>
              ))}
            </div>
          )}

          <h1 className="font-[Recoleta] font-bold text-2xl md:text-5xl lg:text-6xl mb-4 md:mb-6 text-white/90 text-center">
            {project.title}
          </h1>
        </div>
      </div>

      {/* ✅ ADDED: mainImage hero — previously the page only checked project.photos
          which doesn't exist in the schema, so no image ever rendered */}
      {mainImageUrl && (
        <div className="">
          <div className="">
            <div
              className="relative w-full rounded-2xl overflow-hidden"
              style={{ aspectRatio: "16/9" }}
            >
              <img
                src={mainImageUrl}
                alt={project.title}
                className="w-full h-full object-cover"
              />
            </div>
          </div>
        </div>
      )}

      {/* Extra photo gallery — kept in case you add a photos field later */}
      {project.photos?.length > 0 && (
        <div className="px-5 md:px-20 mb-12">
          <div className="max-w-6xl mx-auto">
            <ImageGallery photos={project.photos} />
          </div>
        </div>
      )}

      {/* Content Section */}
      <div className="py-8">
        <div className="mx-auto">
          <div className="grid lg:grid-cols-12 gap-8">
            <div className="lg:col-span-8">
              {project.body?.length > 0 && (
                <Glass
                  variant="white"
                  className="rounded-2xl p-6 md:p-8 lg:p-10 mb-8"
                >
                  <div className="flex items-center gap-3 mb-6">
                    <div
                      className="w-12 h-12 rounded-xl flex items-center justify-center"
                      style={{
                        background: `linear-gradient(135deg, ${primaryColor} 0%, ${primaryColorLight} 100%)`,
                      }}
                    >
                      <FaBookOpen className="text-white text-xl" />
                    </div>
                    <h2 className="font-[Recoleta] text-xl md:text-2xl font-bold text-white">
                      Project Overview
                    </h2>
                  </div>
                  <div className="text-white/70 text-lg leading-relaxed prose prose-invert max-w-none">
                    <PortableText
                      value={project.body}
                      components={components}
                    />
                  </div>
                </Glass>
              )}

              {project.features?.length > 0 && (
                <Glass
                  variant="white"
                  className="rounded-2xl p-6 md:p-8 lg:p-10 mb-8"
                >
                  <div className="flex items-center gap-3 mb-6">
                    <div
                      className="w-12 h-12 rounded-xl flex items-center justify-center"
                      style={{
                        background: `linear-gradient(135deg, ${primaryColor} 0%, ${primaryColorLight} 100%)`,
                      }}
                    >
                      <FaGlobe className="text-white text-xl" />
                    </div>
                    <h2 className="font-[Recoleta] text-xl md:text-2xl font-bold text-white">
                      Key Features
                    </h2>
                  </div>
                  <div className="grid md:grid-cols-2 gap-6">
                    <ul className="space-y-4">
                      {firstHalf.map((feature: string, index: number) => (
                        <li key={index} className="flex items-start gap-3">
                          <div
                            className="w-6 h-6 rounded-full flex items-center justify-center flex-shrink-0 mt-1"
                            style={{
                              background:
                                "linear-gradient(135deg, rgba(0, 168, 255, 0.1) 0%, rgba(0, 168, 255, 0.05) 100%)",
                            }}
                          >
                            <div
                              className="w-2 h-2 rounded-full"
                              style={{
                                background: `linear-gradient(135deg, ${primaryColor} 0%, ${primaryColorLight} 100%)`,
                              }}
                            ></div>
                          </div>
                          <span className="text-white/70 text-lg">
                            {feature}
                          </span>
                        </li>
                      ))}
                    </ul>
                    <ul className="space-y-4">
                      {secondHalf.map((feature: string, index: number) => (
                        <li key={index} className="flex items-start gap-3">
                          <div
                            className="w-6 h-6 rounded-full flex items-center justify-center flex-shrink-0 mt-1"
                            style={{
                              background:
                                "linear-gradient(135deg, rgba(0, 168, 255, 0.1) 0%, rgba(0, 168, 255, 0.05) 100%)",
                            }}
                          >
                            <div
                              className="w-2 h-2 rounded-full"
                              style={{
                                background: `linear-gradient(135deg, ${primaryColor} 0%, ${primaryColorLight} 100%)`,
                              }}
                            ></div>
                          </div>
                          <span className="text-white/70 text-lg">
                            {feature}
                          </span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </Glass>
              )}

              {project.technologies?.length > 0 && (
                <Glass
                  variant="white"
                  className="rounded-2xl p-6 md:p-8 lg:p-10"
                >
                  <div className="flex items-center gap-3 mb-6">
                    <div
                      className="w-12 h-12 rounded-xl flex items-center justify-center"
                      style={{
                        background: `linear-gradient(135deg, ${primaryColor} 0%, ${primaryColorLight} 100%)`,
                      }}
                    >
                      <FaCode className="text-white text-xl" />
                    </div>
                    <h2 className="font-[Recoleta] text-xl md:text-2xl font-bold text-white">
                      Technology Stack
                    </h2>
                  </div>
                  <div className="flex flex-wrap gap-3">
                    {project.technologies.map((tech: string, index: number) => (
                      <span
                        key={index}
                        className="font-[Agave] px-4 py-1 text-white/80 font-medium rounded-lg border border-white/10"
                        style={{
                          background:
                            "linear-gradient(135deg, rgba(255, 255, 255, 0.05) 0%, rgba(255, 255, 255, 0.02) 100%)",
                        }}
                      >
                        {tech}
                      </span>
                    ))}
                  </div>
                </Glass>
              )}
            </div>

            {/* Sidebar */}
            <div className="lg:col-span-4">
              <div className="sticky top-24 space-y-6">
                <Glass variant="white" className="rounded-2xl p-6">
                  <h3 className="font-[Recoleta] text-xl md:text-2xl text-white mb-6">
                    Project Links
                  </h3>
                  <div className="space-y-4">
                    {project.liveLink && (
                      <a
                        href={project.liveLink}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="font-[Outfit-Regular] group flex items-center justify-between p-4 rounded-xl border border-white/10 hover:border-[#00a8ff]/30 hover:shadow-lg transition-all duration-300"
                        style={{
                          background:
                            "linear-gradient(135deg, rgba(255, 255, 255, 0.05) 0%, rgba(255, 255, 255, 0.02) 100%)",
                        }}
                      >
                        <div className="flex items-center gap-3">
                          <div
                            className="w-10 h-10 rounded-lg flex items-center justify-center"
                            style={{
                              background: `linear-gradient(135deg, ${primaryColor} 0%, ${primaryColorLight} 100%)`,
                            }}
                          >
                            <FaExternalLinkAlt className="text-white" />
                          </div>
                          <div>
                            <p className="font-semibold text-white">
                              Live Demo
                            </p>
                            <p className="text-sm text-white/50">
                              Visit the live website
                            </p>
                          </div>
                        </div>
                        <FaArrowLeft className="transform rotate-180 text-white/40 group-hover:text-[#00a8ff] group-hover:translate-x-1 transition-all" />
                      </a>
                    )}
                    {project.clientRepo && (
                      <a
                        href={project.clientRepo}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="font-[Outfit-Regular] group flex items-center justify-between p-4 rounded-xl border border-white/10 hover:border-white/20 hover:shadow-lg transition-all duration-300"
                        style={{
                          background:
                            "linear-gradient(135deg, rgba(255, 255, 255, 0.05) 0%, rgba(255, 255, 255, 0.02) 100%)",
                        }}
                      >
                        <div className="flex items-center gap-3">
                          <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-white/10 to-white/5 flex items-center justify-center border border-white/10">
                            <FaGithub className="text-white/70" />
                          </div>
                          <div>
                            <p className="font-semibold text-white">
                              Client Code
                            </p>
                            <p className="text-sm text-white/50">
                              Frontend repository
                            </p>
                          </div>
                        </div>
                        <FaArrowLeft className="transform rotate-180 text-white/40 group-hover:text-white/70 group-hover:translate-x-1 transition-all" />
                      </a>
                    )}
                    {project.serverRepo && (
                      <a
                        href={project.serverRepo}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="font-[Outfit-Regular] group flex items-center justify-between p-4 rounded-xl border border-white/10 hover:border-white/20 hover:shadow-lg transition-all duration-300"
                        style={{
                          background:
                            "linear-gradient(135deg, rgba(255, 255, 255, 0.05) 0%, rgba(255, 255, 255, 0.02) 100%)",
                        }}
                      >
                        <div className="flex items-center gap-3">
                          <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-white/10 to-white/5 flex items-center justify-center border border-white/10">
                            <FaServer className="text-white/70" />
                          </div>
                          <div>
                            <p className="font-semibold text-white">
                              Server Code
                            </p>
                            <p className="text-sm text-white/50">
                              Backend repository
                            </p>
                          </div>
                        </div>
                        <FaArrowLeft className="transform rotate-180 text-white/40 group-hover:text-white/70 group-hover:translate-x-1 transition-all" />
                      </a>
                    )}
                  </div>
                </Glass>

                {categories.length > 0 && (
                  <Glass variant="white" className="rounded-2xl p-6">
                    <h5 className="font-[Recoleta] text-xl md:text-2xl font-bold text-white mb-4">
                      Project Type
                    </h5>
                    <div className="flex flex-wrap gap-2">
                      {categories.map((cat, i) => (
                        <Glass
                          variant="white"
                          key={i}
                          className="inline-flex items-center gap-2 px-4 py-1 rounded-lg"
                        >
                          <span className="font-[Agave] font-semibold text-white/80 text-sm">
                            {cat}
                          </span>
                        </Glass>
                      ))}
                    </div>
                  </Glass>
                )}

                <Glass variant="white" className="rounded-2xl p-6">
                  <div className="text-center mb-6">
                    <div
                      className="w-14 h-14 rounded-xl flex items-center justify-center mx-auto mb-4"
                      style={{
                        background: `linear-gradient(135deg, ${primaryColor} 0%, ${primaryColorLight} 100%)`,
                      }}
                    >
                      <FaRocket className="text-white text-xl" />
                    </div>
                    <h3 className="font-[Recoleta] text-2xl font-bold text-white mb-2">
                      Let's Build Together
                    </h3>
                    <p className="text-white/70 text-sm">
                      We craft digital experiences that drive real business
                      results
                    </p>
                  </div>

                  <div className="space-y-3 mb-6">
                    {[
                      "Custom web & mobile solutions",
                      "Scalable cloud architecture",
                      "Ongoing support & maintenance",
                    ].map((item, i) => (
                      <div key={i} className="flex items-center gap-3">
                        <div
                          className="w-5 h-5 rounded-full flex items-center justify-center flex-shrink-0"
                          style={{
                            background: `linear-gradient(135deg, ${primaryColor}20, ${primaryColorLight}10)`,
                          }}
                        >
                          <div
                            className="w-2 h-2 rounded-full"
                            style={{
                              background: `linear-gradient(135deg, ${primaryColor}, ${primaryColorLight})`,
                            }}
                          />
                        </div>
                        <span className="text-white/70 text-sm">{item}</span>
                      </div>
                    ))}
                  </div>

                  <Link
                    href="/contact"
                    className="flex w-full py-3.5 text-white font-semibold rounded-xl transition-all duration-300 shadow-lg hover:shadow-xl items-center justify-center gap-3 group"
                    style={buttonStyle}
                  >
                    Start a Project
                    <FaArrowLeft className="transform rotate-180 group-hover:translate-x-1 transition-transform" />
                  </Link>
                </Glass>
              </div>
            </div>
          </div>

          {/* CTA */}
          <div className="mt-16 text-center">
            <Glass
              variant="white"
              className="flex flex-col items-center gap-4 p-8 rounded-2xl border border-white/10 shadow-lg mx-auto"
            >
              <div className="text-center">
                <h3 className="font-[Recoleta] text-2xl font-bold text-white mb-2">
                  Like What You See?
                </h3>
                <p className="text-white/70">
                  Check out more of Our projects or let&apos;s discuss your next
                  big idea.
                </p>
              </div>
              <div className="flex flex-col sm:flex-row gap-4">
                <Link
                  href="/projects"
                  className="px-8 py-4 text-white font-semibold rounded-xl transition-all duration-300 shadow-lg hover:shadow-xl"
                  style={buttonStyle}
                >
                  View All Projects
                </Link>
                <Link
                  href="/contact"
                  className="px-8 py-4 bg-gradient-to-r from-white/10 to-white/5 text-white font-semibold rounded-xl hover:from-white/20 hover:to-white/10 transition-all duration-300 shadow-lg hover:shadow-xl border border-white/10"
                >
                  Start a Project
                </Link>
              </div>
            </Glass>
          </div>
        </div>
      </div>
    </main>
  );
}
