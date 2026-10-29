import { cn } from '@/lib/utils'

// Ownership labels from the profile brief (01 §5). The label text is the claim, so it always renders.
export type Ownership = 'built' | 'built-solo' | 'extended' | 'contributed' | 'in-development'
type BadgeVariant = 'built' | 'neutral' | 'development'

const OWNERSHIP: Record<Ownership, { label: string; variant: BadgeVariant }> = {
  built: { label: 'Built', variant: 'built' },
  'built-solo': { label: 'Built solo', variant: 'built' },
  extended: { label: 'Extended', variant: 'neutral' },
  contributed: { label: 'Contributed', variant: 'neutral' },
  'in-development': { label: 'In development', variant: 'development' },
}

export function ownershipBadge(ownership: Ownership) {
  return OWNERSHIP[ownership]
}

const VARIANT_CLASSES: Record<BadgeVariant, string> = {
  // accent-hover text: plain accent on the soft fill measures 4.37:1, below AA for 12px text.
  built: 'border-accent/40 bg-accent-soft text-accent-hover',
  neutral: 'border-line-strong text-text-2',
  development: 'border-dashed border-accent text-accent',
}

export function Badge({ variant, children, className }: { variant: BadgeVariant; children: React.ReactNode; className?: string }) {
  return (
    <span
      className={cn(
        'inline-flex h-6 items-center gap-1.5 rounded-full border px-2.5 text-[0.75rem] font-semibold whitespace-nowrap',
        VARIANT_CLASSES[variant],
        className,
      )}
    >
      {children}
    </span>
  )
}

export function OwnershipBadge({ ownership, className }: { ownership: Ownership; className?: string }) {
  const { label, variant } = ownershipBadge(ownership)
  return (
    <Badge variant={variant} className={className}>
      {label}
    </Badge>
  )
}
