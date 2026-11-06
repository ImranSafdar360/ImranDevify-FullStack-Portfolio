import Link from 'next/link'
import { cn } from '@/lib/utils'
import { isAppRoute } from './button'

// The app's button. Glossy "surface" look and behaviour (Aceternity t-surface, rebuilt on our palette): white sheen,
// gradient fill + border, layered shadow, press-in on :active. White text in every variant and state. On hover the
// icon + label roll up together as one unit and an identical copy rolls in from below.
type Variant = 'primary' | 'secondary' | 'ghost'
type Size = 'sm' | 'md' | 'lg'

const VARIANT: Record<Variant, string> = {
  primary: 'surface surface-primary text-white',
  secondary: 'surface surface-secondary text-white',
  ghost: 'border border-line-strong bg-transparent text-text transition-colors hover:border-text-3 active:scale-[0.98]',
}

const SIZE: Record<Size, string> = {
  sm: 'h-9 rounded-[0.6rem] px-3.5 text-[0.82rem]',
  md: 'h-11 rounded-[0.7rem] px-5 text-[0.95rem]',
  lg: 'h-12 rounded-[0.8rem] px-6 text-[1.05rem]',
}

type CommonProps = {
  children: React.ReactNode
  variant?: Variant
  size?: Size
  icon?: React.ReactNode
  iconPosition?: 'left' | 'right'
  className?: string
}

type SurfaceButtonProps = CommonProps &
  (
    | ({ href: string } & Omit<React.ComponentProps<typeof Link>, 'children' | 'className' | 'href'>)
    | ({ href?: undefined } & Omit<React.ButtonHTMLAttributes<HTMLButtonElement>, 'children' | 'className'>)
  )

// Two stacked copies of the icon+label; on hover the stack slides up one row, so the first copy exits at the top
// and the identical second copy rolls into place. The second copy is hidden from assistive tech (no double-reading).
function RollLabel({ icon, iconPosition, children }: Pick<CommonProps, 'icon' | 'iconPosition' | 'children'>) {
  const row = (hidden: boolean) => (
    <span aria-hidden={hidden || undefined} className="flex h-[1.5em] shrink-0 items-center justify-center gap-[0.55em] leading-none">
      {icon && iconPosition === 'left' && <span className="grid shrink-0 place-items-center">{icon}</span>}
      <span>{children}</span>
      {icon && iconPosition !== 'left' && <span className="grid shrink-0 place-items-center">{icon}</span>}
    </span>
  )
  return (
    <span className="relative z-[1] block h-[1.5em] overflow-hidden">
      <span className="flex flex-col transition-transform duration-[460ms] ease-out-strong group-hover:-translate-y-1/2 motion-reduce:transition-none">
        {row(false)}
        {row(true)}
      </span>
    </span>
  )
}

const BASE = 'group relative inline-flex cursor-pointer items-center justify-center font-semibold no-underline select-none'

export function SurfaceButton(props: SurfaceButtonProps) {
  const { children, variant = 'primary', size = 'md', icon, iconPosition = 'right', className, ...rest } = props
  const classes = cn(BASE, SIZE[size], VARIANT[variant], className)
  const content = (
    <RollLabel icon={icon} iconPosition={iconPosition}>
      {children}
    </RollLabel>
  )

  if ('href' in rest && rest.href !== undefined) {
    if (!isAppRoute(rest.href)) {
      // Drop Link-only props so they don't leak onto the plain <a> (files, mailto:, anchors, external URLs).
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      const { prefetch, replace, scroll, shallow, locale, legacyBehavior, passHref, onNavigate, ...anchorProps } =
        rest as React.ComponentProps<typeof Link>
      return (
        <a className={classes} {...(anchorProps as React.AnchorHTMLAttributes<HTMLAnchorElement>)}>
          {content}
        </a>
      )
    }
    return (
      <Link className={classes} {...rest}>
        {content}
      </Link>
    )
  }

  return (
    <button type="button" className={cn(classes, 'disabled:pointer-events-none disabled:opacity-50')} {...(rest as React.ButtonHTMLAttributes<HTMLButtonElement>)}>
      {content}
    </button>
  )
}
