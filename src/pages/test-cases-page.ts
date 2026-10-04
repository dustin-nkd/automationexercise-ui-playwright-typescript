import { expect, type Locator, type Page } from '@playwright/test';

export class TestCasesPage {
    readonly heading: Locator;

    constructor(private readonly page: Page) {
        this.heading = page.getByRole('heading', { name: 'Test Cases', exact: true });
    }

    async expectLoaded(): Promise<void> {
        await expect(this.page).toHaveURL(/\/test_cases\/?$/);
        await expect(this.heading).toBeVisible();
    }
}
