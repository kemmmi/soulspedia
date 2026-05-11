"use client";

import { fsMotion } from "@/lib/motion/fromSoftware";
import Image from "next/image";
import Link from "next/link";
import { motion, useReducedMotion } from "framer-motion";
import { useEffect, useState } from "react";

type PanelId = "ds1" | "ds2" | "ds3";
type Phase = "hidden" | "lines" | "ds1-bw" | "ds1-color" | "all-visible";

type PanelConfig = {
  id: PanelId;
  title: string;
  subtitle: string;
  href: string;
  imageSrc: string;
};

const PANELS: PanelConfig[] = [
  {
    id: "ds3",
    title: "DARK SOULS III",
    subtitle: "Lothric · 2016",
    href: "/dark-souls-3",
    imageSrc: "/darksouls3.jpg",
  },
  {
    id: "ds1",
    title: "DARK SOULS",
    subtitle: "Lordran · 2011",
    href: "/dark-souls",
    imageSrc: "/darksoulsfondo3.jpg",
  },
  {
    id: "ds2",
    title: "DARK SOULS II",
    subtitle: "Drangleic · 2014",
    href: "/dark-souls-2",
    imageSrc: "/darksouls2fondo3.jpg",
  },
];

const clipPathsRest: Record<PanelId, string> = {
  ds3: "polygon(0 0, 32% 0, 18% 100%, 0 100%)",
  ds1: "polygon(0 0, 100% 0, 100% 100%, 0 100%)",
  ds2: "polygon(68% 0, 100% 0, 100% 100%, 82% 100%)",
};

const clipPathsHover: Record<PanelId, string> = {
  ds3: "polygon(0 0, 55% 0, 41% 100%, 0 100%)",
  ds1: "polygon(0 0, 100% 0, 100% 100%, 0 100%)",
  ds2: "polygon(45% 0, 100% 0, 100% 100%, 59% 100%)",
};

// Clip-path estrecho para DS1 durante fase ds1-bw
const DS1_NARROW = "polygon(32% 0, 68% 0, 82% 100%, 18% 100%)";

const zIndexes: Record<PanelId, number> = { ds1: 10, ds3: 20, ds2: 20 };
const cssEase = "cubic-bezier(0.33, 0, 0.17, 1)";
const imageRevealEase = [0.22, 1, 0.36, 1] as const;

function TrilogyHubInner() {
  const reduce = useReducedMotion();
  const [hoveredPanel, setHoveredPanel] = useState<PanelId | null>(null);
  const [phase, setPhase] = useState<Phase>("hidden");

  useEffect(() => {
    // if (reduce) {
    //   setPhase("all-visible");
    //   return;
    // }

    // Empezar siempre desde hidden
    setPhase("hidden");

    const t1 = window.setTimeout(() => setPhase("lines"), 750);
    const t2 = window.setTimeout(() => setPhase("ds1-bw"), 1450);
    const t3 = window.setTimeout(() => setPhase("ds1-color"), 2850);
    const t4 = window.setTimeout(() => setPhase("all-visible"), 3850);

    return () => {
      window.clearTimeout(t1);
      window.clearTimeout(t2);
      window.clearTimeout(t3);
      window.clearTimeout(t4);
    };
  }, [reduce]);

  const activePanel = hoveredPanel ?? "ds1";

  // ─── Helpers por panel ───────────────────────────────────────────────────

  function getClipPath(id: PanelId): string {
    if (id === "ds1") {
      // Estrecho desde el primer frame — nunca a pantalla completa antes de ds1-color
      if (phase === "hidden" || phase === "lines" || phase === "ds1-bw") return DS1_NARROW;
      return clipPathsRest.ds1;
    }
    if (hoveredPanel === id) return clipPathsHover[id];
    return clipPathsRest[id];
  }

  function getOpacity(id: PanelId): number {
    if (id === "ds1") {
      // DS1 siempre visible — el clip-path estrecho lo contiene desde el inicio
      return 1;
    }
    // Laterales: la visibilidad la controla el clipPath animado de entrada
    return 1;
  }

  function getFilter(id: PanelId): string {
    if (id === "ds1") {
      if (phase === "ds1-bw") return "grayscale(100%) brightness(0.55)";
      if (phase === "ds1-color" || phase === "all-visible") {
        if (hoveredPanel && hoveredPanel !== "ds1") return "grayscale(100%) brightness(0.4)";
        return "grayscale(0%) brightness(1)";
      }
      return "grayscale(100%) brightness(0.5)";
    }
    // Laterales
    if (hoveredPanel === id) return "grayscale(0%) brightness(0.9)";
    if (hoveredPanel === "ds1" || hoveredPanel === null) return "grayscale(100%) brightness(0.45)";
    return "grayscale(100%) brightness(0.4)";
  }

  function getTransition(id: PanelId): string {
    const clipDur = id === "ds1" ? "1.0s" : "0.7s";
    const opacityDelay = id === "ds2" ? "0.2s" : "0s";
    return [
      `clip-path ${clipDur} ${cssEase}`,
      `filter 0.8s ${cssEase}`,
      `opacity 1.0s ${cssEase} ${opacityDelay}`,
    ].join(", ");
  }

  // ─── Render ──────────────────────────────────────────────────────────────

  return (
    // Fondo negro siempre presente — nunca hay flash blanco
    <div
      className="fixed inset-0 bg-[#050505] text-white"
      onMouseLeave={() => setHoveredPanel(null)}
    >
      {/* Líneas SVG diagonales — solo en fases lines y ds1-bw */}
      <svg
        className="pointer-events-none absolute inset-0 z-30 h-full w-full"
        preserveAspectRatio="none"
        style={{
          opacity: phase === "lines" || phase === "ds1-bw" ? 1 : 0,
          transition: `opacity 0.3s ${cssEase}`,
        }}
      >
        <line
          x1="32%" y1="0%" x2="18%" y2="100%"
          stroke="rgba(255,255,255,0.15)"
          strokeWidth="1"
        />
        <line
          x1="68%" y1="0%" x2="82%" y2="100%"
          stroke="rgba(255,255,255,0.15)"
          strokeWidth="1"
        />
      </svg>

      {PANELS.map((panel) => {
        const showContent =
          activePanel === panel.id &&
          (hoveredPanel !== null || phase === "ds1-color" || phase === "all-visible" || !!reduce);

        return (
          <div
            key={panel.id}
            className="absolute inset-0"
            style={{
              clipPath: getClipPath(panel.id),
              zIndex: zIndexes[panel.id],
              filter: getFilter(panel.id),
              opacity: getOpacity(panel.id),
              transition: getTransition(panel.id),
            }}
            onMouseEnter={() => setHoveredPanel(panel.id)}
          >
            {panel.id === "ds1" ? (
              <Link
                href={panel.href}
                className="absolute inset-0 block outline-none focus-visible:ring-2 focus-visible:ring-amber-100/55 focus-visible:ring-inset"
                onFocus={() => setHoveredPanel(panel.id)}
              >
                {/* Imagen con slow zoom-out de entrada */}
                <motion.div
                  className="absolute inset-0"
                  initial={reduce ? false : { scale: 1.06 }}
                  animate={reduce ? false : {
                    scale: phase === "hidden" ? 1.06 : hoveredPanel === panel.id ? 1.03 : 1.0,
                  }}
                  transition={{ duration: 2.2, ease: imageRevealEase }}
                >
                  <Image
                    src={panel.imageSrc}
                    alt={panel.title}
                    fill
                    priority
                    sizes="100vw"
                    className="object-cover object-center"
                  />
                </motion.div>

                {/* Gradientes */}
                <div className="pointer-events-none absolute inset-0 z-[1] bg-gradient-to-t from-black/80 via-black/10 to-transparent" />
                <div className="pointer-events-none absolute inset-0 z-[1] bg-gradient-to-r from-black/30 to-transparent" />

                {/* Título */}
                <motion.div
                  className="pointer-events-none absolute bottom-0 left-0 z-10 p-10"
                  initial={reduce ? false : { opacity: 0, y: 8 }}
                  animate={reduce ? false : {
                    opacity: showContent ? 1 : 0,
                    y: showContent ? 0 : 8,
                  }}
                  transition={{
                    duration: fsMotion.dur.headline,
                    delay: showContent ? 0.2 : 0,
                    ease: fsMotion.ease,
                  }}
                >
                  <p className="mb-1 font-lore text-xs tracking-tight text-white/40">
                    {panel.subtitle}
                  </p>
                  <h2 className="font-optimus text-3xl uppercase tracking-[0.06em] text-amber-100/90 [text-shadow:0_0_14px_rgba(0,0,0,0.82),0_0_42px_rgba(75,42,12,0.38)]">
                    {panel.title}
                  </h2>
                  <p className="mt-2 font-lore text-sm text-white/55">
                    Entrar al archivo →
                  </p>
                </motion.div>
              </Link>
            ) : (
              <motion.div
                className="absolute inset-0"
                initial={{ clipPath: "inset(100% 0% 0% 0%)" }}
                animate={{
                  clipPath:
                    phase === "all-visible"
                      ? "inset(0% 0% 0% 0%)"
                      : "inset(100% 0% 0% 0%)",
                }}
                transition={{
                  duration: 1.1,
                  delay: panel.id === "ds2" ? 0.15 : 0,
                  ease: imageRevealEase,
                }}
              >
                <Link
                  href={panel.href}
                  className="absolute inset-0 block outline-none focus-visible:ring-2 focus-visible:ring-amber-100/55 focus-visible:ring-inset"
                  onFocus={() => setHoveredPanel(panel.id)}
                >
                  {/* Imagen con slow zoom-out de entrada */}
                  <motion.div
                    className="absolute inset-0"
                    initial={reduce ? false : { scale: 1.06 }}
                    animate={reduce ? false : {
                      scale: phase === "hidden" ? 1.06 : hoveredPanel === panel.id ? 1.03 : 1.0,
                    }}
                    transition={{ duration: 2.2, ease: imageRevealEase }}
                  >
                    <Image
                      src={panel.imageSrc}
                      alt={panel.title}
                      fill
                      priority
                      sizes="100vw"
                      className="object-cover object-center"
                    />
                  </motion.div>

                  {/* Gradientes */}
                  <div className="pointer-events-none absolute inset-0 z-[1] bg-gradient-to-t from-black/80 via-black/10 to-transparent" />
                  <div className="pointer-events-none absolute inset-0 z-[1] bg-gradient-to-r from-black/30 to-transparent" />

                  {/* Título */}
                  <motion.div
                    className="pointer-events-none absolute bottom-0 left-0 z-10 p-10"
                    initial={reduce ? false : { opacity: 0, y: 8 }}
                    animate={reduce ? false : {
                      opacity: showContent ? 1 : 0,
                      y: showContent ? 0 : 8,
                    }}
                    transition={{
                      duration: fsMotion.dur.headline,
                      delay: showContent ? 0.2 : 0,
                      ease: fsMotion.ease,
                    }}
                  >
                    <p className="mb-1 font-lore text-xs tracking-tight text-white/40">
                      {panel.subtitle}
                    </p>
                    <h2 className="font-optimus text-3xl uppercase tracking-[0.06em] text-amber-100/90 [text-shadow:0_0_14px_rgba(0,0,0,0.82),0_0_42px_rgba(75,42,12,0.38)]">
                      {panel.title}
                    </h2>
                    <p className="mt-2 font-lore text-sm text-white/55">
                      Entrar al archivo →
                    </p>
                  </motion.div>
                </Link>
              </motion.div>
            )}
          </div>
        );
      })}
    </div>
  );
}

export function TrilogyHub() {
  const [ready, setReady] = useState(false);

  useEffect(() => {
    setReady(true);
  }, []);

  if (!ready) return <div className="fixed inset-0 bg-[#050505]" />;

  return <TrilogyHubInner />;
}