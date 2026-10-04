import { test } from '../../src/fixtures/test';
import { buildSignupPayload } from '../../src/data/user-factory';
import { createAccount, deleteAccount } from '../../src/utils/account-api';

test('Test Case 5: Register User with existing email', async ({
    request,
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

        await test.step("Verify 'New User Signup!' is visible", async () => {
            await loginSignupPage.expectSignupFormVisible();
        });

        await test.step('Enter name and already registered email and click Signup', async () => {
            await loginSignupPage.startSignup(user.name, user.email);
        });

        await test.step("Verify error 'Email Address already exist!' is visible", async () => {
            await loginSignupPage.expectEmailAlreadyExists();
        });
    } finally {
        await deleteAccount(request, user.email, user.password);
    }
});
