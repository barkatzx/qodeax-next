// app/careers/[slug]/apply/page.tsx
import { client, getJobBySlug } from "@/sanity/client";
import { notFound } from "next/navigation";
import ApplicationFormClient from "./ApplicationFormClient";

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

export default async function ApplyPage(props: { params: tParams }) {
  const { slug } = await props.params;
  const decodedSlug = decodeURIComponent(slug);
  if (!decodedSlug) return notFound();
  const job = await getJobBySlug(decodedSlug);

  if (!job) {
    notFound();
  }
  // export default async function ApplyPage({ params }: PageProps) {
  //   const job = await getJobBySlug(params.slug);

  //   if (!job) {
  //     notFound();
  //   }

  return <ApplicationFormClient job={job} />;
}
