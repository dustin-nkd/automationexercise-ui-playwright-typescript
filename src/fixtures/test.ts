import { test as base, expect } from '@playwright/test';
import { Footer } from '../components/footer';
import { Header } from '../components/header';
import { HomePage } from '../pages/home-page';
import { attachAdsBlocker } from '../utils/ads-blocker';
import { LoginSignupPage } from '../pages/login-signup-page';
import { SignupPage } from '../pages/signup-page';
import { AccountCreatedPage } from '../pages/account-created-page';
import { AccountDeletedPage } from '../pages/account-deleted-page';
import { ContactUsPage } from '../pages/contact-us-page';
import { TestCasesPage } from '../pages/test-cases-page';
import { ProductDetailPage } from '../pages/product-detail-page';
import { ProductsPage } from '../pages/products-page';

type AppFixtures = {
    header: Header;
    footer: Footer;
    homePage: HomePage;
    loginSignupPage: LoginSignupPage;
    signupPage: SignupPage;
    accountCreatedPage: AccountCreatedPage;
    accountDeletedPage: AccountDeletedPage;
    contactUsPage: ContactUsPage;
    testCasesPage: TestCasesPage;
    productDetailPage: ProductDetailPage;
    productsPage: ProductsPage;
};

export const test = base.extend<AppFixtures>({
    page: async ({ page }, use) => {
        await attachAdsBlocker(page);
        page.on('dialog', async (dialog) => {
            await dialog.accept();
        });
        await use(page);
    },

    header: async ({ page }, use) => {
        await use(new Header(page));
    },

    footer: async ({ page }, use) => {
        await use(new Footer(page));
    },

    homePage: async ({ page }, use) => {
        await use(new HomePage(page));
    },

    loginSignupPage: async ({ page }, use) => {
        await use(new LoginSignupPage(page));
    },

    signupPage: async ({ page }, use) => {
        await use(new SignupPage(page));
    },

    accountCreatedPage: async ({ page }, use) => {
        await use(new AccountCreatedPage(page));
    },

    accountDeletedPage: async ({ page }, use) => {
        await use(new AccountDeletedPage(page));
    },

    contactUsPage: async ({ page }, use) => {
        await use(new ContactUsPage(page));
    },

    testCasesPage: async ({ page }, use) => {
        await use(new TestCasesPage(page));
    },

    productDetailPage: async ({ page }, use) => {
        await use(new ProductDetailPage(page));
    },

    productsPage: async ({ page }, use) => {
        await use(new ProductsPage(page));
    },
});

export { expect };
