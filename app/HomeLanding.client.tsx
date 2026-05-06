"use client";

import { Reveal } from "@/components/motion/Reveal";
import { fsMotion } from "@/lib/motion/fromSoftware";
import Image from "next/image";
import Link from "next/link";
import { motion, useReducedMotion } from "framer-motion";
import { useCallback, useEffect, useState, type ReactNode } from "react";

const intro = fsMotion.homeIntro;

/* ------------------------------------------------------------------ */
/*  Datos                                                              */
/* ------------------------------------------------------------------ */

const games = [
  {
    href: "/dark-souls",
    label: "DARK SOULS",
    blurb:
      "Lordran’s first ember: where every parish, sewer and elevator is a footnote to the same fire.",
    image: "/darksoulsfondo.jpg",
  },
  {
    href: "/dark-souls-2",
    label: "DARK SOULS II",
    blurb:
      "Drangleic and the curse of remembering: thrones split, crowns weighed, memory as territory.",
    image: "/darksouls2fondo.jpg",
  },
  {
    href: "/dark-souls-3",
    label: "DARK SOULS III",
    blurb:
      "Ash seeking ash: bosses as elegies and a cycle that no longer knows how to end cleanly.",
    image: "/darksouls3.jpg",
  },
] as const;

const mediaSets = {
  videos: [
    { src: "/darksoulsfondo3.jpg", alt: "Lordran ramparts" },
    { src: "/darksouls2fondo3.jpg", alt: "Drangleic vista" },
    { src: "/darksouls3.jpg", alt: "Lothric sky" },
  ],
  screenshots: [
    { src: "/gwyn.jpg", alt: "Throne of the first lord" },
    { src: "/witchofizalith2.jpg", alt: "Witch of Izalith" },
    { src: "/gravelordnito.jpg", alt: "Tomb of the Giants" },
  ],
} as const;

/* ------------------------------------------------------------------ */
/*  Helpers                                                            */
/* ------------------------------------------------------------------ */

function SectionTitle({
  children,
  id,
}: {
  children: ReactNode;
  id?: string;
}) {
  return (
    <h2
      id={id}
      className="font-optimus text-center text-[clamp(2rem,5.5vw,3.25rem)] font-normal uppercase tracking-[0.06em] text-white/95 [text-shadow:0_0_18px_rgba(0,0,0,0.85),0_0_44px_rgba(80,40,10,0.32)]"
    >
      {children}
    </h2>
  );
}

function MediaStrip({
  items,
}: {
  items: ReadonlyArray<{ src: string; alt: string }>;
}) {
  const [active, setActive] = useState(() =>
    Math.max(0, Math.min(Math.floor(items.length / 2), items.length - 1)),
  );

  useEffect(() => {
    setActive(
      Math.max(0, Math.min(Math.floor(items.length / 2), items.length - 1)),
    );
  }, [items.length]);

  const go = useCallback(
    (delta: number) => {
      setActive((i) => {
        const n = items.length;
        if (n <= 0) return 0;
        return Math.max(0, Math.min(i + delta, n - 1));
      });
    },
    [items.length],
  );

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "ArrowLeft") go(-1);
      if (e.key === "ArrowRight") go(1);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [go]);

  if (items.length === 0) return null;

  return (
    <div className="w-full">
      <div className="flex flex-col items-stretch gap-5 md:flex-row md:items-center md:justify-center md:gap-4 lg:gap-6">
        {items.map((item, i) => {
          const isFocus = i === active;
          const widthClass = isFocus
            ? "mx-auto w-full max-w-xl opacity-100 md:mx-0 md:w-[min(100%,32rem)]"
            : "mx-auto w-[min(80%,18rem)] opacity-[0.55] md:w-[min(34%,15rem)]";
          return (
            <button
              key={`${item.src}-${i}`}
              type="button"
              onClick={() => setActive(i)}
              aria-label={`Open media ${i + 1}`}
              aria-current={isFocus}
              className={`relative shrink-0 overflow-hidden rounded-sm border bg-black/55 transition-[opacity,box-shadow,transform,border-color] duration-500 ease-out hover:border-amber-500/40 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-amber-300/50 ${widthClass} aspect-video ${isFocus ? "border-amber-500/45 shadow-[0_18px_60px_rgba(0,0,0,0.55)]" : "border-white/[0.07]"}`}
            >
              <Image
                src={item.src}
                alt={item.alt}
                fill
                sizes="(max-width:768px) 80vw, 32rem"
                className={`object-cover transition-transform duration-500 ${isFocus ? "scale-100" : "scale-[1.02]"}`}
              />
              <span
                className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/75 via-black/15 to-black/30"
                aria-hidden
              />
              <span className="pointer-events-none absolute inset-0 flex items-center justify-center">
                <span className="flex h-12 w-12 items-center justify-center rounded-full border border-white/40 bg-black/45 text-base text-white/95 shadow-[0_0_28px_rgba(0,0,0,0.55)] md:h-14 md:w-14">
                  ▶
                </span>
              </span>
            </button>
          );
        })}
      </div>
      <div className="mt-7 flex items-center justify-center gap-3">
        {items.map((_, i) => (
          <button
            key={i}
            type="button"
            onClick={() => setActive(i)}
            aria-label={`Go to media ${i + 1}`}
            className={`size-2 rounded-full border transition-colors ${i === active ? "border-amber-300/85 bg-amber-300/85" : "border-white/35 bg-transparent hover:border-white/60"}`}
          />
        ))}
      </div>
    </div>
  );
}

/* ------------------------------------------------------------------ */
/*  Página                                                             */
/* ------------------------------------------------------------------ */

export function HomeLanding() {
  const reduce = useReducedMotion();
  const ease = fsMotion.ease;

  const [mediaTab, setMediaTab] = useState<"videos" | "screenshots">("videos");
  const mediaItems = mediaSets[mediaTab];

  return (
    <div className="relative w-full text-white">
      {/* ----------- HERO ----------- */}
      <section
        aria-labelledby="home-hero-title"
        className="relative -mt-24 flex min-h-[100svh] w-full flex-col overflow-hidden md:-mt-28"
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

        {/* Sombras superior e inferior para legibilidad y empalme con el cuerpo */}
        <div
          className="pointer-events-none absolute inset-x-0 top-0 z-[3] h-48 bg-gradient-to-b from-black/85 via-black/40 to-transparent"
          aria-hidden
        />
        <div
          className="pointer-events-none absolute inset-x-0 bottom-0 z-[3] h-72 bg-gradient-to-t from-black via-black/80 to-transparent"
          aria-hidden
        />

        <div className="relative z-[10] mx-auto flex w-full max-w-7xl flex-1 items-center justify-center px-6 pt-28 pb-24 md:justify-end md:px-12 md:pt-36">
          <div className="flex max-w-3xl flex-col items-center text-center md:items-end md:text-right">
            <motion.p
              className="font-optimus text-[clamp(0.95rem,2.1vw,1.35rem)] uppercase tracking-[0.32em] text-white/85"
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
              className="font-optimus mt-4 text-[clamp(2.2rem,8.2vw,5.25rem)] uppercase leading-[0.98] tracking-[0.035em] text-white [text-shadow:0_0_14px_rgba(0,0,0,0.82),0_0_42px_rgba(75,42,12,0.38),0_0_88px_rgba(42,22,8,0.22)]"
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

            <motion.div
              className="mt-10 flex flex-wrap items-center justify-center gap-x-7 gap-y-3 md:justify-end"
              initial={reduce ? false : { opacity: 0 }}
              animate={reduce ? false : { opacity: 1 }}
              transition={{
                duration: 0.95,
                delay: reduce ? 0 : intro.sloganDelay + 0.55,
                ease,
              }}
              aria-label="Hero shortcuts"
            >
              {games.map((g, i) => (
                <Link
                  key={g.href}
                  href={g.href}
                  className={`font-optimus text-[0.95rem] uppercase tracking-[0.18em] text-white/70 transition-colors duration-200 hover:text-white md:text-base ${i > 0 ? "border-l border-white/20 pl-7" : ""}`}
                >
                  {g.label}
                </Link>
              ))}
            </motion.div>
          </div>
        </div>
      </section>

      {/* ----------- THE STORY ----------- */}
      <section
        id="story"
        aria-labelledby="home-story-title"
        className="relative scroll-mt-28 overflow-hidden px-5 py-24 md:px-10 md:py-32"
      >
        {/* Fondo atmosférico de la sección + empalmes con bloques contiguos */}
        <div className="pointer-events-none absolute inset-0 -z-10" aria-hidden>
          <Image
            src="/darksoulsfondo7.jpg"
            alt=""
            fill
            sizes="100vw"
            className="object-cover object-center"
          />
          <div className="absolute inset-0 bg-black/88" />
          <div className="absolute inset-x-0 top-0 h-40 bg-gradient-to-b from-black via-black/80 to-transparent" />
          <div className="absolute inset-x-0 bottom-0 h-40 bg-gradient-to-t from-black via-black/80 to-transparent" />
        </div>

        <Reveal className="mx-auto max-w-6xl">
          <article className="relative overflow-hidden rounded-sm border border-white/10 shadow-[0_24px_64px_rgba(0,0,0,0.55)]">
            <Image
              src="/darksouls3fondo.jpg"
              alt=""
              fill
              priority={false}
              sizes="(max-width:1024px) 100vw, 64rem"
              className="object-cover object-center"
            />
            <div className="absolute inset-0 bg-black/65" aria-hidden />
            <div
              className="absolute inset-0 bg-gradient-to-r from-black/65 via-black/25 to-transparent"
              aria-hidden
            />

            <div className="relative px-6 py-14 md:px-12 md:py-20">
              <SectionTitle id="home-story-title">The Story</SectionTitle>

              <div className="mt-8 max-w-2xl space-y-6 font-lore text-[clamp(0.9rem,2vw,1.0625rem)] font-normal leading-[1.85] text-white/88 md:text-[1.05rem]">
                <p>
                  Soulspedia is a quiet atlas for the Souls series — a place
                  where lore, characters and weapons stand under the same sky,
                  waiting for someone patient enough to read between the
                  embers.
                </p>
                <p>
                  Three kingdoms — Lordran, Drangleic and Lothric — share one
                  flame and one long farewell. Here you’ll find the threads
                  that hold them together: kindling, betrayal, memory and the
                  choice of whether to link the fire one more time.
                </p>
                <p>
                  Nothing is rushed; nothing is spelled out for the wrong
                  reasons. Read at your own pace and let the silence between
                  ruins do its part.
                </p>
              </div>
            </div>
          </article>
        </Reveal>
      </section>

      {/* ----------- THE WORLD ----------- */}
      <section
        id="world"
        aria-labelledby="home-world-title"
        className="relative scroll-mt-28 overflow-hidden px-5 py-24 md:px-10 md:py-32"
      >
        {/* Fondo atmosférico (bosque/Drangleic) + empalmes */}
        <div className="pointer-events-none absolute inset-0 -z-10" aria-hidden>
          <Image
            src="/darksouls2fondo3.jpg"
            alt=""
            fill
            sizes="100vw"
            className="object-cover object-center"
          />
          <div className="absolute inset-0 bg-black/82" />
          <div className="absolute inset-x-0 top-0 h-40 bg-gradient-to-b from-black via-black/80 to-transparent" />
          <div className="absolute inset-x-0 bottom-0 h-40 bg-gradient-to-t from-black via-black/80 to-transparent" />
        </div>

        <Reveal className="mx-auto max-w-6xl">
          <SectionTitle id="home-world-title">The World</SectionTitle>

          {/*
           * Composición tipo «Mondrian» (mobile: stack DS → DS II → DS III).
           * Desktop (≥lg): rejilla 12×3 con posiciones explícitas:
           *   - DS  imagen vertical: col 1-5,  row 1-3 (toda la altura).
           *   - DS  texto:           col 7-9,  row 1.
           *   - DS3 imagen:          col 10-12,row 1.
           *   - DS2 texto:           col 7-9,  row 2.
           *   - DS3 texto:           col 10-12,row 2.
           *   - DS2 imagen ancha:    col 7-12, row 3.
           */}
          <div className="mt-16 flex flex-col gap-14 lg:grid lg:grid-cols-12 lg:grid-rows-[auto_auto_auto] lg:gap-x-8 lg:gap-y-12">
            {/* DS — imagen vertical (izquierda, full height) */}
            <Link
              href={games[0].href}
              aria-label={`Visit ${games[0].label}`}
              className="group relative block aspect-[3/4] overflow-hidden rounded-sm border border-white/[0.08] shadow-[0_24px_64px_rgba(0,0,0,0.5)] lg:col-span-5 lg:col-start-1 lg:row-span-3 lg:row-start-1 lg:aspect-auto"
            >
              <Image
                src={games[0].image}
                alt={games[0].label}
                fill
                sizes="(max-width:1024px) 100vw, 40vw"
                className="object-cover object-center transition-transform duration-500 group-hover:scale-[1.03]"
              />
              <span
                className="pointer-events-none absolute inset-0 ring-1 ring-inset ring-black/40"
                aria-hidden
              />
            </Link>

            {/* DS — texto (arriba centro) */}
            <div className="lg:col-span-3 lg:col-start-7 lg:row-start-1">
              <h3 className="font-optimus text-[1.35rem] font-normal uppercase tracking-[0.06em] text-white/95 md:text-2xl">
                {games[0].label}
              </h3>
              <p className="mt-4 font-lore text-[0.95rem] leading-relaxed text-white/72 md:text-base">
                {games[0].blurb}
              </p>
              <Link
                href={games[0].href}
                className="mt-5 inline-block font-lore text-[0.7rem] font-semibold uppercase tracking-[0.32em] text-amber-200/85 underline-offset-4 transition-colors duration-200 hover:text-amber-100 hover:underline"
              >
                Read its lore →
              </Link>
            </div>

            {/* DS II — texto (medio centro) */}
            <div className="lg:col-span-3 lg:col-start-7 lg:row-start-2">
              <h3 className="font-optimus text-[1.35rem] font-normal uppercase tracking-[0.06em] text-white/95 md:text-2xl">
                {games[1].label}
              </h3>
              <p className="mt-4 font-lore text-[0.95rem] leading-relaxed text-white/72 md:text-base">
                {games[1].blurb}
              </p>
              <Link
                href={games[1].href}
                className="mt-5 inline-block font-lore text-[0.7rem] font-semibold uppercase tracking-[0.32em] text-amber-200/85 underline-offset-4 transition-colors duration-200 hover:text-amber-100 hover:underline"
              >
                Read its lore →
              </Link>
            </div>

            {/* DS II — imagen ancha (abajo, ocupa toda la columna derecha) */}
            <Link
              href={games[1].href}
              aria-label={`Visit ${games[1].label}`}
              className="group relative block aspect-[16/10] overflow-hidden rounded-sm border border-white/[0.08] shadow-[0_24px_64px_rgba(0,0,0,0.5)] lg:col-span-6 lg:col-start-7 lg:row-start-3 lg:aspect-[16/9]"
            >
              <Image
                src={games[1].image}
                alt={games[1].label}
                fill
                sizes="(max-width:1024px) 100vw, 50vw"
                className="object-cover object-center transition-transform duration-500 group-hover:scale-[1.03]"
              />
              <span
                className="pointer-events-none absolute inset-0 ring-1 ring-inset ring-black/40"
                aria-hidden
              />
            </Link>

            {/* DS III — imagen (arriba derecha) */}
            <Link
              href={games[2].href}
              aria-label={`Visit ${games[2].label}`}
              className="group relative block aspect-[16/11] overflow-hidden rounded-sm border border-white/[0.08] shadow-[0_24px_64px_rgba(0,0,0,0.5)] lg:col-span-3 lg:col-start-10 lg:row-start-1"
            >
              <Image
                src={games[2].image}
                alt={games[2].label}
                fill
                sizes="(max-width:1024px) 100vw, 25vw"
                className="object-cover object-center transition-transform duration-500 group-hover:scale-[1.03]"
              />
              <span
                className="pointer-events-none absolute inset-0 ring-1 ring-inset ring-black/40"
                aria-hidden
              />
            </Link>

            {/* DS III — texto (medio derecha) */}
            <div className="lg:col-span-3 lg:col-start-10 lg:row-start-2">
              <h3 className="font-optimus text-[1.35rem] font-normal uppercase tracking-[0.06em] text-white/95 md:text-2xl">
                {games[2].label}
              </h3>
              <p className="mt-4 font-lore text-[0.95rem] leading-relaxed text-white/72 md:text-base">
                {games[2].blurb}
              </p>
              <Link
                href={games[2].href}
                className="mt-5 inline-block font-lore text-[0.7rem] font-semibold uppercase tracking-[0.32em] text-amber-200/85 underline-offset-4 transition-colors duration-200 hover:text-amber-100 hover:underline"
              >
                Read its lore →
              </Link>
            </div>
          </div>
        </Reveal>
      </section>

      {/* ----------- MEDIA ----------- */}
      <section
        id="media"
        aria-labelledby="home-media-title"
        className="relative scroll-mt-28 overflow-hidden px-5 py-24 md:px-10 md:py-32"
      >
        {/* Fondo atmosférico oscuro (más sombrío que las anteriores) + empalmes */}
        <div className="pointer-events-none absolute inset-0 -z-10" aria-hidden>
          <Image
            src="/darksoulsfondo6.jpg"
            alt=""
            fill
            sizes="100vw"
            className="object-cover object-center"
          />
          <div className="absolute inset-0 bg-black/86" />
          <div className="absolute inset-x-0 top-0 h-40 bg-gradient-to-b from-black via-black/80 to-transparent" />
          <div className="absolute inset-x-0 bottom-0 h-40 bg-gradient-to-t from-black via-black/80 to-transparent" />
        </div>

        <Reveal className="mx-auto max-w-6xl">
          <SectionTitle id="home-media-title">Media</SectionTitle>

          <div role="tablist" aria-label="Media type" className="mt-12 flex justify-center gap-12">
            <button
              type="button"
              role="tab"
              aria-selected={mediaTab === "videos"}
              onClick={() => setMediaTab("videos")}
              className={`pb-2 font-lore text-xs font-semibold uppercase tracking-[0.36em] transition-colors md:text-[0.8125rem] ${mediaTab === "videos" ? "border-b border-amber-400/85 text-white/95" : "border-b border-transparent text-white/45 hover:text-white/75"}`}
            >
              Videos
            </button>
            <button
              type="button"
              role="tab"
              aria-selected={mediaTab === "screenshots"}
              onClick={() => setMediaTab("screenshots")}
              className={`pb-2 font-lore text-xs font-semibold uppercase tracking-[0.36em] transition-colors md:text-[0.8125rem] ${mediaTab === "screenshots" ? "border-b border-amber-400/85 text-white/95" : "border-b border-transparent text-white/45 hover:text-white/75"}`}
            >
              Screenshots
            </button>
          </div>

          <div className="mt-12">
            <MediaStrip items={mediaItems} />
          </div>
        </Reveal>
      </section>

      {/* ----------- FOOTER PROPIO DE LA HOME ----------- */}
      <footer className="relative border-t border-white/[0.07] px-6 py-16 text-center md:px-10">
        <div className="mx-auto flex max-w-5xl flex-col items-center gap-10">
          <Link
            href="/"
            className="font-optimus text-2xl font-normal uppercase tracking-[0.32em] text-white/95 transition-colors hover:text-amber-100/95 md:text-3xl"
          >
            SOULSPEDIA
          </Link>

          <nav
            aria-label="Explore the worlds"
            className="flex flex-wrap items-center justify-center gap-x-8 gap-y-3"
          >
            <span className="font-lore text-[0.65rem] uppercase tracking-[0.32em] text-white/45">
              Explore
            </span>
            {games.map((g) => (
              <Link
                key={g.href}
                href={g.href}
                className="font-lore text-[0.7rem] font-semibold uppercase tracking-[0.32em] text-white/70 transition-colors hover:text-white"
              >
                {g.label}
              </Link>
            ))}
          </nav>

          <div className="flex flex-col items-center gap-2">
            <span className="font-lore text-[0.6rem] uppercase tracking-[0.36em] text-white/35">
              A fan-made archive
            </span>
            <span className="font-lore text-[0.65rem] uppercase tracking-[0.32em] text-white/55">
              © 2026 Soulspedia
            </span>
          </div>
        </div>
      </footer>
    </div>
  );
}
