import Image from "next/image";
import Link from "next/link";
import LoreEffects from "@/components/LoreEffects";

export default function DarkSoulsPage() {
  // Asegúrate de que este nombre sea EXACTO al del archivo en /public
  const imageName = "fondoartorias.png"; 

  return (
    <main className="relative flex min-h-0 w-full flex-1 flex-col overflow-x-hidden bg-black antialiased">
      {/* IMAGEN DE FONDO FORZADA */}
      <div className="fixed inset-0 z-0">
        <Image
          src={`/${imageName}`}
          alt="Dark Souls Background"
          fill
          priority
          quality={100}
          className="object-cover object-center"
        />
        {/* Capa de oscuridad sobre la imagen para legibilidad */}
        <div className="absolute inset-0 bg-black/50" aria-hidden="true" />
      </div>

      {/* Ascuas + bloque WORLD: flex-1 para encajar en el viewport bajo el header (sin scroll fantasma) */}
      <div className="relative z-10 flex min-h-0 flex-1 flex-col">
        <LoreEffects
          realmName="Lordran"
          description="In the Age of Ancients, the world was unformed — shrouded by fog, a land of grey crags, archtrees and everlasting dragons."
          readMoreHref="/dark-souls/characters"
        />

        {/* Misma sangría horizontal que el bloque WORLD (page-gutter-x + ps-* en LoreEffects) */}
        <div className="pointer-events-none absolute inset-0 z-20 flex items-center justify-end page-gutter-x">
          <div className="flex flex-col items-end gap-3 pe-6 sm:gap-4 sm:pe-10 md:pe-14 lg:pe-20">
            <Link
              href="/dark-souls/characters"
              className="font-optimus pointer-events-auto inline-flex items-center justify-center py-2 text-base font-normal uppercase tracking-[0.14em] text-white/90 outline-none transition-colors duration-200 hover:text-white focus-visible:text-amber-100/95 focus-visible:ring-2 focus-visible:ring-amber-500/35 focus-visible:ring-offset-2 focus-visible:ring-offset-transparent sm:text-lg"
            >
              Characters
            </Link>
            <Link
              href="/dark-souls/forum"
              className="font-optimus pointer-events-auto inline-flex items-center justify-center py-2 text-base font-normal uppercase tracking-[0.14em] text-white/90 outline-none transition-colors duration-200 hover:text-white focus-visible:text-amber-100/95 focus-visible:ring-2 focus-visible:ring-amber-500/35 focus-visible:ring-offset-2 focus-visible:ring-offset-transparent sm:text-lg"
            >
              Forum
            </Link>
          </div>
        </div>
      </div>

    </main>
  );
}