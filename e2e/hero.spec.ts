import { expect, test, type Page } from '@playwright/test'

const wordmark = (page: Page) => page.locator('[data-anim="nav-flip"]')

test.describe('home hero', () => {
  test('renders the headline, availability and calls to action from the database', async ({ page }) => {
    await page.goto('/')

    await expect(page.getByRole('heading', { level: 1 })).toHaveText('Full-stack engineer for products that are already live.')
    await expect(wordmark(page)).toHaveText(/Imran\s*Safdar/i)
    await expect(page.getByText('Open to remote roles')).toBeVisible()
    await expect(page.getByRole('main').getByText(/^\d{2}:\d{2}$/)).toBeVisible() // live clock hydrated
    await expect(page.getByRole('link', { name: 'See the case studies' })).toHaveAttribute('href', '#cases')
    await expect(page.getByRole('main').getByRole('link', { name: 'Download resume' })).toHaveAttribute('href', '/resume.pdf')
  })

  test('the wordmark flies into the nav chip on scroll and comes back at the top', async ({ page }) => {
    await page.goto('/')
    await expect(wordmark(page)).toHaveCSS('opacity', '1')

    // The motion layer loads on idle; keep scrolling until the scrubbed handoff has finished.
    await expect(async () => {
      await page.mouse.wheel(0, 400)
      await expect(wordmark(page)).toHaveCSS('opacity', '0', { timeout: 1000 })
    }).toPass({ timeout: 10_000 })

    await page.evaluate(() => window.scrollTo(0, 0))
    await expect(wordmark(page)).toHaveCSS('opacity', '1', { timeout: 5000 })
    await expect(wordmark(page)).toHaveCSS('transform', /^(none|matrix\(1, 0, 0, 1, 0, 0\))$/)
  })

  test('with reduced motion the wordmark stays put and the chip simply appears', async ({ page, isMobile }) => {
    await page.emulateMedia({ reducedMotion: 'reduce' })
    await page.goto('/')
    await page.waitForTimeout(1500) // give the idle-loaded motion layer time to (not) act
    await page.mouse.wheel(0, 400)

    await expect(wordmark(page)).toHaveCSS('opacity', '1')
    expect(await wordmark(page).getAttribute('style')).toBeNull()
    if (!isMobile) await expect(page.getByRole('navigation', { name: 'Main' })).toHaveAttribute('data-state', 'chip')
  })
})
