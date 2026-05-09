"use client";

import { fsMotion } from "@/lib/motion/fromSoftware";
import Image from "next/image";
import Link from "next/link";
import { motion, useReducedMotion } from "framer-motion";
import { Reveal } from "@/components/motion/Reveal";

const intro = fsMotion.homeIntro;

export function HomeLanding() {
  const reduce = useReducedMotion();
  const ease = fsMotion.ease;

  return (
    <div className="relative min-w-0 w-full overflow-x-hidden text-white bg-[#050505]">
      {/* ----------- HERO ----------- */}
      <section
        aria-labelledby="home-hero-title"
        className="relative flex min-h-[100svh] w-full min-w-0 flex-col overflow-hidden"
      >
        <motion.div
          aria-hidden
          className="absolute inset-0 z-0"
          initial={reduce ? false : { opacity: 0 }}
          animate={reduce ? false : { opacity: 1 }}
          transition={{ duration: intro.bgSec, ease }}
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
            className="absolute inset-0 z-[2] bg-black"
            initial={{ opacity: intro.veloOpacityStart }}
            animate={{ opacity: intro.veloOpacityEnd * 0.65 }}
            transition={{
              duration: intro.veloSec,
              delay: intro.veloDelay,
              ease,
            }}
          />
        ) : (
          <div className="absolute inset-0 z-[2] bg-black/40" aria-hidden />
        )}

        <div
          className="pointer-events-none absolute inset-x-0 bottom-0 z-[3] h-72 bg-gradient-to-t from-black via-black/80 to-transparent"
          aria-hidden
        />

        {/* padding-top amplio para encajar un navbar futuro (hero + Chronicles bajan juntos) */}
        <div className="relative z-[10] page-shell flex w-full flex-1 flex-col pb-16 pt-24 md:pb-20 md:pt-32 lg:pt-36 xl:pt-40">
          <div className="flex shrink-0 justify-center md:justify-end">
            <div className="flex w-full max-w-none flex-col items-center text-center md:items-end md:text-right">
              <motion.p
                className="font-optimus text-base font-normal uppercase tracking-[0.06em] text-white/82 sm:text-lg md:text-xl lg:text-[1.35rem]"
                initial={reduce ? false : { opacity: 0 }}
                animate={reduce ? false : { opacity: 1 }}
                transition={{
                  duration: intro.sloganDuration * 0.85,
                  delay: reduce ? 0 : intro.sloganDelay,
                  ease,
                }}
              >
                The Flame of Understanding
              </motion.p>

              <motion.h1
                id="home-hero-title"
                className="font-optimus mt-4 max-w-[min(100%,22rem)] text-balance text-3xl font-normal uppercase leading-[1.08] tracking-[0.06em] text-white [text-shadow:0_0_14px_rgba(0,0,0,0.82),0_0_42px_rgba(75,42,12,0.38),0_0_88px_rgba(42,22,8,0.22)] sm:max-w-none sm:text-4xl sm:whitespace-nowrap sm:leading-[1] md:text-5xl lg:text-6xl xl:text-7xl"
                initial={reduce ? false : { opacity: 0 }}
                animate={reduce ? false : { opacity: 1 }}
                transition={{
                  duration: intro.sloganDuration,
                  delay: reduce ? 0 : intro.sloganDelay + 0.18,
                  ease,
                }}
              >
                So You Never Go Hollow
              </motion.h1>
            </div>
          </div>

          {/* The Chronicles — mismo contenido que antes, dentro del primer pantallazo */}
          <Reveal className="relative z-10 mt-10 w-full min-w-0 max-w-6xl self-center md:mt-14">
            <article
              id="chronicles"
              className="relative overflow-hidden border border-white/5 bg-black shadow-[0_40px_100px_rgba(0,0,0,0.9)]"
            >
              <div className="absolute inset-0 z-0">
                <Image
                  src="/darksouls3fondo.jpg"
                  alt=""
                  fill
                  className="object-cover opacity-50"
                />
                <div className="absolute inset-0 bg-[radial-gradient(circle_at_70%_50%,rgba(255,80,0,0.1)_0%,rgba(0,0,0,0.9)_70%)]" />
                <div className="absolute inset-0 bg-gradient-to-r from-black via-black/40 to-transparent" />
              </div>

              <div className="relative z-10 flex min-w-0 flex-col gap-8 px-6 py-12 sm:px-8 sm:py-14 md:flex-row md:items-center md:gap-10 md:px-12 md:py-16 lg:px-16 lg:py-20">
                <div className="max-w-2xl">
                  <h2 className="font-optimus text-[1.5rem] font-normal uppercase tracking-[0.06em] text-white sm:text-[1.85rem] md:text-[2rem] lg:text-[2.15rem] xl:text-[2.2rem]">
                    The Chronicles
                    <span className="mt-4 block h-px w-20 bg-gradient-to-r from-white/40 to-transparent" />
                  </h2>

                  <div className="mt-8 space-y-6 font-lore leading-[1.6] text-[#e0e0d8] antialiased md:mt-10">
                    <p className="text-[1.1rem] normal-case tracking-tight md:text-[1.25rem] [text-shadow:1px_1px_2px_rgba(0,0,0,0.8)]">
                      In the world of Souls, a name is all that remains of a hero&apos;s
                      journey. Soulspedia is an exhaustive archive dedicated to the characters
                      of Lordran, Drangleic, and Lothric.
                    </p>
                    <p className="text-[1.1rem] normal-case tracking-tight md:text-[1.25rem] [text-shadow:1px_1px_2px_rgba(0,0,0,0.8)]">
                      From the mighty Lords of Cinder to the lonely outcasts hiding in the
                      shadows of the archives, we document every tragic step of their path,
                      transcribing their fates into the eternal flame of knowledge.
                    </p>
                  </div>

                  <div className="mt-10 md:mt-12">
                    <Link
                      href="/characters"
                      className="font-optimus group inline-flex items-center gap-4 text-[0.7rem] uppercase tracking-[0.06em] text-white/50 transition-colors hover:text-white"
                    >
                      Explore the archives
                      <span className="h-px w-10 bg-white/20 transition-all group-hover:w-16 group-hover:bg-white" />
                    </Link>
                  </div>
                </div>

                <div className="hidden flex-1 justify-center md:flex">
                  <div className="h-48 w-48 rounded-full bg-[radial-gradient(circle,rgba(255,100,50,0.15)_0%,transparent_70%)] blur-3xl opacity-50" />
                </div>
              </div>
            </article>
          </Reveal>
        </div>
      </section>

      {/* ----------- SECTION: LEGENDARY FIGURES (The World / bosque ambiental) ----------- */}
      <section
        id="figures"
        className="relative z-30 flex min-h-[min(100svh,max-content)] w-full scroll-mt-28 flex-col justify-start overflow-x-hidden overflow-y-visible bg-[#050505] pb-16 pt-28 sm:scroll-mt-32 sm:pt-32 md:scroll-mt-36 md:pt-36 xl:min-h-screen xl:scroll-mt-20 xl:justify-center xl:pb-20 xl:pt-24"
      >
        <div className="pointer-events-none absolute inset-0 z-0" aria-hidden>
          <Image
            src="/lordsofcinder3.jpg"
            alt=""
            fill
            className="object-cover object-[center_22%] opacity-[0.64]"
            sizes="100vw"
          />
          <div className="absolute inset-0 bg-black/52" />
          <div className="absolute inset-x-0 top-0 h-52 bg-gradient-to-b from-black/90 via-black/55 to-transparent" />
          <div className="absolute inset-x-0 bottom-0 h-48 bg-gradient-to-t from-[#050505] via-black/45 to-transparent" />
        </div>

        <div className="page-shell relative z-[15] flex w-full flex-1 flex-col">
          <Reveal>
            <div className="relative mb-12 flex flex-col items-center text-center xl:mb-10">
              <svg
                className="pointer-events-none absolute h-0 w-0 overflow-hidden"
                aria-hidden
              >
                <defs>
                  <filter
                    id="legendaryFiguresWearSharpFilter"
                    x="-10%"
                    y="-10%"
                    width="120%"
                    height="120%"
                    colorInterpolationFilters="sRGB"
                  >
                    {/* Asimetría + stitch evita costura horizontal típica del ruído */}
                    <feTurbulence
                      type="fractalNoise"
                      baseFrequency="0.11 0.173"
                      numOctaves="4"
                      seed="71"
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
                    {/* Grano solo dentro del texto (evita bandas a ancho del filtro) */}
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
              <h2 className="legendary-worn-heading font-optimus text-[1.55rem] font-normal uppercase tracking-[0.06em] text-white no-underline sm:text-[1.75rem] md:text-[1.95rem] lg:text-[2.1rem] xl:text-[2.2rem]">
                <span className="legendary-worn-heading__text">
                  Legendary Figures
                </span>
              </h2>
            </div>
          </Reveal>

          {/* Desktop ancho (xl+): collage asimétrico. Zoom / anchos intermedios: flujo vertical sin solapes. */}
          <div className="relative flex-1 grid min-w-0 grid-cols-1 gap-x-10 gap-y-14 pb-4 xl:grid-cols-12 xl:gap-y-6 xl:pb-[min(38vh,22rem)] 2xl:pb-[26rem]">
            
            {/* Left Block: THE LORDS OF CINDER */}
            {/* xl (1280–1535): offsets suaves para no pegar contenido al borde. Desde 2xl (≥1536): mismo collage que antes. */}
            <div className="relative flex min-w-0 flex-col items-start gap-6 sm:flex-row sm:gap-8 md:gap-10 xl:col-span-7 xl:-translate-x-10 xl:translate-y-10 2xl:-translate-x-32 2xl:translate-y-20">
              {/* Imagen vertical a la izquierda */}
              <Reveal className="w-full max-w-[20rem] flex-shrink-0 sm:w-[48%] sm:max-w-none">
                <div className="relative aspect-[3/4] overflow-hidden border border-white/5 shadow-[0_20px_50px_rgba(0,0,0,0.8)] bg-black">
                  <Image
                    src="/lordsofcinder4.jpg"
                    alt="The Lords of Cinder"
                    fill
                    sizes="(max-width:640px) 20rem, (max-width:1024px) 34vw, 26vw"
                    className="object-cover"
                  />
                  <div
                    className="pointer-events-none absolute inset-0 z-[1] bg-black/35"
                    aria-hidden
                  />
                </div>
              </Reveal>

              {/* Título y descripción a la derecha (fuera de la imagen) */}
              <Reveal className="flex-1 sm:self-start">
                <h3 className="font-optimus text-xl md:text-2xl uppercase tracking-[0.06em] text-amber-100/90 mb-4">
                  The Lords of Cinder
                </h3>
                <div className="font-lore max-w-prose text-[0.95rem] md:text-[1.05rem] leading-[1.55] text-[#e0e0d8] antialiased normal-case tracking-tight">
                  <p>
                    Focus on the gods and bosses who shaped the ages. Documentation of the deities who linked the flame and those who sought to extinguish it.
                  </p>
                </div>
              </Reveal>
            </div>

            {/* Right Block: THE UNKINDLED & OUTCASTS */}
            <div className="flex min-w-0 flex-col gap-5 sm:gap-6 xl:col-span-5 xl:translate-x-12 xl:justify-self-end 2xl:translate-x-44">
              <Reveal className="w-full max-xl:mx-auto max-xl:max-w-2xl sm:w-[88%] xl:w-[90%]">
                <div className="relative aspect-video overflow-hidden border border-white/5 shadow-[0_20px_40px_rgba(0,0,0,0.7)] bg-black">
                  <Image
                    src="/npcs2.jpg"
                    alt="The Unkindled & Outcasts"
                    fill
                    sizes="(max-width:1024px) 100vw, 34vw"
                    className="object-cover"
                  />
                  <div
                    className="pointer-events-none absolute inset-0 z-[1] bg-black/35"
                    aria-hidden
                  />
                </div>
              </Reveal>

              {/* Título y descripción debajo de la imagen */}
              <Reveal className="w-full max-xl:mx-auto max-xl:max-w-2xl sm:w-[88%] xl:w-[90%]">
                <h3 className="font-optimus text-xl md:text-2xl uppercase tracking-[0.06em] text-amber-100/90 mb-4">
                  The Unkindled & Outcasts
                </h3>
                <p className="font-lore text-[0.95rem] md:text-[1.05rem] leading-[1.55] text-[#e0e0d8] antialiased normal-case tracking-tight max-w-prose">
                  For the NPCs, invaders, and companions you meet along the way. Silent witnesses to the end of the world.
                </p>
              </Reveal>
            </div>

            {/* Archived Dead: solo posición absoluta en xl+ (evita solapes al zoom alto) */}
            <div className="mt-14 w-full min-w-0 max-w-xl self-center xl:absolute xl:inset-x-auto xl:bottom-[4%] xl:left-[32%] xl:z-[11] xl:mt-0 xl:w-[34%] xl:max-w-none 2xl:bottom-[6%] 2xl:left-[34%]">
              <Reveal>
                <h3 className="font-optimus text-xl md:text-2xl uppercase tracking-[0.06em] text-amber-100/90 mb-4">
                  The Archived Dead
                </h3>
                <p className="font-lore text-[0.95rem] md:text-[1.05rem] leading-[1.55] text-[#e0e0d8] antialiased normal-case tracking-tight max-w-prose">
                  A comprehensive list of every named character in the series, transcribing their fates into eternal flame.
                </p>
                <div className="mt-5 relative aspect-video overflow-hidden border border-white/5 shadow-[0_20px_50px_rgba(0,0,0,0.9)] bg-black">
                  <Image
                    src="/archiveddead.jpg"
                    alt="The Archived Dead"
                    fill
                    sizes="(max-width:1024px) 100vw, 32vw"
                    className="object-cover"
                  />
                  <div
                    className="pointer-events-none absolute inset-0 z-[1] bg-black/35"
                    aria-hidden
                  />
                </div>
              </Reveal>
            </div>
          </div>
        </div>
      </section>

    </div>
  );
}
