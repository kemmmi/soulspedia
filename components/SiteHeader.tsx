"use client";

import { fsMotion } from "@/lib/motion/fromSoftware";
import Link from "next/link";
import { motion, useReducedMotion } from "framer-motion";

/** Wordmark SOULSPEDIA — Optimus Princeps, estilo alma oscura. */
export const brandWordmarkClassName =
  "inline-block shrink-0 font-semibold uppercase leading-none tracking-[0.06em] text-white outline-none ring-0 transition-[text-shadow,color] duration-200 sm:tracking-[0.07em] md:tracking-[0.08em] " +
  "text-[0.82rem] sm:text-[0.86rem] md:text-[0.95rem] lg:text-[1.05rem] xl:text-[1.12rem] " +
  "[text-shadow:0_0_10px_rgba(70,38,10,0.78),0_0_22px_rgba(110,55,14,0.52),0_0_38px_rgba(50,24,6,0.32)] " +
  "hover:[text-shadow:0_0_14px_rgba(252,211,77,0.55),0_0_28px_rgba(251,146,60,0.42),0_0_48px_rgba(234,88,12,0.22)] " +
  "focus-visible:text-amber-100/95";

const navLinkClass =
  "font-optimus text-[0.62rem] font-normal uppercase tracking-[0.14em] text-white/90 sm:text-[0.68rem] md:text-[0.72rem] lg:text-[0.78rem] " +
  "[text-shadow:0_1px_10px_rgba(0,0,0,0.9),0_0_20px_rgba(0,0,0,0.55)] " +
  "outline-none transition-colors duration-200 hover:text-white focus-visible:text-amber-100/95 focus-visible:ring-2 focus-visible:ring-amber-500/35 focus-visible:ring-offset-2 focus-visible:ring-offset-transparent";

export function SiteHeader() {
  const reduce = useReducedMotion();
  const ease = fsMotion.ease;

  return (
    <motion.header
      className="sticky top-0 z-[50] min-w-0 w-full shrink-0 bg-transparent shadow-none"
      initial={reduce ? false : { opacity: 0, y: fsMotion.px.headerY }}
      animate={reduce ? false : { opacity: 1, y: 0 }}
      transition={{ duration: fsMotion.dur.chrome, ease }}
    >
      {/* Ancho completo del viewport + mismas sangrías que --page-margin-x; sin max-width del .page-shell para separar logo / nav a los extremos */}
      <div className="relative flex w-full min-w-0 flex-col items-center gap-5 px-[var(--page-margin-x)] pb-4 pt-8 sm:gap-6 sm:pt-9 xl:flex-row xl:flex-nowrap xl:items-center xl:justify-between xl:gap-x-6 xl:gap-y-3 xl:pb-3.5 xl:pt-8">
        <motion.div
          className="flex w-full min-w-0 shrink-0 items-center justify-center xl:w-auto xl:justify-start"
          initial={
            reduce
              ? false
              : { opacity: 0, scale: 1 - fsMotion.px.headerLogoScaleDelta }
          }
          animate={reduce ? false : { opacity: 1, scale: 1 }}
          transition={{
            duration: fsMotion.dur.chrome * 0.95,
            delay: reduce ? 0 : 0.06,
            ease,
          }}
        >
          <Link
            href="/"
            className={brandWordmarkClassName}
          >
            SOULSPEDIA
          </Link>
        </motion.div>

        <nav
          aria-label="Secciones principales"
          className="flex w-full min-w-0 flex-wrap items-center justify-center gap-x-4 gap-y-2 sm:flex-nowrap xl:w-auto xl:justify-end md:gap-x-5 lg:gap-x-6"
        >
          <Link href="/#trilogy" className={navLinkClass}>
            Trilogy
          </Link>
          <span
            aria-hidden
            className="h-[1px] w-[0.9rem] shrink-0 bg-white/72 md:w-[1.05rem]"
          />
          <Link href="/login" className={navLinkClass}>
            Login
          </Link>
        </nav>
      </div>
    </motion.header>
  );
}
