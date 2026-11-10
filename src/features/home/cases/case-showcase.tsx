'use client'

import { useEffect, useRef, useState } from 'react'
import { ArrowIcon } from '@/components/ui/icons'
import { SurfaceButton } from '@/components/ui/surface-button'
import { BezelCard } from '@/components/ui/surfaces'
import { cn } from '@/lib/utils'
import { caseFrame, caseProgressFor, caseSpan } from './case-timeline'

export type CaseItem = {
  slug: string
  title: string
  details: React.ReactNode
  image: React.ReactNode
  /** The frame shows a stand-in photo, not the real screenshot yet: say so on the frame. */
  placeholder: boolean
}

// Sits on the frame itself (not inside the drifting image), so it is never clipped.
function PlaceholderChip() {
  return (
    <span className="pointer-events-none absolute bottom-4 left-4 z-10 rounded-full border border-line-strong bg-bg/80 px-3 py-1 font-mono text-[0.7rem] uppercase tracking-[0.02em] text-text-2 backdrop-blur-sm">
      Placeholder image · screenshot coming
    </span>
  )
}

// The sticky stage only runs on wide screens without reduced motion; otherwise the stacked layout shows.
const STAGE_QUERY = '(min-width: 1024px) and (prefers-reduced-motion: no-preference)'
const DRIFT_REM = 4 // slow upward drift of every image across the whole stage

// Featured case studies (04 §3), behaviour modelled on the reference's pinned works carousel, built on our system:
// a native CSS-sticky stage (no JS pinning, so no pin jump after client navigation), a BezelCard of details on the
// left and an image frame on the right. Scrolling wipes each image away to reveal the next (scroll-linked, written
// straight to `translate` once per frame) and rolls the details over (an interruptible CSS transition). The project
// list is a tablist: arrow keys / click jump to a project. Phones and reduced motion get a plain stacked list.
export function CaseShowcase({ items, all }: { items: CaseItem[]; all: { label: string; href: string } }) {
  const count = items.length
  const [active, setActive] = useState(0)
  const activeRef = useRef(0)
  const track = useRef<HTMLDivElement>(null)
  const stage = useRef<HTMLDivElement>(null)
  const wipers = useRef<(HTMLDivElement | null)[]>([])
  const counters = useRef<(HTMLDivElement | null)[]>([])
  const drifts = useRef<(HTMLDivElement | null)[]>([])
  const fills = useRef<(HTMLSpanElement | null)[]>([])
  const tabs = useRef<(HTMLButtonElement | null)[]>([])

  const geometry = () => {
    const t = track.current
    const s = stage.current
    if (!t || !s) return null
    const top = parseFloat(getComputedStyle(s).top) || 0
    const rect = t.getBoundingClientRect()
    return { top, span: t.offsetHeight - s.offsetHeight, rectTop: rect.top, docTop: rect.top + window.scrollY }
  }

  useEffect(() => {
    const query = window.matchMedia(STAGE_QUERY)
    let frame = 0

    const paint = () => {
      frame = 0
      const g = geometry()
      if (!g || g.span <= 0) return
      const f = caseFrame((g.top - g.rectTop) / g.span, count)
      // Wipe: the frame slides up while its content slides down by the same amount, so the old image stays put
      // and is cut away from the bottom, revealing the next one underneath.
      f.wipes.forEach((w, k) => {
        const wiper = wipers.current[k]
        const counter = counters.current[k]
        if (wiper) wiper.style.translate = `0 ${-w * 100}%`
        if (counter) counter.style.translate = `0 ${w * 100}%`
      })
      for (const drift of drifts.current) if (drift) drift.style.translate = `0 ${-f.progress * DRIFT_REM}rem`
      fills.current.forEach((fill, i) => {
        if (fill) fill.style.scale = `1 ${f.fills[i]}`
      })
      if (f.active !== activeRef.current) {
        activeRef.current = f.active
        setActive(f.active)
      }
    }
    const schedule = () => {
      if (!frame) frame = requestAnimationFrame(paint)
    }
    const start = () => {
      window.removeEventListener('scroll', schedule)
      window.removeEventListener('resize', schedule)
      if (!query.matches) return
      window.addEventListener('scroll', schedule, { passive: true })
      window.addEventListener('resize', schedule)
      schedule()
    }

    start()
    query.addEventListener('change', start)
    return () => {
      cancelAnimationFrame(frame)
      query.removeEventListener('change', start)
      window.removeEventListener('scroll', schedule)
      window.removeEventListener('resize', schedule)
    }
  }, [count])

  // Jump so that project `index` sits fully revealed and at rest.
  const jump = (index: number) => {
    const g = geometry()
    if (!g) return
    window.scrollTo({ top: g.docTop - g.top + caseProgressFor(index, count) * g.span, behavior: 'smooth' })
  }

  const onTabKey = (event: React.KeyboardEvent, index: number) => {
    const step = { ArrowDown: 1, ArrowRight: 1, ArrowUp: -1, ArrowLeft: -1 }[event.key]
    const target = step ? (index + step + count) % count : event.key === 'Home' ? 0 : event.key === 'End' ? count - 1 : null
    if (target === null) return
    event.preventDefault()
    tabs.current[target]?.focus()
    jump(target)
  }

  return (
    <>
      {/* Desktop: the sticky stage. */}
      <div
        ref={track}
        className="relative mt-[clamp(28px,4vw,48px)] hidden [--case-h:min(46rem,calc(100svh-8.5rem))] lg:block motion-reduce:lg:hidden"
        style={{ height: `calc(var(--case-h) + ${caseSpan(count) * 100}svh)` }}
      >
        <div ref={stage} className="sticky top-8 grid h-(--case-h) grid-cols-[minmax(0,0.85fr)_minmax(0,1.15fr)] gap-3">
          <BezelCard className="h-full">
            <div className="flex h-full flex-col">
              <div className="flex items-start justify-between gap-4">
                <div role="tablist" aria-label="Featured case studies" aria-orientation="vertical" className="flex flex-col gap-2">
                  {items.map((item, i) => (
                    <button
                      key={item.slug}
                      ref={(el) => {
                        tabs.current[i] = el
                      }}
                      type="button"
                      role="tab"
                      id={`case-tab-${item.slug}`}
                      aria-selected={active === i}
                      aria-controls={`case-panel-${item.slug}`}
                      tabIndex={active === i ? 0 : -1}
                      onClick={() => jump(i)}
                      onKeyDown={(event) => onTabKey(event, i)}
                      className={cn(
                        'group flex cursor-pointer items-center gap-3 bg-transparent p-0 text-left font-display text-[1.3rem] font-bold uppercase leading-none tracking-[-0.01em] transition-colors duration-300',
                        active === i ? 'text-text' : 'text-text-4 hover:text-text-3',
                      )}
                    >
                      {/* Progress line: fills while this project owns the scroll. */}
                      <span aria-hidden="true" className="relative h-[1.05em] w-0.5 overflow-hidden rounded-full bg-line">
                        <span
                          ref={(el) => {
                            fills.current[i] = el
                          }}
                          className="absolute inset-0 origin-top scale-y-0 bg-accent"
                        />
                      </span>
                      {item.title}
                    </button>
                  ))}
                </div>
                <SurfaceButton href={all.href} variant="ghost" size="sm" icon={<ArrowIcon className="size-[1.05em]" />}>
                  {all.label}
                </SurfaceButton>
              </div>

              {/* Odometer: every project's details stacked in one clipped slot; they roll up as the stage advances. */}
              <div className="mt-auto grid overflow-hidden">
                {items.map((item, i) => (
                  <div
                    key={item.slug}
                    id={`case-panel-${item.slug}`}
                    role="tabpanel"
                    aria-labelledby={`case-tab-${item.slug}`}
                    aria-hidden={active !== i}
                    inert={active !== i}
                    className="col-start-1 row-start-1 self-end transition-[translate,opacity] duration-700 ease-out-strong"
                    style={{ translate: `0 ${i < active ? -105 : i > active ? 105 : 0}%`, opacity: i === active ? 1 : 0 }}
                  >
                    {item.details}
                  </div>
                ))}
              </div>
            </div>
          </BezelCard>

          {/* Image frame: the first project on top; each wipes away to reveal the next. */}
          <div aria-hidden="true" className="relative overflow-hidden rounded-card border border-line bg-surface-2">
            {items.map((item, i) => (
              <div
                key={item.slug}
                ref={(el) => {
                  wipers.current[i] = el
                }}
                className="absolute inset-0 overflow-hidden"
                style={{ zIndex: count - i }}
              >
                <div
                  ref={(el) => {
                    counters.current[i] = el
                  }}
                  className="absolute inset-0"
                >
                  <div
                    ref={(el) => {
                      drifts.current[i] = el
                    }}
                    className="absolute inset-x-0 top-0 h-[calc(100%+4rem)]"
                  >
                    {item.image}
                  </div>
                </div>
              </div>
            ))}
            {items[active]?.placeholder && <PlaceholderChip />}
          </div>
        </div>
      </div>

      {/* Phones and reduced motion: the same projects as a plain stacked list. */}
      <ol className="m-0 mt-[clamp(28px,4vw,48px)] flex list-none flex-col gap-4 p-0 lg:hidden motion-reduce:lg:flex">
        {items.map((item) => (
          <li key={item.slug} className="flex flex-col gap-3">
            <div aria-hidden="true" className="relative aspect-[16/10] overflow-hidden rounded-card border border-line bg-surface-2">
              {item.image}
              {item.placeholder && <PlaceholderChip />}
            </div>
            <BezelCard>{item.details}</BezelCard>
          </li>
        ))}
        <li>
          <SurfaceButton href={all.href} variant="ghost" icon={<ArrowIcon className="size-[1.05em]" />}>
            {all.label}
          </SurfaceButton>
        </li>
      </ol>
    </>
  )
}
