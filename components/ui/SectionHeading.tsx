import type { ReactNode } from "react";
import { cn } from "@/lib/utils";

interface SectionHeadingProps {
  eyebrow?: string;
  title: ReactNode;
  description?: ReactNode;
  align?: "left" | "center";
  tone?: "default" | "dark";
  as?: "h1" | "h2" | "h3";
  className?: string;
  titleClassName?: string;
  descriptionClassName?: string;
}

export function SectionHeading({
  eyebrow,
  title,
  description,
  align = "left",
  tone = "default",
  as: Heading = "h2",
  className,
  titleClassName,
  descriptionClassName,
}: SectionHeadingProps) {
  const isDark = tone === "dark";

  return (
    <div
      className={cn(
        "flex flex-col",
        align === "center" && "items-center text-center",
        className,
      )}
    >
      {eyebrow ? (
        <p
          className={cn(
            "mb-4 inline-flex items-center gap-2 text-[11px] font-semibold tracking-[0.2em] uppercase",
            isDark ? "text-white/55" : "text-ink-caption",
          )}
        >
          <span className="size-1.5 rounded-full bg-brand" aria-hidden="true" />
          {eyebrow}
        </p>
      ) : null}
      <Heading
        className={cn(
          "font-heading text-[2rem] leading-[1.04] font-semibold tracking-[-0.035em] text-balance sm:text-[2.5rem] lg:text-[2.9rem]",
          isDark ? "text-white" : "text-ink",
          titleClassName,
        )}
      >
        {title}
      </Heading>
      {description ? (
        <p
          className={cn(
            "mt-5 max-w-2xl text-[15px] leading-relaxed sm:text-base",
            align === "center" && "mx-auto",
            isDark ? "text-white/60" : "text-ink-muted",
            descriptionClassName,
          )}
        >
          {description}
        </p>
      ) : null}
    </div>
  );
}
