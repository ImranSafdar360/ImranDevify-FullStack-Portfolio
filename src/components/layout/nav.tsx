'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { useEffect, useRef, useState, useSyncExternalStore } from 'react'
import { Button } from '@/components/ui/button'
import { SITE } from '@/lib/site'
import { cn } from '@/lib/utils'
import { LiveClock } from './live-clock'

const CHIP_AFTER_PX = 140
const COMPACT_QUERY = '(max-width: 899px)'

function subscribeScroll(onChange: () => void) {
  window.addEventListener('scroll', onChange, { passive: true })
  return () => window.removeEventListener('scroll', onChange)
}

function subscribeCompact(onChange: () => void) {
  const query = window.matchMedia(COMPACT_QUERY)
  query.addEventListener('change', onChange)
  return () => query.removeEventListener('change', onChange)
}

// The bar's items arrive after the shell has mostly grown; menu items right as it opens.
const BAR_TIMING = { after: 220, step: 45 }
const MENU_TIMING = { after: 90, step: 35 }

type NavState = 'full' | 'chip' | 'open'
type OpenedBy = 'hover' | 'click' | null

/**
 * Choreography for one piece of nav content (Emil Kowalski's rules: strong ease-out, blur to bridge crossfades,
 * fast exits, staggered entrances). Hidden content leaves in 150ms with no delay; visible content arrives after the
 * shell has started morphing, `step` ms apart. Reduced motion is handled in base.css via [data-nav-anim].
 */
function reveal(visible: boolean, index: number, { after, step }: { after: number; step: number }) {
  return {
    className: cn(
      'transition-[opacity,translate,scale,filter] ease-out-strong',
      visible ? 'opacity-100 translate-y-0 scale-100 blur-[0px] duration-[320ms]' : 'opacity-0 -translate-y-1 scale-[0.96] blur-[3px] duration-150',
    ),
    style: { transitionDelay: visible ? `${after + index * step}ms` : '0ms' },
  }
}

// Morphing nav (05-theme §5): full bar at the top → "Imran ···" chip after scrolling (always a chip below 900px)
// → expands downward on hover, click/tap, or Enter. Escape closes and returns focus to the chip.
// Small screens get the chip from CSS too (max-[899px]: variants), so there is no full-bar flash before hydration.
export function Nav() {
  const pathname = usePathname()
  const scrolled = useSyncExternalStore(subscribeScroll, () => window.scrollY > CHIP_AFTER_PX, () => false)
  const compact = useSyncExternalStore(subscribeCompact, () => window.matchMedia(COMPACT_QUERY).matches, () => false)
  const [openedBy, setOpenedBy] = useState<OpenedBy>(null)
  const chipRef = useRef<HTMLButtonElement>(null)
  const barRef = useRef<HTMLDivElement>(null)

  const isChip = scrolled || compact
  // Back at the full bar, a previously opened menu must not reappear on the next scroll down.
  if (!isChip && openedBy) setOpenedBy(null)
  const expanded = isChip && openedBy !== null
  const state: NavState = expanded ? 'open' : isChip ? 'chip' : 'full'

  // Remember the previous state so each transition gets its own timing (morph 520ms, open 340ms, close 260ms).
  const [transition, setTransition] = useState<{ to: NavState; from: NavState }>({ to: state, from: state })
  if (transition.to !== state) setTransition({ to: state, from: transition.to })

  // When the bar turns into the chip, its links become inert; keep keyboard focus instead of dropping it on <body>.
  useEffect(() => {
    if (isChip && barRef.current?.contains(document.activeElement)) chipRef.current?.focus()
  }, [isChip])

  const linkCurrent = (href: string) => (pathname === href || pathname.startsWith(`${href}/`) ? 'page' : undefined)
  const showBar = !isChip
  const chipHiddenBeforeHydration = 'max-[899px]:opacity-100 max-[899px]:translate-none max-[899px]:scale-100 max-[899px]:blur-[0px]'
  const barLogo = reveal(showBar, 0, BAR_TIMING)
  const barCta = reveal(showBar, SITE.nav.length + 1, BAR_TIMING)
  const menuClock = reveal(expanded, SITE.nav.length + 2, MENU_TIMING)

  return (
    <nav
      aria-label="Main"
      data-nav-shell=""
      data-state={state}
      data-from={transition.from}
      onPointerEnter={(e) => e.pointerType === 'mouse' && isChip && !openedBy && setOpenedBy('hover')}
      // Only a hover-opened menu closes on pointer leave; one opened by click or keyboard stays until blur/Escape.
      onPointerLeave={(e) => e.pointerType === 'mouse' && openedBy === 'hover' && setOpenedBy(null)}
      onBlur={(e) => !e.currentTarget.contains(e.relatedTarget) && setOpenedBy(null)}
      onKeyDown={(e) => {
        if (e.key === 'Escape' && expanded) {
          setOpenedBy(null)
          chipRef.current?.focus()
        }
      }}
      className={cn(
        'fixed top-3.5 left-1/2 z-[80] -translate-x-1/2 overflow-hidden border border-line backdrop-blur-md',
        'transition-[width,height,border-radius,background-color] duration-[520ms] ease-drawer data-[state=open]:duration-[340ms] data-[from=open]:duration-[260ms]',
        state === 'full' &&
          'h-[60px] w-[var(--frame)] rounded-[14px] bg-[color-mix(in_srgb,var(--bg)_82%,transparent)] max-[899px]:h-[52px] max-[899px]:w-[236px] max-[899px]:rounded-[26px]',
        state === 'chip' && 'h-[52px] w-[236px] rounded-[26px] bg-[color-mix(in_srgb,var(--bg)_82%,transparent)]',
        state === 'open' && 'h-[318px] w-[260px] rounded-[22px] bg-[color-mix(in_srgb,var(--bg)_96%,transparent)]',
      )}
    >
      {/* Full bar */}
      <div
        ref={barRef}
        inert={isChip}
        className={cn(
          'absolute inset-0 grid grid-cols-[1fr_auto_1fr] items-center px-[18px]',
          isChip ? 'pointer-events-none' : 'max-[899px]:pointer-events-none max-[899px]:opacity-0',
        )}
      >
        <Link
          href="/"
          data-nav-anim=""
          style={barLogo.style}
          className={cn(barLogo.className, 'font-display text-[1.35rem] font-bold uppercase tracking-[-0.04em] text-text no-underline')}
        >
          {SITE.shortName}
        </Link>
        <ul className="m-0 flex list-none gap-7 p-0 text-[0.95rem]">
          {SITE.nav.map((item, i) => {
            const anim = reveal(showBar, i + 1, BAR_TIMING)
            return (
              <li key={item.href} data-nav-anim="" className={anim.className} style={anim.style}>
                <Link
                  href={item.href}
                  aria-current={linkCurrent(item.href)}
                  className="text-text-2 no-underline transition-colors hover:text-text aria-[current=page]:text-text"
                >
                  {item.label}
                </Link>
              </li>
            )
          })}
        </ul>
        <div data-nav-anim="" style={barCta.style} className={cn(barCta.className, 'justify-self-end')}>
          <Button href={SITE.links.resume} className="h-10">
            Download resume
          </Button>
        </div>
      </div>

      {/* Chip */}
      <button
        ref={chipRef}
        type="button"
        inert={!isChip}
        aria-expanded={expanded}
        aria-controls="nav-menu"
        onClick={(e) => {
          // A mouse click on a hover-opened chip keeps it open (it would otherwise toggle shut under the cursor).
          // Keyboard (detail 0) and touch toggle.
          const isMouseClick = e.detail > 0 && openedBy === 'hover'
          setOpenedBy(isMouseClick ? 'click' : expanded ? null : 'click')
        }}
        className={cn(
          'absolute inset-x-0 top-0 flex h-[50px] cursor-pointer items-center gap-2.5 border-0 bg-transparent pr-4 pl-[7px] text-left text-text',
          'transition-transform duration-150 ease-out-strong active:scale-[0.97]',
          !isChip && 'pointer-events-none',
        )}
      >
        <span
          aria-hidden="true"
          data-nav-anim=""
          style={{ transitionDelay: isChip ? '160ms' : '0ms' }}
          className={cn(
            'grid size-[38px] flex-none place-items-center rounded-full bg-accent text-[0.85rem] font-bold text-accent-ink',
            'transition-[opacity,scale,filter] ease-out-strong',
            isChip ? 'opacity-100 scale-100 blur-[0px] duration-[320ms]' : cn('opacity-0 scale-[0.6] blur-[3px] duration-150', chipHiddenBeforeHydration),
          )}
        >
          IS
        </span>
        <b
          data-nav-anim=""
          style={{ transitionDelay: isChip ? '210ms' : '0ms' }}
          className={cn(
            'font-semibold transition-[opacity,translate,filter] ease-out-strong',
            isChip ? 'opacity-100 translate-x-0 blur-[0px] duration-[320ms]' : cn('opacity-0 -translate-x-1.5 blur-[3px] duration-150', chipHiddenBeforeHydration),
          )}
        >
          {SITE.shortName}
        </b>
        <span className="sr-only">{expanded ? 'Close menu' : 'Open menu'}</span>

        {/* Three dots that rotate into a close "×" when the menu opens */}
        <span
          aria-hidden="true"
          data-nav-anim=""
          style={{ transitionDelay: isChip ? '260ms' : '0ms' }}
          className={cn(
            'relative ml-auto grid size-5 place-items-center transition-opacity ease-out-strong',
            isChip ? 'opacity-100 duration-[320ms]' : cn('opacity-0 duration-150', 'max-[899px]:opacity-100'),
          )}
        >
          <span
            data-nav-anim=""
            className={cn('flex gap-1 transition-[opacity,scale] duration-200 ease-out-strong', expanded ? 'opacity-0 scale-50' : 'opacity-100 scale-100')}
          >
            {[0, 160, 320].map((delay) => (
              <i
                key={delay}
                style={{ animationDelay: `${delay}ms` }}
                className={cn('size-[6px] rounded-full bg-text-2 animate-nav-dot motion-reduce:animate-none', expanded && '[animation-play-state:paused]')}
              />
            ))}
          </span>
          {[45, -45].map((angle) => (
            <i
              key={angle}
              style={{ rotate: expanded ? `${angle}deg` : '0deg' }}
              className={cn(
                'absolute h-[1.5px] w-3.5 rounded-full bg-text transition-[opacity,rotate] duration-[280ms] ease-out-strong motion-reduce:transition-none',
                expanded ? 'opacity-100 delay-100' : 'opacity-0',
              )}
            />
          ))}
        </span>
      </button>

      {/* Expanded menu */}
      <div id="nav-menu" inert={!expanded} className={cn('absolute inset-x-0 top-14 grid gap-1 px-4 pb-4', !expanded && 'pointer-events-none')}>
        <ul className="m-0 grid list-none gap-0 p-0">
          {SITE.nav.map((item, i) => {
            const anim = reveal(expanded, i, MENU_TIMING)
            return (
              <li key={item.href} data-nav-anim="" className={anim.className} style={anim.style}>
                <Link
                  href={item.href}
                  aria-current={linkCurrent(item.href)}
                  onClick={() => setOpenedBy(null)}
                  className="block border-t border-line px-1 py-2 text-[0.95rem] text-text no-underline hover:text-accent-hover aria-[current=page]:text-accent-hover"
                >
                  {item.label}
                </Link>
              </li>
            )
          })}
          {[
            { href: SITE.links.resume, label: 'Download resume' },
            { href: `mailto:${SITE.emails.hiring}`, label: 'Email me' },
          ].map((item, i) => {
            const anim = reveal(expanded, SITE.nav.length + i, MENU_TIMING)
            return (
              <li key={item.label} data-nav-anim="" className={anim.className} style={anim.style}>
                <a href={item.href} className="block border-t border-line px-1 py-2 text-[0.95rem] text-text no-underline hover:text-accent-hover">
                  {item.label}
                </a>
              </li>
            )
          })}
        </ul>
        <p data-nav-anim="" style={menuClock.style} className={cn(menuClock.className, 'm-0 pt-2 font-mono text-[0.72rem] uppercase text-text-3')}>
          Lahore · <LiveClock timeZone={SITE.timeZone} />
        </p>
      </div>
    </nav>
  )
}
