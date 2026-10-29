import { z } from 'zod'

// Site-wide settings (06-tech-spec §5 "settings"). Defaults come from the profile brief, so the site renders
// correct content even before anything is saved in the admin. Theme tokens join this schema in T31.
export const settingsSchema = z.object({
  availability: z
    .object({
      open: z.boolean().default(true),
      label: z.string().min(1).default('Open to remote roles'),
      note: z.string().default('Start: immediately'),
    })
    .prefault({}),
  contact: z
    .object({
      emailHiring: z.email().default('imransafdar360@gmail.com'),
      emailProjects: z.email().default('imranguru360@gmail.com'),
      location: z.string().min(1).default('Lahore, PKT'),
      timeZone: z.string().min(1).default('Asia/Karachi'),
      replyNote: z.string().default('I usually reply within a few hours'),
    })
    .prefault({}),
  links: z
    .object({
      linkedin: z.url().default('https://www.linkedin.com/in/imran-safdar/'),
      github: z.url().default('https://github.com/ImranSafdar360'),
      resume: z.string().min(1).default('/resume.pdf'),
    })
    .prefault({}),
  seo: z
    .object({
      title: z.string().min(1).default('Imran Safdar | Full-stack product engineer'),
      description: z
        .string()
        .min(1)
        .default('Full-stack product engineer building payments, forms, real-time features and mobile apps inside live SaaS products.'),
    })
    .prefault({}),
})

export type Settings = z.infer<typeof settingsSchema>
export type SettingsInput = z.input<typeof settingsSchema>

export const DEFAULT_SETTINGS: Settings = settingsSchema.parse({})
