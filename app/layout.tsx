import type { Metadata, Viewport } from "next";
import { Bricolage_Grotesque, Outfit } from "next/font/google";
import Script from "next/script";
import type { ReactNode } from "react";
import { Footer } from "@/components/layout/Footer";
import { Header } from "@/components/layout/Header";
import { MotionProvider } from "@/components/animations/MotionProvider";
import { WhatsappPopup } from "@/components/WhatsappPopup";
import { siteConfig } from "@/data/site";
import "./globals.css";

const bricolage = Bricolage_Grotesque({
  subsets: ["latin"],
  variable: "--font-bricolage",
  display: "swap",
});

const outfit = Outfit({
  subsets: ["latin"],
  variable: "--font-outfit",
  display: "swap",
});

const title = "Qodeax — Software Engineering Agency";
const description = siteConfig.seoDescription;

export const metadata: Metadata = {
  metadataBase: new URL(siteConfig.url),
  title: {
    default: title,
    template: "%s | Qodeax",
  },
  description,
  applicationName: "Qodeax",
  authors: [{ name: "Qodeax", url: siteConfig.url }],
  creator: "Qodeax",
  publisher: "Qodeax",
  keywords: [
    "software engineering agency",
    "custom software development",
    "SaaS platform development",
    "AI product development",
    "MVP development",
    "web application development",
    "mobile application development",
    "business automation",
    "Qodeax",
    "QDMS",
  ],
  alternates: {
    canonical: "/",
  },
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "/",
    siteName: "Qodeax",
    title,
    description,
  },
  twitter: {
    card: "summary_large_image",
    title,
    description,
  },
  robots: {
    index: true,
    follow: true,
  },
  icons: {
    icon: "/fav.png",
    apple: "/fav.png",
  },
  category: "software development",
};

export const viewport: Viewport = {
  themeColor: "#f5f6f5",
  colorScheme: "light",
  width: "device-width",
  initialScale: 1,
};

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html
      lang="en"
      suppressHydrationWarning
      className={`${bricolage.variable} ${outfit.variable} h-full`}
    >
      <body className="flex min-h-full flex-col bg-canvas text-ink">
        <Script
          id="cookieyes"
          type="text/javascript"
          src="https://cdn-cookieyes.com/client_data/b73e234b6e5f54e7947d48fd/script.js"
          strategy="beforeInteractive"
        />
        <Script
          async
          src="https://www.googletagmanager.com/gtag/js?id=G-2Z897PR04V"
          strategy="afterInteractive"
        />
        <Script id="google-analytics" strategy="afterInteractive">
          {`
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', 'G-2Z897PR04V');
          `}
        </Script>
        <a
          href="#main-content"
          className="sr-only focus:not-sr-only focus:fixed focus:top-4 focus:left-4 focus:z-[100] focus:rounded-full focus:bg-ink focus:px-4 focus:py-2 focus:text-sm focus:font-medium focus:text-white"
        >
          Skip to content
        </a>
        <Header />
        <main id="main-content" className="flex-1">
          {children}
        </main>
        <MotionProvider />
        <WhatsappPopup />
        <Footer />
      </body>
    </html>
  );
}
