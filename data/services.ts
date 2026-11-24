import {
  Bot,
  Code2,
  Layers,
  Rocket,
  Smartphone,
  Workflow,
  type LucideIcon,
} from "lucide-react";

export interface Service {
  title: string;
  description: string;
  icon: LucideIcon;
  tags: string[];
}

export const services: Service[] = [
  {
    title: "Custom Software Development",
    description:
      "Internal tools, client portals, and operational systems built around how your business actually works — not around a template.",
    icon: Code2,
    tags: ["Web applications", "APIs", "Internal tools"],
  },
  {
    title: "SaaS Platform Development",
    description:
      "Multi-tenant products with the foundations SaaS needs: accounts, roles, billing, dashboards, reporting, and integrations.",
    icon: Layers,
    tags: ["Multi-tenant", "Billing", "Dashboards"],
  },
  {
    title: "AI-Powered Products",
    description:
      "Practical AI features that reduce manual work and support better decisions, from document workflows to embedded assistants.",
    icon: Bot,
    tags: ["LLM features", "Automation", "Data workflows"],
  },
  {
    title: "Web & Mobile Applications",
    description:
      "Fast, accessible applications built with React, Next.js, and TypeScript, with cross-platform mobile when your users need it.",
    icon: Smartphone,
    tags: ["Next.js", "React Native", "TypeScript"],
  },
  {
    title: "MVP Development",
    description:
      "A focused first release that validates your core idea with real users, without building the wrong thing at scale.",
    icon: Rocket,
    tags: ["Product validation", "Rapid delivery", "Iteration"],
  },
  {
    title: "Business Automation",
    description:
      "Connect the tools your team already uses, remove repetitive steps, and make routine operations easier to run and measure.",
    icon: Workflow,
    tags: ["Integrations", "Workflows", "Operations"],
  },
];

export const whyQodeax = [
  {
    title: "Product thinking, not ticket-taking",
    description:
      "We question the brief, map the workflow, and help you decide what is worth building first.",
    icon: Layers,
  },
  {
    title: "Senior engineers, direct access",
    description:
      "You work with the people designing and shipping the product — not a layer of account managers.",
    icon: Code2,
  },
  {
    title: "Milestone-based delivery",
    description:
      "Work is broken into reviewable increments, so progress is visible and feedback arrives early.",
    icon: Rocket,
  },
  {
    title: "Built to be maintained",
    description:
      "Clean architecture, documentation, and handover are part of the work, not an afterthought.",
    icon: Workflow,
  },
];
