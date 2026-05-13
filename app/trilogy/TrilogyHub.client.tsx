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
    id: "ds1",
    title: "DARK SOULS",
    subtitle: "Lordran · 2011",
    href: "/dark-souls",
    imageSrc: "/fondoartorias.png",
  },
  {
    id: "ds2",
    title: "DARK SOULS II",
    subtitle: "Drangleic · 2014",
    href: "/dark-souls-2",
    imageSrc: "/fondodarksouls2.jpg",
  },
  {
    id: "ds3",
    title: "DARK SOULS III",
    subtitle: "Lothric · 2016",
    href: "/dark-souls-3",
    imageSrc: "/darksouls3.jpg",
  },
];

const clipPathsRest: Record<PanelId, string> = {
  ds1: "polygon(0 0, 36% 0, 30% 100%, 0 100%)",
  ds2: "polygon(0 0, 100% 0, 100% 100%, 0 100%)",
  ds3: "polygon(70% 0, 100% 0, 100% 100%, 64% 100%)",
};

const DS1_NARROW = "polygon(36% 0, 70% 0, 64% 100%, 30% 100%)";

const zIndexes: Record<PanelId, number> = { ds1: 20, ds2: 10, ds3: 20 };
const cssEase = "cubic-bezier(0.33, 0, 0.17, 1)";
const imageRevealEase: [number, number, number, number] = [0.22, 1, 0.36, 1];

function TrilogyHubInner() {
  const reduce = useReducedMotion();
  const [hoveredPanel, setHoveredPanel] = useState<PanelId | null>(null);
  const [phase, setPhase] = useState<Phase>("hidden");
  const [interactive, setInteractive] = useState(false);

  useEffect(() => {
    setPhase("hidden");
    const t1 = window.setTimeout(() => setPhase("lines"),       800);
    const t2 = window.setTimeout(() => setPhase("ds1-bw"),     1700);
    const t3 = window.setTimeout(() => setPhase("ds1-color"),  3100);
    const t4 = window.setTimeout(() => setPhase("all-visible"), 3100);
    const t5 = window.setTimeout(() => setInteractive(true), 4500);
    return () => {
      window.clearTimeout(t1);
      window.clearTimeout(t2);
      window.clearTimeout(t3);
      window.clearTimeout(t4);
      window.clearTimeout(t5);
    };
  }, [reduce]);

  const activePanel = hoveredPanel ?? "ds2";

  const offset =
    hoveredPanel === "ds1" ? 18
    : hoveredPanel === "ds3" ? -18
    : 0;

  function getClipPath(id: PanelId): string {
    if (id === "ds2") {
      if (phase !== "all-visible") return DS1_NARROW;
      return "polygon(0 0, 100% 0, 100% 100%, 0 100%)";
    }
    if (id === "ds1") {
      const t = Math.min(36 + offset, 100);
      const b = Math.min(30 + offset, 100);
      return `polygon(0 0, ${t}% 0, ${b}% 100%, 0 100%)`;
    }
    if (id === "ds3") {
      const t = Math.max(70 + offset, 0);
      const b = Math.max(64 + offset, 0);
      return `polygon(${t}% 0, 100% 0, 100% 100%, ${b}% 100%)`;
    }
    return clipPathsRest[id];
  }

  function getFilter(id: PanelId): string {
    if (id === "ds2") {
      if (phase === "hidden" || phase === "lines" || phase === "ds1-bw")
        return "grayscale(100%) brightness(0.55)";
      if (hoveredPanel && hoveredPanel !== "ds2") return "grayscale(100%) brightness(0.4)";
      return "grayscale(0%) brightness(1)";
    }
    if (hoveredPanel === id) return "grayscale(0%) brightness(0.9)";
    if (hoveredPanel === null) return "grayscale(100%) brightness(0.45)";
    return "grayscale(100%) brightness(0.4)";
  }

  function getTransition(id: PanelId): string {
    const clipDur = id === "ds1" ? "1.0s" : "0.8s";
    return [
      `clip-path ${clipDur} ${cssEase}`,
      `filter 0.8s ${cssEase}`,
    ].join(", ");
  }

  return (
    <div
      className="fixed inset-0 bg-[#050505] text-white"
      style={{ pointerEvents: interactive ? "auto" : "none" }}
      onMouseLeave={() => setHoveredPanel(null)}
    >
      {/* Líneas SVG — solo en fases lines y ds1-bw */}
      <svg
        className="pointer-events-none absolute inset-0 z-30 h-full w-full"
        preserveAspectRatio="none"
        style={{
          opacity: phase === "lines" || phase === "ds1-bw" ? 1 : 0,
          transition: `opacity 0.3s ${cssEase}`,
        }}
      >
        <line x1="36%" y1="0%" x2="30%" y2="100%" stroke="rgba(255,255,255,0.15)" strokeWidth="1" />
        <line x1="70%" y1="0%" x2="64%" y2="100%" stroke="rgba(255,255,255,0.15)" strokeWidth="1" />
      </svg>

      {PANELS.map((panel) => {
        const showContent =
          activePanel === panel.id &&
          (phase === "all-visible" || (panel.id === "ds2" && phase === "ds1-color"));

        return (
          <div
            key={panel.id}
            className="absolute inset-0"
            style={{
              clipPath: getClipPath(panel.id),
              zIndex: zIndexes[panel.id],
              filter: getFilter(panel.id),
              transition: getTransition(panel.id),
              overflow: panel.id === "ds2" ? "hidden" : undefined,
            }}
            onMouseEnter={() => setHoveredPanel(panel.id)}
          >
            <motion.div
              className="absolute inset-0"
              initial={{ clipPath: "inset(0% 0% 100% 0%)" }}
              animate={{
                clipPath:
                  panel.id === "ds2"
                    ? (phase === "ds1-bw" || phase === "ds1-color" || phase === "all-visible"
                        ? "inset(0% 0% 0% 0%)"
                        : "inset(0% 0% 100% 0%)")
                    : (phase === "all-visible"
                        ? "inset(0% 0% 0% 0%)"
                        : "inset(0% 0% 100% 0%)"),
              }}
              transition={{
                duration: 1.1,
                delay: panel.id === "ds2" ? 0 : panel.id === "ds1" ? 0 : 0.15,
                ease: imageRevealEase,
              }}
            >
              <Link
                href={panel.href}
                className="absolute inset-0 block outline-none focus-visible:ring-2 focus-visible:ring-amber-100/55 focus-visible:ring-inset"
                onFocus={() => setHoveredPanel(panel.id)}
              >
                <motion.div
                  className="absolute inset-0"
                  animate={{
                    clipPath:
                      panel.id === "ds2"
                        ? (phase === "ds1-bw" || phase === "ds1-color" || phase === "all-visible"
                            ? "inset(0% 0% 0% 0%)"
                            : "inset(0% 0% 100% 0%)")
                        : (phase === "all-visible"
                            ? "inset(0% 0% 0% 0%)"
                            : "inset(0% 0% 100% 0%)"),
                  }}
                  transition={{
                    duration: 1.8,
                    ease: imageRevealEase,
                  }}
                >
                {/* Imagen */}
                <motion.div
                  className="absolute inset-0"
                  initial={{ scale: 1.06 }}
                  animate={{
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
                  className="object-cover"
                  style={{ 
                    objectPosition: panel.id === "ds3" 
                      ? "25% center" 
                      : panel.id === "ds2" 
                      ? "80% center" 
                      : "center center" 
                  }}
                  />
                </motion.div>

                {/* Gradientes */}
                <div className="pointer-events-none absolute inset-0 z-[1] bg-gradient-to-t from-black/80 via-black/10 to-transparent" />
                <div className="pointer-events-none absolute inset-0 z-[1] bg-gradient-to-r from-black/30 to-transparent" />

                {/* Título */}
                <motion.div
                  className="pointer-events-none absolute bottom-0 left-0 z-10 p-10"
                  initial={{ opacity: 0, y: 8 }}
                  animate={{
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
                </motion.div>
              </Link>
            </motion.div>
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
