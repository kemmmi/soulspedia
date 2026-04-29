"use client";

import { fsMotion } from "@/lib/motion/fromSoftware";
import Link from "next/link";
import { motion, useReducedMotion } from "framer-motion";
import { usePathname } from "next/navigation";

/** OptimusPrinceps (body) + sombras al estilo títulos Dark Souls — sin imagen logo. */
export const brandWordmarkClassName =
  "inline-block shrink-0 font-semibold uppercase leading-none tracking-[0.06em] text-white outline-none ring-0 transition-[text-shadow,color] duration-200 sm:tracking-[0.07em] md:tracking-[0.08em] " +
  "text-[clamp(1.125rem,3.1vw,1.65rem)] md:text-[clamp(1.25rem,2.6vw,1.85rem)] " +
  "[text-shadow:0_0_10px_rgba(70,38,10,0.78),0_0_22px_rgba(110,55,14,0.52),0_0_38px_rgba(50,24,6,0.32)] " +
  "hover:[text-shadow:0_0_14px_rgba(252,211,77,0.55),0_0_28px_rgba(251,146,60,0.42),0_0_48px_rgba(234,88,12,0.22)] " +
  "focus-visible:text-amber-100/95";

export function SiteHeader() {
  const pathname = usePathname();
  const isLoginPage = pathname === "/login";
  const reduce = useReducedMotion();
  const ease = fsMotion.ease;

  return (
    <motion.header
      className="sticky top-0 z-[50] flex shrink-0 items-center justify-between bg-transparent px-6 pt-7 pb-5 md:px-10 md:pt-8 md:pb-5"
      initial={reduce ? false : { opacity: 0, y: fsMotion.px.headerY }}
      animate={reduce ? false : { opacity: 1, y: 0 }}
      transition={{ duration: fsMotion.dur.chrome, ease }}
    >
      <motion.span
        className="inline-flex min-w-0 items-center"
        initial={
          reduce
            ? false
            : { opacity: 0, scale: 1 - fsMotion.px.headerLogoScaleDelta }
        }
        animate={reduce ? false : { opacity: 1, scale: 1 }}
        transition={{
          duration: fsMotion.dur.chrome * 0.95,
          delay: reduce ? 0 : 0.06,
          ease,
        }}
      >
        <Link href="/" className={brandWordmarkClassName}>
          SOULSPEDIA
        </Link>
      </motion.span>
      {!isLoginPage ? (
        <motion.div
          className="rounded-md border border-slate-200/35 bg-slate-900/20 p-px shadow-[0_0_18px_rgba(0,0,0,0.35)] backdrop-blur-[2px] transition hover:border-slate-100/50"
          initial={reduce ? false : { opacity: 0 }}
          animate={reduce ? false : { opacity: 1 }}
          transition={{
            duration: fsMotion.dur.chrome * 0.9,
            delay: reduce ? 0 : 0.12,
            ease,
          }}
        >
          <Link
            href="/login"
            className="block rounded-[5px] bg-transparent px-8 py-2.5 text-xs font-semibold tracking-widest text-slate-100 transition hover:text-white md:text-sm"
          >
            LOGIN
          </Link>
        </motion.div>
      ) : (
        <div />
      )}
    </motion.header>
  );
}
