import type { Metadata } from "next";
import { LegalPage } from "@/components/sections/LegalPage";

export const metadata: Metadata = {
  title: "Privacy Policy",
  description:
    "How Qodeax collects, uses, and protects personal information when you use our website and services.",
  alternates: { canonical: "/privacy" },
};

export default function PrivacyPolicyPage() {
  return (
    <LegalPage
      eyebrow="Privacy & security"
      title="Privacy Policy"
      description="How Qodeax collects, uses, and protects the information you share with us."
      updated="25 November 2026"
      sections={[
        {
          title: "Our commitment to privacy",
          paragraphs: [
            "Qodeax takes your privacy seriously. This policy explains how we collect, use, and protect personal information when you visit our website, contact us, or use our services.",
          ],
        },
        {
          title: "Information we collect",
          paragraphs: [
            "We aim to collect only what we need to respond to you and operate our services.",
          ],
          bullets: [
            "Contact details you provide, such as your name, email address, phone number, and company.",
            "Project information you share when you send a brief or request a proposal.",
            "Usage information such as pages visited, approximate location, browser type, and device information.",
            "Cookies and similar technologies used for consent, analytics, and site performance.",
          ],
        },
        {
          title: "How we use your information",
          bullets: [
            "To respond to enquiries and prepare proposals or project estimates.",
            "To deliver and support the services you have engaged us for.",
            "To improve the website, content, and user experience.",
            "To meet legal, accounting, and security obligations.",
            "We never sell your personal data to third parties.",
          ],
        },
        {
          title: "Data security",
          paragraphs: [
            "We use reasonable technical and organizational measures to protect personal information from unauthorized access, alteration, disclosure, or destruction.",
          ],
          cards: [
            {
              title: "Encryption in transit",
              description: "Data sent between your browser and our website is protected with HTTPS.",
            },
            {
              title: "Access control",
              description: "Access to project and contact information is limited to people who need it.",
            },
            {
              title: "Service providers",
              description: "We use reputable providers for hosting, analytics, forms, and content management.",
            },
            {
              title: "Retention",
              description: "We keep information only as long as needed for the purpose it was collected.",
            },
          ],
        },
        {
          title: "Your privacy rights",
          paragraphs: [
            "Depending on where you live, you may have rights regarding your personal data, including the right to access, correct, delete, or restrict its processing.",
          ],
          bullets: [
            "Request a copy of the personal data we hold about you.",
            "Ask us to correct inaccurate information.",
            "Ask us to delete information that is no longer needed.",
            "Object to or restrict certain processing activities.",
            "Contact us with any privacy-related question or concern.",
          ],
        },
        {
          title: "Third-party services",
          paragraphs: [
            "Our website uses services such as Google Analytics, CookieYes, Vercel, and Sanity. These providers process data according to their own privacy policies. Links to external websites are provided for convenience, and we are not responsible for their privacy practices.",
          ],
        },
        {
          title: "Changes to this policy",
          paragraphs: [
            "We may update this policy from time to time. The latest version will always be available on this page with the updated date shown above.",
          ],
        },
      ]}
      contactTitle="Contact us about privacy"
      contactDescription="If you have a question about this policy or how your information is handled, email us and we will respond within a reasonable time."
    />
  );
}
