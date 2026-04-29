"use client";

import { MotionConfig } from "framer-motion";

/**
 * Respecto global a prefers-reduced-motion para todas las animaciones Framer Motion.
 */
export function AppMotionConfig({
  children,
}: {
  children: React.ReactNode;
}) {
  return <MotionConfig reducedMotion="user">{children}</MotionConfig>;
}
