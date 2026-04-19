const footerTracking =
  "tracking-[0.06em] sm:tracking-[0.07em] md:tracking-[0.08em] lg:tracking-[0.09em] xl:tracking-[0.1em]";

export function SiteFooter() {
  return (
    <footer className="relative z-[30] shrink-0 bg-transparent px-6 pb-5 pt-2 text-right text-white md:px-10">
      <p
        className={`m-0 inline-block text-xs font-semibold leading-none text-white/90 drop-shadow-[0_0_10px_rgba(255,255,255,0.28)] md:text-sm ${footerTracking}`}
      >
        © 2026 Soulspedia
      </p>
    </footer>
  );
}
