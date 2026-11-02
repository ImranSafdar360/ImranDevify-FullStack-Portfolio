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

export const sectionSchema = z.discriminatedUnion('type', [z.object({ ...base, type: z.literal('hero'), content: heroContentSchema })])

export type SectionInput = z.input<typeof sectionSchema>
export type Section = z.output<typeof sectionSchema>
export type HeroContent = z.output<typeof heroContentSchema>
