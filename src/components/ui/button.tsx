import Link from 'next/link'
import { cn } from '@/lib/utils'

type ButtonVariant = 'primary' | 'ghost'

type CommonProps = {
  children: string
  variant?: ButtonVariant
  arrow?: boolean
  className?: string
}

type ButtonProps = CommonProps &
  ({ href: string } & Omit<React.ComponentProps<typeof Link>, 'children' | 'className' | 'href'>
    | ({ href?: undefined } & Omit<React.ButtonHTMLAttributes<HTMLButtonElement>, 'children' | 'className'>))

// Label that rolls up on hover (Rama/Formax pattern). The duplicate copy is hidden from assistive tech.
function RollLabel({ children }: { children: string }) {
  return (
    <span className="relative block h-[1.3em] overflow-hidden leading-[1.3em]">
      <span className="block transition-transform duration-[450ms] ease-ui group-hover:-translate-y-full motion-reduce:transition-none">
        {children}
      </span>
      <span
        aria-hidden="true"
        className="absolute inset-x-0 top-full block transition-transform duration-[450ms] ease-ui group-hover:-translate-y-full motion-reduce:transition-none"
      >
        {children}
      </span>
    </span>
  )
}

export function Arrow() {
  return (
    <span
      aria-hidden="true"
      className="transition-transform duration-[450ms] ease-ui group-hover:translate-x-[3px] group-hover:-translate-y-[3px] motion-reduce:transition-none"
    >
      ↗
    </span>
  )
}

const BASE =
  'group relative inline-flex h-12 items-center gap-2.5 overflow-hidden rounded-full border px-[22px] font-medium no-underline [transition:color_450ms_var(--ease-ui),scale_150ms_var(--ease-out-strong)] hover:text-bg active:scale-[0.97] focus-visible:outline-accent motion-reduce:transition-none'

const VARIANTS: Record<ButtonVariant, string> = {
  primary: 'border-accent bg-accent text-accent-ink active:bg-accent-pressed',
  ghost: 'border-line-strong bg-transparent text-text',
}

// The light fill that rises from the bottom on hover.
const FILL =
  'absolute inset-0 origin-bottom scale-y-0 bg-text transition-transform duration-[450ms] ease-ui group-hover:scale-y-100 motion-reduce:transition-none'

// Files, external sites and mailto: are not app routes, so they get a plain <a> (no client routing or prefetch).
export function isAppRoute(href: string) {
  return href.startsWith('/') && !href.startsWith('//') && !/\.[a-z0-9]+($|[?#])/i.test(href)
}

export function Button(props: ButtonProps) {
  const { children, variant = 'ghost', arrow = false, className, ...rest } = props
  const classes = cn(BASE, VARIANTS[variant], className)
  const content = (
    <>
      <span aria-hidden="true" className={FILL} />
      <span className="relative z-[1] flex items-center gap-2.5">
        <RollLabel>{children}</RollLabel>
        {arrow && <Arrow />}
      </span>
    </>
  )

  if ('href' in rest && rest.href !== undefined) {
    if (!isAppRoute(rest.href)) {
      // Drop Link-only props so they don't become stray attributes on the plain <a>.
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
    <button type="button" className={classes} {...(rest as React.ButtonHTMLAttributes<HTMLButtonElement>)}>
      {content}
    </button>
  )
}

// Full-width accent bar used for the hero's main call to action (05-theme §5).
export function CtaBar({ href, children, className }: { href: string; children: string; className?: string }) {
  return (
    <Link
      href={href}
      className={cn(
        'group relative flex h-[58px] items-center justify-between overflow-hidden bg-accent px-5 text-[1.1rem] font-semibold text-accent-ink no-underline transition-colors duration-[450ms] ease-ui hover:text-bg motion-reduce:transition-none',
        className,
      )}
    >
      <span aria-hidden="true" className={FILL} />
      <span className="relative z-[1]">
        <RollLabel>{children}</RollLabel>
      </span>
      <span className="relative z-[1]">
        <Arrow />
      </span>
    </Link>
  )
}
