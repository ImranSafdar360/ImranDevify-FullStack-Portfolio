'use client'

import { usePathname } from 'next/navigation'
import { useGSAP } from '@gsap/react'
import { ANIM_TYPES, DRAW, EASE_REVEAL, EASE_UI, MASK, REVEAL, prefersReducedMotion, type AnimType } from './config'
import { gsap, registerGsap, SplitText } from './gsap'

const FROM = { opacity: 0, y: REVEAL.y, scale: REVEAL.scale }

function isAnimType(value: string | undefined): value is AnimType {
  return ANIM_TYPES.includes(value as AnimType)
}

// Content visible at load stays static: hiding it would delay LCP and flash on hydration.
function isOnScreen(el: HTMLElement) {
  const rect = el.getBoundingClientRect()
  return rect.top < window.innerHeight && rect.bottom > 0
}

function animate(el: HTMLElement, type: AnimType) {
  const reveal = { duration: REVEAL.duration, ease: EASE_REVEAL, scrollTrigger: { trigger: el, start: REVEAL.start, once: true } }

  switch (type) {
    case 'slide':
      gsap.from(el, { ...FROM, ...reveal })
      break
    case 'stagger':
      gsap.from(el.children, { ...FROM, ...reveal, stagger: REVEAL.stagger })
      break
    case 'lines':
    case 'words':
      SplitText.create(el, {
        type,
        // "auto" puts aria-label on the element, which is prohibited on <p>/<div>; "none" keeps the text readable as-is.
        aria: 'none',
        tag: 'span',
        autoSplit: true,
        onSplit: (split) => gsap.from(split[type], { ...FROM, ...reveal, stagger: REVEAL.stagger }),
      })
      break
    case 'mask':
      gsap.from(el, {
        clipPath: 'inset(100% 0% 0% 0%)',
        duration: MASK.duration,
        ease: EASE_UI,
        scrollTrigger: { trigger: el, start: MASK.start, once: true },
      })
      break
    case 'draw':
      gsap.from(el, {
        scaleX: 0,
        transformOrigin: 'left center',
        duration: DRAW.duration,
        ease: EASE_UI,
        scrollTrigger: { trigger: el, start: DRAW.start, once: true },
      })
      break
  }
}

// One engine for every scroll reveal: elements opt in with data-anim="lines|words|stagger|slide|mask|draw".
// Re-runs on each route change; useGSAP reverts the previous page's animations and ScrollTriggers.
export function AnimEngine() {
  const pathname = usePathname()

  useGSAP(
    () => {
      if (prefersReducedMotion()) return
      registerGsap()
      for (const el of gsap.utils.toArray<HTMLElement>('[data-anim]')) {
        const type = el.dataset.anim
        if (isAnimType(type) && !isOnScreen(el)) animate(el, type)
      }
    },
    { dependencies: [pathname], revertOnUpdate: true },
  )

  return null
}
