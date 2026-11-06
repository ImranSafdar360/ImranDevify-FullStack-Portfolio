import { cn } from '@/lib/utils'

// Minimal line icons (24px grid, 1.6 stroke, currentColor) so the dock stays on the blueprint look with no icon
// dependency. Each is decorative — the link that wraps it carries the accessible name.
type IconProps = { className?: string }

function Svg({ children, className }: { children: React.ReactNode; className?: string }) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={1.6}
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
      className={cn('size-[22px]', className)}
    >
      {children}
    </svg>
  )
}

export function WorkIcon({ className }: IconProps) {
  return (
    <Svg className={className}>
      <rect x="3" y="7" width="18" height="13" rx="2" />
      <path d="M8 7V5.6A1.6 1.6 0 0 1 9.6 4h4.8A1.6 1.6 0 0 1 16 5.6V7" />
      <path d="M3 12.5h18" />
    </Svg>
  )
}

export function AboutIcon({ className }: IconProps) {
  return (
    <Svg className={className}>
      <circle cx="12" cy="8" r="3.4" />
      <path d="M5.5 20c0-3.6 2.9-6 6.5-6s6.5 2.4 6.5 6" />
    </Svg>
  )
}

export function ContactIcon({ className }: IconProps) {
  return (
    <Svg className={className}>
      <rect x="3" y="5" width="18" height="14" rx="2" />
      <path d="M4 7.5l8 5.5 8-5.5" />
    </Svg>
  )
}

// Up-right arrow (↗). Static — the SurfaceButton rolls it with the label rather than sliding it on its own.
export function ArrowIcon({ className }: IconProps) {
  return (
    <Svg className={className}>
      <path d="M7 17 17 7" />
      <path d="M8 7h9v9" />
    </Svg>
  )
}

export function ResumeIcon({ className }: IconProps) {
  return (
    <Svg className={className}>
      <path d="M12 4v9.5" />
      <path d="M8.5 10.5 12 14l3.5-3.5" />
      <path d="M5 19.5h14" />
    </Svg>
  )
}

// Capability icons (home "What I'm good at" cards).
export function PaymentsIcon({ className }: IconProps) {
  return (
    <Svg className={className}>
      <rect x="2.5" y="5" width="19" height="14" rx="2.5" />
      <path d="M2.5 9.5h19M6.5 15h4" />
    </Svg>
  )
}

export function FormsIcon({ className }: IconProps) {
  return (
    <Svg className={className}>
      <rect x="4" y="3" width="16" height="18" rx="2" />
      <path d="M8 8h8M8 12h8M8 16h4.5" />
    </Svg>
  )
}

export function RealtimeIcon({ className }: IconProps) {
  return (
    <Svg className={className}>
      <path d="M4 5.5h16v10H9.5L5.5 19v-3.5H4z" />
      <path d="M8.5 10.5h.01M12 10.5h.01M15.5 10.5h.01" strokeWidth={2.4} />
    </Svg>
  )
}

export function AuthIcon({ className }: IconProps) {
  return (
    <Svg className={className}>
      <path d="M12 3 4.5 6v5.5c0 4.6 3.2 8.2 7.5 9.5 4.3-1.3 7.5-4.9 7.5-9.5V6z" />
      <path d="m8.8 12.2 2.3 2.3 4.2-4.6" />
    </Svg>
  )
}

export function MobileIcon({ className }: IconProps) {
  return (
    <Svg className={className}>
      <rect x="6.5" y="2.5" width="11" height="19" rx="2.5" />
      <path d="M10.5 18.5h3" />
    </Svg>
  )
}

export function AgentIcon({ className }: IconProps) {
  return (
    <Svg className={className}>
      <path d="M12 3.5c.6 3.9 2.6 5.9 6.5 6.5-3.9.6-5.9 2.6-6.5 6.5-.6-3.9-2.6-5.9-6.5-6.5 3.9-.6 5.9-2.6 6.5-6.5z" />
      <path d="M18.5 15.5c.25 1.6 1 2.35 2.5 2.5-1.5.15-2.25.9-2.5 2.5-.25-1.6-1-2.35-2.5-2.5 1.5-.15 2.25-.9 2.5-2.5z" />
    </Svg>
  )
}

// Brand mark used as the dock's "home" app tile: an accent square with the blue-slash motif.
// Drawn (no text) so it never clashes with the link's "Home" accessible name (WCAG label-in-name).
export function LogoMark({ className }: IconProps) {
  return (
    <span aria-hidden="true" className={cn('grid size-[30px] place-items-center rounded-[9px] bg-accent text-accent-ink', className)}>
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2.6} strokeLinecap="round" className="size-[18px]">
        <path d="M14.5 5.5 9.5 18.5" />
      </svg>
    </span>
  )
}
