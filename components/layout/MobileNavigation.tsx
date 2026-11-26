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
      className="relative max-h-[calc(100dvh-74px)] overflow-y-auto border-t border-white/8 bg-dark text-white lg:hidden"
    >
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 bg-grid-dark opacity-50"
      />
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -top-24 right-0 size-64 rounded-full bg-[radial-gradient(closest-side,rgba(58,222,150,0.2),transparent_72%)] blur-2xl"
      />

      <Container className="relative py-5">
        <nav aria-label="Mobile primary" className="flex flex-col">
          {navItems.map((item, index) => {
            const isActive = isActivePath(pathname, item.href);
            return (
              <Link
                key={item.href}
                href={item.href}
                onClick={onClose}
                aria-current={isActive ? "page" : undefined}
                className={cn(
                  "group flex items-center gap-4 border-b border-white/8 py-4 text-[17px] font-medium transition-colors last:border-b-0",
                  isActive ? "text-white" : "text-white/55 hover:text-white",
                )}
              >
                <span
                  className={cn(
                    "font-mono text-[9px] tracking-[0.12em]",
                    isActive ? "text-brand" : "text-white/25",
                  )}
                >
                  0{index + 1}
                </span>
                {item.label}
                {isActive ? (
                  <span className="ml-auto size-1.5 rounded-full bg-brand shadow-[0_0_10px_rgba(58,222,150,0.8)]" />
                ) : (
                  <ArrowUpRight className="ml-auto size-3.5 text-white/20 transition-colors group-hover:text-brand/70" aria-hidden="true" />
                )}
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
            variant="outlineLight"
            size="md"
            className="w-full"
            onClick={onClose}
          >
            Book a call
          </ButtonLink>
        </div>

        <p className="mt-4 flex items-center gap-2 font-mono text-[8.5px] tracking-[0.16em] text-white/30 uppercase">
          <span className="size-1 rounded-full bg-brand" />
          Available for new projects
        </p>
      </Container>
    </div>
  );
}
