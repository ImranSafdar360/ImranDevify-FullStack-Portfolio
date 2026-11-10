'use client'

import { useCallback, useEffect, useLayoutEffect, useRef, useState } from 'react'
import { cn } from '@/lib/utils'

const pad = (n: number) => String(n).padStart(2, '0')
const CYCLE_MS = 2800
const GAP = 12 // px between the text and the bracket frame
const CORNERS = [
  'border-t-2 border-l-2', // top-left
  'border-t-2 border-r-2', // top-right
  'border-b-2 border-l-2', // bottom-left
  'border-b-2 border-r-2', // bottom-right
] as const
const SIZE = 16 // corner bracket size in px (Tailwind size-4)

type StatementSpecProps = {
  id: string
  lines: string[]
  notes?: string[]
  accentLine?: number
}

// The capabilities intro as an annotated spec table (04 §1 "Annotated Blueprint": every annotation points at
// evidence). Each line is a ruled row: index, the line, a dashed leader, then the fact that backs it. An accent
// corner-bracket frame travels between the lines (idea from React Bits' TrueFocus, rebuilt without `motion`: CSS
// transitions on translate only); it cycles while on screen and holds on hover. Reduced motion: frame rests on
// `accentLine`. The <h2> holds the real text; indices, leaders and the outline copies are decorative.
export function StatementSpec({ id, lines, notes, accentLine = lines.length - 1 }: StatementSpecProps) {
  const [focus, setFocus] = useState(accentLine)
  const wrap = useRef<HTMLDivElement>(null)
  const texts = useRef<(HTMLSpanElement | null)[]>([])
  const corners = useRef<(HTMLSpanElement | null)[]>([])
  const held = useRef(false)
  const placed = useRef(false)

  // Place the four brackets around the focused line (transform only; no React re-render per move).
  const place = useCallback(() => {
    const box = wrap.current?.getBoundingClientRect()
    const text = texts.current[focus]?.getBoundingClientRect()
    if (!box || !text) return
    const x = text.left - box.left - GAP
    const y = text.top - box.top - GAP / 2
    const w = text.width + GAP * 2
    const h = text.height + GAP
    const spots = [
      [x, y],
      [x + w - SIZE, y],
      [x, y + h - SIZE],
      [x + w - SIZE, y + h - SIZE],
    ]
    const first = !placed.current
    corners.current.forEach((corner, i) => {
      if (!corner) return
      // The first placement snaps (no fly-in from the table's corner); later moves glide.
      if (first) corner.style.transition = 'none'
      corner.style.translate = `${spots[i][0]}px ${spots[i][1]}px`
      corner.style.opacity = '1'
      if (first) {
        void corner.offsetWidth // commit the jump before transitions come back
        corner.style.transition = ''
      }
    })
    placed.current = true
  }, [focus])

  useLayoutEffect(() => {
    place()
    const box = wrap.current
    if (!box || typeof ResizeObserver === 'undefined') return
    const observer = new ResizeObserver(place)
    observer.observe(box)
    return () => observer.disconnect()
  }, [place])

  // Cycle through the lines only while the table is on screen, never with reduced motion.
  useEffect(() => {
    const box = wrap.current
    if (!box || lines.length < 2 || window.matchMedia('(prefers-reduced-motion: reduce)').matches) return
    let timer: number | undefined
    const observer = new IntersectionObserver(
      ([entry]) => {
        window.clearInterval(timer)
        if (!entry.isIntersecting) return
        timer = window.setInterval(() => {
          if (!held.current) setFocus((current) => (current + 1) % lines.length)
        }, CYCLE_MS)
      },
      { threshold: 0.35 },
    )
    observer.observe(box)
    return () => {
      observer.disconnect()
      window.clearInterval(timer)
    }
  }, [lines.length])

  const hold = (index: number) => {
    held.current = true
    setFocus(index)
  }

  return (
    <div
      ref={wrap}
      onPointerLeave={() => {
        held.current = false
      }}
      className="relative grid text-[clamp(2.15rem,5.2vw,4.6rem)] lg:grid-cols-[minmax(0,1fr)_minmax(0,22rem)]"
    >
      <h2 id={id} data-anim="outline" className="m-0 font-display font-bold uppercase leading-none tracking-[-0.04em]">
        {lines.map((line, i) => (
          <span
            key={line}
            data-focus={focus === i}
            onPointerEnter={() => hold(i)}
            className="flex items-center gap-[0.32em] border-b border-line py-[0.34em] first:border-t lg:h-[1.5em] lg:py-0"
          >
            <span
              aria-hidden="true"
              className={cn(
                'w-7 shrink-0 font-mono text-[0.75rem] font-normal tracking-[0.02em] transition-colors duration-300',
                focus === i ? 'text-accent' : 'text-text-3',
              )}
            >
              {pad(i + 1)}
            </span>
            <span
              ref={(el) => {
                texts.current[i] = el
              }}
              data-line
              className={cn('relative block w-fit transition-colors duration-300', focus === i ? 'text-text' : 'text-text-4')}
            >
              <span data-fill className="block">
                {line}
              </span>
              <span data-outline aria-hidden="true" className="outline-copy">
                {line}
              </span>
            </span>
            <span
              aria-hidden="true"
              className={cn(
                'mx-[0.3em] hidden h-0 flex-1 border-t border-dashed transition-colors duration-300 lg:block',
                focus === i ? 'border-accent' : 'border-line-strong',
              )}
            />
          </span>
        ))}
      </h2>

      {notes && notes.length > 0 && (
        <ol className="m-0 mt-6 list-none p-0 lg:mt-0">
          {notes.map((note, i) => (
            <li
              key={note}
              onPointerEnter={() => hold(i)}
              className="flex items-center gap-3 border-b border-line py-3 first:border-t lg:h-[1.5em] lg:py-0"
            >
              <span
                className={cn(
                  'w-7 shrink-0 font-mono text-[0.75rem] tracking-[0.02em] transition-colors duration-300',
                  focus === i ? 'text-accent' : 'text-text-3',
                )}
              >
                {pad(i + 1)}
              </span>
              <span
                className={cn(
                  'text-[0.95rem] leading-[1.45] transition-colors duration-300',
                  focus === i ? 'text-text-2' : 'text-text-3',
                )}
              >
                {note}
              </span>
            </li>
          ))}
        </ol>
      )}

      {/* The travelling focus frame: accent brackets, like the hero's letter selection and the section dividers. */}
      {CORNERS.map((border, i) => (
        <span
          key={border}
          ref={(el) => {
            corners.current[i] = el
          }}
          aria-hidden="true"
          className={cn(
            'pointer-events-none absolute top-0 left-0 size-4 border-accent opacity-0',
            'transition-[translate,opacity] duration-500 ease-ui motion-reduce:transition-none',
            border,
          )}
        />
      ))}
    </div>
  )
}
