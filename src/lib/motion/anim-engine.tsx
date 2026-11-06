'use client'

import { usePathname } from 'next/navigation'
import { useGSAP } from '@gsap/react'
import { ANIM_TYPES, DRAW, EASE_REVEAL, EASE_UI, MASK, OUTLINE, REVEAL, prefersReducedMotion, type AnimType } from './config'
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
    case 'outline':
      outline(el)
      break
  }
}

// Each [data-line] holds the real text ([data-fill]) and an aria-hidden outline copy ([data-outline]) on top of it.
const HIDDEN = 'inset(0% 100% 0% 0%)'
const SHOWN = 'inset(0% 0% 0% 0%)'

function outline(el: HTMLElement) {
  const tl = gsap.timeline({ scrollTrigger: { trigger: el, start: OUTLINE.start, once: true } })
  el.querySelectorAll<HTMLElement>('[data-line]').forEach((line, i) => {
    const stroke = line.querySelector<HTMLElement>('[data-outline]')
    const fill = line.querySelector<HTMLElement>('[data-fill]')
    if (!stroke || !fill) return
    const at = i * OUTLINE.stagger
    gsap.set(stroke, { opacity: 1, clipPath: HIDDEN })
    gsap.set(fill, { clipPath: HIDDEN })
    tl.to(stroke, { clipPath: SHOWN, duration: OUTLINE.outline, ease: EASE_UI }, at)
      .to(fill, { clipPath: SHOWN, duration: OUTLINE.fill, ease: EASE_UI }, at + OUTLINE.outline - OUTLINE.overlap)
      .to(stroke, { opacity: 0, duration: 0.4, ease: 'none' }, at + OUTLINE.outline - OUTLINE.overlap + OUTLINE.fill)
  })
}

// One engine for every scroll reveal: elements opt in with data-anim="lines|words|stagger|slide|mask|draw|outline".
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
