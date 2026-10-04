import { test } from '../../src/fixtures/test';
import { buildSignupPayload } from '../../src/data/user-factory';
import { createAccount } from '../../src/utils/account-api';

test('Test Case 2: Login User with correct email and password', async ({
    request,
    homePage,
    header,
    loginSignupPage,
    accountDeletedPage,
}) => {
    const user = buildSignupPayload();
    await createAccount(request, user);

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

    await test.step('Enter correct email address and password and click login', async () => {
        await loginSignupPage.login(user.email, user.password);
    });

    await test.step('Verify that Logged in as username is visible', async () => {
        await header.expectLoggedInAs(user.name);
    });

    await test.step("Click 'Delete Account' and verify 'ACCOUNT DELETED!'", async () => {
        await header.deleteAccount();
        await accountDeletedPage.expectLoaded();
    });
});
