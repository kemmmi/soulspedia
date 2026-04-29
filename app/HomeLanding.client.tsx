"use client";

import { fsMotion } from "@/lib/motion/fromSoftware";
import Image from "next/image";
import Link from "next/link";
import { motion, useReducedMotion } from "framer-motion";

const heroTracking =
  "tracking-[0.06em] sm:tracking-[0.07em] md:tracking-[0.08em] lg:tracking-[0.09em] xl:tracking-[0.1em]";

const gameTitleClassName =
  `block whitespace-nowrap bg-transparent text-[clamp(0.38rem,2.1vw,1.875rem)] font-semibold leading-none ${heroTracking} text-white/40 no-underline outline-none ring-0 ` +
  `transition-[color,filter,text-shadow] duration-200 ease-out ` +
  `hover:text-white hover:brightness-[1.12] ` +
  `active:brightness-100 ` +
  `[text-shadow:0_1px_0_rgba(0,0,0,0.75)] hover:[text-shadow:0_0_14px_rgba(252,211,77,0.75),0_0_32px_rgba(251,146,60,0.52),0_0_52px_rgba(234,88,12,0.28)] ` +
  `focus-visible:outline-none focus-visible:ring-0 lg:text-2xl xl:text-3xl`;

const intro = fsMotion.homeIntro;

export function HomeLanding() {
  const reduce = useReducedMotion();
  const ease = fsMotion.ease;

  return (
    <div className="relative flex min-h-0 flex-1 flex-col overflow-hidden">
      <motion.div
        aria-hidden
        className="pointer-events-none fixed inset-0 z-0"
        initial={reduce ? false : { opacity: 0 }}
        animate={reduce ? false : { opacity: 1 }}
        transition={{
          duration: intro.bgSec,
          ease,
        }}
      >
        <Image
          src="/inicio.png"
          alt=""
          fill
          priority
          sizes="100vw"
          className="object-cover object-center"
        />
      </motion.div>

      {!reduce ? (
        <motion.div
          aria-hidden
          className="pointer-events-none fixed inset-0 z-[4] bg-black"
          initial={{ opacity: intro.veloOpacityStart }}
          animate={{ opacity: intro.veloOpacityEnd }}
          transition={{
            duration: intro.veloSec,
            delay: intro.veloDelay,
            ease,
          }}
        />
      ) : (
        <div className="pointer-events-none fixed inset-0 z-[4] bg-black/55" aria-hidden />
      )}

      <div
        className="pointer-events-none fixed inset-0 z-[8] bg-[radial-gradient(ellipse_92%_72%_at_50%_38%,transparent_32%,rgba(0,0,0,0.52)_94%)]"
        aria-hidden
      />

      <div className="relative z-20 flex flex-1 flex-col items-center justify-center overflow-x-visible px-4 py-8 md:py-12">
        <div className="flex w-full max-w-4xl flex-col items-center text-center lg:max-w-7xl">
          <motion.h1
            className={`inline-block min-w-min max-w-[100vw] px-2 text-center text-[clamp(0.52rem,2.5vw,1.925rem)] font-semibold leading-tight whitespace-nowrap text-white/95 drop-shadow-[0_0_12px_rgba(255,255,255,0.2)] lg:text-2xl xl:text-3xl ${heroTracking}`}
            initial={reduce ? false : { opacity: 0 }}
            animate={reduce ? false : { opacity: 1 }}
            transition={{
              duration: intro.sloganDuration,
              delay: reduce ? 0 : intro.sloganDelay,
              ease,
            }}
          >
            THE FLAME OF UNDERSTANDING - SO YOU NEVER GO HOLLOW
          </motion.h1>

          <nav
            className="mt-14 w-full overflow-visible px-2 sm:mt-16 sm:px-6 md:mt-20 md:px-10 lg:mt-24 lg:px-14"
            aria-label="Choose game"
          >
            <div className="mx-auto flex w-full max-w-7xl flex-nowrap items-center justify-evenly gap-x-2 overflow-visible sm:gap-x-6 md:gap-x-10 lg:gap-x-14">
              {[
                { href: "/dark-souls", label: "DARK SOULS" },
                { href: "/dark-souls-2", label: "DARK SOULS II" },
                { href: "/dark-souls-3", label: "DARK SOULS III" },
              ].map((game, i) => (
                <motion.div
                  key={game.href}
                  className="relative"
                  initial={reduce ? false : { opacity: 0 }}
                  animate={reduce ? false : { opacity: 1 }}
                  transition={{
                    duration: intro.navItemDuration,
                    delay:
                      reduce ? 0 : intro.navBaseDelay + i * intro.navGapDelay,
                    ease,
                  }}
                >
                  <Link href={game.href} className={gameTitleClassName}>
                    {game.label}
                  </Link>
                </motion.div>
              ))}
            </div>
          </nav>
        </div>
      </div>

      {!reduce ? (
        <motion.div
          aria-hidden
          className="pointer-events-none fixed inset-0 z-[40] bg-[#030205]"
          initial={{ opacity: 1 }}
          animate={{ opacity: 0 }}
          transition={{ duration: intro.curtainSec, ease }}
        />
      ) : null}
    </div>
  );
}
