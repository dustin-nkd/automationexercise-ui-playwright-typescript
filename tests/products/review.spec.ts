import { test } from '../../src/fixtures/test';

test('Test Case 21: Add review on product', async ({
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

    await test.step('Verify user is navigated to ALL PRODUCTS page', async () => {
        await productsPage.expectAllProductsVisible();
    });

    await test.step("Click on 'View Product' button", async () => {
        await productsPage.openFirstProduct();
    });

    await test.step("Verify 'Write Your Review' is visible", async () => {
        await productDetailPage.expectReviewFormVisible();
    });

    await test.step('Enter name, email, review and click submit', async () => {
        await productDetailPage.submitReview(
            'John Doe',
            'john.doe@example.com',
            'Good product for practice automation.'
        );
    });

    await test.step("Verify success message 'Thank you for your review.'", async () => {
        await productDetailPage.expectReviewSubmitted();
    });
});
