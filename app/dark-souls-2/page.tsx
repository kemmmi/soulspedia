import type { Metadata } from "next";
import { GameHubLanding } from "@/components/game/GameHubLanding.client";
import { Reveal } from "@/components/motion/Reveal";

export const metadata: Metadata = {
  title: "Dark Souls II | Soulspedia",
  description:
    "Bearer of the Curse — seek what remains when memory fades. Lore for Dark Souls II.",
};

const heroTracking =
  "tracking-[0.06em] sm:tracking-[0.07em] md:tracking-[0.08em] lg:tracking-[0.09em] xl:tracking-[0.1em]";

export default function DarkSouls2Page() {
  return (
    <GameHubLanding
      seriesLine="DARK SOULS II"
      roleHeadline="BEARER OF THE CURSE"
      tagline="SEEK WHAT REMAINS WHEN MEMORY FADES"
      loreSectionId="ds2-general-lore"
      beginReadingLabel="ENTER THE FORGOTTEN CROWN OF DRANGLEIC — BEGIN READING"
      charactersHref="/dark-souls-2/characters"
      forumHref="/dark-souls-2/forum"
    >
      <section
        id="ds2-general-lore"
        className="flex w-full justify-center scroll-mt-28 px-4 pb-14 md:px-8 md:pb-20"
        aria-labelledby="ds2-general-lore-title"
      >
        <Reveal className="w-full max-w-3xl text-pretty lg:max-w-4xl">
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
        </Reveal>
      </section>
    </GameHubLanding>
  );
}
