import { Section } from "@/components/layout/Section";
import { Reveal } from "@/components/ui/Reveal";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { technologyGroups } from "@/data/home";

export function TechnologyStack() {
  return (
    <Section id="technologies">
      <div className="grid gap-8 lg:grid-cols-[0.9fr_1.1fr] lg:gap-16">
        <Reveal>
          <SectionHeading
            eyebrow="Technologies & expertise"
            title="Modern tools, chosen for the problem."
            description="We are not tied to a single stack. These are the technologies we use most often to ship reliable products and keep them maintainable."
            titleClassName="max-w-md"
          />
        </Reveal>

        <Reveal delay={100}>
          <div className="grid gap-px overflow-hidden rounded-3xl border border-line bg-line sm:grid-cols-2">
            {technologyGroups.map((group) => (
              <div key={group.title} className="bg-surface p-5 sm:p-6">
                <h3 className="text-[10px] font-semibold tracking-[0.16em] text-ink-muted uppercase">
                  {group.title}
                </h3>
                <ul className="mt-4 flex flex-wrap gap-1.5">
                  {group.items.map((item) => (
                    <li
                      key={item}
                      className="rounded-full border border-line bg-canvas px-2.5 py-1 text-[11.5px] font-medium text-ink-soft"
                    >
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </Reveal>
      </div>
    </Section>
  );
}
