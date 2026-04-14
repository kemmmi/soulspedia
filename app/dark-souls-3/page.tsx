import Link from "next/link";

export default function DarkSouls3Page() {
  return (
    <div className="min-h-screen bg-black px-6 py-10 text-white">
      <p className="mb-8 text-sm tracking-widest text-neutral-400">
        <Link href="/" className="hover:text-white">
          ← Inicio
        </Link>
      </p>
      <h1 className="text-3xl font-semibold tracking-[0.3em] md:text-5xl">DARK SOULS III</h1>
      <p className="mt-6 text-neutral-400">Página de lore (en construcción).</p>
    </div>
  );
}
