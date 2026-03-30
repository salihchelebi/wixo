import { expect, test } from '@playwright/test'

test('root shell renders and key bootstrap assets are present', async ({ page }) => {
    const response = await page.goto('/', { waitUntil: 'domcontentloaded' })
    expect(response, 'Preview root should return an HTTP response').not.toBeNull()
    expect(response?.status(), 'Preview root should not error').toBeLessThan(500)

    const root = page.locator('#root')
    await expect(root).toBeVisible()

    await page.waitForFunction(() => {
        const node = document.getElementById('root')
        return Boolean(node && node.childElementCount > 0)
    })

    const scriptCount = await page.locator('script').count()
    expect(scriptCount, 'Expected at least one script tag in preview root HTML').toBeGreaterThan(0)
})
