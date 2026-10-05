import { expect, type Locator, type Page } from '@playwright/test';

export class ProductDetailPage {
    readonly name: Locator;
    readonly category: Locator;
    readonly price: Locator;
    readonly availability: Locator;
    readonly condition: Locator;
    readonly brand: Locator;
    readonly reviewHeading: Locator;
    readonly reviewName: Locator;
    readonly reviewEmail: Locator;
    readonly reviewText: Locator;
    readonly reviewSubmit: Locator;
    readonly reviewSuccess: Locator;

    constructor(private readonly page: Page) {
        this.name = page.locator('.product-information h2');
        this.category = page.getByText(/Category:/);
        this.price = page.locator('.product-information span span');
        this.availability = page.getByText(/Availability:/);
        this.condition = page.getByText(/Condition:/);
        this.brand = page.getByText(/Brand:/);
        this.reviewHeading = page.getByText('Write Your Review');
        this.reviewName = page.getByPlaceholder('Your Name');
        this.reviewEmail = page.getByPlaceholder('Email Address', { exact: true });
        this.reviewText = page.getByPlaceholder('Add Review Here!');
        this.reviewSubmit = page.getByRole('button', { name: 'Submit' });
        this.reviewSuccess = page.getByText('Thank you for your review.');
    }

    async expectDetailsVisible(): Promise<void> {
        await expect(this.page).toHaveURL(/\/product_details\/\d+/);
        await expect(this.name).toBeVisible();
        await expect(this.category).toBeVisible();
        await expect(this.price).toBeVisible();
        await expect(this.availability).toBeVisible();
        await expect(this.condition).toBeVisible();
        await expect(this.brand).toBeVisible();
    }

    async expectReviewFormVisible(): Promise<void> {
        await expect(this.reviewHeading).toBeVisible();
    }

    async submitReview(name: string, email: string, review: string): Promise<void> {
        await this.reviewName.fill(name);
        await this.reviewEmail.fill(email);
        await this.reviewText.fill(review);
        await this.reviewSubmit.click();
    }

    async expectReviewSubmitted(): Promise<void> {
        await expect(this.reviewSuccess).toBeVisible();
    }
}
