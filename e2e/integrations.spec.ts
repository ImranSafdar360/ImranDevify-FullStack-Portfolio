import { expect, test, type Page } from '@playwright/test'

const NAMES = [
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
]
const strip = (page: Page) => page.getByRole('region', { name: 'Integrated in production' })

test.describe('integrations strip', () => {
  test('sits straight after the hero and labels what the logos mean', async ({ page }) => {
    await page.goto('/')
    await expect(page.getByRole('heading', { level: 2, name: 'Integrated in production' })).toBeVisible()
    // Document order: the hero's <h1> (the name), then this strip, before any other section heading.
    const headings = await page.getByRole('main').getByRole('heading').allInnerTexts()
    expect(headings[0]).toMatch(/Imran\s*Safdar/i)
    expect(headings[1]).toMatch(/integrated in production/i)
  })

  test('announces each integration exactly once (the marquee copies are hidden from assistive tech)', async ({ page }) => {
    await page.goto('/')
    await expect(strip(page).getByRole('listitem')).toHaveText(NAMES)
  })
})

test.describe('integrations strip with reduced motion', () => {
  test.use({ reducedMotion: 'reduce' })

  test('stands still', async ({ page }) => {
    await page.goto('/')
    const track = strip(page).locator('> div').first()
    await track.scrollIntoViewIfNeeded()
    const before = await track.evaluate((el) => getComputedStyle(el).transform)
    await page.waitForTimeout(1200)
    expect(await track.evaluate((el) => getComputedStyle(el).transform)).toBe(before)
  })
})
