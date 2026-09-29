import { test as base, expect } from '@playwright/test';
import { attachAdsBlocker } from '../utils/ads-blocker';

export const test = base.extend({
    page: async ({ page }, use) => {
        await attachAdsBlocker(page);

        // Site uses native confirm() on Contact Us. Accept centrally so specs
        // do not each register a one-off dialog listener.
        page.on('dialog', async (dialog) => {
            await dialog.accept();
        });

        await use(page);
    },
});

export { expect};
