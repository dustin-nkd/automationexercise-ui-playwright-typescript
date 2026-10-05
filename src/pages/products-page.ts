import { expect, type Locator, type Page } from '@playwright/test';

export class ProductsPage {
    readonly heading: Locator;
    readonly searchInput: Locator;
    readonly searchButton: Locator;
    readonly searchHeading: Locator;
    readonly viewProductLinks: Locator;

    constructor(private readonly page: Page) {
        this.heading = page.getByRole('heading', { name: 'All Products' });
        this.searchInput = page.getByPlaceholder('Search Product');
        // Search control is an icon button without an accessible name.
        this.searchButton = page.locator('#submit_search');
        this.searchHeading = page.getByRole('heading', { name: 'Searched Products' });
        this.viewProductLinks = page.getByRole('link', { name: 'View Product' });
    }

    async expectAllProductsVisible(): Promise<void> {
        await expect(this.page).toHaveURL(/\/products$/);
        await expect(this.heading).toBeVisible();
        await expect(this.viewProductLinks.first()).toBeVisible();
    }

    async openFirstProduct(): Promise<void> {
        await this.viewProductLinks.first().click();
    }

    async search(productName: string): Promise<void> {
        await this.searchInput.fill(productName);
        await this.searchButton.click();
    }

    async expectSearchResult(productName: string): Promise<void> {
        await expect(this.searchHeading).toBeVisible();
        await expect(this.page.getByText(productName).first()).toBeVisible();
    }
}
