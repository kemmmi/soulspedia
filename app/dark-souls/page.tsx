import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Dark Souls | Soulspedia",
  description:
    "Chosen Undead — seek what came before the flame. Lore and context for Dark Souls.",
};

const heroTracking =
  "tracking-[0.06em] sm:tracking-[0.07em] md:tracking-[0.08em] lg:tracking-[0.09em] xl:tracking-[0.1em]";

const gamePageTitleTracking =
  "tracking-[0.012em] sm:tracking-[0.016em] md:tracking-[0.02em] lg:tracking-[0.024em] xl:tracking-[0.028em]";

const navLinkClassName =
  `block whitespace-nowrap bg-transparent text-[clamp(1.05rem,2.2vw,1.5rem)] font-semibold leading-none ${heroTracking} text-white/45 no-underline outline-none ring-0 transition-all duration-200 hover:text-white hover:[text-shadow:0_0_12px_rgba(252,211,77,0.65),0_0_26px_rgba(251,146,60,0.45),0_0_40px_rgba(234,88,12,0.25)] focus-visible:outline-none focus-visible:ring-0 sm:text-[clamp(1.15rem,2vw,1.75rem)] lg:text-2xl xl:text-3xl`;

export default function DarkSoulsPage() {
  return (
    <div className="relative flex min-h-0 flex-1 flex-col overflow-hidden">
      <div className="relative z-10 flex w-full flex-1 flex-col">
        <section
          className="relative flex min-h-[100svh] w-full flex-col items-center justify-start px-4 pb-16 pt-36 text-center sm:pt-40 md:px-8 md:pt-44"
          aria-label="Dark Souls hero"
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

          <a
            href="#ds1-general-lore"
            className={`relative mt-20 inline-flex items-center justify-center bg-transparent text-[clamp(0.95rem,2vw,1.25rem)] font-semibold leading-none ${heroTracking} text-amber-200/75 no-underline outline-none ring-0 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/25 [text-shadow:0_0_10px_rgba(70,38,10,0.7),0_0_22px_rgba(110,55,14,0.5)] after:absolute after:-bottom-2 after:left-1/2 after:h-px after:w-[min(34rem,92vw)] after:-translate-x-1/2 after:bg-gradient-to-r after:from-amber-200/0 after:via-amber-200/55 after:to-amber-200/0 after:opacity-90 after:blur-[0.2px]`}
            aria-label="Empezar a leer el lore"
          >
            UNRAVEL THE FIRST FLAME’S AGE — BEGIN READING
          </a>
        </section>

        <section
          id="ds1-general-lore"
          className="flex w-full justify-center scroll-mt-24 px-4 pb-12 md:px-8 md:pb-16"
          aria-labelledby="ds1-general-lore-title"
        >
          <div className="w-full max-w-3xl text-pretty lg:max-w-4xl">
            <h2 id="ds1-general-lore-title" className="sr-only">
              General story
            </h2>
            <div
              className={`space-y-5 text-center lowercase text-[clamp(0.8rem,2vw,1.0625rem)] font-semibold leading-relaxed text-white/88 sm:space-y-6 sm:text-base md:text-lg ${heroTracking}`}
            >
              <p>
                In the Age of Ancients, the world was unformed; grey crags and
                archtrees stood beneath a churning fog. Then came fire — and
                with it, disparity: light and dark, life and death, warmth and
                cold. From the First Flame rose four beings who would shape
                everything that followed.
              </p>
              <p>
                That age has long since waned. You awaken as an Undead locked
                away, then cast into Lordran: a land of fallen kingdoms, fading
                fire, and scraps of truth buried under ash. The story you
                uncover is not told in a straight line; it lingers in item
                text, broken dialogue, and the silence between ruins.
              </p>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
}
