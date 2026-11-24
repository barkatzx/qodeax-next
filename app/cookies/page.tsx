import type { Metadata } from "next";
import { LegalPage } from "@/components/sections/LegalPage";

export const metadata: Metadata = {
  title: "Cookie Policy",
  description:
    "How Qodeax uses cookies and similar technologies for consent, analytics, and website performance.",
  alternates: { canonical: "/cookies" },
};

export default function CookiePolicyPage() {
  return (
    <LegalPage
      eyebrow="Cookies & tracking"
      title="Cookie Policy"
      description="How Qodeax uses cookies and similar technologies to operate the website and understand visitor activity."
      updated="25 November 2026"
      sections={[
        {
          title: "What are cookies?",
          paragraphs: [
            "Cookies are small text files stored on your device when you visit a website. They help websites remember information, operate securely, measure performance, and provide a better browsing experience.",
          ],
        },
        {
          title: "Types of cookies we use",
          cards: [
            {
              title: "Strictly necessary",
              description:
                "Required for core functions such as security, page navigation, consent storage, and basic site operation.",
            },
            {
              title: "Analytics",
              description:
                "Google Analytics helps us understand which pages are viewed, how visitors arrive, and how the site can be improved.",
            },
            {
              title: "Preferences",
              description:
                "These may remember choices you make, such as cookie consent preferences, for a more consistent experience.",
            },
            {
              title: "Third-party",
              description:
                "Some cookies may be set by trusted providers such as Google Analytics and CookieYes, subject to their own policies.",
            },
          ],
        },
        {
          title: "Google Analytics",
          paragraphs: [
            "We use Google Analytics to collect aggregated information about how visitors interact with our website. This may include pages visited, approximate location, browser type, device type, referral source, session duration, and other usage metrics.",
            "This website uses Google Analytics measurement ID G-2Z897PR04V. Google processes analytics data according to its own privacy and data processing terms.",
          ],
        },
        {
          title: "Consent management",
          paragraphs: [
            "We use CookieYes to display our cookie consent banner and manage your preferences. CookieYes may store your choices so that we can respect them when you revisit the site. You can update your choices through the consent banner or by clearing cookies in your browser.",
          ],
        },
        {
          title: "Managing your preferences",
          bullets: [
            "Accept or reject non-essential cookies where consent controls are available.",
            "Change your preferences through the CookieYes consent banner.",
            "Disable or delete cookies using your browser settings.",
            "Use browser privacy tools or analytics opt-out tools where available.",
            "Contact us with any question about cookies or tracking technologies.",
          ],
        },
        {
          title: "Changes to this policy",
          paragraphs: [
            "We may update this Cookie Policy to reflect changes in technology, legal requirements, or our website practices. The latest version will always be available on this page.",
          ],
        },
      ]}
      contactTitle="Questions about cookies?"
      contactDescription="If you have a question about cookies, analytics, or consent, email us and we will help."
    />
  );
}
