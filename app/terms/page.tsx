import type { Metadata } from "next";
import { LegalPage } from "@/components/sections/LegalPage";

export const metadata: Metadata = {
  title: "Terms & Conditions",
  description:
    "The terms that apply when you use the Qodeax website or engage Qodeax for software engineering services.",
  alternates: { canonical: "/terms" },
};

export default function TermsPage() {
  return (
    <LegalPage
      eyebrow="Legal terms"
      title="Terms & Conditions"
      description="The terms that apply when you use our website or engage Qodeax for a project."
      updated="25 November 2026"
      sections={[
        {
          title: "Agreement to terms",
          paragraphs: [
            "By accessing this website or engaging Qodeax for services, you agree to these Terms and Conditions. If you do not agree, please do not use the website or our services.",
          ],
        },
        {
          title: "Service terms",
          bullets: [
            "We provide software engineering, product design, and related consulting services as described in individual project agreements.",
            "Each project has its own scope, deliverables, timeline, and payment terms, agreed in writing before work begins.",
            "Revisions are included as specified in the project agreement. Significant scope changes may require additional time and cost.",
            "Verbal agreements are not binding until formalized in writing.",
          ],
        },
        {
          title: "Intellectual property",
          paragraphs: [
            "You retain ownership of materials you provide. On completion and final payment, ownership of the delivered work transfers to you, subject to any third-party licenses.",
          ],
          cards: [
            {
              title: "Client materials",
              description: "You keep ownership of the content, data, and assets you provide.",
            },
            {
              title: "Delivered work",
              description: "Final deliverables transfer to you once the agreed fees are paid.",
            },
            {
              title: "Our tools",
              description: "Internal tools, frameworks, and general know-how remain ours.",
            },
            {
              title: "Third-party assets",
              description: "Licenses for fonts, images, or services are your responsibility unless agreed otherwise.",
            },
          ],
        },
        {
          title: "Payment terms",
          bullets: [
            "A deposit may be required to begin work, as stated in the project agreement.",
            "The balance is due according to the milestone or completion terms in that agreement.",
            "Late payments may incur additional fees or a pause in delivery.",
            "Prices are quoted in the currency stated in the proposal unless otherwise agreed.",
          ],
        },
        {
          title: "Limitation of liability",
          paragraphs: [
            "To the fullest extent permitted by law, Qodeax's total liability for claims arising from our services will not exceed the amount paid for the specific services giving rise to the claim.",
            "We are not liable for indirect or consequential losses, including loss of profits, data, or business opportunities. You agree to indemnify Qodeax against claims arising from your use of the services or breach of these terms.",
          ],
        },
        {
          title: "Termination and cancellation",
          paragraphs: [
            "Either party may terminate an engagement with written notice. You remain responsible for payment for work completed up to the termination date. Deposits are non-refundable for work already completed.",
          ],
        },
        {
          title: "Portfolio use",
          paragraphs: [
            "Unless agreed otherwise in writing, Qodeax may reference completed work in its portfolio and marketing materials. We will not publish confidential information without permission.",
          ],
        },
        {
          title: "Changes to these terms",
          paragraphs: [
            "We may update these terms from time to time. Continued use of the website or services after changes are published constitutes acceptance of the updated terms.",
          ],
        },
      ]}
      contactTitle="Questions about these terms?"
      contactDescription="If anything here is unclear, email us before engaging our services and we will walk through it with you."
    />
  );
}
