const phone = process.env.NEXT_PUBLIC_PHONE_NUMBER;

export const siteConfig = {
  name: "Qodeax",
  tagline: "Software engineering for ambitious products.",
  description:
    "Qodeax is a software engineering agency helping startups and growing businesses design, build, and scale custom software, SaaS platforms, AI-powered products, and business automation.",
  seoDescription:
    "Qodeax builds custom software, SaaS platforms, AI products, and business automation for startups and growing teams.",
  url: process.env.NEXT_PUBLIC_SITE_URL ?? "https://qodeax.com",
  email: "barkatullah.zx@gmail.com",
  calendly: "https://calendly.com/barkatzx",
  links: {
    contact: "/#contact",
    products: "/products",
    projects: "/projects",
    blog: "/blogs",
    privacy: "/privacy",
    terms: "/terms",
    cookies: "/cookies",
    linkedin: "https://linkedin.com/company/qodeax",
    github: "https://github.com/qodeax",
    whatsapp: phone
      ? `https://wa.me/${phone.replace(/[^0-9]/g, "")}`
      : null,
  },
} as const;

export type SiteConfig = typeof siteConfig;
