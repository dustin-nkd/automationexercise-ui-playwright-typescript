import { test } from '../../src/fixtures/test';

test('Test Case 8: Verify All Products and product detail page', async ({
    homePage,
    header,
    productsPage,
    productDetailPage,
}) => {
    await test.step('Navigate to url and verify home page is visible', async () => {
        await homePage.open();
        await homePage.expectLoaded();
    });

    await test.step("Click on 'Products' button", async () => {
        await header.gotoProducts();
    });

    await test.step('Verify user is navigated to ALL PRODUCTS page and the list is visible', async () => {
        await productsPage.expectAllProductsVisible();
    });

    await test.step("Click on 'View Product' of first product", async () => {
        await productsPage.openFirstProduct();
    });

    await test.step('Verify product details are visible', async () => {
        await productDetailPage.expectDetailsVisible();
    });
});
