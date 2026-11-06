import Link from 'next/link'
import { cn } from '@/lib/utils'
import { isAppRoute } from './button'

// Reusable link used across the site: an optional icon, a text label, and an optional hover/focus tooltip ("toast").
// In the dock it is icon-only with a tooltip; elsewhere it can show its text. Internal routes use next/link;
// files, mailto: and external URLs fall back to a plain <a>.
type AppLinkProps = {
  href: string
  label: string
  icon?: React.ReactNode
  /** Tooltip shown on hover/focus (the "toast"). Defaults to `label` when icon-only. */
  tooltip?: string
  /** Hide the text label (kept for assistive tech); show the icon alone. Requires `icon`. */
  iconOnly?: boolean
  /** Opt the icon into dock magnification (the dock scales `[data-dock-item]`). */
  magnify?: boolean
  active?: boolean
  onClick?: () => void
  className?: string
  iconClassName?: string
}

export function AppLink({ href, label, icon, tooltip, iconOnly, magnify, active, onClick, className, iconClassName }: AppLinkProps) {
  const toast = tooltip ?? (iconOnly ? label : undefined)

  const body = (
    <>
      {icon && (
        <span
          data-dock-item={magnify ? '' : undefined}
          className={cn('grid origin-bottom place-items-center text-text-2 transition-transform duration-[90ms] ease-out group-hover:text-text', active && 'text-text', iconClassName)}
        >
          {icon}
        </span>
      )}
      {/* Icon-only links name themselves through aria-label; a text link shows its label. */}
      {!iconOnly && <span>{label}</span>}
      {toast && (
        <span
          aria-hidden="true"
          data-tooltip=""
          className={cn(
            'pointer-events-none absolute -top-10 left-1/2 -translate-x-1/2 translate-y-1 scale-95 whitespace-nowrap rounded-lg border border-line bg-surface-2 px-2.5 py-1 text-[0.72rem] font-medium text-text opacity-0 shadow-[0_8px_24px_-8px_rgb(0_0_0/0.7)]',
            'transition-[opacity,transform] duration-150 ease-out group-hover:translate-y-0 group-hover:scale-100 group-hover:opacity-100 group-focus-visible:translate-y-0 group-focus-visible:scale-100 group-focus-visible:opacity-100 motion-reduce:transition-none',
          )}
        >
          {toast}
        </span>
      )}
    </>
  )

  const classes = cn('group relative inline-flex items-center gap-2 no-underline outline-offset-4', className)
  const current = active ? ('page' as const) : undefined

  if (isAppRoute(href)) {
    return (
      <Link href={href} aria-current={current} aria-label={iconOnly ? label : undefined} onClick={onClick} className={classes}>
        {body}
      </Link>
    )
  }
  return (
    <a href={href} aria-current={current} aria-label={iconOnly ? label : undefined} onClick={onClick} className={classes}>
      {body}
    </a>
  )
}
