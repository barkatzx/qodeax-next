import Link from "next/link";
import { ArrowLeft, ArrowUpRight } from "lucide-react";
import { Container } from "@/components/layout/Container";
import { ButtonLink } from "@/components/ui/Button";
import { LogoMark } from "@/components/ui/Logo";

export default function NotFound() {
  return (
    <section className="relative overflow-hidden py-24 sm:py-32">
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-x-0 top-0 h-[420px] bg-[radial-gradient(60%_60%_at_50%_0%,rgba(58,222,150,0.14),transparent_72%)]"
      />
      <Container className="relative">
        <div className="mx-auto flex max-w-2xl flex-col items-center text-center">
          <LogoMark className="size-12" />
          <p className="mt-8 font-heading text-[5rem] leading-none font-semibold tracking-[-0.06em] text-ink/10 sm:text-[8rem]">
            404
          </p>
          <h1 className="mt-2 font-heading text-[2rem] leading-tight font-semibold tracking-[-0.04em] text-ink sm:text-[2.75rem]">
            This page does not exist.
          </h1>
          <p className="mt-4 max-w-md text-[15px] leading-relaxed text-ink-soft">
            The link may be out of date, or the page may have moved. Start from the homepage or browse our work.
          </p>

          <h2 className="sr-only">Helpful links</h2>
          <div className="mt-8 flex w-full flex-col justify-center gap-2.5 sm:w-auto sm:flex-row">
            <ButtonLink href="/" size="lg" className="w-full sm:w-auto">
              Back to home
              <ArrowUpRight className="size-4" aria-hidden="true" />
            </ButtonLink>
            <ButtonLink href="/projects" variant="secondary" size="lg" className="w-full sm:w-auto">
              View projects
            </ButtonLink>
          </div>

          <Link
            href="/blogs"
            className="mt-6 inline-flex items-center gap-1.5 text-[12px] font-medium text-ink-caption transition-colors hover:text-ink"
          >
            <ArrowLeft className="size-3" aria-hidden="true" />
            Or read the blog
          </Link>
        </div>
      </Container>
    </section>
  );
}
