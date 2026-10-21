import { test } from '../../src/fixtures/test';

test('Test Case 13: Verify Product quantity in Cart', async ({
    homePage,
    productsPage,
    productDetailPage,
    cartModal,
    cartPage,
}) => {
    await test.step('Navigate to url and verify home page is visible', async () => {
        await homePage.open();
        await homePage.expectLoaded();
    });

    await test.step("Click 'View Product' for any product on home page", async () => {
        await productsPage.openFirstProduct();
        await productDetailPage.expectDetailsVisible();
    });

    await test.step('Increase quantity to 4', async () => {
        await productDetailPage.setQuantity(4);
    });

    await test.step("Click 'Add to cart' button", async () => {
        await productDetailPage.addToCart();
    });

    await test.step("Click 'View Cart' button", async () => {
        await cartModal.goToCart();
    });

    await test.step('Verify that product is displayed in cart page with exact quantity', async () => {
        await cartPage.expectLoaded();
        await cartPage.expectQuantity('Blue Top', '4');
    });
});
