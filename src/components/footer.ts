import { expect, type Locator, type Page } from '@playwright/test';

export class Footer {
    readonly subscriptionHeading: Locator;
    readonly subscriptionEmail: Locator;
    readonly subscriptionButton: Locator;
    readonly successMessage: Locator;

    constructor(private readonly page: Page) {
        this.subscriptionHeading = page.getByText('Subscription', { exact: true });
        this.subscriptionEmail = page.getByPlaceholder('Your email address');
        this.subscriptionButton = page.locator('#subscribe');
        this.successMessage = page.locator('#success-subscribe');
    }

    async expectSubscriptionVisible(): Promise<void> {
        await this.subscriptionHeading.scrollIntoViewIfNeeded();
        await expect(this.subscriptionHeading).toBeVisible();
        await expect(this.subscriptionEmail).toBeVisible();
        await expect(this.subscriptionButton).toBeVisible();
    }

    async subscribe(email: string): Promise<void> {
        await this.subscriptionEmail.scrollIntoViewIfNeeded();
        await this.subscriptionEmail.fill(email);
        await this.subscriptionButton.click();
    }

    async expectSubscribed(): Promise<void> {
        await expect(this.successMessage).toBeVisible();
        await expect(this.successMessage).toContainText('You have been successfully subscribed!');
    }
}
