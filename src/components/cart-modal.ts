import { expect, type Locator, type Page } from '@playwright/test';

export class CartModal {
    readonly continueShopping: Locator;
    readonly viewCart: Locator;

    constructor(private readonly page: Page) {
        this.continueShopping = page.getByRole('button', { name: 'Continue Shopping' });
        this.viewCart = page.locator('#cartModal').getByRole('link', { name: 'View Cart' });
    }

    async expectVisible(): Promise<void> {
        await expect(this.viewCart).toBeVisible();
    }

    async continue(): Promise<void> {
        await this.expectVisible();
        await this.continueShopping.click();
    }

    async goToCart(): Promise<void> {
        await this.expectVisible();
        await this.viewCart.click();
    }
}
