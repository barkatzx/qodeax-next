"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { ArrowUpRight, Menu, X } from "lucide-react";
import { Container } from "@/components/layout/Container";
import { MobileNavigation } from "@/components/layout/MobileNavigation";
import { Navigation } from "@/components/layout/Navigation";
import { ButtonLink } from "@/components/ui/Button";
import { Logo } from "@/components/ui/Logo";
import { siteConfig } from "@/data/site";
import { cn } from "@/lib/utils";

export function Header() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header
      className={cn(
        "sticky top-0 z-50 transition-all duration-300",
        scrolled || menuOpen
          ? "border-b border-line bg-canvas/95 backdrop-blur-md"
          : "border-b border-transparent bg-canvas",
      )}
    >
      <Container>
        <div className="flex h-[72px] items-center justify-between gap-4 lg:grid lg:grid-cols-[1fr_auto_1fr] lg:gap-6">
          <Link
            href="/"
            className="shrink-0 justify-self-start rounded-md focus-visible:ring-2 focus-visible:ring-brand focus-visible:ring-offset-2 focus-visible:ring-offset-canvas focus-visible:outline-none"
          >
            <Logo />
          </Link>

          <Navigation />

          <div className="hidden items-center gap-2 lg:flex lg:justify-self-end">
            <ButtonLink href={siteConfig.calendly} variant="ghost" size="sm">
              Book a call
            </ButtonLink>
            <ButtonLink href={siteConfig.links.contact} size="sm">
              Start a project
              <ArrowUpRight className="size-3.5" aria-hidden="true" />
            </ButtonLink>
          </div>

          <div className="flex items-center gap-2 lg:hidden">
            <button
              type="button"
              onClick={() => setMenuOpen((open) => !open)}
              aria-expanded={menuOpen}
              aria-controls="mobile-navigation"
              aria-label={menuOpen ? "Close menu" : "Open menu"}
              className="flex size-11 items-center justify-center rounded-full border border-line bg-surface text-ink transition-colors hover:border-line-strong focus-visible:ring-2 focus-visible:ring-brand focus-visible:ring-offset-2 focus-visible:ring-offset-canvas focus-visible:outline-none"
            >
              {menuOpen ? (
                <X className="size-4.5" strokeWidth={2} />
              ) : (
                <Menu className="size-4.5" strokeWidth={2} />
              )}
            </button>
          </div>
        </div>
      </Container>

      <MobileNavigation open={menuOpen} onClose={() => setMenuOpen(false)} />
    </header>
  );
}
