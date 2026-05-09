"use client";

import { fsMotion } from "@/lib/motion/fromSoftware";
import { motion, useReducedMotion } from "framer-motion";
import { useEffect } from "react";

export function LoginPanel() {
  const reduce = useReducedMotion();
  const ease = fsMotion.ease;

  useEffect(() => {
    const html = document.documentElement;
    const body = document.body;
    const prev = {
      htmlOverflow: html.style.overflow,
      bodyOverflow: body.style.overflow,
      htmlOverscroll: html.style.overscrollBehavior,
    };
    html.style.overflow = "hidden";
    body.style.overflow = "hidden";
    html.style.overscrollBehavior = "none";
    return () => {
      html.style.overflow = prev.htmlOverflow;
      body.style.overflow = prev.bodyOverflow;
      html.style.overscrollBehavior = prev.htmlOverscroll;
    };
  }, []);

  return (
    <div className="page-gutter-x relative flex min-h-[100dvh] min-w-0 items-center justify-center overflow-hidden overscroll-none py-12">
      {/* Fondo */}
      <div
        className="fixed inset-0 -z-10 bg-cover bg-center bg-no-repeat opacity-[0.78]"
        style={{ backgroundImage: "url('/loginfondoshrine.jpg')" }}
      />
      <div className="fixed inset-0 -z-10 bg-[#06090f]/45" />

      <motion.div
        className="relative z-10 -mt-20 w-full min-w-0 max-w-lg space-y-12 bg-transparent p-6 sm:-mt-24 sm:p-8"
        initial={reduce ? false : { opacity: 0, y: fsMotion.px.login }}
        animate={reduce ? false : { opacity: 1, y: 0 }}
        transition={{ duration: fsMotion.dur.loginShell, ease }}
      >
        {/* Título */}
        <div className="text-center">
          <h2 className="font-optimus text-center text-4xl font-semibold uppercase leading-none tracking-[0.06em] text-white [-webkit-text-stroke:1px_#000] [paint-order:stroke_fill] drop-shadow-[0_0_15px_rgba(255,255,255,0.2)] sm:text-5xl sm:tracking-[0.07em] md:text-[2.65rem] md:tracking-[0.08em] md:[-webkit-text-stroke:1.5px_#000]">
            Login
          </h2>
        </div>

        <form className="mt-8 space-y-3" action="#" method="POST">
          <div className="space-y-4">
            {/* Campo Email */}
            <motion.div
              className="flex flex-col gap-1.5 sm:flex-row sm:items-center sm:gap-4"
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
                className="font-lore shrink-0 text-left text-base font-normal normal-case tracking-normal text-white/85 antialiased sm:w-[11.75rem] sm:text-lg sm:leading-snug sm:pt-0.5 md:text-xl"
              >
                Email address
              </label>
              <input
                id="email-address"
                name="email"
                type="email"
                autoComplete="email"
                required
                className="font-optimus min-w-0 flex-1 rounded-none border border-white/10 bg-black/20 px-4 py-3.5 text-base uppercase tracking-[0.12em] text-slate-200 focus:border-white/40 focus:bg-black/40 focus:outline-none transition-all sm:px-6 sm:py-4 sm:text-lg sm:tracking-[0.2em] md:text-[1.125rem]"
              />
            </motion.div>

            {/* Campo Password */}
            <motion.div
              className="flex flex-col gap-1.5 sm:flex-row sm:items-center sm:gap-4"
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
                className="font-lore shrink-0 text-left text-base font-normal normal-case tracking-normal text-white/85 antialiased sm:w-[11.75rem] sm:text-lg sm:leading-snug sm:pt-0.5 md:text-xl"
              >
                Password
              </label>
              <input
                id="password"
                name="password"
                type="password"
                autoComplete="current-password"
                required
                className="font-optimus min-w-0 flex-1 rounded-none border border-white/10 bg-black/20 px-4 py-3.5 text-base uppercase tracking-[0.12em] text-slate-200 focus:border-white/40 focus:bg-black/40 focus:outline-none transition-all sm:px-6 sm:py-4 sm:text-lg sm:tracking-[0.2em] md:text-[1.125rem]"
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
              className="font-lore group relative flex w-full justify-center rounded-none border border-white/20 bg-black/40 px-3 py-4 text-lg font-normal tracking-[0.06em] text-white antialiased transition-all hover:bg-white/10 hover:border-white/40 active:scale-[0.98] sm:tracking-[0.07em] md:tracking-[0.08em]"
            >
              Restore humanity
            </button>
          </motion.div>

          {/* Footer del Login */}
          <motion.div
            className="font-lore pt-4 text-center text-lg normal-case tracking-normal text-white/85 antialiased sm:text-xl md:text-[1.35rem] md:leading-relaxed"
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
              className="font-semibold text-white underline-offset-8 transition-all hover:text-white/95 hover:underline"
            >
              Rekindle your path
            </a>
          </motion.div>
        </form>
      </motion.div>
    </div>
  );
}
