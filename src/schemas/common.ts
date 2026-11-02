import { z } from 'zod'

// Field types shared by every content schema.
export const text = z.string().trim().min(1)

export const imageSchema = z.object({
  src: text,
  alt: text, // required: every image needs a description
  width: z.number().int().positive().optional(),
  height: z.number().int().positive().optional(),
})

export const linkSchema = z.object({ label: text, href: text })
