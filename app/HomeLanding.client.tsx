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
    <div className="relative w-full text-white bg-[#050505]">
      {/* ----------- HERO ----------- */}
      <section
        aria-labelledby="home-hero-title"
        className="relative flex min-h-[100svh] w-full flex-col overflow-hidden"
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
        <div className="page-shell relative z-[10] flex w-full flex-1 flex-col pb-16 pt-24 md:pb-20 md:pt-32 lg:pt-36 xl:pt-40">
          <div className="flex shrink-0 justify-center md:justify-end">
            <div className="flex w-full max-w-none flex-col items-center text-center md:items-end md:text-right">
              <motion.p
                className="font-optimus text-[clamp(1rem,2.2vw,1.45rem)] font-normal uppercase tracking-[0.06em] text-white/82"
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
                className="font-optimus mt-4 whitespace-nowrap text-[clamp(1.4rem,5.4vw,3.5rem)] font-normal uppercase leading-[1] tracking-[0.06em] text-white [text-shadow:0_0_14px_rgba(0,0,0,0.82),0_0_42px_rgba(75,42,12,0.38),0_0_88px_rgba(42,22,8,0.22)]"
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
          <Reveal className="relative z-10 mt-10 w-full max-w-6xl self-center md:mt-14">
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

              <div className="relative z-10 flex flex-col gap-8 px-8 py-14 md:flex-row md:items-center md:px-16 md:py-20">
                <div className="max-w-2xl">
                  <h2 className="font-optimus text-[clamp(1.8rem,4vw,2.8rem)] font-normal uppercase tracking-[0.06em] text-white">
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
        className="relative z-30 flex min-h-screen w-full flex-col justify-center overflow-x-hidden overflow-y-visible bg-[#050505] pb-14 pt-20 md:pb-20 md:pt-24"
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

        <div className="page-shell relative z-10 flex w-full flex-1 flex-col">
          <Reveal>
            <div className="relative mb-10 flex flex-col items-center text-center">
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
              <h2 className="legendary-worn-heading font-optimus text-[clamp(1.5rem,3vw,2.2rem)] font-normal uppercase tracking-[0.06em] no-underline">
                <span className="legendary-worn-heading__text">
                  Legendary Figures
                </span>
              </h2>
            </div>
          </Reveal>

          {/* Asymmetrical Grid */}
          <div className="relative flex-1 grid grid-cols-1 gap-4 pb-16 md:grid-cols-12 md:h-full md:pb-[5rem] lg:pb-[5.5rem]">
            
            {/* Left Block: THE LORDS OF CINDER (imagen vertical + texto al lado) */}
            <div className="md:col-span-7 relative flex flex-col items-start gap-6 sm:flex-row sm:gap-8 md:gap-10 md:-translate-x-20 md:translate-y-8 lg:-translate-x-32 lg:translate-y-12 xl:-translate-x-44 xl:translate-y-16">
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

            {/* Right Block: THE UNKINDLED & OUTCASTS — imagen arriba a la derecha + texto debajo (estilo "The First Flame") */}
            <div className="md:col-span-5 flex flex-col gap-5 md:gap-6 self-start md:items-end md:translate-x-24 lg:translate-x-32 xl:translate-x-40">
              {/* Imagen pequeña arriba a la derecha */}
              <Reveal className="w-full sm:w-[88%] md:w-[90%]">
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
              <Reveal className="w-full sm:w-[88%] md:w-[90%]">
                <h3 className="font-optimus text-xl md:text-2xl uppercase tracking-[0.06em] text-amber-100/90 mb-4">
                  The Unkindled & Outcasts
                </h3>
                <p className="font-lore text-[0.95rem] md:text-[1.05rem] leading-[1.55] text-[#e0e0d8] antialiased normal-case tracking-tight max-w-prose">
                  For the NPCs, invaders, and companions you meet along the way. Silent witnesses to the end of the world.
                </p>
              </Reveal>
            </div>

            {/* THE ARCHIVED DEAD: bloque "War Against Dragons" — texto centro-bajo + imagen debajo */}
            <div className="mt-10 md:absolute md:bottom-0 md:left-[34%] md:mt-0 md:w-[34%] md:translate-x-0 md:translate-y-5 lg:left-[36%] lg:w-[32%] lg:translate-x-2 lg:translate-y-6 xl:translate-x-4 xl:translate-y-6">
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
