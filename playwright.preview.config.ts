import { defineConfig } from '@playwright/test'

const baseURL = process.env.PREVIEW_URL || 'http://127.0.0.1:4173'

export default defineConfig({
    testDir: './tests/preview',
    timeout: 60_000,
    expect: {
        timeout: 20_000
    },
    reporter: [['list'], ['html', { outputFolder: 'playwright-report-preview', open: 'never' }]],
    use: {
        baseURL,
        headless: true,
        video: 'on',
        trace: 'retain-on-failure',
        screenshot: 'only-on-failure'
    },
    outputDir: 'test-results/preview'
})
