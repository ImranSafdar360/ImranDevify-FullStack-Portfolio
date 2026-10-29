import { z } from 'zod'

// Projects (06-tech-spec §5). Ownership labels are the honesty contract from the profile brief (01 §5):
// a project can only claim one of these five.
export const OWNERSHIP = ['built', 'built-solo', 'extended', 'contributed', 'in-development'] as const
export type Ownership = (typeof OWNERSHIP)[number]

const text = z.string().trim().min(1)

const imageSchema = z.object({
  src: text,
  alt: text, // required: every image needs a description
  width: z.number().int().positive().optional(),
  height: z.number().int().positive().optional(),
})

// Case-study building blocks (04 §5, 03 §4.3). The `type` decides which fields are required.
export const blockSchema = z.discriminatedUnion('type', [
  z.object({ type: z.literal('overview'), heading: text.optional(), body: text }),
  z.object({ type: z.literal('role'), heading: text.optional(), body: text, items: z.array(text).default([]) }),
  z.object({
    type: z.literal('challenge'),
    title: text,
    problem: text,
    approach: text,
    result: text,
    diagram: text.optional(),
  }),
  z.object({ type: z.literal('diagram'), key: text, caption: text.optional() }),
  z.object({ type: z.literal('scopeFacts'), items: z.array(z.object({ value: text, label: text })).min(1) }),
  z.object({ type: z.literal('stack'), groups: z.array(z.object({ label: text, items: z.array(text).min(1) })).min(1) }),
  z.object({ type: z.literal('image'), image: imageSchema, caption: text.optional() }),
  z.object({ type: z.literal('callout'), badge: z.enum(OWNERSHIP).optional(), title: text, body: text }),
])

export const projectSchema = z.object({
  slug: z.string().regex(/^[a-z0-9]+(?:-[a-z0-9]+)*$/, 'Use lowercase words separated by hyphens'),
  kind: z.enum(['case-study', 'note', 'other']),
  status: z.enum(['draft', 'published']).default('draft'),
  featured: z.boolean().default(false),
  order: z.number().int().default(0),
  title: text,
  oneLiner: text,
  year: text,
  role: text,
  context: z.enum(['client', 'company', 'freelance', 'personal']),
  ownership: z.enum(OWNERSHIP),
  ownershipDetail: text.optional(),
  platform: text.optional(),
  stack: z.array(text).default([]),
  cover: imageSchema.optional(),
  blocks: z.array(blockSchema).default([]),
  seo: z.object({ title: text.optional(), description: text.optional() }).optional(),
})

export type ProjectInput = z.input<typeof projectSchema>
export type ProjectData = z.output<typeof projectSchema>
export type ProjectBlock = z.output<typeof blockSchema>
export type Project = ProjectData & { id: string }
