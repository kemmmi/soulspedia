"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { useEffect, useMemo, useState } from "react";
import Particles, { initParticlesEngine } from "@tsparticles/react";
import { loadSlim } from "@tsparticles/slim";
import type { ISourceOptions } from "@tsparticles/engine";

function ReadMoreEyeIcon({ className }: { className?: string }) {
  return (
    <svg
      className={className}
      width="18"
      height="18"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.25"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden
    >
      <path d="M2.062 12.348a1 1 0 0 1 0-.696 10.75 10.75 0 0 1 19.876 0 1 1 0 0 1 0 .696 10.75 10.75 0 0 1-19.876 0" />
      <circle cx="12" cy="12" r="3" />
    </svg>
  );
}

export type LoreEffectsProps = {
  /** Etiqueta pequeña encima del título (p. ej. WORLD) */
  worldLabel?: string;
  /** Nombre del reino / región icónica (Optimus Princeps) */
  realmName: string;
  /** Párrafo breve bajo el título (EB Garamond) */
  description?: string;
  /** Enlace “Read more” (estilo Bloodborne) */
  readMoreHref?: string;
  readMoreLabel?: string;
};

export default function LoreEffects({
  worldLabel = "WORLD",
  realmName,
  description,
  readMoreHref = "#",
  readMoreLabel = "Read more",
}: LoreEffectsProps) {
  const [particlesReady, setParticlesReady] = useState(false);
  const [burnKey, setBurnKey] = useState(0);

  useEffect(() => {
    initParticlesEngine(async (engine) => {
      await loadSlim(engine);
    }).then(() => setParticlesReady(true));
  }, []);

  // useMemo con tipado ISourceOptions corrige el error en options={particlesOptions}
  const particlesOptions: ISourceOptions = useMemo(() => ({
    fullScreen: { enable: false },
    fpsLimit: 120,
    background: { color: "transparent" },
    particles: {
      number: {
        value: 120,
        density: { enable: true, area: 800 }
      },
      color: {
        value: ["#ff3300", "#ff6600", "#ffcc00"]
      },
      shape: {
        type: "polygon",
        options: {
          polygon: {
            // CAMBIO: 6 lados crea una forma de "piedra" o mota irregular.
            // Al ser pequeña, se ve como un círculo rugoso, no como un triángulo.
            sides: 6, 
          }
        }
      },
      opacity: {
        value: { min: 0.1, max: 0.4 },
        animation: { enable: true, speed: 1, sync: false }
      },
      size: {
        // MANTENIDO: No se ha tocado el tamaño
        value: { min: 0.5, max: 1.5 },
      },
      rotate: {
        value: { min: 0, max: 360 },
        direction: "random",
        path: false, // Desactivado para que no parezcan flechas apuntando arriba
        animation: { enable: true, speed: 5, sync: false }
      },
      move: {
        enable: true,
        speed: { min: 0.4, max: 1.2 },
        direction: "top",
        random: true,
        straight: false,
        outModes: { default: "out" },
        wobble: {
          enable: true,
          distance: 15,
          speed: { min: 1, max: 3 },
        },
      },
      shadow: {
        enable: true,
        color: "#ff3300",
        blur: 8,
      },
    },
    detectRetina: true
  }), []);

  return (
    <section className="relative flex min-h-0 min-w-0 flex-1 flex-col overflow-hidden bg-transparent">
      
      {/* Capa de Partículas */}
      {particlesReady && (
        <Particles
          id="lore-effects-embers"
          options={particlesOptions}
          className="pointer-events-none absolute inset-0 z-10 h-full w-full mix-blend-screen"
        />
      )}

      {/* Sangría lateral + offset vertical (sin min-h extra: evita scroll fantasma) */}
      <motion.div
        className="page-gutter-x relative z-20 w-full min-w-0 pt-[30vh] pb-16 sm:pt-[34vh] md:pt-[38vh] lg:pt-[42vh]"
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        onViewportEnter={() => setBurnKey((k) => k + 1)}
        transition={{ duration: 1.5 }}
      >
        <div
          key={burnKey}
          className="animate-fade-in-burn w-full min-w-0 max-w-xl ps-6 text-left sm:ps-10 md:max-w-2xl md:ps-14 lg:ps-20"
        >
          <p className="font-optimus text-[0.7rem] font-semibold uppercase tracking-[0.42em] text-white/85 sm:text-xs">
            {worldLabel}
          </p>

          <h1 className="font-optimus mt-4 text-4xl font-normal uppercase leading-[1.05] tracking-[0.08em] text-white [text-shadow:0_0_36px_rgba(255,77,0,0.35)] sm:mt-5 sm:text-5xl sm:tracking-[0.1em] md:text-6xl">
            {realmName}
          </h1>

          <div
            className="mt-5 flex w-full max-w-md items-center gap-3 sm:mt-6 sm:max-w-lg"
            aria-hidden="true"
          >
            <span className="h-px flex-1 bg-gradient-to-r from-transparent via-white/10 to-white/25" />
            <span className="font-optimus text-[0.55rem] text-amber-200/35 sm:text-[0.65rem]">
              ✦
            </span>
            <span className="h-px flex-1 bg-gradient-to-l from-transparent via-white/10 to-white/25" />
          </div>

          {description ? (
            <p className="font-lore mt-8 max-w-md text-base leading-relaxed text-[#e2e2d5] antialiased sm:text-lg">
              {description}
            </p>
          ) : null}

          <Link
            href={readMoreHref}
            className="font-lore mt-8 inline-flex items-center gap-2.5 text-[0.65rem] uppercase tracking-[0.32em] text-[#e2e2d5]/88 antialiased transition-colors hover:text-white sm:text-xs"
          >
            <ReadMoreEyeIcon className="shrink-0 opacity-90" />
            <span>{readMoreLabel}</span>
          </Link>
        </div>
      </motion.div>
    </section>
  );
}