import { expect, type Locator, type Page} from '@playwright/test';

export class Footer {
    readonly subscriptionHeading: Locator;
    readonly subscriptionEmail: Locator;
    readonly subscriptionButton: Locator;

    constructor(private readonly page: Page) {
        this.subscriptionHeading = page.getByText('Subscription', { exact: true });
        this.subscriptionEmail = page.getByPlaceholder('Your email address');
        this.subscriptionButton = page.getByRole('button', { name: 'Subscribe' });
    }

    async expectSubscriptionVisible(): Promise<void> {
        await expect(this.subscriptionHeading).toBeVisible();
        await expect(this.subscriptionEmail).toBeVisible();
        await expect(this.subscriptionButton).toBeVisible();
    }
}
