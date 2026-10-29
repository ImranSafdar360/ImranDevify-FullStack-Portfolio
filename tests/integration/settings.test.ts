// @vitest-environment node
import mongoose from 'mongoose'
import { MongoMemoryServer } from 'mongodb-memory-server'
import { afterAll, beforeAll, beforeEach, describe, expect, it, vi } from 'vitest'
import { DEFAULT_SETTINGS, settingsSchema } from '@/schemas/settings'

vi.mock('next/cache', () => ({ cacheLife: vi.fn(), cacheTag: vi.fn() }))

let server: MongoMemoryServer

beforeAll(async () => {
  server = await MongoMemoryServer.create()
  process.env.MONGODB_URI = server.getUri('portfolio-test')
})

afterAll(async () => {
  await mongoose.disconnect()
  await server.stop()
})

beforeEach(async () => {
  const { connectDb } = await import('@/lib/db/mongoose')
  await connectDb()
  await mongoose.connection.db?.dropDatabase()
})

describe('settings schema', () => {
  it('fills every field from the profile brief when nothing is saved', () => {
    expect(DEFAULT_SETTINGS.contact.emailHiring).toBe('imransafdar360@gmail.com')
    expect(DEFAULT_SETTINGS.contact.timeZone).toBe('Asia/Karachi')
    expect(DEFAULT_SETTINGS.availability.label).toBe('Open to remote roles')
  })

  it('merges a partial save with defaults', () => {
    const parsed = settingsSchema.parse({ availability: { label: 'Booked until December' } })
    expect(parsed.availability.label).toBe('Booked until December')
    expect(parsed.availability.open).toBe(true)
    expect(parsed.contact.emailProjects).toBe('imranguru360@gmail.com')
  })

  it('rejects invalid emails and links', () => {
    expect(settingsSchema.safeParse({ contact: { emailHiring: 'not-an-email' } }).success).toBe(false)
    expect(settingsSchema.safeParse({ links: { github: 'github' } }).success).toBe(false)
  })
})

describe('loadSettings', () => {
  it('returns the defaults when the collection is empty', async () => {
    const { loadSettings } = await import('@/lib/content/settings')
    await expect(loadSettings()).resolves.toEqual(DEFAULT_SETTINGS)
  })

  it('returns saved values as plain data (no Mongoose documents or ObjectIds)', async () => {
    const { SettingsModel } = await import('@/models/settings')
    await SettingsModel.create({ key: 'site', value: { availability: { open: false, label: 'Not taking work' } } })

    const { loadSettings } = await import('@/lib/content/settings')
    const settings = await loadSettings()

    expect(settings.availability).toEqual({ open: false, label: 'Not taking work', note: 'Start: immediately' })
    expect(Object.getPrototypeOf(settings)).toBe(Object.prototype)
    expect(JSON.parse(JSON.stringify(settings))).toEqual(settings)
  })

  it('reuses one connection across calls', async () => {
    const { connectDb } = await import('@/lib/db/mongoose')
    const [a, b] = await Promise.all([connectDb(), connectDb()])
    expect(a).toBe(b)
  })
})
