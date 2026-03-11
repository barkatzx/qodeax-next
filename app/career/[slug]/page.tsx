// app/careers/[slug]/page.tsx
import { client, getJobBySlug } from "@/sanity/client";
import { notFound } from "next/navigation";
import JobDetailClient from "./JobDetailClient";

interface PageProps {
  params: {
    slug: string;
  };
}

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
  const job = await getJobBySlug(decodedSlug);

  if (!job) {
    notFound();
  }
  return <JobDetailClient job={job} />;
}
