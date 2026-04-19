import Image from "next/image";
import Link from "next/link";

/** Misma separación entre letras en slogan y juegos */
const heroTracking =
  "tracking-[0.06em] sm:tracking-[0.07em] md:tracking-[0.08em] lg:tracking-[0.09em] xl:tracking-[0.1em]";

/** SOULSPEDIA: letras un poco más juntas */
const titleTracking =
  "tracking-[0.035em] sm:tracking-[0.04em] md:tracking-[0.045em] lg:tracking-[0.05em] xl:tracking-[0.055em]";

const gameTitleClassName =
  `block whitespace-nowrap bg-transparent text-[clamp(0.38rem,2.1vw,1.875rem)] font-semibold leading-none ${heroTracking} text-white/45 no-underline outline-none ring-0 transition-all duration-200 hover:text-white hover:[text-shadow:0_0_12px_rgba(252,211,77,0.65),0_0_26px_rgba(251,146,60,0.45),0_0_40px_rgba(234,88,12,0.25)] focus-visible:outline-none focus-visible:ring-0 lg:text-2xl xl:text-3xl`;

export default function Home() {
  return (
    <div className="relative flex min-h-0 flex-1 flex-col overflow-hidden">
      <div className="pointer-events-none fixed inset-0 z-0">
        <Image
          src="/inicio.png"
          alt=""
          fill
          priority
          sizes="100vw"
          className="object-cover object-center"
        />
      </div>
      <div className="pointer-events-none fixed inset-0 z-[1] bg-black/55" aria-hidden />

      <div className="relative z-10 flex flex-1 flex-col items-center justify-center overflow-x-visible px-4 py-8 md:py-12">
        <div className="-mt-7 flex w-full max-w-4xl flex-col items-center text-center sm:-mt-9 md:-mt-11 lg:max-w-7xl">
          <h1
            className={`inline-block text-5xl font-semibold leading-none text-white drop-shadow-[0_0_32px_rgba(255,255,255,0.55)] sm:text-6xl md:text-7xl lg:text-8xl lg:drop-shadow-[0_0_40px_rgba(255,255,255,0.5)] ${titleTracking}`}
          >
            SOULSPEDIA
          </h1>
          <div className="mt-6 flex w-full justify-center overflow-visible sm:mt-7 md:mt-8">
            <p
              className={`inline-block min-w-min max-w-[100vw] px-2 text-center text-[clamp(0.5rem,2.4vw,1.875rem)] font-semibold leading-tight text-white whitespace-nowrap drop-shadow-[0_0_14px_rgba(255,255,255,0.4)] lg:text-2xl xl:text-3xl ${heroTracking}`}
            >
              THE FLAME OF UNDERSTANDING - SO YOU NEVER GO HOLLOW
            </p>
          </div>

          <nav
            className="mt-10 w-full overflow-visible px-2 sm:mt-14 sm:px-6 md:mt-16 md:px-10 lg:mt-20 lg:px-14"
            aria-label="Choose game"
          >
            <div className="mx-auto flex w-full max-w-7xl flex-nowrap items-center justify-evenly gap-x-2 overflow-visible sm:gap-x-6 md:gap-x-10 lg:gap-x-14">
              <Link href="/dark-souls" className={gameTitleClassName}>
                DARK SOULS
              </Link>
              <Link href="/dark-souls-2" className={gameTitleClassName}>
                DARK SOULS II
              </Link>
              <Link href="/dark-souls-3" className={gameTitleClassName}>
                DARK SOULS III
              </Link>
            </div>
          </nav>
        </div>
      </div>
    </div>
  );
}
