import type { ReactNode } from "react";
import { Container } from "@/components/layout/Container";
import { cn } from "@/lib/utils";

interface SectionProps {
  id?: string;
  children: ReactNode;
  className?: string;
  containerClassName?: string;
  contained?: boolean;
  as?: "section" | "div";
}

export function Section({
  id,
  children,
  className,
  containerClassName,
  contained = true,
  as: Tag = "section",
}: SectionProps) {
  return (
    <Tag id={id} className={cn("py-20 sm:py-24 lg:py-28", className)}>
      {contained ? (
        <Container className={containerClassName}>{children}</Container>
      ) : (
        children
      )}
    </Tag>
  );
}
