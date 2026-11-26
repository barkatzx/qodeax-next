import Link from "next/link";
import { ArrowUpRight, Github, Linkedin, Mail } from "lucide-react";
import { Container } from "@/components/layout/Container";
import { Badge } from "@/components/ui/Badge";
import { ButtonLink } from "@/components/ui/Button";
import { Logo } from "@/components/ui/Logo";
import { footerNavigation } from "@/data/navigation";
import { siteConfig } from "@/data/site";
import { isExternalHref } from "@/lib/utils";

interface FooterLink {
  label: string;
  href: string;
}

function FooterAnchor({ label, href }: FooterLink) {
  if (isExternalHref(href)) {
    const isHttp = /^https?:/.test(href);
    return (
      <a
        href={href}
        target={isHttp ? "_blank" : undefined}
        rel={isHttp ? "noopener noreferrer" : undefined}
        className="group inline-flex items-center gap-1 text-[12.5px] text-white/45 transition-colors hover:text-white"
      >
        <span className="h-px w-0 bg-brand transition-all duration-300 group-hover:w-3" aria-hidden="true" />
        {label}
        <ArrowUpRight className="size-3 opacity-40" aria-hidden="true" />
      </a>
    );
  }

  return (
    <Link
      href={href}
      className="group inline-flex items-center gap-1 text-[12.5px] text-white/45 transition-colors hover:text-white"
    >
      <span className="h-px w-0 bg-brand transition-all duration-300 group-hover:w-3" aria-hidden="true" />
      {label}
    </Link>
  );
}

function FooterColumn({
  title,
  links,
}: {
  title: string;
  links: readonly FooterLink[];
}) {
  return (
    <div>
      <h3 className="font-mono text-[9px] font-semibold tracking-[0.2em] text-white/35 uppercase">
        {title}
      </h3>
      <ul className="mt-4 space-y-2.5">
        {links.map((link) => (
          <li key={link.href}>
            <FooterAnchor {...link} />
          </li>
        ))}
      </ul>
    </div>
  );
}

export function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="relative overflow-hidden border-t border-white/8 bg-dark text-white">
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 bg-grid-dark opacity-35"
      />
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -top-32 left-1/3 size-[560px] rounded-full bg-[radial-gradient(closest-side,rgba(58,222,150,0.1),transparent_72%)] blur-3xl"
      />
      <div aria-hidden="true" className="noise-texture-dark pointer-events-none absolute inset-0" />
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-brand/40 to-transparent"
      />

      <Container className="relative py-14 lg:py-20">
        <div className="grid gap-10 sm:grid-cols-2 lg:grid-cols-[1.6fr_1fr_1fr_1fr] lg:gap-12">
          <div className="max-w-sm">
            <Link
              href="/"
              className="inline-flex rounded-md focus-visible:ring-2 focus-visible:ring-brand focus-visible:ring-offset-2 focus-visible:ring-offset-dark focus-visible:outline-none"
            >
              <Logo tone="light" />
            </Link>
            <p className="mt-5 text-[12.5px] leading-relaxed text-white/45">
              {siteConfig.description}
            </p>
            <div className="mt-5">
              <Badge variant="dark" dot>
                Available for new projects
              </Badge>
            </div>
            <div className="mt-6 flex items-center gap-2">
              <ButtonLink href={siteConfig.links.contact} size="sm" data-magnetic>
                Start a project
                <ArrowUpRight className="size-3.5" aria-hidden="true" />
              </ButtonLink>
              <a
                href={`mailto:${siteConfig.email}`}
                className="flex size-9 items-center justify-center rounded-full border border-white/12 text-white/55 transition-colors hover:border-brand/40 hover:text-brand"
                aria-label="Email Qodeax"
              >
                <Mail className="size-3.5" />
              </a>
              <a
                href={siteConfig.links.linkedin}
                target="_blank"
                rel="noopener noreferrer"
                className="flex size-9 items-center justify-center rounded-full border border-white/12 text-white/55 transition-colors hover:border-brand/40 hover:text-brand"
                aria-label="Qodeax on LinkedIn"
              >
                <Linkedin className="size-3.5" />
              </a>
              <a
                href={siteConfig.links.github}
                target="_blank"
                rel="noopener noreferrer"
                className="flex size-9 items-center justify-center rounded-full border border-white/12 text-white/55 transition-colors hover:border-brand/40 hover:text-brand"
                aria-label="Qodeax on GitHub"
              >
                <Github className="size-3.5" />
              </a>
            </div>
          </div>

          <FooterColumn title="Company" links={footerNavigation.company} />
          <FooterColumn title="Product" links={footerNavigation.product} />
          <div>
            <FooterColumn title="Legal" links={footerNavigation.legal} />
            <div className="mt-6">
              <h3 className="font-mono text-[9px] font-semibold tracking-[0.2em] text-white/35 uppercase">
                Contact
              </h3>
              <a
                href={`mailto:${siteConfig.email}`}
                className="mt-4 inline-flex text-[12.5px] text-white/45 transition-colors hover:text-white"
              >
                {siteConfig.email}
              </a>
            </div>
          </div>
        </div>

        <div className="mt-12 flex flex-col gap-3 border-t border-white/8 pt-6 text-[10.5px] leading-relaxed text-white/35 sm:flex-row sm:items-center sm:justify-between">
          <p>© {year} Qodeax. All rights reserved.</p>
          <p className="sm:text-right">
            Interfaces shown on this site are illustrative unless stated otherwise.
          </p>
        </div>

        <div
          aria-hidden="true"
          className="pointer-events-none relative mt-10 flex justify-center overflow-hidden select-none"
        >
          <span className="bg-gradient-to-b from-white/[0.055] to-white/[0.01] bg-clip-text font-heading text-[clamp(5rem,19vw,16rem)] leading-[0.78] font-semibold tracking-[-0.075em] text-transparent">
            QODEAX
          </span>
        </div>
      </Container>
    </footer>
  );
}
