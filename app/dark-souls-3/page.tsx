import type { Metadata } from "next";
import { GameHubLanding } from "@/components/game/GameHubLanding.client";
import { Reveal } from "@/components/motion/Reveal";

export const metadata: Metadata = {
  title: "Dark Souls III | Soulspedia",
  description:
    "Ashen One — seek what the dying flame still remembers. Lore for Dark Souls III.",
};

const heroTracking =
  "tracking-[0.06em] sm:tracking-[0.07em] md:tracking-[0.08em] lg:tracking-[0.09em] xl:tracking-[0.1em]";

export default function DarkSouls3Page() {
  return (
    <GameHubLanding
      seriesLine="DARK SOULS III"
      roleHeadline="ASHEN ONE"
      tagline="SEEK WHAT THE DYING FLAME STILL REMEMBERS"
      loreSectionId="ds3-general-lore"
      beginReadingLabel="WITNESS THE AGE BUILT ON COLD CINDERS — BEGIN READING"
      charactersHref="/dark-souls-3/characters"
      forumHref="/dark-souls-3/forum"
    >
      <section
        id="ds3-general-lore"
        className="flex w-full justify-center px-4 pb-14 pt-28 md:px-8 md:pb-20 md:pt-32"
        aria-labelledby="ds3-general-lore-title"
      >
        <Reveal className="w-full max-w-3xl text-pretty lg:max-w-4xl">
          <h2 id="ds3-general-lore-title" className="sr-only">
            General story
          </h2>
          <div
            className={`font-lore space-y-5 text-center lowercase text-[clamp(0.8rem,2vw,1.0625rem)] font-normal leading-relaxed text-white/88 sm:space-y-6 sm:text-base md:text-lg ${heroTracking}`}
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
        </Reveal>
      </section>
    </GameHubLanding>
  );
}
