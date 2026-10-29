'use client'

import { usePathname } from 'next/navigation'
import { useEffect, useRef } from 'react'

// Rama's "boiling line" effect: script labels use filter: url(#wiggle), and the noise seed
// changes every 120ms so the handwriting shimmers. Rendered once in the root layout.
// The seed only changes while a label is on screen: each change repaints every filtered element.
export const WIGGLE_INTERVAL_MS = 120
export const WIGGLE_SELECTOR = '[data-wiggle]'
const SEED_COUNT = 10

export function WiggleFilter() {
  const pathname = usePathname()
  const noiseRef = useRef<SVGFETurbulenceElement>(null)

  useEffect(() => {
    const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)')
    const visible = new Set<Element>()
    let timer: ReturnType<typeof setInterval> | undefined
    let seed = 1

    const stop = () => {
      if (timer) clearInterval(timer)
      timer = undefined
    }
    const sync = () => {
      if (reducedMotion.matches || visible.size === 0) return stop()
      if (timer) return
      timer = setInterval(() => {
        if (document.hidden) return
        seed = seed >= SEED_COUNT ? 1 : seed + 1
        noiseRef.current?.setAttribute('seed', String(seed))
      }, WIGGLE_INTERVAL_MS)
    }

    const observer = new IntersectionObserver((entries) => {
      for (const entry of entries) {
        if (entry.isIntersecting) visible.add(entry.target)
        else visible.delete(entry.target)
      }
      sync()
    })
    document.querySelectorAll(WIGGLE_SELECTOR).forEach((label) => observer.observe(label))

    reducedMotion.addEventListener('change', sync)
    return () => {
      stop()
      observer.disconnect()
      reducedMotion.removeEventListener('change', sync)
    }
  }, [pathname])

  return (
    <svg aria-hidden="true" focusable="false" width="0" height="0" style={{ position: 'absolute' }}>
      <filter id="wiggle">
        <feTurbulence ref={noiseRef} type="turbulence" baseFrequency="0.02 0.06" numOctaves={2} seed={1} result="noise" />
        <feDisplacementMap in="SourceGraphic" in2="noise" scale={1.4} xChannelSelector="R" yChannelSelector="G" />
      </filter>
    </svg>
  )
}
