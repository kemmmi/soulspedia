import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Characters — Dark Souls III | Soulspedia",
  description:
    "Key figures in Dark Souls III: Ludleth, the Soul of Cinder, the Nameless King, and the Fire Keeper.",
};

const heroTracking =
  "tracking-[0.06em] sm:tracking-[0.07em] md:tracking-[0.08em] lg:tracking-[0.09em] xl:tracking-[0.1em]";

const gamePageTitleTracking =
  "tracking-[0.035em] sm:tracking-[0.04em] md:tracking-[0.045em] lg:tracking-[0.05em] xl:tracking-[0.055em]";

const cardTitleBase =
  `font-semibold uppercase text-white transition-opacity duration-300 ${heroTracking}`;

const loreCardFrame =
  "border border-neutral-500/25 shadow-[0_4px_24px_rgba(0,0,0,0.55)]";

type LoreCardConfig = {
  id: string;
  title: string;
  labelPosition: "center" | "bottom";
};

const loreCards: LoreCardConfig[] = [
  {
    id: "ludleth",
    title: "LUDLETH",
    labelPosition: "center",
  },
  {
    id: "soul-of-cinder",
    title: "SOUL OF CINDER",
    labelPosition: "center",
  },
  {
    id: "nameless-king",
    title: "NAMELESS KING",
    labelPosition: "center",
  },
  {
    id: "firekeeper",
    title: "FIREKEEPER",
    labelPosition: "center",
  },
];

const cardAspectClass = "aspect-video w-full";

function LoreCard({ item }: { item: LoreCardConfig }) {
  return (
    <article
      tabIndex={0}
      className={`group relative h-full w-full cursor-default overflow-hidden rounded-sm bg-black outline-none transition-shadow focus-visible:ring-2 focus-visible:ring-white/25 ${loreCardFrame}`}
    >
      <div className={`relative ${cardAspectClass} bg-black`}>
        <div
          className="pointer-events-none absolute inset-0 z-[5] bg-black/0 transition-colors duration-300 ease-out group-hover:bg-black/58 group-focus-within:bg-black/58"
          aria-hidden
        />
        <div
          className={`absolute inset-0 z-10 flex px-3 ${
            item.labelPosition === "bottom"
              ? "items-end justify-center pb-[10%] pt-8 sm:pb-[12%]"
              : "items-center justify-center"
          }`}
        >
          <h2
            className={`text-center text-[clamp(0.65rem,2.8vw,1.125rem)] sm:text-[clamp(0.7rem,1.8vw,1.25rem)] md:text-xl ${cardTitleBase} opacity-0 drop-shadow-[0_2px_8px_rgba(0,0,0,0.6)] group-hover:opacity-100 group-hover:drop-shadow-[0_0_18px_rgba(255,255,255,0.55),0_2px_12px_rgba(0,0,0,0.9)] group-focus-within:opacity-100 group-focus-within:drop-shadow-[0_0_18px_rgba(255,255,255,0.55),0_2px_12px_rgba(0,0,0,0.9)]`}
          >
            {item.title}
          </h2>
        </div>
      </div>
    </article>
  );
}

export default function DarkSouls3CharactersPage() {
  return (
    <div className="relative flex min-h-0 flex-1 flex-col overflow-hidden bg-black">
      <div className="relative z-10 flex w-full flex-1 flex-col items-center overflow-x-visible px-4 pb-12 pt-6 md:px-8 md:pb-16 md:pt-8">
        <div className="mb-8 flex w-full max-w-6xl justify-start lg:max-w-7xl">
          <Link
            href="/dark-souls-3"
            className={`text-sm font-semibold text-white/55 transition-colors hover:text-white ${heroTracking}`}
          >
            ← DARK SOULS III
          </Link>
        </div>

        <header className="mb-10 flex w-full max-w-5xl flex-col items-center text-center md:mb-12 lg:max-w-6xl">
          <h1
            className={`text-4xl font-semibold leading-none text-white drop-shadow-[0_0_32px_rgba(255,255,255,0.55)] sm:text-5xl md:text-6xl lg:text-7xl lg:drop-shadow-[0_0_40px_rgba(255,255,255,0.5)] ${gamePageTitleTracking}`}
          >
            CHARACTERS
          </h1>
          <p
            className={`mt-4 max-w-2xl text-balance px-2 text-sm font-semibold leading-snug text-white/80 sm:mt-5 sm:text-base ${heroTracking}`}
          >
            Lords of Cinder, ash, and the last witnesses of the flame — add
            images to each tile when ready.
          </p>
        </header>

        <section
          className="w-full max-w-6xl lg:max-w-7xl"
          aria-label="Lore — Lords and legends of Lothric"
        >
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 sm:gap-5 md:gap-6 [&>*]:min-h-0">
            {loreCards.map((item) => (
              <LoreCard key={item.id} item={item} />
            ))}
          </div>
        </section>
      </div>
    </div>
  );
}
