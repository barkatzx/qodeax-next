import type { ReactNode } from "react";
import { SplitText } from "@/components/animations/SplitText";
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
            "mb-4 inline-flex items-center gap-3 text-[10.5px] font-semibold tracking-[0.22em] uppercase",
            isDark ? "text-white/45" : "text-ink-caption",
          )}
        >
          <span
            className={cn("h-px w-7", isDark ? "bg-brand/60" : "bg-brand-strong/50")}
            aria-hidden="true"
          />
          <span className="size-1 rounded-full bg-brand" aria-hidden="true" />
          {eyebrow}
        </p>
      ) : null}
      {typeof title === "string" ? (
        <SplitText
          as={Heading}
          text={title}
          className={cn(
            "font-heading text-[2.15rem] leading-[1.02] font-semibold tracking-[-0.045em] text-balance sm:text-[2.75rem] lg:text-[3.2rem]",
            isDark ? "text-white" : "text-ink",
            align === "center" && "justify-center",
            titleClassName,
          )}
        />
      ) : (
        <Heading
          className={cn(
            "font-heading text-[2.15rem] leading-[1.02] font-semibold tracking-[-0.045em] text-balance sm:text-[2.75rem] lg:text-[3.2rem]",
            isDark ? "text-white" : "text-ink",
            titleClassName,
          )}
        >
          {title}
        </Heading>
      )}
      {description ? (
        <p
          className={cn(
            "mt-5 max-w-2xl text-[15px] leading-relaxed sm:text-base",
            align === "center" && "mx-auto",
            isDark ? "text-white/55" : "text-ink-muted",
            descriptionClassName,
          )}
        >
          {description}
        </p>
      ) : null}
    </div>
  );
}
