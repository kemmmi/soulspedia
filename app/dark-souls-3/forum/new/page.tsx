import type { Metadata } from "next";
import Link from "next/link";
import { ForumNewPostForm } from "@/components/forum/ForumNewPostForm.client";

export const metadata: Metadata = {
  title: "New Thread — Dark Souls III | Soulspedia",
  description: "Open a new discussion thread in the Dark Souls III forum.",
};

const heroTracking =
  "tracking-[0.06em] sm:tracking-[0.07em] md:tracking-[0.08em] lg:tracking-[0.09em] xl:tracking-[0.1em]";

const gamePageTitleTracking =
  "tracking-[0.035em] sm:tracking-[0.04em] md:tracking-[0.045em] lg:tracking-[0.05em] xl:tracking-[0.055em]";

export default function DarkSouls3ForumNewPage() {
  return (
    <div className="relative flex min-h-0 min-w-0 flex-1 flex-col overflow-hidden">
      <div className="page-shell relative z-10 flex w-full min-w-0 flex-1 flex-col items-center pb-12 pt-6 md:pb-16 md:pt-8">
        <div className="mb-8 flex w-full max-w-3xl justify-start lg:max-w-4xl">
          <Link
            href="/dark-souls-3/forum"
            className={`text-sm font-semibold text-white/55 transition-colors hover:text-white ${heroTracking}`}
          >
            ← FORUM
          </Link>
        </div>

        <header className="mb-10 w-full max-w-3xl lg:max-w-4xl">
          <h1
            className={`text-3xl font-semibold leading-none text-white drop-shadow-[0_0_32px_rgba(255,255,255,0.55)] sm:text-4xl md:text-5xl ${gamePageTitleTracking}`}
          >
            NEW THREAD
          </h1>
          <p
            className={`mt-3 text-sm font-semibold text-white/45 ${heroTracking}`}
          >
            DARK SOULS III
          </p>
        </header>

        <ForumNewPostForm game="ds3" />
      </div>
    </div>
  );
}
