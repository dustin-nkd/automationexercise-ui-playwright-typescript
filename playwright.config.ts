import { defineConfig, devices} from '@playwright/test';

export default defineConfig({
    testDir: './tests',
    fullyParallel: true,
    forbidOnly: !!process.env.CI,
    retries: process.env.CI ? 2 : 1,
    workers: process.env.CI ? 1: undefined,
    timeout: 60_000,
    expect: {
        timeout: 10_000,
    },
    reporter: [
        ['line'],
        ['allure-playwright', { resultsDir: './allure-results'}],
    ],
    use: {
        baseURL: 'https://www.automationexercise.com',
        viewport: { width: 1366, height: 768 },
        actionTimeout: 15_000,
        navigationTimeout: 30_000,
        screenshot: 'only-on-failure',
        video: 'retain-on-failure',
        trace: 'on-first-retry'
    },
    projects: [
        {
            name: 'chromium',
            use: { ...devices['Desktop Chrome'] },
        },
    ],
});
