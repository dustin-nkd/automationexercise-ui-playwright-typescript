import { expect, type Locator, type Page } from '@playwright/test';

export class Header {
    readonly homeLink: Locator;
    readonly productsLink: Locator;
    readonly cartLink: Locator;
    readonly signupLoginLink: Locator;
    readonly testCasesLink: Locator;
    readonly contactUsLink: Locator;
    readonly logoutLink: Locator;
    readonly deleteAccountLink: Locator;
    readonly loggedInLabel: Locator;

    constructor(private readonly page: Page) {
        const header = page.locator('header');
        this.homeLink = header.getByRole('link', { name: 'Home' });
        this.productsLink = header.getByRole('link', { name: 'Products' });
        this.cartLink = header.getByRole('link', { name: 'Cart' });
        this.signupLoginLink = header.getByRole('link', { name: 'Signup / Login' });
        this.testCasesLink = header.getByRole('link', { name: 'Test Cases' });
        this.contactUsLink = header.getByRole('link', { name: 'Contact us' });
        this.logoutLink = header.getByRole('link', { name: 'Logout' });
        this.deleteAccountLink = header.getByRole('link', { name: 'Delete Account' });
        this.loggedInLabel = header.getByText(/Logged in as/);
    }

    async gotoHome(): Promise<void> {
        await this.homeLink.click();
    }

    async gotoSignupLogin(): Promise<void> {
        await this.signupLoginLink.click();
    }
    
    async gotoProducts(): Promise<void> {
        await this.productsLink.click();
    }

    async gotoCart(): Promise<void> {
        await this.cartLink.click();
    }

    async gotoContactUs(): Promise<void> {
        await this.contactUsLink.click();
    }


    async gotoTestCases(): Promise<void> {
        await this.testCasesLink.click();
    }

    async logout(): Promise<void> {
        await this.logoutLink.click();
    }

    async deleteAccount(): Promise<void> {
        await this.deleteAccountLink.click();
    }

    async expectLoggedInAs(name: string): Promise<void> {
        await expect(this.loggedInLabel).toBeVisible();
        await expect(this.loggedInLabel).toContainText(name);
    }

    async expectLoggedOut(): Promise<void> {
        await expect(this.signupLoginLink).toBeVisible();
        await expect(this.logoutLink).toHaveCount(0);
    }
}
