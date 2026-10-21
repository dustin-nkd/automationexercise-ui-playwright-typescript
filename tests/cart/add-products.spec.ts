import { test } from '../../src/fixtures/test';

test('Test Case 12: Add Products in Cart', async ({
    homePage,
    header,
    productsPage,
    cartModal,
    cartPage,
}) => {
    await test.step('Navigate to url and verify home page is visible', async () => {
        await homePage.open();
        await homePage.expectLoaded();
    });

    await test.step("Click on 'Products' button", async () => {
        await header.gotoProducts();
        await productsPage.expectAllProductsVisible();
    });

    await test.step('Hover over first product and click Add to cart', async () => {
        await productsPage.addProductByIndex(0);
    });

    await test.step("Click 'Continue Shopping' button", async () => {
        await cartModal.continue();
    });

    await test.step('Hover over second product and click Add to cart', async () => {
        await productsPage.addProductByIndex(1);
    });

    await test.step("Click 'View Cart' button", async () => {
        await cartModal.goToCart();
    });

    await test.step('Verify both products are added to Cart', async () => {
        await cartPage.expectLoaded();
        await cartPage.expectRowCount(2);
    });
});
