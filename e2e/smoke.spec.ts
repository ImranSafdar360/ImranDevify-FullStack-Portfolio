import { expect, test } from '@playwright/test'
import AxeBuilder from '@axe-core/playwright'

test('home page loads without console errors', async ({ page }) => {
  const errors: string[] = []
  page.on('console', (message) => {
    if (message.type() === 'error') errors.push(message.text())
  })
  page.on('pageerror', (error) => errors.push(error.message))

  await page.goto('/')

  await expect(page).toHaveTitle(/Imran Safdar/)
  await expect(page.getByRole('main')).toBeVisible()
  expect(errors).toEqual([])
})

test('home page has no serious accessibility violations', async ({ page }) => {
  await page.goto('/')

  const results = await new AxeBuilder({ page }).analyze()
  const serious = results.violations.filter((v) => v.impact === 'serious' || v.impact === 'critical')

  expect(serious.map((v) => `${v.id}: ${v.help}`)).toEqual([])
})
