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
    <div className="relative flex min-h-screen flex-col overflow-hidden bg-black text-white">
      <div className="absolute inset-0 z-0">
        <Image
          src="/inicio.png"
          alt=""
          fill
          priority
          sizes="100vw"
          className="object-cover object-center"
        />
      </div>
      <div className="absolute inset-0 z-[1] bg-black/55" aria-hidden />

      <div className="relative z-10 flex min-h-screen flex-col">
      <header className="flex items-center justify-between px-6 py-5 md:px-10">
        <Link href="/" className="flex items-center opacity-90 transition-opacity hover:opacity-100">
          <Image
            src="/logo.png"
            alt="Soulspedia"
            width={96}
            height={96}
            className="h-14 w-14 object-contain sm:h-16 sm:w-16 md:h-20 md:w-20"
            priority
          />
        </Link>
        <div className="rounded-md bg-gradient-to-br from-white via-white/50 to-white/85 p-px shadow-[0_0_16px_rgba(255,255,255,0.12)] transition hover:from-white hover:via-white/70 hover:to-white">
          <Link
            href="/login"
            className="block rounded-[5px] bg-black px-8 py-2.5 text-xs font-semibold tracking-widest text-amber-100 transition hover:text-amber-50 md:text-sm"
          >
            LOGIN
          </Link>
        </div>
      </header>

      <main className="flex flex-1 flex-col items-center justify-center overflow-x-visible px-4 py-8 md:py-12">
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
            aria-label="Elegir juego"
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
      </main>

      <footer className="bg-transparent px-6 pb-5 pt-2 text-right text-white md:px-10">
        <p
          className={`m-0 inline-block text-xs font-semibold leading-none text-white/90 drop-shadow-[0_0_10px_rgba(255,255,255,0.28)] md:text-sm ${heroTracking}`}
        >
          © 2026 Soulspedia
        </p>
      </footer>
      </div>
    </div>
  );
}
