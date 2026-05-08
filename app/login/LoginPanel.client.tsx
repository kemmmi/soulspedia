"use client";

import { fsMotion } from "@/lib/motion/fromSoftware";
import { motion, useReducedMotion } from "framer-motion";

export function LoginPanel() {
  const reduce = useReducedMotion();
  const ease = fsMotion.ease;

  return (
    <div className="page-gutter-x relative flex min-h-dvh min-w-0 items-center justify-center overflow-hidden py-12">
      <div
        className="fixed inset-0 -z-10 bg-cover bg-center bg-no-repeat"
        style={{ backgroundImage: "url('/fondologinejemplo2.jpg')" }}
      />
      <div className="fixed inset-0 -z-10 bg-[#06090f]/25" />

      <motion.div
        className="relative z-10 -mt-20 w-full min-w-0 max-w-md space-y-8 rounded-2xl bg-transparent p-6 sm:-mt-24 sm:p-8"
        initial={reduce ? false : { opacity: 0, y: fsMotion.px.login }}
        animate={reduce ? false : { opacity: 1, y: 0 }}
        transition={{ duration: fsMotion.dur.loginShell, ease }}
      >
        <div className="text-center">
          <h2 className="text-center text-5xl font-semibold uppercase tracking-[0.18em] text-slate-100 drop-shadow-[0_0_14px_rgba(0,0,0,0.75)] sm:text-6xl">
            Login
          </h2>
        </div>

        <form className="mt-8 space-y-5" action="#" method="POST">
          <div className="space-y-4">
            <motion.div
              initial={reduce ? false : { opacity: 0 }}
              animate={reduce ? false : { opacity: 1 }}
              transition={{
                duration: fsMotion.dur.loginField,
                delay: reduce ? 0 : 0.18,
                ease,
              }}
            >
              <label htmlFor="email-address" className="sr-only">
                Email
              </label>
              <input
                id="email-address"
                name="email"
                type="email"
                required
                className="block w-full rounded-full border border-slate-200/25 bg-black/30 px-5 py-3 text-sm text-slate-100 placeholder:text-slate-300/70 focus:border-slate-100/60 focus:outline-none focus:ring-2 focus:ring-slate-200/20"
                placeholder="email address"
              />
            </motion.div>
            <motion.div
              initial={reduce ? false : { opacity: 0 }}
              animate={reduce ? false : { opacity: 1 }}
              transition={{
                duration: fsMotion.dur.loginField,
                delay: reduce ? 0 : 0.32,
                ease,
              }}
            >
              <label htmlFor="password" className="sr-only">
                Password
              </label>
              <input
                id="password"
                name="password"
                type="password"
                required
                className="block w-full rounded-full border border-slate-200/25 bg-black/30 px-5 py-3 text-sm text-slate-100 placeholder:text-slate-300/70 focus:border-slate-100/60 focus:outline-none focus:ring-2 focus:ring-slate-200/20"
                placeholder="Password"
              />
            </motion.div>
          </div>

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
              className="group relative flex w-full justify-center rounded-full border border-slate-100/55 bg-black/35 px-3 py-3 text-sm font-semibold text-slate-100 transition-colors hover:bg-black/50 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-slate-200/80"
            >
              Login
            </button>
          </motion.div>

          <motion.div
            className="pt-3 text-center text-base text-slate-100/95 drop-shadow-[0_0_6px_rgba(0,0,0,0.55)]"
            initial={reduce ? false : { opacity: 0 }}
            animate={reduce ? false : { opacity: 1 }}
            transition={{
              duration: fsMotion.dur.loginMeta,
              delay: reduce ? 0 : 0.58,
              ease,
            }}
          >
            no character yet?{" "}
            <a
              href="/register"
              className="font-semibold text-white hover:text-slate-200"
            >
              rekindle your path
            </a>
          </motion.div>
        </form>
      </motion.div>
    </div>
  );
}
