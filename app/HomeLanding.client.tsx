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

const reviews = [
  {
    score: "9/10",
    quote: "A quiet atlas for a series that hides its truth in item text.",
    outlet: "Editorial · Soulspedia",
  },
  {
    score: "—",
    quote: "Reads like a journal kept by someone who refuses to go hollow.",
    outlet: "Reader digest",
  },
  {
    score: "★★★★½",
    quote: "Clear without flattening the lore; sober without losing wonder.",
    outlet: "Catalog",
  },
  {
    score: "A",
    quote: "Three kingdoms, one fire, and a guide that respects the silence.",
    outlet: "Press picks",
  },
  {
    score: "92%",
    quote: "It treats Lordran, Drangleic and Lothric as one long farewell.",
    outlet: "Retrospective",
  },
  {
    score: "★★★★½",
    quote: "Wikis throw data at you. Soulspedia hands you a candle.",
    outlet: "Feature",
  },
] as const;

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
      className="font-lore text-center text-[clamp(2rem,5.5vw,3.25rem)] font-normal italic uppercase tracking-[0.06em] text-white/95 [text-shadow:0_0_18px_rgba(0,0,0,0.85),0_0_44px_rgba(80,40,10,0.32)]"
    >
      {children}
    </h2>
  );
}

function EclipsePlate() {
  return (
    <div
      className="relative mx-auto aspect-square w-full max-w-[min(100%,22rem)] md:max-w-none"
      aria-hidden
    >
      <div
        className="absolute inset-[-6%] rounded-full opacity-95 blur-2xl"
        style={{
          background:
            "radial-gradient(circle at 50% 48%, rgba(255,90,40,0.22) 0%, rgba(120,40,10,0.18) 38%, transparent 64%)",
        }}
      />
      <div className="absolute inset-[8%] rounded-full bg-black shadow-[inset_0_0_60px_rgba(0,0,0,1),0_0_60px_rgba(255,80,38,0.18)] ring-1 ring-amber-500/30" />
      <div className="absolute inset-[24%] rounded-full border-[3px] border-amber-400/70 shadow-[0_0_42px_rgba(255,100,40,0.22),inset_0_0_50px_rgba(0,0,0,0.95)]" />
      <div className="absolute bottom-[10%] left-1/2 h-[44%] w-px -translate-x-1/2 bg-gradient-to-b from-amber-300/85 via-orange-900/55 to-transparent" />
    </div>
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
      {/* SVG filters utilizados por las clases .font-eroded-* (no visible) */}
      <svg
        aria-hidden
        focusable="false"
        width="0"
        height="0"
        className="pointer-events-none absolute"
        style={{ position: "absolute", overflow: "hidden" }}
      >
        <defs>
          <filter
            id="hero-erode-mask"
            x="-5%"
            y="-5%"
            width="110%"
            height="110%"
          >
            <feTurbulence
              type="fractalNoise"
              baseFrequency="0.55"
              numOctaves="2"
              seed="9"
              result="noise"
            />
            <feColorMatrix
              in="noise"
              type="matrix"
              values="0 0 0 0 0
                      0 0 0 0 0
                      0 0 0 0 0
                      0 0 0 -1 1.35"
              result="alphaMask"
            />
            <feComposite
              in="SourceGraphic"
              in2="alphaMask"
              operator="in"
              result="masked"
            />
            <feTurbulence
              type="fractalNoise"
              baseFrequency="0.95"
              numOctaves="1"
              seed="2"
              result="grain"
            />
            <feDisplacementMap
              in="masked"
              in2="grain"
              scale="2"
              xChannelSelector="R"
              yChannelSelector="G"
            />
          </filter>
        </defs>
      </svg>

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
          <div className="flex max-w-2xl flex-col items-center text-center md:items-end md:text-right">
            <motion.p
              className="font-lore text-[clamp(0.75rem,1.6vw,1rem)] italic uppercase tracking-[0.42em] text-white/85"
              initial={reduce ? false : { opacity: 0 }}
              animate={reduce ? false : { opacity: 1 }}
              transition={{
                duration: intro.sloganDuration * 0.85,
                delay: reduce ? 0 : intro.sloganDelay,
                ease,
              }}
            >
              EMBRACE THE DARKNESS
            </motion.p>

            <motion.h1
              id="home-hero-title"
              className="font-eroded-mask mt-4 text-[clamp(2.6rem,10vw,6rem)] uppercase leading-[0.96] tracking-[0.04em]"
              initial={reduce ? false : { opacity: 0 }}
              animate={reduce ? false : { opacity: 1 }}
              transition={{
                duration: intro.sloganDuration,
                delay: reduce ? 0 : intro.sloganDelay + 0.18,
                ease,
              }}
            >
              KEEP THE FLAME LIT
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
                  className={`font-lore text-[0.78rem] font-semibold uppercase tracking-[0.32em] text-white/70 transition-colors duration-200 hover:text-white ${i > 0 ? "border-l border-white/20 pl-7" : ""}`}
                >
                  {g.label === "DARK SOULS" ? "I" : g.label === "DARK SOULS II" ? "II" : "III"}
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
        className="relative scroll-mt-28 px-5 py-24 md:px-10 md:py-32"
      >
        <Reveal className="mx-auto max-w-6xl">
          <SectionTitle id="home-story-title">The Story</SectionTitle>

          <div className="mt-16 grid items-center gap-14 lg:grid-cols-[minmax(0,1fr)_minmax(0,0.9fr)] lg:gap-20">
            <div className="relative overflow-hidden rounded-sm border border-white/[0.07] bg-black/55 p-8 shadow-[inset_0_1px_0_rgba(255,255,255,0.03),0_24px_64px_rgba(0,0,0,0.5)] backdrop-blur-[2px] md:p-10">
              <div className="font-lore space-y-6 text-[1rem] leading-[1.85] text-white/82 md:text-[1.05rem]">
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
            <EclipsePlate />
          </div>
        </Reveal>
      </section>

      {/* ----------- THE WORLD ----------- */}
      <section
        id="world"
        aria-labelledby="home-world-title"
        className="relative scroll-mt-28 px-5 py-24 md:px-10 md:py-32"
      >
        <Reveal className="mx-auto max-w-6xl">
          <SectionTitle id="home-world-title">The World</SectionTitle>

          <div className="mt-16 grid gap-14 lg:grid-cols-12 lg:gap-12">
            <div className="lg:col-span-5">
              <Link
                href={games[0].href}
                className="group relative block aspect-[3/4] overflow-hidden rounded-sm border border-white/[0.07] shadow-[0_24px_64px_rgba(0,0,0,0.55)] lg:sticky lg:top-28"
              >
                <Image
                  src="/gwyn.jpg"
                  alt="Lord of Sunlight, Gwyn"
                  fill
                  sizes="(max-width:1024px) 100vw, 38vw"
                  className="object-cover object-center transition-transform duration-700 group-hover:scale-[1.02]"
                />
                <span
                  className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/85 via-black/15 to-black/35"
                  aria-hidden
                />
                <span className="absolute bottom-6 left-6 right-6">
                  <span className="font-lore text-[0.65rem] uppercase tracking-[0.32em] text-amber-200/80">
                    Begin here
                  </span>
                  <span className="mt-2 block font-lore text-2xl font-normal uppercase tracking-[0.05em] text-white/95">
                    Where it all started
                  </span>
                </span>
              </Link>
            </div>

            <div className="flex flex-col gap-12 lg:col-span-7">
              {games.map((g, idx) => (
                <article
                  key={g.href}
                  className={
                    idx % 2 === 0
                      ? "lg:-translate-x-2"
                      : "lg:translate-x-6"
                  }
                >
                  <div className="grid items-start gap-6 sm:grid-cols-[minmax(0,1fr)_minmax(0,0.95fr)] sm:gap-8">
                    <div className="min-w-0">
                      <h3 className="font-lore text-[1.35rem] font-normal uppercase tracking-[0.06em] text-white/95 md:text-2xl">
                        {g.label}
                      </h3>
                      <p className="mt-4 font-lore text-[0.95rem] leading-relaxed text-white/72 md:text-base">
                        {g.blurb}
                      </p>
                      <Link
                        href={g.href}
                        className="mt-5 inline-block font-lore text-[0.7rem] font-semibold uppercase tracking-[0.32em] text-amber-200/85 underline-offset-4 transition-colors duration-200 hover:text-amber-100 hover:underline"
                      >
                        Read its lore →
                      </Link>
                    </div>
                    <Link
                      href={g.href}
                      className="group relative aspect-[16/11] overflow-hidden rounded-sm border border-white/[0.08]"
                      aria-label={`Visit ${g.label}`}
                    >
                      <Image
                        src={g.image}
                        alt={g.label}
                        fill
                        sizes="(max-width:640px) 100vw, 36vw"
                        className="object-cover transition-transform duration-500 group-hover:scale-[1.04]"
                      />
                      <span
                        className="pointer-events-none absolute inset-0 ring-1 ring-inset ring-black/40"
                        aria-hidden
                      />
                    </Link>
                  </div>
                </article>
              ))}
            </div>
          </div>
        </Reveal>
      </section>

      {/* ----------- MEDIA ----------- */}
      <section
        id="media"
        aria-labelledby="home-media-title"
        className="relative scroll-mt-28 px-5 py-24 md:px-10 md:py-32"
      >
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

      {/* ----------- REVIEWS ----------- */}
      <section
        id="reviews"
        aria-labelledby="home-reviews-title"
        className="relative scroll-mt-28 px-5 py-24 md:px-10 md:py-32"
      >
        <Reveal className="mx-auto max-w-6xl">
          <SectionTitle id="home-reviews-title">Reviews</SectionTitle>

          <div className="mt-16 grid gap-x-12 gap-y-14 sm:grid-cols-2 lg:grid-cols-3">
            {reviews.map((r, idx) => (
              <article key={`${idx}-${r.outlet}`} className="text-center">
                <p className="font-lore text-[2.4rem] font-normal leading-none text-white/95 md:text-[2.6rem]">
                  {r.score}
                </p>
                <p className="mx-auto mt-5 max-w-[28ch] font-lore text-[0.95rem] italic leading-relaxed text-white/72">
                  &ldquo;{r.quote}&rdquo;
                </p>
                <p className="mt-6 font-lore text-[0.7rem] font-semibold uppercase tracking-[0.32em] text-amber-200/82">
                  {r.outlet}
                </p>
              </article>
            ))}
          </div>
        </Reveal>
      </section>

      {/* ----------- FOOTER PROPIO DE LA HOME ----------- */}
      <footer className="relative border-t border-white/[0.07] px-6 py-16 text-center md:px-10">
        <div className="mx-auto flex max-w-5xl flex-col items-center gap-10">
          <Link
            href="/"
            className="font-lore text-2xl font-normal uppercase tracking-[0.32em] text-white/95 transition-colors hover:text-amber-100/95 md:text-3xl"
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
