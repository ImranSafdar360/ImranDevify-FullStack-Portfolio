import { BRAND_ICONS } from './brand-icons'

const SVG = { viewBox: '0 0 24 24', 'aria-hidden': true, className: 'size-[1.15em] shrink-0' } as const

// One mark per integration, in currentColor so the strip stays monochrome (tokens drive the colour).
// 'card' is a neutral payment glyph for a provider with no published mark (Authorize.Net). No icon, or an unknown key,
// renders nothing and the cell shows the name alone: never a guessed or redrawn version of someone's logo.
export function IntegrationIcon({ icon }: { icon?: string }) {
  if (icon === 'card') {
    return (
      <svg {...SVG} fill="none" stroke="currentColor" strokeWidth={1.7} strokeLinecap="round" strokeLinejoin="round">
        <rect x="2.5" y="5" width="19" height="14" rx="2.5" />
        <path d="M2.5 9.5h19M6.5 15h4" />
      </svg>
    )
  }
  const brand = icon ? BRAND_ICONS[icon] : undefined
  if (!brand) return null
  return (
    <svg {...SVG} fill="currentColor">
      <path d={brand.path} />
    </svg>
  )
}
