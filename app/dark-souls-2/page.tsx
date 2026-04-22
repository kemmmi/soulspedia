import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Dark Souls II | Soulspedia",
  description:
    "Bearer of the Curse — seek what remains when memory fades. Lore for Dark Souls II.",
};

const heroTracking =
  "tracking-[0.06em] sm:tracking-[0.07em] md:tracking-[0.08em] lg:tracking-[0.09em] xl:tracking-[0.1em]";

const gamePageTitleTracking =
  "tracking-[0.012em] sm:tracking-[0.016em] md:tracking-[0.02em] lg:tracking-[0.024em] xl:tracking-[0.028em]";

const navLinkClassName =
  `block whitespace-nowrap bg-transparent text-[clamp(1.05rem,2.2vw,1.5rem)] font-semibold leading-none ${heroTracking} text-white/45 no-underline outline-none ring-0 transition-all duration-200 hover:text-white hover:[text-shadow:0_0_12px_rgba(252,211,77,0.65),0_0_26px_rgba(251,146,60,0.45),0_0_40px_rgba(234,88,12,0.25)] focus-visible:outline-none focus-visible:ring-0 sm:text-[clamp(1.15rem,2vw,1.75rem)] lg:text-2xl xl:text-3xl`;

export default function DarkSouls2Page() {
  return (
    <div className="relative flex min-h-0 flex-1 flex-col overflow-hidden">
      <div className="relative z-10 flex w-full flex-1 flex-col">
        <section
          className="relative flex min-h-[100svh] w-full flex-col items-center justify-start px-4 pb-16 pt-36 text-center sm:pt-40 md:px-8 md:pt-44"
          aria-label="Dark Souls II hero"
        >
          <header className="flex w-full max-w-5xl flex-col items-center lg:max-w-6xl">
            <h1
              className={`text-5xl font-semibold leading-none text-white sm:text-6xl md:text-7xl lg:text-8xl ${gamePageTitleTracking} [text-shadow:0_0_10px_rgba(70,38,10,0.75),0_0_24px_rgba(110,55,14,0.55),0_0_44px_rgba(50,24,6,0.35)]`}
            >
              DARK SOULS II
            </h1>
            <p
              className={`mt-7 max-w-3xl text-balance px-2 text-[clamp(0.5rem,2.1vw,1.35rem)] font-semibold leading-snug text-white sm:max-w-4xl sm:mt-8 sm:text-[clamp(0.55rem,2.2vw,1.5rem)] md:max-w-5xl lg:text-2xl xl:text-3xl ${heroTracking} [text-shadow:0_0_10px_rgba(120,66,20,0.75),0_0_24px_rgba(160,82,25,0.55),0_0_44px_rgba(90,45,10,0.35)]`}
            >
              BEARER OF THE CURSE — SEEK WHAT REMAINS WHEN MEMORY FADES
            </p>
          </header>

          <nav
            className="mt-14 flex w-full max-w-2xl flex-col items-center justify-center gap-9 sm:mt-16 sm:flex-row sm:gap-20"
            aria-label="Dark Souls II sections"
          >
            <Link href="/dark-souls-2/characters" className={navLinkClassName}>
              CHARACTERS
            </Link>
            <Link href="/dark-souls-2/forum" className={navLinkClassName}>
              FORUM
            </Link>
          </nav>

          <a
            href="#ds2-general-lore"
            className={`relative mt-20 inline-flex items-center justify-center bg-transparent text-[clamp(0.95rem,2vw,1.25rem)] font-semibold leading-none ${heroTracking} text-amber-200/75 no-underline outline-none ring-0 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/25 [text-shadow:0_0_10px_rgba(70,38,10,0.7),0_0_22px_rgba(110,55,14,0.5)] after:absolute after:-bottom-2 after:left-1/2 after:h-px after:w-[min(34rem,92vw)] after:-translate-x-1/2 after:bg-gradient-to-r after:from-amber-200/0 after:via-amber-200/55 after:to-amber-200/0 after:opacity-90 after:blur-[0.2px]`}
            aria-label="Empezar a leer el lore"
          >
            UNRAVEL THE FIRST FLAME’S AGE — BEGIN READING
          </a>
        </section>

        <section
          id="ds2-general-lore"
          className="flex w-full justify-center scroll-mt-24 px-4 pb-12 md:px-8 md:pb-16"
          aria-labelledby="ds2-general-lore-title"
        >
          <div className="w-full max-w-3xl text-pretty lg:max-w-4xl">
            <h2 id="ds2-general-lore-title" className="sr-only">
              General story
            </h2>
            <div
            className={`font-lore space-y-5 text-center lowercase text-[clamp(0.8rem,2vw,1.0625rem)] font-normal leading-relaxed text-white/88 sm:space-y-6 sm:text-base md:text-lg ${heroTracking}`}
            >
              <p>
                You cross the sea to the fallen kingdom of Drangleic — a name
                half remembered, a crown split among those who would claim it.
                The curse does not only hollow the body: it frays recollection
                until even purpose blurs, and still you are drawn toward the
                throne that waits beyond loss.
              </p>
              <p>
                Here the First Flame is a distant echo; what matters are the
                shards of story left in dialogue, in decayed courts, and in the
                silence where a kingdom once made sense. Nothing spells itself
                out; the truth hides behind Vendrick, Nashandra, and the weight
                you agree to bear step by step.
              </p>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
}
