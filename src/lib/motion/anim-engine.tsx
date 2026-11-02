'use client'

import { usePathname } from 'next/navigation'
import { useGSAP } from '@gsap/react'
import { ANIM_TYPES, DRAW, EASE_REVEAL, EASE_UI, MASK, NAV_FLIP, PARALLAX, REVEAL, prefersReducedMotion, type AnimType } from './config'
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

// Scroll-linked types start from the element's natural state, so they are safe on screen at load.
const SCROLL_LINKED: readonly AnimType[] = ['nav-flip', 'parallax']

// The hero wordmark shrinks and flies into the nav chip as the page scrolls, and reverses on the way back up.
// Measured from the untransformed parent and size so refreshes (resize, fonts) never read a mid-flight transform.
function navFlip(el: HTMLElement) {
  const box = () => el.parentElement!.getBoundingClientRect()
  const scale = () => NAV_FLIP.width / el.offsetWidth
  const chipCenter = () => {
    const nav = document.querySelector('nav[data-nav-shell]')?.getBoundingClientRect()
    return { x: window.innerWidth / 2, y: nav ? nav.top + nav.height / 2 : 40 }
  }

  gsap
    .timeline({
      scrollTrigger: { start: 0, end: NAV_FLIP.end, scrub: NAV_FLIP.scrub, invalidateOnRefresh: true },
      defaults: { ease: 'none' },
    })
    .to(el, {
      transformOrigin: 'left top',
      scale,
      x: () => chipCenter().x - box().left - (el.offsetWidth * scale()) / 2,
      // Element moves up by `end` px of scroll; offset that so it lands on the chip's centre.
      y: () => chipCenter().y + NAV_FLIP.end - (box().top + window.scrollY) - (el.offsetHeight * scale()) / 2,
      duration: 1,
    })
    .to(el, { opacity: 0, duration: 0.35 }, 0.65)
}

// Hero props drift upward as the page scrolls. Starts at scroll 0 with no offset, so nothing jumps when it binds.
function parallax(el: HTMLElement) {
  const speed = Number(el.dataset.speed) || PARALLAX.defaultSpeed
  gsap.to(el, {
    y: () => -speed * window.innerHeight,
    ease: 'none',
    scrollTrigger: { start: 0, end: () => window.innerHeight, scrub: true, invalidateOnRefresh: true },
  })
}

function animate(el: HTMLElement, type: AnimType) {
  if (type === 'nav-flip') return navFlip(el)
  if (type === 'parallax') return parallax(el)

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

// One engine for every scroll reveal: elements opt in with data-anim="lines|words|stagger|slide|mask|draw|nav-flip|parallax".
// Re-runs on each route change; useGSAP reverts the previous page's animations and ScrollTriggers.
export function AnimEngine() {
  const pathname = usePathname()

  useGSAP(
    () => {
      if (prefersReducedMotion()) return
      registerGsap()
      for (const el of gsap.utils.toArray<HTMLElement>('[data-anim]')) {
        const type = el.dataset.anim
        if (isAnimType(type) && (SCROLL_LINKED.includes(type) || !isOnScreen(el))) animate(el, type)
      }
    },
    { dependencies: [pathname], revertOnUpdate: true },
  )

  return null
}
