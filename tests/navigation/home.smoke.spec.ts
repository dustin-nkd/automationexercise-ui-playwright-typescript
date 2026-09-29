import { test, expect } from '../../src/fixtures/test';

test('home page is visible successfully', async ({ page }) => {
    await test.step('Navigate to url https://www.automationexercise.com', async () => {
        await page.goto('/');
    });

    await test.step('Verify that home page is visible sucessfully', async () => {
        await expect(page).toHaveURL(/automationexercise\.com\/?$/);
        await expect(page).toHaveTitle(/Automation Exercise/);
        await expect(page.getByRole('link', { name: 'Home'})).toBeVisible();
        await expect(page.getByText('Features Items')).toBeVisible();
    });
});
