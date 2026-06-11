// app/layout.tsx
import Footer from "@/components/Footer";
import Header from "@/components/Header";
import WhatsappPopup from "@/components/WhatsappPopup";
import Script from "next/script";
import { ReactNode } from "react";
import "./globals.css";

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en">
      <head>
        <meta charSet="UTF-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <title>Qodeax-Engineering Ideas Into Powerful Software.</title>
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
      </head>
      <body>
        <Header />
        {children}
        <WhatsappPopup />
        <Footer />
      </body>
    </html>
  );
}
