import { Section } from "@/components/layout/Section";
import { Reveal } from "@/components/ui/Reveal";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { technologyGroups } from "@/data/home";

export function TechnologyStack() {
  return (
    <Section
      id="technologies"
      className="relative overflow-hidden border-y border-white/5 bg-dark text-white"
    >
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 bg-grid-dark opacity-45"
      />
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -right-32 top-1/4 size-[600px] rounded-full bg-[radial-gradient(closest-side,rgba(58,222,150,0.14),transparent_72%)] blur-2xl"
      />
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -left-24 bottom-0 size-[420px] rounded-full bg-[radial-gradient(closest-side,rgba(58,222,150,0.08),transparent_72%)] blur-2xl"
      />
      <div aria-hidden="true" className="noise-texture-dark pointer-events-none absolute inset-0" />

      <div className="relative grid gap-10 lg:grid-cols-[0.88fr_1.12fr] lg:gap-16">
        <Reveal>
          <div>
            <SectionHeading
              eyebrow="Technologies & expertise"
              title="Modern tools, chosen for the problem."
              description="We are not tied to a single stack. These are the technologies we use most often to ship reliable products and keep them maintainable."
              titleClassName="max-w-md"
              tone="dark"
            />

            <div className="mt-9 flex items-center gap-4 border-t border-white/10 pt-5">
              <span className="font-heading text-[2.6rem] leading-none font-semibold tracking-[-0.05em] text-white/15">
                {String(technologyGroups.length).padStart(2, "0")}
              </span>
              <div>
                <p className="font-mono text-[9px] tracking-[0.18em] text-white/40 uppercase">
                  Stack groups
                </p>
                <p className="mt-1 text-[11.5px] text-white/30">
                  Frontend → backend → AI → cloud
                </p>
              </div>
            </div>
          </div>
        </Reveal>

        <Reveal delay={100}>
          <div className="grid gap-2.5 sm:grid-cols-2">
            {technologyGroups.map((group, index) => (
              <div
                key={group.title}
                className="group relative overflow-hidden rounded-2xl border border-white/8 bg-white/[0.03] p-5 transition-colors duration-500 hover:border-brand/25 hover:bg-white/[0.05] sm:p-6"
              >
                <div className="flex items-start justify-between gap-3">
                  <h3 className="font-mono text-[9.5px] font-semibold tracking-[0.18em] text-white/45 uppercase">
                    {group.title}
                  </h3>
                  <span className="font-mono text-[9px] text-white/20">
                    0{index + 1}
                  </span>
                </div>
                <ul className="mt-4 flex flex-wrap gap-1.5">
                  {group.items.map((item) => (
                    <li
                      key={item}
                      className="rounded-full border border-white/10 bg-white/[0.03] px-2.5 py-1 text-[11px] font-medium text-white/60 transition-colors duration-300 hover:border-brand/40 hover:bg-brand/10 hover:text-brand"
                    >
                      {item}
                    </li>
                  ))}
                </ul>
                <span
                  aria-hidden="true"
                  className="absolute inset-x-0 bottom-0 h-px origin-left scale-x-0 bg-gradient-to-r from-brand to-transparent transition-transform duration-500 group-hover:scale-x-100"
                />
              </div>
            ))}
          </div>
        </Reveal>
      </div>

      <div className="relative mt-12 flex items-center gap-3 border-t border-white/8 pt-5">
        <span className="size-1 rounded-full bg-brand/70" aria-hidden="true" />
        <span className="font-mono text-[8.5px] tracking-[0.18em] text-white/30 uppercase">
          Built to be maintained
        </span>
        <span className="h-px flex-1 bg-white/8" aria-hidden="true" />
        <span className="font-mono text-[8.5px] tracking-[0.18em] text-white/20 uppercase">
          Qodeax / stack
        </span>
      </div>
    </Section>
  );
}
