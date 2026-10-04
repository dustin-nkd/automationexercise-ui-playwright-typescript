import { test, expect } from '../../src/fixtures/test';
import { buildSignupPayload } from '../../src/data/user-factory';
import { createAccount, deleteAccount } from '../../src/utils/account-api';

test('Test Case 4: Logout User', async ({
    request,
    page,
    homePage,
    header,
    loginSignupPage,
}) => {
    const user = buildSignupPayload();
    await createAccount(request, user);

    try {
        await test.step('Navigate to url and verify home page is visible', async () => {
            await homePage.open();
            await homePage.expectLoaded();
        });

        await test.step("Click on 'Signup / Login' button", async () => {
            await header.gotoSignupLogin();
        });

        await test.step("Verify 'Login to your account' is visible", async () => {
            await loginSignupPage.expectLoginFormVisible();
        });

        await test.step('Enter correct email and password and click login', async () => {
            await loginSignupPage.login(user.email, user.password);
        });

        await test.step('Verify that Logged in as username is visible', async () => {
            await header.expectLoggedInAs(user.name);
        });

        await test.step('Click Logout button', async () => {
            await header.logout();
        });

        await test.step("Verify that user is navigated to login page", async () => {
            await expect(page).toHaveURL(/\/login\/?$/);
            await loginSignupPage.expectLoginFormVisible();
        });
    } finally {
        await deleteAccount(request, user.email, user.password);
    }
});
