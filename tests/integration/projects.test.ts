// @vitest-environment node
import mongoose from 'mongoose'
import { MongoMemoryServer } from 'mongodb-memory-server'
import { afterAll, beforeAll, beforeEach, describe, expect, it, vi } from 'vitest'
import { projectSchema, type ProjectInput } from '@/schemas/project'

vi.mock('next/cache', () => ({ cacheLife: vi.fn(), cacheTag: vi.fn() }))

let server: MongoMemoryServer

beforeAll(async () => {
  server = await MongoMemoryServer.create()
  process.env.MONGODB_URI = server.getUri('portfolio-projects-test')
})

afterAll(async () => {
  await mongoose.disconnect()
  await server.stop()
})

beforeEach(async () => {
  const { connectDb } = await import('@/lib/db/mongoose')
  await connectDb()
  await mongoose.connection.db?.dropDatabase()
  const { ProjectModel } = await import('@/models/project')
  await ProjectModel.syncIndexes()
})

const base = (overrides: Partial<ProjectInput> = {}): ProjectInput => ({
  slug: 'clientmanager',
  kind: 'case-study',
  status: 'published',
  featured: true,
  order: 1,
  title: 'ClientManager',
  oneLiner: 'Payments for five providers inside a live SaaS.',
  year: '2025 – now',
  role: 'Full-stack engineer (client work)',
  context: 'client',
  ownership: 'built',
  platform: 'Web app + client portal',
  stack: ['React', 'Node.js', 'MongoDB'],
  blocks: [{ type: 'overview', heading: 'Overview', body: 'An all-in-one SaaS for agencies.' }],
  ...overrides,
})

async function insert(...projects: ProjectInput[]) {
  const { ProjectModel } = await import('@/models/project')
  await ProjectModel.insertMany(projects.map((p) => projectSchema.parse(p)))
}

describe('project schema', () => {
  it('accepts a valid case study', () => {
    expect(projectSchema.safeParse(base()).success).toBe(true)
  })

  it('rejects an ownership label that is not one of the five honest options', () => {
    expect(projectSchema.safeParse({ ...base(), ownership: 'founded' }).success).toBe(false)
  })

  it('rejects a block whose fields do not match its type', () => {
    const bad = { ...base(), blocks: [{ type: 'challenge', title: 'Five providers' }] } // missing problem/approach/result
    expect(projectSchema.safeParse(bad).success).toBe(false)
  })

  it('rejects slugs that are not kebab-case', () => {
    expect(projectSchema.safeParse({ ...base(), slug: 'Client Manager' }).success).toBe(false)
  })
})

describe('project reads', () => {
  it('never returns drafts from public reads', async () => {
    await insert(base(), base({ slug: 'secret-draft', title: 'Draft', status: 'draft', order: 0 }))
    const { loadPublishedProjects, loadProjectBySlug } = await import('@/lib/content/projects')

    expect((await loadPublishedProjects()).map((p) => p.slug)).toEqual(['clientmanager'])
    await expect(loadProjectBySlug('secret-draft')).resolves.toBeNull()
  })

  it('returns featured projects in their order', async () => {
    await insert(
      base({ slug: 'your-business-date', title: 'Your Business Date', order: 3 }),
      base({ slug: 'blarecast', title: 'Blarecast', order: 2 }),
      base({ slug: 'clientmanager', order: 1 }),
      base({ slug: 'e-axon', title: 'E-Axon', kind: 'note', featured: false, order: 4 }),
    )
    const { loadFeaturedProjects } = await import('@/lib/content/projects')
    expect((await loadFeaturedProjects()).map((p) => p.slug)).toEqual(['clientmanager', 'blarecast', 'your-business-date'])
  })

  it('returns plain, serializable data with a string id', async () => {
    await insert(base())
    const { loadProjectBySlug } = await import('@/lib/content/projects')
    const project = await loadProjectBySlug('clientmanager')

    expect(project).not.toBeNull()
    expect(typeof project!.id).toBe('string')
    expect(project).not.toHaveProperty('_id')
    expect(JSON.parse(JSON.stringify(project))).toEqual(project)
  })

  it('enforces unique slugs in the database', async () => {
    await insert(base())
    await expect(insert(base({ title: 'Duplicate' }))).rejects.toThrow()
  })
})
