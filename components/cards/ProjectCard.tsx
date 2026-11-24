import Image from "next/image";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { LogoMark } from "@/components/ui/Logo";
import type { Project } from "@/lib/types";
import { sanityImageUrl, truncate } from "@/lib/utils";

function blockContentToPlainText(blocks?: Project["body"]) {
  if (!blocks?.length) return "";
  return blocks
    .filter((block) => block._type === "block" && Array.isArray(block.children))
    .map((block) => block.children!.map((child) => child.text ?? "").join(""))
    .join(" ")
    .trim();
}

export function ProjectCard({ project, priority = false }: { project: Project; priority?: boolean }) {
  const imageUrl = sanityImageUrl(project.mainImage?.asset?.url, 800, 560);
  const description = truncate(blockContentToPlainText(project.body) || "A Qodeax product engagement.", 28);

  return (
    <Link
      href={`/projects/${project.slug.current}`}
      className="group flex h-full flex-col overflow-hidden rounded-2xl border border-line bg-surface transition-all duration-300 hover:-translate-y-0.5 hover:border-line-strong hover:shadow-[var(--shadow-lift)]"
    >
      <div className="relative aspect-[4/3] overflow-hidden border-b border-line bg-mist">
        {imageUrl ? (
          <Image
            src={imageUrl}
            alt={project.title}
            fill
            priority={priority}
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
            className="object-cover transition-transform duration-700 group-hover:scale-[1.03]"
          />
        ) : (
          <div className="flex size-full items-center justify-center bg-[radial-gradient(60%_60%_at_50%_40%,rgba(58,222,150,0.18),transparent_72%)]">
            <LogoMark className="size-12" />
          </div>
        )}
        {project.categories?.length ? (
          <div className="absolute bottom-3 left-3 flex flex-wrap gap-1.5">
            {project.categories.slice(0, 2).map((category) => (
              <span
                key={category}
                className="rounded-full border border-white/40 bg-white/90 px-2.5 py-1 text-[10px] font-semibold tracking-[0.04em] text-ink backdrop-blur-sm"
              >
                {category}
              </span>
            ))}
          </div>
        ) : null}
      </div>

      <div className="flex flex-1 flex-col p-5">
        <div className="flex items-start justify-between gap-3">
          <h3 className="font-heading text-[18px] leading-snug font-semibold tracking-[-0.02em] text-ink">
            {project.title}
          </h3>
          <span className="mt-0.5 flex size-7 shrink-0 items-center justify-center rounded-full border border-line text-ink-muted transition-colors group-hover:border-brand group-hover:bg-brand-soft group-hover:text-brand-deep">
            <ArrowUpRight className="size-3.5" aria-hidden="true" />
          </span>
        </div>
        <p className="mt-2 flex-1 text-[13px] leading-relaxed text-ink-muted">
          {description}
        </p>
        {project.technologies?.length ? (
          <ul className="mt-4 flex flex-wrap gap-1.5">
            {project.technologies.slice(0, 4).map((technology) => (
              <li
                key={technology}
                className="rounded-md border border-line bg-surface-soft px-2 py-1 text-[10.5px] font-medium text-ink-muted"
              >
                {technology.trim()}
              </li>
            ))}
            {project.technologies.length > 4 ? (
              <li className="rounded-md border border-line px-2 py-1 text-[10.5px] text-ink-muted">
                +{project.technologies.length - 4}
              </li>
            ) : null}
          </ul>
        ) : null}
      </div>
    </Link>
  );
}
