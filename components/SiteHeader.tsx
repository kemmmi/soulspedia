"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";

export function SiteHeader() {
  const pathname = usePathname();
  const isLoginPage = pathname === "/login";

  return (
    <header className="relative z-[30] flex shrink-0 items-center justify-between px-6 py-5 md:px-10">
      <Link
        href="/"
        className="group flex items-center opacity-90 transition-opacity hover:opacity-100"
      >
        <Image
          src="/logosinfondo.png"
          alt="Soulspedia"
          width={96}
          height={96}
          className="h-14 w-14 object-contain transition-[filter] duration-200 sm:h-16 sm:w-16 md:h-20 md:w-20 [filter:drop-shadow(0_0_14px_rgba(255,255,255,0.42))_drop-shadow(0_0_26px_rgba(255,255,255,0.14))] group-hover:[filter:drop-shadow(0_0_12px_rgba(252,211,77,0.65))_drop-shadow(0_0_26px_rgba(251,146,60,0.45))_drop-shadow(0_0_40px_rgba(234,88,12,0.25))]"
          priority
        />
      </Link>
      {!isLoginPage ? (
        <div className="rounded-md border border-slate-200/35 bg-slate-900/20 p-px shadow-[0_0_18px_rgba(0,0,0,0.35)] backdrop-blur-[2px] transition hover:border-slate-100/50">
          <Link
            href="/login"
            className="block rounded-[5px] bg-transparent px-8 py-2.5 text-xs font-semibold tracking-widest text-slate-100 transition hover:text-white md:text-sm"
          >
            LOGIN
          </Link>
        </div>
      ) : (
        <div />
      )}
    </header>
  );
}
