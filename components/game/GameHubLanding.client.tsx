"use client";

import type { ReactNode } from "react";

import { fsMotion } from "@/lib/motion/fromSoftware";
import Link from "next/link";
import { animate, motion, useReducedMotion } from "framer-motion";
import { useCallback } from "react";

const heroTracking =
  "tracking-[0.06em] sm:tracking-[0.07em] md:tracking-[0.08em] lg:tracking-[0.09em] xl:tracking-[0.1em]";

const secondaryNavLinkClassName =
  `block whitespace-nowrap bg-transparent text-sm font-semibold leading-none sm:text-base md:text-lg lg:text-xl xl:text-2xl ${heroTracking} text-white/45 no-underline outline-none ring-0 transition-all duration-200 hover:text-white hover:[text-shadow:0_0_12px_rgba(252,211,77,0.65),0_0_26px_rgba(251,146,60,0.45),0_0_40px_rgba(234,88,12,0.25)] focus-visible:outline-none focus-visible:ring-0`;

export type GameHubLandingProps = {
  /** Ej. «DARK SOULS». Línea pequeña encima del titular grande. */
  seriesLine: string;
  /** Titular grande (rol / «Ashén», etc.). */
  roleHeadline: string;
  /** Frase corta debajo del héroe. */
  tagline: string;
  loreSectionId: string;
  beginReadingLabel: string;
  charactersHref: string;
  forumHref: string;
  heroTitleId?: string;
  children: ReactNode;
};

export function GameHubLanding(props: GameHubLandingProps) {
  const {
    seriesLine,
    roleHeadline,
    tagline,
    loreSectionId,
    beginReadingLabel,
    charactersHref,
    forumHref,
    heroTitleId = "game-hub-hero-title",
    children,
  } = props;

  const reduce = useReducedMotion();
  const ease = fsMotion.ease;
  const prefersReducedMotion = useReducedMotion();

  /**
   * Scroll programático al top exacto del lore con easing tipo «ease-out expo»
   * (entrada ágil, deceleración cinematográfica). Cancelable: si el usuario
   * gira la rueda, toca o pulsa una tecla durante la animación, se aborta y
   * se respeta su intención.
   */
  const scrollToLore = useCallback(() => {
    const el = document.getElementById(loreSectionId);
    if (!el) return;

    const target = Math.max(0, el.getBoundingClientRect().top + window.scrollY);

    if (prefersReducedMotion) {
      window.scrollTo(0, target);
      return;
    }

    const controls = animate(window.scrollY, target, {
      duration: 1.5,
      ease: [0.22, 1, 0.36, 1],
      onUpdate: (value) => window.scrollTo(0, value),
    });

    const cancel = () => controls.stop();
    const opts: AddEventListenerOptions = { passive: true, once: true };
    window.addEventListener("wheel", cancel, opts);
    window.addEventListener("touchstart", cancel, opts);
    window.addEventListener("keydown", cancel, { once: true });
  }, [loreSectionId, prefersReducedMotion]);

  return (
    <div className="relative flex min-h-0 min-w-0 flex-1 flex-col overflow-x-hidden text-white">
      <motion.section
        aria-labelledby={heroTitleId}
        className="relative flex min-h-[100svh] w-full min-w-0 flex-col pb-14 pt-28 text-center sm:pt-32 md:pt-40"
        initial={reduce ? false : { opacity: 0, y: fsMotion.px.title }}
        animate={reduce ? false : { opacity: 1, y: 0 }}
        transition={{
          duration: fsMotion.dur.headline,
          ease,
        }}
      >
        <div
          className="pointer-events-none absolute inset-x-0 top-0 z-[40] bg-[radial-gradient(ellipse_90%_70%_at_50%_32%,transparent_40%,rgba(0,0,0,0.45)_94%)]"
          aria-hidden
        />

        <div className="page-gutter-x relative z-[45] mx-auto flex w-full min-w-0 max-w-4xl flex-1 flex-col items-center lg:max-w-5xl">
          <p className="font-lore text-[0.7rem] font-normal uppercase tracking-[0.38em] text-amber-100/72 sm:text-xs md:text-sm">
            {seriesLine}
          </p>

          <h1
            id={heroTitleId}
            className="mt-4 max-w-[20ch] text-4xl font-semibold uppercase leading-[0.98] tracking-[0.035em] text-white [text-shadow:0_0_14px_rgba(0,0,0,0.82),0_0_42px_rgba(75,42,12,0.38),0_0_88px_rgba(42,22,8,0.22)] sm:max-w-none sm:text-5xl md:text-6xl lg:text-7xl xl:text-8xl"
          >
            {roleHeadline}
          </h1>

          <p
            className={`mt-5 max-w-3xl px-2 text-sm font-semibold uppercase leading-snug text-white/90 sm:text-base md:mt-6 md:max-w-4xl md:text-lg ${heroTracking}`}
          >
            {tagline}
          </p>

          <nav
            className="mt-12 flex w-full max-w-xl flex-col items-center justify-center gap-8 sm:flex-row sm:gap-16 md:mt-14 md:gap-24"
            aria-label="Sections"
          >
            <Link href={charactersHref} className={secondaryNavLinkClassName}>
              CHARACTERS
            </Link>
            <Link href={forumHref} className={secondaryNavLinkClassName}>
              FORUM
            </Link>
          </nav>

          <button
            type="button"
            onClick={scrollToLore}
            className={`relative mt-14 inline-flex cursor-pointer items-center justify-center bg-transparent px-2 text-center text-sm font-semibold leading-snug text-amber-200/78 no-underline outline-none ring-0 transition-colors hover:text-amber-100/90 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/23 sm:text-base ${heroTracking}`}
          >
            {beginReadingLabel}
            <span
              className="pointer-events-none absolute -bottom-2 left-1/2 h-px w-full max-w-md -translate-x-1/2 bg-gradient-to-r from-transparent via-amber-500/50 to-transparent blur-[0.35px] sm:max-w-xl md:max-w-2xl"
              aria-hidden
            />
          </button>
        </div>
      </motion.section>

      <div className="page-gutter-x pointer-events-none relative z-[35]" aria-hidden>
        <div className="mx-auto h-px w-full max-w-4xl bg-gradient-to-r from-transparent via-amber-600/42 to-transparent shadow-[0_0_26px_rgba(234,88,12,0.22)]" />
      </div>

      {/* Fondo opaco solo bajo el lore para tapar la imagen fixed del layout
         (sin afectar al hero ni a las subrutas characters/forum). */}
      <div className="relative z-[34] bg-black">{children}</div>
    </div>
  );
}
