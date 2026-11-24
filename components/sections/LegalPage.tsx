import type { ReactNode } from "react";
import { ArrowUpRight } from "lucide-react";
import { Container } from "@/components/layout/Container";
import { ButtonLink } from "@/components/ui/Button";
import { Card } from "@/components/ui/Card";
import { PageHeader } from "@/components/ui/PageHeader";
import { siteConfig } from "@/data/site";

export interface LegalSection {
  title: string;
  paragraphs?: string[];
  bullets?: string[];
  cards?: { title: string; description: string }[];
}

interface LegalPageProps {
  eyebrow: string;
  title: string;
  description: string;
  updated: string;
  sections: LegalSection[];
  contactTitle?: string;
  contactDescription?: string;
  children?: ReactNode;
}

export function LegalPage({
  eyebrow,
  title,
  description,
  updated,
  sections,
  contactTitle = "Questions about this policy?",
  contactDescription = "Email us and we will respond as quickly as we can.",
}: LegalPageProps) {
  return (
    <>
      <PageHeader eyebrow={eyebrow} title={title} description={description}>
        <span className="inline-flex h-9 items-center rounded-full border border-line bg-surface px-4 text-[12px] text-ink-caption">
          Last updated: <span className="ml-1.5 font-medium text-ink">{updated}</span>
        </span>
      </PageHeader>

      <section className="pb-20 sm:pb-24 lg:pb-28">
        <Container>
          <div className="mx-auto max-w-4xl space-y-4">
            {sections.map((section) => (
              <Card key={section.title} className="p-6 sm:p-8">
                <h2 className="font-heading text-[1.35rem] leading-snug font-semibold tracking-[-0.025em] text-ink">
                  {section.title}
                </h2>

                {section.paragraphs?.map((paragraph) => (
                  <p
                    key={paragraph}
                    className="mt-3 text-[14px] leading-relaxed text-ink-soft"
                  >
                    {paragraph}
                  </p>
                ))}

                {section.bullets?.length ? (
                  <ul className="mt-4 grid gap-2">
                    {section.bullets.map((bullet) => (
                      <li
                        key={bullet}
                        className="flex items-start gap-2 text-[13.5px] leading-relaxed text-ink-soft"
                      >
                        <span
                          className="mt-2 size-1.5 shrink-0 rounded-full bg-brand"
                          aria-hidden="true"
                        />
                        {bullet}
                      </li>
                    ))}
                  </ul>
                ) : null}

                {section.cards?.length ? (
                  <div className="mt-4 grid gap-2 sm:grid-cols-2">
                    {section.cards.map((card) => (
                      <div
                        key={card.title}
                        className="rounded-xl border border-line bg-surface-soft p-4"
                      >
                        <h3 className="text-[13px] font-semibold text-ink">
                          {card.title}
                        </h3>
                        <p className="mt-1 text-[12px] leading-relaxed text-ink-caption">
                          {card.description}
                        </p>
                      </div>
                    ))}
                  </div>
                ) : null}
              </Card>
            ))}

            <Card className="p-6 sm:p-8">
              <h2 className="font-heading text-[1.35rem] leading-snug font-semibold tracking-[-0.025em] text-ink">
                {contactTitle}
              </h2>
              <p className="mt-2 text-[14px] leading-relaxed text-ink-soft">
                {contactDescription}
              </p>
              <div className="mt-5 flex flex-col gap-2 sm:flex-row">
                <ButtonLink href={`mailto:${siteConfig.email}`} size="md">
                  Email Qodeax
                  <ArrowUpRight className="size-3.5" aria-hidden="true" />
                </ButtonLink>
                <ButtonLink href="/#contact" variant="secondary" size="md">
                  Use the project form
                </ButtonLink>
              </div>
              <p className="mt-4 text-[11px] text-ink-caption">
                Qodeax · {siteConfig.email}
              </p>
            </Card>
          </div>
        </Container>
      </section>
    </>
  );
}
