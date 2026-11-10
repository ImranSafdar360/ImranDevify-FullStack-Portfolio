// @vitest-environment node
import mongoose from 'mongoose'
import { MongoMemoryServer } from 'mongodb-memory-server'
import { afterAll, beforeAll, describe, expect, it } from 'vitest'
import { openConnection } from '@/lib/db/connect'
import { ProjectModel } from '@/models/project'
import { SectionModel } from '@/models/section'
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
    expect(await SectionModel.countDocuments()).toBe(first.sections)
    expect(await SettingsModel.countDocuments()).toBe(1)
  })

  it('seeds the home hero with the approved headline', async () => {
    const { sections } = await loadSeedFiles()
    const hero = sections.find((s) => s.page === 'home' && s.type === 'hero')
    if (hero?.type !== 'hero') throw new Error('hero section missing')
    expect(hero.content.headline).toBe('Full-stack engineer for products that are already live.')
  })

  it('lists only integrations verified in the profile brief, straight after the hero', async () => {
    const { sections } = await loadSeedFiles()
    const strip = sections.find((s) => s.page === 'home' && s.type === 'integrations')
    if (strip?.type !== 'integrations') throw new Error('integrations section missing')
    // 01 §5–6: the five payment providers (Venmo via Braintree), Agora + Socket.io, Supabase + Firebase, Google/Apple sign-in.
    expect(strip.content.items.map((i) => i.name)).toEqual([
      'Stripe',
      'PayPal',
      'Square',
      'Authorize.Net',
      'Braintree · Venmo',
      'Agora',
      'Socket.io',
      'Supabase',
      'Firebase',
      'Google Sign-In',
      'Sign in with Apple',
    ])
    const home = sections.filter((s) => s.page === 'home').sort((a, b) => a.order - b.order)
    expect(home.slice(0, 2).map((s) => s.type)).toEqual(['hero', 'integrations'])
  })

  it('gives every integration a real brand mark, except the two shown without one', async () => {
    const { BRAND_ICONS } = await import('@/features/home/integrations/brand-icons')
    const { sections } = await loadSeedFiles()
    const strip = sections.find((s) => s.type === 'integrations')
    if (strip?.type !== 'integrations') throw new Error('integrations section missing')
    const withoutMark = strip.content.items.filter((i) => !i.icon || !(i.icon in BRAND_ICONS))
    // Authorize.Net has no published mark (neutral card glyph); Agora's mark is a wordmark (name only).
    expect(withoutMark).toEqual([
      { name: 'Authorize.Net', icon: 'card' },
      { name: 'Agora' },
    ])
  })

  it('opens the capabilities with the decided statement, each line backed by evidence from the brief', async () => {
    const { sections } = await loadSeedFiles()
    const capabilities = sections.find((s) => s.page === 'home' && s.type === 'capabilities')
    if (capabilities?.type !== 'capabilities') throw new Error('capabilities section missing')
    expect(capabilities.content.intro).toEqual({
      lines: ['Live products.', 'Real users.', 'Real consequences.'],
      // 01 §5 ("It is live, with real users"; "agencies, freelancers, and businesses … the whole client lifecycle")
      // and 01 §1–2 ("work where mistakes cost money or trust"; "money, access, and live data").
      notes: [
        'ClientManager is a production SaaS, live with real users',
        'Agencies, freelancers and businesses run their whole client lifecycle on it',
        'My work sits where mistakes cost money or trust: payments, access and live data',
      ],
      accentLine: 2,
      annotation: 'Most of my work is inside products people already pay for. That changes how carefully you build.',
      scriptLabel: 'Why it matters',
    })
  })

  it('backs every capability with published projects ("Seen in" links resolve)', async () => {
    const { sections, projects } = await loadSeedFiles()
    const capabilities = sections.find((s) => s.page === 'home' && s.type === 'capabilities')
    if (capabilities?.type !== 'capabilities') throw new Error('capabilities section missing')

    const published = new Set(projects.filter((p) => p.status === 'published').map((p) => p.slug))
    expect(capabilities.content.rows).toHaveLength(6)
    for (const row of capabilities.content.rows) {
      for (const slug of row.seenIn) expect(published, `${row.title} → ${slug}`).toContain(slug)
    }
  })

  it('backs every capability with a proof, and never presents the AI agents as released', async () => {
    const { sections } = await loadSeedFiles()
    const capabilities = sections.find((s) => s.type === 'capabilities')
    if (capabilities?.type !== 'capabilities') throw new Error('capabilities section missing')
    for (const row of capabilities.content.rows) expect(row.proof?.points.length, row.title).toBeGreaterThan(0)

    const ai = capabilities.content.rows.find((r) => r.title === 'AI agents')
    expect(ai?.proof?.points).toContain('In development on a dev branch, not released yet')
    // Payments: the five providers from 01 §5 (Venmo via Braintree).
    const payments = capabilities.content.rows.find((r) => r.title === 'Payments & invoicing')
    expect(payments?.proof?.figure?.value).toBe('5')
    expect(payments?.proof?.marks.map((m) => m.name)).toEqual(['Stripe', 'PayPal', 'Square', 'Authorize.Net', 'Braintree · Venmo'])
  })

  it('marks only the AI agents capability as in development', async () => {
    const { sections } = await loadSeedFiles()
    const capabilities = sections.find((s) => s.type === 'capabilities')
    if (capabilities?.type !== 'capabilities') throw new Error('capabilities section missing')
    const inDevelopment = capabilities.content.rows.filter((r) => r.inDevelopment).map((r) => r.title)
    expect(inDevelopment).toEqual(['AI agents'])
  })
})
