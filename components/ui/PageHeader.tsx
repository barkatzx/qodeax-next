import type { ReactNode } from "react";
import { Container } from "@/components/layout/Container";
import { Badge } from "@/components/ui/Badge";
import { cn } from "@/lib/utils";

interface PageHeaderProps {
  eyebrow?: string;
  title: string;
  description?: string;
  children?: ReactNode;
  align?: "left" | "center";
  className?: string;
}

export function PageHeader({
  eyebrow,
  title,
  description,
  children,
  align = "left",
  className,
}: PageHeaderProps) {
  return (
    <section className={cn("relative overflow-hidden pt-14 pb-14 sm:pt-18 sm:pb-18", className)}>
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-x-0 top-0 h-[420px] bg-[radial-gradient(65%_60%_at_50%_0%,rgba(58,222,150,0.10),transparent_72%)]"
      />
      <Container className="relative">
        <div
          className={cn(
            "flex max-w-3xl flex-col",
            align === "center" && "mx-auto items-center text-center",
          )}
        >
          {eyebrow ? (
            <Badge variant="outline" dot>
              {eyebrow}
            </Badge>
          ) : null}
          <h1 className="mt-6 font-heading text-[2.4rem] leading-[1.02] font-semibold tracking-[-0.045em] text-balance text-ink sm:text-[3.25rem] lg:text-[3.8rem]">
            {title}
          </h1>
          {description ? (
            <p className="mt-5 max-w-2xl text-[15px] leading-relaxed text-ink-muted sm:text-[17px]">
              {description}
            </p>
          ) : null}
          {children ? (
            <div
              className={cn(
                "mt-8 flex w-full flex-col gap-2.5 sm:w-auto sm:flex-row sm:items-center",
                align === "center" && "justify-center",
              )}
            >
              {children}
            </div>
          ) : null}
        </div>
      </Container>
    </section>
  );
}
