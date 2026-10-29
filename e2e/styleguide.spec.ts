import { expect, test } from '@playwright/test'
import AxeBuilder from '@axe-core/playwright'

test.describe('styleguide', () => {
  test('is hidden from search engines', async ({ page }) => {
    await page.goto('/styleguide')
    await expect(page.locator('meta[name="robots"]')).toHaveAttribute('content', /noindex/)
  })

  test('has no serious accessibility violations', async ({ page }) => {
    await page.goto('/styleguide')
    const results = await new AxeBuilder({ page }).analyze()
    const serious = results.violations.filter((v) => v.impact === 'serious' || v.impact === 'critical')
    expect(serious.map((v) => `${v.id}: ${v.help}`)).toEqual([])
  })

  test('script labels keep the wiggle filter only when motion is allowed', async ({ page }) => {
    await page.goto('/styleguide')
    const label = page.getByText('Internal only')
    await expect(label).toHaveCSS('filter', /url/)

    await page.emulateMedia({ reducedMotion: 'reduce' })
    await expect(label).toHaveCSS('filter', 'none')
  })
})
