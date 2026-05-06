"use client";

import { motion } from "framer-motion";
import { useEffect, useMemo, useState } from "react";
import Particles, { initParticlesEngine } from "@tsparticles/react";
import { loadSlim } from "@tsparticles/slim";
import type { ISourceOptions } from "@tsparticles/engine";

export default function LoreEffects() {
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
    <section className="relative min-h-screen w-full overflow-hidden bg-transparent">
      
      {/* Capa de Partículas */}
      {particlesReady && (
        <Particles
          id="lore-effects-embers"
          options={particlesOptions}
          className="pointer-events-none absolute inset-0 z-10 h-full w-full mix-blend-screen"
        />
      )}

      {/* Contenido del Lore */}
      <motion.div
        className="relative z-20 flex min-h-screen w-full flex-col items-center justify-center px-6 py-24"
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        onViewportEnter={() => setBurnKey((k) => k + 1)}
        transition={{ duration: 1.5 }}
      >
        <div key={burnKey} className="animate-fade-in-burn mx-auto max-w-2xl text-center">
          
          <div className="mx-auto mb-8 h-px w-24 bg-gradient-to-r from-transparent via-amber-200/30 to-transparent" />
          

          <h1 className="font-optimus mt-6 text-[clamp(2.5rem,8vw,5.5rem)] uppercase leading-none tracking-[0.1em] text-white [text-shadow:0_0_40px_rgba(255,77,0,0.4)]">
            Dark Souls
          </h1>

          <div className="mx-auto mt-10 h-px w-full bg-gradient-to-r from-transparent via-white/10 to-transparent" />

          <div className="mt-12 space-y-8 font-lore text-[clamp(1.1rem,1.9vw,1.3rem)] leading-relaxed text-[#e2e2d5] antialiased">
            <p>
              In the Age of Ancients, the world was unformed — shrouded by fog,
              a land of grey crags, archtrees and everlasting dragons.
            </p>
            
          </div>

          <div className="mx-auto mt-12 h-px w-24 bg-gradient-to-r from-transparent via-amber-200/30 to-transparent" />
        </div>
      </motion.div>
    </section>
  );
}