'use client'

import { usePathname } from 'next/navigation'
import { useEffect, useRef, useState, useSyncExternalStore } from 'react'
import { AppLink } from '@/components/ui/app-link'
import { Divider } from '@/components/ui/divider'
import { AboutIcon, ContactIcon, LogoMark, ResumeIcon, WorkIcon } from '@/components/ui/icons'
import { SurfaceButton } from '@/components/ui/surface-button'
import { SITE } from '@/lib/site'
import { cn } from '@/lib/utils'

// macOS-dock magnification: each icon scales by how close the cursor is, with a lift so it rises out of the bar.
const MAX_SCALE = 1.5
const LIFT_PX = 9
const SIGMA = 72 // falloff width in px; wider = more neighbours react
const SCROLL_AT = 120 // px scrolled before the dock collapses to its chip

const NAV_ICONS: Record<string, React.ReactNode> = {
  '/work': <WorkIcon />,
  '/about': <AboutIcon />,
  '/contact': <ContactIcon />,
}

function subscribeScroll(onChange: () => void) {
  window.addEventListener('scroll', onChange, { passive: true })
  return () => window.removeEventListener('scroll', onChange)
}

const FINE_POINTER = '(pointer: fine)'
function subscribeFine(onChange: () => void) {
  const query = window.matchMedia(FINE_POINTER)
  query.addEventListener('change', onChange)
  return () => query.removeEventListener('change', onChange)
}

type DockProps = {
  resumeHref: string
}

// Bottom-centre dock (replaces the morphing top nav): logo · divider · icon links · divider · one CTA.
// At the top it is the full dock; once scrolled it collapses to a chip (logo + loader-wave dots) and expands
// again at the top, or on hover/focus so the links stay reachable. Reusable Divider + AppLink do the structure.
export function Dock({ resumeHref }: DockProps) {
  const pathname = usePathname()
  const rowRef = useRef<HTMLDivElement>(null)
  const magnifies = useRef(false)
  const frame = useRef<number | null>(null)
  const lastX = useRef(0)

  const [hovered, setHovered] = useState(false)
  const [focused, setFocused] = useState(false)
  // Collapse-on-scroll and magnify only with a fine pointer (touch keeps the full dock, which has no hover to reveal it).
  const fine = useSyncExternalStore(subscribeFine, () => window.matchMedia(FINE_POINTER).matches, () => false)
  const scrolled = useSyncExternalStore(subscribeScroll, () => window.scrollY > SCROLL_AT, () => false)

  useEffect(() => {
    magnifies.current = fine && !window.matchMedia('(prefers-reduced-motion: reduce)').matches
  }, [fine])

  useEffect(() => () => {
    if (frame.current != null) cancelAnimationFrame(frame.current)
  }, [])

  const expanded = !fine || !scrolled || hovered || focused

  function apply(clientX: number) {
    rowRef.current?.querySelectorAll<HTMLElement>('[data-dock-item]').forEach((el) => {
      const rect = el.getBoundingClientRect()
      const distance = clientX - (rect.left + rect.width / 2)
      const scale = 1 + (MAX_SCALE - 1) * Math.exp(-(distance * distance) / (2 * SIGMA * SIGMA))
      const lift = (LIFT_PX * (scale - 1)) / (MAX_SCALE - 1)
      el.style.transform = `translateY(${-lift}px) scale(${scale})`
    })
  }

  function onPointerMove(event: React.PointerEvent) {
    if (!magnifies.current || event.pointerType !== 'mouse') return
    lastX.current = event.clientX
    if (frame.current != null) return
    frame.current = requestAnimationFrame(() => {
      frame.current = null
      apply(lastX.current)
    })
  }

  function resetMagnify() {
    if (frame.current != null) {
      cancelAnimationFrame(frame.current)
      frame.current = null
    }
    rowRef.current?.querySelectorAll<HTMLElement>('[data-dock-item]').forEach((el) => {
      el.style.transform = ''
    })
  }

  const isActive = (href: string) => pathname === href || pathname.startsWith(`${href}/`)

  return (
    <nav aria-label="Main" className="pointer-events-none fixed inset-x-0 bottom-4 z-50 flex justify-center px-4 md:bottom-5">
      <div
        className="pointer-events-auto grid animate-dock-in place-items-center motion-reduce:animate-none"
        onPointerEnter={(e) => e.pointerType === 'mouse' && setHovered(true)}
        onPointerLeave={(e) => {
          if (e.pointerType === 'mouse') setHovered(false)
          resetMagnify()
        }}
        onFocusCapture={() => setFocused(true)}
        onBlur={(e) => !e.currentTarget.contains(e.relatedTarget) && setFocused(false)}
      >
        {/* Full dock — always in the DOM and reachable (focus re-expands it); only hidden visually when collapsed. */}
        <div
          ref={rowRef}
          onPointerMove={onPointerMove}
          data-show={expanded}
          className={cn(
            'col-start-1 row-start-1 flex items-end gap-1 rounded-[20px] border border-line/70 px-2 py-2',
            'bg-[color-mix(in_srgb,var(--bg)_60%,transparent)] shadow-[0_14px_40px_-14px_rgb(0_0_0/0.7)] backdrop-blur-xl',
            'transition-[opacity,transform,filter] duration-[280ms] ease-ui data-[show=false]:pointer-events-none data-[show=false]:scale-95 data-[show=false]:opacity-0 data-[show=false]:blur-[6px]',
          )}
        >
          <AppLink
            href="/"
            label="Home"
            icon={<LogoMark />}
            iconOnly
            magnify
            active={pathname === '/'}
            className="h-11 w-11 justify-center rounded-xl"
          />

          <Divider orientation="vertical" className="mx-1 self-center" />

          <ul className="m-0 flex list-none items-end gap-1 p-0">
            {SITE.nav.map((item) => (
              <li key={item.href} className="relative">
                <AppLink
                  href={item.href}
                  label={item.label}
                  icon={NAV_ICONS[item.href]}
                  iconOnly
                  magnify
                  active={isActive(item.href)}
                  className="h-11 w-11 justify-center rounded-xl"
                />
                {isActive(item.href) && (
                  <span aria-hidden="true" className="absolute inset-x-0 -bottom-0.5 mx-auto size-1 rounded-full bg-accent" />
                )}
              </li>
            ))}
          </ul>

          <Divider orientation="vertical" className="mx-1 self-center" />

          <SurfaceButton
            href={resumeHref}
            variant="primary"
            icon={<ResumeIcon className="size-[1.05em]" />}
            iconPosition="left"
            className="h-11 rounded-xl px-3.5 text-[0.85rem]"
          >
            Résumé
          </SurfaceButton>
        </div>

        {/* Collapsed chip — decorative (the real links above stay in the a11y tree); shown only while scrolled. */}
        <div
          aria-hidden="true"
          data-show={!expanded}
          className={cn(
            'col-start-1 row-start-1 flex items-center gap-3 rounded-[18px] border border-line/70 py-2.5 pr-4 pl-2.5',
            'bg-[color-mix(in_srgb,var(--bg)_60%,transparent)] shadow-[0_14px_40px_-14px_rgb(0_0_0/0.7)] backdrop-blur-xl',
            'transition-[opacity,transform,filter] duration-[280ms] ease-ui data-[show=false]:pointer-events-none data-[show=false]:scale-95 data-[show=false]:opacity-0 data-[show=false]:blur-[6px]',
          )}
        >
          <LogoMark />
          <span className="flex items-center gap-1">
            {[0, 160, 320].map((delay) => (
              <i
                key={delay}
                style={{ animationDelay: `${delay}ms` }}
                className="size-1.5 rounded-full bg-text-2 animate-dock-dot motion-reduce:animate-none"
              />
            ))}
          </span>
        </div>
      </div>
    </nav>
  )
}
