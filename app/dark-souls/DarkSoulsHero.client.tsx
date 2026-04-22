"use client";

import Link from "next/link";
import { motion, useReducedMotion } from "framer-motion";
import { useCallback, useEffect, useRef, useState } from "react";

const heroTracking =
  "tracking-[0.06em] sm:tracking-[0.07em] md:tracking-[0.08em] lg:tracking-[0.09em] xl:tracking-[0.1em]";

const gamePageTitleTracking =
  "tracking-[0.012em] sm:tracking-[0.016em] md:tracking-[0.02em] lg:tracking-[0.024em] xl:tracking-[0.028em]";

const navLinkClassName =
  `block whitespace-nowrap bg-transparent text-[clamp(1.05rem,2.2vw,1.5rem)] font-semibold leading-none ${heroTracking} text-white/45 no-underline outline-none ring-0 transition-all duration-200 hover:text-white hover:[text-shadow:0_0_12px_rgba(252,211,77,0.65),0_0_26px_rgba(251,146,60,0.45),0_0_40px_rgba(234,88,12,0.25)] focus-visible:outline-none focus-visible:ring-0 sm:text-[clamp(1.15rem,2vw,1.75rem)] lg:text-2xl xl:text-3xl`;

export function DarkSoulsHero({
  loreTargetId,
}: {
  loreTargetId: string;
}) {
  const [isLeaving, setIsLeaving] = useState(false);
  const prefersReducedMotion = useReducedMotion();
  const hasScrolledDownSinceLeave = useRef(false);

  useEffect(() => {
    if (!isLeaving) return;

    hasScrolledDownSinceLeave.current = false;

    const onScroll = () => {
      if (window.scrollY >= 180) hasScrolledDownSinceLeave.current = true;

      // Only bring the hero back if the user already went down.
      if (hasScrolledDownSinceLeave.current && window.scrollY <= 40) {
        setIsLeaving(false);
      }
    };

    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, [isLeaving]);

  const onBeginReading = useCallback(() => {
    setIsLeaving(true);

    // Smooth scroll to lore on the same page.
    window.setTimeout(() => {
      const el = document.getElementById(loreTargetId);
      el?.scrollIntoView({ behavior: "smooth", block: "start" });
    }, 80);
  }, [loreTargetId]);

  return (
    <motion.section
      aria-label="Dark Souls hero"
      className="relative flex min-h-[100svh] w-full flex-col items-center justify-start px-4 pb-16 pt-36 text-center sm:pt-40 md:px-8 md:pt-44"
      initial={prefersReducedMotion ? false : { opacity: 0, y: 18 }}
      animate={
        prefersReducedMotion
          ? { opacity: 1 }
          : isLeaving
            ? { opacity: 0, y: "-18vh" }
            : { opacity: 1, y: 0 }
      }
      transition={{ duration: 0.7, ease: [0.2, 0.9, 0.2, 1] }}
      style={{ pointerEvents: isLeaving ? "none" : "auto" }}
    >
      <header className="flex w-full max-w-5xl flex-col items-center lg:max-w-6xl">
        <h1
          className={`text-5xl font-semibold leading-none text-white sm:text-6xl md:text-7xl lg:text-8xl ${gamePageTitleTracking} [text-shadow:0_0_10px_rgba(70,38,10,0.75),0_0_24px_rgba(110,55,14,0.55),0_0_44px_rgba(50,24,6,0.35)]`}
        >
          DARK SOULS
        </h1>
        <p
          className={`mt-7 max-w-3xl text-balance px-2 text-[clamp(0.5rem,2.1vw,1.35rem)] font-semibold leading-snug text-white sm:max-w-4xl sm:mt-8 sm:text-[clamp(0.55rem,2.2vw,1.5rem)] md:max-w-5xl lg:text-2xl xl:text-3xl ${heroTracking} [text-shadow:0_0_10px_rgba(120,66,20,0.75),0_0_24px_rgba(160,82,25,0.55),0_0_44px_rgba(90,45,10,0.35)]`}
        >
          CHOSEN UNDEAD - SEEK WHAT CAME BEFORE THE FLAME
        </p>
      </header>

      <nav
        className="mt-14 flex w-full max-w-2xl flex-col items-center justify-center gap-9 sm:mt-16 sm:flex-row sm:gap-20"
        aria-label="Dark Souls sections"
      >
        <Link href="/dark-souls/characters" className={navLinkClassName}>
          CHARACTERS
        </Link>
        <Link href="/dark-souls/forum" className={navLinkClassName}>
          FORUM
        </Link>
      </nav>

      <button
        type="button"
        onClick={onBeginReading}
        className={`relative mt-20 inline-flex cursor-pointer items-center justify-center bg-transparent text-[clamp(0.95rem,2vw,1.25rem)] font-semibold leading-none ${heroTracking} text-amber-200/75 no-underline outline-none ring-0 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/25 [text-shadow:0_0_10px_rgba(70,38,10,0.7),0_0_22px_rgba(110,55,14,0.5)] after:absolute after:-bottom-2 after:left-1/2 after:h-px after:w-[min(34rem,92vw)] after:-translate-x-1/2 after:bg-gradient-to-r after:from-amber-200/0 after:via-amber-200/55 after:to-amber-200/0 after:opacity-90 after:blur-[0.2px]`}
        aria-label="Empezar a leer el lore"
      >
        UNRAVEL THE FIRST FLAME’S AGE — BEGIN READING
      </button>
    </motion.section>
  );
}

