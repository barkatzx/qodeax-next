import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { PortableText } from "next-sanity";
import type { PortableTextBlock } from "@portabletext/react";
import {
  ArrowLeft,
  ArrowUpRight,
  CalendarDays,
  Clock3,
  Facebook,
  Linkedin,
  Twitter,
} from "lucide-react";
import { Container } from "@/components/layout/Container";
import { CTASection } from "@/components/sections/CTASection";
import { Badge } from "@/components/ui/Badge";
import { ButtonLink } from "@/components/ui/Button";
import { Card } from "@/components/ui/Card";
import { Reveal } from "@/components/ui/Reveal";
import { siteConfig } from "@/data/site";
import { getPostBySlug, getPostSlugs, getRecentPosts } from "@/lib/content";
import { formatDate, sanityImageUrl } from "@/lib/utils";
import { urlFor, type SanityImageSource } from "@/sanity/client";
import { components } from "@/sanity/portabletext";

export const revalidate = 60;

interface PostDocument {
  title: string;
  body?: PortableTextBlock[];
  publishedAt: string;
  excerpt?: string;
  categories?: { title: string }[];
  mainImage?: SanityImageSource;
  author?: {
    name?: string;
    image?: SanityImageSource;
    bio?: PortableTextBlock[];
  };
  estimatedReadingTime?: number;
  slug: { current: string };
}

interface PostPageProps {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  const slugs = await getPostSlugs();
  return slugs.map((slug) => ({ slug }));
}

export async function generateMetadata({ params }: PostPageProps): Promise<Metadata> {
  const { slug } = await params;
  const post = (await getPostBySlug(decodeURIComponent(slug))) as PostDocument | null;

  if (!post) return { title: "Article not found" };

  return {
    title: post.title,
    description: post.excerpt,
    alternates: { canonical: `/blogs/${post.slug.current}` },
    openGraph: {
      type: "article",
      title: `${post.title} | Qodeax`,
      description: post.excerpt,
      url: `/blogs/${post.slug.current}`,
      publishedTime: post.publishedAt,
    },
  };
}

export default async function PostPage({ params }: PostPageProps) {
  const { slug } = await params;
  const post = (await getPostBySlug(decodeURIComponent(slug))) as PostDocument | null;

  if (!post) notFound();

  const recentPosts = await getRecentPosts(post.slug.current);
  const mainImageUrl = post.mainImage
    ? urlFor(post.mainImage).width(1600).height(900).quality(88).url()
    : null;
  const authorImageUrl = post.author?.image
    ? urlFor(post.author.image).width(160).height(160).quality(88).url()
    : null;
  const readingTime =
    post.estimatedReadingTime ||
    Math.max(5, Math.ceil((post.body?.length || 0) / 12));
  const shareUrl = `${siteConfig.url}/blogs/${post.slug.current}`;

  return (
    <>
      <div className="pt-8">
        <Container>
          <Link
            href="/blogs"
            className="inline-flex items-center gap-1.5 text-[12.5px] font-medium text-ink-soft transition-colors hover:text-ink"
          >
            <ArrowLeft className="size-3.5" aria-hidden="true" />
            All articles
          </Link>
        </Container>
      </div>

      <header className="pt-10 pb-8 sm:pt-14">
        <Container>
          <div className="mx-auto max-w-3xl">
            <div className="flex flex-wrap items-center gap-2">
              {post.categories?.map((category) => (
                <Badge key={category.title} variant="brand">
                  {category.title}
                </Badge>
              ))}
            </div>
            <h1 className="mt-5 font-heading text-[2.15rem] leading-[1.04] font-semibold tracking-[-0.04em] text-balance text-ink sm:text-[3rem] lg:text-[3.4rem]">
              {post.title}
            </h1>
            <div className="mt-5 flex flex-wrap items-center gap-x-5 gap-y-2 text-[12px] text-ink-caption">
              <span className="inline-flex items-center gap-1.5">
                <CalendarDays className="size-3.5" aria-hidden="true" />
                {formatDate(post.publishedAt, {
                  day: "numeric",
                  month: "long",
                  year: "numeric",
                })}
              </span>
              <span className="inline-flex items-center gap-1.5">
                <Clock3 className="size-3.5" aria-hidden="true" />
                {readingTime} min read
              </span>
              {post.author?.name ? (
                <span>By {post.author.name}</span>
              ) : (
                <span>By Qodeax</span>
              )}
            </div>
            {post.excerpt ? (
              <p className="mt-5 text-[16px] leading-relaxed text-ink-caption sm:text-[17px]">
                {post.excerpt}
              </p>
            ) : null}
          </div>
        </Container>
      </header>

      {mainImageUrl ? (
        <section className="pb-10">
          <Container>
            <div className="relative aspect-[16/9] overflow-hidden rounded-2xl border border-line bg-mist">
              <Image
                src={mainImageUrl}
                alt={post.title}
                fill
                priority
                sizes="(max-width: 1200px) 100vw, 1100px"
                className="object-cover"
              />
            </div>
          </Container>
        </section>
      ) : null}

      <section className="pb-20 sm:pb-24 lg:pb-28">
        <Container>
          <div className="grid gap-6 lg:grid-cols-12">
            <div className="lg:col-span-8">
              <Reveal>
                <Card className="p-6 sm:p-8 lg:p-10">
                  <h2 className="sr-only">Article</h2>
                  <div className="article-body">
                    {post.body?.length ? (
                      <PortableText value={post.body} components={components} />
                    ) : (
                      <p>This article does not have any content yet.</p>
                    )}
                  </div>

                  {post.author?.name ? (
                    <div className="mt-10 flex flex-col gap-4 border-t border-line pt-6 sm:flex-row sm:items-start">
                      <div className="relative size-14 shrink-0 overflow-hidden rounded-full border border-line bg-mist">
                        {authorImageUrl ? (
                          <Image
                            src={authorImageUrl}
                            alt={post.author.name}
                            fill
                            sizes="56px"
                            className="object-cover"
                          />
                        ) : (
                          <span className="flex size-full items-center justify-center font-heading text-lg font-semibold text-ink/40">
                            {post.author.name.charAt(0)}
                          </span>
                        )}
                      </div>
                      <div className="min-w-0">
                        <p className="text-[10px] font-semibold tracking-[0.16em] text-ink-muted uppercase">
                          Written by
                        </p>
                        <h2 className="mt-1 font-heading text-lg font-semibold text-ink">
                          {post.author.name}
                        </h2>
                        {post.author.bio?.length ? (
                          <div className="article-body mt-2 text-[13px]">
                            <PortableText value={post.author.bio} />
                          </div>
                        ) : (
                          <p className="mt-1 text-[13px] text-ink-caption">
                            Writer and contributor at Qodeax.
                          </p>
                        )}
                      </div>
                    </div>
                  ) : null}

                  <div className="mt-8 flex flex-wrap items-center gap-3 border-t border-line pt-5">
                    <span className="text-[11px] font-semibold tracking-[0.12em] text-ink-muted uppercase">
                      Share
                    </span>
                    <ShareLink
                      href={`https://twitter.com/intent/tweet?text=${encodeURIComponent(post.title)}&url=${encodeURIComponent(shareUrl)}`}
                      label="Share on X"
                      icon={Twitter}
                    />
                    <ShareLink
                      href={`https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(shareUrl)}`}
                      label="Share on Facebook"
                      icon={Facebook}
                    />
                    <ShareLink
                      href={`https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(shareUrl)}`}
                      label="Share on LinkedIn"
                      icon={Linkedin}
                    />
                  </div>
                </Card>
              </Reveal>
            </div>

            <aside className="space-y-4 lg:col-span-4">
              <Card className="p-5">
                <h2 className="font-heading text-[15px] font-semibold text-ink">
                  Recent articles
                </h2>
                <div className="mt-4 space-y-3">
                  {recentPosts.length ? (
                    recentPosts.map((recent) => {
                      const imageUrl = sanityImageUrl(recent.mainImage?.asset?.url, 200, 200);
                      return (
                        <Link
                          key={recent._id}
                          href={`/blogs/${recent.slug.current}`}
                          className="group flex gap-3 rounded-xl border border-transparent p-1.5 transition-colors hover:border-line hover:bg-surface-soft"
                        >
                          <span className="relative size-14 shrink-0 overflow-hidden rounded-lg border border-line bg-mist">
                            {imageUrl ? (
                              <Image
                                src={imageUrl}
                                alt=""
                                fill
                                sizes="56px"
                                className="object-cover transition-transform duration-300 group-hover:scale-105"
                              />
                            ) : (
                              <span className="flex size-full items-center justify-center font-heading text-sm font-semibold text-ink/30">
                                Q
                              </span>
                            )}
                          </span>
                          <span className="min-w-0">
                            <span className="line-clamp-2 block text-[12.5px] leading-snug font-medium text-ink transition-colors group-hover:text-brand-deep">
                              {recent.title}
                            </span>
                            <span className="mt-1 block text-[10.5px] text-ink-caption">
                              {formatDate(recent.publishedAt)}
                            </span>
                          </span>
                        </Link>
                      );
                    })
                  ) : (
                    <p className="text-[12.5px] text-ink-muted">
                      More articles will appear here soon.
                    </p>
                  )}
                </div>
              </Card>

              <Card className="p-5">
                <h2 className="font-heading text-lg font-semibold tracking-[-0.02em] text-ink">
                  Have a product to build?
                </h2>
                <p className="mt-1.5 text-[12.5px] leading-relaxed text-ink-caption">
                  We help teams turn an idea into a reliable first release. Tell us what you are working on.
                </p>
                <ButtonLink href="/#contact" size="md" className="mt-4 w-full">
                  Start a conversation
                  <ArrowUpRight className="size-3.5" aria-hidden="true" />
                </ButtonLink>
              </Card>
            </aside>
          </div>
        </Container>
      </section>

      <CTASection
        eyebrow="Keep reading"
        title="More notes from the Qodeax team."
        description="Browse the archive for practical writing on engineering, product decisions, and building software that lasts."
        primary={{ label: "Back to the blog", href: "/blogs" }}
        secondary={{ label: "See our work", href: "/projects" }}
        footnote={`Or email ${siteConfig.email} directly.`}
      />
    </>
  );
}

function ShareLink({
  href,
  label,
  icon: Icon,
}: {
  href: string;
  label: string;
  icon: typeof Twitter;
}) {
  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      aria-label={label}
      className="flex size-8 items-center justify-center rounded-full border border-line text-ink-muted transition-colors hover:border-brand hover:bg-brand-soft hover:text-brand-deep"
    >
      <Icon className="size-3.5" aria-hidden="true" />
    </a>
  );
}
