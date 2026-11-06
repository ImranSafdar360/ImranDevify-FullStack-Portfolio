import { z } from 'zod'
import { imageSchema, linkSchema, text } from './common'

// Page sections (06-tech-spec §5 "sections"). Each section type has its own content shape; the admin (T34)
// reorders, hides, and edits them. New section types join this union in their own tasks (T13–T17).
export const PAGES = ['home'] as const
export type Page = (typeof PAGES)[number]

const base = {
  page: z.enum(PAGES),
  key: z.string().regex(/^[a-z0-9]+(?:-[a-z0-9]+)*$/),
  order: z.number().int().default(0),
  visible: z.boolean().default(true),
}

export const heroContentSchema = z.object({
  wordmark: text,
  scriptLabel: text,
  headline: text,
  intro: text,
  cta: linkSchema,
  secondary: linkSchema.optional(),
  // Product screenshots on the right (04 §1, decided: product composition). Images arrive in T44.
  frames: z
    .array(z.object({ label: text, variant: z.enum(['desktop', 'phone', 'card']), image: imageSchema.optional() }))
    .max(3)
    .default([]),
})

// The statement (04 §2), now the capabilities intro: a few stacked lines, one optionally in accent, and the
// annotation that explains them.
export const statementSchema = z
  .object({
    lines: z.array(text).min(1).max(4),
    accentLine: z.number().int().min(0).optional(),
    annotation: text.optional(),
  })
  .refine((c) => c.accentLine === undefined || c.accentLine < c.lines.length, {
    message: 'accentLine must point at one of the lines',
    path: ['accentLine'],
  })

const projectSlug = z.string().regex(/^[a-z0-9]+(?:-[a-z0-9]+)*$/)

// A named service with an optional mark key (integrations strip, capability proof). An unknown or missing key shows the
// name alone: never a guessed or redrawn logo. 'card' is a neutral payment glyph.
export const integrationItemSchema = z.object({ name: text, icon: z.string().regex(/^[a-z0-9-]+$/).optional() })

// What backs a capability (shown in the sticky panel): verified facts only (01 §5–6), never invented metrics.
export const capabilityProofSchema = z.object({
  figure: z.object({ value: text, caption: text }).optional(),
  marks: z.array(integrationItemSchema).max(8).default([]),
  points: z.array(text).min(1).max(4),
  stack: z.array(text).max(6).default([]),
})

export const CAPABILITY_ICONS = ['payments', 'forms', 'realtime', 'auth', 'mobile', 'agents'] as const

// Capabilities (04 §4): a scrolling list with a sticky proof panel; each one is backed by projects ("Seen in →" by slug).
export const capabilityRowSchema = z.object({
  title: text,
  line: text,
  seenIn: z.array(projectSlug).min(1),
  icon: z.enum(CAPABILITY_ICONS).optional(),
  proof: capabilityProofSchema.optional(),
  // Not shipped yet: shown with the "In development" badge, never presented as live work (01 §6).
  inDevelopment: z.boolean().default(false),
})

export const capabilitiesContentSchema = z.object({
  index: text,
  label: text,
  intro: statementSchema.optional(),
  title: text,
  rows: z.array(capabilityRowSchema).min(1).max(8),
})

// Integrations strip under the hero: services wired into live products (01 §5–6), shown as a logo marquee.
export const integrationsContentSchema = z.object({
  label: text,
  items: z.array(integrationItemSchema).min(3).max(24),
})

export const sectionSchema = z.discriminatedUnion('type', [
  z.object({ ...base, type: z.literal('hero'), content: heroContentSchema }),
  z.object({ ...base, type: z.literal('integrations'), content: integrationsContentSchema }),
  z.object({ ...base, type: z.literal('capabilities'), content: capabilitiesContentSchema }),
])

export type SectionInput = z.input<typeof sectionSchema>
export type Section = z.output<typeof sectionSchema>
export type HeroContent = z.output<typeof heroContentSchema>
export type IntegrationsContent = z.output<typeof integrationsContentSchema>
export type Statement = z.output<typeof statementSchema>
export type CapabilitiesContent = z.output<typeof capabilitiesContentSchema>
export type CapabilityRow = z.output<typeof capabilityRowSchema>
export type CapabilityProof = z.output<typeof capabilityProofSchema>
