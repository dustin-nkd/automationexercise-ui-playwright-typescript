import { test } from '../../src/fixtures/test';

test('Test Case 17: Remove Products From Cart', async ({
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

    await test.step('Add Products to cart', async () => {
        await header.gotoProducts();
        await productsPage.addProductByIndex(0);
        await cartModal.goToCart();
    });

    await test.step('Verify that cart page is displayed', async () => {
        await cartPage.expectLoaded();
    });

    await test.step("Click 'X' button corresponding to particular product", async () => {
        await cartPage.removeProduct('Blue Top');
    });

    await test.step('Verify that product is removed from the cart', async () => {
        await cartPage.expectEmpty();
    });
});
