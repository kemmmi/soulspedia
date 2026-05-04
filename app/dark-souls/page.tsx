import type { Metadata } from "next";
import { GameHubLanding } from "@/components/game/GameHubLanding.client";
import { Reveal } from "@/components/motion/Reveal";

export const metadata: Metadata = {
  title: "Dark Souls | Soulspedia",
  description:
    "Chosen Undead — seek what came before the flame. Lore and context for Dark Souls.",
};

const heroTracking =
  "tracking-[0.06em] sm:tracking-[0.07em] md:tracking-[0.08em] lg:tracking-[0.09em] xl:tracking-[0.1em]";

export default function DarkSoulsPage() {
  return (
    <GameHubLanding
      seriesLine="DARK SOULS"
      roleHeadline="CHOSEN UNDEAD"
      tagline="SEEK WHAT CAME BEFORE THE FLAME"
      loreSectionId="ds1-general-lore"
      beginReadingLabel="UNRAVEL THE FIRST FLAME'S AGE — BEGIN READING"
      charactersHref="/dark-souls/characters"
      forumHref="/dark-souls/forum"
    >
      <section
        id="ds1-general-lore"
        className="flex w-full justify-center px-4 pb-14 pt-28 md:px-8 md:pb-20 md:pt-32"
        aria-labelledby="ds1-general-lore-title"
      >
        <Reveal className="w-full max-w-3xl text-pretty lg:max-w-4xl">
          <h2 id="ds1-general-lore-title" className="sr-only">
            General story
          </h2>
          <div
            className={`font-lore space-y-5 text-center lowercase text-[clamp(0.8rem,2vw,1.0625rem)] font-normal leading-relaxed text-white/88 sm:space-y-6 sm:text-base md:text-lg ${heroTracking}`}
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
        </Reveal>
      </section>
    </GameHubLanding>
  );
}
