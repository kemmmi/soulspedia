"use client";

import { usePathname } from "next/navigation";
import { SiteFooter } from "@/components/SiteFooter";

/**
 * El SiteFooter global se oculta en la home porque la landing tiene su propio
 * pie de página personalizado.
 */
export function ConditionalSiteFooter() {
  const pathname = usePathname();
  if (pathname === "/") return null;
  return <SiteFooter />;
}
