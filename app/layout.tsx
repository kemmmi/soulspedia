import type { Metadata } from "next";
import "./globals.css";
import { Cormorant_Garamond } from "next/font/google";
import { AppMotionConfig } from "@/components/AppMotionConfig";
import { ConditionalSiteFooter } from "@/components/ConditionalSiteFooter.client";
import { SiteHeader } from "@/components/SiteHeader";

const loreFont = Cormorant_Garamond({
  subsets: ["latin"],
  weight: ["400", "600"],
  style: ["normal", "italic"],
  variable: "--font-lore",
});

export const metadata: Metadata = {
  title: "Soulspedia",
  description: "Lore and context from the Souls universe",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="scroll-smooth">
      <body
        className={`${loreFont.variable} antialiased text-white min-h-screen`}
      >
        <AppMotionConfig>
          <div className="flex min-h-screen flex-col text-white">
            <SiteHeader />
            <main className="relative z-10 flex min-h-0 flex-1 flex-col">
              {children}
            </main>
            <ConditionalSiteFooter />
          </div>
        </AppMotionConfig>
      </body>
    </html>
  );
}
