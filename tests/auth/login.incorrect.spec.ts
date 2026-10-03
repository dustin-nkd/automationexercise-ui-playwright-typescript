import { test } from '../../src/fixtures/test';

test('Test Case 3: Login User with incorrect email and password', async ({
    homePage,
    header,
    loginSignupPage,
}) => {
    await test.step('Navigate to url and verify home page is visible', async () => {
        await homePage.open();
        await homePage.expectLoaded();    
    });

    await test.step("Click on 'Signup / Login' button", async() => {
        await header.gotoSignupLogin();
    });

    await test.step("Verify 'Login to your account' is visible", async () => {
        await loginSignupPage.expectLoginFormVisible();
    });

    await test.step('Enter incorrect email address and password and click login', async () => {
        await loginSignupPage.login(
            'wrong.ae.pw@example.com',
            'WrongPassword!23',
        );
    });

    await test.step("Verify error 'Your email or password is incorrect!' is visible", async () => {
        await loginSignupPage.expectIncorrectCredentialsError();
    });
});
