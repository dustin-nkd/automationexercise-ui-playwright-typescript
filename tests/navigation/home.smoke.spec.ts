import { test } from '../../src/fixtures/test';

test('home page is visible successfully', async ({ homePage }) => {
    await test.step('Navigate to url https://www.automationexercise.com', async () => {
        await homePage.open();
    });

    await test.step('Verify that home page is visible successfully', async () => {
        await homePage.expectLoaded();
    });
});
