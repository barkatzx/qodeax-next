import Image from "next/image";
import Link from "next/link";
import { ArrowUpRight, Clock3 } from "lucide-react";
import type { BlogPost } from "@/lib/types";
import { formatDate, sanityImageUrl } from "@/lib/utils";

export function ArticleCard({ post }: { post: BlogPost }) {
  const imageUrl = sanityImageUrl(post.mainImage?.asset?.url, 800, 480);
  const category = post.categories?.[0]?.title;

  return (
    <article className="group flex h-full flex-col overflow-hidden rounded-2xl border border-line bg-surface transition-all duration-300 hover:-translate-y-0.5 hover:border-line-strong hover:shadow-[var(--shadow-lift)]">
      <Link href={`/blogs/${post.slug.current}`} className="relative block aspect-[16/10] overflow-hidden border-b border-line bg-mist">
        {imageUrl ? (
          <Image
            src={imageUrl}
            alt={post.title}
            fill
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
            className="object-cover transition-transform duration-700 group-hover:scale-[1.03]"
          />
        ) : (
          <div className="flex size-full items-center justify-center bg-[radial-gradient(60%_60%_at_50%_40%,rgba(58,222,150,0.18),transparent_72%)]">
            <span className="font-heading text-3xl font-semibold text-ink/20">Q</span>
          </div>
        )}
      </Link>

      <div className="flex flex-1 flex-col p-5">
        <div className="flex flex-wrap items-center gap-2 text-[10.5px] text-ink-caption">
          {category ? (
            <span className="rounded-full bg-brand-soft px-2.5 py-1 text-[10px] font-semibold tracking-[0.06em] text-brand-deep uppercase">
              {category}
            </span>
          ) : null}
          <span>{formatDate(post.publishedAt)}</span>
          <span className="inline-flex items-center gap-1">
            <Clock3 className="size-3" aria-hidden="true" />
            {post.estimatedReadingTime || 5} min read
          </span>
        </div>

        <h3 className="mt-3 font-heading text-[19px] leading-snug font-semibold tracking-[-0.02em] text-ink">
          <Link href={`/blogs/${post.slug.current}`} className="transition-colors hover:text-brand-deep">
            {post.title}
          </Link>
        </h3>

        {post.excerpt ? (
          <p className="mt-2 flex-1 text-[13px] leading-relaxed text-ink-caption line-clamp-3">
            {post.excerpt}
          </p>
        ) : (
          <div className="flex-1" />
        )}

        <Link
          href={`/blogs/${post.slug.current}`}
          className="mt-4 inline-flex items-center gap-1.5 text-[12.5px] font-semibold text-brand-deep transition-colors hover:text-ink"
        >
          Read article
          <ArrowUpRight className="size-3.5 transition-transform group-hover:translate-x-0.5" aria-hidden="true" />
        </Link>
      </div>
    </article>
  );
}
