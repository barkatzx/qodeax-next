"use client";

import { useMemo, useState } from "react";
import { ChevronLeft, ChevronRight, Search, X } from "lucide-react";
import { ArticleCard } from "@/components/cards/ArticleCard";
import { Container } from "@/components/layout/Container";
import { Button } from "@/components/ui/Button";
import { Reveal } from "@/components/ui/Reveal";
import type { BlogPost } from "@/lib/types";
import { cn } from "@/lib/utils";

const ITEMS_PER_PAGE = 6;

export function BlogExplorer({ posts }: { posts: BlogPost[] }) {
  const [category, setCategory] = useState<string | null>(null);
  const [query, setQuery] = useState("");
  const [page, setPage] = useState(1);

  const categories = useMemo(
    () =>
      Array.from(
        new Set(posts.flatMap((post) => post.categories?.map((item) => item.title) ?? [])),
      ).sort(),
    [posts],
  );

  const filtered = useMemo(() => {
    const search = query.trim().toLowerCase();
    return posts.filter((post) => {
      const matchesCategory =
        !category || post.categories?.some((item) => item.title === category);
      const matchesSearch =
        !search ||
        post.title.toLowerCase().includes(search) ||
        post.excerpt?.toLowerCase().includes(search);
      return matchesCategory && matchesSearch;
    });
  }, [posts, category, query]);

  const totalPages = Math.max(1, Math.ceil(filtered.length / ITEMS_PER_PAGE));
  const currentPage = Math.min(page, totalPages);
  const visible = filtered.slice(
    (currentPage - 1) * ITEMS_PER_PAGE,
    currentPage * ITEMS_PER_PAGE,
  );

  const updateCategory = (next: string | null) => {
    setCategory(next);
    setPage(1);
  };

  if (!posts.length) {
    return (
      <section className="pb-20 sm:pb-24 lg:pb-28">
        <Container>
          <div className="rounded-3xl border border-line bg-surface p-10 text-center">
            <p className="font-heading text-xl font-semibold text-ink">
              Articles are on the way.
            </p>
            <p className="mt-2 text-sm text-ink-muted">
              New writing will appear here as it is published.
            </p>
          </div>
        </Container>
      </section>
    );
  }

  return (
    <section className="pb-20 sm:pb-24 lg:pb-28">
      <Container>
        <h2 className="sr-only">All articles</h2>

        <div className="flex flex-col gap-4 border-y border-line py-5">
          <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
            <div className="flex flex-wrap items-center gap-1.5">
              <button
                type="button"
                onClick={() => updateCategory(null)}
                aria-pressed={category === null}
                className={cn(
                  "rounded-full border px-3.5 py-1.5 text-[12px] font-medium transition-colors",
                  category === null
                    ? "border-ink bg-ink text-white"
                    : "border-line bg-surface text-ink-caption hover:border-line-strong hover:text-ink",
                )}
              >
                All articles ({posts.length})
              </button>
              {categories.map((item) => {
                const count = posts.filter((post) =>
                  post.categories?.some((entry) => entry.title === item),
                ).length;
                return (
                  <button
                    key={item}
                    type="button"
                    onClick={() => updateCategory(item)}
                    aria-pressed={category === item}
                    className={cn(
                      "rounded-full border px-3.5 py-1.5 text-[12px] font-medium transition-colors",
                      category === item
                        ? "border-ink bg-ink text-white"
                        : "border-line bg-surface text-ink-caption hover:border-line-strong hover:text-ink",
                    )}
                  >
                    {item} ({count})
                  </button>
                );
              })}
            </div>

            <div className="relative w-full sm:max-w-[260px]">
              <Search
                className="pointer-events-none absolute top-1/2 left-3 size-3.5 -translate-y-1/2 text-ink-muted"
                aria-hidden="true"
              />
              <input
                type="search"
                value={query}
                onChange={(event) => {
                  setQuery(event.target.value);
                  setPage(1);
                }}
                placeholder="Search articles…"
                aria-label="Search articles"
                className="h-10 w-full rounded-full border border-line bg-surface pr-9 pl-9 text-[12.5px] text-ink placeholder:text-ink-muted/60 focus:border-brand-strong focus:ring-2 focus:ring-brand/20 focus:outline-none"
              />
              {query ? (
                <button
                  type="button"
                  onClick={() => {
                    setQuery("");
                    setPage(1);
                  }}
                  aria-label="Clear search"
                  className="absolute top-1/2 right-2.5 flex size-6 -translate-y-1/2 items-center justify-center rounded-full text-ink-muted hover:bg-ink/5 hover:text-ink"
                >
                  <X className="size-3" />
                </button>
              ) : null}
            </div>
          </div>
        </div>

        {visible.length ? (
          <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {visible.map((post, index) => (
              <Reveal key={post._id} delay={index * 50} className="h-full">
                <ArticleCard post={post} />
              </Reveal>
            ))}
          </div>
        ) : (
          <div className="mt-10 rounded-3xl border border-line bg-surface p-10 text-center">
            <p className="font-heading text-xl font-semibold text-ink">
              No articles match that filter.
            </p>
            <p className="mt-2 text-sm text-ink-muted">
              Try a different category or clear the search.
            </p>
            <Button
              variant="secondary"
              size="sm"
              className="mt-5"
              onClick={() => {
                setCategory(null);
                setQuery("");
                setPage(1);
              }}
            >
              Clear filters
            </Button>
          </div>
        )}

        {totalPages > 1 ? (
          <div className="mt-10 flex flex-col items-center justify-center gap-4 sm:flex-row">
            <Button
              variant="secondary"
              size="sm"
              onClick={() => setPage((value) => Math.max(1, value - 1))}
              disabled={currentPage === 1}
            >
              <ChevronLeft className="size-3.5" aria-hidden="true" />
              Previous
            </Button>

            <div className="flex items-center gap-1.5">
              {Array.from({ length: totalPages }, (_, index) => index + 1).map(
                (number) => (
                  <button
                    key={number}
                    type="button"
                    onClick={() => setPage(number)}
                    aria-current={number === currentPage ? "page" : undefined}
                    className={cn(
                      "flex size-9 items-center justify-center rounded-full text-[12.5px] font-medium transition-colors",
                      number === currentPage
                        ? "bg-ink text-white"
                        : "border border-line bg-surface text-ink-muted hover:border-line-strong hover:text-ink",
                    )}
                  >
                    {number}
                  </button>
                ),
              )}
            </div>

            <Button
              variant="secondary"
              size="sm"
              onClick={() => setPage((value) => Math.min(totalPages, value + 1))}
              disabled={currentPage === totalPages}
            >
              Next
              <ChevronRight className="size-3.5" aria-hidden="true" />
            </Button>
          </div>
        ) : null}

        <p className="mt-6 text-center text-[11.5px] text-ink-caption">
          Showing {visible.length} of {filtered.length} articles
          {category ? ` in ${category}` : ""}
          {query ? ` matching “${query}”` : ""}.
        </p>
      </Container>
    </section>
  );
}
