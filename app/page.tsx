import type { Metadata } from "next";
import { AboutSection } from "@/components/sections/AboutSection";
import { ContactSection } from "@/components/sections/ContactSection";
import { FAQSection } from "@/components/sections/FAQSection";
import { FeatureGrid } from "@/components/sections/FeatureGrid";
import { HeroSection } from "@/components/sections/HeroSection";
import { ProcessSection } from "@/components/sections/ProcessSection";
import { ProductShowcase } from "@/components/sections/ProductShowcase";
import { ProjectsPreview } from "@/components/sections/ProjectsPreview";
import { ServicesSection } from "@/components/sections/ServicesSection";
import { TechnologyStack } from "@/components/sections/TechnologyStack";
import { siteConfig } from "@/data/site";
import { getLatestProjects } from "@/lib/content";

export const metadata: Metadata = {
  title: { absolute: "Qodeax — Software Engineering Agency" },
  description: siteConfig.seoDescription,
  alternates: { canonical: "/" },
};

export default async function HomePage() {
  const projects = await getLatestProjects();

  const structuredData = {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: "Qodeax",
    url: siteConfig.url,
    description: siteConfig.seoDescription,
    email: siteConfig.email,
    sameAs: [siteConfig.links.linkedin, siteConfig.links.github],
    knowsAbout: [
      "Custom software development",
      "SaaS platform development",
      "AI-powered products",
      "Web application development",
      "Mobile application development",
      "MVP development",
      "Business automation",
    ],
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
      />
      <HeroSection />
      <AboutSection />
      <ServicesSection />
      <ProductShowcase />
      <FeatureGrid />
      <ProcessSection />
      <TechnologyStack />
      <ProjectsPreview projects={projects} />
      <FAQSection />
      <ContactSection />
    </>
  );
}
