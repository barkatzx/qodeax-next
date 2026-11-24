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
        className="inline-flex items-center gap-1 text-[13px] text-white/55 transition-colors hover:text-white"
      >
        {label}
        <ArrowUpRight className="size-3 opacity-60" aria-hidden="true" />
      </a>
    );
  }

  return (
    <Link
      href={href}
      className="text-[13px] text-white/55 transition-colors hover:text-white"
    >
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
      <h3 className="text-[11px] font-semibold tracking-[0.18em] text-white/55 uppercase">
        {title}
      </h3>
      <ul className="mt-4 space-y-3">
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
    <footer className="border-t border-white/8 bg-dark text-white">
      <Container className="py-14 lg:py-18">
        <div className="grid gap-10 sm:grid-cols-2 lg:grid-cols-[1.6fr_1fr_1fr_1fr] lg:gap-12">
          <div className="max-w-sm">
            <Link
              href="/"
              className="inline-flex rounded-md focus-visible:ring-2 focus-visible:ring-brand focus-visible:ring-offset-2 focus-visible:ring-offset-dark focus-visible:outline-none"
            >
              <Logo tone="light" />
            </Link>
            <p className="mt-5 text-[13px] leading-relaxed text-white/55">
              {siteConfig.description}
            </p>
            <div className="mt-5">
              <Badge variant="dark" dot>
                Available for new projects
              </Badge>
            </div>
            <div className="mt-6 flex items-center gap-2">
              <ButtonLink href={siteConfig.links.contact} size="sm">
                Start a project
                <ArrowUpRight className="size-3.5" aria-hidden="true" />
              </ButtonLink>
              <a
                href={`mailto:${siteConfig.email}`}
                className="flex size-9 items-center justify-center rounded-full border border-white/15 text-white/65 transition-colors hover:border-white/30 hover:text-white"
                aria-label="Email Qodeax"
              >
                <Mail className="size-3.5" />
              </a>
              <a
                href={siteConfig.links.linkedin}
                target="_blank"
                rel="noopener noreferrer"
                className="flex size-9 items-center justify-center rounded-full border border-white/15 text-white/65 transition-colors hover:border-white/30 hover:text-white"
                aria-label="Qodeax on LinkedIn"
              >
                <Linkedin className="size-3.5" />
              </a>
              <a
                href={siteConfig.links.github}
                target="_blank"
                rel="noopener noreferrer"
                className="flex size-9 items-center justify-center rounded-full border border-white/15 text-white/65 transition-colors hover:border-white/30 hover:text-white"
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
              <h3 className="text-[11px] font-semibold tracking-[0.18em] text-white/55 uppercase">
                Contact
              </h3>
              <a
                href={`mailto:${siteConfig.email}`}
                className="mt-4 inline-flex text-[13px] text-white/55 transition-colors hover:text-white"
              >
                {siteConfig.email}
              </a>
            </div>
          </div>
        </div>

        <div className="mt-12 flex flex-col gap-3 border-t border-white/8 pt-6 text-[11px] leading-relaxed text-white/55 sm:flex-row sm:items-center sm:justify-between">
          <p>
            © {year} Qodeax. All rights reserved.
          </p>
          <p className="sm:text-right">
            Product previews are illustrative. Figures and records shown are sample data.
          </p>
        </div>
      </Container>
    </footer>
  );
}
