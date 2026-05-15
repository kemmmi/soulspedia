import type { Metadata } from "next";
import Link from "next/link";
import { Suspense } from "react";
import { ForumThreadList } from "@/components/forum/ForumThreadList";

export const metadata: Metadata = {
  title: "Forum — Dark Souls | Soulspedia",
  description:
    "Discuss Dark Souls lore with the community: threads, theories, and replies.",
};

const heroTracking =
  "tracking-[0.06em] sm:tracking-[0.07em] md:tracking-[0.08em] lg:tracking-[0.09em] xl:tracking-[0.1em]";

const gamePageTitleTracking =
  "tracking-[0.035em] sm:tracking-[0.04em] md:tracking-[0.045em] lg:tracking-[0.05em] xl:tracking-[0.055em]";

export default function DarkSoulsForumPage() {
  return (
    <div className="relative flex min-h-0 min-w-0 flex-1 flex-col overflow-hidden">
      <div className="page-shell relative z-10 flex w-full min-w-0 flex-1 flex-col items-center pb-12 pt-6 md:pb-16 md:pt-8">
        <div className="mb-8 flex w-full max-w-3xl justify-start lg:max-w-4xl">
          <Link
            href="/dark-souls"
            className={`text-sm font-semibold text-white/55 transition-colors hover:text-white ${heroTracking}`}
          >
            ← DARK SOULS
          </Link>
        </div>

        <header className="mb-10 text-center">
          <h1
            className={`text-4xl font-semibold leading-none text-white drop-shadow-[0_0_32px_rgba(255,255,255,0.55)] sm:text-5xl md:text-6xl ${gamePageTitleTracking}`}
          >
            FORUM
          </h1>
          <p
            className={`mx-auto mt-5 max-w-2xl text-pretty px-2 text-sm font-semibold leading-relaxed text-white/75 sm:mt-6 sm:text-base ${heroTracking}`}
          >
            A place for registered members to open topics, reply to each other,
            and debate lore — by game, by region, or by character.
          </p>
        </header>

        <Suspense
          fallback={
            <p className="font-lore text-sm text-white/35">
              Loading threads…
            </p>
          }
        >
          <ForumThreadList game="ds1" />
        </Suspense>
      </div>
    </div>
  );
}
