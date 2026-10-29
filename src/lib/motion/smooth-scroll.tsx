'use client'

import { useEffect, useRef } from 'react'
import { usePathname } from 'next/navigation'
import Lenis from 'lenis'
import 'lenis/dist/lenis.css'
import { LENIS_DURATION, prefersReducedMotion } from './config'
import { gsap, registerGsap, ScrollTrigger } from './gsap'

// GSAP's default lag smoothing, restored when Lenis unmounts.
const DEFAULT_LAG_THRESHOLD = 500
const DEFAULT_LAG_ADJUSTED = 33

// Lenis smooth scrolling driven by GSAP's ticker so ScrollTrigger and Lenis share one clock.
// Disabled entirely for visitors who prefer reduced motion (native scrolling instead).
export function SmoothScroll() {
  const pathname = usePathname()
  const lenisRef = useRef<Lenis | null>(null)
  const lastPathname = useRef(pathname)
  const isHistoryNavigation = useRef(false)

  // Back/forward should keep the browser's restored scroll position.
  useEffect(() => {
    const onPopState = () => (isHistoryNavigation.current = true)
    window.addEventListener('popstate', onPopState)
    return () => window.removeEventListener('popstate', onPopState)
  }, [])

  useEffect(() => {
    if (prefersReducedMotion()) return
    registerGsap()

    const lenis = new Lenis({
      duration: LENIS_DURATION,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      autoRaf: false,
      anchors: true,
    })
    lenis.on('scroll', ScrollTrigger.update)
    lenisRef.current = lenis

    const tick = (time: number) => lenis.raf(time * 1000)
    gsap.ticker.add(tick)
    gsap.ticker.lagSmoothing(0)

    return () => {
      gsap.ticker.remove(tick)
      gsap.ticker.lagSmoothing(DEFAULT_LAG_THRESHOLD, DEFAULT_LAG_ADJUSTED)
      lenis.destroy()
      lenisRef.current = null
    }
  }, [])

  // Next resets scroll on link navigation, but an in-flight Lenis scroll would pull the new page back down.
  useEffect(() => {
    if (pathname === lastPathname.current) return
    lastPathname.current = pathname
    const fromHistory = isHistoryNavigation.current
    isHistoryNavigation.current = false
    if (!fromHistory && !window.location.hash) lenisRef.current?.scrollTo(0, { immediate: true, force: true })
  }, [pathname])

  return null
}
