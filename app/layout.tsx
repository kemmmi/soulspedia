import type { Metadata } from "next";
import "./globals.css";
import { Cormorant_Garamond, EB_Garamond } from "next/font/google"; // <--- Añadimos EB_Garamond aquí
import { AppMotionConfig } from "@/components/AppMotionConfig";
import { ConditionalSiteFooter } from "@/components/ConditionalSiteFooter.client";
import { SiteHeader } from "@/components/SiteHeader";

const loreFont = Cormorant_Garamond({
  subsets: ["latin"],
  weight: ["400", "600"],
  style: ["normal", "italic"],
  variable: "--font-lore",
});

// --- AÑADIMOS ESTA NUEVA CONFIGURACIÓN ---
const dsInventoryFont = EB_Garamond({
  subsets: ["latin"],
  weight: ["400", "500"],
  style: ["normal", "italic"],
  variable: "--font-ds-inventory",
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
      {/* No hace falta pegar la línea de <link> de Google Fonts porque 
          Next.js ya lo hace automáticamente con las funciones de arriba. 
      */}
      <body
        className={`${loreFont.variable} ${dsInventoryFont.variable} antialiased text-white min-h-screen`} // <--- Añadimos la variable aquí
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