import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Dark Souls III | Soulspedia",
  description:
    "Ashen One — seek what the dying flame still remembers. Lore for Dark Souls III.",
};

const heroTracking =
  "tracking-[0.06em] sm:tracking-[0.07em] md:tracking-[0.08em] lg:tracking-[0.09em] xl:tracking-[0.1em]";

const gamePageTitleTracking =
  "tracking-[0.035em] sm:tracking-[0.04em] md:tracking-[0.045em] lg:tracking-[0.05em] xl:tracking-[0.055em]";

const navButtonClassName =
  "flex min-w-[11rem] items-center justify-center rounded-[5px] bg-black px-10 py-3 text-xs font-semibold tracking-widest text-amber-100 transition hover:bg-black/90 hover:text-amber-50 sm:min-w-[13rem] sm:text-sm";

export default function DarkSouls3Page() {
  return (
    <div className="relative flex min-h-0 flex-1 flex-col overflow-hidden bg-black">
      <div className="relative z-10 flex w-full flex-1 flex-col items-center overflow-x-visible px-4 pb-12 pt-6 md:px-8 md:pb-16 md:pt-8">
        <header className="mb-10 flex w-full max-w-5xl flex-col items-center text-center md:mb-12 lg:max-w-6xl">
          <h1
            className={`text-5xl font-semibold leading-none text-white drop-shadow-[0_0_32px_rgba(255,255,255,0.55)] sm:text-6xl md:text-7xl lg:text-8xl lg:drop-shadow-[0_0_40px_rgba(255,255,255,0.5)] ${gamePageTitleTracking}`}
          >
            DARK SOULS III
          </h1>
          <p
            className={`mt-5 max-w-3xl text-balance px-2 text-[clamp(0.5rem,2.1vw,1.35rem)] font-semibold leading-snug text-white sm:max-w-4xl sm:mt-6 sm:text-[clamp(0.55rem,2.2vw,1.5rem)] md:max-w-5xl lg:text-2xl xl:text-3xl ${heroTracking} drop-shadow-[0_0_14px_rgba(255,255,255,0.35)]`}
          >
            ASHEN ONE — SEEK WHAT THE DYING FLAME STILL REMEMBERS
          </p>
        </header>

        <section
          className="mb-12 w-full max-w-3xl text-pretty md:mb-14 lg:max-w-4xl"
          aria-labelledby="ds3-general-lore"
        >
          <h2 id="ds3-general-lore" className="sr-only">
            General story
          </h2>
          <div
            className={`space-y-5 text-center text-[clamp(0.8rem,2vw,1.0625rem)] font-semibold leading-relaxed text-white/88 sm:space-y-6 sm:text-base md:text-lg ${heroTracking}`}
          >
            <p>
              The First Flame gutters; embers alone prove that fire ever lived.
              You rise as an Unkindled — ash seeking ash — called not to glory
              but to the last rites of a cycle that no longer knows how to end
              cleanly. Lothric lifts its broken spires against a sky that has
              seen this moment again and again.
            </p>
            <p>
              Here lineage, hollow thrones, and the nameless dead knot into one
              long farewell. Lore is not dispensed from a pulpit: it clings to
              weapons, to the words of those who would prolong the flame, and
              to the choice of whether any link is worth its cost.
            </p>
          </div>
        </section>

        <nav
          className="flex w-full max-w-2xl flex-col items-center justify-center gap-5 sm:flex-row sm:gap-8"
          aria-label="Dark Souls III sections"
        >
          <div className="rounded-md bg-gradient-to-br from-white via-white/50 to-white/85 p-px shadow-[0_0_16px_rgba(255,255,255,0.12)] transition hover:from-white hover:via-white/70 hover:to-white">
            <Link href="/dark-souls-3/characters" className={navButtonClassName}>
              CHARACTERS
            </Link>
          </div>
          <div className="rounded-md bg-gradient-to-br from-white via-white/50 to-white/85 p-px shadow-[0_0_16px_rgba(255,255,255,0.12)] transition hover:from-white hover:via-white/70 hover:to-white">
            <Link href="/dark-souls-3/forum" className={navButtonClassName}>
              FORUM
            </Link>
          </div>
        </nav>
      </div>
    </div>
  );
}
