import { test } from '../../src/fixtures/test';

test('Test Case 22: Add to cart from recommended items', async ({
    homePage,
    cartModal,
    cartPage,
}) => {
    await test.step('Navigate to url and verify home page is visible', async () => {
        await homePage.open();
        await homePage.expectLoaded();
    });

    await test.step('Scroll to bottom of page', async () => {
        await homePage.expectRecommendedVisible();
    });

    await test.step("Click on 'Add To Cart' on Recommended product", async () => {
        await homePage.addFirstRecommended();
    });

    await test.step("Click on 'View Cart' button", async () => {
        await cartModal.goToCart();
    });

    await test.step('Verify that product is displayed in cart page', async () => {
        await cartPage.expectLoaded();
        await cartPage.expectRowCount(1);
    });
});
