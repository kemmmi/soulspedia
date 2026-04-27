export default function LoginPage() {
  return (
    <div className="relative flex min-h-screen items-center justify-center overflow-hidden px-4 py-12 sm:px-6 lg:px-8">
      <div
        className="fixed inset-0 -z-10 bg-cover bg-center bg-no-repeat"
        style={{ backgroundImage: "url('/fondologinejemplo2.jpg')" }}
      />
      <div className="fixed inset-0 -z-10 bg-[#06090f]/25" />

      <div className="relative z-10 -mt-20 w-full max-w-md space-y-8 rounded-2xl bg-transparent p-8 sm:-mt-24">
        <div className="text-center">
          <h2 className="text-center text-5xl font-semibold uppercase tracking-[0.18em] text-slate-100 drop-shadow-[0_0_14px_rgba(0,0,0,0.75)] sm:text-6xl">
            Log
          </h2>
          <p className="mt-2 text-center text-2xl font-semibold uppercase tracking-[0.2em] text-white drop-shadow-[0_0_12px_rgba(255,255,255,0.3)] sm:text-3xl">
            Into the Abyss
          </p>
        </div>

        <form className="mt-8 space-y-5" action="#" method="POST">
          <div className="space-y-4">
            <div>
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
            </div>
            <div>
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
            </div>
          </div>

          <div>
            <button
              type="submit"
              className="group relative flex w-full justify-center rounded-full border border-slate-100/55 bg-black/35 px-3 py-3 text-sm font-semibold text-slate-100 transition-colors hover:bg-black/50 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-slate-200/80"
            >
              Login
            </button>
          </div>

          <div className="pt-3 text-center text-base text-slate-100/95 drop-shadow-[0_0_6px_rgba(0,0,0,0.55)]">
            no character yet?{" "}
            <a
              href="/register"
              className="font-semibold text-white hover:text-slate-200"
            >
              rekindle your path
            </a>
          </div>
        </form>
      </div>
    </div>
  );
}
