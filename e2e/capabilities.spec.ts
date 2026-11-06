import { expect, test, type Page } from '@playwright/test'

const CASE_STUDIES = ['/work/clientmanager', '/work/blarecast', '/work/your-business-date']
const LINES = ['Live products.', 'Real users.', 'Real consequences.']
const section = (page: Page) => page.locator('#capabilities')
const headline = (page: Page) => section(page).getByRole('heading', { level: 2 })
const items = (page: Page) => section(page).locator('ol > li')
const panel = (page: Page) => section(page).locator('[data-capability-panel]')

async function centre(page: Page, index: number) {
  await items(page)
    .nth(index)
    .evaluate((el) => el.scrollIntoView({ block: 'center' }))
}

test.describe('what I build', () => {
  test('opens with the statement as its headline, explained right beside it', async ({ page }) => {
    await page.goto('/')
    await headline(page).evaluate((el) => el.scrollIntoView({ block: 'center' }))
    // The outline copies are aria-hidden, so the heading reads each line exactly once.
    await expect(headline(page)).toHaveAccessibleName(LINES.join(' '))
    await expect(section(page).getByText('That changes how carefully you build.')).toBeVisible()
    await expect(section(page).getByText(/What I.m good at/i)).toBeVisible()
  })

  test('the headline reveal ends fully solid ("blueprint becomes real")', async ({ page }) => {
    await page.goto('/')
    await headline(page).evaluate((el) => el.scrollIntoView({ block: 'center' }))
    for (const outline of await headline(page).locator('[data-outline]').all()) {
      await expect(outline).toHaveCSS('opacity', '0', { timeout: 8_000 })
    }
  })

  test('lists the six capabilities from the DB, each backed by a case-study link', async ({ page }) => {
    await page.goto('/')
    await expect(items(page)).toHaveCount(6)
    await expect(items(page).getByRole('heading', { level: 3 })).toHaveText([
      /Payments & invoicing/i,
      /Forms, bookings & checkout/i,
      /Real-time features/i,
      /Auth, roles & access/i,
      /Mobile apps/i,
      /AI agents/i,
    ])
    for (const item of await items(page).all()) {
      const hrefs = await item.getByRole('link').evaluateAll((as) => as.map((a) => a.getAttribute('href')))
      expect(hrefs.length).toBeGreaterThan(0)
      for (const href of hrefs) expect(CASE_STUDIES).toContain(href)
    }
  })

  test('flags only the AI agents capability as in development', async ({ page }) => {
    await page.goto('/')
    const ai = items(page).filter({ has: page.getByRole('heading', { name: 'AI agents' }) })
    await expect(ai.getByText('In development', { exact: true })).toBeVisible()
    await expect(items(page).getByText('In development', { exact: true })).toHaveCount(1)
  })

  test('reads each proof once: the facts live in the list, the sticky panel is hidden from assistive tech', async ({ page }) => {
    await page.goto('/')
    const fact = /^Stripe subscriptions in Your Business Date$/
    await expect(panel(page)).toHaveAttribute('aria-hidden', 'true')
    // Role queries skip aria-hidden subtrees, so this counts only what assistive tech can reach.
    await expect(page.getByRole('main').getByRole('listitem').filter({ hasText: fact })).toHaveCount(1)
  })
})

test.describe('what I build: sticky panel (desktop)', () => {
  test.skip(({ isMobile }) => isMobile, 'the sticky panel is a desktop layout; phones show the proof inline')

  test('the panel follows scroll, one capability at a time, and stays in view', async ({ page }) => {
    await page.goto('/')
    // From the second capability on, the panel is pinned (before that it travels up with the list into place).
    await centre(page, 1)
    const shell = panel(page).locator('> div').first()
    const pinnedTop = (await shell.boundingBox())!.y

    for (const [index, counter] of [
      [2, '03 / 06'],
      [4, '05 / 06'],
    ] as const) {
      await centre(page, index)
      await expect(items(page).nth(index)).toHaveAttribute('data-active', 'true')
      const shown = panel(page).locator('[data-active="true"]')
      await expect(shown).toHaveCount(1)
      await expect(shown).toContainText(counter)
      // Sticky: the panel holds the same place on screen while the list scrolls past it.
      expect(Math.abs((await shell.boundingBox())!.y - pinnedTop)).toBeLessThan(4)
    }
  })
})

test.describe('what I build on phones', () => {
  test.skip(({ isMobile }) => !isMobile, 'phone layout')

  test('shows each proof inline under its capability, with no sticky panel', async ({ page }) => {
    await page.goto('/')
    await centre(page, 0)
    await expect(items(page).first().getByText('payment providers behind one payment system')).toBeVisible()
    await expect(panel(page)).toBeHidden()
  })
})

test.describe('what I build with reduced motion', () => {
  test.use({ reducedMotion: 'reduce' })

  test('shows the solid headline at once, with no outline and no clipping', async ({ page }) => {
    await page.goto('/')
    await headline(page).evaluate((el) => el.scrollIntoView({ block: 'center' }))
    for (const fill of await headline(page).locator('[data-fill]').all()) {
      await expect(fill).toHaveCSS('clip-path', 'none')
    }
    for (const outline of await headline(page).locator('[data-outline]').all()) {
      await expect(outline).toHaveCSS('opacity', '0')
    }
  })
})
