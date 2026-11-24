"use client";

import { useEffect, useState, type FormEvent } from "react";
import emailjs from "emailjs-com";
import { CircleAlert, CircleCheck, LoaderCircle, Send } from "lucide-react";
import { Button, ButtonLink } from "@/components/ui/Button";
import { siteConfig } from "@/data/site";
import { cn } from "@/lib/utils";

type ProjectType =
  | "website"
  | "web-app"
  | "saas"
  | "ai"
  | "mobile-app"
  | "automation"
  | "mvp";

type BudgetRange = "300-1k" | "1k-3k" | "3k-10k" | "10k+";
type Timeline = "asap" | "2-4weeks" | "1-3months" | "3+months";
type CompanySize = "1-10" | "11-50" | "51-200" | "201+";
type Source = "google" | "linkedin" | "github" | "referral" | "social" | "other";

interface FormData {
  name: string;
  email: string;
  company: string;
  projectType: ProjectType | "";
  budget: BudgetRange | "";
  timeline: Timeline | "";
  companySize: CompanySize | "";
  source: Source | "";
  projectDetails: string;
}

const projectTypes: { id: ProjectType; label: string }[] = [
  { id: "website", label: "Corporate website" },
  { id: "web-app", label: "Web application" },
  { id: "saas", label: "SaaS platform" },
  { id: "ai", label: "AI-powered product" },
  { id: "mobile-app", label: "Mobile application" },
  { id: "automation", label: "Business automation" },
  { id: "mvp", label: "MVP" },
];

const budgetRanges: { id: BudgetRange; label: string }[] = [
  { id: "300-1k", label: "$300 – $1,000" },
  { id: "1k-3k", label: "$1,000 – $3,000" },
  { id: "3k-10k", label: "$3,000 – $10,000" },
  { id: "10k+", label: "$10,000+ / strategic partnership" },
];

const timelines: { id: Timeline; label: string }[] = [
  { id: "asap", label: "As soon as possible" },
  { id: "2-4weeks", label: "2–4 weeks" },
  { id: "1-3months", label: "1–3 months" },
  { id: "3+months", label: "3+ months" },
];

const companySizes: { id: CompanySize; label: string }[] = [
  { id: "1-10", label: "Startup (1–10)" },
  { id: "11-50", label: "Small business (11–50)" },
  { id: "51-200", label: "Mid-market (51–200)" },
  { id: "201+", label: "Enterprise (201+)" },
];

const sources: { id: Source; label: string }[] = [
  { id: "google", label: "Google" },
  { id: "linkedin", label: "LinkedIn" },
  { id: "github", label: "GitHub" },
  { id: "referral", label: "Referral" },
  { id: "social", label: "Social media" },
  { id: "other", label: "Other" },
];

const initialForm: FormData = {
  name: "",
  email: "",
  company: "",
  projectType: "",
  budget: "",
  timeline: "",
  companySize: "",
  source: "",
  projectDetails: "",
};

const fieldClassName =
  "h-11 w-full rounded-xl border border-line bg-surface px-3.5 text-[13.5px] text-ink placeholder:text-ink-muted/60 transition-colors focus:border-brand-strong focus:outline-none focus:ring-2 focus:ring-brand/20";

export function ContactForm() {
  const [formData, setFormData] = useState<FormData>(initialForm);
  const [status, setStatus] = useState<"idle" | "submitting" | "sent" | "error">("idle");
  const [errorMessage, setErrorMessage] = useState("");

  useEffect(() => {
    const userId = process.env.NEXT_PUBLIC_USER_ID;
    if (userId) emailjs.init(userId);
  }, []);

  const update = <Key extends keyof FormData>(key: Key, value: FormData[Key]) => {
    setFormData((current) => ({ ...current, [key]: value }));
  };

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const serviceId = process.env.NEXT_PUBLIC_SERVICE_ID;
    const templateId = process.env.NEXT_PUBLIC_TEMPLATE_ID;

    if (!serviceId || !templateId || !process.env.NEXT_PUBLIC_USER_ID) {
      setStatus("error");
      setErrorMessage(
        `The form is not configured on this environment. Please email ${siteConfig.email} instead.`,
      );
      return;
    }

    setStatus("submitting");
    setErrorMessage("");

    try {
      await emailjs.send(serviceId, templateId, {
        to_name: "Qodeax",
        from_name: formData.name,
        from_email: formData.email,
        from_company: formData.company,
        project_type: projectTypes.find((item) => item.id === formData.projectType)?.label,
        budget: budgetRanges.find((item) => item.id === formData.budget)?.label,
        timeline: timelines.find((item) => item.id === formData.timeline)?.label,
        company_size: companySizes.find((item) => item.id === formData.companySize)?.label,
        source: sources.find((item) => item.id === formData.source)?.label,
        details: formData.projectDetails || "Not provided",
      });

      setStatus("sent");
    } catch {
      setStatus("error");
      setErrorMessage(
        `Something went wrong while sending the form. Please email ${siteConfig.email} and we will pick it up from there.`,
      );
    }
  };

  if (status === "sent") {
    return (
      <div className="flex h-full min-h-[420px] flex-col items-center justify-center rounded-3xl border border-line bg-surface p-8 text-center">
        <span className="flex size-14 items-center justify-center rounded-full bg-brand-soft text-brand-deep">
          <CircleCheck className="size-6" aria-hidden="true" />
        </span>
        <h3 className="mt-5 font-heading text-2xl font-semibold tracking-[-0.03em] text-ink">
          Thanks — your note is on its way.
        </h3>
        <p className="mt-3 max-w-sm text-sm leading-relaxed text-ink-muted">
          We will review the details and aim to reply within one business day. If it is urgent, email{" "}
          <a href={`mailto:${siteConfig.email}`} className="font-medium text-brand-deep underline">
            {siteConfig.email}
          </a>
          .
        </p>
        <Button
          variant="secondary"
          size="md"
          className="mt-6"
          onClick={() => {
            setFormData(initialForm);
            setStatus("idle");
          }}
        >
          Send another message
        </Button>
      </div>
    );
  }

  return (
    <form
      onSubmit={handleSubmit}
      className="rounded-3xl border border-line bg-surface p-5 shadow-[var(--shadow-soft)] sm:p-7"
    >
      <div className="flex items-start justify-between gap-4">
        <div>
          <h3 className="font-heading text-xl font-semibold tracking-[-0.025em] text-ink">
            Tell us about the project
          </h3>
          <p className="mt-1.5 text-[12.5px] leading-relaxed text-ink-soft">
            A few details help us come prepared to the first conversation.
          </p>
        </div>
        <span className="hidden shrink-0 rounded-full bg-brand-soft px-2.5 py-1 text-[9px] font-semibold tracking-[0.12em] text-brand-deep uppercase sm:inline-flex">
          1-day reply target
        </span>
      </div>

      <div className="mt-6 grid gap-4 sm:grid-cols-2">
        <label className="block">
          <span className="text-[12px] font-medium text-ink-soft">Full name *</span>
          <input
            className={cn(fieldClassName, "mt-1.5")}
            type="text"
            name="name"
            autoComplete="name"
            required
            value={formData.name}
            onChange={(event) => update("name", event.target.value)}
            placeholder="Your name"
          />
        </label>

        <label className="block">
          <span className="text-[12px] font-medium text-ink-soft">Work email *</span>
          <input
            className={cn(fieldClassName, "mt-1.5")}
            type="email"
            name="email"
            autoComplete="email"
            required
            value={formData.email}
            onChange={(event) => update("email", event.target.value)}
            placeholder="you@company.com"
          />
        </label>

        <label className="block sm:col-span-2">
          <span className="text-[12px] font-medium text-ink-soft">Company / organization *</span>
          <input
            className={cn(fieldClassName, "mt-1.5")}
            type="text"
            name="company"
            autoComplete="organization"
            required
            value={formData.company}
            onChange={(event) => update("company", event.target.value)}
            placeholder="Company name"
          />
        </label>

        <label className="block">
          <span className="text-[12px] font-medium text-ink-soft">Project type *</span>
          <select
            className={cn(fieldClassName, "mt-1.5")}
            name="projectType"
            required
            value={formData.projectType}
            onChange={(event) => update("projectType", event.target.value as ProjectType)}
          >
            <option value="">Select a project type</option>
            {projectTypes.map((type) => (
              <option key={type.id} value={type.id}>
                {type.label}
              </option>
            ))}
          </select>
        </label>

        <label className="block">
          <span className="text-[12px] font-medium text-ink-soft">Budget range *</span>
          <select
            className={cn(fieldClassName, "mt-1.5")}
            name="budget"
            required
            value={formData.budget}
            onChange={(event) => update("budget", event.target.value as BudgetRange)}
          >
            <option value="">Select a range</option>
            {budgetRanges.map((range) => (
              <option key={range.id} value={range.id}>
                {range.label}
              </option>
            ))}
          </select>
        </label>

        <label className="block">
          <span className="text-[12px] font-medium text-ink-soft">Timeline</span>
          <select
            className={cn(fieldClassName, "mt-1.5")}
            name="timeline"
            value={formData.timeline}
            onChange={(event) => update("timeline", event.target.value as Timeline)}
          >
            <option value="">Select a timeline</option>
            {timelines.map((timeline) => (
              <option key={timeline.id} value={timeline.id}>
                {timeline.label}
              </option>
            ))}
          </select>
        </label>

        <label className="block">
          <span className="text-[12px] font-medium text-ink-soft">Company size</span>
          <select
            className={cn(fieldClassName, "mt-1.5")}
            name="companySize"
            value={formData.companySize}
            onChange={(event) => update("companySize", event.target.value as CompanySize)}
          >
            <option value="">Select company size</option>
            {companySizes.map((size) => (
              <option key={size.id} value={size.id}>
                {size.label}
              </option>
            ))}
          </select>
        </label>

        <label className="block sm:col-span-2">
          <span className="text-[12px] font-medium text-ink-soft">How did you hear about us?</span>
          <select
            className={cn(fieldClassName, "mt-1.5")}
            name="source"
            value={formData.source}
            onChange={(event) => update("source", event.target.value as Source)}
          >
            <option value="">Select a source</option>
            {sources.map((source) => (
              <option key={source.id} value={source.id}>
                {source.label}
              </option>
            ))}
          </select>
        </label>

        <label className="block sm:col-span-2">
          <span className="text-[12px] font-medium text-ink-soft">Project context</span>
          <textarea
            className={cn(fieldClassName, "mt-1.5 h-auto min-h-[104px] resize-y py-3")}
            name="projectDetails"
            rows={4}
            value={formData.projectDetails}
            onChange={(event) => update("projectDetails", event.target.value)}
            placeholder="What are you trying to build, improve, or replace?"
          />
        </label>
      </div>

      {status === "error" ? (
        <div
          role="alert"
          className="mt-4 flex items-start gap-2 rounded-xl border border-danger/25 bg-danger/8 p-3 text-[12px] leading-relaxed text-danger"
        >
          <CircleAlert className="mt-0.5 size-3.5 shrink-0" aria-hidden="true" />
          {errorMessage}
        </div>
      ) : null}

      <div className="mt-6 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <p className="text-[10.5px] leading-relaxed text-ink-soft">
          By sending this form you agree to our{" "}
          <ButtonLink
            href="/privacy"
            variant="ghost"
            size="sm"
            className="inline h-auto p-0 text-[10.5px] font-medium text-brand-deep underline hover:bg-transparent"
          >
            privacy policy
          </ButtonLink>
          .
        </p>
        <Button type="submit" size="md" disabled={status === "submitting"} className="w-full sm:w-auto">
          {status === "submitting" ? (
            <>
              <LoaderCircle className="size-4 animate-spin" aria-hidden="true" />
              Sending…
            </>
          ) : (
            <>
              Send project brief
              <Send className="size-3.5" aria-hidden="true" />
            </>
          )}
        </Button>
      </div>
    </form>
  );
}
