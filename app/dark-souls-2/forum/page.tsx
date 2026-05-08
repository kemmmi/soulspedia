import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Forum — Dark Souls II | Soulspedia",
  description:
    "Discuss Dark Souls II lore: threads, theories, and replies from the community.",
};

const heroTracking =
  "tracking-[0.06em] sm:tracking-[0.07em] md:tracking-[0.08em] lg:tracking-[0.09em] xl:tracking-[0.1em]";

const gamePageTitleTracking =
  "tracking-[0.035em] sm:tracking-[0.04em] md:tracking-[0.045em] lg:tracking-[0.05em] xl:tracking-[0.055em]";

export default function DarkSouls2ForumPage() {
  return (
    <div className="relative flex min-h-0 min-w-0 flex-1 flex-col overflow-hidden bg-black">
      <div className="page-shell relative z-10 flex w-full min-w-0 flex-1 flex-col items-center pb-12 pt-6 md:pb-16 md:pt-8">
        <div className="mb-8 flex w-full max-w-3xl justify-start lg:max-w-4xl">
          <Link
            href="/dark-souls-2"
            className={`text-sm font-semibold text-white/55 transition-colors hover:text-white ${heroTracking}`}
          >
            ← DARK SOULS II
          </Link>
        </div>

        <header className="mb-8 text-center">
          <h1
            className={`text-4xl font-semibold leading-none text-white drop-shadow-[0_0_32px_rgba(255,255,255,0.55)] sm:text-5xl md:text-6xl ${gamePageTitleTracking}`}
          >
            FORUM
          </h1>
          <p
            className={`mx-auto mt-5 max-w-2xl text-pretty px-2 text-sm font-semibold leading-relaxed text-white/75 sm:mt-6 sm:text-base ${heroTracking}`}
          >
            A place for registered members to open topics, reply to each
            other, and debate lore — by game, by region, or by character.
          </p>
        </header>

        <section
          className={`w-full max-w-2xl rounded-md border border-neutral-500/25 bg-neutral-950/40 px-6 py-10 text-center ${heroTracking}`}
          aria-labelledby="forum-placeholder-ds2"
        >
          <h2
            id="forum-placeholder-ds2"
            className="text-sm font-semibold uppercase tracking-widest text-white/50"
          >
            Coming soon
          </h2>
          <p className="mt-4 text-sm font-semibold leading-relaxed text-white/65 sm:text-base">
            Threads, categories, and post editor will live here — tied to
            accounts and moderation as you build the backend.
          </p>
        </section>
      </div>
    </div>
  );
}
