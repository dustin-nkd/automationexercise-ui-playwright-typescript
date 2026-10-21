import { expect, type Locator, type Page } from '@playwright/test';

export class CartPage {
    readonly rows: Locator;

    constructor(private readonly page: Page) {
        this.rows = page.locator('#cart_info tbody tr');
    }

    async expectLoaded(): Promise<void> {
        await expect(this.page).toHaveURL(/\/view_cart\/?$/);
        await expect(this.rows.first()).toBeVisible();
    }

    async expectProduct(name: string): Promise<void> {
        await expect(this.page.getByRole('row', { name })).toBeVisible();
    }

    async expectQuantity(name: string, quantity: string): Promise<void> {
        const row = this.page.getByRole('row', { name });
        await expect(row.getByRole('button', { name: quantity })).toBeVisible();
    }

    async removeProduct(name: string): Promise<void> {
        const row = this.page.getByRole('row', { name });
        await expect(async () => {
            await row.locator('.cart_quantity_delete').click();
            await expect(row).toHaveCount(0, { timeout: 3000 });
        }).toPass();
    }

    async expectEmpty(): Promise<void> {
        await expect(this.page.getByText('Cart is empty!')).toBeVisible();
    }

    async expectRowCount(count: number): Promise<void> {
        await expect(this.rows).toHaveCount(count);
    }
}
