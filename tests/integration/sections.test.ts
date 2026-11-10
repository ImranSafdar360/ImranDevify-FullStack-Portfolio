// @vitest-environment node
import mongoose from 'mongoose'
import { MongoMemoryServer } from 'mongodb-memory-server'
import { afterAll, beforeAll, beforeEach, describe, expect, it, vi } from 'vitest'
import { sectionSchema, type SectionInput } from '@/schemas/section'

vi.mock('next/cache', () => ({ cacheLife: vi.fn(), cacheTag: vi.fn() }))

let server: MongoMemoryServer

beforeAll(async () => {
  server = await MongoMemoryServer.create()
  process.env.MONGODB_URI = server.getUri('portfolio-sections-test')
})

afterAll(async () => {
  await mongoose.disconnect()
  await server.stop()
})

beforeEach(async () => {
  const { connectDb } = await import('@/lib/db/mongoose')
  await connectDb()
  await mongoose.connection.db?.dropDatabase()
  const { SectionModel } = await import('@/models/section')
  await SectionModel.syncIndexes()
})

const hero = (overrides: Partial<SectionInput> = {}): SectionInput => ({
  page: 'home',
  key: 'hero',
  type: 'hero',
  order: 1,
  visible: true,
  content: {
    wordmark: 'Imran Safdar',
    scriptLabel: "Hi, I'm Imran",
    headline: 'Full-stack engineer for products that are already live.',
    intro: 'I have spent 2+ years shipping inside real SaaS and mobile products.',
    cta: { label: 'See the case studies', href: '#cases' },
  },
  ...overrides,
}) as SectionInput

async function insert(...sections: SectionInput[]) {
  const { SectionModel } = await import('@/models/section')
  await SectionModel.insertMany(sections.map((s) => sectionSchema.parse(s)))
}

describe('section schema', () => {
  it('accepts a valid hero', () => {
    expect(sectionSchema.safeParse(hero()).success).toBe(true)
  })

  it('rejects a hero without a headline', () => {
    const bad = hero()
    delete (bad.content as Record<string, unknown>).headline
    expect(sectionSchema.safeParse(bad).success).toBe(false)
  })

  it('rejects an unknown section type', () => {
    expect(sectionSchema.safeParse({ ...hero(), type: 'carousel-of-everything' }).success).toBe(false)
  })

  const capabilities = (rows: unknown[], intro?: Record<string, unknown>) =>
    ({
      page: 'home',
      key: 'capabilities',
      type: 'capabilities',
      content: { index: '02', label: 'What I build', title: 'What I’m good at', rows, ...(intro && { intro }) },
    }) as SectionInput
  const row = { title: 'Payments', line: 'One payment system.', seenIn: ['clientmanager'] }

  it('accepts a statement intro and rejects an accent line that points past the last line', () => {
    expect(sectionSchema.safeParse(capabilities([row], { lines: ['Live products.', 'Real users.'], accentLine: 1 })).success).toBe(true)
    expect(sectionSchema.safeParse(capabilities([row], { lines: ['Live products.'], accentLine: 1 })).success).toBe(false)
  })

  it('requires one evidence note per statement line', () => {
    const lines = ['Live products.', 'Real users.']
    expect(sectionSchema.safeParse(capabilities([row], { lines, notes: ['Live', 'Users'] })).success).toBe(true)
    expect(sectionSchema.safeParse(capabilities([row], { lines, notes: ['Only one'] })).success).toBe(false)
  })

  it('only accepts capability icons from the known set', () => {
    expect(sectionSchema.safeParse(capabilities([{ ...row, icon: 'payments' }])).success).toBe(true)
    expect(sectionSchema.safeParse(capabilities([{ ...row, icon: 'rocket' }])).success).toBe(false)
  })

  it('requires every capability to name at least one project by slug', () => {
    const parsed = sectionSchema.parse(capabilities([row]))
    expect(parsed.type === 'capabilities' && parsed.content.rows[0].inDevelopment).toBe(false)
    expect(sectionSchema.safeParse(capabilities([{ ...row, seenIn: [] }])).success).toBe(false)
    expect(sectionSchema.safeParse(capabilities([{ ...row, seenIn: ['Client Manager'] }])).success).toBe(false)
  })
})

describe('page section reads', () => {
  it('returns visible sections in order and skips hidden ones', async () => {
    await insert(
      hero({ key: 'hero-b', order: 2 }),
      hero({ key: 'hero-a', order: 1 }),
      hero({ key: 'hero-hidden', order: 0, visible: false }),
    )
    const { loadPageSections } = await import('@/lib/content/sections')
    expect((await loadPageSections('home')).map((s) => s.key)).toEqual(['hero-a', 'hero-b'])
  })

  it('returns plain, serializable data', async () => {
    await insert(hero())
    const { loadPageSections } = await import('@/lib/content/sections')
    const [section] = await loadPageSections('home')
    expect(section).not.toHaveProperty('_id')
    expect(JSON.parse(JSON.stringify(section))).toEqual(section)
  })

  it('enforces one section per key on a page', async () => {
    await insert(hero())
    await expect(insert(hero())).rejects.toThrow()
  })
})
