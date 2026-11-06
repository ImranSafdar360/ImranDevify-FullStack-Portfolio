import { expect, test } from '@playwright/test'

test.describe('home hero', () => {
  test('renders the name, value proposition, availability and calls to action', async ({ page }) => {
    await page.goto('/')

    // The name is the H1; the value proposition reads as the prominent subhead.
    await expect(page.getByRole('heading', { level: 1 })).toHaveText(/Imran\s*Safdar/i)
    await expect(page.getByText('Full-stack engineer for products that are already live.')).toBeVisible()

    await expect(page.getByText('Open to remote roles')).toBeVisible()
    await expect(page.getByRole('main').getByText(/^\d{2}:\d{2}$/)).toBeVisible() // live clock hydrated

    await expect(page.getByRole('main').getByRole('link', { name: /See the case studies/ })).toHaveAttribute('href', '#cases')
    await expect(page.getByRole('main').getByRole('link', { name: /Download resume/i })).toHaveAttribute('href', '/resume.pdf')
  })
})
