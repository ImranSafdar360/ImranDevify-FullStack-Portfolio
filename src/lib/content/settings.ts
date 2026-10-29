import 'server-only'
import { cacheLife, cacheTag } from 'next/cache'
import { connectDb, isDatabaseConfigured } from '@/lib/db/mongoose'
import { SettingsModel } from '@/models/settings'
import { DEFAULT_SETTINGS, settingsSchema, type Settings } from '@/schemas/settings'

export const SETTINGS_TAG = 'content:settings'

/** Read the settings document and return plain, validated data (no Mongoose/ObjectId instances). */
export async function loadSettings(): Promise<Settings> {
  await connectDb()
  const doc = await SettingsModel.findOne({ key: 'site' }).lean()
  return settingsSchema.parse(doc?.value ?? {})
}

/**
 * Cached settings for every page (Cache Components). Admin saves call updateTag(SETTINGS_TAG).
 * Settings are non-critical and their defaults are the real profile content, so if the database is missing or
 * unreachable (CI, first deploy) the site renders the defaults instead of failing the build.
 */
export async function getSettings(): Promise<Settings> {
  'use cache'
  cacheLife('max')
  cacheTag(SETTINGS_TAG)

  if (!isDatabaseConfigured()) return DEFAULT_SETTINGS
  try {
    return await loadSettings()
  } catch (error) {
    console.warn(`[settings] Using defaults: ${error instanceof Error ? error.name : 'unknown error'}`)
    return DEFAULT_SETTINGS
  }
}
