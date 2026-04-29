/**
 * Curvas y duraciones al estilo de portales oficiales de estudios nipones:
 * fundidos lentos, secuenciación contenida y sin elastic/bounce
 * (referencia de sensaciones similares a la web oficial de FromSoftware —
 * sin copiar elementos de marca).
 *
 * @see https://www.fromsoftware.jp/jp/
 */

/** Ease-out profundo sin rebotes (cola muy suave). */
export const FS_EASE = [0.33, 0, 0.17, 1] as const;

export const fsMotion = {
  ease: FS_EASE,
  dur: {
    route: 0.82,
    /** Fondo: casi sólo tiempo de pantalla cinematográfico */
    background: 2.1,
    headline: 1.05,
    subline: 1,
    navLink: 0.82,
    /** Lore que entra por scroll */
    reveal: 1.05,
    /** Chrome de cabecera / pie */
    chrome: 0.88,
    loginShell: 1,
    loginField: 0.76,
    loginMeta: 0.85,
  },
  stagger: {
    headline: 0.22,
    subline: 0.54,
    /** Primer ítem de navegación después del texto */
    nav: 1.02,
    /** Espacio entre enlaces tipo “líneas de fichas” */
    navGap: 0.26,
  },
  /**
   * Inicio sólo eslógan + juegos: coreografía cercana al portal FromSoftware.jp
   * (fundido largo, capas lentas, textos sólo opacity — sin bounce).
   */
  homeIntro: {
    /** Velo casi-opaco que rodea hasta despejar */
    curtainSec: 2.2,
    bgSec: 3,
    veloOpacityStart: 0.93,
    veloOpacityEnd: 0.48,
    veloSec: 2.05,
    veloDelay: 0.4,
    sloganDuration: 1.25,
    sloganDelay: 1.42,
    navItemDuration: 1.1,
    navBaseDelay: 2.92,
    navGapDelay: 0.5,
  },
  px: {
    /** Desplazamientos verticales mínimos (no “bounce”) */
    title: 10,
    sub: 8,
    link: 8,
    reveal: 10,
    login: 14,
    /** Cabecera: casi sólo dissolve */
    headerY: -5,
    headerLogoScaleDelta: 0.02,
  },
} as const;
