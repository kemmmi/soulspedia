"use client";

import { fsMotion } from "@/lib/motion/fromSoftware";
import { motion, useReducedMotion } from "framer-motion";

/**
 * Nueva instancia por navegación → fundido del contenido de página.
 */
export default function RootTemplate({
  children,
}: {
  children: React.ReactNode;
}) {
  const reduce = useReducedMotion();

  if (reduce) {
    return (
      <div className="flex min-h-0 flex-1 flex-col">{children}</div>
    );
  }

  return (
    <motion.div
      className="flex min-h-0 flex-1 flex-col"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{
        duration: fsMotion.dur.route,
        ease: fsMotion.ease,
      }}
    >
      {children}
    </motion.div>
  );
}
