import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { IconBadge } from "@/components/ui/IconBadge";
import type { Service } from "@/data/services";

export function ServiceCard({ service }: { service: Service }) {
  return (
    <article className="group flex h-full flex-col rounded-2xl border border-line bg-surface p-6 transition-all duration-300 hover:-translate-y-0.5 hover:border-line-strong hover:shadow-[var(--shadow-lift)]">
      <IconBadge icon={service.icon} />
      <h3 className="mt-5 font-heading text-[17px] leading-snug font-semibold tracking-[-0.015em] text-ink">
        {service.title}
      </h3>
      <p className="mt-2 flex-1 text-sm leading-relaxed text-ink-muted">
        {service.description}
      </p>
      <ul className="mt-4 flex flex-wrap gap-1.5">
        {service.tags.map((tag) => (
          <li
            key={tag}
            className="rounded-full border border-line bg-surface-soft px-2.5 py-1 text-[10.5px] font-medium text-ink-muted"
          >
            {tag}
          </li>
        ))}
      </ul>
      <Link
        href="/#contact"
        className="mt-5 inline-flex items-center gap-1.5 text-[12.5px] font-semibold text-brand-deep transition-colors hover:text-ink"
      >
        Discuss this service
        <ArrowRight className="size-3.5 transition-transform group-hover:translate-x-0.5" aria-hidden="true" />
      </Link>
    </article>
  );
}
