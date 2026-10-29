// Colour maths for the theme system (docs/portfolio-redesign/05-theme.md §1).
// Used by the admin theme editor to derive accent states and warn about unreadable colours.

export type Rgb = { r: number; g: number; b: number }

export type AccentTokens = {
  accent: string
  hover: string
  pressed: string
  soft: string
  ink: string
}

const DARK_INK = '#0B0B0C'
const LIGHT_INK = '#FFFFFF'
const HOVER_TINT = 0.15 // mix toward white
const PRESSED_SHADE = 0.18 // mix toward black
const SOFT_ALPHA = 0.16

export function parseHex(hex: string): Rgb {
  const value = hex.trim().replace(/^#/, '')
  if (!/^([0-9a-f]{3}|[0-9a-f]{6})$/i.test(value)) {
    throw new Error(`Not a hex colour: "${hex}"`)
  }
  const full = value.length === 3 ? [...value].map((c) => c + c).join('') : value
  return {
    r: parseInt(full.slice(0, 2), 16),
    g: parseInt(full.slice(2, 4), 16),
    b: parseInt(full.slice(4, 6), 16),
  }
}

export function toHex({ r, g, b }: Rgb): string {
  return `#${[r, g, b].map((c) => c.toString(16).padStart(2, '0')).join('').toUpperCase()}`
}

function channelLuminance(channel: number): number {
  const c = channel / 255
  return c <= 0.03928 ? c / 12.92 : ((c + 0.055) / 1.055) ** 2.4
}

export function relativeLuminance(hex: string): number {
  const { r, g, b } = parseHex(hex)
  return 0.2126 * channelLuminance(r) + 0.7152 * channelLuminance(g) + 0.0722 * channelLuminance(b)
}

/** WCAG 2.x contrast ratio, from 1 (none) to 21 (black on white). */
export function contrastRatio(a: string, b: string): number {
  const la = relativeLuminance(a)
  const lb = relativeLuminance(b)
  return (Math.max(la, lb) + 0.05) / (Math.min(la, lb) + 0.05)
}

function mix(color: Rgb, target: number, amount: number): Rgb {
  const blend = (c: number) => Math.round(c + (target - c) * amount)
  return { r: blend(color.r), g: blend(color.g), b: blend(color.b) }
}

/** Derive hover, pressed, soft and ink tokens from one accent colour. */
export function deriveAccent(accentHex: string): AccentTokens {
  const rgb = parseHex(accentHex)
  const accent = toHex(rgb)
  const ink = contrastRatio(accent, DARK_INK) >= contrastRatio(accent, LIGHT_INK) ? DARK_INK : LIGHT_INK

  return {
    accent,
    hover: toHex(mix(rgb, 255, HOVER_TINT)),
    pressed: toHex(mix(rgb, 0, PRESSED_SHADE)),
    soft: `rgb(${rgb.r} ${rgb.g} ${rgb.b} / ${SOFT_ALPHA})`,
    ink,
  }
}
