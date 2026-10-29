import 'server-only'
import { cacheLife, cacheTag } from 'next/cache'
import { connectDb } from '@/lib/db/mongoose'
import { ProjectModel } from '@/models/project'
import { projectSchema, type Project } from '@/schemas/project'

export const PROJECTS_TAG = 'content:projects'
export const projectTag = (slug: string) => `content:project:${slug}`

type StoredProject = Record<string, unknown> & { _id: { toString(): string } }

// Validate what comes out of the database and return plain data (string id, no ObjectIds), so it can be cached.
function toProject(doc: StoredProject): Project {
  return { id: doc._id.toString(), ...projectSchema.parse(doc) }
}

const PUBLISHED = { status: 'published' } as const
const SORT = { order: 1, title: 1 } as const

export async function loadPublishedProjects(): Promise<Project[]> {
  await connectDb()
  const docs = await ProjectModel.find(PUBLISHED).sort(SORT).lean<StoredProject[]>()
  return docs.map(toProject)
}

export async function loadFeaturedProjects(): Promise<Project[]> {
  await connectDb()
  const docs = await ProjectModel.find({ ...PUBLISHED, featured: true }).sort(SORT).lean<StoredProject[]>()
  return docs.map(toProject)
}

export async function loadProjectBySlug(slug: string): Promise<Project | null> {
  await connectDb()
  const doc = await ProjectModel.findOne({ ...PUBLISHED, slug }).lean<StoredProject | null>()
  return doc ? toProject(doc) : null
}

// Cached reads (Cache Components). Projects are core content, so a missing database fails loudly instead of
// silently publishing an empty site. Admin saves call updateTag(PROJECTS_TAG) and updateTag(projectTag(slug)).
export async function getPublishedProjects(): Promise<Project[]> {
  'use cache'
  cacheLife('max')
  cacheTag(PROJECTS_TAG)
  return loadPublishedProjects()
}

export async function getFeaturedProjects(): Promise<Project[]> {
  'use cache'
  cacheLife('max')
  cacheTag(PROJECTS_TAG)
  return loadFeaturedProjects()
}

export async function getProjectBySlug(slug: string): Promise<Project | null> {
  'use cache'
  cacheLife('max')
  cacheTag(PROJECTS_TAG, projectTag(slug))
  return loadProjectBySlug(slug)
}
