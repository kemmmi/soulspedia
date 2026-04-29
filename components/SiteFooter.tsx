"use client";

import { fsMotion } from "@/lib/motion/fromSoftware";
import { motion, useReducedMotion } from "framer-motion";

const footerTracking =
  "tracking-[0.06em] sm:tracking-[0.07em] md:tracking-[0.08em] lg:tracking-[0.09em] xl:tracking-[0.1em]";

export function SiteFooter() {
  const reduce = useReducedMotion();
  const ease = fsMotion.ease;

  return (
    <motion.footer
      className="relative z-[30] shrink-0 bg-transparent px-6 pb-5 pt-2 text-right text-white md:px-10"
      initial={reduce ? false : { opacity: 0 }}
      animate={reduce ? false : { opacity: 1 }}
      transition={{
        duration: fsMotion.dur.chrome,
        delay: reduce ? 0 : 0.22,
        ease,
      }}
    >
      <p
        className={`m-0 inline-block text-xs font-semibold leading-none text-white/90 drop-shadow-[0_0_10px_rgba(255,255,255,0.28)] md:text-sm ${footerTracking}`}
      >
        © 2026 Soulspedia
      </p>
    </motion.footer>
  );
}
