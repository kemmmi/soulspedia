import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Soulspedia",
  description: "Lore y contexto del universo Souls",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="es">
      <body className="antialiased bg-black text-white min-h-screen">
        {children}
      </body>
    </html>
  );
}
