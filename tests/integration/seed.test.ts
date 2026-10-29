// @vitest-environment node
import mongoose from 'mongoose'
import { MongoMemoryServer } from 'mongodb-memory-server'
import { afterAll, beforeAll, describe, expect, it } from 'vitest'
import { openConnection } from '@/lib/db/connect'
import { ProjectModel } from '@/models/project'
import { SettingsModel } from '@/models/settings'
import { loadSeedFiles, seedContent } from '../../scripts/seed-content'

let server: MongoMemoryServer

beforeAll(async () => {
  server = await MongoMemoryServer.create()
  await openConnection(server.getUri('portfolio-seed-test'))
  await ProjectModel.syncIndexes()
})

afterAll(async () => {
  await mongoose.disconnect()
  await server.stop()
})

describe('seed content', () => {
  it('passes schema validation (every project, block and setting)', async () => {
    const { projects, settings } = await loadSeedFiles()
    expect(projects.length).toBeGreaterThan(0)
    expect(settings.contact.emailHiring).toBe('imransafdar360@gmail.com')
  })

  it('includes the three featured case studies in order', async () => {
    const { projects } = await loadSeedFiles()
    const featured = projects.filter((p) => p.featured && p.status === 'published').sort((a, b) => a.order - b.order)
    expect(featured.map((p) => p.slug)).toEqual(['clientmanager', 'blarecast', 'your-business-date'])
  })

  it('keeps the ownership claims from the profile brief', async () => {
    const { projects } = await loadSeedFiles()
    const ownership = Object.fromEntries(projects.map((p) => [p.slug, p.ownership]))
    expect(ownership).toMatchObject({
      blarecast: 'built-solo',
      'your-business-date': 'built',
      'codebase-cleanup': 'contributed',
      'react-panelist': 'contributed',
      'sit-down-members': 'contributed',
    })
    // The AI assistant is in development and must never be presented as shipped.
    const clientManager = projects.find((p) => p.slug === 'clientmanager')!
    const aiCallout = clientManager.blocks.find((b) => b.type === 'callout')
    expect(aiCallout).toMatchObject({ badge: 'in-development' })
  })

  it('is idempotent: running twice creates no duplicates', async () => {
    const first = await seedContent()
    const second = await seedContent()

    expect(second).toEqual(first)
    expect(await ProjectModel.countDocuments()).toBe(first.projects)
    expect(await SettingsModel.countDocuments()).toBe(1)
  })
})
