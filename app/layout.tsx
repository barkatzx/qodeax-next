// app/layout.tsx
import Footer from "@/components/Footer";
import Header from "@/components/Header";
import WhatsappPopup from "@/components/WhatsappPopup";
import { ReactNode } from "react";
import "./globals.css";

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en">
      <head>
        <meta charSet="UTF-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <title>Qodeax-Engineering Ideas Into Powerful Software.</title>
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
