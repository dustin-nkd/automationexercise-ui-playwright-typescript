import { test } from '../../src/fixtures/test';

test('Test Case 10: Verify Subscription in Home page', async ({
    homePage,
    footer,
}) => {
    await test.step('Navigate to url and verify home page is visible', async () => {
        await homePage.open();
        await homePage.expectLoaded();
    });

    await test.step('Scroll down to footer and verify text SUBSCRIPTION', async () => {
        await footer.expectSubscriptionVisible();
    });

    await test.step('Enter email address and click arrow button', async () => {
        await footer.subscribe('subscribe.ae@example.com');
    });

    await test.step("Verify success message 'You have been successfully subscribed!'", async () => {
        await footer.expectSubscribed();
    });
});
