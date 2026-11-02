// Motion values from the Rama reverse-engineering (docs/portfolio-redesign/03-reverse-engineering.md §1.5).
//
// Rama's two CustomEase paths turn out to be standard cubic-béziers (Webflow's 160×160 box, y flipped):
//   reveal "M0,160 C40,144 40,0 160,0"        → cubic-bezier(0.25, 0.1, 0.25, 1)  (CSS "ease")
//   ui     "M0,160 C99.2,160 54.4,1.6 160,0"  → cubic-bezier(0.62, 0, 0.34, 0.99) (= --ease-ui)
export const EASE_REVEAL = 'portfolio.reveal'
export const EASE_UI = 'portfolio.ui'
export const EASE_REVEAL_PATH = 'M0,0 C0.25,0.1 0.25,1 1,1'
export const EASE_UI_PATH = 'M0,0 C0.62,0 0.34,0.99 1,1'

export const REVEAL = {
  duration: 1,
  stagger: 0.1,
  y: '1.25rem',
  scale: 0.9,
  start: 'top 75%',
} as const

export const MASK = { duration: 1.3, start: 'top 90%' } as const
export const DRAW = { duration: 1, start: 'top 75%' } as const

export const LENIS_DURATION = 1.1

// Hero wordmark → nav chip handoff: scrubbed over the first `end` px of scroll, shrinking to `width` px.
export const NAV_FLIP = { end: 220, width: 110, scrub: 0.3 } as const

// Parallax drift: element moves up by data-speed × viewport height over the first viewport of scroll.
export const PARALLAX = { defaultSpeed: 0.15 } as const

export const ANIM_TYPES = ['lines', 'words', 'stagger', 'slide', 'mask', 'draw', 'nav-flip', 'parallax'] as const
export type AnimType = (typeof ANIM_TYPES)[number]

export function prefersReducedMotion(): boolean {
  return typeof window !== 'undefined' && window.matchMedia('(prefers-reduced-motion: reduce)').matches
}
