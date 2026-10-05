import { expect, type Locator, type Page } from '@playwright/test';

export class AccountCreatedPage {
    readonly heading: Locator;
    readonly continueButton: Locator;

    constructor(private readonly page: Page) {
        this.heading = page.getByText('ACCOUNT CREATED!');
        this.continueButton = page.getByRole('link', { name: 'Continue' });
    }

    async expectLoaded(): Promise<void> {
        await expect(this.heading).toBeVisible();
    }

    async continue(): Promise<void> {
        await this.continueButton.click();
    }
}
