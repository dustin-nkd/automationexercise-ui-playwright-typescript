import { test as base, expect } from '@playwright/test';
import { Footer } from '../components/footer';
import { Header } from '../components/header';
import { HomePage } from '../pages/home-page';
import { attachAdsBlocker } from '../utils/ads-blocker';
import { LoginSignupPage } from '../pages/login-signup-page';

type AppFixtures = {
    header: Header;
    footer: Footer;
    homePage: HomePage;
    loginSignupPage: LoginSignupPage;
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

    loginSignupPage: async( { page }, use) => {
        await use(new LoginSignupPage(page));
    }
});

export { expect };
