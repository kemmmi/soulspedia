"use client";

import { fsMotion } from "@/lib/motion/fromSoftware";
import Image from "next/image";
import { motion, useReducedMotion } from "framer-motion";
import { useEffect } from "react";

export function LoginPanel() {
  const reduce = useReducedMotion();
  const ease = fsMotion.ease;

  useEffect(() => {
    const body = document.body;
    const prev = {
      bodyOverflow: body.style.overflow,
    };
    body.style.overflow = "hidden";
    return () => {
      body.style.overflow = prev.bodyOverflow;
    };
  }, []);

  return (
    <div className="page-gutter-x relative flex h-full min-h-0 min-w-0 flex-1 items-center justify-center overflow-hidden overscroll-none">
      {/* Fondo */}
      <div className="fixed inset-0 -z-10 bg-black" />

      <motion.div
        className="relative z-10 -mt-20 w-full min-w-0 max-w-lg space-y-12 bg-black/80 p-6 sm:-mt-24 sm:p-8"
        initial={reduce ? false : { opacity: 0, y: fsMotion.px.login }}
        animate={reduce ? false : { opacity: 1, y: 0 }}
        transition={{ duration: fsMotion.dur.loginShell, ease }}
      >
        {/* Título */}
        <div className="text-center">
          <h2 className="font-optimus text-center text-3xl font-semibold uppercase leading-none tracking-[0.06em] text-white [-webkit-text-stroke:1px_#000] [paint-order:stroke_fill] drop-shadow-[0_0_15px_rgba(255,255,255,0.2)] sm:text-4xl sm:tracking-[0.07em] md:text-[2.15rem] md:tracking-[0.08em]">
            <span className="sr-only">Login</span>
            <span aria-hidden>&nbsp;</span>
          </h2>
        </div>

        <form className="mt-8 space-y-3" action="#" method="POST">
          <div className="space-y-4">
            <div className="-mt-16 mb-8 flex justify-center">
              <Image
                src="/bonfire.gif"
                alt=""
                width={96}
                height={96}
                priority
              />
            </div>

            {/* Campo Email */}
            <motion.div
              className="grid grid-cols-1 gap-1.5 sm:grid-cols-[9rem_1fr] sm:items-center sm:gap-3"
              initial={reduce ? false : { opacity: 0 }}
              animate={reduce ? false : { opacity: 1 }}
              transition={{
                duration: fsMotion.dur.loginField,
                delay: reduce ? 0 : 0.18,
                ease,
              }}
            >
              <label
                htmlFor="email-address"
                className="font-lore text-left text-base font-normal normal-case tracking-normal text-white/85 antialiased sm:text-lg sm:leading-snug sm:pt-0.5 md:text-xl"
              >
                Email address
              </label>
              <input
                id="email-address"
                name="email"
                type="email"
                autoComplete="email"
                required
                className="font-lore min-w-0 flex-1 rounded-none border-0 bg-black/20 px-4 py-3.5 text-base normal-case tracking-[0.02em] text-slate-200 focus:bg-black/40 focus:outline-none transition-all sm:px-6 sm:py-4 sm:text-lg md:text-[1.125rem]"
              />
            </motion.div>

            {/* Campo Password */}
            <motion.div
              className="grid grid-cols-1 gap-1.5 sm:grid-cols-[9rem_1fr] sm:items-center sm:gap-3"
              initial={reduce ? false : { opacity: 0 }}
              animate={reduce ? false : { opacity: 1 }}
              transition={{
                duration: fsMotion.dur.loginField,
                delay: reduce ? 0 : 0.32,
                ease,
              }}
            >
              <label
                htmlFor="password"
                className="font-lore text-left text-base font-normal normal-case tracking-normal text-white/85 antialiased sm:text-lg sm:leading-snug sm:pt-0.5 md:text-xl"
              >
                Password
              </label>
              <input
                id="password"
                name="password"
                type="password"
                autoComplete="current-password"
                required
                className="font-lore min-w-0 flex-1 rounded-none border-0 bg-black/20 px-4 py-3.5 text-base normal-case tracking-[0.02em] text-slate-200 focus:bg-black/40 focus:outline-none transition-all sm:px-6 sm:py-4 sm:text-lg md:text-[1.125rem]"
              />
            </motion.div>
          </div>

          {/* Botón enviar */}
          <motion.div
            initial={reduce ? false : { opacity: 0 }}
            animate={reduce ? false : { opacity: 1 }}
            transition={{
              duration: fsMotion.dur.loginField,
              delay: reduce ? 0 : 0.48,
              ease,
            }}
          >
            <button
              type="submit"
              className="souls-amber-highlight font-lore group relative flex w-full items-center justify-center rounded-none border-0 bg-transparent px-3 py-1.5 text-lg font-normal normal-case tracking-[0.04em] text-[#f3ede0] [text-shadow:0_1px_0_rgba(0,0,0,0.8)] antialiased transition-[transform] duration-200 active:scale-[0.98] sm:text-xl md:text-2xl"
            >
              Reverse hollowing
            </button>
          </motion.div>

          {/* Footer del Login */}
          <motion.div
            className="font-lore pt-4 text-center text-base font-normal normal-case tracking-normal text-white/85 antialiased sm:text-lg md:text-xl md:leading-relaxed"
            initial={reduce ? false : { opacity: 0 }}
            animate={reduce ? false : { opacity: 1 }}
            transition={{
              duration: fsMotion.dur.loginMeta,
              delay: reduce ? 0 : 0.58,
              ease,
            }}
          >
            No character yet?{" "}
            <a
              href="/register"
              className="font-normal text-white/85 underline-offset-8 transition-colors hover:text-[#8b4513] hover:no-underline"
            >
              Rekindle your path
            </a>
          </motion.div>
        </form>
      </motion.div>
    </div>
  );
}
