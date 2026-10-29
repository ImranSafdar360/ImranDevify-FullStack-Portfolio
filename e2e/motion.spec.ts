import { expect, test, type Page } from '@playwright/test'

const revealTarget = (page: Page) => page.getByText('Slide-in reveal')

// The motion layer loads on idle; once it has run, below-the-fold targets are hidden waiting for their reveal.
async function waitForMotionEngine(page: Page) {
  await expect(revealTarget(page)).toHaveCSS('opacity', '0', { timeout: 5000 })
}

test.describe('motion system', () => {
  test('below-the-fold content is hidden first, then revealed when scrolled into view', async ({ page }) => {
    await page.goto('/styleguide')
    await waitForMotionEngine(page)

    await revealTarget(page).scrollIntoViewIfNeeded()
    await expect(revealTarget(page)).toHaveCSS('opacity', '1', { timeout: 5000 })
  })

  test('with reduced motion, content is visible immediately and nothing is split', async ({ page }) => {
    await page.emulateMedia({ reducedMotion: 'reduce' })
    await page.goto('/styleguide')
    await page.waitForTimeout(1500) // give the idle-loaded motion layer time to (not) act
    await expect(revealTarget(page)).toHaveCSS('opacity', '1')
    await expect(page.locator('#sg-motion')).toHaveText('Live products. Real users.')
  })

  test('client-side navigation away and back re-arms reveals without console errors', async ({ page }) => {
    const errors: string[] = []
    page.on('console', (m) => m.type() === 'error' && errors.push(m.text()))
    page.on('pageerror', (e) => errors.push(e.message))

    await page.goto('/styleguide')
    await waitForMotionEngine(page)

    // Footer links are Next <Link>s: this is an in-app navigation, not a document load.
    await page.getByRole('contentinfo').getByRole('link', { name: 'Work' }).click()
    await expect(page).toHaveURL(/\/work$/)
    await page.goBack()
    await expect(page).toHaveURL(/\/styleguide$/)

    // Back restores the scroll position near the footer, so the target sits above the viewport: the re-armed
    // engine replays its reveal at once. Fresh DOM + GSAP inline styles = the engine ran again after navigation.
    await expect(revealTarget(page)).toHaveAttribute('style', /opacity/, { timeout: 5000 })
    await expect(revealTarget(page)).toHaveCSS('opacity', '1', { timeout: 5000 })
    expect(await page.evaluate(() => window.scrollY)).toBeGreaterThan(0) // scroll restoration kept
    expect(errors).toEqual([])
  })
})
