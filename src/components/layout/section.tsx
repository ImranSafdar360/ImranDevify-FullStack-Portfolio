import { cn } from '@/lib/utils'

type SectionProps = {
  children: React.ReactNode
  id?: string
  className?: string
  /** Render a <SectionDivider /> straight after the section (shortcut for the standalone component). */
  hatchAfter?: boolean
  'aria-labelledby'?: string
}

// L-shaped corner bracket. Each corner shows two legs of a box (the two borders), framing the divider's corner.
const BRACKETS = {
  tl: 'top-0 left-0 border-t-2 border-l-2',
  tr: 'top-0 right-0 border-t-2 border-r-2',
  bl: 'bottom-0 left-0 border-b-2 border-l-2',
  br: 'bottom-0 right-0 border-b-2 border-r-2',
} as const

// Reusable: also frames the active capability row (accent, like the hero wordmark's letter selection).
export function CornerBracket({ at, className }: { at: keyof typeof BRACKETS; className?: string }) {
  return <span aria-hidden="true" className={cn('pointer-events-none absolute size-3.5 border-text-3', BRACKETS[at], className)} />
}

// Reusable spacer placed after a section: a diagonal hatch band framed by a corner bracket at each of its four
// corners (05-theme §3.1, bracket variant). Decorative, so it is hidden from assistive tech.
export function SectionDivider({ className }: { className?: string }) {
  return (
    <div aria-hidden="true" className={cn('hatch-band relative h-[clamp(64px,8vw,96px)]', className)}>
      <CornerBracket at="tl" />
      <CornerBracket at="tr" />
      <CornerBracket at="bl" />
      <CornerBracket at="br" />
    </div>
  )
}

// A framed section: a top rule, and an optional divider below. Corner framing now lives on <SectionDivider />.
export function Section({ children, id, className, hatchAfter = false, 'aria-labelledby': labelledBy }: SectionProps) {
  return (
    <>
      <section
        id={id}
        aria-labelledby={labelledBy}
        className={cn(
          'relative border-t border-line px-[clamp(20px,4vw,56px)] py-[clamp(56px,8vw,120px)]',
          className,
        )}
      >
        {children}
      </section>
      {hatchAfter && <SectionDivider />}
    </>
  )
}

// Mono section label: "/ 01 / Selected work".
export function SectionLabel({ index, children, className }: { index: string; children: React.ReactNode; className?: string }) {
  return (
    <p className={cn('mb-5 flex gap-2 font-mono text-[0.78rem] uppercase tracking-[0.02em] text-text-3', className)}>
      <span className="text-text-2">/ {index} /</span>
      <span>{children}</span>
    </p>
  )
}
