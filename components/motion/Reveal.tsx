"use client";

import { fsMotion } from "@/lib/motion/fromSoftware";
import { motion, useReducedMotion } from "framer-motion";

type RevealProps = {
  children: React.ReactNode;
  className?: string;
  /** Retraso en segundos (stagger desde el padre) */
  delay?: number;
};

/**
 * Fundido + desplazamiento mínimo al entrar en el viewport (bloques de lore).
 * Estilo sobrio: menos “salto”, más permanencia en pantalla.
 */
export function Reveal({ children, className, delay = 0 }: RevealProps) {
  const reduce = useReducedMotion();

  if (reduce) {
    return <div className={className}>{children}</div>;
  }

  return (
    <motion.div
      className={className}
      initial={{ opacity: 0, y: fsMotion.px.reveal }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{
        once: true,
        margin: "-14% 0px -10% 0px",
        amount: 0.15,
      }}
      transition={{
        duration: fsMotion.dur.reveal,
        delay,
        ease: fsMotion.ease,
      }}
    >
      {children}
    </motion.div>
  );
}
