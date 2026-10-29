import { cn } from '@/lib/utils'

// Stack tag (05-theme §5).
export function Pill({ children, className }: { children: React.ReactNode; className?: string }) {
  return (
    <span className={cn('inline-flex h-7 items-center rounded-full border border-line-strong px-3 text-[0.82rem] text-text-2', className)}>
      {children}
    </span>
  )
}

// Card with an inner card edge: outer bezel + nested radius (05-theme §5).
export function BezelCard({
  children,
  icon,
  className,
}: {
  children: React.ReactNode
  icon?: React.ReactNode
  className?: string
}) {
  return (
    <div className={cn('rounded-card border border-line bg-gradient-to-b from-surface-2 to-surface p-1.5', className)}>
      <div className="h-full rounded-nested border border-line bg-surface p-[22px]">
        {icon && (
          <div className="mb-5 grid size-11 place-items-center rounded-icon border border-line-strong bg-bg text-accent">{icon}</div>
        )}
        {children}
      </div>
    </div>
  )
}

// Key/value rows divided by rules, used in case-study headers (05-theme §5).
export function MetaTable({ rows, className }: { rows: { label: string; value: React.ReactNode }[]; className?: string }) {
  return (
    <dl className={cn('m-0', className)}>
      {rows.map((row) => (
        <div key={row.label} className="grid grid-cols-[110px_1fr] gap-3 border-t border-line py-3 text-[0.92rem]">
          <dt className="pt-0.5 font-mono text-[0.75rem] uppercase text-text-3">{row.label}</dt>
          <dd className="m-0 min-w-0">{row.value}</dd>
        </div>
      ))}
    </dl>
  )
}
