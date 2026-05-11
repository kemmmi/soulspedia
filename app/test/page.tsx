import Link from "next/link";

import { SectionEntrance } from "@/components/motion/SectionEntrance";

const panelClass =
  "border border-white/15 bg-black/55 p-5 sm:p-6 md:p-7 shadow-[0_12px_32px_rgba(0,0,0,0.45)]";

export default function TestPage() {
  return (
    <div className="relative flex min-h-0 min-w-0 flex-1 flex-col overflow-hidden">
      <div className="page-shell relative z-10 flex w-full min-w-0 flex-1 flex-col pb-12 pt-8 md:pb-16 md:pt-10">
        <Link
          href="/"
          className="mb-8 w-fit text-xs font-semibold tracking-[0.08em] text-white/60 transition-colors duration-500 hover:text-white/90"
        >
          ← VOLVER AL INICIO
        </Link>

        <header className="mb-10 space-y-3">
          <h1 className="font-optimus text-4xl uppercase tracking-[0.08em] text-amber-100/90 sm:text-5xl md:text-6xl">
            PÁGINA DE PRUEBA
          </h1>
          <p className="max-w-2xl font-lore text-base leading-relaxed tracking-tight text-[#e0e0d8]">
            Esta vista valida un componente reutilizable de entrada de sección con
            animación sobria y compatible con reduced motion.
          </p>
        </header>

        <SectionEntrance className="space-y-5">
          <section className={panelClass}>
            <h2 className="mb-2 font-optimus text-xl uppercase tracking-[0.06em] text-white/82">
              Introducción
            </h2>
            <p className="font-lore text-base leading-relaxed tracking-tight text-[#e0e0d8]">
              El bloque completo entra con opacidad y desplazamiento vertical
              mínimo para mantener el estilo cinematográfico de Soulspedia.
            </p>
          </section>

          <section className={panelClass}>
            <h2 className="mb-2 font-optimus text-xl uppercase tracking-[0.06em] text-white/82">
              Bloque de contenido
            </h2>
            <p className="font-lore text-base leading-relaxed tracking-tight text-[#e0e0d8]">
              Puedes reutilizar este mismo componente en cualquier ruta para
              introducir secciones de lore, fichas o foros sin duplicar lógica.
            </p>
          </section>
        </SectionEntrance>
      </div>
    </div>
  );
}
