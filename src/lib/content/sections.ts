import 'server-only'
import { cacheLife, cacheTag } from 'next/cache'
import { connectDb } from '@/lib/db/mongoose'
import { SectionModel } from '@/models/section'
import { sectionSchema, type Page, type Section } from '@/schemas/section'

export const SECTIONS_TAG = 'content:sections'

/** Visible sections of a page, in order, as plain validated data. */
export async function loadPageSections(page: Page): Promise<Section[]> {
  await connectDb()
  const docs = await SectionModel.find({ page, visible: true }).sort({ order: 1 }).lean()
  return docs.map(({ page, key, type, order, visible, content }) => sectionSchema.parse({ page, key, type, order, visible, content }))
}

// Cached for the life of the content; admin saves call updateTag(SECTIONS_TAG). In dev, after `npm run seed`, do a hard
// refresh (Ctrl+Shift+R): it re-runs cached functions; a normal reload keeps serving the cached result.
export async function getPageSections(page: Page): Promise<Section[]> {
  'use cache'
  cacheLife('max')
  cacheTag(SECTIONS_TAG)
  return loadPageSections(page)
}
