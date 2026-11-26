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
  const imageUrl = sanityImageUrl(project.mainImage?.asset?.url, 1000, 750);
  const description = truncate(blockContentToPlainText(project.body) || "A Qodeax product engagement.", 28);

  return (
    <Link
      href={`/projects/${project.slug.current}`}
      data-cursor-label="View"
      className="group relative flex h-full flex-col overflow-hidden rounded-[1.6rem] border border-line bg-surface transition-[border-color,box-shadow] duration-500 hover:border-brand/35 hover:shadow-[0_35px_80px_-45px_rgba(21,27,25,0.45)]"
    >
      <div className="relative aspect-[4/3] overflow-hidden border-b border-line bg-mist">
        {imageUrl ? (
          <Image
            src={imageUrl}
            alt={project.title}
            fill
            priority={priority}
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 45vw"
            className="object-cover transition-transform duration-[900ms] ease-out group-hover:scale-[1.04]"
          />
        ) : (
          <div className="relative flex size-full items-center justify-center overflow-hidden bg-dark">
            <div aria-hidden="true" className="absolute inset-0 bg-grid-dark opacity-60" />
            <div
              aria-hidden="true"
              className="absolute inset-0 bg-[radial-gradient(60%_60%_at_50%_40%,rgba(58,222,150,0.18),transparent_72%)]"
            />
            <LogoMark className="relative size-12" />
          </div>
        )}

        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-0 bg-gradient-to-t from-[#0b100e]/55 via-transparent to-transparent opacity-80"
        />

        <span className="absolute top-3.5 right-3.5 flex size-9 items-center justify-center rounded-full border border-white/25 bg-black/20 text-white backdrop-blur-md transition-all duration-300 group-hover:border-brand/50 group-hover:bg-brand group-hover:text-brand-foreground">
          <ArrowUpRight className="size-4" aria-hidden="true" />
        </span>

        {project.categories?.length ? (
          <div className="absolute bottom-3.5 left-3.5 flex flex-wrap gap-1.5">
            {project.categories.slice(0, 2).map((category) => (
              <span
                key={category}
                className="rounded-full border border-white/20 bg-black/25 px-2.5 py-1 text-[9.5px] font-semibold tracking-[0.06em] text-white/85 uppercase backdrop-blur-md"
              >
                {category}
              </span>
            ))}
          </div>
        ) : null}
      </div>

      <div className="flex flex-1 flex-col p-5 sm:p-6">
        <div className="flex items-start justify-between gap-3">
          <h3 className="font-heading text-[19px] leading-snug font-semibold tracking-[-0.025em] text-ink">
            {project.title}
          </h3>
        </div>
        <p className="mt-2.5 flex-1 text-[13px] leading-relaxed text-ink-muted">
          {description}
        </p>
        {project.technologies?.length ? (
          <ul className="mt-5 flex flex-wrap gap-1.5 border-t border-line pt-4">
            {project.technologies.slice(0, 4).map((technology) => (
              <li
                key={technology}
                className="rounded-full border border-line bg-canvas/70 px-2 py-1 text-[10px] font-medium text-ink-muted"
              >
                {technology.trim()}
              </li>
            ))}
            {project.technologies.length > 4 ? (
              <li className="rounded-full border border-line px-2 py-1 text-[10px] text-ink-muted">
                +{project.technologies.length - 4}
              </li>
            ) : null}
          </ul>
        ) : null}
      </div>

      <span
        aria-hidden="true"
        className="absolute inset-x-0 bottom-0 h-px origin-left scale-x-0 bg-gradient-to-r from-brand via-brand-strong to-transparent transition-transform duration-500 group-hover:scale-x-100"
      />
    </Link>
  );
}
