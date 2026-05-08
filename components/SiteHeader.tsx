"use client";

import { fsMotion } from "@/lib/motion/fromSoftware";
import Link from "next/link";
import { motion, useReducedMotion } from "framer-motion";

/** Wordmark SOULSPEDIA — Optimus Princeps, estilo alma oscura. */
export const brandWordmarkClassName =
  "inline-block shrink-0 font-semibold uppercase leading-none tracking-[0.06em] text-white outline-none ring-0 transition-[text-shadow,color] duration-200 sm:tracking-[0.07em] md:tracking-[0.08em] " +
  "text-[clamp(0.82rem,1.95vw,1.12rem)] md:text-[clamp(0.88rem,1.65vw,1.32rem)] " +
  "[text-shadow:0_0_10px_rgba(70,38,10,0.78),0_0_22px_rgba(110,55,14,0.52),0_0_38px_rgba(50,24,6,0.32)] " +
  "hover:[text-shadow:0_0_14px_rgba(252,211,77,0.55),0_0_28px_rgba(251,146,60,0.42),0_0_48px_rgba(234,88,12,0.22)] " +
  "focus-visible:text-amber-100/95";

const navLinkClass =
  "font-optimus text-[clamp(0.62rem,1.05vw,0.78rem)] font-normal uppercase tracking-[0.14em] text-white/90 " +
  "[text-shadow:0_1px_10px_rgba(0,0,0,0.9),0_0_20px_rgba(0,0,0,0.55)] " +
  "outline-none transition-colors duration-200 hover:text-white focus-visible:text-amber-100/95 focus-visible:ring-2 focus-visible:ring-amber-500/35 focus-visible:ring-offset-2 focus-visible:ring-offset-transparent";

export function SiteHeader() {
  const reduce = useReducedMotion();
  const ease = fsMotion.ease;

  return (
    <motion.header
      className="sticky top-0 z-[50] w-full shrink-0 bg-transparent shadow-none"
      initial={reduce ? false : { opacity: 0, y: fsMotion.px.headerY }}
      animate={reduce ? false : { opacity: 1, y: 0 }}
      transition={{ duration: fsMotion.dur.chrome, ease }}
    >
      <svg
        className="pointer-events-none absolute h-0 w-0 overflow-hidden"
        aria-hidden
      >
        <defs>
          {/* Desgaste nítido (primera versión): grano + multiply, misma técnica base que Legendary Figures */}
          <filter
            id="soulspediaNavWordmarkWear"
            x="-10%"
            y="-10%"
            width="120%"
            height="120%"
            colorInterpolationFilters="sRGB"
          >
            <feTurbulence
              type="fractalNoise"
              baseFrequency="0.11 0.173"
              numOctaves="4"
              seed="93"
              stitchTiles="stitch"
              result="noise"
            />
            <feColorMatrix
              in="noise"
              type="saturate"
              values="0"
              result="gray"
            />
            <feComponentTransfer in="gray" result="grain">
              <feFuncR type="gamma" amplitude="1" exponent="1.65" offset="0.22" />
              <feFuncG type="gamma" amplitude="1" exponent="1.65" offset="0.22" />
              <feFuncB type="gamma" amplitude="1" exponent="1.65" offset="0.22" />
            </feComponentTransfer>
            <feComposite
              in="grain"
              in2="SourceGraphic"
              operator="in"
              result="grainMasked"
            />
            <feBlend in="SourceGraphic" in2="grainMasked" mode="multiply" />
          </filter>
        </defs>
      </svg>

      <div className="page-shell relative flex w-full flex-wrap items-center justify-between gap-x-6 gap-y-3 pb-3 pt-7 md:flex-nowrap md:pb-3.5 md:pt-8">
        <motion.div
          className="flex min-w-0 flex-1 items-center md:flex-initial md:justify-start"
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
            className={`${brandWordmarkClassName} nav-wordmark-worn`}
          >
            SOULSPEDIA
          </Link>
        </motion.div>

        <nav
          aria-label="Secciones principales"
          className="flex flex-wrap items-center justify-end gap-x-4 gap-y-2 sm:flex-nowrap md:gap-x-5 lg:gap-x-6"
        >
          <Link href="/#chronicles" className={navLinkClass}>
            The Chronicles
          </Link>
          <span
            aria-hidden
            className="h-[1px] w-[0.9rem] shrink-0 bg-white/72 md:w-[1.05rem]"
          />
          <Link href="/#figures" className={navLinkClass}>
            Legendary Figures
          </Link>
        </nav>
      </div>
    </motion.header>
  );
}
