import type { Metadata, Viewport } from "next";
import "./globals.css";
import { Cormorant_Garamond, EB_Garamond } from "next/font/google"; // <--- Añadimos EB_Garamond aquí
import { AppMotionConfig } from "@/components/AppMotionConfig";
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

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  /* Encaja con safe areas (notch / home indicator) si usas fondos a pantalla completa */
  viewportFit: "cover",
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
        className={`${loreFont.variable} ${dsInventoryFont.variable} min-w-0 antialiased text-white min-h-dvh`}
      >
        <AppMotionConfig>
          <div className="flex min-h-dvh min-w-0 flex-col text-white">
            <SiteHeader />
            <main className="relative z-10 flex min-h-0 min-w-0 flex-1 flex-col">
              {children}
            </main>
          </div>
        </AppMotionConfig>
      </body>
    </html>
  );
}