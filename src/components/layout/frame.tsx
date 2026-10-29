import { cn } from '@/lib/utils'

// The framed grid (05-theme §3.1): content column capped at 1320px with dashed rails on both sides.
export function Frame({ children, className }: { children: React.ReactNode; className?: string }) {
  return <div className={cn('mx-auto w-[var(--frame)] border-x border-dashed border-line-strong', className)}>{children}</div>
}
