import { test } from '../../src/fixtures/test';

test('Test Case 9: Search Product', async ({
    homePage,
    header,
    productsPage,
}) => {
    const productName = 'Blue Top';

    await test.step('Navigate to url and verify home page is visible', async () => {
        await homePage.open();
        await homePage.expectLoaded();
    });

    await test.step("Click on 'Products' button", async () => {
        await header.gotoProducts();
    });

    await test.step('Verify user is navigated to ALL PRODUCTS page', async () => {
        await productsPage.expectAllProductsVisible();
    });

    await test.step('Enter product name in search input and click search button', async () => {
        await productsPage.search(productName);
    });

    await test.step('Verify SEARCHED PRODUCTS is visible and products related to search are visible', async () => {
        await productsPage.expectSearchResult(productName);
    });
});
