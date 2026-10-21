import { expect, type Page } from '@playwright/test';
import { Footer } from '../components/footer';
import { Header } from '../components/header';

export class HomePage {
    readonly header: Header;
    readonly footer: Footer;
    private readonly featuresItems;

    constructor(private readonly page: Page) {
        this.header = new Header(page);
        this.footer = new Footer(page);
        this.featuresItems = page.getByText('Features Items');
    }

    async open(): Promise<void> {
        await this.page.goto('/');
    }

    async expectLoaded(): Promise<void> {
        await expect(this.page).toHaveURL(/automationexercise\.com\/?$/);
        await expect(this.page).toHaveTitle(/Automation Exercise/);
        await expect(this.featuresItems).toBeVisible();
        await expect(this.header.homeLink).toBeVisible();
    }

    async expectRecommendedVisible(): Promise<void> {
        await this.page.getByText('recommended items', { exact: false }).scrollIntoViewIfNeeded();
        await expect(this.page.getByText(/recommended items/i)).toBeVisible();
    }

    async addFirstRecommended(): Promise<void> {
        const item = this.page.locator('#recommended-item-carousel .product-image-wrapper').first();
        await item.hover();
        await item.locator('.add-to-cart').click();
    }
}