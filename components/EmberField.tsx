"use client";

import { useEffect, useMemo, useState } from "react";
import Particles, { initParticlesEngine } from "@tsparticles/react";
import { loadSlim } from "@tsparticles/slim";
import type { ISourceOptions } from "@tsparticles/engine";

export default function EmberField() {
  const [particlesReady, setParticlesReady] = useState(false);

  useEffect(() => {
    // Esta función es requerida una sola vez para cargar los scripts de partículas
    initParticlesEngine(async (engine) => {
      // Cargamos el motor delgado (slim) que es más rápido
      await loadSlim(engine);
    }).then(() => setParticlesReady(true));
  }, []);

  // Esta es la clave del realismo: La configuración detallada
  const particlesOptions = useMemo<ISourceOptions>(() => ({
    fullScreen: { enable: false }, // No bloquear toda la pantalla con el canvas
    fpsLimit: 60, // Límite para rendimiento
    interactivity: {
      events: {
        onHover: { enable: false }, // Sin interacción, solo atmósfera
        onClick: { enable: false },
      },
    },
    particles: {
      // 1. CANTIDAD Y DENSIDAD: Un número alto para la densidad
      number: { 
        value: 200, // Ajusta este valor si tu PC se ralentiza
        density: { enable: true, area: 1000 } 
      },
      
      // 2. COLOR MULTI-TONO: Variedad de tonos de fuego
      color: { 
        value: ["#ff4d00", "#ff7a00", "#ffaa00", "#ffcc00"] 
      },
      
      // 3. FORMA: Usamos polígonos irregulares (pentágonos imperfectos)
      // Esto rompe la geometría perfecta y los hace parecer fragmentos realistas
      shape: { 
        type: "polygon", 
        options: {
          polygon: { sides: 5 } 
        }
      },
      
      // 4. OPACIDAD INTERMITENTE (PULSO): Simula la luz cambiante
      opacity: {
        value: { min: 0.1, max: 0.8 },
        animation: {
          enable: true,
          speed: 2, // Pulso rápido
          sync: false,
          startValue: "random",
        },
      },
      
      // 5. TAMAÑO VARIABLE Y CAMBIANTE: Miles de tiny, pocos grandes
      size: {
        value: { min: 1, max: 4 },
        animation: {
          enable: true,
          speed: 4, // Cambian de tamaño mientras suben
          sync: false,
          startValue: "random",
        },
      },
      
      // 6. MOVIMIENTO CAÓTICO (Clave para el realismo)
      move: {
        enable: true,
        direction: "top", // Dirección general: arriba
        speed: { min: 1, max: 4 }, // Variedad de velocidad ascendente
        random: true,
        straight: false, // Caótico, no línea recta
        outModes: { default: "out" }, // Las partículas se van de la pantalla
        
        // WOBBLE: Esta es la clave del efecto "swirling".
        // Simula la turbulencia del aire ascendente
        wobble: { 
          enable: true,
          distance: 30, // Cuánto se balancean de lado a lado
          speed: { min: 5, max: 15 }, // Variedad de velocidad de wobble
        },
        
        // ROTACIÓN: Para que las formas irregulares se retuerzan
        rotate: {
          value: { min: 0, max: 360 },
          animation: {
            enable: true,
            speed: 20, // Giran rápido
            sync: false,
          },
        },
      },
      
      // 7. SOMBRA Y RESPLANDOR REALISTA (Glow)
      shadow: {
        enable: true,
        color: "#ff7a00",
        blur: 10,
      },
    },
  }), []);

  return (
    // Un contenedor simple de z-index 0 para layer detrás del contenido
    <div className="absolute inset-0 z-0 h-full w-full pointer-events-none bg-transparent">
       {/* TSParticles Layer */}
      {particlesReady && (
        <Particles
          id="ember-field-tsparticles"
          options={particlesOptions}
          // z-index 0 para layer detrás de contenido, pero delante del fondo
          className="pointer-events-none absolute inset-0 z-0 h-full w-full"
        />
      )}
    </div>
  );
}