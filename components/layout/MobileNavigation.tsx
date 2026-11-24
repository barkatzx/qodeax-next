"use client";

import { useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { ArrowUpRight } from "lucide-react";
import { Container } from "@/components/layout/Container";
import { isActivePath } from "@/components/layout/Navigation";
import { ButtonLink } from "@/components/ui/Button";
import { navItems } from "@/data/navigation";
import { siteConfig } from "@/data/site";
import { cn } from "@/lib/utils";

interface MobileNavigationProps {
  open: boolean;
  onClose: () => void;
}

export function MobileNavigation({ open, onClose }: MobileNavigationProps) {
  const pathname = usePathname();

  useEffect(() => {
    if (!open) return;

    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") onClose();
    };

    document.addEventListener("keydown", onKeyDown);
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    return () => {
      document.removeEventListener("keydown", onKeyDown);
      document.body.style.overflow = previousOverflow;
    };
  }, [open, onClose]);

  if (!open) return null;

  return (
    <div
      id="mobile-navigation"
      className="max-h-[calc(100dvh-72px)] overflow-y-auto border-t border-line bg-canvas lg:hidden"
    >
      <Container className="py-4">
        <nav aria-label="Mobile primary" className="flex flex-col">
          {navItems.map((item) => {
            const isActive = isActivePath(pathname, item.href);
            return (
              <Link
                key={item.href}
                href={item.href}
                onClick={onClose}
                aria-current={isActive ? "page" : undefined}
                className={cn(
                  "flex items-center justify-between border-b border-line/70 py-3.5 text-[15px] font-medium transition-colors last:border-b-0",
                  isActive ? "text-ink" : "text-ink-soft",
                )}
              >
                {item.label}
                {isActive ? (
                  <span className="size-1.5 rounded-full bg-brand" />
                ) : null}
              </Link>
            );
          })}
        </nav>

        <div className="mt-5 grid gap-2">
          <ButtonLink href={siteConfig.links.contact} size="md" className="w-full" onClick={onClose}>
            Start a project
            <ArrowUpRight className="size-4" aria-hidden="true" />
          </ButtonLink>
          <ButtonLink
            href={siteConfig.calendly}
            variant="secondary"
            size="md"
            className="w-full"
            onClick={onClose}
          >
            Book a call
          </ButtonLink>
        </div>
      </Container>
    </div>
  );
}
