import { cn } from '@/lib/utils'

type SectionProps = {
  children: React.ReactNode
  id?: string
  className?: string
  /** Render a diagonal hatch band after the section (05-theme §3.1). */
  hatchAfter?: boolean
  'aria-labelledby'?: string
}

function PlusMarker({ className }: { className: string }) {
  return <span aria-hidden="true" className={cn('plus-marker absolute z-[2]', className)} />
}

// A framed section: top rule, "+" crosshairs where the rule meets the rails, optional hatch spacer below.
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
        <PlusMarker className="-top-2 -left-2" />
        <PlusMarker className="-top-2 -right-2" />
        {children}
      </section>
      {hatchAfter && (
        <div aria-hidden="true" className="hatch-band relative h-16 border-t border-line">
          <PlusMarker className="-bottom-2 -left-2" />
          <PlusMarker className="-bottom-2 -right-2" />
        </div>
      )}
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
