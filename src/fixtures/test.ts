import { test as base, expect } from '@playwright/test';
import { Footer } from '../components/footer';
import { Header } from '../components/header';
import { HomePage } from '../pages/home-page';
import { attachAdsBlocker } from '../utils/ads-blocker';

type AppFixtures = {
    header: Header;
    footer: Footer;
    homePage: HomePage;
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
    }
});

export { expect };
