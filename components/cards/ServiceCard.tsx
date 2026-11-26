import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { IconBadge } from "@/components/ui/IconBadge";
import { NeuralGraph } from "@/components/visuals/NeuralGraph";
import type { Service } from "@/data/services";
import { cn } from "@/lib/utils";

interface ServiceCardProps {
  service: Service;
  index: number;
  featured?: boolean;
}

export function ServiceCard({ service, index, featured = false }: ServiceCardProps) {
  const number = String(index + 1).padStart(2, "0");

  return (
    <article
      className={cn(
        "group relative flex h-full flex-col overflow-hidden rounded-[1.6rem] border p-6 transition-[border-color,background-color,box-shadow] duration-500 sm:p-7",
        featured
          ? "border-white/10 bg-dark text-white shadow-[0_35px_80px_-45px_rgba(21,27,25,0.8)] hover:border-brand/30"
          : "border-line bg-surface hover:border-brand/30 hover:shadow-[0_28px_60px_-42px_rgba(21,27,25,0.4)]",
      )}
    >
      <span
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-500 group-hover:opacity-100"
        style={{
          background: featured
            ? "radial-gradient(360px circle at 50% 10%, rgba(58,222,150,0.16), transparent 68%)"
            : "radial-gradient(320px circle at 50% 10%, rgba(58,222,150,0.12), transparent 66%)",
        }}
      />
      {featured ? (
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-0 bg-grid-dark opacity-40"
        />
      ) : null}

      <div className="relative flex items-start justify-between gap-4">
        <IconBadge icon={service.icon} size={featured ? "lg" : "md"} tone={featured ? "light" : "brand"} />
        <span
          className={cn(
            "font-mono text-[10px] tracking-[0.14em]",
            featured ? "text-white/30" : "text-ink-muted/50",
          )}
        >
          {number}
        </span>
      </div>

      <h3
        className={cn(
          "relative mt-6 font-heading leading-[1.12] font-semibold tracking-[-0.03em]",
          featured ? "text-[1.7rem] text-white sm:text-[2rem]" : "text-[17px] text-ink",
        )}
      >
        {service.title}
      </h3>
      <p
        className={cn(
          "relative mt-3 leading-relaxed",
          featured
            ? "max-w-sm text-[14px] text-white/55 sm:text-[14.5px]"
            : "flex-1 text-[13.5px] text-ink-muted",
        )}
      >
        {service.description}
      </p>

      <ul className="relative mt-5 flex flex-wrap gap-1.5">
        {service.tags.map((tag) => (
          <li
            key={tag}
            className={cn(
              "rounded-full border px-2.5 py-1 text-[10px] font-medium tracking-[0.01em]",
              featured
                ? "border-white/10 bg-white/[0.04] text-white/55"
                : "border-line bg-canvas/70 text-ink-muted",
            )}
          >
            {tag}
          </li>
        ))}
      </ul>

      <Link
        href="/#contact"
        className={cn(
          "relative mt-6 inline-flex items-center gap-2 text-[12px] font-semibold transition-colors",
          featured ? "text-brand hover:text-white" : "text-brand-deep hover:text-ink",
        )}
      >
        Discuss this service
        <span
          className={cn(
            "flex size-6 items-center justify-center rounded-full border transition-colors",
            featured
              ? "border-white/15 text-brand group-hover:border-brand/40 group-hover:bg-brand/10"
              : "border-line text-ink-muted group-hover:border-brand/40 group-hover:bg-brand-soft group-hover:text-brand-deep",
          )}
        >
          <ArrowRight className="size-3 transition-transform group-hover:translate-x-0.5" aria-hidden="true" />
        </span>
      </Link>

      {featured ? (
        <div className="relative mt-6 hidden min-h-[200px] flex-1 overflow-hidden rounded-2xl border border-white/8 bg-[#080d0b] lg:block">
          <NeuralGraph className="absolute inset-0 size-full" />
          <div className="absolute inset-x-3 top-2.5 flex items-center justify-between">
            <span className="font-mono text-[7.5px] tracking-[0.16em] text-white/30 uppercase">
              capability map
            </span>
            <span className="font-mono text-[7.5px] tracking-[0.14em] text-brand/60 uppercase">
              connected
            </span>
          </div>
        </div>
      ) : null}
    </article>
  );
}
