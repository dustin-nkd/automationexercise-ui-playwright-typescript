import { type Page } from "@playwright/test";

const AD_URL_FRAGMENTS = [
    'googlesyndication.com',
    'googleads.g.doubleclick.net',
    'doubleclick.net',
    'adservice.google',
    'pagead2.googlesyndication.com',
    'adsystem.com',
] as const;

function isAdRequest(url: string): boolean {
    return AD_URL_FRAGMENTS.some((fragment) => url.includes(fragment));
}

// Central ads control. Fixtures call this once per page. Specs never route() themselves.
export async function attachAdsBlocker(page: Page): Promise<void> {
    await page.route('**/*', async (route) => {
        if (isAdRequest(route.request().url())) {
            await route.abort();
            return;
        }
        await route.continue();
    });
}
