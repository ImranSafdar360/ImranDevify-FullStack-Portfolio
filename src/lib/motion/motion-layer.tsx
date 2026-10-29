'use client'

import dynamic from 'next/dynamic'
import { useEffect, useState } from 'react'

const SmoothScroll = dynamic(() => import('./smooth-scroll').then((m) => m.SmoothScroll), { ssr: false })
const AnimEngine = dynamic(() => import('./anim-engine').then((m) => m.AnimEngine), { ssr: false })

// GSAP + Lenis load once the browser is idle, so they never compete with the first paint.
// Safe because reveals only target content below the fold at init.
export function MotionLayer() {
  const [ready, setReady] = useState(false)

  useEffect(() => {
    if ('requestIdleCallback' in window) {
      const id = window.requestIdleCallback(() => setReady(true), { timeout: 1500 })
      return () => window.cancelIdleCallback(id)
    }
    const id = setTimeout(() => setReady(true), 200)
    return () => clearTimeout(id)
  }, [])

  if (!ready) return null
  return (
    <>
      <SmoothScroll />
      <AnimEngine />
    </>
  )
}
