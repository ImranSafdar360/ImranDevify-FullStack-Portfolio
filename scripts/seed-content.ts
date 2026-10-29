import { readFile } from 'node:fs/promises'
import path from 'node:path'
import { z } from 'zod'
import { ProjectModel } from '@/models/project'
import { SettingsModel } from '@/models/settings'
import { projectSchema } from '@/schemas/project'
import { settingsSchema } from '@/schemas/settings'

// Loads content/seed/*.json into MongoDB. Every item is validated first; nothing is written if any item is invalid.
// Idempotent: projects are upserted by slug and settings by key, so running it again never creates duplicates.
// It never deletes: content created later in the admin is left alone.

const SEED_DIR = path.join(process.cwd(), 'content', 'seed')

async function readJson(file: string): Promise<unknown> {
  return JSON.parse(await readFile(path.join(SEED_DIR, file), 'utf8'))
}

export async function loadSeedFiles() {
  const settings = settingsSchema.parse(await readJson('settings.json'))
  const projects = z.array(projectSchema).parse(await readJson('projects.json'))

  const slugs = projects.map((p) => p.slug)
  const duplicate = slugs.find((slug, i) => slugs.indexOf(slug) !== i)
  if (duplicate) throw new Error(`Duplicate project slug in projects.json: ${duplicate}`)

  return { settings, projects }
}

export async function seedContent() {
  const { settings, projects } = await loadSeedFiles()

  await SettingsModel.updateOne({ key: 'site' }, { $set: { value: settings } }, { upsert: true })
  for (const project of projects) {
    await ProjectModel.replaceOne({ slug: project.slug }, project, { upsert: true })
  }

  return { settings: 1, projects: projects.length }
}
