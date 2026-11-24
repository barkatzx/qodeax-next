import type { Metadata } from "next";
import { PageHeader } from "@/components/ui/PageHeader";
import { getPosts } from "@/lib/content";
import { BlogExplorer } from "./BlogExplorer";

export const metadata: Metadata = {
  title: "Blog",
  description:
    "Notes from the Qodeax team on software engineering, product development, AI, and building systems that last.",
  alternates: { canonical: "/blogs" },
};

export default async function BlogPage() {
  const posts = await getPosts();

  return (
    <>
      <PageHeader
        eyebrow="Insights"
        title="Notes on building software that holds up."
        description="Practical writing on engineering, product decisions, AI, and the systems behind reliable software."
      />
      <BlogExplorer posts={posts} />
    </>
  );
}
