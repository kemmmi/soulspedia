"use client";

import { fsMotion } from "@/lib/motion/fromSoftware";
import { motion, useReducedMotion } from "framer-motion";

type SectionEntranceProps = {
  children: React.ReactNode;
  className?: string;
  delay?: number;
  staggerChildren?: number;
};

/**
 * Entrada suave para bloques de sección completos.
 * Puede encadenar la entrada de elementos hijos con stagger.
 */
export function SectionEntrance({
  children,
  className,
  delay = 0,
  staggerChildren = 0.1,
}: SectionEntranceProps) {
  const reduce = useReducedMotion();

  if (reduce) {
    return <section className={className}>{children}</section>;
  }

  return (
    <motion.section
      className={className}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.15, margin: "-10% 0px -10% 0px" }}
      variants={{
        hidden: { opacity: 0, y: fsMotion.px.reveal },
        visible: {
          opacity: 1,
          y: 0,
          transition: {
            duration: fsMotion.dur.reveal,
            delay,
            ease: fsMotion.ease,
            staggerChildren,
          },
        },
      }}
    >
      {children}
    </motion.section>
  );
}
