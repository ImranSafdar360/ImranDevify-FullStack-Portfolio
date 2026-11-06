import { cn } from '@/lib/utils'

// Reusable hairline rule. Decorative by default (aria-hidden); pass `role="separator"` via props when it carries meaning.
type DividerProps = {
  orientation?: 'vertical' | 'horizontal'
  className?: string
}

export function Divider({ orientation = 'horizontal', className }: DividerProps) {
  return (
    <span
      aria-hidden="true"
      className={cn('shrink-0 bg-line', orientation === 'vertical' ? 'h-6 w-px' : 'h-px w-full', className)}
    />
  )
}
