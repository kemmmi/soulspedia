import Image from "next/image";
import Link from "next/link";

export function SiteHeader() {
  return (
    <header className="relative z-[30] flex shrink-0 items-center justify-between px-6 py-5 md:px-10">
      <Link
        href="/"
        className="flex items-center opacity-90 transition-opacity hover:opacity-100"
      >
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
  );
}
