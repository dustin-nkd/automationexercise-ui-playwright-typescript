import { test } from '../../src/fixtures/test';
import { buildSignupPayload } from '../../src/data/user-factory';

test('Test Case 1: Register User', async ({
    homePage,
    header,
    loginSignupPage,
    signupPage,
    accountCreatedPage,
    accountDeletedPage,
}) => {
    const user = buildSignupPayload();

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

    await test.step('Enter name and email address and click Signup', async () => {
        await loginSignupPage.startSignup(user.name, user.email);
    });

    await test.step("Verify that 'ENTER ACCOUNT INFORMATION' is visible", async () => {
        await signupPage.expectLoaded();
    });

    await test.step('Fill account details and create account', async () => {
        await signupPage.fillAccount(user);
        await signupPage.submit();
    });

    await test.step("Verify that 'ACCOUNT CREATED!' is visible and click Continue", async () => {
        await accountCreatedPage.expectLoaded();
        await accountCreatedPage.continue();
    });

    await test.step('Verify that Logged in as username is visible', async () => {
        await header.expectLoggedInAs(user.name);
    });

    await test.step("Click 'Delete Account' and verify 'ACCOUNT DELETED!'", async () => {
        await header.deleteAccount();
        await accountDeletedPage.expectLoaded();
        await accountDeletedPage.continue();
    });
});
